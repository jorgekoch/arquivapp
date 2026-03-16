import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { PublicLayout } from "../components/PublicLayout";
import { SeoInternalLinks } from "../components/SeoInternalLinks";


export function StoragePage() {
  return (
    <>
      <Helmet>
        <title>Armazenamento de arquivos online | Arquivapp</title>
        <meta
          name="description"
          content="Armazene arquivos online com segurança e organização. Use o Arquivapp para guardar documentos, PDFs e arquivos importantes na nuvem."
        />
      </Helmet>

      <PublicLayout>
        <section className="landing-section card">
          <div className="section-title-block">
            <h1>Armazenamento de arquivos online simples e seguro</h1>

            <p className="muted">
              Guardar arquivos importantes em diferentes dispositivos pode se
              tornar confuso. O armazenamento de arquivos online permite manter
              documentos organizados, acessíveis e protegidos em um único lugar.
            </p>
          </div>

          <div className="landing-rich-text">
            <p>
              O Arquivapp é uma plataforma criada para ajudar você a armazenar
              arquivos online com mais organização. Em vez de espalhar documentos
              em vários dispositivos, você pode centralizar tudo em um único
              espaço na nuvem.
            </p>

            <p>
              Com organização por pastas, upload simples e visualização rápida,
              o Arquivapp facilita o acesso a contratos, documentos pessoais,
              materiais de estudo e arquivos profissionais.
            </p>
          </div>
        </section>

        <section className="landing-section card">
          <div className="section-title-block">
            <h2>Por que usar armazenamento de arquivos na nuvem</h2>
          </div>

          <div className="landing-rich-text">
            <p>
              O armazenamento online permite acessar seus arquivos de qualquer
              lugar, sem depender apenas do computador ou celular onde o
              documento foi salvo originalmente.
            </p>

            <p>
              Além disso, manter arquivos organizados na nuvem ajuda a reduzir
              perdas de documentos, melhora a organização e facilita o
              compartilhamento quando necessário.
            </p>
          </div>
        </section>

        <section className="landing-section card">
          <div className="section-title-block">
            <h2>Como o Arquivapp ajuda na organização de arquivos</h2>
          </div>

          <div className="landing-feature-grid">
            <div className="landing-feature-card">
              <h3>Organização por pastas</h3>
              <p>Separe documentos em pastas e mantenha tudo fácil de encontrar.</p>
            </div>

            <div className="landing-feature-card">
              <h3>Upload rápido</h3>
              <p>Envie arquivos diretamente para sua conta em poucos segundos.</p>
            </div>

            <div className="landing-feature-card">
              <h3>Acesso fácil</h3>
              <p>Acesse seus arquivos sempre que precisar.</p>
            </div>
          </div>
        </section>

        <section className="landing-cta card">
          <div>
            <h2>Comece a armazenar seus arquivos online</h2>

            <p className="muted">
              Crie uma conta gratuita no Arquivapp e organize seus arquivos com
              mais praticidade.
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