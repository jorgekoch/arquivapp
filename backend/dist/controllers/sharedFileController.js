"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createShareLink = createShareLink;
exports.openSharedFile = openSharedFile;
exports.getSharedFileInfo = getSharedFileInfo;
const sharedFileService_1 = require("../services/sharedFileService");
async function createShareLink(req, res, next) {
    try {
        const userId = req.userId;
        const fileId = Number(req.params.id);
        const result = await (0, sharedFileService_1.createSharedFileLink)(fileId, userId);
        res.send(result);
    }
    catch (error) {
        next(error);
    }
}
async function openSharedFile(req, res, next) {
    try {
        const token = String(req.params.token);
        const fileUrl = await (0, sharedFileService_1.accessSharedFile)(token);
        res.redirect(fileUrl);
    }
    catch (error) {
        next(error);
    }
}
async function getSharedFileInfo(req, res, next) {
    try {
        const token = String(req.params.token);
        const result = await (0, sharedFileService_1.getSharedFileDetails)(token);
        res.send(result);
    }
    catch (error) {
        next(error);
    }
}
