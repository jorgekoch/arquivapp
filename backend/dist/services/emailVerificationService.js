"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateEmailVerificationForUser = generateEmailVerificationForUser;
exports.verifyEmailToken = verifyEmailToken;
const crypto_1 = __importDefault(require("crypto"));
const AppError_1 = require("../errors/AppError");
const userRepository_1 = require("../repositories/userRepository");
const emailService_1 = require("./emailService");
async function generateEmailVerificationForUser(params) {
    const token = crypto_1.default.randomBytes(24).toString("hex");
    const expiresAt = new Date(Date.now() + 1000 * 60 * 60 * 24);
    console.log("=== EMAIL VERIFICATION ===");
    console.log("userId:", params.userId);
    console.log("email:", params.email);
    console.log("token gerado:", token);
    console.log("expiresAt:", expiresAt);
    const updatedUser = await (0, userRepository_1.setEmailVerificationToken)(params.userId, token, expiresAt);
    console.log("usuário após salvar token:", {
        id: updatedUser.id,
        email: updatedUser.email,
        emailVerified: updatedUser.emailVerified,
        emailVerificationToken: updatedUser.emailVerificationToken,
        emailVerificationExpiresAt: updatedUser.emailVerificationExpiresAt,
    });
    const verificationUrl = `${process.env.FRONTEND_URL}/confirm-email/${token}`;
    console.log("verificationUrl:", verificationUrl);
    await (0, emailService_1.sendEmailVerification)({
        to: params.email,
        userName: params.name,
        verificationUrl,
    });
}
async function verifyEmailToken(token) {
    console.log("TOKEN RECEBIDO PARA VALIDAR:", token);
    const user = await (0, userRepository_1.findUserByEmailVerificationToken)(token);
    console.log("USUÁRIO ENCONTRADO PELO TOKEN:", user);
    if (!user) {
        throw new AppError_1.AppError("Token de verificação inválido", 404);
    }
    if (!user.emailVerificationExpiresAt) {
        throw new AppError_1.AppError("Token de verificação inválido", 400);
    }
    if (user.emailVerificationExpiresAt.getTime() < Date.now()) {
        throw new AppError_1.AppError("Token de verificação expirado", 400);
    }
    await (0, userRepository_1.confirmUserEmail)(user.id);
    return {
        message: "E-mail confirmado com sucesso",
    };
}
