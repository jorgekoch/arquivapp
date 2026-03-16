import { Link } from "react-router-dom";

export function SeoInternalLinks() {
  return (
    <section className="landing-section card">
      <div className="section-title-block">
        <p className="eyebrow">Veja também</p>
        <h2 className="cta-title">Outras páginas sobre organização de arquivos</h2>
        <p className="muted">
          Explore outros conteúdos do Arquivapp sobre armazenamento na nuvem,
          organização de documentos e compartilhamento de pastas.
        </p>
      </div>

      <div className="seo-links-grid">
        <Link to="/features" className="seo-link-card">
          <h3>Recursos do Arquivapp</h3>
          <p>Conheça as principais funcionalidades da plataforma.</p>
        </Link>

        <Link
          to="/armazenamento-de-arquivos-online"
          className="seo-link-card"
        >
          <h3>Armazenamento de arquivos online</h3>
          <p>Guarde arquivos com mais organização e praticidade.</p>
        </Link>

        <Link
          to="/compartilhar-pastas-online"
          className="seo-link-card"
        >
          <h3>Compartilhar pastas online</h3>
          <p>Centralize conteúdos e facilite o acesso a arquivos.</p>
        </Link>

        <Link
          to="/armazenar-documentos-online"
          className="seo-link-card"
        >
          <h3>Armazenar documentos online</h3>
          <p>Organize contratos, PDFs e arquivos importantes na nuvem.</p>
        </Link>

        <Link
          to="/organizar-arquivos-na-nuvem"
          className="seo-link-card"
        >
          <h3>Organizar arquivos na nuvem</h3>
          <p>Mantenha documentos acessíveis e bem estruturados.</p>
        </Link>
      </div>
    </section>
  );
}