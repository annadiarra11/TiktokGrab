import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { downloadRequestSchema } from "@shared/schema";
import { z } from "zod";
import fs from 'fs';
import path from 'path';
import { TikTokExtractor } from './tiktok-extractor';

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
      
      // Extract real TikTok video data
      try {
        const videoData = await TikTokExtractor.extractVideoData(url);
        
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
          message: "Video processing started",
          thumbnail: videoData.thumbnail,
          title: videoData.title,
          author: videoData.author,
          filename: `tiktok-video-${quality}-${Date.now()}.mp4`,
        });
      } catch (extractionError: any) {
        // Fallback to basic response if extraction fails
        const videoId = url.split('/').pop()?.split('?')[0] || Date.now().toString();
        
        res.json({
          success: true,
          requestId: downloadRequest.id,
          message: "Video processing started",
          thumbnail: `https://picsum.photos/300/200?random=${Math.floor(Math.random() * 1000)}`,
          title: `TikTok Video ${videoId.slice(-6)}`,
          filename: `tiktok-video-${quality}-${Date.now()}.mp4`,
          extractionError: extractionError?.message || 'Extraction failed',
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
      
      if (!extractedData || !extractedData.videoUrl) {
        res.status(404).json({
          success: false,
          message: "Video data not available",
        });
        return;
      }
      
      try {
        // Download the actual TikTok video
        const videoBuffer = await TikTokExtractor.downloadVideo(extractedData.videoUrl);
        
        res.setHeader('Content-Type', 'video/mp4');
        res.setHeader('Content-Disposition', `attachment; filename="tiktok-video-${Date.now()}.mp4"`);
        res.setHeader('Content-Length', videoBuffer.length.toString());
        
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
      
      if (!extractedData) {
        res.status(404).json({
          success: false,
          message: "Audio data not available",
        });
        return;
      }
      
      try {
        // Try to download from audio URL if available, otherwise use video URL
        const audioUrl = extractedData.audioUrl || extractedData.videoUrl;
        
        if (!audioUrl) {
          res.status(404).json({
            success: false,
            message: "No audio source available",
          });
          return;
        }
        
        // Download the audio (or video to extract audio)
        const audioBuffer = await TikTokExtractor.downloadVideo(audioUrl);
        
        res.setHeader('Content-Type', 'audio/mpeg');
        res.setHeader('Content-Disposition', `attachment; filename="tiktok-audio-${Date.now()}.mp3"`);
        res.setHeader('Content-Length', audioBuffer.length.toString());
        
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
