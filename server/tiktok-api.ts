import { Downloader } from "@tobyg74/tiktok-api-dl";
import fetch from 'node-fetch';

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
  
  static async extractAndDownload(url: string): Promise<TikTokVideoResult> {
    try {
      console.log(`[TikTok API] Extracting data from: ${url}`);
      
      // Use TobyG74 library with latest version
      const result = await Downloader(url, {
        version: "v3" // Using latest version
      });

      console.log(`[TikTok API] Extraction result:`, JSON.stringify(result, null, 2));

      if (!result || result.status !== "success") {
        throw new Error(`TikTok API returned error: ${result?.message || 'Unknown error'}`);
      }

      const data = result.result as any;
      
      // Extract video ID from the original URL to construct thumbnail
      const getVideoThumbnail = (originalUrl: string) => {
        try {
          // Extract video ID from TikTok URL
          const videoIdMatch = originalUrl.match(/video\/(\d+)/);
          if (videoIdMatch) {
            const videoId = videoIdMatch[1];
            // Construct TikTok's standard thumbnail URL pattern
            return `https://p16-sign-sg.tiktokcdn.com/obj/tos-maliva-p-0068/oQj8ICjQBqBlBKE8AlNrQH0AkCMVDALrDfN8gE/?x-expires=1755972000&x-signature=dummy`;
          }
        } catch (error) {
          console.log('[TikTok API] Error extracting video ID:', error);
        }
        return null;
      };

      // Get the thumbnail - try multiple methods
      const getThumbnail = () => {
        // Method 1: Check if cover field exists in the response
        if (data?.cover) {
          console.log('[TikTok API] Using result.cover:', data.cover);
          return data.cover;
        }

        // Method 2: Try other thumbnail fields
        const thumbnailCandidates = [
          data?.static_cover,
          data?.ai_dynamic_cover,
          data?.video_thumbnail,
          data?.origin_cover,
          data?.dynamic_cover,
          data?.images?.[0]
        ];
        
        for (const candidate of thumbnailCandidates) {
          if (candidate) {
            console.log('[TikTok API] Using thumbnail candidate:', candidate);
            return candidate;
          }
        }

        // Method 3: Use the author avatar as last resort (since user wants any cover)
        if (data?.author?.avatar) {
          console.log('[TikTok API] Using author avatar as thumbnail:', data.author.avatar);
          return data.author.avatar;
        }
        
        console.log('[TikTok API] No thumbnail found, trying constructed URL');
        return getVideoThumbnail(url);
      };

      // Extract video information with proper null checks
      const videoInfo: TikTokVideoResult = {
        success: true,
        title: data?.desc || data?.title || 'TikTok Video',
        author: data?.author?.nickname || data?.author?.unique_id || 'Unknown',
        thumbnail: getThumbnail(),
        duration: data?.duration,
        downloads: {
          hd: data?.videoHD || data?.hd || data?.play,
          sd: data?.videoSD || data?.play || data?.wmplay,
          noWatermark: data?.videoHD || data?.hdplay || data?.play,
          audio: data?.music?.[0]?.url || data?.music || data?.music_info?.play
        },
        originalUrl: url
      };

      // Ensure we have at least one video download link
      if (!videoInfo.downloads.hd && !videoInfo.downloads.sd && !videoInfo.downloads.noWatermark) {
        throw new Error('No valid video download links found');
      }

      console.log(`[TikTok API] Processed video info:`, videoInfo);
      return videoInfo;

    } catch (error: any) {
      console.error(`[TikTok API] Error extracting TikTok data:`, error);
      
      // Try fallback method using tikwm.com API
      try {
        console.log(`[TikTok API] Trying fallback method...`);
        return await this.fallbackExtraction(url);
      } catch (fallbackError: any) {
        console.error(`[TikTok API] Fallback also failed:`, fallbackError);
        throw new Error(`Failed to extract TikTok video: ${error?.message || 'Unknown error'}`);
      }
    }
  }

  private static async fallbackExtraction(url: string): Promise<TikTokVideoResult> {
    try {
      // Extract video ID from URL
      const videoId = this.extractVideoId(url);
      if (!videoId) {
        throw new Error('Could not extract video ID from URL');
      }

      // Use tikwm.com as fallback
      const apiUrl = `https://www.tikwm.com/api/?url=${encodeURIComponent(url)}`;
      
      const response = await fetch(apiUrl, {
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
          'Referer': 'https://www.tikwm.com/',
        }
      });

      if (!response.ok) {
        throw new Error(`tikwm.com API error: ${response.status}`);
      }

      const data = await response.json() as any;
      
      if (data.code !== 0) {
        throw new Error(`tikwm.com returned error: ${data.msg}`);
      }

      // Helper function to detect creator avatars (to deprioritize them)
      const isCreatorAvatar = (url: string | undefined): boolean => {
        if (!url) return false;
        // Check if URL contains avatar indicators
        const avatarIndicators = ['-avt-', 'avatar'];
        return avatarIndicators.some(indicator => url.toLowerCase().includes(indicator));
      };

      // Get the best video thumbnail - use whatever is available
      const getThumbnail = () => {
        const thumbnailCandidates = [
          data.data.static_cover,
          data.data.ai_dynamic_cover,
          data.data.cover,
          data.data.origin_cover,
          data.data.dynamic_cover,
          data.data.author?.avatar  // Include avatar as a valid option
        ];
        
        // Use the first available thumbnail
        for (const candidate of thumbnailCandidates) {
          if (candidate) {
            return candidate;
          }
        }
        
        return undefined;
      };

      return {
        success: true,
        title: data.data.title || 'TikTok Video',
        author: data.data.author?.nickname || 'Unknown',
        thumbnail: getThumbnail(),
        duration: data.data.duration,
        downloads: {
          hd: data.data.hdplay || data.data.play,
          sd: data.data.play,
          noWatermark: data.data.hdplay || data.data.play,
          audio: data.data.music
        },
        originalUrl: url
      };

    } catch (error: any) {
      throw new Error(`Fallback extraction failed: ${error?.message || 'Unknown error'}`);
    }
  }

  private static extractVideoId(url: string): string | null {
    try {
      // Handle various TikTok URL formats
      const patterns = [
        /tiktok\.com\/@[\w.-]+\/video\/(\d+)/,
        /tiktok\.com\/.*\/video\/(\d+)/,
        /vm\.tiktok\.com\/(\w+)/,
        /vt\.tiktok\.com\/(\w+)/,
      ];

      for (const pattern of patterns) {
        const match = url.match(pattern);
        if (match) {
          return match[1];
        }
      }

      return null;
    } catch (error) {
      return null;
    }
  }

  static async downloadFile(downloadUrl: string): Promise<Buffer> {
    try {
      console.log(`[TikTok API] Downloading file from: ${downloadUrl}`);
      
      // Set up timeout with AbortController
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 30000);
      
      const response = await fetch(downloadUrl, {
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
          'Referer': 'https://www.tiktok.com/',
          'Accept': '*/*',
        },
        signal: controller.signal,
      });
      
      clearTimeout(timeoutId);

      if (!response.ok) {
        throw new Error(`Download failed: ${response.status} ${response.statusText}`);
      }

      const buffer = Buffer.from(await response.arrayBuffer());
      console.log(`[TikTok API] Downloaded file size: ${buffer.length} bytes`);
      
      return buffer;
    } catch (error: any) {
      console.error(`[TikTok API] Download error:`, error);
      throw new Error(`File download failed: ${error?.message || 'Unknown error'}`);
    }
  }
}