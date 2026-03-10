import { useMemo, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import toast from "react-hot-toast";
import { api } from "../services/api";
import { BrandLogo } from "../components/BrandLogo";

type ResetPasswordResponse = {
  message: string;
};

export function ResetPasswordPage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const token = useMemo(() => searchParams.get("token") || "", [searchParams]);

  const [form, setForm] = useState({
    password: "",
    confirmPassword: "",
  });
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    try {
      setLoading(true);

      const response = await api.post<ResetPasswordResponse>(
        "/auth/reset-password",
        {
          token,
          password: form.password,
          confirmPassword: form.confirmPassword,
        }
      );

      toast.success(response.data.message);
      navigate("/login");
    } catch (err: any) {
      toast.error(
        err?.response?.data?.error || "Não foi possível redefinir a senha."
      );
    } finally {
      setLoading(false);
    }
  }

  if (!token) {
    return (
      <div className="auth-page">
        <div className="auth-shell">
          <section className="auth-panel auth-panel--brand">
            <div className="auth-brand-content">
              <BrandLogo variant="public" />

              <p className="auth-eyebrow">Arquivapp</p>

              <h1 className="auth-brand-title">
                Recupere o acesso à sua conta com segurança.
              </h1>

              <p className="auth-brand-description">
                Se o link estiver inválido ou incompleto, você pode solicitar um
                novo link de redefinição em poucos segundos.
              </p>
            </div>
          </section>

          <section className="auth-panel auth-panel--form">
            <div className="auth-card card">
              <div className="auth-header">
                <BrandLogo variant="dashboard" />
              </div>

              <h1 className="auth-title">Link inválido</h1>
              <p className="muted auth-subtitle">
                O link de redefinição é inválido ou está incompleto.
              </p>

              <p className="muted auth-link-text">
                Solicite um novo link em{" "}
                <Link to="/forgot-password" className="auth-link-highlight">
                  Esqueci minha senha
                </Link>
              </p>

              <Link to="/" className="auth-back-link">
                ← Voltar para a página inicial
              </Link>
            </div>
          </section>
        </div>
      </div>
    );
  }

  return (
    <div className="auth-page">
      <div className="auth-shell">
        <section className="auth-panel auth-panel--brand">
          <div className="auth-brand-content">
            <BrandLogo variant="public" />

            <p className="auth-eyebrow">Arquivapp</p>

            <h1 className="auth-brand-title">
              Defina uma nova senha e volte a acessar seus arquivos.
            </h1>

            <p className="auth-brand-description">
              Escolha uma nova senha para continuar usando sua conta com
              praticidade e segurança.
            </p>
          </div>
        </section>

        <section className="auth-panel auth-panel--form">
          <div className="auth-card card">
            <div className="auth-header">
              <BrandLogo variant="dashboard" />
            </div>

            <h1 className="auth-title">Nova senha</h1>
            <p className="muted auth-subtitle">
              Digite sua nova senha para acessar o sistema.
            </p>

            <form className="auth-form" onSubmit={handleSubmit}>
              <input
                className="input"
                type="password"
                placeholder="Nova senha"
                value={form.password}
                onChange={(e) =>
                  setForm((prev) => ({ ...prev, password: e.target.value }))
                }
                required
              />

              <input
                className="input"
                type="password"
                placeholder="Confirmar nova senha"
                value={form.confirmPassword}
                onChange={(e) =>
                  setForm((prev) => ({
                    ...prev,
                    confirmPassword: e.target.value,
                  }))
                }
                required
              />

              <button className="primary-button full-width" disabled={loading}>
                {loading ? "Salvando..." : "Salvar nova senha"}
              </button>
            </form>

            <p className="muted auth-link-text">
              Lembrou sua senha?{" "}
              <Link to="/login" className="auth-link-highlight">
                Entrar
              </Link>
            </p>

            <Link to="/" className="auth-back-link">
              ← Voltar para a página inicial
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}