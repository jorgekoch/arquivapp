import { NextFunction, Request, Response } from "express";
import {
  createFolderService,
  deleteFolderService,
  getFoldersService,
  getFolderListService,
} from "../services/folderService";

export async function createFolder(req: Request, res: Response, next: NextFunction) {
  try {
    const { name } = req.body;
    const userId = req.userId!;

    const folder = await createFolderService(name, userId);

    res.status(201).send(folder);
  } catch (error) {
    next(error);
  }
}

export async function getFolders(req: Request, res: Response, next: NextFunction) {
  try {
    const userId = req.userId!;

    const folders = await getFoldersService(userId);

    res.send(folders);
  } catch (error) {
    next(error);
  }
}

export async function getFolderList(req: Request, res: Response, next: NextFunction) {
  try {
    const userId = req.userId!;

    const folders = await getFolderListService(userId);

    res.send(folders);
  } catch (error) {
    next(error);
  }
}

export async function deleteFolder(req: Request, res: Response, next: NextFunction) {
  try {
    const { id } = req.params;
    const userId = req.userId!;

    await deleteFolderService(Number(id), userId);

    res.sendStatus(204);
  } catch (error) {
    next(error);
  }
}