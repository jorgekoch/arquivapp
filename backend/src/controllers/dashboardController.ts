import { NextFunction, Request, Response } from "express";
import * as dashboardService from "../services/dashboardService";

export async function getDashboardInit(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const userId = req.userId!;
    const preferredFolderId = req.query.folderId
      ? Number(req.query.folderId)
      : null;

    const result = await dashboardService.getDashboardInit(
      userId,
      preferredFolderId
    );

    res.send(result);
  } catch (error) {
    next(error);
  }
}