import * as filesRepository from "../repositories/filesRepository";
import { getOwnedFolderOrFail } from "./folderService";
import { AppError } from "../errors/AppError";
import {
  buildPrivateStorageKey,
  createPrivateUploadUrl,
  deletePrivateFile,
  generatePrivateFileUrl,
} from "./r2Service";
import { getUserStorageUsage, getStorageLimit } from "./storageService";
import { findUserById } from "../repositories/userRepository";
import { ensureUserCanAccessFolder } from "./folderAccessService";

const ALLOWED_MIME_TYPES = [
  "application/pdf",
  "audio/mpeg",
  "audio/wav",
  "audio/ogg",
  "image/jpeg",
  "image/png",
  "image/gif",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  "application/vnd.ms-excel",
  "text/plain",
  "text/markdown",
  "text/csv",
  "application/json",
  "text/javascript",
  "application/javascript",
  "text/typescript",
  "text/html",
  "text/css",
  "video/mp4",
  "video/webm",
  "video/ogg",
  "application/zip",
  "application/x-zip-compressed",
  "application/vnd.rar",
  "application/x-rar-compressed",
  "application/x-7z-compressed",
];

const ALLOWED_EXTENSIONS = [
  "pdf",
  "mp3",
  "wav",
  "ogg",
  "jpg",
  "jpeg",
  "png",
  "gif",
  "txt",
  "md",
  "markdown",
  "csv",
  "json",
  "js",
  "ts",
  "html",
  "css",
  "mp4",
  "webm",
  "doc",
  "docx",
  "xls",
  "xlsx",
  "zip",
  "rar",
  "7z",
];

const FREE_MAX_FILE_SIZE = 50 * 1024 * 1024;
const PRO_MAX_FILE_SIZE = 500 * 1024 * 1024;

type CreateUploadUrlInput = {
  folderId: number;
  fileName: string;
  fileType: string;
  fileSize: number;
};

type CompleteUploadInput = {
  folderId: number;
  fileName: string;
  fileSize: number;
  storageKey: string;
};

function getMaxFileSizeByPlan(plan: string) {
  return plan === "PRO" ? PRO_MAX_FILE_SIZE : FREE_MAX_FILE_SIZE;
}

function getFileSizeLimitErrorMessage(plan: string) {
  return plan === "PRO"
    ? "Arquivo excede o limite de 500 MB por upload"
    : "Arquivo excede o limite de 50 MB do plano FREE";
}

function getFileExtension(fileName: string) {
  return fileName.split(".").pop()?.toLowerCase() || "";
}

function validateFileType(fileName: string, fileType: string) {
  const fileExtension = getFileExtension(fileName);
  const normalizedFileType = fileType?.trim() || "";

  const isMimeAllowed = ALLOWED_MIME_TYPES.includes(normalizedFileType);
  const isExtensionAllowed = ALLOWED_EXTENSIONS.includes(fileExtension);

  if (!isMimeAllowed && !isExtensionAllowed) {
    throw new AppError("File type not allowed", 400);
  }
}

export async function createUploadUrl(
  input: CreateUploadUrlInput,
  userId: number
) {
  const { folderId, fileName, fileType, fileSize } = input;

  await getOwnedFolderOrFail(folderId, userId);

  const user = await findUserById(userId);

  if (!user) {
    throw new AppError("Usuário não encontrado", 404);
  }

  validateFileType(fileName, fileType);

  const maxFileSize = getMaxFileSizeByPlan(user.plan);

  if (fileSize > maxFileSize) {
    throw new AppError(getFileSizeLimitErrorMessage(user.plan), 400);
  }

  const existingFileInFolder = await filesRepository.findFileByNameInFolder(
    fileName,
    folderId
  );

  if (existingFileInFolder) {
    throw new AppError("Já existe um arquivo com esse nome nesta pasta", 400);
  }

  const usedStorage = await getUserStorageUsage(userId);
  const storageLimit = getStorageLimit(user.plan);

  if (usedStorage + fileSize > storageLimit) {
    throw new AppError("Limite de armazenamento do plano atingido", 400);
  }

  const storageKey = buildPrivateStorageKey(fileName, userId, folderId);
  const { url } = await createPrivateUploadUrl(storageKey, fileType);

  return {
    uploadUrl: url,
    storageKey,
  };
}

export async function completeUpload(
  input: CompleteUploadInput,
  userId: number
) {
  const { folderId, fileName, fileSize, storageKey } = input;

  await getOwnedFolderOrFail(folderId, userId);

  const user = await findUserById(userId);

  if (!user) {
    throw new AppError("Usuário não encontrado", 404);
  }

  const existingFileInFolder = await filesRepository.findFileByNameInFolder(
    fileName,
    folderId
  );

  if (existingFileInFolder) {
    throw new AppError("Já existe um arquivo com esse nome nesta pasta", 400);
  }

  const maxFileSize = getMaxFileSizeByPlan(user.plan);

  if (fileSize > maxFileSize) {
    throw new AppError(getFileSizeLimitErrorMessage(user.plan), 400);
  }

  const usedStorage = await getUserStorageUsage(userId);
  const storageLimit = getStorageLimit(user.plan);

  if (usedStorage + fileSize > storageLimit) {
    throw new AppError("Limite de armazenamento do plano atingido", 400);
  }

  return filesRepository.createFile({
    name: fileName,
    url: null,
    storageKey,
    size: fileSize,
    folderId,
  });
}

export async function getFilesByFolder(folderId: number, userId: number) {
  await ensureUserCanAccessFolder(folderId, userId);
  return filesRepository.findFilesByFolder(folderId);
}

export async function updateFileName(
  id: number,
  userId: number,
  name: string
) {
  const trimmedName = name.trim();

  if (!trimmedName) {
    throw new AppError("O nome do arquivo é obrigatório", 400);
  }

  const file = await filesRepository.getFileById(id);

  if (!file) {
    throw new AppError("File not found", 404);
  }

  if (file.folder.userId !== userId) {
    throw new AppError("Forbidden", 403);
  }

  const existingFileInFolder = await filesRepository.findFileByNameInFolder(
    trimmedName,
    file.folderId
  );

  if (existingFileInFolder && existingFileInFolder.id !== id) {
    throw new AppError("Já existe um arquivo com esse nome nesta pasta", 400);
  }

  return filesRepository.updateFileName(id, trimmedName);
}

export async function moveFileToFolder(
  fileId: number,
  targetFolderId: number,
  userId: number
) {
  const file = await filesRepository.getFileById(fileId);

  if (!file) {
    throw new AppError("Arquivo não encontrado", 404);
  }

  if (file.folder.userId !== userId) {
    throw new AppError("Forbidden", 403);
  }

  const targetFolder = await getOwnedFolderOrFail(targetFolderId, userId);

  if (file.folderId === targetFolder.id) {
    throw new AppError("O arquivo já está nesta pasta", 400);
  }

  const existingFileInTargetFolder =
    await filesRepository.findFileByNameInFolder(file.name, targetFolderId);

  if (existingFileInTargetFolder) {
    throw new AppError(
      "Já existe um arquivo com esse nome na pasta de destino",
      400
    );
  }

  return filesRepository.moveFileToFolder(fileId, targetFolderId);
}

export async function deleteFile(id: number, userId: number) {
  const file = await filesRepository.getFileById(id);

  if (!file) {
    throw new AppError("File not found", 404);
  }

  if (file.folder.userId !== userId) {
    throw new AppError("Forbidden", 403);
  }

  await deletePrivateFile(file.storageKey);
  await filesRepository.deleteFileById(id);
}

export async function getFileDownloadUrl(id: number, userId: number) {
  const file = await filesRepository.getFileById(id);

  if (!file) {
    throw new AppError("File not found", 404);
  }

  await ensureUserCanAccessFolder(file.folderId, userId);

  return generatePrivateFileUrl(file.storageKey);
}