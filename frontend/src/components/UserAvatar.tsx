import { User } from "lucide-react";

type Props = {
  name?: string;
  avatarUrl?: string | null;
  size?: number;
};

export function UserAvatar({ name, avatarUrl, size = 40 }: Props) {
  if (avatarUrl) {
    return (
      <img
        src={avatarUrl}
        alt={name || "Usuário"}
        className="user-avatar-image"
        style={{ width: size, height: size }}
      />
    );
  }

  return (
    <div
      className="user-avatar-fallback"
      style={{ width: size, height: size }}
      aria-label={name || "Usuário"}
    >
      <User size={size * 0.55} />
    </div>
  );
}