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
exports.createFolderService = createFolderService;
exports.getFoldersService = getFoldersService;
exports.getFolderListService = getFolderListService;
exports.getOwnedFolderOrFail = getOwnedFolderOrFail;
exports.updateFolderService = updateFolderService;
exports.deleteFolderService = deleteFolderService;
const folderRepository = __importStar(require("../repositories/folderRepository"));
const AppError_1 = require("../errors/AppError");
const r2Service_1 = require("./r2Service");
function createFolderService(name, userId) {
    return folderRepository.createFolder(name, userId);
}
function getFoldersService(userId) {
    return folderRepository.getFoldersByUserId(userId);
}
function getFolderListService(userId) {
    return folderRepository.getFolderListByUserId(userId);
}
async function getOwnedFolderOrFail(folderId, userId) {
    const folder = await folderRepository.getFolderById(folderId);
    if (!folder) {
        throw new AppError_1.AppError("Folder not found", 404);
    }
    if (folder.userId !== userId) {
        throw new AppError_1.AppError("Forbidden", 403);
    }
    return folder;
}
async function updateFolderService(folderId, userId, name) {
    await getOwnedFolderOrFail(folderId, userId);
    return folderRepository.updateFolderName(folderId, name);
}
async function deleteFolderService(folderId, userId) {
    const folder = await getOwnedFolderOrFail(folderId, userId);
    for (const file of folder.files) {
        await (0, r2Service_1.deletePrivateFile)(file.storageKey);
    }
    await folderRepository.deleteFilesByFolderId(folderId);
    await folderRepository.deleteFolderById(folderId);
}
