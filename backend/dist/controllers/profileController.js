"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getProfile = getProfile;
exports.updateProfile = updateProfile;
exports.updatePassword = updatePassword;
exports.updateAvatar = updateAvatar;
const profileService_1 = require("../services/profileService");
const AppError_1 = require("../errors/AppError");
const r2Service_1 = require("../services/r2Service");
async function getProfile(req, res, next) {
    try {
        const userId = req.userId;
        const profile = await (0, profileService_1.getProfileService)(userId);
        res.send(profile);
    }
    catch (error) {
        next(error);
    }
}
async function updateProfile(req, res, next) {
    try {
        const userId = req.userId;
        const { name } = req.body;
        const profile = await (0, profileService_1.updateProfileService)(userId, name);
        res.send(profile);
    }
    catch (error) {
        next(error);
    }
}
async function updatePassword(req, res, next) {
    try {
        const userId = req.userId;
        const { currentPassword, newPassword } = req.body;
        await (0, profileService_1.updatePasswordService)(userId, currentPassword, newPassword);
        res.sendStatus(204);
    }
    catch (error) {
        next(error);
    }
}
async function updateAvatar(req, res, next) {
    try {
        const userId = req.userId;
        const file = req.file;
        if (!file) {
            throw new AppError_1.AppError("File not provided", 400);
        }
        const uploaded = await (0, r2Service_1.uploadPublicFile)(file.buffer, file.originalname, file.mimetype, "avatars");
        const profile = await (0, profileService_1.updateAvatarService)(userId, uploaded.url);
        res.send(profile);
    }
    catch (error) {
        next(error);
    }
}
