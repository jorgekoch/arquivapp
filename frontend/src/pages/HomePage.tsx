import { Link } from "react-router-dom";
import { PublicHeader } from "../components/PublicHeader";

export function HomePage() {
  return (
    <div className="public-page">
      <div className="public-shell">
        <PublicHeader />

        <section className="hero-section">
          <div className="hero-content">
            <p className="hero-tag">Organização inteligente para materiais de aula</p>

            <h2 className="hero-title">
              Centralize arquivos, pastas e materiais no <span>Arquivapp</span>
            </h2>

            <p className="hero-description">
              Um espaço privado, simples e elegante para armazenar PDFs, partituras,
              áudios e documentos de forma organizada e acessível.
            </p>

            <div className="hero-actions">
              <Link to="/register" className="primary-button large-button">
                Começar agora
              </Link>

              <Link to="/login" className="ghost-button large-button">
                Já tenho conta
              </Link>
            </div>
          </div>

          <div className="hero-card">
            <div className="mini-window">
              <div className="mini-window-header">
                <span className="mini-dot red" />
                <span className="mini-dot yellow" />
                <span className="mini-dot green" />
              </div>

              <div className="mini-window-body">
                <div className="mini-folder">Partituras</div>
                <div className="mini-folder">Exercícios</div>
                <div className="mini-folder">Aulas em PDF</div>
                <div className="mini-file">harmonia-funcional.pdf</div>
                <div className="mini-file">escalas-maiores.pdf</div>
                <div className="mini-file">aquecimento-vocal.mp3</div>
              </div>
            </div>
          </div>
        </section>

        <section className="features-section">
          <div className="feature-card">
            <h3>Organização por pastas</h3>
            <p className="muted">
              Estruture seus materiais em categorias claras e fáceis de encontrar.
            </p>
          </div>

          <div className="feature-card">
            <h3>Arquivos na nuvem</h3>
            <p className="muted">
              Armazene documentos e materiais com segurança e acesso rápido.
            </p>
          </div>

          <div className="feature-card">
            <h3>Acesso privado</h3>
            <p className="muted">
              Seu acervo fica protegido com autenticação e gerenciamento individual.
            </p>
          </div>
        </section>

        <section className="cta-section card">
          <div>
            <p className="eyebrow">Arquivapp</p>
            <h3 className="cta-title">Pronto para organizar seu acervo?</h3>
            <p className="muted">
              Crie sua conta e comece a centralizar seus materiais agora mesmo.
            </p>
          </div>

          <div className="cta-actions">
            <Link to="/register" className="primary-button">
              Criar conta
            </Link>
            <Link to="/login" className="ghost-button">
              Entrar
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}