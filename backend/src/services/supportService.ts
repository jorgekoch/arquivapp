import { AppError } from "../errors/AppError";
import { findUserById } from "../repositories/userRepository";
import { sendSupportMessageEmail } from "./emailService";

export async function sendSupportMessageService(
  userId: number,
  message: string
) {
  const trimmedMessage = String(message || "").trim();

  if (!trimmedMessage) {
    throw new AppError("A mensagem é obrigatória.", 400);
  }

  if (trimmedMessage.length < 5) {
    throw new AppError("A mensagem precisa ter pelo menos 5 caracteres.", 400);
  }

  if (trimmedMessage.length > 1000) {
    throw new AppError("A mensagem pode ter no máximo 1000 caracteres.", 400);
  }

  const user = await findUserById(userId);

  if (!user) {
    throw new AppError("Usuário não encontrado.", 404);
  }

  await sendSupportMessageEmail({
    userName: user.name,
    userEmail: user.email,
    message: trimmedMessage,
  });
}