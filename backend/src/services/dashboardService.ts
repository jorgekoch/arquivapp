import prisma from "../database/prisma";
import { AppError } from "../errors/AppError";
import * as filesRepository from "../repositories/filesRepository";
import { getStorageLimit, getUserStorageUsage } from "./storageService";

export async function getDashboardInit(
  userId: number,
  preferredFolderId?: number | null
) {
  const user = await prisma.user.findUnique({
    where: { id: userId },
  });

  if (!user) {
    throw new AppError("Usuário não encontrado", 404);
  }

  const [foldersRaw, usedStorage] = await Promise.all([
    prisma.folder.findMany({
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
    getUserStorageUsage(userId),
  ]);

  const folders = foldersRaw.map((folder) => ({
    id: folder.id,
    name: folder.name,
    createdAt: folder.createdAt,
    shareCount: folder._count.shares,
  }));

  const storageLimit = getStorageLimit(user.plan);

  let selectedFolderId: number | null = null;

  if (folders.length > 0) {
    const preferredFolderExists =
      typeof preferredFolderId === "number" &&
      folders.some((folder) => folder.id === preferredFolderId);

    selectedFolderId = preferredFolderExists
      ? preferredFolderId!
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