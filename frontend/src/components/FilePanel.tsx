import type { FileItem, Folder } from "../types";
import { UploadFileForm } from "./UploadFileForm";

type Props = {
  selectedFolder: Folder | null;
  files: FileItem[];
  onUpload: (file: File) => Promise<void>;
  onDeleteFile: (fileId: number) => Promise<void>;
};

export function FilePanel({
  selectedFolder,
  files,
  onUpload,
  onDeleteFile,
}: Props) {
  if (!selectedFolder) {
    return (
      <section className="content card center-content">
        <p className="muted">Selecione uma pasta para visualizar os arquivos.</p>
      </section>
    );
  }

  return (
    <section className="content card">
      <div className="section-header">
        <div>
          <h2>{selectedFolder.name}</h2>
          <p className="muted">Gerencie os arquivos desta pasta.</p>
        </div>
      </div>

      <UploadFileForm disabled={!selectedFolder} onUpload={onUpload} />

      <div className="file-list">
        {files.length === 0 ? (
          <p className="muted">Nenhum arquivo nesta pasta.</p>
        ) : (
          files.map((file) => (
            <div key={file.id} className="file-item">
              <div className="file-info">
                <strong>{file.name}</strong>
                <a
                  href={file.url}
                  target="_blank"
                  rel="noreferrer"
                  className="file-link"
                >
                  Abrir arquivo
                </a>
              </div>

              <button
                className="danger-button small"
                onClick={() => onDeleteFile(file.id)}
              >
                Excluir
              </button>
            </div>
          ))
        )}
      </div>
    </section>
  );
}