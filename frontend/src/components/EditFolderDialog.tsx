import { useEffect, useState } from "react";
import type { Folder } from "../types";

type Props = {
  open: boolean;
  folder: Folder | null;
  onCancel: () => void;
  onConfirm: (name: string) => Promise<void>;
};

export function EditFolderDialog({
  open,
  folder,
  onCancel,
  onConfirm,
}: Props) {
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (folder) {
      setName(folder.name);
    }
  }, [folder]);

  if (!open || !folder) return null;

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!name.trim()) return;

    try {
      setLoading(true);
      await onConfirm(name.trim());
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="dialog-overlay">
      <div className="dialog-card">
        <h3>Renomear pasta</h3>
        <p className="muted">Atualize o nome da pasta selecionada.</p>

        <form className="auth-form" onSubmit={handleSubmit}>
          <input
            className="input"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Novo nome da pasta"
          />

          <div className="dialog-actions">
            <button type="button" className="ghost-button" onClick={onCancel}>
              Cancelar
            </button>
            <button type="submit" className="primary-button" disabled={loading}>
              {loading ? "Salvando..." : "Salvar"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}