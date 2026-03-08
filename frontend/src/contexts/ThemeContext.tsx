import { createContext, useEffect, useMemo, useState } from "react";

type Theme = "light" | "dark";

type ThemeContextType = {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;
};

export const ThemeContext = createContext<ThemeContextType | null>(null);

const THEME_STORAGE_KEY = "Arquivapp:theme";

type Props = {
  children: React.ReactNode;
};

export function ThemeProvider({ children }: Props) {
  const [theme, setThemeState] = useState<Theme>("light");

  useEffect(() => {
    const storedTheme = localStorage.getItem(THEME_STORAGE_KEY) as Theme | null;

    if (storedTheme === "light" || storedTheme === "dark") {
      setThemeState(storedTheme);
      document.documentElement.setAttribute("data-theme", storedTheme);
      return;
    }

    document.documentElement.setAttribute("data-theme", "light");
  }, []);

  function setTheme(theme: Theme) {
    setThemeState(theme);
    localStorage.setItem(THEME_STORAGE_KEY, theme);
    document.documentElement.setAttribute("data-theme", theme);
  }

  function toggleTheme() {
    const nextTheme = theme === "light" ? "dark" : "light";
    setTheme(nextTheme);
  }

  const value = useMemo(
    () => ({
      theme,
      setTheme,
      toggleTheme,
    }),
    [theme]
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}