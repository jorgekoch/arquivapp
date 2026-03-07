import type { Folder } from "../types";
import { Pencil, Trash2 } from "lucide-react";

type Props = {
  folders: Folder[];
  selectedFolderId: number | null;
  loading: boolean;
  onSelectFolder: (folderId: number) => void;
  onEditFolder: (folder: Folder) => void;
  onDeleteFolder: (folder: Folder) => void;
};

export function FolderSidebar({
  folders,
  selectedFolderId,
  loading,
  onSelectFolder,
  onEditFolder,
  onDeleteFolder,
}: Props) {
  return (
    <aside className="sidebar card">
      <div className="section-header">
        <div>
          <h2>Pastas</h2>
          <p className="muted">Organize seus materiais.</p>
        </div>
      </div>

      {loading ? (
        <p className="muted">Carregando pastas...</p>
      ) : folders.length === 0 ? (
        <p className="muted">Nenhuma pasta criada.</p>
      ) : (
        <div className="folder-list">
          {folders.map((folder) => (
            <div
              key={folder.id}
              className={`folder-item ${
                selectedFolderId === folder.id ? "active-folder" : ""
              }`}
            >
              <button
                className="folder-name-button"
                onClick={() => onSelectFolder(folder.id)}
              >
                {folder.name}
              </button>

              <div className="folder-actions">
                <button
                  className="icon-button"
                  onClick={() => onEditFolder(folder)}
                >
                  <Pencil size={16} />
                </button>

                <button
                  className="icon-button danger"
                  onClick={() => onDeleteFolder(folder)}
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </aside>
  );
}