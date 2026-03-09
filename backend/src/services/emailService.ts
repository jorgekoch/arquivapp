import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

type SendPasswordResetEmailParams = {
  to: string;
  resetLink: string;
};

export async function sendPasswordResetEmail({
  to,
  resetLink,
}: SendPasswordResetEmailParams) {
  const from = process.env.EMAIL_FROM!;

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