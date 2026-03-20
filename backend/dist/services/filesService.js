"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.createUploadUrl = createUploadUrl;
exports.completeUpload = completeUpload;
exports.getFilesByFolder = getFilesByFolder;
exports.updateFileName = updateFileName;
exports.moveFileToFolder = moveFileToFolder;
exports.deleteFile = deleteFile;
exports.getFileDownloadUrl = getFileDownloadUrl;
const filesRepository = __importStar(require("../repositories/filesRepository"));
const folderService_1 = require("./folderService");
const AppError_1 = require("../errors/AppError");
const r2Service_1 = require("./r2Service");
const storageService_1 = require("./storageService");
const userRepository_1 = require("../repositories/userRepository");
const folderAccessService_1 = require("./folderAccessService");
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
function getMaxFileSizeByPlan(plan) {
    return plan === "PRO" ? PRO_MAX_FILE_SIZE : FREE_MAX_FILE_SIZE;
}
function getFileSizeLimitErrorMessage(plan) {
    return plan === "PRO"
        ? "Arquivo excede o limite de 500 MB por upload"
        : "Arquivo excede o limite de 50 MB do plano FREE";
}
function getFileExtension(fileName) {
    return fileName.split(".").pop()?.toLowerCase() || "";
}
function validateFileType(fileName, fileType) {
    const fileExtension = getFileExtension(fileName);
    const normalizedFileType = fileType?.trim() || "";
    const isMimeAllowed = ALLOWED_MIME_TYPES.includes(normalizedFileType);
    const isExtensionAllowed = ALLOWED_EXTENSIONS.includes(fileExtension);
    if (!isMimeAllowed && !isExtensionAllowed) {
        throw new AppError_1.AppError("File type not allowed", 400);
    }
}
async function createUploadUrl(input, userId) {
    const { folderId, fileName, fileType, fileSize } = input;
    await (0, folderService_1.getOwnedFolderOrFail)(folderId, userId);
    const user = await (0, userRepository_1.findUserById)(userId);
    if (!user) {
        throw new AppError_1.AppError("Usuário não encontrado", 404);
    }
    validateFileType(fileName, fileType);
    const maxFileSize = getMaxFileSizeByPlan(user.plan);
    if (fileSize > maxFileSize) {
        throw new AppError_1.AppError(getFileSizeLimitErrorMessage(user.plan), 400);
    }
    const existingFileInFolder = await filesRepository.findFileByNameInFolder(fileName, folderId);
    if (existingFileInFolder) {
        throw new AppError_1.AppError("Já existe um arquivo com esse nome nesta pasta", 400);
    }
    const usedStorage = await (0, storageService_1.getUserStorageUsage)(userId);
    const storageLimit = (0, storageService_1.getStorageLimit)(user.plan);
    if (usedStorage + fileSize > storageLimit) {
        throw new AppError_1.AppError("Limite de armazenamento do plano atingido", 400);
    }
    const storageKey = (0, r2Service_1.buildPrivateStorageKey)(fileName, userId, folderId);
    const { url } = await (0, r2Service_1.createPrivateUploadUrl)(storageKey, fileType);
    return {
        uploadUrl: url,
        storageKey,
    };
}
async function completeUpload(input, userId) {
    const { folderId, fileName, fileSize, storageKey } = input;
    await (0, folderService_1.getOwnedFolderOrFail)(folderId, userId);
    const user = await (0, userRepository_1.findUserById)(userId);
    if (!user) {
        throw new AppError_1.AppError("Usuário não encontrado", 404);
    }
    const existingFileInFolder = await filesRepository.findFileByNameInFolder(fileName, folderId);
    if (existingFileInFolder) {
        throw new AppError_1.AppError("Já existe um arquivo com esse nome nesta pasta", 400);
    }
    const maxFileSize = getMaxFileSizeByPlan(user.plan);
    if (fileSize > maxFileSize) {
        throw new AppError_1.AppError(getFileSizeLimitErrorMessage(user.plan), 400);
    }
    const usedStorage = await (0, storageService_1.getUserStorageUsage)(userId);
    const storageLimit = (0, storageService_1.getStorageLimit)(user.plan);
    if (usedStorage + fileSize > storageLimit) {
        throw new AppError_1.AppError("Limite de armazenamento do plano atingido", 400);
    }
    return filesRepository.createFile({
        name: fileName,
        url: null,
        storageKey,
        size: fileSize,
        folderId,
    });
}
async function getFilesByFolder(folderId, userId) {
    await (0, folderAccessService_1.ensureUserCanAccessFolder)(folderId, userId);
    return filesRepository.findFilesByFolder(folderId);
}
async function updateFileName(id, userId, name) {
    const trimmedName = name.trim();
    if (!trimmedName) {
        throw new AppError_1.AppError("O nome do arquivo é obrigatório", 400);
    }
    const file = await filesRepository.getFileById(id);
    if (!file) {
        throw new AppError_1.AppError("File not found", 404);
    }
    if (file.folder.userId !== userId) {
        throw new AppError_1.AppError("Forbidden", 403);
    }
    const existingFileInFolder = await filesRepository.findFileByNameInFolder(trimmedName, file.folderId);
    if (existingFileInFolder && existingFileInFolder.id !== id) {
        throw new AppError_1.AppError("Já existe um arquivo com esse nome nesta pasta", 400);
    }
    return filesRepository.updateFileName(id, trimmedName);
}
async function moveFileToFolder(fileId, targetFolderId, userId) {
    const file = await filesRepository.getFileById(fileId);
    if (!file) {
        throw new AppError_1.AppError("Arquivo não encontrado", 404);
    }
    if (file.folder.userId !== userId) {
        throw new AppError_1.AppError("Forbidden", 403);
    }
    const targetFolder = await (0, folderService_1.getOwnedFolderOrFail)(targetFolderId, userId);
    if (file.folderId === targetFolder.id) {
        throw new AppError_1.AppError("O arquivo já está nesta pasta", 400);
    }
    const existingFileInTargetFolder = await filesRepository.findFileByNameInFolder(file.name, targetFolderId);
    if (existingFileInTargetFolder) {
        throw new AppError_1.AppError("Já existe um arquivo com esse nome na pasta de destino", 400);
    }
    return filesRepository.moveFileToFolder(fileId, targetFolderId);
}
async function deleteFile(id, userId) {
    const file = await filesRepository.getFileById(id);
    if (!file) {
        throw new AppError_1.AppError("File not found", 404);
    }
    if (file.folder.userId !== userId) {
        throw new AppError_1.AppError("Forbidden", 403);
    }
    await (0, r2Service_1.deletePrivateFile)(file.storageKey);
    await filesRepository.deleteFileById(id);
}
async function getFileDownloadUrl(id, userId) {
    const file = await filesRepository.getFileById(id);
    if (!file) {
        throw new AppError_1.AppError("File not found", 404);
    }
    await (0, folderAccessService_1.ensureUserCanAccessFolder)(file.folderId, userId);
    return (0, r2Service_1.generatePrivateFileUrl)(file.storageKey);
}
