import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { api } from "../services/api";

export function RegisterPage() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");

    try {
      setLoading(true);

      await api.post("/users/register", form);

      navigate("/");
    } catch (err: any) {
      setError(err?.response?.data?.error || "Erro ao criar usuário");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="auth-page">
      <div className="auth-card card">
        <h1>Criar conta</h1>
        <p className="muted">Crie um usuário para acessar o sistema.</p>

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

          {error && <p className="error-text">{error}</p>}

          <button className="primary-button full-width" disabled={loading}>
            {loading ? "Criando..." : "Criar conta"}
          </button>
        </form>

        <p className="muted" style={{ marginTop: 12 }}>
        Já possui conta? <Link to="/" className="create-user-link">Entrar</Link>
        </p>
      </div>
    </div>
  );
}