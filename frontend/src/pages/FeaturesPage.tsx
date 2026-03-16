import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { PublicLayout } from "../components/PublicLayout";
import { SeoInternalLinks } from "../components/SeoInternalLinks";

export function FeaturesPage() {
  return (
    <>
      <Helmet>
        <title>Recursos do Arquivapp | Organização e compartilhamento de arquivos</title>
        <meta
          name="description"
          content="Conheça os principais recursos do Arquivapp: organização de arquivos, compartilhamento de pastas, links públicos, armazenamento seguro e mais."
        />
        <meta
          property="og:title"
          content="Recursos do Arquivapp"
        />
        <meta
          property="og:description"
          content="Veja tudo o que você pode fazer com o Arquivapp para organizar e compartilhar arquivos com segurança."
        />
        <meta property="og:url" content="https://arquivapp.com.br/features" />
      </Helmet>

      <PublicLayout>
        <section className="landing-section landing-section--hero card">
          <div className="section-title-block">
            <p className="eyebrow">Recursos do Arquivapp</p>
            <h1 className="cta-title">
              Organize, proteja e compartilhe seus arquivos com mais facilidade
            </h1>
            <p className="muted">
              O Arquivapp foi criado para ajudar você a centralizar arquivos,
              organizar pastas, compartilhar conteúdo e acessar documentos com
              praticidade em qualquer lugar.
            </p>
          </div>

          <div className="landing-hero__actions">
            <Link to="/register" className="primary-button">
              Criar conta grátis
            </Link>

            <Link to="/contact" className="ghost-button">
              Falar com a equipe
            </Link>
          </div>
        </section>

        <section className="landing-section card">
          <div className="section-title-block">
            <h2>Principais funcionalidades do Arquivapp</h2>
            <p className="muted">
              Tudo o que você precisa para manter seus arquivos organizados e acessíveis.
            </p>
          </div>

          <div className="landing-feature-grid">
            <article className="landing-feature-card">
              <h3>Organização por pastas</h3>
              <p>
                Crie e organize pastas para separar documentos, imagens,
                contratos, materiais de estudo, arquivos de trabalho e muito mais.
              </p>
            </article>

            <article className="landing-feature-card">
              <h3>Upload de diferentes formatos</h3>
              <p>
                Envie PDFs, imagens, áudios, vídeos, arquivos compactados e
                diversos outros formatos diretamente pela plataforma.
              </p>
            </article>

            <article className="landing-feature-card">
              <h3>Compartilhamento de arquivos</h3>
              <p>
                Gere links para compartilhar arquivos com praticidade e permitir
                o acesso rápido a documentos importantes.
              </p>
            </article>

            <article className="landing-feature-card">
              <h3>Compartilhamento de pastas</h3>
              <p>
                Compartilhe pastas com outros usuários e facilite a colaboração
                e a troca de materiais dentro do Arquivapp.
              </p>
            </article>

            <article className="landing-feature-card">
              <h3>Visualização rápida</h3>
              <p>
                Abra e visualize arquivos diretamente na plataforma, sem precisar
                baixar tudo antes.
              </p>
            </article>

            <article className="landing-feature-card">
              <h3>Armazenamento seguro</h3>
              <p>
                Seus arquivos ficam armazenados com mais segurança e podem ser
                acessados de forma organizada sempre que você precisar.
              </p>
            </article>
          </div>
        </section>

        <section className="landing-section card">
          <div className="section-title-block">
            <h2>Para quem o Arquivapp é ideal</h2>
          </div>

          <div className="landing-feature-grid">
            <article className="landing-feature-card">
              <h3>Profissionais autônomos</h3>
              <p>
                Organize contratos, documentos, comprovantes, materiais de clientes
                e arquivos de trabalho em um só lugar.
              </p>
            </article>

            <article className="landing-feature-card">
              <h3>Pequenos negócios</h3>
              <p>
                Centralize arquivos da equipe, compartilhe documentos e mantenha
                processos mais organizados.
              </p>
            </article>

            <article className="landing-feature-card">
              <h3>Estudantes e professores</h3>
              <p>
                Guarde apostilas, exercícios, materiais de apoio e conteúdos
                importantes com mais praticidade.
              </p>
            </article>
          </div>
        </section>

        <section className="landing-section card">
          <div className="section-title-block">
            <h2>Por que usar o Arquivapp</h2>
          </div>

          <div className="landing-rich-text">
            <p>
              O Arquivapp ajuda você a manter seus arquivos organizados,
              acessíveis e prontos para compartilhamento. Em vez de depender de
              várias ferramentas diferentes, você concentra tudo em uma única
              plataforma com foco em organização, praticidade e controle.
            </p>

            <p>
              Se você procura uma forma simples de armazenar arquivos online,
              compartilhar documentos ou gerenciar pastas na nuvem, o Arquivapp
              oferece uma solução prática e fácil de usar.
            </p>
          </div>
        </section>

        <section className="landing-cta card">
          <div>
            <p className="eyebrow">Comece agora</p>
            <h2 className="cta-title">Teste o Arquivapp gratuitamente</h2>
            <p className="muted">
              Crie sua conta e comece a organizar seus arquivos com mais praticidade.
            </p>
          </div>

          <div className="landing-cta__actions">
            <Link to="/register" className="primary-button">
              Criar conta grátis
            </Link>

            <Link to="/" className="ghost-button">
              Voltar ao início
            </Link>
          </div>
        </section>
        <SeoInternalLinks />
      </PublicLayout>
    </>
  );
}