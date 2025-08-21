import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { downloadRequestSchema } from "@shared/schema";
import { z } from "zod";

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
          // In a real implementation, you would:
          // 1. Extract video metadata from TikTok URL
          // 2. Download the video file
          // 3. Remove watermarks if needed
          // 4. Store the processed video file
          // 5. Generate a download URL
          
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
            },
          });
        } catch (error) {
          await storage.updateDownloadRequest(downloadRequest.id, {
            status: "failed",
            completedAt: new Date(),
          });
        }
      }, 3000); // Simulate 3 second processing time
      
      // Return success response with request ID and immediate processing simulation
      res.json({
        success: true,
        requestId: downloadRequest.id,
        message: "Video processing started",
        // For demo purposes, return downloadUrl immediately with a simulated file
        downloadUrl: `https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4`,
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

  // Download file endpoint (placeholder)
  app.get("/api/download/:id/file", async (req, res) => {
    try {
      const { id } = req.params;
      const downloadRequest = await storage.getDownloadRequest(id);
      
      if (!downloadRequest || downloadRequest.status !== "completed") {
        res.status(404).json({
          success: false,
          message: "File not found or not ready",
        });
        return;
      }
      
      // In a real implementation, you would serve the actual video file
      // For now, we'll redirect to a placeholder or return an error
      res.status(501).json({
        success: false,
        message: "File download not implemented in demo",
        fileName: downloadRequest.fileName,
      });
      
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
