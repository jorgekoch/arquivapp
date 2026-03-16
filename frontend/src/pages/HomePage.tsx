import { Helmet } from "react-helmet-async";
import { useState } from "react";
import { Link } from "react-router-dom";
import { WaitlistDialog } from "../components/WaitlistDialog";
import { PublicLayout } from "../components/PublicLayout";
import { FilePreviewFeatures } from "../components/FilePreviewFeatures";

export function HomePage() {
  const [waitlistOpen, setWaitlistOpen] = useState(false);

  return (
    <>
      <Helmet>
        <title>Arquivapp | Organize e compartilhe arquivos com segurança</title>
        <meta
          name="description"
          content="Arquivapp é uma plataforma para organizar arquivos, armazenar documentos na nuvem, compartilhar pastas e acessar conteúdos com praticidade e segurança."
        />
        <meta
          property="og:title"
          content="Arquivapp | Organize e compartilhe arquivos com segurança"
        />
        <meta
          property="og:description"
          content="Organize arquivos, compartilhe pastas e acesse documentos com praticidade usando o Arquivapp."
        />
        <meta property="og:url" content="https://arquivapp.com.br" />
      </Helmet>

      <PublicLayout>
        <section className="landing-hero">
          <div className="landing-hero__content">
            <p className="landing-hero__tag">Beta público disponível</p>

            <h1 className="landing-hero__title">
              Organize, proteja e acesse seus arquivos em um só lugar.
            </h1>

            <p className="landing-hero__description">
              O Arquivapp é um espaço simples e seguro para guardar documentos,
              PDFs e arquivos importantes na nuvem, com organização por pastas,
              visualização rápida e acesso prático no dia a dia.
            </p>

            <div className="landing-hero__actions">
              <Link to="/register" className="primary-button large-button">
                Criar conta grátis
              </Link>

              <Link to="/login" className="ghost-button large-button">
                Entrar
              </Link>
            </div>

            <p className="muted landing-hero__footnote">
              Comece gratuitamente e teste o Arquivapp em sua fase Beta.
            </p>
          </div>

          <div className="landing-hero__preview">
            <div className="landing-window">
              <div className="landing-window__header">
                <span className="landing-window__dot landing-window__dot--red" />
                <span className="landing-window__dot landing-window__dot--yellow" />
                <span className="landing-window__dot landing-window__dot--green" />
              </div>

              <div className="landing-window__body">
                <div className="landing-window__folder">Documentos pessoais</div>
                <div className="landing-window__folder">Materiais de estudo</div>
                <div className="landing-window__folder">Arquivos importantes</div>
                <div className="landing-window__file">contrato-assinado.pdf</div>
                <div className="landing-window__file">anotacoes-aula.docx</div>
                <div className="landing-window__file">planejamento-2026.pdf</div>
              </div>
            </div>
          </div>
        </section>

        <section className="landing-features">
          <div className="landing-feature-card">
            <h3>Organização sem bagunça</h3>
            <p className="muted">
              Crie pastas e mantenha seus arquivos separados de forma clara e
              fácil de encontrar.
            </p>
          </div>

          <div className="landing-feature-card">
            <h3>Upload simples e rápido</h3>
            <p className="muted">
              Envie seus arquivos com praticidade e acompanhe tudo em uma
              interface direta e intuitiva.
            </p>
          </div>

          <div className="landing-feature-card">
            <h3>Privacidade e segurança</h3>
            <p className="muted">
              Seus arquivos ficam em uma área privada, protegida por login e
              acesso controlado.
            </p>
          </div>
        </section>

        <section className="landing-section card">
          <div className="section-title-block">
            <p className="eyebrow">Como funciona</p>
            <h2 className="cta-title">
              Uma forma simples de armazenar arquivos online e manter tudo organizado
            </h2>
            <p className="muted">
              O Arquivapp foi criado para quem precisa guardar documentos,
              organizar pastas e acessar arquivos importantes com mais praticidade.
            </p>
          </div>

          <div className="landing-rich-text">
            <p>
              Com o Arquivapp, você pode armazenar arquivos na nuvem, separar
              conteúdos por pastas, localizar documentos com facilidade e manter
              materiais importantes sempre acessíveis. A plataforma foi pensada
              para oferecer uma experiência simples, direta e segura.
            </p>

            <p>
              Seja para uso pessoal, estudos, trabalho ou rotina profissional,
              o Arquivapp ajuda a centralizar documentos, PDFs, imagens e outros
              arquivos em um só lugar. Isso reduz bagunça, melhora a organização
              e facilita o compartilhamento quando necessário.
            </p>
          </div>

          <div className="landing-hero__actions">
            <Link to="/features" className="ghost-button">
              Ver todos os recursos
            </Link>
          </div>
        </section>

        <FilePreviewFeatures />

        <section className="landing-section">
          <div className="section-title-block">
            <p className="eyebrow">Ideal para</p>
            <h2 className="cta-title">
              Um espaço prático para os arquivos do dia a dia
            </h2>
            <p className="muted">
              Use o Arquivapp para manter seus arquivos importantes sempre
              organizados, acessíveis e protegidos.
            </p>
          </div>

          <div className="landing-features">
            <div className="landing-feature-card">
              <h3>Documentos pessoais</h3>
              <p className="muted">
                Guarde contratos, comprovantes, documentos e arquivos
                importantes em um só lugar.
              </p>
            </div>

            <div className="landing-feature-card">
              <h3>Materiais de estudo</h3>
              <p className="muted">
                Organize apostilas, PDFs, exercícios e conteúdos por pastas.
              </p>
            </div>

            <div className="landing-feature-card">
              <h3>Arquivos de trabalho</h3>
              <p className="muted">
                Mantenha documentos profissionais bem organizados e fáceis de
                acessar.
              </p>
            </div>
          </div>
        </section>

        <section className="landing-section card">
          <div className="section-title-block">
            <p className="eyebrow">Por que usar</p>
            <h2 className="cta-title">Mais praticidade para organizar e compartilhar arquivos</h2>
            <p className="muted">
              O Arquivapp ajuda você a manter uma rotina mais organizada com
              armazenamento online, visualização de arquivos e estrutura por pastas.
            </p>
          </div>

          <div className="landing-rich-text">
            <p>
              Se você procura uma solução para armazenar arquivos online,
              compartilhar documentos ou organizar arquivos na nuvem de forma
              simples, o Arquivapp oferece uma experiência clara e fácil de usar.
            </p>

            <p>
              A proposta do Arquivapp é unir organização, praticidade e
              segurança em uma plataforma acessível para quem quer centralizar
              arquivos e reduzir a dependência de ferramentas confusas ou
              excessivamente complexas.
            </p>
          </div>
        </section>

        <section className="landing-plans">
          <div className="section-title-block">
            <p className="eyebrow">Planos</p>
            <h2 className="cta-title">Comece grátis e evolua quando precisar</h2>
            <p className="muted">
              O Arquivapp já está disponível gratuitamente em fase Beta. O plano
              PRO oferece mais armazenamento, compartilhamento por link e
              recursos pensados para um uso mais profissional.
            </p>
          </div>

          <div className="landing-plans__grid">
            <div className="landing-plan-card">
              <p className="landing-plan-card__badge">FREE</p>
              <h3>Plano Gratuito</h3>
              <p className="landing-plan-card__price">R$ 0/mês</p>
              <p className="muted">
                Ideal para começar a organizar seus arquivos na nuvem.
              </p>

              <ul className="landing-plan-card__list">
                <li>500 MB de armazenamento</li>
                <li>Organização por pastas</li>
                <li>Upload e gerenciamento de arquivos</li>
                <li>Busca e visualização de arquivos</li>
                <li>Sem compartilhamento por link</li>
              </ul>

              <Link to="/register" className="primary-button full-width">
                Começar grátis
              </Link>
            </div>

            <div className="landing-plan-card landing-plan-card--pro">
              <p className="landing-plan-card__badge landing-plan-card__badge--pro">
                PRO
              </p>
              <h3>Plano Pro</h3>
              <p className="plan-price">
                R$19,90/mês
                <span className="plan-price-note"> (em breve)</span>
              </p>
              <p className="muted">
                Mais espaço e recursos para quem precisa usar o Arquivapp de
                forma mais avançada.
              </p>

              <ul className="landing-plan-card__list">
                <li>20 GB de armazenamento</li>
                <li>Compartilhamento por link público</li>
                <li>Arquivos maiores por upload</li>
                <li>Mais capacidade para organização</li>
                <li>Uso mais profissional no dia a dia</li>
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

        <section className="landing-cta card">
          <div>
            <p className="eyebrow">Arquivapp</p>
            <h2 className="cta-title">
              Comece grátis e organize seus arquivos com mais facilidade
            </h2>
            <p className="muted">
              Crie sua conta, teste o Arquivapp em fase Beta e tenha um espaço
              simples e seguro para guardar seus arquivos na nuvem.
            </p>
          </div>

          <div className="landing-cta__actions">
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
      </PublicLayout>

      <WaitlistDialog
        open={waitlistOpen}
        onClose={() => setWaitlistOpen(false)}
      />
    </>
  );
}