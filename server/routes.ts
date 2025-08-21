import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { downloadRequestSchema } from "@shared/schema";
import { z } from "zod";
import fs from 'fs';
import path from 'path';

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
          // For demo purposes, we'll simulate TikTok metadata extraction
          // In a real implementation, you would use TikTok API or web scraping
          const videoId = url.split('/').pop()?.split('?')[0] || Date.now().toString();
          const mockThumbnail = `https://picsum.photos/300/200?random=${Math.floor(Math.random() * 1000)}`;
          const mockTitle = `TikTok Video ${videoId.slice(-6)}`;
          
          const fileName = `tiktok-video-${Date.now()}.mp4`;
          const downloadUrl = `/api/download/${downloadRequest.id}/file`;
          
          await storage.updateDownloadRequest(downloadRequest.id, {
            status: "completed",
            fileName,
            downloadUrl,
            completedAt: new Date(),
            metadata: {
              originalUrl: url,
              quality,
              processedAt: new Date().toISOString(),
              thumbnail: mockThumbnail,
              title: mockTitle,
            },
          });
        } catch (error) {
          await storage.updateDownloadRequest(downloadRequest.id, {
            status: "failed",
            completedAt: new Date(),
          });
        }
      }, 3000); // Simulate 3 second processing time
      
      // Generate mock metadata for immediate response
      const videoId = url.split('/').pop()?.split('?')[0] || Date.now().toString();
      const mockThumbnail = `https://picsum.photos/300/200?random=${Math.floor(Math.random() * 1000)}`;
      const mockTitle = `TikTok Video ${videoId.slice(-6)}`;
      
      // Return success response with request ID and video metadata
      res.json({
        success: true,
        requestId: downloadRequest.id,
        message: "Video processing started",
        thumbnail: mockThumbnail,
        title: mockTitle,
        filename: `tiktok-video-${quality}-${Date.now()}.mp4`,
      });
      
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
      
      // For demo purposes, serve a sample video file
      // In production, you would serve the actual processed TikTok video
      const sampleVideoPath = path.join(process.cwd(), 'sample-files', 'sample-video.mp4');
      
      // Create sample-files directory if it doesn't exist
      const sampleFilesDir = path.join(process.cwd(), 'sample-files');
      if (!fs.existsSync(sampleFilesDir)) {
        fs.mkdirSync(sampleFilesDir, { recursive: true });
      }
      
      // Create a small sample MP4 file if it doesn't exist
      if (!fs.existsSync(sampleVideoPath)) {
        // Create a minimal MP4 file (this is just a placeholder)
        const sampleContent = Buffer.from('SAMPLE_MP4_CONTENT_PLACEHOLDER');
        fs.writeFileSync(sampleVideoPath, sampleContent);
      }
      
      res.setHeader('Content-Type', 'video/mp4');
      res.setHeader('Content-Disposition', `attachment; filename="tiktok-video-${Date.now()}.mp4"`);
      
      // Stream the file
      const fileStream = fs.createReadStream(sampleVideoPath);
      fileStream.pipe(res);
      
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
      
      // For demo purposes, serve a sample audio file
      // In production, you would extract and serve the actual audio from TikTok video
      const sampleAudioPath = path.join(process.cwd(), 'sample-files', 'sample-audio.mp3');
      
      // Create sample-files directory if it doesn't exist
      const sampleFilesDir = path.join(process.cwd(), 'sample-files');
      if (!fs.existsSync(sampleFilesDir)) {
        fs.mkdirSync(sampleFilesDir, { recursive: true });
      }
      
      // Create a small sample MP3 file if it doesn't exist
      if (!fs.existsSync(sampleAudioPath)) {
        // Create a minimal MP3 file (this is just a placeholder)
        const sampleContent = Buffer.from('SAMPLE_MP3_CONTENT_PLACEHOLDER');
        fs.writeFileSync(sampleAudioPath, sampleContent);
      }
      
      res.setHeader('Content-Type', 'audio/mpeg');
      res.setHeader('Content-Disposition', `attachment; filename="tiktok-audio-${Date.now()}.mp3"`);
      
      // Stream the file
      const fileStream = fs.createReadStream(sampleAudioPath);
      fileStream.pipe(res);
      
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
