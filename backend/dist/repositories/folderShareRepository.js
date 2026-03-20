"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.findUserByEmail = findUserByEmail;
exports.findFolderById = findFolderById;
exports.findFolderShareByFolderAndUser = findFolderShareByFolderAndUser;
exports.createFolderShare = createFolderShare;
exports.findSharesByFolderId = findSharesByFolderId;
exports.findSharedFoldersForUser = findSharedFoldersForUser;
exports.findFolderShareById = findFolderShareById;
exports.deleteFolderShare = deleteFolderShare;
exports.findFolderShareForUser = findFolderShareForUser;
const prisma_1 = __importDefault(require("../database/prisma"));
async function findUserByEmail(email) {
    return prisma_1.default.user.findUnique({
        where: {
            email,
        },
        select: {
            id: true,
            email: true,
            name: true,
            plan: true,
        },
    });
}
async function findFolderById(folderId) {
    return prisma_1.default.folder.findUnique({
        where: {
            id: folderId,
        },
        select: {
            id: true,
            name: true,
            userId: true,
            createdAt: true,
        },
    });
}
async function findFolderShareByFolderAndUser(folderId, sharedWithUserId) {
    return prisma_1.default.folderShare.findUnique({
        where: {
            folderId_sharedWithUserId: {
                folderId,
                sharedWithUserId,
            },
        },
        include: {
            sharedWithUser: {
                select: {
                    id: true,
                    email: true,
                    name: true,
                },
            },
            ownerUser: {
                select: {
                    id: true,
                    email: true,
                    name: true,
                },
            },
            folder: {
                select: {
                    id: true,
                    name: true,
                    userId: true,
                },
            },
        },
    });
}
async function createFolderShare(params) {
    const { folderId, ownerUserId, sharedWithUserId, role = "viewer" } = params;
    return prisma_1.default.folderShare.create({
        data: {
            folderId,
            ownerUserId,
            sharedWithUserId,
            role,
        },
        include: {
            sharedWithUser: {
                select: {
                    id: true,
                    email: true,
                    name: true,
                },
            },
            ownerUser: {
                select: {
                    id: true,
                    email: true,
                    name: true,
                },
            },
            folder: {
                select: {
                    id: true,
                    name: true,
                    userId: true,
                },
            },
        },
    });
}
async function findSharesByFolderId(folderId) {
    return prisma_1.default.folderShare.findMany({
        where: {
            folderId,
        },
        orderBy: {
            createdAt: "asc",
        },
        include: {
            sharedWithUser: {
                select: {
                    id: true,
                    email: true,
                    name: true,
                },
            },
            ownerUser: {
                select: {
                    id: true,
                    email: true,
                    name: true,
                },
            },
        },
    });
}
async function findSharedFoldersForUser(userId) {
    return prisma_1.default.folderShare.findMany({
        where: {
            sharedWithUserId: userId,
        },
        orderBy: {
            createdAt: "desc",
        },
        include: {
            folder: {
                select: {
                    id: true,
                    name: true,
                    createdAt: true,
                    userId: true,
                },
            },
            ownerUser: {
                select: {
                    id: true,
                    name: true,
                    email: true,
                },
            },
        },
    });
}
async function findFolderShareById(shareId) {
    return prisma_1.default.folderShare.findUnique({
        where: {
            id: shareId,
        },
        include: {
            folder: {
                select: {
                    id: true,
                    name: true,
                    userId: true,
                },
            },
            ownerUser: {
                select: {
                    id: true,
                    name: true,
                    email: true,
                },
            },
            sharedWithUser: {
                select: {
                    id: true,
                    name: true,
                    email: true,
                },
            },
        },
    });
}
async function deleteFolderShare(shareId) {
    return prisma_1.default.folderShare.delete({
        where: {
            id: shareId,
        },
    });
}
async function findFolderShareForUser(folderId, userId) {
    return prisma_1.default.folderShare.findUnique({
        where: {
            folderId_sharedWithUserId: {
                folderId,
                sharedWithUserId: userId,
            },
        },
    });
}
