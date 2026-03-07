import { useAuth } from "../hooks/useAuth";

type Props = {
  children: React.ReactNode;
};

export function Layout({ children }: Props) {
  const { logout } = useAuth();

  return (
    <div className="app-shell">
      <header className="topbar">
        <div>
          <h1 className="brand">Music Files</h1>
          <p className="subtitle">Biblioteca privada de aulas</p>
        </div>

        <button className="ghost-button" onClick={logout}>
          Sair
        </button>
      </header>

      <main className="main-content">{children}</main>
    </div>
  );
}