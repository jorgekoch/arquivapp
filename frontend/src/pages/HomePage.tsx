import { useState } from "react";
import { Link } from "react-router-dom";
import { PublicHeader } from "../components/PublicHeader";
import { WaitlistDialog } from "../components/WaitlistDialog";

export function HomePage() {
  const [waitlistOpen, setWaitlistOpen] = useState(false);

  return (
    <>
      <div className="public-page">
        <div className="public-shell">
          <PublicHeader />

          <section className="hero-section">
            <div className="hero-content">
              <p className="hero-tag">Organização simples para seus arquivos</p>

              <h2 className="hero-title">
                Organize seus arquivos em um só lugar com o <span>Arquivapp</span>
              </h2>

              <p className="hero-description">
                Guarde documentos, materiais, PDFs e arquivos importantes em uma
                biblioteca digital privada, simples e fácil de usar.
              </p>

              <div className="hero-actions">
                <Link to="/register" className="primary-button large-button">
                  Criar conta grátis
                </Link>

                <Link to="/login" className="ghost-button large-button">
                  Entrar
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
                  <div className="mini-folder">Materiais de aula</div>
                  <div className="mini-folder">Documentos</div>
                  <div className="mini-folder">Arquivos importantes</div>
                  <div className="mini-file">harmonia-funcional.pdf</div>
                  <div className="mini-file">anotações.docx</div>
                  <div className="mini-file">planejamento-2026.pdf</div>
                </div>
              </div>
            </div>
          </section>

          <section className="features-section">
            <div className="feature-card">
              <h3>Organização por pastas</h3>
              <p className="muted">
                Crie pastas e mantenha seus arquivos organizados com mais clareza.
              </p>
            </div>

            <div className="feature-card">
              <h3>Interface simples</h3>
              <p className="muted">
                Um sistema direto ao ponto, sem complicação e sem excesso de recursos.
              </p>
            </div>

            <div className="feature-card">
              <h3>Acesso privado</h3>
              <p className="muted">
                Seu acervo fica protegido em uma área pessoal com login.
              </p>
            </div>
          </section>

          <section className="plans-section">
            <div className="section-title-block">
              <p className="eyebrow">Planos</p>
              <h3 className="cta-title">Comece grátis e evolua quando precisar</h3>
              <p className="muted">
                O Arquivapp já está disponível gratuitamente e o plano PRO será
                liberado em breve.
              </p>
            </div>

            <div className="plans-grid">
              <div className="plan-card">
                <p className="plan-badge">FREE</p>
                <h4>Plano Gratuito</h4>
                <p className="plan-price">R$ 0/mês</p>

                <ul className="plan-list">
                  <li>500 MB de armazenamento</li>
                  <li>Organização por pastas</li>
                  <li>Upload simples de arquivos</li>
                  <li>Busca de arquivos</li>
                  <li>Perfil e tema claro/escuro</li>
                </ul>

                <Link to="/register" className="primary-button full-width">
                  Começar grátis
                </Link>
              </div>

              <div className="plan-card plan-card-pro">
                <p className="plan-badge plan-badge-pro">PRO</p>
                <h4>Plano Pro</h4>
                <p className="plan-price">Em breve</p>

                <ul className="plan-list">
                  <li>20 GB de armazenamento</li>
                  <li>Arquivos maiores</li>
                  <li>Mais espaço para organização</li>
                  <li>Melhor aproveitamento para uso profissional</li>
                  <li>Recursos avançados nas próximas versões</li>
                </ul>

                <button
                  className="ghost-button full-width"
                  onClick={() => setWaitlistOpen(true)}
                >
                  Quero ser avisado
                </button>
              </div>
            </div>
          </section>

          <section className="cta-section card">
            <div>
              <p className="eyebrow">Arquivapp</p>
              <h3 className="cta-title">Sua biblioteca digital privada</h3>
              <p className="muted">
                Organize tudo em um só lugar e comece a testar gratuitamente.
              </p>
            </div>

            <div className="cta-actions">
              <Link to="/register" className="primary-button">
                Criar conta grátis
              </Link>

              <button
                className="ghost-button"
                onClick={() => setWaitlistOpen(true)}
              >
                Quero saber do PRO
              </button>
            </div>
          </section>
        </div>
      </div>

      <WaitlistDialog
        open={waitlistOpen}
        onClose={() => setWaitlistOpen(false)}
      />
    </>
  );
}