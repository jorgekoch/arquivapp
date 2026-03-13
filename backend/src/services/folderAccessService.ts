import { AppError } from "../errors/AppError";
import { findFolderById, findFolderShareForUser } from "../repositories/folderShareRepository";

export async function ensureUserCanAccessFolder(
  folderId: number,
  userId: number
) {
  const folder = await findFolderById(folderId);

  if (!folder) {
    throw new AppError("Pasta não encontrada", 404);
  }

  if (folder.userId === userId) {
    return folder;
  }

  const share = await findFolderShareForUser(folderId, userId);

  if (!share) {
    throw new AppError("Você não tem acesso a esta pasta", 403);
  }

  return folder;
}

export async function ensureUserCanManageFolder(
  folderId: number,
  userId: number
) {
  const folder = await findFolderById(folderId);

  if (!folder) {
    throw new AppError("Pasta não encontrada", 404);
  }

  if (folder.userId !== userId) {
    throw new AppError("Você não tem permissão para alterar esta pasta", 403);
  }

  return folder;
}