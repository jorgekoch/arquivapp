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
exports.getDashboardInit = getDashboardInit;
const prisma_1 = __importDefault(require("../database/prisma"));
const AppError_1 = require("../errors/AppError");
const filesRepository = __importStar(require("../repositories/filesRepository"));
const storageService_1 = require("./storageService");
async function getDashboardInit(userId, preferredFolderId) {
    const user = await prisma_1.default.user.findUnique({
        where: { id: userId },
    });
    if (!user) {
        throw new AppError_1.AppError("Usuário não encontrado", 404);
    }
    const [foldersRaw, usedStorage] = await Promise.all([
        prisma_1.default.folder.findMany({
            where: { userId },
            orderBy: { createdAt: "asc" },
            include: {
                _count: {
                    select: {
                        shares: true,
                    },
                },
            },
        }),
        (0, storageService_1.getUserStorageUsage)(userId),
    ]);
    const folders = foldersRaw.map((folder) => ({
        id: folder.id,
        name: folder.name,
        createdAt: folder.createdAt,
        shareCount: folder._count.shares,
    }));
    const storageLimit = (0, storageService_1.getStorageLimit)(user.plan);
    let selectedFolderId = null;
    if (folders.length > 0) {
        const preferredFolderExists = typeof preferredFolderId === "number" &&
            folders.some((folder) => folder.id === preferredFolderId);
        selectedFolderId = preferredFolderExists
            ? preferredFolderId
            : folders[0].id;
    }
    const files = selectedFolderId
        ? await filesRepository.findFilesByFolder(selectedFolderId)
        : [];
    return {
        profile: {
            id: user.id,
            email: user.email,
            name: user.name,
            avatarUrl: user.avatarUrl,
            plan: user.plan,
            createdAt: user.createdAt,
            storageUsed: usedStorage,
            storageLimit,
        },
        folders,
        files,
        selectedFolderId,
    };
}
