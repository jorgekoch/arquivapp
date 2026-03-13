import { Request, Response } from "express";
import {
  listFolderShares,
  listSharedFolders,
  removeFolderShare,
  shareFolder,
} from "../services/folderShareService";

export async function createFolderShareController(req: Request, res: Response) {
  const currentUserId = req.userId!;
  const { folderId, email } = req.body;

  const share = await shareFolder({
    currentUserId,
    folderId: Number(folderId),
    email,
  });

  return res.status(201).send(share);
}

export async function listFolderSharesController(req: Request, res: Response) {
  const currentUserId = req.userId;
  const { folderId } = req.params;

  const shares = await listFolderShares({
    currentUserId,
    folderId: Number(folderId),
  });

  return res.status(200).send(shares);
}

export async function listSharedFoldersController(req: Request, res: Response) {
  const currentUserId = req.userId;

  const sharedFolders = await listSharedFolders(currentUserId);

  return res.status(200).send(sharedFolders);
}

export async function removeFolderShareController(req: Request, res: Response) {
  const currentUserId = req.userId;
  const { shareId } = req.params;

  const result = await removeFolderShare({
    currentUserId,
    shareId: Number(shareId),
  });

  return res.status(200).send(result);
}