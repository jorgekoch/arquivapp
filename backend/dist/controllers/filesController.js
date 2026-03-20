"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.createUploadUrl = createUploadUrl;
exports.completeUpload = completeUpload;
exports.listFiles = listFiles;
exports.updateFile = updateFile;
exports.moveFile = moveFile;
exports.deleteFile = deleteFile;
exports.getFileDownloadUrl = getFileDownloadUrl;
const filesService = __importStar(require("../services/filesService"));
async function createUploadUrl(req, res, next) {
    try {
        const userId = req.userId;
        const result = await filesService.createUploadUrl({
            folderId: Number(req.body.folderId),
            fileName: req.body.fileName,
            fileType: req.body.fileType,
            fileSize: Number(req.body.fileSize),
        }, userId);
        res.send(result);
    }
    catch (error) {
        next(error);
    }
}
async function completeUpload(req, res, next) {
    try {
        const userId = req.userId;
        const savedFile = await filesService.completeUpload({
            folderId: Number(req.body.folderId),
            fileName: req.body.fileName,
            fileSize: Number(req.body.fileSize),
            storageKey: req.body.storageKey,
        }, userId);
        res.status(201).send(savedFile);
    }
    catch (error) {
        next(error);
    }
}
async function listFiles(req, res, next) {
    try {
        const { folderId } = req.params;
        const userId = req.userId;
        const files = await filesService.getFilesByFolder(Number(folderId), userId);
        res.send(files);
    }
    catch (error) {
        next(error);
    }
}
async function updateFile(req, res, next) {
    try {
        const { id } = req.params;
        const { name } = req.body;
        const userId = req.userId;
        const updatedFile = await filesService.updateFileName(Number(id), userId, name);
        res.send(updatedFile);
    }
    catch (error) {
        next(error);
    }
}
async function moveFile(req, res, next) {
    try {
        const { id } = req.params;
        const userId = req.userId;
        const folderId = Number(req.body.folderId);
        const movedFile = await filesService.moveFileToFolder(Number(id), folderId, userId);
        res.send(movedFile);
    }
    catch (error) {
        next(error);
    }
}
async function deleteFile(req, res, next) {
    try {
        const { id } = req.params;
        const userId = req.userId;
        await filesService.deleteFile(Number(id), userId);
        res.sendStatus(204);
    }
    catch (error) {
        next(error);
    }
}
async function getFileDownloadUrl(req, res, next) {
    try {
        const { id } = req.params;
        const userId = req.userId;
        const url = await filesService.getFileDownloadUrl(Number(id), userId);
        res.send({ url });
    }
    catch (error) {
        next(error);
    }
}
