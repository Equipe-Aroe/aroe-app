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

  // Novo Estado: Filtros de Daltonismo ('normal', 'protanopia', 'deuteranopia', 'tritanopia')
  const [colorFilter, setColorFilter] = useState(() => {
    return localStorage.getItem("colorFilter") || "normal";
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
    
    // Desativa filtros de daltonismo se o alto contraste for ativado (evita conflito visual)
    if (highContrast) setColorFilter("normal");
  }, [highContrast]);

  // Aplicar tamanho de fonte
  useEffect(() => {
    document.documentElement.style.fontSize = `${fontSize}px`;
    localStorage.setItem("fontSize", fontSize);
  }, [fontSize]);

  // Aplicar Filtro de Daltonismo no HTML
  useEffect(() => {
    const htmlEl = document.documentElement;
    
    // Remove classes antigas de daltonismo para não acumular
    htmlEl.classList.remove("filter-protanopia", "filter-deuteranopia", "filter-tritanopia");
    
    if (colorFilter !== "normal") {
      htmlEl.classList.add(`filter-${colorFilter}`);
      // Se ativar daltonismo, desativa alto contraste automático
      setHighContrast(false);
    }
    
    htmlEl.setAttribute("data-color-filter", colorFilter);
    localStorage.setItem("colorFilter", colorFilter);
  }, [colorFilter]);

  const toggleDarkMode = () => setDarkMode((prev) => !prev);
  const toggleHighContrast = () => setHighContrast((prev) => !prev);
  const increaseFontSize = () => setFontSize((prev) => Math.min(prev + 2, 28));
  const decreaseFontSize = () => setFontSize((prev) => Math.max(prev - 2, 12));
  
  // Função para resetar todas as configurações de acessibilidade de uma vez
  const resetAccessibility = () => {
    setHighContrast(false);
    setFontSize(16);
    setColorFilter("normal");
  };

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
    colorFilter,
    setColorFilter, // Permite mudar direto passando a string do filtro
    resetAccessibility,
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