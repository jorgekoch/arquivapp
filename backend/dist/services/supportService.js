"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendSupportMessageService = sendSupportMessageService;
const AppError_1 = require("../errors/AppError");
const userRepository_1 = require("../repositories/userRepository");
const emailService_1 = require("./emailService");
async function sendSupportMessageService(userId, message) {
    const trimmedMessage = String(message || "").trim();
    if (!trimmedMessage) {
        throw new AppError_1.AppError("A mensagem é obrigatória.", 400);
    }
    if (trimmedMessage.length < 5) {
        throw new AppError_1.AppError("A mensagem precisa ter pelo menos 5 caracteres.", 400);
    }
    if (trimmedMessage.length > 1000) {
        throw new AppError_1.AppError("A mensagem pode ter no máximo 1000 caracteres.", 400);
    }
    const user = await (0, userRepository_1.findUserById)(userId);
    if (!user) {
        throw new AppError_1.AppError("Usuário não encontrado.", 404);
    }
    await (0, emailService_1.sendSupportMessageEmail)({
        userName: user.name,
        userEmail: user.email,
        message: trimmedMessage,
    });
}
