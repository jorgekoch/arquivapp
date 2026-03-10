import { useRef, useState } from "react";
import toast from "react-hot-toast";

type Props = {
  disabled?: boolean;
  onUpload: (file: File) => Promise<void>;
};

const ACCEPTED_TYPES = [
  "application/pdf",
  "audio/mpeg",
  "audio/wav",
  "image/jpeg",
  "image/png",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  "application/msword",
];

export function UploadFileForm({ disabled = false, onUpload }: Props) {
  const inputRef = useRef<HTMLInputElement | null>(null);

  const [loading, setLoading] = useState(false);
  const [dragActive, setDragActive] = useState(false);

  function validateFile(file: File) {
    if (!ACCEPTED_TYPES.includes(file.type)) {
      toast.error("Tipo de arquivo não permitido.");
      return false;
    }

    return true;
  }

  async function handleSelectedFile(file: File | null) {
    if (!file || disabled) return;

    if (!validateFile(file)) {
      return;
    }

    try {
      setLoading(true);
      await onUpload(file);
    } finally {
      setLoading(false);
      if (inputRef.current) {
        inputRef.current.value = "";
      }
    }
  }

  function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0] || null;
    void handleSelectedFile(file);
  }

  function handleOpenFilePicker() {
    if (disabled || loading) return;
    inputRef.current?.click();
  }

  function handleDragOver(e: React.DragEvent<HTMLDivElement>) {
    e.preventDefault();
    if (disabled || loading) return;
    setDragActive(true);
  }

  function handleDragLeave(e: React.DragEvent<HTMLDivElement>) {
    e.preventDefault();
    setDragActive(false);
  }

  function handleDrop(e: React.DragEvent<HTMLDivElement>) {
    e.preventDefault();
    setDragActive(false);

    if (disabled || loading) return;

    const file = e.dataTransfer.files?.[0] || null;
    void handleSelectedFile(file);
  }

  return (
    <div
      className={`upload-dropzone ${dragActive ? "upload-dropzone-active" : ""} ${
        disabled ? "upload-dropzone-disabled" : ""
      }`}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      onClick={handleOpenFilePicker}
      role="button"
      tabIndex={disabled ? -1 : 0}
      onKeyDown={(e) => {
        if ((e.key === "Enter" || e.key === " ") && !disabled && !loading) {
          e.preventDefault();
          handleOpenFilePicker();
        }
      }}
      aria-disabled={disabled}
    >
      <input
        ref={inputRef}
        type="file"
        hidden
        accept=".pdf,.mp3,.wav,.jpg,.jpeg,.png,.doc,.docx"
        onChange={handleInputChange}
      />

      <div className="upload-dropzone-content">
        <div className="upload-dropzone-icon">📤</div>

        <div className="upload-dropzone-texts">
          <strong>
            {loading
              ? "Enviando arquivo..."
              : "Arraste um arquivo aqui ou clique para selecionar"}
          </strong>

          <p className="muted upload-dropzone-subtitle">
            Formatos aceitos: PDF, MP3, WAV, JPG, PNG, DOC e DOCX
          </p>
        </div>
      </div>
    </div>
  );
}