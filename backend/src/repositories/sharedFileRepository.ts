import prisma from "../database/prisma";

export function createSharedFile(
  fileId: number,
  token: string,
  expiresAt?: Date | null
) {
  return prisma.sharedFile.create({
    data: {
      fileId,
      token,
      expiresAt: expiresAt ?? null,
    },
  });
}

export function findSharedFileByToken(token: string) {
  return prisma.sharedFile.findUnique({
    where: { token },
    include: {
      file: {
        include: {
          folder: true,
        },
      },
    },
  });
}

export function findSharedFileByFileId(fileId: number) {
  return prisma.sharedFile.findFirst({
    where: { fileId },
  });
}