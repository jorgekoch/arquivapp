import { Link } from "react-router-dom";

export function PublicFooter() {
  return (
    <footer className="public-footer">
      <div className="public-footer__container">
        <div className="public-footer__brand">
          <Link to="/" className="public-footer__logo">
            Arquivapp
          </Link>

          <p className="public-footer__description">
            Armazene, organize e visualize seus arquivos com simplicidade,
            rapidez e segurança, direto no navegador.
          </p>

          <div className="public-footer__cta">
            <Link to="/register" className="primary-button">
              Criar conta grátis
            </Link>
          </div>
        </div>

        <nav className="public-footer__column" aria-label="Produto">
          <h4>Produto</h4>
          <Link to="/">Início</Link>
          <Link to="/register">Criar conta</Link>
          <Link to="/login">Entrar</Link>
        </nav>

        <nav className="public-footer__column" aria-label="Empresa">
          <h4>Empresa</h4>
          <Link to="/about">Sobre</Link>
          <Link to="/contact">Contato</Link>
        </nav>

        <nav className="public-footer__column" aria-label="Legal">
          <h4>Legal</h4>
          <Link to="/terms">Termos de uso</Link>
          <Link to="/privacy">Privacidade</Link>
        </nav>
      </div>

      <div className="public-footer__bottom">
        <p>© {new Date().getFullYear()} Arquivapp. Todos os direitos reservados.</p>
      </div>
    </footer>
  );
}