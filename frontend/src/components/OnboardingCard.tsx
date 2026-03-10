type Props = {
  open: boolean;
  onCreateFolderClick: () => void;
  onDismiss: () => void;
};

export function OnboardingCard({
  open,
  onCreateFolderClick,
  onDismiss,
}: Props) {
  if (!open) return null;

  return (
    <section className="onboarding-card card">
      <div className="onboarding-card__content">
        <p className="eyebrow">Bem-vindo ao Arquivapp</p>
        <h2 className="onboarding-card__title">Comece em poucos passos 👋</h2>
        <p className="muted onboarding-card__description">
          Organize sua biblioteca digital criando sua primeira pasta e enviando
          seu primeiro arquivo.
        </p>

        <div className="onboarding-card__steps">
          <div className="onboarding-step">
            <span className="onboarding-step__icon">📁</span>
            <div>
              <strong>Crie sua primeira pasta</strong>
              <p className="muted">
                Separe seus arquivos por tema, projeto ou categoria.
              </p>
            </div>
          </div>

          <div className="onboarding-step">
            <span className="onboarding-step__icon">📤</span>
            <div>
              <strong>Envie seu primeiro arquivo</strong>
              <p className="muted">
                Faça upload e mantenha tudo acessível em um só lugar.
              </p>
            </div>
          </div>

          <div className="onboarding-step">
            <span className="onboarding-step__icon">🔎</span>
            <div>
              <strong>Encontre tudo com facilidade</strong>
              <p className="muted">
                Use suas pastas para manter seus arquivos sempre organizados.
              </p>
            </div>
          </div>
        </div>

        <div className="onboarding-card__actions">
          <button className="primary-button" onClick={onCreateFolderClick}>
            Criar primeira pasta
          </button>

          <button className="ghost-button" onClick={onDismiss}>
            Agora não
          </button>
        </div>
      </div>
    </section>
  );
}