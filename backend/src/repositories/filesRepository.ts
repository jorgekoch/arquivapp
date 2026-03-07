import prisma from "../database/prisma";

export function createFile(data: {
  name: string;
  url: string;
  publicId: string;
  folderId: number;
}) {
  return prisma.file.create({
    data,
  });
}

export function findFilesByFolder(folderId: number) {
  return prisma.file.findMany({
    where: {
      folderId,
    },
    orderBy: {
      createdAt: "desc",
    },
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