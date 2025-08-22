import fetch from 'node-fetch';
import * as cheerio from 'cheerio';

interface TikTokVideoData {
  videoUrl: string;
  audioUrl?: string;
  thumbnail: string;
  title: string;
  author: string;
  duration?: number;
  noWatermark?: string;
}

export class TikTokExtractor {
  private static headers = {
    'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
    'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7',
    'Accept-Language': 'en-US,en;q=0.9',
    'Accept-Encoding': 'gzip, deflate, br',
    'Connection': 'keep-alive',
    'Upgrade-Insecure-Requests': '1',
    'Sec-Fetch-Dest': 'document',
    'Sec-Fetch-Mode': 'navigate',
    'Sec-Fetch-Site': 'none',
    'Cache-Control': 'max-age=0',
  };

  static async extractVideoData(url: string): Promise<TikTokVideoData> {
    try {
      // Normalize TikTok URL
      const normalizedUrl = this.normalizeUrl(url);
      
      // Fetch the TikTok page
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 10000);
      
      const response = await fetch(normalizedUrl, {
        headers: this.headers,
        signal: controller.signal,
      });
      
      clearTimeout(timeoutId);

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      const html = await response.text();
      const $ = cheerio.load(html);

      // Method 1: Extract from SIGI_STATE
      let videoData = this.extractFromSigiState(html);
      
      // Method 2: Extract from script tags if SIGI_STATE fails
      if (!videoData) {
        videoData = this.extractFromScriptTags($);
      }

      // Method 3: Fallback extraction from meta tags
      if (!videoData) {
        videoData = this.extractFromMetaTags($);
      }

      if (!videoData) {
        throw new Error('Could not extract video data from TikTok page');
      }

      return videoData;
    } catch (error: any) {
      console.error('TikTok extraction error:', error);
      throw new Error(`Failed to extract TikTok video: ${error?.message || 'Unknown error'}`);
    }
  }

  private static normalizeUrl(url: string): string {
    // Handle various TikTok URL formats
    if (url.includes('vm.tiktok.com') || url.includes('vt.tiktok.com')) {
      // Short URLs need to be expanded
      return url;
    }
    
    // Ensure proper TikTok domain
    if (!url.includes('tiktok.com')) {
      throw new Error('Invalid TikTok URL');
    }

    return url;
  }

  private static extractFromSigiState(html: string): TikTokVideoData | null {
    try {
      // Look for SIGI_STATE in the HTML
      const sigiMatch = html.match(/window\['SIGI_STATE'\]\s*=\s*({.+?});/);
      
      if (!sigiMatch) {
        return null;
      }

      const sigiData = JSON.parse(sigiMatch[1]);
      
      // Navigate through the SIGI_STATE structure
      const itemModule = sigiData.ItemModule;
      if (!itemModule) return null;

      // Get the first video item
      const videoId = Object.keys(itemModule)[0];
      const videoItem = itemModule[videoId];

      if (!videoItem || !videoItem.video) return null;

      return {
        videoUrl: videoItem.video.playAddr || videoItem.video.downloadAddr,
        audioUrl: videoItem.music?.playUrl,
        thumbnail: videoItem.video.originCover || videoItem.video.dynamicCover,
        title: videoItem.desc || 'TikTok Video',
        author: videoItem.author?.uniqueId || 'Unknown',
        duration: videoItem.video.duration,
        noWatermark: videoItem.video.playAddr,
      };
    } catch (error) {
      console.error('SIGI_STATE extraction failed:', error);
      return null;
    }
  }

  private static extractFromScriptTags($: cheerio.CheerioAPI): TikTokVideoData | null {
    try {
      // Look for JSON data in script tags
      const scripts = $('script');
      
      for (let i = 0; i < scripts.length; i++) {
        const scriptContent = $(scripts[i]).html();
        if (!scriptContent) continue;

        // Look for video data patterns
        if (scriptContent.includes('"videoData"') || scriptContent.includes('"itemInfo"')) {
          const jsonMatch = scriptContent.match(/{.*"videoData".*}/) || 
                           scriptContent.match(/{.*"itemInfo".*}/);
          
          if (jsonMatch) {
            const data = JSON.parse(jsonMatch[0]);
            
            if (data.videoData?.itemInfos) {
              const item = data.videoData.itemInfos;
              return {
                videoUrl: item.video?.urls?.[0] || item.video?.playAddr,
                audioUrl: item.music?.playUrl,
                thumbnail: item.covers?.[0] || item.video?.originCover,
                title: item.text || 'TikTok Video',
                author: item.authorInfos?.uniqueId || 'Unknown',
                noWatermark: item.video?.playAddr,
              };
            }
          }
        }
      }

      return null;
    } catch (error) {
      console.error('Script tag extraction failed:', error);
      return null;
    }
  }

  private static extractFromMetaTags($: cheerio.CheerioAPI): TikTokVideoData | null {
    try {
      // Fallback: extract basic info from meta tags
      const title = $('meta[property="og:title"]').attr('content') || 
                   $('title').text() || 'TikTok Video';
      
      const thumbnail = $('meta[property="og:image"]').attr('content') || '';
      
      // This won't give us the actual video URL, but at least basic metadata
      return {
        videoUrl: '', // Will need alternative extraction method
        thumbnail,
        title,
        author: 'Unknown',
      };
    } catch (error) {
      console.error('Meta tag extraction failed:', error);
      return null;
    }
  }

  static async downloadVideo(videoUrl: string): Promise<Buffer> {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 30000);
      
      const response = await fetch(videoUrl, {
        headers: {
          ...this.headers,
          'Referer': 'https://www.tiktok.com/',
        },
        signal: controller.signal,
      });
      
      clearTimeout(timeoutId);

      if (!response.ok) {
        throw new Error(`Failed to download video: ${response.status}`);
      }

      return Buffer.from(await response.arrayBuffer());
    } catch (error: any) {
      throw new Error(`Video download failed: ${error?.message || 'Unknown error'}`);
    }
  }
}