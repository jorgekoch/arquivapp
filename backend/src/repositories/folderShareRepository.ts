import prisma from "../database/prisma";

export type FolderShareRole = "viewer" | "editor";

export async function findUserByEmail(email: string) {
  return prisma.user.findUnique({
    where: {
      email,
    },
    select: {
      id: true,
      email: true,
      name: true,
      plan: true,
    },
  });
}

export async function findFolderById(folderId: number) {
  return prisma.folder.findUnique({
    where: {
      id: folderId,
    },
    select: {
      id: true,
      name: true,
      userId: true,
      createdAt: true,
    },
  });
}

export async function findFolderShareByFolderAndUser(
  folderId: number,
  sharedWithUserId: number
) {
  return prisma.folderShare.findUnique({
    where: {
      folderId_sharedWithUserId: {
        folderId,
        sharedWithUserId,
      },
    },
    include: {
      sharedWithUser: {
        select: {
          id: true,
          email: true,
          name: true,
        },
      },
      ownerUser: {
        select: {
          id: true,
          email: true,
          name: true,
        },
      },
      folder: {
        select: {
          id: true,
          name: true,
          userId: true,
        },
      },
    },
  });
}

export async function createFolderShare(params: {
  folderId: number;
  ownerUserId: number;
  sharedWithUserId: number;
  role?: FolderShareRole;
}) {
  const { folderId, ownerUserId, sharedWithUserId, role = "viewer" } = params;

  return prisma.folderShare.create({
    data: {
      folderId,
      ownerUserId,
      sharedWithUserId,
      role,
    },
    include: {
      sharedWithUser: {
        select: {
          id: true,
          email: true,
          name: true,
        },
      },
      ownerUser: {
        select: {
          id: true,
          email: true,
          name: true,
        },
      },
      folder: {
        select: {
          id: true,
          name: true,
          userId: true,
        },
      },
    },
  });
}

export async function findSharesByFolderId(folderId: number) {
  return prisma.folderShare.findMany({
    where: {
      folderId,
    },
    orderBy: {
      createdAt: "asc",
    },
    include: {
      sharedWithUser: {
        select: {
          id: true,
          email: true,
          name: true,
        },
      },
      ownerUser: {
        select: {
          id: true,
          email: true,
          name: true,
        },
      },
    },
  });
}

export async function findSharedFoldersForUser(userId: number) {
  return prisma.folderShare.findMany({
    where: {
      sharedWithUserId: userId,
    },
    orderBy: {
      createdAt: "desc",
    },
    include: {
      folder: {
        select: {
          id: true,
          name: true,
          createdAt: true,
          userId: true,
        },
      },
      ownerUser: {
        select: {
          id: true,
          name: true,
          email: true,
        },
      },
    },
  });
}

export async function findFolderShareById(shareId: number) {
  return prisma.folderShare.findUnique({
    where: {
      id: shareId,
    },
    include: {
      folder: {
        select: {
          id: true,
          name: true,
          userId: true,
        },
      },
      ownerUser: {
        select: {
          id: true,
          name: true,
          email: true,
        },
      },
      sharedWithUser: {
        select: {
          id: true,
          name: true,
          email: true,
        },
      },
    },
  });
}

export async function deleteFolderShare(shareId: number) {
  return prisma.folderShare.delete({
    where: {
      id: shareId,
    },
  });
}

export async function findFolderShareForUser(folderId: number, userId: number) {
  return prisma.folderShare.findUnique({
    where: {
      folderId_sharedWithUserId: {
        folderId,
        sharedWithUserId: userId,
      },
    },
  });
}

