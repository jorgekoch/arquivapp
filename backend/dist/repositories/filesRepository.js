"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createFile = createFile;
exports.findFilesByFolder = findFilesByFolder;
exports.findFileByNameInFolder = findFileByNameInFolder;
exports.getFileById = getFileById;
exports.updateFileName = updateFileName;
exports.moveFileToFolder = moveFileToFolder;
exports.deleteFileById = deleteFileById;
exports.getUserFiles = getUserFiles;
const prisma_1 = __importDefault(require("../database/prisma"));
function createFile(data) {
    return prisma_1.default.file.create({
        data: {
            name: data.name,
            url: data.url ?? null,
            storageKey: data.storageKey,
            size: data.size ?? null,
            folderId: data.folderId,
        },
    });
}
function findFilesByFolder(folderId) {
    return prisma_1.default.file.findMany({
        where: { folderId },
        orderBy: { createdAt: "desc" },
    });
}
function findFileByNameInFolder(name, folderId) {
    return prisma_1.default.file.findFirst({
        where: {
            name,
            folderId,
        },
    });
}
function getFileById(id) {
    return prisma_1.default.file.findUnique({
        where: { id },
        include: {
            folder: true,
        },
    });
}
function updateFileName(id, name) {
    return prisma_1.default.file.update({
        where: { id },
        data: { name },
    });
}
function moveFileToFolder(id, folderId) {
    return prisma_1.default.file.update({
        where: { id },
        data: { folderId },
    });
}
function deleteFileById(id) {
    return prisma_1.default.file.delete({
        where: { id },
    });
}
function getUserFiles(userId) {
    return prisma_1.default.file.findMany({
        where: {
            folder: {
                userId,
            },
        },
    });
}
