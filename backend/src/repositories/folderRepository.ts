import prisma from "../database/prisma";

export function createFolder(name: string, userId: number) {
  return prisma.folder.create({
    data: {
      name,
      userId,
    },
  });
}

export function getFoldersByUserId(userId: number) {
  return prisma.folder.findMany({
    where: {
      userId,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
}

export function getFolderById(id: number) {
  return prisma.folder.findUnique({
    where: { id },
    include: {
      files: true,
    },
  });
}

export function deleteFolderById(id: number) {
  return prisma.folder.delete({
    where: { id },
  });
}

export function deleteFilesByFolderId(folderId: number) {
  return prisma.file.deleteMany({
    where: {
      folderId,
    },
  });
}

export function getFolderListByUserId(userId: number) {
  return prisma.folder.findMany({
    where: {
      userId,
    },
    select: {
      id: true,
      name: true,
    },
    orderBy: {
      name: "asc",
    },
  });
}