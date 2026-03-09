import { useState } from "react";
import { MessageCircle, X } from "lucide-react";
import toast from "react-hot-toast";
import { api } from "../services/api";

export function SupportWidget() {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const trimmedMessage = message.trim();

    if (!trimmedMessage) {
      toast.error("Digite uma mensagem antes de enviar.");
      return;
    }

    try {
      setLoading(true);

      await api.post("/support/message", {
        message: trimmedMessage,
      });

      toast.success("Mensagem enviada ao suporte com sucesso.");
      setMessage("");
      setOpen(false);
    } catch (err: any) {
      toast.error(
        err?.response?.data?.error || "Não foi possível enviar sua mensagem."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <button
        type="button"
        className="support-fab"
        onClick={() => setOpen(true)}
        aria-label="Abrir suporte"
      >
        <MessageCircle size={22} />
      </button>

      {open && (
        <div className="dialog-overlay" onClick={() => setOpen(false)}>
          <div
            className="dialog-card support-dialog-card"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="support-dialog-header">
              <div>
                <h3>Suporte</h3>
                <p className="muted">
                  Envie sua dúvida ou problema para nossa equipe.
                </p>
              </div>

              <button
                type="button"
                className="icon-button"
                onClick={() => setOpen(false)}
                aria-label="Fechar suporte"
              >
                <X size={18} />
              </button>
            </div>

            <form className="auth-form" onSubmit={handleSubmit}>
              <textarea
                className="input support-textarea"
                placeholder="Digite sua mensagem..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                maxLength={1000}
                required
              />

              <div className="dialog-actions">
                <button
                  type="button"
                  className="ghost-button"
                  onClick={() => setOpen(false)}
                >
                  Cancelar
                </button>

                <button
                  type="submit"
                  className="primary-button"
                  disabled={loading}
                >
                  {loading ? "Enviando..." : "Enviar"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}