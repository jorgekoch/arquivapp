import prisma from "../database/prisma";

type CreateFileData = {
  name: string;
  url: string;
  publicId?: string | null;
  size?: number | null;
  folderId: number;
};

export function createFile(data: CreateFileData) {
  return prisma.file.create({
    data: {
      name: data.name,
      url: data.url,
      publicId: data.publicId ?? null,
      size: data.size ?? null,
      folderId: data.folderId,
    },
  });
}

export function findFilesByFolder(folderId: number) {
  return prisma.file.findMany({
    where: { folderId },
    orderBy: { createdAt: "desc" },
  });
}

export function getFileById(id: number) {
  return prisma.file.findUnique({
    where: { id },
    include: {
      folder: true,
    },
  });
}

export function deleteFileById(id: number) {
  return prisma.file.delete({
    where: { id },
  });
}

export function getUserFiles(userId: number) {
  return prisma.file.findMany({
    where: {
      folder: {
        userId,
      },
    },
  });
}