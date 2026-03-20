import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import axios from "axios";
import { PublicLayout } from "../components/PublicLayout";

export function ConfirmEmailPage() {
  const { token } = useParams<{ token: string }>();

  const [loading, setLoading] = useState(true);
  const [success, setSuccess] = useState(false);
  const [message, setMessage] = useState("Confirmando seu e-mail...");

  useEffect(() => {
    async function confirmEmail() {
      if (!token) {
        setLoading(false);
        setMessage("Token de confirmação inválido.");
        return;
      }

      const requestKey = `Arquivapp:emailConfirmation:${token}`;
      const alreadyRequested = sessionStorage.getItem(requestKey);

      if (alreadyRequested) {
        setLoading(false);
        setSuccess(true);
        setMessage("Seu e-mail já foi confirmado nesta sessão.");
        return;
      }

      try {
        sessionStorage.setItem(requestKey, "true");

        await axios.get(
          `${import.meta.env.VITE_API_URL}/email-verification/${token}`
        );

        setSuccess(true);
        setMessage("Seu e-mail foi confirmado com sucesso.");
      } catch (error: any) {
        sessionStorage.removeItem(requestKey);

        setSuccess(false);
        setMessage(
          error?.response?.data?.error ||
            "Não foi possível confirmar seu e-mail."
        );
      } finally {
        setLoading(false);
      }
    }

    confirmEmail();
  }, [token]);

  return (
    <>
      <Helmet>
        <title>Confirmar e-mail | Arquivapp</title>
      </Helmet>

      <PublicLayout>
        <section className="landing-section card">
          <div className="section-title-block">
            <p className="eyebrow">Confirmação de e-mail</p>
            <h1 className="cta-title">
              {loading
                ? "Confirmando seu cadastro..."
                : success
                ? "E-mail confirmado"
                : "Não foi possível confirmar"}
            </h1>
            <p className="muted">{message}</p>
          </div>

          {!loading && success && (
            <div className="landing-cta__actions">
              <Link to="/login" className="primary-button">
                Entrar na conta
              </Link>
            </div>
          )}

          {!loading && !success && (
            <div className="landing-cta__actions">
              <Link to="/register" className="ghost-button">
                Criar conta novamente
              </Link>
            </div>
          )}
        </section>
      </PublicLayout>
    </>
  );
}