import { useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { api } from "../services/api";
import { FeedbackMessage } from "../components/FeedbackMessage";
import { useAuth } from "../hooks/useAuth";

export function RegisterPage() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const { isAuthenticated, isAuthLoading } = useAuth();

  if (!isAuthLoading && isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    setSuccess("");

    try {
      setLoading(true);
      await api.post("/users/register", form);
      setSuccess("Usuário criado com sucesso. Faça login para continuar.");

      setTimeout(() => {
        navigate("/login");
      }, 1200);
    } catch (err: any) {
      setError(err?.response?.data?.error || "Erro ao criar usuário");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="auth-page">
      <div className="auth-card card">
        <p className="eyebrow">Bleize Archives</p>
        <h1>Criar conta</h1>
        <p className="muted">Crie seu acesso ao sistema.</p>

        <form className="auth-form" onSubmit={handleSubmit}>
          <input
            className="input"
            type="email"
            placeholder="E-mail"
            value={form.email}
            onChange={(e) =>
              setForm((prev) => ({ ...prev, email: e.target.value }))
            }
          />

          <input
            className="input"
            type="password"
            placeholder="Senha"
            value={form.password}
            onChange={(e) =>
              setForm((prev) => ({ ...prev, password: e.target.value }))
            }
          />
          <input
            className="input"
            type="text"
            placeholder="Nome de usuário"
            value={form.name}
            onChange={(e) =>
              setForm((prev) => ({ ...prev, name: e.target.value }))
            }
          />

          {error && <FeedbackMessage type="error" message={error} />}
          {success && <FeedbackMessage type="success" message={success} />}

          <button className="primary-button full-width" disabled={loading}>
            {loading ? "Criando..." : "Criar conta"}
          </button>
        </form>

        <p className="muted auth-link-text">
          Já possui conta?{" "}
          <Link to="/login" className="auth-link-highlight">
            Entrar
          </Link>
        </p>
      </div>
    </div>
  );
}