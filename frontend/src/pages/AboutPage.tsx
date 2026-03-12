import { PublicLayout } from "../components/PublicLayout";

export function AboutPage() {
  return (
    <PublicLayout>
      <section className="institutional-page">
        <header className="institutional-page__header">
          <h1 className="institutional-page__title">Sobre o Arquivapp</h1>

          <p className="institutional-page__description">
            O Arquivapp é uma plataforma criada para armazenar, organizar e
            visualizar arquivos de forma simples, rápida e segura diretamente no
            navegador.
          </p>
        </header>

        <div className="institutional-page__content">
          <h2>Nossa proposta</h2>
          <p>
            O Arquivapp foi pensado para oferecer uma experiência prática para
            quem precisa guardar documentos, materiais de estudo e arquivos
            importantes sem complicação.
          </p>

          <p>
            A plataforma reúne armazenamento, organização por pastas e
            visualização de diferentes formatos de arquivo em um só lugar, com
            foco em simplicidade e eficiência no dia a dia.
          </p>

          <h2>O que o Arquivapp busca oferecer</h2>
          <p>O produto foi desenvolvido com foco em:</p>

          <ul>
            <li>Organização clara de arquivos e pastas</li>
            <li>Envio rápido e seguro de arquivos</li>
            <li>Visualização prática diretamente no navegador</li>
            <li>Experiência simples e intuitiva</li>
          </ul>

          <h2>Evolução contínua</h2>
          <p>
            O Arquivapp está em evolução constante, com melhorias planejadas para
            ampliar a experiência do usuário, a organização dos arquivos e os
            recursos disponíveis na plataforma.
          </p>
        </div>
      </section>
    </PublicLayout>
  );
}