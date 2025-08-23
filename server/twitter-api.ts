import { execFile, spawn } from "child_process";
import { promisify } from "util";
import fs from "fs";
import path from "path";

const execFileAsync = promisify(execFile);

export interface TwitterVideoResult {
  success: boolean;
  title?: string;
  author?: string;
  thumbnail?: string;
  duration?: number;
  downloads: {
    hd?: string;
    sd?: string;
    audio?: string;
    noWatermark?: string;
  };
  originalUrl: string;
}

export class TwitterAPI {
  /**
   * Extract video info using yt-dlp only
   */
  static async extractVideoInfo(url: string): Promise<TwitterVideoResult> {
    try {
      console.log(`[Twitter API] Extracting with yt-dlp: ${url}`);

      const { stdout: infoOutput } = await execFileAsync('yt-dlp', [
        '--dump-json',
        '--no-playlist',
        '--no-warnings',
        url
      ]);

      const videoInfo = JSON.parse(infoOutput.trim());
      console.log(`[Twitter API] yt-dlp extracted info:`, {
        title: videoInfo.title,
        uploader: videoInfo.uploader,
        thumbnail: videoInfo.thumbnail,
        duration: videoInfo.duration
      });

      return {
        success: true,
        title: videoInfo.title || "Twitter Video",
        author: `@${videoInfo.uploader || videoInfo.channel || "unknown"}`,
        thumbnail: videoInfo.thumbnail,
        duration: videoInfo.duration,
        downloads: {
          hd: 'yt-dlp-video',
          sd: 'yt-dlp-video',
          noWatermark: 'yt-dlp-video',
          audio: 'yt-dlp-audio'
        },
        originalUrl: url,
      };

    } catch (error: any) {
      console.error(`[Twitter API] yt-dlp extraction failed:`, error);
      throw new Error(`yt-dlp extraction failed: ${error?.message || "Unknown error"}`);
    }
  }

  /**
   * Stream video using yt-dlp (FIXED VERSION)
   */
  static async streamVideoWithYtdlp(url: string, res: any): Promise<void> {
    return new Promise((resolve, reject) => {
      console.log(`[Twitter API] Streaming video with yt-dlp: ${url}`);

      // Set headers first
      res.setHeader('Content-Type', 'video/mp4');
      res.setHeader('Content-Disposition', 'attachment; filename="twitter-video.mp4"');
      res.setHeader('Cache-Control', 'no-cache');

      // Use spawn instead of execFile for better streaming control
      // Priority: progressive > adaptive, avoid HLS segments, ensure keyframes
      const ytdlpProcess = spawn('yt-dlp', [
        '--format', 'best[protocol^=http][ext=mp4]/best[ext=mp4]/mp4/best',
        '--output', '-',
        '--no-warnings',
        '--fixup', 'detect_or_warn',
        '--force-keyframes-at-cuts',
        url
      ], {
        stdio: ['pipe', 'pipe', 'pipe']
      });

      let dataReceived = false;
      let resolved = false;

      const cleanup = () => {
        if (!resolved) {
          resolved = true;
          try {
            ytdlpProcess.kill('SIGTERM');
          } catch (e) {
            // Process might already be dead
          }
        }
      };

      // Handle stdout data
      ytdlpProcess.stdout.on('data', (chunk) => {
        dataReceived = true;
        if (!resolved) {
          res.write(chunk);
        }
      });

      // Handle stdout end
      ytdlpProcess.stdout.on('end', () => {
        console.log('[Twitter API] yt-dlp stdout ended');
        if (!resolved && dataReceived) {
          resolved = true;
          res.end();
          resolve();
        }
      });

      // Handle process exit
      ytdlpProcess.on('exit', (code, signal) => {
        console.log(`[Twitter API] yt-dlp process exited with code: ${code}, signal: ${signal}`);
        if (!resolved) {
          if (code === 0 && dataReceived) {
            resolved = true;
            res.end();
            resolve();
          } else {
            resolved = true;
            reject(new Error(`yt-dlp process failed with code ${code}`));
          }
        }
      });

      // Handle process errors
      ytdlpProcess.on('error', (error) => {
        console.error('[Twitter API] yt-dlp process error:', error);
        cleanup();
        if (!resolved) {
          resolved = true;
          reject(error);
        }
      });

      // Handle stderr for debugging
      ytdlpProcess.stderr.on('data', (data) => {
        const errorMsg = data.toString();
        console.error('[Twitter API] yt-dlp stderr:', errorMsg);
        
        // Check for specific errors that indicate failure
        if (errorMsg.includes('ERROR:') || errorMsg.includes('Unable to extract')) {
          cleanup();
          if (!resolved) {
            resolved = true;
            reject(new Error(`yt-dlp error: ${errorMsg}`));
          }
        }
      });

      // Handle client disconnect
      res.on('close', () => {
        console.log('[Twitter API] Client disconnected');
        cleanup();
        if (!resolved) {
          resolved = true;
          resolve();
        }
      });

      res.on('error', (error: any) => {
        console.error('[Twitter API] Response error:', error);
        cleanup();
        if (!resolved) {
          resolved = true;
          reject(error);
        }
      });

      // Timeout after 3 minutes
      setTimeout(() => {
        if (!resolved) {
          console.log('[Twitter API] yt-dlp streaming timeout');
          cleanup();
          resolved = true;
          reject(new Error('Streaming timeout after 3 minutes'));
        }
      }, 3 * 60 * 1000);
    });
  }

  /**
   * Stream audio using yt-dlp piped through ffmpeg for audio extraction
   */
  static async streamAudioWithYtdlp(url: string, res: any): Promise<void> {
    return new Promise((resolve, reject) => {
      console.log(`[Twitter API] Streaming audio with yt-dlp + ffmpeg: ${url}`);

      // Set headers first
      res.setHeader('Content-Type', 'audio/mpeg');
      res.setHeader('Content-Disposition', 'attachment; filename="twitter-audio.mp3"');
      res.setHeader('Cache-Control', 'no-cache');

      // Start yt-dlp to download video
      const ytdlpProcess = spawn('yt-dlp', [
        '--format', 'best[protocol^=http][ext=mp4]/best[ext=mp4]/mp4/best',
        '--output', '-',
        '--no-warnings',
        '--fixup', 'detect_or_warn',
        url
      ], {
        stdio: ['pipe', 'pipe', 'pipe']
      });

      // Start ffmpeg to extract audio from the video stream
      const ffmpegProcess = spawn('ffmpeg', [
        '-i', 'pipe:0',           // Input from stdin (yt-dlp output)
        '-vn',                    // No video
        '-acodec', 'mp3',         // Audio codec MP3
        '-ab', '192k',            // Audio bitrate
        '-avoid_negative_ts', 'make_zero', // Fix timing issues
        '-f', 'mp3',              // Output format MP3
        'pipe:1'                  // Output to stdout
      ], {
        stdio: ['pipe', 'pipe', 'pipe']
      });

      let dataReceived = false;
      let resolved = false;

      const cleanup = () => {
        if (!resolved) {
          resolved = true;
          try {
            ytdlpProcess.kill('SIGTERM');
            ffmpegProcess.kill('SIGTERM');
          } catch (e) {
            // Processes might already be dead
          }
        }
      };

      // Pipe yt-dlp output to ffmpeg input
      ytdlpProcess.stdout.pipe(ffmpegProcess.stdin);

      // Handle ffmpeg stdout (the actual MP3 audio data)
      ffmpegProcess.stdout.on('data', (chunk) => {
        dataReceived = true;
        if (!resolved) {
          res.write(chunk);
        }
      });

      // Handle ffmpeg stdout end
      ffmpegProcess.stdout.on('end', () => {
        console.log('[Twitter API] ffmpeg audio stdout ended');
        if (!resolved && dataReceived) {
          resolved = true;
          res.end();
          resolve();
        }
      });

      // Handle ffmpeg process exit
      ffmpegProcess.on('exit', (code, signal) => {
        console.log(`[Twitter API] ffmpeg audio process exited with code: ${code}, signal: ${signal}`);
        if (!resolved) {
          if (code === 0 && dataReceived) {
            resolved = true;
            res.end();
            resolve();
          } else {
            resolved = true;
            reject(new Error(`ffmpeg audio process failed with code ${code}`));
          }
        }
      });

      // Handle yt-dlp process exit
      ytdlpProcess.on('exit', (code, signal) => {
        console.log(`[Twitter API] yt-dlp video process exited with code: ${code}, signal: ${signal}`);
        // Close ffmpeg input when yt-dlp is done
        try {
          ffmpegProcess.stdin.end();
        } catch (e) {
          // Already closed
        }
      });

      // Handle process errors
      ytdlpProcess.on('error', (error) => {
        console.error('[Twitter API] yt-dlp process error:', error);
        cleanup();
        if (!resolved) {
          resolved = true;
          reject(error);
        }
      });

      ffmpegProcess.on('error', (error) => {
        console.error('[Twitter API] ffmpeg process error:', error);
        cleanup();
        if (!resolved) {
          resolved = true;
          reject(error);
        }
      });

      // Handle stderr for debugging
      ytdlpProcess.stderr.on('data', (data) => {
        const errorMsg = data.toString();
        console.error('[Twitter API] yt-dlp stderr:', errorMsg);
        
        if (errorMsg.includes('ERROR:') || errorMsg.includes('Unable to extract')) {
          cleanup();
          if (!resolved) {
            resolved = true;
            reject(new Error(`yt-dlp error: ${errorMsg}`));
          }
        }
      });

      ffmpegProcess.stderr.on('data', (data) => {
        const errorMsg = data.toString();
        console.error('[Twitter API] ffmpeg stderr:', errorMsg);
      });

      // Handle client disconnect
      res.on('close', () => {
        console.log('[Twitter API] Audio client disconnected');
        cleanup();
        if (!resolved) {
          resolved = true;
          resolve();
        }
      });

      res.on('error', (error: any) => {
        console.error('[Twitter API] Audio response error:', error);
        cleanup();
        if (!resolved) {
          resolved = true;
          reject(error);
        }
      });

      // Timeout after 3 minutes
      setTimeout(() => {
        if (!resolved) {
          console.log('[Twitter API] Audio streaming timeout');
          cleanup();
          resolved = true;
          reject(new Error('Audio streaming timeout after 3 minutes'));
        }
      }, 3 * 60 * 1000);
    });
  }

  /**
   * Get best quality URL (placeholder for yt-dlp)
   */
  static getBestQualityUrl(videoInfo: TwitterVideoResult, quality: 'hd' | 'sd' | 'noWatermark' = 'hd'): string {
    return 'yt-dlp-video'; // Always use yt-dlp streaming
  }
}