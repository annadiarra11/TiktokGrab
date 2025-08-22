import { execFile, spawn } from "child_process";
import { promisify } from "util";
import fs from "fs";
import path from "path";

const execFileAsync = promisify(execFile);

export interface TikTokVideoResult {
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

export class TikTokAPI {
  /**
   * Extract video info using yt-dlp only
   */
  static async extractVideoInfo(url: string): Promise<TikTokVideoResult> {
    try {
      console.log(`[TikTok API] Extracting with yt-dlp: ${url}`);

      const { stdout: infoOutput } = await execFileAsync('yt-dlp', [
        '--dump-json',
        '--no-playlist',
        '--no-warnings',
        url
      ]);

      const videoInfo = JSON.parse(infoOutput.trim());
      console.log(`[TikTok API] yt-dlp extracted info:`, {
        title: videoInfo.title,
        uploader: videoInfo.uploader,
        thumbnail: videoInfo.thumbnail,
        duration: videoInfo.duration
      });

      return {
        success: true,
        title: videoInfo.title || "TikTok Video",
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
      console.error(`[TikTok API] yt-dlp extraction failed:`, error);
      throw new Error(`yt-dlp extraction failed: ${error?.message || "Unknown error"}`);
    }
  }

  /**
   * Stream video using yt-dlp (FIXED VERSION)
   */
  static async streamVideoWithYtdlp(url: string, res: any): Promise<void> {
    return new Promise((resolve, reject) => {
      console.log(`[TikTok API] Streaming video with yt-dlp: ${url}`);

      // Set headers first
      res.setHeader('Content-Type', 'video/mp4');
      res.setHeader('Content-Disposition', 'attachment; filename="tiktok-video.mp4"');
      res.setHeader('Cache-Control', 'no-cache');

      // Use spawn instead of execFile for better streaming control
      const ytdlpProcess = spawn('yt-dlp', [
        '--format', 'best[ext=mp4]/mp4/best',
        '--output', '-',
        '--no-warnings',
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
        console.log('[TikTok API] yt-dlp stdout ended');
        if (!resolved && dataReceived) {
          resolved = true;
          res.end();
          resolve();
        }
      });

      // Handle process exit
      ytdlpProcess.on('exit', (code, signal) => {
        console.log(`[TikTok API] yt-dlp process exited with code: ${code}, signal: ${signal}`);
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
        console.error('[TikTok API] yt-dlp process error:', error);
        cleanup();
        if (!resolved) {
          resolved = true;
          reject(error);
        }
      });

      // Handle stderr for debugging
      ytdlpProcess.stderr.on('data', (data) => {
        const errorMsg = data.toString();
        console.error('[TikTok API] yt-dlp stderr:', errorMsg);
        
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
        console.log('[TikTok API] Client disconnected');
        cleanup();
        if (!resolved) {
          resolved = true;
          resolve();
        }
      });

      res.on('error', (error: any) => {
        console.error('[TikTok API] Response error:', error);
        cleanup();
        if (!resolved) {
          resolved = true;
          reject(error);
        }
      });

      // Timeout after 3 minutes
      setTimeout(() => {
        if (!resolved) {
          console.log('[TikTok API] yt-dlp streaming timeout');
          cleanup();
          resolved = true;
          reject(new Error('Streaming timeout after 3 minutes'));
        }
      }, 3 * 60 * 1000);
    });
  }

  /**
   * Stream audio using yt-dlp (FIXED VERSION)
   */
  static async streamAudioWithYtdlp(url: string, res: any): Promise<void> {
    return new Promise((resolve, reject) => {
      console.log(`[TikTok API] Streaming audio with yt-dlp: ${url}`);

      // Set headers first
      res.setHeader('Content-Type', 'audio/mpeg');
      res.setHeader('Content-Disposition', 'attachment; filename="tiktok-audio.mp3"');
      res.setHeader('Cache-Control', 'no-cache');

      // Use spawn for audio extraction - try audio-only first, fallback to extracting from video
      const ytdlpProcess = spawn('yt-dlp', [
        '--format', 'bestaudio/best',
        '--extract-audio',
        '--audio-format', 'mp3',
        '--audio-quality', '192K',
        '--output', '-',
        '--no-warnings',
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
        console.log('[TikTok API] yt-dlp audio stdout ended');
        if (!resolved && dataReceived) {
          resolved = true;
          res.end();
          resolve();
        }
      });

      // Handle process exit
      ytdlpProcess.on('exit', (code, signal) => {
        console.log(`[TikTok API] yt-dlp audio process exited with code: ${code}, signal: ${signal}`);
        if (!resolved) {
          if (code === 0 && dataReceived) {
            resolved = true;
            res.end();
            resolve();
          } else {
            resolved = true;
            reject(new Error(`yt-dlp audio process failed with code ${code}`));
          }
        }
      });

      // Handle process errors
      ytdlpProcess.on('error', (error) => {
        console.error('[TikTok API] yt-dlp audio process error:', error);
        cleanup();
        if (!resolved) {
          resolved = true;
          reject(error);
        }
      });

      // Handle stderr for debugging
      ytdlpProcess.stderr.on('data', (data) => {
        const errorMsg = data.toString();
        console.error('[TikTok API] yt-dlp audio stderr:', errorMsg);
        
        // Check for specific errors
        if (errorMsg.includes('ERROR:') || errorMsg.includes('Unable to extract')) {
          cleanup();
          if (!resolved) {
            resolved = true;
            reject(new Error(`yt-dlp audio error: ${errorMsg}`));
          }
        }
      });

      // Handle client disconnect
      res.on('close', () => {
        console.log('[TikTok API] Audio client disconnected');
        cleanup();
        if (!resolved) {
          resolved = true;
          resolve();
        }
      });

      res.on('error', (error: any) => {
        console.error('[TikTok API] Audio response error:', error);
        cleanup();
        if (!resolved) {
          resolved = true;
          reject(error);
        }
      });

      // Timeout after 3 minutes
      setTimeout(() => {
        if (!resolved) {
          console.log('[TikTok API] yt-dlp audio streaming timeout');
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
  static getBestQualityUrl(videoInfo: TikTokVideoResult, quality: 'hd' | 'sd' | 'noWatermark' = 'hd'): string {
    return 'yt-dlp-video'; // Always use yt-dlp streaming
  }
}