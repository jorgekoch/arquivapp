import { createContext, useEffect, useMemo, useState } from "react";
import { api } from "../services/api";
import type { LoginData } from "../types";

type LoginResponse = {
  token: string;
};

type AuthContextType = {
  token: string | null;
  isAuthenticated: boolean;
  isAuthLoading: boolean;
  login: (data: LoginData) => Promise<void>;
  logout: () => void;
};

export const AuthContext = createContext<AuthContextType | null>(null);

type Props = {
  children: React.ReactNode;
};

export function AuthProvider({ children }: Props) {
  const [token, setToken] = useState<string | null>(null);
  const [isAuthLoading, setIsAuthLoading] = useState(true);

  useEffect(() => {
    const storedToken = localStorage.getItem("token");

    if (storedToken) {
      setToken(storedToken);
    }

    setIsAuthLoading(false);
  }, []);

  async function login(data: LoginData) {
    const response = await api.post<LoginResponse>("/auth/login", data);
    const receivedToken = response.data.token;

    localStorage.setItem("token", receivedToken);
    setToken(receivedToken);
  }

  function logout() {
    localStorage.removeItem("token");
    setToken(null);
  }

  const value = useMemo(
    () => ({
      token,
      isAuthenticated: Boolean(token),
      isAuthLoading,
      login,
      logout,
    }),
    [token, isAuthLoading]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}