"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.shareFolder = shareFolder;
exports.listFolderShares = listFolderShares;
exports.listSharedFolders = listSharedFolders;
exports.removeFolderShare = removeFolderShare;
exports.getFolderInviteByToken = getFolderInviteByToken;
exports.acceptFolderInvite = acceptFolderInvite;
exports.acceptPendingFolderInvitesForUser = acceptPendingFolderInvitesForUser;
const AppError_1 = require("../errors/AppError");
const crypto_1 = __importDefault(require("crypto"));
const folderShareInviteRepository_1 = require("../repositories/folderShareInviteRepository");
const folderShareRepository_1 = require("../repositories/folderShareRepository");
const userRepository_1 = require("../repositories/userRepository");
const emailService_1 = require("./emailService");
async function shareFolder(params) {
    const { currentUserId, folderId, email } = params;
    const currentUser = await (0, userRepository_1.findUserById)(currentUserId);
    if (!currentUser) {
        throw new AppError_1.AppError("Usuário não encontrado", 404);
    }
    if (currentUser.plan !== "PRO") {
        throw new AppError_1.AppError("Compartilhamento de pastas é um recurso disponível apenas no plano PRO", 403);
    }
    const folder = await (0, folderShareRepository_1.findFolderById)(folderId);
    if (!folder) {
        throw new AppError_1.AppError("Pasta não encontrada", 404);
    }
    if (folder.userId !== currentUserId) {
        throw new AppError_1.AppError("Você não tem permissão para compartilhar esta pasta", 403);
    }
    const normalizedEmail = email.trim().toLowerCase();
    if (!normalizedEmail) {
        throw new AppError_1.AppError("E-mail é obrigatório", 400);
    }
    const targetUser = await (0, folderShareRepository_1.findUserByEmail)(normalizedEmail);
    const loginUrl = `${process.env.FRONTEND_URL}/login`;
    // CASO 1: usuário já existe
    if (targetUser) {
        if (targetUser.id === currentUserId) {
            throw new AppError_1.AppError("Você não pode compartilhar uma pasta com você mesmo", 400);
        }
        const existingShare = await (0, folderShareRepository_1.findFolderShareByFolderAndUser)(folderId, targetUser.id);
        if (existingShare) {
            throw new AppError_1.AppError("Esta pasta já foi compartilhada com este usuário", 409);
        }
        const share = await (0, folderShareRepository_1.createFolderShare)({
            folderId,
            ownerUserId: currentUserId,
            sharedWithUserId: targetUser.id,
            role: "viewer",
        });
        try {
            await (0, emailService_1.sendFolderInviteEmail)({
                to: targetUser.email,
                invitedUserName: targetUser.name,
                ownerName: currentUser.name,
                folderName: share.folder.name,
                loginUrl,
            });
        }
        catch (error) {
            console.error("Erro ao enviar email (usuário existente):", error);
        }
        return {
            message: "Pasta compartilhada com sucesso",
            shareId: share.id,
            invitedUserExists: true,
        };
    }
    // CASO 2: usuário ainda não existe
    const token = crypto_1.default.randomBytes(24).toString("hex");
    const invite = await (0, folderShareInviteRepository_1.createFolderShareInvite)({
        token,
        folderId,
        ownerUserId: currentUserId,
        invitedEmail: normalizedEmail,
        role: "viewer",
        expiresAt: null,
    });
    const inviteUrl = `${process.env.FRONTEND_URL}/invite/${invite.token}`;
    try {
        await (0, emailService_1.sendFolderInviteLinkEmail)({
            to: normalizedEmail,
            ownerName: currentUser.name,
            folderName: folder.name,
            inviteUrl,
        });
    }
    catch (error) {
        console.error("Erro ao enviar convite para novo usuário:", error);
    }
    return {
        message: "Convite enviado por e-mail para o usuário",
        inviteToken: invite.token,
        invitedUserExists: false,
    };
}
async function listFolderShares(params) {
    const { currentUserId, folderId } = params;
    const folder = await (0, folderShareRepository_1.findFolderById)(folderId);
    if (!folder) {
        throw new AppError_1.AppError("Pasta não encontrada", 404);
    }
    if (folder.userId !== currentUserId) {
        throw new AppError_1.AppError("Você não tem permissão para visualizar os compartilhamentos desta pasta", 403);
    }
    const shares = await (0, folderShareRepository_1.findSharesByFolderId)(folderId);
    return shares.map((share) => ({
        id: share.id,
        role: share.role,
        createdAt: share.createdAt,
        user: {
            id: share.sharedWithUser.id,
            name: share.sharedWithUser.name,
            email: share.sharedWithUser.email,
        },
    }));
}
async function listSharedFolders(currentUserId) {
    const user = await (0, userRepository_1.findUserById)(currentUserId);
    if (!user) {
        throw new AppError_1.AppError("Usuário não encontrado", 404);
    }
    const sharedFolders = await (0, folderShareRepository_1.findSharedFoldersForUser)(currentUserId);
    return sharedFolders.map((share) => ({
        shareId: share.id,
        role: share.role,
        folder: {
            id: share.folder.id,
            name: share.folder.name,
            createdAt: share.folder.createdAt,
        },
        owner: {
            id: share.ownerUser.id,
            name: share.ownerUser.name,
            email: share.ownerUser.email,
        },
    }));
}
async function removeFolderShare(params) {
    const { currentUserId, shareId } = params;
    const share = await (0, folderShareRepository_1.findFolderShareById)(shareId);
    if (!share) {
        throw new AppError_1.AppError("Compartilhamento não encontrado", 404);
    }
    if (share.folder.userId !== currentUserId) {
        throw new AppError_1.AppError("Você não tem permissão para remover este compartilhamento", 403);
    }
    await (0, folderShareRepository_1.deleteFolderShare)(shareId);
    return {
        message: "Compartilhamento removido com sucesso",
    };
}
async function getFolderInviteByToken(token) {
    const invite = await (0, folderShareInviteRepository_1.findFolderShareInviteByToken)(token);
    if (!invite) {
        throw new AppError_1.AppError("Convite não encontrado", 404);
    }
    if (invite.acceptedAt) {
        throw new AppError_1.AppError("Este convite já foi aceito", 400);
    }
    return {
        token: invite.token,
        folderName: invite.folder.name,
        ownerName: invite.ownerUser.name,
        invitedEmail: invite.invitedEmail,
        createdAt: invite.createdAt,
    };
}
async function acceptFolderInvite(token, userId) {
    const invite = await (0, folderShareInviteRepository_1.findFolderShareInviteByToken)(token);
    if (!invite) {
        throw new AppError_1.AppError("Convite não encontrado", 404);
    }
    if (invite.acceptedAt) {
        throw new AppError_1.AppError("Este convite já foi aceito", 400);
    }
    const user = await (0, userRepository_1.findUserById)(userId);
    if (!user) {
        throw new AppError_1.AppError("Usuário não encontrado", 404);
    }
    if (user.email.trim().toLowerCase() !== invite.invitedEmail.trim().toLowerCase()) {
        throw new AppError_1.AppError("Este convite pertence a outro e-mail", 403);
    }
    const existingShare = await (0, folderShareRepository_1.findFolderShareByFolderAndUser)(invite.folderId, user.id);
    if (!existingShare) {
        await (0, folderShareRepository_1.createFolderShare)({
            folderId: invite.folderId,
            ownerUserId: invite.ownerUserId,
            sharedWithUserId: user.id,
            role: invite.role,
        });
    }
    await (0, folderShareInviteRepository_1.markFolderShareInviteAsAccepted)(invite.id);
    return {
        message: "Convite aceito com sucesso",
        folderId: invite.folderId,
    };
}
async function acceptPendingFolderInvitesForUser(userId, email) {
    const invites = await (0, folderShareInviteRepository_1.findPendingInvitesByEmail)(email.trim().toLowerCase());
    for (const invite of invites) {
        const existingShare = await (0, folderShareRepository_1.findFolderShareByFolderAndUser)(invite.folderId, userId);
        if (!existingShare) {
            await (0, folderShareRepository_1.createFolderShare)({
                folderId: invite.folderId,
                ownerUserId: invite.ownerUserId,
                sharedWithUserId: userId,
                role: invite.role,
            });
        }
        await (0, folderShareInviteRepository_1.markFolderShareInviteAsAccepted)(invite.id);
    }
}
