import { useMemo, useState } from "react";
import toast from "react-hot-toast";
import { api } from "../services/api";
import type { FileItem, Folder } from "../types";
import { UploadFileForm } from "./UploadFileForm";
import { LoadingSkeleton } from "./LoadingSkeleton";
import { EmptyState } from "./EmptyState";
import { FilePreviewDialog } from "./FilePreviewDialog";

type Props = {
  selectedFolder: Folder | null;
  files: FileItem[];
  loading: boolean;
  onUpload: (file: File) => Promise<void>;
  onEditFile: (file: FileItem) => void;
  onDeleteFile: (file: FileItem) => void;
};

type SortOption =
  | "newest"
  | "oldest"
  | "name-asc"
  | "name-desc"
  | "size-desc"
  | "size-asc";

export function FilePanel({
  selectedFolder,
  files,
  loading,
  onUpload,
  onEditFile,
  onDeleteFile,
}: Props) {
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState<SortOption>("newest");
  const [previewFile, setPreviewFile] = useState<FileItem | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [loadingPreviewId, setLoadingPreviewId] = useState<number | null>(null);
  const [loadingOpenId, setLoadingOpenId] = useState<number | null>(null);
  const [loadingShareId, setLoadingShareId] = useState<number | null>(null);
  const [copiedShareId, setCopiedShareId] = useState<number | null>(null);

  const filteredFiles = useMemo(() => {
    const normalized = search.trim().toLowerCase();

    if (!normalized) return files;

    return files.filter((file) =>
      file.name.toLowerCase().includes(normalized)
    );
  }, [files, search]);

  const sortedFiles = useMemo(() => {
    const list = [...filteredFiles];

    switch (sortBy) {
      case "newest":
        return list.sort(
          (a, b) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );

      case "oldest":
        return list.sort(
          (a, b) =>
            new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
        );

      case "name-asc":
        return list.sort((a, b) => a.name.localeCompare(b.name, "pt-BR"));

      case "name-desc":
        return list.sort((a, b) => b.name.localeCompare(a.name, "pt-BR"));

      case "size-desc":
        return list.sort((a, b) => (b.size ?? 0) - (a.size ?? 0));

      case "size-asc":
        return list.sort((a, b) => (a.size ?? 0) - (b.size ?? 0));

      default:
        return list;
    }
  }, [filteredFiles, sortBy]);

  function formatFileSize(size?: number | null) {
    if (!size) return "Tamanho desconhecido";

    if (size < 1024) return `${size} B`;
    if (size < 1024 * 1024) return `${(size / 1024).toFixed(1)} KB`;
    if (size < 1024 * 1024 * 1024) {
      return `${(size / (1024 * 1024)).toFixed(1)} MB`;
    }

    return `${(size / (1024 * 1024 * 1024)).toFixed(1)} GB`;
  }

  function formatDate(dateString: string) {
    const date = new Date(dateString);

    return date.toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  }

  function getFileIcon(fileName: string) {
    const extension = fileName.split(".").pop()?.toLowerCase();

    switch (extension) {
      case "pdf":
        return "📄";
      case "doc":
      case "docx":
        return "📘";
      case "xls":
      case "xlsx":
        return "📊";
      case "ppt":
      case "pptx":
        return "📈";
      case "jpg":
      case "jpeg":
      case "png":
      case "gif":
      case "webp":
        return "🖼";
      case "mp3":
      case "wav":
        return "🎵";
      case "zip":
      case "rar":
      case "7z":
        return "📦";
      case "txt":
        return "📝";
      default:
        return "📁";
    }
  }

  function getSortLabel(value: SortOption) {
    switch (value) {
      case "newest":
        return "Recentes";
      case "oldest":
        return "Antigos";
      case "name-asc":
        return "Nome A-Z";
      case "name-desc":
        return "Nome Z-A";
      case "size-desc":
        return "Maior tamanho";
      case "size-asc":
        return "Menor tamanho";
      default:
        return "Ordenar";
    }
  }

  async function getTemporaryFileUrl(fileId: number) {
    const response = await api.get<{ url: string }>(`/files/${fileId}/download`);
    return response.data.url;
  }

  async function handlePreview(file: FileItem) {
    try {
      setLoadingPreviewId(file.id);
      const url = await getTemporaryFileUrl(file.id);
      setPreviewFile(file);
      setPreviewUrl(url);
    } catch (err: any) {
      toast.error(err?.response?.data?.error || "Erro ao visualizar arquivo");
    } finally {
      setLoadingPreviewId(null);
    }
  }

  async function handleOpenInNewTab(file: FileItem) {
    try {
      setLoadingOpenId(file.id);
      const url = await getTemporaryFileUrl(file.id);
      window.open(url, "_blank", "noopener,noreferrer");
    } catch (err: any) {
      toast.error(err?.response?.data?.error || "Erro ao abrir arquivo");
    } finally {
      setLoadingOpenId(null);
    }
  }

  async function handleShare(file: FileItem) {
    try {
      setLoadingShareId(file.id);

      const response = await api.post<{ shareUrl: string }>(
        `/shared/${file.id}/share`
      );

      await navigator.clipboard.writeText(response.data.shareUrl);

      setCopiedShareId(file.id);
      toast.success("Link de compartilhamento copiado.");

      setTimeout(() => {
        setCopiedShareId(null);
      }, 2000);
    } catch (err: any) {
      toast.error(err?.response?.data?.error || "Erro ao compartilhar arquivo");
    } finally {
      setLoadingShareId(null);
    }
  }

  function handleClosePreview() {
    setPreviewFile(null);
    setPreviewUrl(null);
  }

  if (!selectedFolder) {
    return (
      <section className="content card mobile-section-card center-content">
        <EmptyState
          emoji="🗂️"
          title="Nenhuma pasta selecionada"
          description="Escolha uma pasta para visualizar os arquivos."
        />
      </section>
    );
  }

  return (
    <>
      <section className="content card mobile-section-card">
        <div className="section-header compact-section-header file-panel-header">
          <div>
            <h2>{selectedFolder.name}</h2>
            <p className="muted">
              Adicione, visualize e gerencie os arquivos desta pasta.
            </p>
          </div>

          <div className="file-sort-compact">
            <label className="file-sort-compact__label" htmlFor="file-sort">
              Ordenação: 
            </label>

            <select
              id="file-sort"
              className="file-sort-compact__select"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as SortOption)}
              aria-label="Ordenar arquivos"
            >
              <option value="newest">Recentes</option>
              <option value="oldest">Antigos</option>
              <option value="name-asc">Nome A-Z</option>
              <option value="name-desc">Nome Z-A</option>
              <option value="size-desc">Maior tamanho</option>
              <option value="size-asc">Menor tamanho</option>
            </select>
          </div>
        </div>

        <UploadFileForm disabled={!selectedFolder} onUpload={onUpload} />

        <div className="file-toolbar">
          <input
            className="input"
            type="text"
            placeholder="Buscar arquivos..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        {loading ? (
          <LoadingSkeleton lines={5} height={62} />
        ) : sortedFiles.length === 0 ? (
          <EmptyState
            emoji="📄"
            title={
              files.length === 0
                ? "Nenhum arquivo nesta pasta"
                : "Nenhum resultado encontrado"
            }
            description={
              files.length === 0
                ? "Envie seu primeiro arquivo para começar."
                : "Tente buscar por outro nome de arquivo."
            }
          />
        ) : (
          <div className="file-list mobile-file-list">
            {sortedFiles.map((file) => (
              <div key={file.id} className="file-item mobile-file-item">
                <div className="file-info">
                  <div className="file-meta">
                    <div className="file-title-row">
                      <span className="file-icon">{getFileIcon(file.name)}</span>
                      <strong className="file-name-text">{file.name}</strong>
                    </div>

                    <div className="file-details-stack">
                      <div className="file-size-line">
                        {formatFileSize(file.size)}
                      </div>

                      <div className="file-date-line">
                        enviado em {formatDate(file.createdAt)}
                      </div>
                    </div>
                  </div>

                  <div className="file-links-row">
                    <button
                      className="link-button"
                      onClick={() => handlePreview(file)}
                      disabled={loadingPreviewId === file.id}
                    >
                      {loadingPreviewId === file.id
                        ? "Carregando..."
                        : "Visualizar"}
                    </button>

                    <button
                      className="link-button"
                      onClick={() => handleOpenInNewTab(file)}
                      disabled={loadingOpenId === file.id}
                    >
                      {loadingOpenId === file.id
                        ? "Abrindo..."
                        : "Abrir em nova aba"}
                    </button>

                    <button
                      className={`link-button ${
                        copiedShareId === file.id ? "link-button-success" : ""
                      }`}
                      onClick={() => handleShare(file)}
                      disabled={loadingShareId === file.id}
                    >
                      {loadingShareId === file.id
                        ? "Copiando..."
                        : copiedShareId === file.id
                        ? "Copiado"
                        : "Compartilhar"}
                    </button>

                    <button
                      className="link-button"
                      onClick={() => onEditFile(file)}
                    >
                      Renomear
                    </button>
                  </div>
                </div>

                <button
                  className="danger-button small file-delete-button"
                  onClick={() => onDeleteFile(file)}
                >
                  Excluir
                </button>
              </div>
            ))}
          </div>
        )}
      </section>

      <FilePreviewDialog
        open={Boolean(previewFile && previewUrl)}
        file={previewFile}
        fileUrl={previewUrl}
        onClose={handleClosePreview}
      />
    </>
  );
}