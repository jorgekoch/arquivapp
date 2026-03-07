import type { Profile } from "../types";
import { UserMenu } from "./UserMenu";

type Props = {
  children: React.ReactNode;
  profile: Profile | null;
  onProfileClick: () => void;
  onLogout: () => void;
};

export function Layout({ children, profile, onProfileClick, onLogout }: Props) {
  return (
    <div className="app-shell">
      <header className="topbar">
        <div>
          <p className="eyebrow">Bleize Archives</p>
          <h1 className="brand">Bleize Archives</h1>
          <p className="subtitle">
            {profile ? `Bem-vindo, ${profile.name}` : "Seu acervo privado de arquivos e materiais."}
          </p>
        </div>

        <UserMenu
          profile={profile}
          onProfileClick={onProfileClick}
          onLogout={onLogout}
        />
      </header>

      <main className="main-content">{children}</main>
    </div>
  );
}