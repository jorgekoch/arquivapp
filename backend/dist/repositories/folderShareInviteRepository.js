"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createFolderShareInvite = createFolderShareInvite;
exports.findFolderShareInviteByToken = findFolderShareInviteByToken;
exports.findPendingFolderShareInviteByEmail = findPendingFolderShareInviteByEmail;
exports.markFolderShareInviteAsAccepted = markFolderShareInviteAsAccepted;
exports.findPendingInvitesByEmail = findPendingInvitesByEmail;
const prisma_1 = __importDefault(require("../database/prisma"));
function createFolderShareInvite(data) {
    return prisma_1.default.folderShareInvite.create({
        data,
        include: {
            folder: true,
            ownerUser: true,
        },
    });
}
function findFolderShareInviteByToken(token) {
    return prisma_1.default.folderShareInvite.findUnique({
        where: { token },
        include: {
            folder: true,
            ownerUser: true,
        },
    });
}
function findPendingFolderShareInviteByEmail(params) {
    return prisma_1.default.folderShareInvite.findFirst({
        where: {
            folderId: params.folderId,
            invitedEmail: params.invitedEmail,
            acceptedAt: null,
        },
    });
}
function markFolderShareInviteAsAccepted(id) {
    return prisma_1.default.folderShareInvite.update({
        where: { id },
        data: {
            acceptedAt: new Date(),
        },
    });
}
function findPendingInvitesByEmail(email) {
    return prisma_1.default.folderShareInvite.findMany({
        where: {
            invitedEmail: email,
            acceptedAt: null,
        },
        include: {
            folder: true,
            ownerUser: true,
        },
    });
}
