import { PublicLayout } from "../components/PublicLayout";

export function PrivacyPage() {
  return (
    <PublicLayout>
      <section className="institutional-page">
        <header className="institutional-page__header">
          <h1 className="institutional-page__title">Política de Privacidade</h1>

          <p className="institutional-page__description">
            Esta política explica como o Arquivapp coleta, utiliza e protege as
            informações dos usuários que utilizam a plataforma.
          </p>
        </header>

        <div className="institutional-page__content">
          <h2>Introdução</h2>
          <p>
            Esta Política de Privacidade descreve como o Arquivapp coleta,
            utiliza e protege as informações dos usuários que utilizam a
            plataforma.
          </p>
          <p>
            Ao utilizar o Arquivapp, você concorda com as práticas descritas
            nesta política.
          </p>

          <h2>Dados coletados</h2>
          <p>
            Para oferecer o funcionamento da plataforma, o Arquivapp pode
            coletar algumas informações básicas fornecidas pelos usuários.
          </p>

          <ul>
            <li>Nome ou nome de usuário</li>
            <li>Endereço de e-mail</li>
            <li>Senha criptografada</li>
            <li>Informações relacionadas à conta</li>
            <li>Arquivos enviados para armazenamento na plataforma</li>
          </ul>

          <p>
            Esses dados são utilizados exclusivamente para permitir o
            funcionamento do serviço e melhorar a experiência do usuário.
          </p>

          <h2>Uso das informações</h2>
          <p>As informações coletadas podem ser utilizadas para:</p>

          <ul>
            <li>Criar e gerenciar contas de usuário</li>
            <li>Permitir o armazenamento e organização de arquivos</li>
            <li>Autenticar o acesso à plataforma</li>
            <li>Enviar comunicações relacionadas à conta, como recuperação de senha</li>
            <li>Melhorar o funcionamento e a segurança do serviço</li>
          </ul>

          <p>
            O Arquivapp não vende dados pessoais nem compartilha informações com
            terceiros para fins comerciais.
          </p>

          <h2>Armazenamento de dados</h2>
          <p>
            Os dados do usuário são armazenados utilizando serviços de
            infraestrutura confiáveis.
          </p>

          <p>Atualmente o Arquivapp utiliza serviços de terceiros como:</p>

          <ul>
            <li>Neon para armazenamento do banco de dados</li>
            <li>Cloudflare R2 para armazenamento de arquivos</li>
            <li>Stripe para processamento de pagamentos</li>
            <li>Resend para envio de e-mails transacionais</li>
          </ul>

          <p>
            Esses serviços possuem suas próprias políticas de privacidade e
            práticas de segurança.
          </p>

          <h2>Segurança</h2>
          <p>
            O Arquivapp adota medidas técnicas para proteger os dados dos
            usuários, incluindo criptografia de senhas, autenticação segura e
            controle de acesso às contas.
          </p>

          <p>
            Apesar dos esforços para manter a segurança da plataforma, nenhum
            sistema online pode garantir proteção absoluta contra falhas ou
            acessos não autorizados.
          </p>

          <h2>Conteúdo armazenado</h2>
          <p>
            Os arquivos enviados para a plataforma são de responsabilidade
            exclusiva do usuário.
          </p>

          <p>
            O Arquivapp não realiza análise prévia do conteúdo armazenado,
            exceto quando necessário para manter a integridade e segurança da
            plataforma.
          </p>

          <h2>Cookies e tecnologias semelhantes</h2>
          <p>
            O Arquivapp pode utilizar cookies ou tecnologias similares para
            manter sessões de autenticação e melhorar a experiência de
            navegação.
          </p>

          <p>
            Esses mecanismos são utilizados apenas para o funcionamento técnico
            da plataforma.
          </p>

          <h2>Direitos do usuário</h2>
          <p>
            O usuário pode solicitar a exclusão de sua conta ou de seus dados
            pessoais entrando em contato por meio dos canais oficiais da
            plataforma.
          </p>

          <h2>Alterações nesta política</h2>
          <p>
            Esta Política de Privacidade pode ser atualizada periodicamente para
            refletir mudanças na plataforma ou em requisitos legais.
          </p>

          <p>
            Recomendamos revisar esta página ocasionalmente para se manter
            informado sobre eventuais alterações.
          </p>

          <h2>Contato</h2>
          <p>
            Caso tenha dúvidas sobre esta Política de Privacidade ou sobre o
            tratamento de dados na plataforma, entre em contato por meio da
            página de contato do Arquivapp.
          </p>
        </div>
      </section>
    </PublicLayout>
  );
}