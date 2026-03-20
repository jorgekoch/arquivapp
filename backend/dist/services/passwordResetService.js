"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.forgotPasswordService = forgotPasswordService;
exports.resetPasswordService = resetPasswordService;
const bcrypt_1 = __importDefault(require("bcrypt"));
const crypto_1 = __importDefault(require("crypto"));
const userRepository_1 = require("../repositories/userRepository");
const emailService_1 = require("./emailService");
const AppError_1 = require("../errors/AppError");
async function forgotPasswordService(email) {
    const user = await (0, userRepository_1.findUserByEmail)(email);
    // Resposta neutra por segurança
    if (!user) {
        console.log(`Solicitação de recuperação para e-mail inexistente: ${email}`);
        return;
    }
    const token = crypto_1.default.randomBytes(32).toString("hex");
    const expiresAt = new Date(Date.now() + 30 * 60 * 1000);
    await (0, userRepository_1.saveResetPasswordToken)(user.id, token, expiresAt);
    const appUrl = process.env.FRONTEND_URL || "http://localhost:5173";
    const resetLink = `${appUrl}/reset-password?token=${token}`;
    console.log(`Token de reset gerado para ${email}`);
    await (0, emailService_1.sendPasswordResetEmail)({
        to: user.email,
        resetLink,
    });
}
async function resetPasswordService(token, newPassword) {
    const user = await (0, userRepository_1.findUserByResetPasswordToken)(token);
    if (!user) {
        throw new AppError_1.AppError("Token inválido ou expirado", 400);
    }
    const hashedPassword = await bcrypt_1.default.hash(newPassword, 10);
    await (0, userRepository_1.updateUserPassword)(user.id, hashedPassword);
    await (0, userRepository_1.clearResetPasswordToken)(user.id);
}
