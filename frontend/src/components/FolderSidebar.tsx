import type { Folder } from "../types";

type Props = {
  folders: Folder[];
  selectedFolderId: number | null;
  onSelectFolder: (folderId: number) => void;
  onDeleteFolder: (folderId: number) => Promise<void>;
};

export function FolderSidebar({
  folders,
  selectedFolderId,
  onSelectFolder,
  onDeleteFolder,
}: Props) {
  return (
    <aside className="sidebar card">
      <div className="section-header">
        <h2>Pastas</h2>
      </div>

      <div className="folder-list">
        {folders.length === 0 ? (
          <p className="muted">Nenhuma pasta criada.</p>
        ) : (
          folders.map((folder) => (
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

              <button
                className="danger-button small"
                onClick={() => onDeleteFolder(folder.id)}
              >
                Excluir
              </button>
            </div>
          ))
        )}
      </div>
    </aside>
  );
}