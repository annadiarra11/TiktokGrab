import fetch from "node-fetch";
import fs from "fs";
import path from "path";
import { execFile } from "child_process";
import { promisify } from "util";

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
   * Primary method using yt-dlp (most reliable)
   */
  static async extractVideoInfoWithYtdlp(url: string): Promise<TikTokVideoResult> {
    try {
      console.log(`[TikTok API] Extracting with yt-dlp: ${url}`);

      // Get video info using yt-dlp
      const { stdout: infoOutput } = await execFileAsync('yt-dlp', [
        '--dump-json',
        '--no-playlist',
        url
      ]);

      const videoInfo = JSON.parse(infoOutput.trim());
      console.log(`[TikTok API] yt-dlp extracted info:`, {
        title: videoInfo.title,
        uploader: videoInfo.uploader,
        thumbnail: videoInfo.thumbnail,
        duration: videoInfo.duration
      });

      // Get the best available formats
      const formats = videoInfo.formats || [];
      const videoFormats = formats.filter((f: any) => f.ext === 'mp4' && f.vcodec !== 'none');
      const audioFormats = formats.filter((f: any) => f.acodec !== 'none' && f.vcodec === 'none');

      // Find best quality video (no watermark)
      const bestVideo = videoFormats.reduce((best: any, current: any) => {
        if (!best) return current;
        if (current.height > best.height) return current;
        if (current.height === best.height && current.filesize > best.filesize) return current;
        return best;
      }, null);

      // Find best audio
      const bestAudio = audioFormats.reduce((best: any, current: any) => {
        if (!best) return current;
        if (current.abr > best.abr) return current;
        return best;
      }, null);

      return {
        success: true,
        title: videoInfo.title || "TikTok Video",
        author: `@${videoInfo.uploader || videoInfo.channel || "unknown"}`,
        thumbnail: videoInfo.thumbnail,
        duration: videoInfo.duration,
        downloads: {
          hd: bestVideo?.url,
          sd: bestVideo?.url, // Same as HD for yt-dlp
          noWatermark: bestVideo?.url,
          audio: bestAudio?.url
        },
        originalUrl: url,
      };

    } catch (error: any) {
      console.error(`[TikTok API] yt-dlp extraction failed:`, error);
      throw new Error(`yt-dlp extraction failed: ${error?.message || "Unknown error"}`);
    }
  }

  /**
   * Fallback method using tikwm.com API
   */
  static async extractVideoInfoWithTikwm(url: string): Promise<TikTokVideoResult> {
    try {
      console.log(`[TikTok API] Extracting with tikwm.com: ${url}`);

      const apiUrl = `https://www.tikwm.com/api/?url=${encodeURIComponent(url)}`;
      const response = await fetch(apiUrl, {
        headers: {
          "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
          "Referer": "https://www.tikwm.com/",
        },
      });

      if (!response.ok) {
        throw new Error(`tikwm.com API error: ${response.status}`);
      }

      const data = await response.json() as any;

      if (data.code !== 0) {
        throw new Error(`tikwm.com error: ${data.msg}`);
      }

      console.log(`[TikTok API] tikwm.com extracted info:`, {
        title: data.data.title,
        author: data.data.author?.nickname,
        thumbnail: data.data.cover
      });

      return {
        success: true,
        title: data.data.title || "TikTok Video",
        author: `@${data.data.author?.nickname || data.data.author?.unique_id || "unknown"}`,
        thumbnail: data.data.cover || data.data.origin_cover || data.data.dynamic_cover,
        duration: data.data.duration,
        downloads: {
          hd: data.data.hdplay || data.data.play,
          sd: data.data.play,
          noWatermark: data.data.hdplay || data.data.play,
          audio: data.data.music
        },
        originalUrl: url,
      };

    } catch (error: any) {
      console.error(`[TikTok API] tikwm.com extraction failed:`, error);
      throw new Error(`tikwm.com extraction failed: ${error?.message || "Unknown error"}`);
    }
  }

  /**
   * Third fallback using ssstik.io API
   */
  static async extractVideoInfoWithSsstik(url: string): Promise<TikTokVideoResult> {
    try {
      console.log(`[TikTok API] Extracting with ssstik.io: ${url}`);

      const response = await fetch('https://ssstik.io/abc?url=dl', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
          'Referer': 'https://ssstik.io/',
        },
        body: `id=${encodeURIComponent(url)}&locale=en&tt=1`
      });

      if (!response.ok) {
        throw new Error(`ssstik.io API error: ${response.status}`);
      }

      const html = await response.text();
      
      // Parse HTML response to extract video info
      const titleMatch = html.match(/<p class="maintext"[^>]*>([^<]+)</);
      const authorMatch = html.match(/<h2>([^<]+)</);
      const videoMatch = html.match(/href="([^"]+)"[^>]*>Download MP4/);
      const thumbnailMatch = html.match(/<img[^>]+src="([^"]+)"[^>]*class="result-image"/);

      if (!videoMatch) {
        throw new Error("No video download link found in ssstik.io response");
      }

      return {
        success: true,
        title: titleMatch?.[1]?.trim() || "TikTok Video",
        author: authorMatch?.[1]?.trim() || "@unknown",
        thumbnail: thumbnailMatch?.[1],
        duration: undefined,
        downloads: {
          hd: videoMatch[1],
          sd: videoMatch[1],
          noWatermark: videoMatch[1],
          audio: undefined
        },
        originalUrl: url,
      };

    } catch (error: any) {
      console.error(`[TikTok API] ssstik.io extraction failed:`, error);
      throw new Error(`ssstik.io extraction failed: ${error?.message || "Unknown error"}`);
    }
  }

  /**
   * Main extraction method with multiple fallbacks
   */
  static async extractVideoInfo(url: string): Promise<TikTokVideoResult> {
    const methods = [
      { name: 'yt-dlp', method: this.extractVideoInfoWithYtdlp },
      { name: 'tikwm.com', method: this.extractVideoInfoWithTikwm },
      { name: 'ssstik.io', method: this.extractVideoInfoWithSsstik }
    ];

    let lastError: Error | null = null;

    for (const { name, method } of methods) {
      try {
        console.log(`[TikTok API] Trying ${name}...`);
        const result = await method.call(this, url);
        
        // Validate that we have at least one download option
        if (!result.downloads.hd && !result.downloads.sd && !result.downloads.noWatermark) {
          throw new Error("No valid download links found");
        }

        console.log(`[TikTok API] Successfully extracted with ${name}`);
        return result;

      } catch (error: any) {
        console.log(`[TikTok API] ${name} failed, trying next method...`);
        lastError = error;
        continue;
      }
    }

    // If all methods failed
    throw new Error(`All extraction methods failed. Last error: ${lastError?.message || "Unknown error"}`);
  }

  /**
   * Download video using yt-dlp (most reliable)
   */
  static async downloadVideoWithYtdlp(url: string): Promise<Buffer> {
    try {
      console.log(`[TikTok API] Downloading with yt-dlp: ${url}`);

      // Create temp directory
      const tempDir = '/tmp/tiktok-downloads';
      if (!fs.existsSync(tempDir)) {
        fs.mkdirSync(tempDir, { recursive: true });
      }

      // Download video
      const { stdout } = await execFileAsync('yt-dlp', [
        '--format', 'best[ext=mp4]',
        '--output', `${tempDir}/%(title)s.%(ext)s`,
        '--print', 'after_move:filepath',
        url
      ]);

      const filePath = stdout.trim();
      console.log(`[TikTok API] Downloaded to: ${filePath}`);

      // Read file and return buffer
      const buffer = fs.readFileSync(filePath);
      
      // Clean up file
      fs.unlinkSync(filePath);

      console.log(`[TikTok API] Downloaded ${buffer.length} bytes`);
      return buffer;

    } catch (error: any) {
      console.error(`[TikTok API] yt-dlp download error:`, error);
      throw new Error(`yt-dlp download failed: ${error?.message || "Unknown error"}`);
    }
  }

  /**
   * Stream video directly to HTTP response
   */
  static async streamVideoToResponse(downloadUrl: string, res: any): Promise<void> {
    try {
      console.log(`[TikTok API] Streaming video from: ${downloadUrl}`);

      const response = await fetch(downloadUrl, {
        redirect: "follow",
        headers: {
          "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/119.0 Safari/537.36",
          "Referer": "https://www.tiktok.com/",
          "Accept": "video/mp4,application/octet-stream,*/*",
          "Range": "bytes=0-", // Enable range requests for better streaming
        },
      });

      if (!response.ok) {
        throw new Error(`Streaming failed: ${response.status} ${response.statusText}`);
      }

      // Set appropriate headers
      const contentLength = response.headers.get('content-length');
      const contentType = response.headers.get('content-type') || 'video/mp4';
      const acceptRanges = response.headers.get('accept-ranges');

      res.setHeader('Content-Type', contentType);
      if (contentLength) {
        res.setHeader('Content-Length', contentLength);
      }
      if (acceptRanges) {
        res.setHeader('Accept-Ranges', acceptRanges);
      }
      res.setHeader('Content-Disposition', 'attachment; filename="tiktok-video.mp4"');
      res.setHeader('Cache-Control', 'public, max-age=3600'); // Cache for 1 hour

      // Check if response body exists
      if (!response.body) {
        throw new Error("No response body to stream");
      }

      // Set up proper streaming with error handling
      await new Promise<void>((resolve, reject) => {
        let resolved = false;

        const cleanup = () => {
          if (!resolved) {
            resolved = true;
          }
        };

        response.body!.pipe(res);
        
        response.body!.on("error", (error: any) => {
          console.error('[TikTok API] Stream source error:', error);
          cleanup();
          if (!resolved) reject(error);
        });
        
        res.on("finish", () => {
          console.log('[TikTok API] Stream completed successfully');
          cleanup();
          if (!resolved) resolve();
        });
        
        res.on("error", (error: any) => {
          console.error('[TikTok API] Stream destination error:', error);
          cleanup();
          if (!resolved) reject(error);
        });

        res.on("close", () => {
          console.log('[TikTok API] Client disconnected during stream');
          cleanup();
          if (!resolved) resolve(); // Don't treat disconnect as error
        });

        // Timeout after 5 minutes
        setTimeout(() => {
          if (!resolved) {
            console.log('[TikTok API] Stream timeout after 5 minutes');
            cleanup();
            reject(new Error('Stream timeout'));
          }
        }, 5 * 60 * 1000);
      });

    } catch (error: any) {
      console.error(`[TikTok API] Streaming error:`, error);
      
      if (!res.headersSent) {
        res.status(500).json({
          success: false,
          message: `Streaming failed: ${error?.message || "Unknown error"}`,
        });
      }
    }
  }

  /**
   * Download and stream video using yt-dlp (most reliable for TikTok)
   */
  static async streamVideoWithYtdlp(url: string, res: any): Promise<void> {
    try {
      console.log(`[TikTok API] Streaming video with yt-dlp: ${url}`);

      // Stream directly using yt-dlp with best quality
      const ytdlpProcess = execFile('yt-dlp', [
        '--format', 'best[ext=mp4]/best',
        '--output', '-', // Output to stdout
        '--no-warnings',
        '--quiet',
        url
      ]);

      if (!ytdlpProcess.stdout) {
        throw new Error("Failed to start yt-dlp process");
      }

      // Set appropriate headers
      res.setHeader('Content-Type', 'video/mp4');
      res.setHeader('Content-Disposition', 'attachment; filename="tiktok-video.mp4"');
      res.setHeader('Cache-Control', 'no-cache');

      // Pipe yt-dlp output directly to response
      ytdlpProcess.stdout.pipe(res);

      await new Promise<void>((resolve, reject) => {
        let resolved = false;

        const cleanup = () => {
          if (!resolved) {
            resolved = true;
            ytdlpProcess.kill();
          }
        };

        ytdlpProcess.on('close', (code) => {
          if (!resolved) {
            if (code === 0) {
              console.log('[TikTok API] yt-dlp video streaming completed successfully');
              resolved = true;
              resolve();
            } else {
              console.error(`[TikTok API] yt-dlp process exited with code ${code}`);
              resolved = true;
              reject(new Error(`yt-dlp process failed with code ${code}`));
            }
          }
        });

        ytdlpProcess.on('error', (error) => {
          console.error('[TikTok API] yt-dlp process error:', error);
          cleanup();
          if (!resolved) {
            resolved = true;
            reject(error);
          }
        });

        ytdlpProcess.stderr?.on('data', (data) => {
          console.error('[TikTok API] yt-dlp stderr:', data.toString());
        });

        res.on('close', () => {
          console.log('[TikTok API] Client disconnected, cleaning up yt-dlp process');
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

        // Timeout after 2 minutes
        setTimeout(() => {
          if (!resolved) {
            console.log('[TikTok API] yt-dlp streaming timeout');
            cleanup();
            resolved = true;
            reject(new Error('Streaming timeout'));
          }
        }, 2 * 60 * 1000);
      });

    } catch (error: any) {
      console.error(`[TikTok API] yt-dlp video streaming error:`, error);
      
      if (!res.headersSent) {
        res.status(500).json({
          success: false,
          message: `Video streaming failed: ${error?.message || "Unknown error"}`,
        });
      }
    }
  }

  /**
   * Download and stream audio using yt-dlp (extracts audio from video)
   */
  static async streamAudioWithYtdlp(url: string, res: any): Promise<void> {
    try {
      console.log(`[TikTok API] Streaming audio with yt-dlp: ${url}`);

      // Stream audio using yt-dlp with audio extraction
      const ytdlpProcess = execFile('yt-dlp', [
        '--format', 'bestaudio/best',
        '--extract-audio',
        '--audio-format', 'mp3',
        '--output', '-', // Output to stdout
        '--no-warnings',
        '--quiet',
        url
      ]);

      if (!ytdlpProcess.stdout) {
        throw new Error("Failed to start yt-dlp process for audio");
      }

      // Set appropriate headers for audio
      res.setHeader('Content-Type', 'audio/mpeg');
      res.setHeader('Content-Disposition', 'attachment; filename="tiktok-audio.mp3"');
      res.setHeader('Cache-Control', 'no-cache');

      // Pipe yt-dlp output directly to response
      ytdlpProcess.stdout.pipe(res);

      await new Promise<void>((resolve, reject) => {
        let resolved = false;

        const cleanup = () => {
          if (!resolved) {
            resolved = true;
            ytdlpProcess.kill();
          }
        };

        ytdlpProcess.on('close', (code) => {
          if (!resolved) {
            if (code === 0) {
              console.log('[TikTok API] yt-dlp audio streaming completed successfully');
              resolved = true;
              resolve();
            } else {
              console.error(`[TikTok API] yt-dlp audio process exited with code ${code}`);
              resolved = true;
              reject(new Error(`yt-dlp audio process failed with code ${code}`));
            }
          }
        });

        ytdlpProcess.on('error', (error) => {
          console.error('[TikTok API] yt-dlp audio process error:', error);
          cleanup();
          if (!resolved) {
            resolved = true;
            reject(error);
          }
        });

        ytdlpProcess.stderr?.on('data', (data) => {
          console.error('[TikTok API] yt-dlp audio stderr:', data.toString());
        });

        res.on('close', () => {
          console.log('[TikTok API] Client disconnected, cleaning up yt-dlp audio process');
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

        // Timeout after 2 minutes
        setTimeout(() => {
          if (!resolved) {
            console.log('[TikTok API] yt-dlp audio streaming timeout');
            cleanup();
            resolved = true;
            reject(new Error('Audio streaming timeout'));
          }
        }, 2 * 60 * 1000);
      });

    } catch (error: any) {
      console.error(`[TikTok API] yt-dlp audio streaming error:`, error);
      
      if (!res.headersSent) {
        res.status(500).json({
          success: false,
          message: `Audio streaming failed: ${error?.message || "Unknown error"}`,
        });
      }
    }
  }

  /**
   * Get the best quality download URL from video info
   */
  static getBestQualityUrl(videoInfo: TikTokVideoResult, quality: 'hd' | 'sd' | 'noWatermark' = 'hd'): string {
    const url = videoInfo.downloads[quality] || 
               videoInfo.downloads.hd || 
               videoInfo.downloads.noWatermark || 
               videoInfo.downloads.sd;

    if (!url) {
      throw new Error("No download URL available");
    }

    return url;
  }
}