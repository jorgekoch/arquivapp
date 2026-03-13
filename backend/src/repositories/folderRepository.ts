import prisma from "../database/prisma";

export function createFolder(name: string, userId: number) {
  return prisma.folder.create({
    data: {
      name,
      userId,
    },
  });
}

export async function getFoldersByUserId(userId: number) {
  const folders = await prisma.folder.findMany({
    where: { userId },
    orderBy: { createdAt: "desc" },
    include: {
      _count: {
        select: {
          shares: true,
        },
      },
    },
  });

  return folders.map((folder) => ({
    id: folder.id,
    name: folder.name,
    createdAt: folder.createdAt,
    shareCount: folder._count.shares,
  }));
}

export async function getFolderListByUserId(userId: number) {
  const folders = await prisma.folder.findMany({
    where: { userId },
    orderBy: { name: "asc" },
    include: {
      _count: {
        select: {
          shares: true,
        },
      },
    },
  });

  return folders.map((folder) => ({
    id: folder.id,
    name: folder.name,
    shareCount: folder._count.shares,
  }));
}

export function getFolderById(id: number) {
  return prisma.folder.findUnique({
    where: { id },
    include: {
      files: true,
    },
  });
}

export function updateFolderName(id: number, name: string) {
  return prisma.folder.update({
    where: { id },
    data: { name },
  });
}

export function deleteFilesByFolderId(folderId: number) {
  return prisma.file.deleteMany({
    where: {
      folderId,
    },
  });
}

export function deleteFolderById(id: number) {
  return prisma.folder.delete({
    where: { id },
  });
}