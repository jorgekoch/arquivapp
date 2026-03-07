type Props = {
  open: boolean;
  title: string;
  description: string;
  confirmText?: string;
  cancelText?: string;
  onCancel: () => void;
  onConfirm: () => void;
};

export function ConfirmDialog({
  open,
  title,
  description,
  confirmText = "Confirmar",
  cancelText = "Cancelar",
  onCancel,
  onConfirm,
}: Props) {
  if (!open) return null;

  return (
    <div className="dialog-overlay">
      <div className="dialog-card">
        <h3>{title}</h3>
        <p className="muted">{description}</p>

        <div className="dialog-actions">
          <button className="ghost-button" onClick={onCancel}>
            {cancelText}
          </button>
          <button className="danger-button" onClick={onConfirm}>
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
}