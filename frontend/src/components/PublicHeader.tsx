import { Link, useLocation } from "react-router-dom";
import { BrandLogo } from "./BrandLogo";

export function PublicHeader() {
  const location = useLocation();

  const isLoginPage = location.pathname === "/login";
  const isRegisterPage = location.pathname === "/register";

  return (
    <header className="public-header">
      <div className="public-header__brand">
        <Link to="/" aria-label="Ir para a página inicial do Arquivapp">
          <BrandLogo variant="public" />
        </Link>
      </div>

      <nav className="public-nav" aria-label="Navegação pública">
        {!isLoginPage && (
          <Link to="/login" className="ghost-button">
            Entrar
          </Link>
        )}

        {!isRegisterPage && (
          <Link to="/register" className="primary-button">
            Criar conta grátis
          </Link>
        )}
      </nav>
    </header>
  );
}