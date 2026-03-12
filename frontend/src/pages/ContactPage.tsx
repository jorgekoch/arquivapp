import { PublicLayout } from "../components/PublicLayout";

export function ContactPage() {
  return (
    <PublicLayout>
      <section className="institutional-page">
        <header className="institutional-page__header">
          <h1 className="institutional-page__title">Contato</h1>

          <p className="institutional-page__description">
            Se tiver dúvidas, sugestões ou precisar de suporte, entre em contato
            com o Arquivapp.
          </p>
        </header>

        <div className="institutional-page__content">
          <h2>Fale conosco</h2>
          <p>
            Para assuntos relacionados à plataforma, suporte, dúvidas gerais ou
            solicitações, você pode entrar em contato por e-mail.
          </p>

          <p>
            E-mail:{" "}
            <a className="institutional-link" href="mailto:contato@arquivapp.com.br">
              contato@arquivapp.com.br
            </a>
          </p>

          <h2>Suporte e atendimento</h2>
          <p>
            Sempre que possível, as solicitações serão analisadas e respondidas
            conforme a disponibilidade do atendimento.
          </p>

          <p>
            Você também pode utilizar esta página para enviar sugestões de
            melhoria para o Arquivapp.
          </p>
        </div>
      </section>
    </PublicLayout>
  );
}