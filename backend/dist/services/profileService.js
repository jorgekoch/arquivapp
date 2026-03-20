"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getProfileService = getProfileService;
exports.updateProfileService = updateProfileService;
exports.updatePasswordService = updatePasswordService;
exports.updateAvatarService = updateAvatarService;
const bcrypt_1 = __importDefault(require("bcrypt"));
const AppError_1 = require("../errors/AppError");
const userRepository_1 = require("../repositories/userRepository");
const storageService_1 = require("./storageService");
async function getProfileService(userId) {
    const user = await (0, userRepository_1.findUserById)(userId);
    if (!user) {
        throw new AppError_1.AppError("User not found", 404);
    }
    const storageUsed = await (0, storageService_1.getUserStorageUsage)(userId);
    const storageLimit = (0, storageService_1.getStorageLimit)(user.plan);
    return {
        id: user.id,
        email: user.email,
        name: user.name,
        avatarUrl: user.avatarUrl,
        plan: user.plan,
        storageUsed,
        storageLimit,
        createdAt: user.createdAt,
    };
}
async function updateProfileService(userId, name) {
    const user = await (0, userRepository_1.findUserById)(userId);
    if (!user) {
        throw new AppError_1.AppError("User not found", 404);
    }
    const updatedUser = await (0, userRepository_1.updateUserProfile)(userId, { name });
    const storageUsed = await (0, storageService_1.getUserStorageUsage)(userId);
    const storageLimit = (0, storageService_1.getStorageLimit)(updatedUser.plan);
    return {
        id: updatedUser.id,
        email: updatedUser.email,
        name: updatedUser.name,
        avatarUrl: updatedUser.avatarUrl,
        plan: updatedUser.plan,
        storageUsed,
        storageLimit,
        createdAt: updatedUser.createdAt,
    };
}
async function updatePasswordService(userId, currentPassword, newPassword) {
    const user = await (0, userRepository_1.findUserById)(userId);
    if (!user) {
        throw new AppError_1.AppError("User not found", 404);
    }
    const passwordMatches = await bcrypt_1.default.compare(currentPassword, user.password);
    if (!passwordMatches) {
        throw new AppError_1.AppError("Current password is incorrect", 401);
    }
    const hashedPassword = await bcrypt_1.default.hash(newPassword, 10);
    await (0, userRepository_1.updateUserPassword)(userId, hashedPassword);
}
async function updateAvatarService(userId, avatarUrl) {
    const user = await (0, userRepository_1.findUserById)(userId);
    if (!user) {
        throw new AppError_1.AppError("User not found", 404);
    }
    const updatedUser = await (0, userRepository_1.updateUserProfile)(userId, { avatarUrl });
    const storageUsed = await (0, storageService_1.getUserStorageUsage)(userId);
    const storageLimit = (0, storageService_1.getStorageLimit)(updatedUser.plan);
    return {
        id: updatedUser.id,
        email: updatedUser.email,
        name: updatedUser.name,
        avatarUrl: updatedUser.avatarUrl,
        plan: updatedUser.plan,
        storageUsed,
        storageLimit,
        createdAt: updatedUser.createdAt,
    };
}
