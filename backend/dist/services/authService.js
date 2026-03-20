"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginService = loginService;
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const userRepository_1 = require("../repositories/userRepository");
const AppError_1 = require("../errors/AppError");
const folderShareService_1 = require("./folderShareService");
async function loginService(email, password) {
    const user = await (0, userRepository_1.findUserByEmail)(email);
    if (!user) {
        throw new AppError_1.AppError("Invalid credentials", 401);
    }
    const passwordValid = await bcrypt_1.default.compare(password, user.password);
    if (!passwordValid) {
        throw new AppError_1.AppError("Invalid credentials", 401);
    }
    if (!user.emailVerified) {
        throw new AppError_1.AppError("Confirme seu e-mail antes de entrar na conta", 403);
    }
    const jwtSecret = process.env.JWT_SECRET;
    if (!jwtSecret) {
        throw new AppError_1.AppError("JWT_SECRET is not configured", 500);
    }
    await (0, folderShareService_1.acceptPendingFolderInvitesForUser)(user.id, user.email);
    const token = jsonwebtoken_1.default.sign({ userId: user.id }, jwtSecret, {
        expiresIn: "1d",
    });
    return {
        token,
        user: {
            id: user.id,
            name: user.name,
            email: user.email,
            avatarUrl: user.avatarUrl,
            plan: user.plan,
            createdAt: user.createdAt,
        },
    };
}
