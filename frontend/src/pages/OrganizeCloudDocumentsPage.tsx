import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { PublicLayout } from "../components/PublicLayout";
import { SeoInternalLinks } from "../components/SeoInternalLinks";

export function OrganizeCloudDocumentsPage() {
  return (
    <>
      <Helmet>
        <title>Organizar documentos na nuvem | Arquivapp</title>
        <meta
          name="description"
          content="Organize documentos na nuvem com mais facilidade. Crie pastas, mantenha arquivos acessíveis e reduza a bagunça usando o Arquivapp."
        />
        <meta
          property="og:title"
          content="Organizar documentos na nuvem | Arquivapp"
        />
        <meta
          property="og:description"
          content="Centralize documentos e organize arquivos na nuvem com mais praticidade usando o Arquivapp."
        />
        <meta
          property="og:url"
          content="https://arquivapp.com.br/organizar-arquivos-na-nuvem"
        />
      </Helmet>

      <PublicLayout>
        <section className="landing-section landing-section--hero card">
          <div className="section-title-block">
            <p className="eyebrow">Organização na nuvem</p>
            <h1 className="cta-title">
              Organizar documentos na nuvem com mais clareza e praticidade
            </h1>
            <p className="muted">
              Arquivos espalhados em várias pastas e dispositivos dificultam a
              rotina. O Arquivapp ajuda a manter documentos organizados em um
              só lugar.
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
            <h2>Por que organizar arquivos na nuvem</h2>
          </div>

          <div className="landing-rich-text">
            <p>
              Quando os arquivos ficam desorganizados, você perde tempo
              procurando documentos e aumenta o risco de esquecer materiais
              importantes.
            </p>

            <p>
              Organizar documentos na nuvem ajuda a manter tudo mais acessível,
              centralizado e estruturado para uso pessoal, acadêmico ou profissional.
            </p>
          </div>
        </section>

        <section className="landing-section card">
          <div className="section-title-block">
            <h2>O que você pode fazer no Arquivapp</h2>
          </div>

          <div className="landing-feature-grid">
            <article className="landing-feature-card">
              <h3>Criar pastas</h3>
              <p>
                Separe arquivos por tema, cliente, disciplina ou projeto.
              </p>
            </article>

            <article className="landing-feature-card">
              <h3>Guardar documentos importantes</h3>
              <p>
                Tenha PDFs, contratos, comprovantes e outros materiais organizados.
              </p>
            </article>

            <article className="landing-feature-card">
              <h3>Achar arquivos com mais facilidade</h3>
              <p>
                Reduza a bagunça e tenha uma estrutura mais simples de consultar.
              </p>
            </article>
          </div>
        </section>

        <section className="landing-section card">
          <div className="section-title-block">
            <h2>Quem pode se beneficiar</h2>
          </div>

          <div className="landing-feature-grid">
            <article className="landing-feature-card">
              <h3>Estudantes</h3>
              <p>
                Organize apostilas, exercícios, PDFs e materiais por disciplina.
              </p>
            </article>

            <article className="landing-feature-card">
              <h3>Profissionais</h3>
              <p>
                Centralize documentos de trabalho e mantenha arquivos bem separados.
              </p>
            </article>

            <article className="landing-feature-card">
              <h3>Uso pessoal</h3>
              <p>
                Guarde documentos importantes e mantenha tudo em um espaço mais claro.
              </p>
            </article>
          </div>
        </section>

        <section className="landing-cta card">
          <div>
            <h2>Comece a organizar seus arquivos na nuvem</h2>
            <p className="muted">
              Crie sua conta no Arquivapp e tenha mais clareza na organização dos seus documentos.
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