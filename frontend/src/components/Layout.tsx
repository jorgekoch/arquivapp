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
          <h1 className="brand">Acervo Pessoal Bleize</h1>
          <p className="subtitle">Biblioteca privada</p>
        </div>

        <button className="ghost-button" onClick={logout}>
          Sair
        </button>
      </header>

      <main className="main-content">{children}</main>
    </div>
  );
}