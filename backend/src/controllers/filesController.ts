import { NextFunction, Request, Response } from "express";
import * as filesService from "../services/filesService";

export async function createUploadUrl(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const userId = req.userId!;

    const result = await filesService.createUploadUrl(
      {
        folderId: Number(req.body.folderId),
        fileName: req.body.fileName,
        fileType: req.body.fileType,
        fileSize: Number(req.body.fileSize),
      },
      userId
    );

    res.send(result);
  } catch (error) {
    next(error);
  }
}

export async function completeUpload(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const userId = req.userId!;

    const savedFile = await filesService.completeUpload(
      {
        folderId: Number(req.body.folderId),
        fileName: req.body.fileName,
        fileSize: Number(req.body.fileSize),
        storageKey: req.body.storageKey,
      },
      userId
    );

    res.status(201).send(savedFile);
  } catch (error) {
    next(error);
  }
}

export async function listFiles(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { folderId } = req.params;
    const userId = req.userId!;

    const files = await filesService.getFilesByFolder(Number(folderId), userId);
    res.send(files);
  } catch (error) {
    next(error);
  }
}

export async function deleteFile(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { id } = req.params;
    const userId = req.userId!;

    await filesService.deleteFile(Number(id), userId);
    res.sendStatus(204);
  } catch (error) {
    next(error);
  }
}

export async function getFileDownloadUrl(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { id } = req.params;
    const userId = req.userId!;

    const url = await filesService.getFileDownloadUrl(Number(id), userId);
    res.send({ url });
  } catch (error) {
    next(error);
  }
}