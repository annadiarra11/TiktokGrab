import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { downloadRequestSchema } from "@shared/schema";
import { z } from "zod";
import { TikTokAPI } from './tiktok-api';

export async function registerRoutes(app: Express): Promise<Server> {
  // TikTok video download endpoint
  app.post("/api/download", async (req, res) => {
    try {
      const { url } = downloadRequestSchema.parse(req.body);
      const quality = "hd"; // Default quality since we removed the quality selector
      
      // Create download request in storage
      const downloadRequest = await storage.createDownloadRequest({ url, quality });
      
      // Simulate video processing (in real app, this would call TikTok API)
      await storage.updateDownloadRequest(downloadRequest.id, { status: "processing" });
      
      // Simulate download processing delay
      setTimeout(async () => {
        try {
          // Update with completed status
          const fileName = `tiktok-video-${Date.now()}.mp4`;
          const downloadUrl = `/api/download/${downloadRequest.id}/file`;
          
          await storage.updateDownloadRequest(downloadRequest.id, {
            status: "completed",
            fileName,
            downloadUrl,
            completedAt: new Date(),
          });
        } catch (error) {
          await storage.updateDownloadRequest(downloadRequest.id, {
            status: "failed",
            completedAt: new Date(),
          });
        }
      }, 3000); // Simulate 3 second processing time
      
      // Extract real TikTok video data using professional API
      try {
        const videoData = await TikTokAPI.extractAndDownload(url);
        
        // Store the extracted video data for later download
        await storage.updateDownloadRequest(downloadRequest.id, {
          metadata: {
            originalUrl: url,
            quality,
            extractedData: videoData,
            processedAt: new Date().toISOString(),
          },
        });
        
        // Return success response with real video metadata
        res.json({
          success: true,
          requestId: downloadRequest.id,
          message: "Video ready for download",
          thumbnail: videoData.thumbnail,
          title: videoData.title,
          author: videoData.author,
          filename: `${videoData.title?.replace(/[^a-zA-Z0-9]/g, '_') || 'tiktok-video'}.mp4`,
        });
      } catch (extractionError: any) {
        console.error('TikTok extraction failed:', extractionError);
        
        res.status(400).json({
          success: false,
          message: "Failed to process TikTok video",
          error: extractionError?.message || 'Unable to extract video data',
        });
      }
      
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({
          success: false,
          message: "Invalid request data",
          errors: error.errors,
        });
      } else {
        res.status(500).json({
          success: false,
          message: "Internal server error",
        });
      }
    }
  });

  // Check download status endpoint
  app.get("/api/download/:id/status", async (req, res) => {
    try {
      const { id } = req.params;
      const downloadRequest = await storage.getDownloadRequest(id);
      
      if (!downloadRequest) {
        res.status(404).json({
          success: false,
          message: "Download request not found",
        });
        return;
      }
      
      res.json({
        success: true,
        status: downloadRequest.status,
        fileName: downloadRequest.fileName,
        downloadUrl: downloadRequest.downloadUrl,
        createdAt: downloadRequest.createdAt,
        completedAt: downloadRequest.completedAt,
      });
      
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Internal server error",
      });
    }
  });

  // Download video file endpoint
  app.get("/api/download/:id/video", async (req, res) => {
    try {
      const { id } = req.params;
      const downloadRequest = await storage.getDownloadRequest(id);
      
      if (!downloadRequest) {
        res.status(404).json({
          success: false,
          message: "Download request not found",
        });
        return;
      }
      
      // Get the extracted video data
      const extractedData = (downloadRequest.metadata as any)?.extractedData;
      
      if (!extractedData || !extractedData.downloads) {
        res.status(404).json({
          success: false,
          message: "Video data not available",
        });
        return;
      }
      
      try {
        // Get the best quality video URL
        const videoUrl = extractedData.downloads.hd || 
                        extractedData.downloads.noWatermark || 
                        extractedData.downloads.sd;
        
        if (!videoUrl) {
          res.status(404).json({
            success: false,
            message: "No video download URL available",
          });
          return;
        }
        
        // Download the actual TikTok video
        const videoBuffer = await TikTokAPI.downloadFile(videoUrl);
        
        res.setHeader('Content-Type', 'video/mp4');
        res.setHeader('Content-Disposition', `attachment; filename="${extractedData.title?.replace(/[^a-zA-Z0-9]/g, '_') || 'tiktok-video'}.mp4"`);
        res.setHeader('Content-Length', videoBuffer.length.toString());
        res.setHeader('Cache-Control', 'no-cache');
        
        // Send the actual video file
        res.send(videoBuffer);
        
      } catch (downloadError: any) {
        console.error('Video download error:', downloadError);
        res.status(500).json({
          success: false,
          message: "Failed to download video file",
          error: downloadError?.message || 'Download failed',
        });
      }
      
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Internal server error",
      });
    }
  });
  
  // Download audio file endpoint
  app.get("/api/download/:id/audio", async (req, res) => {
    try {
      const { id } = req.params;
      const downloadRequest = await storage.getDownloadRequest(id);
      
      if (!downloadRequest) {
        res.status(404).json({
          success: false,
          message: "Download request not found",
        });
        return;
      }
      
      // Get the extracted video data
      const extractedData = (downloadRequest.metadata as any)?.extractedData;
      
      if (!extractedData || !extractedData.downloads) {
        res.status(404).json({
          success: false,
          message: "Audio data not available",
        });
        return;
      }
      
      try {
        // Try to get audio URL, fallback to video URL for audio extraction
        const audioUrl = extractedData.downloads.audio || 
                        extractedData.downloads.hd || 
                        extractedData.downloads.noWatermark || 
                        extractedData.downloads.sd;
        
        if (!audioUrl) {
          res.status(404).json({
            success: false,
            message: "No audio source available",
          });
          return;
        }
        
        // Download the audio file
        const audioBuffer = await TikTokAPI.downloadFile(audioUrl);
        
        // Set appropriate headers for audio
        const isAudioUrl = extractedData.downloads.audio === audioUrl;
        const contentType = isAudioUrl ? 'audio/mpeg' : 'video/mp4';
        const extension = isAudioUrl ? 'mp3' : 'mp4';
        
        res.setHeader('Content-Type', contentType);
        res.setHeader('Content-Disposition', `attachment; filename="${extractedData.title?.replace(/[^a-zA-Z0-9]/g, '_') || 'tiktok-audio'}.${extension}"`);
        res.setHeader('Content-Length', audioBuffer.length.toString());
        res.setHeader('Cache-Control', 'no-cache');
        
        // Send the audio file
        res.send(audioBuffer);
        
      } catch (downloadError: any) {
        console.error('Audio download error:', downloadError);
        res.status(500).json({
          success: false,
          message: "Failed to download audio file",
          error: downloadError?.message || 'Download failed',
        });
      }
      
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Internal server error",
      });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
