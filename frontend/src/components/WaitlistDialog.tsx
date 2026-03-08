import { useState } from "react";
import toast from "react-hot-toast";
import { api } from "../services/api";

type Props = {
  open: boolean;
  onClose: () => void;
};

export function WaitlistDialog({ open, onClose }: Props) {
  const [form, setForm] = useState({
    name: "",
    email: "",
  });
  const [loading, setLoading] = useState(false);

  if (!open) return null;

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    try {
      setLoading(true);

      await api.post("/waitlist", {
        ...form,
        interest: "PRO",
      });

      toast.success("Perfeito! Seu contato foi salvo.");
      setForm({ name: "", email: "" });
      onClose();
    } catch (err: any) {
      toast.error(
        err?.response?.data?.error || "Não foi possível salvar seu contato."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="dialog-overlay" onClick={onClose}>
      <div
        className="dialog-card waitlist-dialog-card"
        onClick={(e) => e.stopPropagation()}
      >
        <h3>Quero ser avisado sobre o PRO</h3>
        <p className="muted">
          Deixe seu nome e e-mail para entrar na lista de interesse do plano PRO.
        </p>

        <form className="auth-form" onSubmit={handleSubmit}>
          <input
            className="input"
            type="text"
            placeholder="Seu nome (opcional)"
            value={form.name}
            onChange={(e) =>
              setForm((prev) => ({ ...prev, name: e.target.value }))
            }
          />

          <input
            className="input"
            type="email"
            placeholder="Seu melhor e-mail"
            value={form.email}
            onChange={(e) =>
              setForm((prev) => ({ ...prev, email: e.target.value }))
            }
            required
          />

          <button className="primary-button full-width" disabled={loading}>
            {loading ? "Salvando..." : "Entrar na lista"}
          </button>
        </form>

        <div className="dialog-actions">
          <button className="ghost-button" onClick={onClose}>
            Fechar
          </button>
        </div>
      </div>
    </div>
  );
}