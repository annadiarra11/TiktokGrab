import { Downloader } from "@tobyg74/tiktok-api-dl";
import fetch from "node-fetch";
import fs from "fs";
import path from "path";

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
   * Extract video information from TikTok URL
   */
  static async extractVideoInfo(url: string): Promise<TikTokVideoResult> {
    try {
      console.log(`[TikTok API] Extracting video info from: ${url}`);

      // Use the TikTok downloader library
      const result = await Downloader(url, {
        version: "v3",
      });

      if (!result || result.status !== "success") {
        throw new Error(`TikTok API error: ${result?.message || "Unknown error"}`);
      }

      const data = result.result as any;
      console.log(`[TikTok API] Raw result:`, JSON.stringify(data, null, 2));

      // Extract video information
      const videoInfo: TikTokVideoResult = {
        success: true,
        title: data?.desc || data?.title || "TikTok Video",
        author: `@${data?.author?.unique_id || data?.author?.nickname || "unknown"}`,
        thumbnail: this.extractThumbnail(data),
        duration: data?.duration,
        downloads: {
          hd: data?.videoHD || data?.hdplay,
          sd: data?.videoSD || data?.play || data?.wmplay,
          noWatermark: data?.videoHD || data?.hdplay || data?.play,
          audio: data?.music?.[0]?.url || data?.music
        },
        originalUrl: url,
      };

      // Validate that we have at least one download option
      if (!videoInfo.downloads.hd && !videoInfo.downloads.sd && !videoInfo.downloads.noWatermark) {
        throw new Error("No valid download links found");
      }

      console.log(`[TikTok API] Extracted video info:`, videoInfo);
      return videoInfo;

    } catch (error: any) {
      console.error(`[TikTok API] Extraction failed:`, error);
      throw new Error(`Failed to extract video: ${error?.message || "Unknown error"}`);
    }
  }

  /**
   * Extract thumbnail from video data
   */
  private static extractThumbnail(data: any): string | undefined {
    const thumbnailCandidates = [
      data?.cover,
      data?.origin_cover,
      data?.dynamic_cover,
      data?.static_cover,
      data?.ai_dynamic_cover,
      data?.author?.avatar
    ];

    for (const candidate of thumbnailCandidates) {
      if (candidate && typeof candidate === 'string') {
        console.log(`[TikTok API] Using thumbnail:`, candidate);
        return candidate;
      }
    }

    console.log(`[TikTok API] No thumbnail found`);
    return undefined;
  }

  /**
   * Download video file and return as buffer
   */
  static async downloadVideoAsBuffer(downloadUrl: string): Promise<Buffer> {
    try {
      console.log(`[TikTok API] Downloading video as buffer from: ${downloadUrl}`);

      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 60000); // 60s timeout

      const response = await fetch(downloadUrl, {
        redirect: "follow",
        headers: {
          "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/119.0 Safari/537.36",
          "Referer": "https://www.tiktok.com/",
          "Accept": "video/mp4,application/octet-stream,*/*",
        },
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        throw new Error(`Download failed: ${response.status} ${response.statusText}`);
      }

      const buffer = Buffer.from(await response.arrayBuffer());
      console.log(`[TikTok API] Downloaded ${buffer.length} bytes`);

      return buffer;
    } catch (error: any) {
      console.error(`[TikTok API] Download error:`, error);
      throw new Error(`Download failed: ${error?.message || "Unknown error"}`);
    }
  }

  /**
   * Stream video file directly to HTTP response (efficient for large files)
   */
  static async streamVideoToResponse(downloadUrl: string, res: any): Promise<void> {
    try {
      console.log(`[TikTok API] Streaming video from: ${downloadUrl}`);

      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 60000); // 60s timeout

      const response = await fetch(downloadUrl, {
        redirect: "follow",
        headers: {
          "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/119.0 Safari/537.36",
          "Referer": "https://www.tiktok.com/",
          "Accept": "video/mp4,application/octet-stream,*/*",
        },
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        throw new Error(`Streaming failed: ${response.status} ${response.statusText}`);
      }

      // Set appropriate headers
      const contentLength = response.headers.get('content-length');
      const contentType = response.headers.get('content-type') || 'video/mp4';

      res.setHeader('Content-Type', contentType);
      if (contentLength) {
        res.setHeader('Content-Length', contentLength);
      }
      res.setHeader('Content-Disposition', 'attachment; filename="tiktok-video.mp4"');

      // Check if response body exists
      if (!response.body) {
        throw new Error("No response body to stream");
      }

      // Stream the video using Node.js streams
      await new Promise<void>((resolve, reject) => {
        response.body!.pipe(res);
        
        response.body!.on("error", (error: any) => {
          console.error('[TikTok API] Stream source error:', error);
          reject(error);
        });
        
        res.on("finish", () => {
          console.log('[TikTok API] Stream completed successfully');
          resolve();
        });
        
        res.on("error", (error: any) => {
          console.error('[TikTok API] Stream destination error:', error);
          reject(error);
        });

        // Handle client disconnect
        res.on("close", () => {
          console.log('[TikTok API] Client disconnected during stream');
          // Note: response.body is a ReadableStream, no destroy method needed
        });
      });

    } catch (error: any) {
      console.error(`[TikTok API] Streaming error:`, error);
      
      // Only send error response if headers haven't been sent yet
      if (!res.headersSent) {
        res.status(500).json({
          success: false,
          message: `Streaming failed: ${error?.message || "Unknown error"}`,
        });
      } else {
        // If headers were already sent, just end the response
        res.end();
      }
    }
  }

  /**
   * Download and save video to file system
   */
  static async downloadVideoToFile(downloadUrl: string, outputPath: string): Promise<string> {
    try {
      console.log(`[TikTok API] Downloading video to file: ${outputPath}`);

      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 60000); // 60s timeout

      const response = await fetch(downloadUrl, {
        redirect: "follow",
        headers: {
          "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/119.0 Safari/537.36",
          "Referer": "https://www.tiktok.com/",
          "Accept": "video/mp4,application/octet-stream,*/*",
        },
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        throw new Error(`Download failed: ${response.status} ${response.statusText}`);
      }

      // Ensure directory exists
      const dir = path.dirname(outputPath);
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
      }

      // Stream to file
      const fileStream = fs.createWriteStream(outputPath);
      
      if (!response.body) {
        throw new Error("No response body to save");
      }

      await new Promise<void>((resolve, reject) => {
        response.body!.pipe(fileStream);
        
        response.body!.on("error", reject);
        fileStream.on("finish", resolve);
        fileStream.on("error", reject);
      });

      console.log(`[TikTok API] Video saved to: ${outputPath}`);
      return outputPath;

    } catch (error: any) {
      console.error(`[TikTok API] File download error:`, error);
      throw new Error(`File download failed: ${error?.message || "Unknown error"}`);
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