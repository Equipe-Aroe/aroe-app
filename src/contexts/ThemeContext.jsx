import { createContext, useContext, useEffect, useState } from "react";

const ThemeContext = createContext();

export function ThemeProvider({ children }) {
  const [darkMode, setDarkMode] = useState(() => {
    const saved = localStorage.getItem("theme");
    if (saved) return saved === "dark";
    return window.matchMedia("(prefers-color-scheme: dark)").matches;
  });

  const [highContrast, setHighContrast] = useState(() => {
    return localStorage.getItem("highContrast") === "true";
  });

  const [fontSize, setFontSize] = useState(() => {
    return parseFloat(localStorage.getItem("fontSize")) || 16;
  });

  // Aplicar dark mode
  useEffect(() => {
    const htmlEl = document.documentElement;
    htmlEl.classList.toggle("dark", darkMode);
    htmlEl.setAttribute("data-theme", darkMode ? "dark" : "light");
    localStorage.setItem("theme", darkMode ? "dark" : "light");
  }, [darkMode]);

  // Aplicar alto contraste
  useEffect(() => {
    const htmlEl = document.documentElement;
    htmlEl.classList.toggle("high-contrast", highContrast);
    htmlEl.setAttribute("data-contrast", highContrast ? "high" : "normal");
    localStorage.setItem("highContrast", highContrast);
  }, [highContrast]);

  // Aplicar tamanho de fonte
  useEffect(() => {
    document.documentElement.style.fontSize = `${fontSize}px`;
    localStorage.setItem("fontSize", fontSize);
  }, [fontSize]);

  const toggleDarkMode = () => setDarkMode((prev) => !prev);
  const toggleHighContrast = () => setHighContrast((prev) => !prev);
  const increaseFontSize = () => setFontSize((prev) => Math.min(prev + 2, 28));
  const decreaseFontSize = () => setFontSize((prev) => Math.max(prev - 2, 12));

  const value = {
    darkMode,
    setDarkMode,
    toggleDarkMode,
    highContrast,
    setHighContrast,
    toggleHighContrast,
    fontSize,
    setFontSize,
    increaseFontSize,
    decreaseFontSize,
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useThemeContext() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useThemeContext deve ser usado dentro de ThemeProvider");
  }
  return context;
}
