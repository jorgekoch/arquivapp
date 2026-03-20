"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ensureUserCanAccessFolder = ensureUserCanAccessFolder;
exports.ensureUserCanManageFolder = ensureUserCanManageFolder;
const AppError_1 = require("../errors/AppError");
const folderShareRepository_1 = require("../repositories/folderShareRepository");
async function ensureUserCanAccessFolder(folderId, userId) {
    const folder = await (0, folderShareRepository_1.findFolderById)(folderId);
    if (!folder) {
        throw new AppError_1.AppError("Pasta não encontrada", 404);
    }
    if (folder.userId === userId) {
        return folder;
    }
    const share = await (0, folderShareRepository_1.findFolderShareForUser)(folderId, userId);
    if (!share) {
        throw new AppError_1.AppError("Você não tem acesso a esta pasta", 403);
    }
    return folder;
}
async function ensureUserCanManageFolder(folderId, userId) {
    const folder = await (0, folderShareRepository_1.findFolderById)(folderId);
    if (!folder) {
        throw new AppError_1.AppError("Pasta não encontrada", 404);
    }
    if (folder.userId !== userId) {
        throw new AppError_1.AppError("Você não tem permissão para alterar esta pasta", 403);
    }
    return folder;
}
