import { PublicLayout } from "../components/PublicLayout";

export function TermsPage() {
  return (
    <PublicLayout>
      <section className="institutional-page">
        <header className="institutional-page__header">
          <h1 className="institutional-page__title">Termos de Uso</h1>

          <p className="institutional-page__description">
            Estes termos definem as regras e condições para utilização da
            plataforma Arquivapp.
          </p>
        </header>

        <div className="institutional-page__content">
          <h2>Aceitação dos termos</h2>
          <p>
            Ao acessar ou utilizar o Arquivapp, você concorda com estes Termos
            de Uso e com as políticas aplicáveis à plataforma.
          </p>

          <p>
            Caso não concorde com qualquer parte destes termos, recomendamos que
            não utilize o serviço.
          </p>

          <h2>Uso da plataforma</h2>
          <p>
            O Arquivapp é uma plataforma online destinada ao armazenamento,
            organização e visualização de arquivos diretamente no navegador.
          </p>

          <p>
            O usuário concorda em utilizar a plataforma de forma responsável e
            em conformidade com a legislação aplicável.
          </p>

          <h2>Conta do usuário</h2>
          <p>
            Para utilizar determinadas funcionalidades da plataforma, pode ser
            necessário criar uma conta.
          </p>

          <p>
            O usuário é responsável por manter a confidencialidade de suas
            credenciais de acesso e por todas as atividades realizadas em sua
            conta.
          </p>

          <h2>Conteúdo armazenado</h2>
          <p>
            Os arquivos armazenados na plataforma são de responsabilidade
            exclusiva do usuário.
          </p>

          <p>
            O usuário declara possuir os direitos necessários sobre os arquivos
            enviados e concorda em não utilizar a plataforma para armazenar
            conteúdo ilegal ou que viole direitos de terceiros.
          </p>

          <h2>Limitações do serviço</h2>
          <p>
            O Arquivapp pode estabelecer limites técnicos relacionados a
            armazenamento, tamanho de arquivos ou funcionalidades disponíveis em
            cada plano.
          </p>

          <p>
            Essas limitações podem ser alteradas ao longo do tempo para melhorar
            o funcionamento da plataforma.
          </p>

          <h2>Disponibilidade</h2>
          <p>
            Embora sejam adotadas medidas para manter a estabilidade e segurança
            do serviço, o Arquivapp não garante disponibilidade contínua ou
            ininterrupta da plataforma.
          </p>

          <h2>Alterações nos termos</h2>
          <p>
            Estes Termos de Uso podem ser atualizados periodicamente para
            refletir mudanças na plataforma ou em requisitos legais.
          </p>

          <p>
            A continuidade do uso da plataforma após alterações constitui
            aceitação das novas condições.
          </p>

          <h2>Contato</h2>
          <p>
            Caso tenha dúvidas sobre estes Termos de Uso, entre em contato por
            meio da página de contato do Arquivapp.
          </p>
        </div>
      </section>
    </PublicLayout>
  );
}