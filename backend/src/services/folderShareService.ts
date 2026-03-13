import { AppError } from "../errors/AppError";
import {
  createFolderShare,
  deleteFolderShare,
  findFolderById,
  findFolderShareByFolderAndUser,
  findFolderShareById,
  findSharedFoldersForUser,
  findSharesByFolderId,
  findUserByEmail,
} from "../repositories/folderShareRepository";
import { findUserById } from "../repositories/userRepository";

export async function shareFolder(params: {
  currentUserId: number;
  folderId: number;
  email: string;
}) {
  const { currentUserId, folderId, email } = params;

  const currentUser = await findUserById(currentUserId);

  if (!currentUser) {
    throw new AppError("Usuário não encontrado", 404);
  }

  if (currentUser.plan !== "PRO") {
    throw new AppError(
      "Compartilhamento de pastas é um recurso disponível apenas no plano PRO",
      403
    );
  }

  const folder = await findFolderById(folderId);

  if (!folder) {
    throw new AppError("Pasta não encontrada", 404);
  }

  if (folder.userId !== currentUserId) {
    throw new AppError("Você não tem permissão para compartilhar esta pasta", 403);
  }

  const normalizedEmail = email.trim().toLowerCase();

  if (!normalizedEmail) {
    throw new AppError("E-mail é obrigatório", 400);
  }

  const targetUser = await findUserByEmail(normalizedEmail);

  if (!targetUser) {
    throw new AppError(
      "Não foi encontrado nenhum usuário com este e-mail",
      404
    );
  }

  if (targetUser.id === currentUserId) {
    throw new AppError("Você não pode compartilhar uma pasta com você mesmo", 400);
  }

  const existingShare = await findFolderShareByFolderAndUser(
    folderId,
    targetUser.id
  );

  if (existingShare) {
    throw new AppError("Esta pasta já foi compartilhada com este usuário", 409);
  }

  const share = await createFolderShare({
    folderId,
    ownerUserId: currentUserId,
    sharedWithUserId: targetUser.id,
    role: "viewer",
  });

  return {
    id: share.id,
    folderId: share.folderId,
    folderName: share.folder.name,
    sharedWithUser: {
      id: share.sharedWithUser.id,
      name: share.sharedWithUser.name,
      email: share.sharedWithUser.email,
    },
    role: share.role,
    createdAt: share.createdAt,
  };
}

export async function listFolderShares(params: {
  currentUserId: number;
  folderId: number;
}) {
  const { currentUserId, folderId } = params;

  const folder = await findFolderById(folderId);

  if (!folder) {
    throw new AppError("Pasta não encontrada", 404);
  }

  if (folder.userId !== currentUserId) {
    throw new AppError(
      "Você não tem permissão para visualizar os compartilhamentos desta pasta",
      403
    );
  }

  const shares = await findSharesByFolderId(folderId);

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

export async function listSharedFolders(currentUserId: number) {
  const user = await findUserById(currentUserId);

  if (!user) {
    throw new AppError("Usuário não encontrado", 404);
  }

  const sharedFolders = await findSharedFoldersForUser(currentUserId);

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

export async function removeFolderShare(params: {
  currentUserId: number;
  shareId: number;
}) {
  const { currentUserId, shareId } = params;

  const share = await findFolderShareById(shareId);

  if (!share) {
    throw new AppError("Compartilhamento não encontrado", 404);
  }

  if (share.folder.userId !== currentUserId) {
    throw new AppError(
      "Você não tem permissão para remover este compartilhamento",
      403
    );
  }

  await deleteFolderShare(shareId);

  return {
    message: "Compartilhamento removido com sucesso",
  };
}