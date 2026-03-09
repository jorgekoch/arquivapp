import crypto from "crypto";
import { AppError } from "../errors/AppError";
import * as filesRepository from "../repositories/filesRepository";
import * as sharedFileRepository from "../repositories/sharedFileRepository";
import { generatePrivateFileUrl } from "./r2Service";

export async function createSharedFileLink(fileId: number, userId: number) {
  const file = await filesRepository.getFileById(fileId);

  if (!file) {
    throw new AppError("File not found", 404);
  }

  if (file.folder.userId !== userId) {
    throw new AppError("Forbidden", 403);
  }

  const existingSharedFile = await sharedFileRepository.findSharedFileByFileId(fileId);

  const backendUrl = process.env.BACKEND_URL || "http://localhost:4000";

  if (existingSharedFile) {
    return {
      shareUrl: `${backendUrl}/shared/${existingSharedFile.token}`,
    };
  }

  const token = crypto.randomBytes(24).toString("hex");

  const sharedFile = await sharedFileRepository.createSharedFile(fileId, token, null);

  return {
    shareUrl: `${backendUrl}/shared/${sharedFile.token}`,
  };
}

export async function accessSharedFile(token: string) {
  const sharedFile = await sharedFileRepository.findSharedFileByToken(token);

  if (!sharedFile) {
    throw new AppError("Link de compartilhamento inválido", 404);
  }

  if (sharedFile.expiresAt && sharedFile.expiresAt.getTime() < Date.now()) {
    throw new AppError("Link de compartilhamento expirado", 400);
  }

  return generatePrivateFileUrl(sharedFile.file.storageKey);
}