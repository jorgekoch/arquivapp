import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { PublicLayout } from "../components/PublicLayout";
import { SeoInternalLinks } from "../components/SeoInternalLinks";

export function ShareFoldersPage() {
  return (
    <>
      <Helmet>
        <title>Compartilhar pastas online | Arquivapp</title>
        <meta
          name="description"
          content="Compartilhe pastas online com praticidade e segurança. Organize arquivos, centralize documentos e facilite o acesso com o Arquivapp."
        />
        <meta
          property="og:title"
          content="Compartilhar pastas online | Arquivapp"
        />
        <meta
          property="og:description"
          content="Organize arquivos e compartilhe pastas online com mais praticidade usando o Arquivapp."
        />
        <meta
          property="og:url"
          content="https://arquivapp.com.br/compartilhar-pastas-online"
        />
      </Helmet>

      <PublicLayout>
        <section className="landing-section landing-section--hero card">
          <div className="section-title-block">
            <p className="eyebrow">Compartilhamento online</p>
            <h1 className="cta-title">
              Compartilhar pastas online com mais organização e praticidade
            </h1>
            <p className="muted">
              Compartilhar arquivos de forma solta pode gerar confusão. Com o
              Arquivapp, você organiza conteúdos em pastas e facilita o acesso
              para outras pessoas de forma mais clara.
            </p>
          </div>

          <div className="landing-hero__actions">
            <Link to="/register" className="primary-button">
              Criar conta grátis
            </Link>

            <Link to="/features" className="ghost-button">
              Ver recursos
            </Link>
          </div>
        </section>

        <section className="landing-section card">
          <div className="section-title-block">
            <h2>Por que compartilhar pastas online</h2>
          </div>

          <div className="landing-rich-text">
            <p>
              Quando documentos ficam espalhados em mensagens, anexos ou links
              separados, o trabalho fica mais confuso. Compartilhar pastas online
              ajuda a manter tudo centralizado em um único lugar.
            </p>

            <p>
              Isso facilita o acesso a arquivos importantes, reduz a bagunça e
              melhora a organização para uso pessoal, estudos ou rotina
              profissional.
            </p>
          </div>
        </section>

        <section className="landing-section card">
          <div className="section-title-block">
            <h2>Como o Arquivapp ajuda</h2>
          </div>

          <div className="landing-feature-grid">
            <article className="landing-feature-card">
              <h3>Pastas organizadas</h3>
              <p>
                Mantenha documentos, PDFs, imagens e materiais agrupados por tema,
                cliente ou projeto.
              </p>
            </article>

            <article className="landing-feature-card">
              <h3>Mais clareza</h3>
              <p>
                Em vez de mandar vários arquivos soltos, você compartilha uma
                estrutura mais organizada.
              </p>
            </article>

            <article className="landing-feature-card">
              <h3>Acesso facilitado</h3>
              <p>
                Os arquivos ficam centralizados, o que torna a consulta e o uso
                mais simples no dia a dia.
              </p>
            </article>
          </div>
        </section>

        <section className="landing-section card">
          <div className="section-title-block">
            <h2>Quando isso é útil</h2>
          </div>

          <div className="landing-feature-grid">
            <article className="landing-feature-card">
              <h3>Trabalho e clientes</h3>
              <p>
                Compartilhe materiais, contratos, documentos e arquivos de forma
                mais organizada.
              </p>
            </article>

            <article className="landing-feature-card">
              <h3>Estudos</h3>
              <p>
                Centralize apostilas, exercícios e arquivos por disciplina ou tema.
              </p>
            </article>

            <article className="landing-feature-card">
              <h3>Uso pessoal</h3>
              <p>
                Guarde e organize documentos importantes em um único espaço online.
              </p>
            </article>
          </div>
        </section>

        <section className="landing-cta card">
          <div>
            <h2>Comece a organizar e compartilhar melhor</h2>
            <p className="muted">
              Crie sua conta no Arquivapp e mantenha suas pastas e arquivos mais organizados.
            </p>
          </div>

          <div className="landing-cta__actions">
            <Link to="/register" className="primary-button">
              Criar conta grátis
            </Link>
          </div>
        </section>
        <SeoInternalLinks />
      </PublicLayout>
    </>
  );
}