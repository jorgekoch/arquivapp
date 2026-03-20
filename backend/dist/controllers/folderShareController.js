"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createFolderShareController = createFolderShareController;
exports.listFolderSharesController = listFolderSharesController;
exports.listSharedFoldersController = listSharedFoldersController;
exports.removeFolderShareController = removeFolderShareController;
exports.getFolderInviteByTokenController = getFolderInviteByTokenController;
exports.acceptFolderInviteController = acceptFolderInviteController;
const folderShareService_1 = require("../services/folderShareService");
const AppError_1 = require("../errors/AppError");
async function createFolderShareController(req, res) {
    const currentUserId = req.userId;
    const { folderId, email } = req.body;
    const share = await (0, folderShareService_1.shareFolder)({
        currentUserId,
        folderId: Number(folderId),
        email,
    });
    return res.status(201).send(share);
}
async function listFolderSharesController(req, res) {
    const currentUserId = req.userId;
    const folderId = Number(req.params.folderId);
    const shares = await (0, folderShareService_1.listFolderShares)({
        currentUserId,
        folderId,
    });
    return res.status(200).send(shares);
}
async function listSharedFoldersController(req, res) {
    const currentUserId = req.userId;
    const sharedFolders = await (0, folderShareService_1.listSharedFolders)(currentUserId);
    return res.status(200).send(sharedFolders);
}
async function removeFolderShareController(req, res) {
    const currentUserId = req.userId;
    const shareId = Number(req.params.shareId);
    const result = await (0, folderShareService_1.removeFolderShare)({
        currentUserId,
        shareId,
    });
    return res.status(200).send(result);
}
async function getFolderInviteByTokenController(req, res) {
    const token = req.params.token;
    if (!token || Array.isArray(token)) {
        throw new AppError_1.AppError("Token inválido", 400);
    }
    const invite = await (0, folderShareService_1.getFolderInviteByToken)(token);
    return res.status(200).send(invite);
}
async function acceptFolderInviteController(req, res) {
    const currentUserId = req.userId;
    const token = req.params.token;
    if (!token || Array.isArray(token)) {
        throw new AppError_1.AppError("Token inválido", 400);
    }
    const result = await (0, folderShareService_1.acceptFolderInvite)(token, currentUserId);
    return res.status(200).send(result);
}
