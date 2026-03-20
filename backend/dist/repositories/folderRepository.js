"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createFolder = createFolder;
exports.getFoldersByUserId = getFoldersByUserId;
exports.getFolderListByUserId = getFolderListByUserId;
exports.getFolderById = getFolderById;
exports.updateFolderName = updateFolderName;
exports.deleteFilesByFolderId = deleteFilesByFolderId;
exports.deleteFolderById = deleteFolderById;
const prisma_1 = __importDefault(require("../database/prisma"));
function createFolder(name, userId) {
    return prisma_1.default.folder.create({
        data: {
            name,
            userId,
        },
    });
}
async function getFoldersByUserId(userId) {
    const folders = await prisma_1.default.folder.findMany({
        where: { userId },
        orderBy: { createdAt: "desc" },
        include: {
            _count: {
                select: {
                    shares: true,
                },
            },
        },
    });
    return folders.map((folder) => ({
        id: folder.id,
        name: folder.name,
        createdAt: folder.createdAt,
        shareCount: folder._count.shares,
    }));
}
async function getFolderListByUserId(userId) {
    const folders = await prisma_1.default.folder.findMany({
        where: { userId },
        orderBy: { name: "asc" },
        include: {
            _count: {
                select: {
                    shares: true,
                },
            },
        },
    });
    return folders.map((folder) => ({
        id: folder.id,
        name: folder.name,
        shareCount: folder._count.shares,
    }));
}
function getFolderById(id) {
    return prisma_1.default.folder.findUnique({
        where: { id },
        include: {
            files: true,
        },
    });
}
function updateFolderName(id, name) {
    return prisma_1.default.folder.update({
        where: { id },
        data: { name },
    });
}
function deleteFilesByFolderId(folderId) {
    return prisma_1.default.file.deleteMany({
        where: {
            folderId,
        },
    });
}
function deleteFolderById(id) {
    return prisma_1.default.folder.delete({
        where: { id },
    });
}
