import * as filesRepository from "../repositories/filesRepository";
import { getOwnedFolderOrFail } from "./folderService";
import { AppError } from "../errors/AppError";
import {
  uploadBufferToCloudinary,
  deleteFromCloudinary,
} from "./cloudinaryService";

export async function uploadFile(
  file: Express.Multer.File,
  folderId: number,
  userId: number
) {
  await getOwnedFolderOrFail(folderId, userId);

  const uploaded = await uploadBufferToCloudinary(file.buffer, file.originalname);

  return filesRepository.createFile({
    name: file.originalname,
    url: uploaded.secure_url,
    publicId: uploaded.public_id,
    folderId,
  });
}

export async function getFilesByFolder(folderId: number, userId: number) {
  await getOwnedFolderOrFail(folderId, userId);

  return filesRepository.findFilesByFolder(folderId);
}

export async function deleteFile(id: number, userId: number) {
  const file = await filesRepository.getFileById(id);

  if (!file) {
    throw new AppError("File not found", 404);
  }

  if (file.folder.userId !== userId) {
    throw new AppError("Forbidden", 403);
  }

  await deleteFromCloudinary(file.publicId);
  await filesRepository.deleteFileById(id);
}