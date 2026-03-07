import { Menu, UserCircle2, LogOut } from "lucide-react";
import { useState } from "react";
import { UserAvatar } from "./UserAvatar";
import type { Profile } from "../types";

type Props = {
  profile: Profile | null;
  onProfileClick: () => void;
  onLogout: () => void;
};

export function UserMenu({ profile, onProfileClick, onLogout }: Props) {
  const [open, setOpen] = useState(false);

  return (
    <div className="user-menu-wrapper">
      <button
        className="user-menu-trigger"
        onClick={() => setOpen((prev) => !prev)}
      >
        <UserAvatar name={profile?.name} avatarUrl={profile?.avatarUrl} size={40} />
        <Menu size={18} />
      </button>

      {open && (
        <div className="user-menu-dropdown">
          <button
            className="user-menu-item"
            onClick={() => {
              setOpen(false);
              onProfileClick();
            }}
          >
            <UserCircle2 size={16} />
            <span>Perfil</span>
          </button>

          <button
            className="user-menu-item danger-item"
            onClick={() => {
              setOpen(false);
              onLogout();
            }}
          >
            <LogOut size={16} />
            <span>Sair</span>
          </button>
        </div>
      )}
    </div>
  );
}