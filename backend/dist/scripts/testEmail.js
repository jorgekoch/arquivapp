"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const emailService_1 = require("../services/emailService");
async function main() {
    await (0, emailService_1.sendPromotionalEmail)({
        to: "jorgeluizkoch@gmail.com",
        subject: "Teste de envio - Arquivapp",
        userName: "Jorge",
        couponCode: "OBRIGADO25",
        discountText: "25% de desconto no plano PRO",
        ctaUrl: `${process.env.FRONTEND_URL}/dashboard`,
        expiresText: "até o final desta semana",
    });
    console.log("Email de teste enviado com sucesso.");
}
main().catch((error) => {
    console.error(error);
    process.exit(1);
});
