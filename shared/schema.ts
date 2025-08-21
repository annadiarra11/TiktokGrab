import { sql } from "drizzle-orm";
import { pgTable, text, varchar, timestamp, jsonb } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const downloadRequests = pgTable("download_requests", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  url: text("url").notNull(),
  quality: text("quality").notNull(),
  status: text("status").notNull().default("pending"), // pending, processing, completed, failed
  fileName: text("file_name"),
  downloadUrl: text("download_url"),
  metadata: jsonb("metadata"),
  createdAt: timestamp("created_at").defaultNow(),
  completedAt: timestamp("completed_at"),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export const insertDownloadRequestSchema = createInsertSchema(downloadRequests).pick({
  url: true,
  quality: true,
});

export const downloadRequestSchema = insertDownloadRequestSchema.extend({
  url: z.string().url("Please enter a valid URL").refine(
    (url) => url.includes("tiktok.com"),
    "URL must be from TikTok"
  ),
  quality: z.enum(["hd", "sd", "audio"]),
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;
export type InsertDownloadRequest = z.infer<typeof insertDownloadRequestSchema>;
export type DownloadRequest = typeof downloadRequests.$inferSelect;
export type DownloadRequestForm = z.infer<typeof downloadRequestSchema>;
