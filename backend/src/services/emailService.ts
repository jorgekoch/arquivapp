import { Resend } from "resend";

function getResendClient() {
  const apiKey = process.env.RESEND_API_KEY;

  if (!apiKey) {
    throw new Error("RESEND_API_KEY não está configurada.");
  }

  return new Resend(apiKey);
}

type SendPasswordResetEmailParams = {
  to: string;
  resetLink: string;
};

type SendSupportMessageEmailParams = {
  userName: string;
  userEmail: string;
  message: string;
};

export async function sendPasswordResetEmail({
  to,
  resetLink,
}: SendPasswordResetEmailParams) {
  const from = process.env.EMAIL_FROM;

  if (!from) {
    throw new Error("EMAIL_FROM não está configurado.");
  }

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

export async function sendSupportMessageEmail({
  userName,
  userEmail,
  message,
}: SendSupportMessageEmailParams) {
  const from = process.env.EMAIL_FROM;
  const supportEmail = process.env.SUPPORT_EMAIL;

  if (!from) {
    throw new Error("EMAIL_FROM não está configurado.");
  }

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