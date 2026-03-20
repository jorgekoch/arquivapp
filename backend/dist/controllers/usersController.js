"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createUserController = createUserController;
const bcrypt_1 = __importDefault(require("bcrypt"));
const userRepository_1 = require("../repositories/userRepository");
const AppError_1 = require("../errors/AppError");
const folderShareService_1 = require("../services/folderShareService");
const emailVerificationService_1 = require("../services/emailVerificationService");
async function createUserController(req, res, next) {
    try {
        const { email, password, name } = req.body;
        const hashedPassword = await bcrypt_1.default.hash(password, 10);
        const user = await (0, userRepository_1.createUser)(email, hashedPassword, name);
        console.log("USUARIO CRIADO", user.id, user.email);
        await (0, folderShareService_1.acceptPendingFolderInvitesForUser)(user.id, user.email);
        console.log("GERANDO TOKEN DE VERIFICAÇÃO...");
        await (0, emailVerificationService_1.generateEmailVerificationForUser)({
            userId: user.id,
            email: user.email,
            name: user.name,
        });
        res.status(201).send({
            message: "Cadastro criado com sucesso. Enviamos um link de confirmação para o seu e-mail.",
        });
    }
    catch (error) {
        if (error.code === "P2002") {
            return next(new AppError_1.AppError("Email already in use", 409));
        }
        next(error);
    }
}
