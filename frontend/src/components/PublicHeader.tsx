import { Link } from "react-router-dom";

export function PublicHeader() {
  return (
    <header className="public-header">
      <div>
        <p className="eyebrow">Arquivapp</p>
        <h1 className="public-brand">Arquivapp</h1>
      </div>

      <nav className="public-nav">
        <Link to="/login" className="ghost-button">
          Entrar
        </Link>
        <Link to="/register" className="primary-button">
          Criar conta grátis
        </Link>
      </nav>
    </header>
  );
}