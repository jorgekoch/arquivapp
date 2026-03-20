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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createSharedFileLink = createSharedFileLink;
exports.accessSharedFile = accessSharedFile;
exports.getSharedFileDetails = getSharedFileDetails;
const crypto_1 = __importDefault(require("crypto"));
const AppError_1 = require("../errors/AppError");
const filesRepository = __importStar(require("../repositories/filesRepository"));
const sharedFileRepository = __importStar(require("../repositories/sharedFileRepository"));
const r2Service_1 = require("./r2Service");
const userRepository_1 = require("../repositories/userRepository");
function getValidSharedFileOrThrow(sharedFile) {
    if (!sharedFile) {
        throw new AppError_1.AppError("Link de compartilhamento inválido", 404);
    }
    if (sharedFile.expiresAt && sharedFile.expiresAt.getTime() < Date.now()) {
        throw new AppError_1.AppError("Link de compartilhamento expirado", 400);
    }
    return sharedFile;
}
function getFileExtension(fileName) {
    const parts = fileName.split(".");
    if (parts.length < 2)
        return "";
    return parts[parts.length - 1].toLowerCase();
}
function getMimeTypeFromFileName(fileName) {
    const extension = getFileExtension(fileName);
    const mimeTypesByExtension = {
        pdf: "application/pdf",
        mp3: "audio/mpeg",
        wav: "audio/wav",
        jpg: "image/jpeg",
        jpeg: "image/jpeg",
        png: "image/png",
        webp: "image/webp",
        gif: "image/gif",
        doc: "application/msword",
        docx: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    };
    return mimeTypesByExtension[extension] || "application/octet-stream";
}
async function createSharedFileLink(fileId, userId) {
    const file = await filesRepository.getFileById(fileId);
    const user = await (0, userRepository_1.findUserById)(userId);
    if (!user) {
        throw new AppError_1.AppError("Usuário não encontrado", 404);
    }
    if (user.plan !== "PRO") {
        throw new AppError_1.AppError("Compartilhamento disponível apenas para usuários do plano PRO", 403);
    }
    if (!file) {
        throw new AppError_1.AppError("File not found", 404);
    }
    if (file.folder.userId !== userId) {
        throw new AppError_1.AppError("Forbidden", 403);
    }
    const existingSharedFile = await sharedFileRepository.findSharedFileByFileId(fileId);
    const frontendUrl = process.env.FRONTEND_URL || "http://localhost:5173";
    if (existingSharedFile) {
        return {
            shareUrl: `${frontendUrl}/shared/${existingSharedFile.token}`,
        };
    }
    const token = crypto_1.default.randomBytes(24).toString("hex");
    const sharedFile = await sharedFileRepository.createSharedFile(fileId, token, null);
    return {
        shareUrl: `${frontendUrl}/shared/${sharedFile.token}`,
    };
}
async function accessSharedFile(token) {
    const sharedFile = await sharedFileRepository.findSharedFileByToken(token);
    const validSharedFile = getValidSharedFileOrThrow(sharedFile);
    return (0, r2Service_1.generatePrivateFileUrl)(validSharedFile.file.storageKey);
}
async function getSharedFileDetails(token) {
    const sharedFile = await sharedFileRepository.findSharedFileByToken(token);
    const validSharedFile = getValidSharedFileOrThrow(sharedFile);
    const file = validSharedFile.file;
    const temporaryUrl = await (0, r2Service_1.generatePrivateFileUrl)(file.storageKey);
    return {
        token: validSharedFile.token,
        name: file.name,
        size: file.size,
        createdAt: file.createdAt,
        mimeType: getMimeTypeFromFileName(file.name),
        fileUrl: temporaryUrl,
    };
}
