"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createSharedFile = createSharedFile;
exports.findSharedFileByToken = findSharedFileByToken;
exports.findSharedFileByFileId = findSharedFileByFileId;
const prisma_1 = __importDefault(require("../database/prisma"));
function createSharedFile(fileId, token, expiresAt) {
    return prisma_1.default.sharedFile.create({
        data: {
            fileId,
            token,
            expiresAt: expiresAt ?? null,
        },
    });
}
function findSharedFileByToken(token) {
    return prisma_1.default.sharedFile.findUnique({
        where: { token },
        include: {
            file: {
                include: {
                    folder: true,
                },
            },
        },
    });
}
function findSharedFileByFileId(fileId) {
    return prisma_1.default.sharedFile.findFirst({
        where: { fileId },
    });
}
