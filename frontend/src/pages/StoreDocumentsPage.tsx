import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { PublicLayout } from "../components/PublicLayout";
import { SeoInternalLinks } from "../components/SeoInternalLinks";

export function StoreDocumentsPage() {
  return (
    <>
      <Helmet>
        <title>Armazenar documentos online | Arquivapp</title>
        <meta
          name="description"
          content="Armazene documentos online com mais segurança e organização. Guarde PDFs, contratos e arquivos importantes usando o Arquivapp."
        />
        <meta
          property="og:title"
          content="Armazenar documentos online | Arquivapp"
        />
        <meta
          property="og:description"
          content="Guarde documentos online de forma simples, organizada e segura com o Arquivapp."
        />
        <meta
          property="og:url"
          content="https://arquivapp.com.br/armazenar-documentos-online"
        />
      </Helmet>

      <PublicLayout>
        <section className="landing-section landing-section--hero card">
          <div className="section-title-block">
            <p className="eyebrow">Documentos online</p>
            <h1 className="cta-title">
              Armazenar documentos online com mais segurança e praticidade
            </h1>
            <p className="muted">
              Guardar documentos importantes em vários lugares diferentes torna o
              acesso mais difícil. O Arquivapp ajuda você a centralizar tudo em
              um único espaço organizado.
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
            <h2>Quais documentos você pode organizar</h2>
          </div>

          <div className="landing-feature-grid">
            <article className="landing-feature-card">
              <h3>Contratos</h3>
              <p>
                Mantenha contratos organizados e fáceis de consultar quando precisar.
              </p>
            </article>

            <article className="landing-feature-card">
              <h3>Comprovantes</h3>
              <p>
                Guarde comprovantes, recibos e registros importantes com mais clareza.
              </p>
            </article>

            <article className="landing-feature-card">
              <h3>PDFs e documentos pessoais</h3>
              <p>
                Tenha seus arquivos importantes em um só lugar, com acesso facilitado.
              </p>
            </article>
          </div>
        </section>

        <section className="landing-section card">
          <div className="section-title-block">
            <h2>Benefícios de armazenar documentos na nuvem</h2>
          </div>

          <div className="landing-rich-text">
            <p>
              Armazenar documentos online ajuda a reduzir a desorganização e
              melhora o acesso aos arquivos. Em vez de procurar em várias pastas
              ou dispositivos, você centraliza tudo.
            </p>

            <p>
              Com uma estrutura organizada, fica mais fácil consultar, visualizar
              e compartilhar documentos quando necessário.
            </p>
          </div>
        </section>

        <section className="landing-section card">
          <div className="section-title-block">
            <h2>Como o Arquivapp facilita a rotina</h2>
          </div>

          <div className="landing-feature-grid">
            <article className="landing-feature-card">
              <h3>Pastas personalizadas</h3>
              <p>
                Organize documentos por categoria, cliente, assunto ou período.
              </p>
            </article>

            <article className="landing-feature-card">
              <h3>Upload prático</h3>
              <p>
                Envie arquivos rapidamente e acompanhe tudo de forma simples.
              </p>
            </article>

            <article className="landing-feature-card">
              <h3>Visualização rápida</h3>
              <p>
                Consulte documentos sem complicação diretamente pela plataforma.
              </p>
            </article>
          </div>
        </section>

        <section className="landing-cta card">
          <div>
            <h2>Guarde seus documentos com mais organização</h2>
            <p className="muted">
              Crie sua conta e comece a armazenar documentos online com o Arquivapp.
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