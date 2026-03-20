"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const emailService_1 = require("../services/emailService");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
async function main() {
    await (0, emailService_1.sendPromotionalEmail)({
        to: "jorgeluizkoch@gmail.com",
        subject: "Obrigado por usar o Arquivapp — presente especial para você 🎁",
        userName: "Jorge",
        couponCode: "OBRIGADO25",
        discountText: "25% de desconto no plano PRO",
        ctaUrl: `${process.env.FRONTEND_URL}/dashboard`,
        expiresText: "até o final desta semana",
    });
    console.log("Email promocional de teste enviado com sucesso.");
}
main().catch((error) => {
    console.error("Erro ao enviar email promocional de teste:", error);
    process.exit(1);
});
console.log("EMAIL_FROM_MARKETING:", process.env.EMAIL_FROM_MARKETING);
