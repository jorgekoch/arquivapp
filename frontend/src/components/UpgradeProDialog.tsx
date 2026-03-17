import { useState } from "react";

type Props = {
  open: boolean;
  onClose: () => void;
  onConfirm: () => Promise<void>;
};

export function UpgradeProDialog({ open, onClose, onConfirm }: Props) {
  const [loading, setLoading] = useState(false);

  if (!open) return null;

  async function handleConfirm() {
    try {
      setLoading(true);
      await onConfirm();
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="dialog-overlay">
      <div className="dialog-card upgrade-dialog">
        <button className="dialog-close" onClick={onClose}>
          ✕
        </button>

        <h2>🚀 Desbloqueie o PRO</h2>

        <p className="muted">
          Leve sua organização para o próximo nível com mais recursos e espaço.
        </p>

        <ul className="upgrade-list">
          <li>📁 Compartilhamento de pastas</li>
          <li>🔗 Compartilhamento por link</li>
          <li>💾 Mais armazenamento</li>
          <li>⚡ Upload de arquivos maiores</li>
        </ul>

        <div className="upgrade-highlight">
          🔥 25% OFF essa semana
        </div>

        <button
          className="primary-button full-width"
          onClick={handleConfirm}
          disabled={loading}
        >
          {loading ? "Redirecionando..." : "Assinar PRO"}
        </button>

        <button
          className="ghost-button full-width"
          onClick={onClose}
        >
          Continuar no plano gratuito
        </button>
      </div>
    </div>
  );
}