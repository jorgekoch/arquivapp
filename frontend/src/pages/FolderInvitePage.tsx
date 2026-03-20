import { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import toast from "react-hot-toast";
import { PublicLayout } from "../components/PublicLayout";
import { useAuth } from "../hooks/useAuth";
import { api } from "../services/api";
import axios from "axios";

type InviteData = {
  token: string;
  folderName: string;
  ownerName: string;
  invitedEmail: string;
  createdAt: string;
};

export function FolderInvitePage() {
  const { token } = useParams<{ token: string }>();
  const navigate = useNavigate();
  const { isAuthenticated, user } = useAuth();

  const [invite, setInvite] = useState<InviteData | null>(null);
  const [loading, setLoading] = useState(true);
  const [accepting, setAccepting] = useState(false);

  useEffect(() => {
    async function loadInvite() {
      try {
        const response = await axios.get<InviteData>(
          `${import.meta.env.VITE_API_URL}/folder-shares/folder-share-invites/${token}`
        );

        setInvite(response.data);

        if (token) {
          localStorage.setItem("inviteToken", token);
        }
      } catch (error: any) {
        toast.error(
          error?.response?.data?.error || "Não foi possível carregar o convite"
        );
      } finally {
        setLoading(false);
      }
    }

    if (token) {
      loadInvite();
    } else {
      setLoading(false);
    }
  }, [token]);

  async function handleAcceptInvite() {
    try {
      setAccepting(true);
      await api.post(`/folder-shares/folder-share-invites/${token}/accept`);

      localStorage.removeItem("inviteToken");

      toast.success("Convite aceito com sucesso.");
      navigate("/dashboard", {
        state: { fromInvite: true },
      });
    } catch (error: any) {
      toast.error(
        error?.response?.data?.error || "Não foi possível aceitar o convite"
      );
    } finally {
      setAccepting(false);
    }
  }

  return (
    <>
      <Helmet>
        <title>Convite para pasta | Arquivapp</title>
        <meta
          name="description"
          content="Você recebeu um convite para acessar uma pasta compartilhada no Arquivapp."
        />
      </Helmet>

      <PublicLayout>
        <section className="landing-section card">
          {loading ? (
            <div className="section-title-block">
              <h1 className="cta-title">Carregando convite...</h1>
            </div>
          ) : !invite ? (
            <div className="section-title-block">
              <h1 className="cta-title">Convite não encontrado</h1>
              <p className="muted">
                Este convite pode ser inválido, ter expirado ou já ter sido
                utilizado.
              </p>
            </div>
          ) : (
            <>
              <div className="section-title-block">
                <p className="eyebrow">Convite para pasta</p>
                <h1 className="cta-title">
                  {invite.ownerName} compartilhou uma pasta com você
                </h1>
                <p className="muted">
                  Pasta compartilhada: <strong>{invite.folderName}</strong>
                </p>
              </div>

              {!isAuthenticated ? (
                <div className="landing-cta__actions">
                  <Link
                    to={`/register?invite=${token}`}
                    className="primary-button"
                  >
                    Criar conta para acessar
                  </Link>

                  <Link
                    to={`/login?invite=${token}`}
                    className="ghost-button"
                  >
                    Já tenho conta
                  </Link>
                </div>
              ) : (
                <div className="landing-rich-text">
                  <p>
                    Você está logado como <strong>{user?.email}</strong>.
                  </p>

                  <div className="landing-cta__actions">
                    <button
                      className="primary-button"
                      onClick={handleAcceptInvite}
                      disabled={accepting}
                    >
                      {accepting ? "Aceitando..." : "Aceitar convite"}
                    </button>
                  </div>
                </div>
              )}
            </>
          )}
        </section>
      </PublicLayout>
    </>
  );
}