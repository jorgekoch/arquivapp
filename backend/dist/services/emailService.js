"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendPasswordResetEmail = sendPasswordResetEmail;
exports.sendSupportMessageEmail = sendSupportMessageEmail;
exports.sendPromotionalEmail = sendPromotionalEmail;
exports.sendBulkPromotionalEmail = sendBulkPromotionalEmail;
exports.sendFolderInviteEmail = sendFolderInviteEmail;
exports.sendFolderInviteLinkEmail = sendFolderInviteLinkEmail;
exports.sendEmailVerification = sendEmailVerification;
const dotenv_1 = __importDefault(require("dotenv"));
const resend_1 = require("resend");
dotenv_1.default.config();
function getResendClient() {
    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) {
        throw new Error("RESEND_API_KEY não está configurada.");
    }
    return new resend_1.Resend(apiKey);
}
function getDefaultFromEmail() {
    const from = process.env.EMAIL_FROM;
    if (!from) {
        throw new Error("EMAIL_FROM não está configurado.");
    }
    return from;
}
function getMarketingFromEmail() {
    const from = process.env.EMAIL_FROM_MARKETING;
    if (!from) {
        throw new Error("EMAIL_FROM_MARKETING não está configurado.");
    }
    return from;
}
function buildPromotionalEmailHtml({ userName, couponCode, discountText, ctaUrl, expiresText, }) {
    const greeting = userName?.trim() ? `Olá, ${userName}!` : "Olá!";
    return `
    <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #111827; max-width: 640px; margin: 0 auto; padding: 24px;">
      <h2 style="margin-bottom: 12px;">${greeting}</h2>

      <p>Quero começar dizendo <strong>muito obrigado por usar o Arquivapp</strong>.</p>

      <p>
        Seu apoio nas primeiras fases do projeto faz toda a diferença. Estou trabalhando
        constantemente para melhorar a plataforma e adicionar novos recursos para facilitar
        a organização e o compartilhamento de arquivos.
      </p>

      <p>
        Como forma de agradecimento, preparei <strong>${discountText}</strong> no plano PRO.
      </p>

      <div style="margin: 20px 0; padding: 16px; border: 1px solid #e5e7eb; border-radius: 10px; background: #f9fafb;">
        <p style="margin: 0 0 8px;"><strong>Cupom:</strong></p>
        <p style="margin: 0; font-size: 22px; font-weight: 700; letter-spacing: 0.04em; color: #2563eb;">
          ${couponCode}
        </p>
      </div>

      <p><strong>Validade:</strong> ${expiresText}</p>

      <p style="margin: 24px 0;">
        <a
          href="${ctaUrl}"
          style="display: inline-block; background: #2563eb; color: white; padding: 12px 18px; text-decoration: none; border-radius: 8px; font-weight: 700;"
        >
          Atualizar para PRO
        </a>
      </p>

      <p>
        Se tiver qualquer sugestão ou feedback sobre o Arquivapp, eu adoraria ouvir.
        Seu retorno ajuda muito a melhorar o produto.
      </p>

      <p style="margin-top: 24px;">
        Obrigado novamente por fazer parte dessa fase inicial do Arquivapp.
      </p>

      <p style="margin-top: 24px;">
        Abraço,<br />
        <strong>Jorge</strong><br />
        Fundador do Arquivapp
      </p>
    </div>
  `;
}
async function sendPasswordResetEmail({ to, resetLink, }) {
    const from = getDefaultFromEmail();
    const resend = getResendClient();
    const { error } = await resend.emails.send({
        from,
        to,
        subject: "Redefinição de senha - Arquivapp",
        html: `
      <div style="font-family: Arial, sans-serif; line-height: 1.6;">
        <h2>Redefinição de senha</h2>
        <p>Recebemos uma solicitação para redefinir sua senha no Arquivapp.</p>
        <p>
          <a href="${resetLink}" 
             style="background:#2563eb;color:white;padding:10px 16px;text-decoration:none;border-radius:6px;">
            Redefinir senha
          </a>
        </p>
        <p>Ou copie este link no navegador:</p>
        <p>${resetLink}</p>
        <p>Se você não fez essa solicitação, ignore este email.</p>
      </div>
    `,
    });
    if (error) {
        console.error("Erro ao enviar email com Resend:", error);
        throw new Error("Erro ao enviar email");
    }
}
async function sendSupportMessageEmail({ userName, userEmail, message, }) {
    const from = getDefaultFromEmail();
    const supportEmail = process.env.SUPPORT_EMAIL;
    if (!supportEmail) {
        throw new Error("SUPPORT_EMAIL não está configurado.");
    }
    const resend = getResendClient();
    const { error } = await resend.emails.send({
        from,
        to: supportEmail,
        subject: "Nova mensagem de suporte - Arquivapp",
        replyTo: userEmail,
        html: `
      <div style="font-family: Arial, sans-serif; line-height: 1.6;">
        <h2>Nova mensagem de suporte</h2>
        <p><strong>Usuário:</strong> ${userName}</p>
        <p><strong>Email:</strong> ${userEmail}</p>
        <p><strong>Mensagem:</strong></p>
        <div style="padding:12px;border:1px solid #e5e7eb;border-radius:8px;background:#f9fafb;">
          ${message.replace(/\n/g, "<br />")}
        </div>
      </div>
    `,
    });
    if (error) {
        console.error("Erro ao enviar mensagem de suporte com Resend:", error);
        throw new Error("Erro ao enviar mensagem de suporte");
    }
}
async function sendPromotionalEmail({ to, subject, userName, couponCode, discountText, ctaUrl, expiresText, }) {
    const from = getMarketingFromEmail();
    const resend = getResendClient();
    const { error } = await resend.emails.send({
        from,
        to,
        subject,
        html: buildPromotionalEmailHtml({
            userName,
            couponCode,
            discountText,
            ctaUrl,
            expiresText,
        }),
    });
    if (error) {
        console.error("Erro ao enviar email promocional com Resend:", error);
        throw new Error("Erro ao enviar email promocional");
    }
}
async function sendBulkPromotionalEmail({ recipients, subject, couponCode, discountText, ctaUrl, expiresText, }) {
    for (const recipient of recipients) {
        await sendPromotionalEmail({
            to: recipient.email,
            subject,
            userName: recipient.name ?? undefined,
            couponCode,
            discountText,
            ctaUrl,
            expiresText,
        });
        await new Promise((resolve) => setTimeout(resolve, 300));
    }
}
async function sendFolderInviteEmail({ to, invitedUserName, ownerName, folderName, loginUrl, }) {
    const from = getMarketingFromEmail();
    const resend = getResendClient();
    const greeting = invitedUserName?.trim()
        ? `Olá, ${invitedUserName}!`
        : "Olá!";
    const { error } = await resend.emails.send({
        from,
        to,
        subject: `${ownerName} compartilhou uma pasta com você no Arquivapp`,
        html: `
      <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #111827; max-width: 640px; margin: 0 auto; padding: 24px;">
        <h2 style="margin-bottom: 12px;">${greeting}</h2>

        <p>
          <strong>${ownerName}</strong> compartilhou uma pasta com você no Arquivapp.
        </p>

        <div style="margin: 20px 0; padding: 16px; border: 1px solid #e5e7eb; border-radius: 10px; background: #f9fafb;">
          <p style="margin: 0 0 8px;"><strong>Pasta compartilhada:</strong></p>
          <p style="margin: 0; font-size: 18px; font-weight: 700; color: #2563eb;">
            ${folderName}
          </p>
        </div>

        <p>
          Faça login no Arquivapp para acessar a pasta compartilhada.
        </p>

        <p style="margin: 24px 0;">
          <a
            href="${loginUrl}"
            style="display: inline-block; background: #2563eb; color: white; padding: 12px 18px; text-decoration: none; border-radius: 8px; font-weight: 700;"
          >
            Acessar o Arquivapp
          </a>
        </p>

        <p>
          Se você ainda não entrou na sua conta recentemente, basta fazer login
          para visualizar a pasta na área de compartilhamentos.
        </p>

        <p style="margin-top: 24px;">
          Abraço,<br />
          <strong>Equipe Arquivapp</strong>
        </p>
      </div>
    `,
    });
    if (error) {
        console.error("Erro ao enviar convite de pasta com Resend:", error);
        throw new Error("Erro ao enviar convite de pasta");
    }
}
async function sendFolderInviteLinkEmail({ to, ownerName, folderName, inviteUrl, }) {
    const from = getMarketingFromEmail();
    const resend = getResendClient();
    const { error } = await resend.emails.send({
        from,
        to,
        subject: `${ownerName} convidou você para uma pasta no Arquivapp`,
        html: `
      <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #111827; max-width: 640px; margin: 0 auto; padding: 24px;">
        <h2>Você recebeu um convite no Arquivapp</h2>

        <p>
          <strong>${ownerName}</strong> compartilhou a pasta
          <strong> ${folderName}</strong> com você.
        </p>

        <p>
          Para acessar a pasta, clique no botão abaixo e crie sua conta ou entre no Arquivapp.
        </p>

        <p style="margin: 24px 0;">
          <a
            href="${inviteUrl}"
            style="display: inline-block; background: #2563eb; color: white; padding: 12px 18px; text-decoration: none; border-radius: 8px; font-weight: 700;"
          >
            Aceitar convite
          </a>
        </p>

        <p>Se você não esperava este convite, pode ignorar este email.</p>
      </div>
    `,
    });
    if (error) {
        console.error("Erro ao enviar email de convite com link:", error);
        throw new Error("Erro ao enviar convite com link");
    }
}
async function sendEmailVerification({ to, userName, verificationUrl, }) {
    const from = getDefaultFromEmail();
    const resend = getResendClient();
    const greeting = userName?.trim() ? `Olá, ${userName}!` : "Olá!";
    const { error } = await resend.emails.send({
        from,
        to,
        subject: "Confirme seu cadastro no Arquivapp",
        html: `
      <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #111827; max-width: 640px; margin: 0 auto; padding: 24px;">
        <h2>${greeting}</h2>

        <p>
          Seu cadastro no <strong>Arquivapp</strong> foi criado com sucesso.
        </p>

        <p>
          Para ativar sua conta, confirme seu e-mail clicando no botão abaixo:
        </p>

        <p style="margin: 24px 0;">
          <a
            href="${verificationUrl}"
            style="display: inline-block; background: #2563eb; color: white; padding: 12px 18px; text-decoration: none; border-radius: 8px; font-weight: 700;"
          >
            Confirmar e-mail
          </a>
        </p>

        <p>
          Se você não fez esse cadastro, pode ignorar esta mensagem.
        </p>
      </div>
    `,
    });
    if (error) {
        console.error("Erro ao enviar email de verificação:", error);
        throw new Error("Erro ao enviar email de verificação");
    }
}
