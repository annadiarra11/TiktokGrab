import { type User, type InsertUser, type DownloadRequest, type InsertDownloadRequest } from "@shared/schema";
import { randomUUID } from "crypto";

export interface IStorage {
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Download request methods
  createDownloadRequest(request: InsertDownloadRequest): Promise<DownloadRequest>;
  getDownloadRequest(id: string): Promise<DownloadRequest | undefined>;
  updateDownloadRequest(id: string, updates: Partial<DownloadRequest>): Promise<DownloadRequest | undefined>;
  getDownloadRequestsByStatus(status: string): Promise<DownloadRequest[]>;
}

export class MemStorage implements IStorage {
  private users: Map<string, User>;
  private downloadRequests: Map<string, DownloadRequest>;

  constructor() {
    this.users = new Map();
    this.downloadRequests = new Map();
  }

  async getUser(id: string): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = randomUUID();
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  async createDownloadRequest(request: InsertDownloadRequest): Promise<DownloadRequest> {
    const id = randomUUID();
    const downloadRequest: DownloadRequest = {
      id,
      ...request,
      status: "pending",
      fileName: null,
      downloadUrl: null,
      metadata: null,
      createdAt: new Date(),
      completedAt: null,
    };
    this.downloadRequests.set(id, downloadRequest);
    return downloadRequest;
  }

  async getDownloadRequest(id: string): Promise<DownloadRequest | undefined> {
    return this.downloadRequests.get(id);
  }

  async updateDownloadRequest(id: string, updates: Partial<DownloadRequest>): Promise<DownloadRequest | undefined> {
    const request = this.downloadRequests.get(id);
    if (!request) return undefined;

    const updatedRequest = { ...request, ...updates };
    this.downloadRequests.set(id, updatedRequest);
    return updatedRequest;
  }

  async getDownloadRequestsByStatus(status: string): Promise<DownloadRequest[]> {
    return Array.from(this.downloadRequests.values()).filter(
      (request) => request.status === status
    );
  }
}

export const storage = new MemStorage();
