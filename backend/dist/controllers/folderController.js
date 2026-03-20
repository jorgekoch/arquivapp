"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createFolder = createFolder;
exports.getFolders = getFolders;
exports.getFolderList = getFolderList;
exports.updateFolder = updateFolder;
exports.deleteFolder = deleteFolder;
const folderService_1 = require("../services/folderService");
async function createFolder(req, res, next) {
    try {
        const { name } = req.body;
        const userId = req.userId;
        const folder = await (0, folderService_1.createFolderService)(name, userId);
        res.status(201).send(folder);
    }
    catch (error) {
        next(error);
    }
}
async function getFolders(req, res, next) {
    try {
        const userId = req.userId;
        const folders = await (0, folderService_1.getFoldersService)(userId);
        res.send(folders);
    }
    catch (error) {
        next(error);
    }
}
async function getFolderList(req, res, next) {
    try {
        const userId = req.userId;
        const folders = await (0, folderService_1.getFolderListService)(userId);
        res.send(folders);
    }
    catch (error) {
        next(error);
    }
}
async function updateFolder(req, res, next) {
    try {
        const { id } = req.params;
        const { name } = req.body;
        const userId = req.userId;
        const folder = await (0, folderService_1.updateFolderService)(Number(id), userId, name);
        res.send(folder);
    }
    catch (error) {
        next(error);
    }
}
async function deleteFolder(req, res, next) {
    try {
        const { id } = req.params;
        const userId = req.userId;
        await (0, folderService_1.deleteFolderService)(Number(id), userId);
        res.sendStatus(204);
    }
    catch (error) {
        next(error);
    }
}
