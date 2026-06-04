import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  Menu,
  X,
  Moon,
  Sun,
} from "lucide-react";

import Button from "../ui/Button";
import { useThemeContext } from "../../contexts/ThemeContext";
import AccessibilityToolbar from "./AccessibilityToolbar";

const NAV_LINKS = [
  {
    label: "Início",
    to: "/",
  },
  {
    label: "Como funciona",
    to: "/como-funciona",
  },
  {
    label: "Sobre",
    to: "/pages/sobre",
  },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const { darkMode, toggleDarkMode } =
    useThemeContext();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 120);
    };

    window.addEventListener(
      "scroll",
      handleScroll,
      { passive: true }
    );

    return () => {
      window.removeEventListener(
        "scroll",
        handleScroll
      );
    };
  }, []);

  useEffect(() => {
    if (scrolled) {
      setMenuOpen(false);
    }
  }, [scrolled]);

  useEffect(() => {
    document.body.style.overflow = menuOpen
      ? "hidden"
      : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  const handleCloseMenu = () => {
    setMenuOpen(false);
  };

  return (
    <>
      {/* Skip Navigation */}
      <a
        href="#main-content"
        className="
          sr-only
          focus:not-sr-only
          fixed
          top-4
          left-4
          z-999
          bg-white
          text-primary
          px-4
          py-2
          rounded-xl
          shadow-lg
          font-medium
        "
      >
        Pular para conteúdo
      </a>

      <header
        role="banner"
        className="fixed top-0 left-0 right-0 z-50"
      >
        <div
          className={`
            fixed
            top-0
            left-0
            right-0
            z-50
            transition-all
            duration-300
            ${
              scrolled || menuOpen
                ? "bg-primary/95 backdrop-blur-md shadow-lg shadow-black/20"
                : "bg-transparent"
            }
          `}
        >
          <nav
            aria-label="Navegação principal"
            className="
              max-w-6xl
              mx-auto
              px-4
              sm:px-6
              lg:px-8
              py-3
              flex
              items-center
              justify-between
            "
          >
            {/* Logo */}
            <Link
              to="/"
              aria-label="Página inicial da Aroê"
              className="flex items-center"
            >
              <img
                src="/logo.png"
                alt="Logo da Aroê"
                className="h-8 sm:h-10 w-auto"
              />
            </Link>

            {/* Desktop Navigation */}
            <ul className="hidden md:flex items-center gap-8">
              {NAV_LINKS.map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className="
                      text-white
                      font-medium
                      hover:text-secondary
                      transition-colors
                      duration-200
                      focus:outline-none
                      focus:ring-2
                      focus:ring-secondary
                      rounded-md
                    "
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>

            {/* Desktop Actions */}
            <div className="hidden md:flex items-center gap-3">
              <AccessibilityToolbar />

              <button
                type="button"
                onClick={toggleDarkMode}
                aria-label={
                  darkMode
                    ? "Ativar modo claro"
                    : "Ativar modo escuro"
                }
                className="
                  p-2
                  rounded-lg
                  text-white
                  hover:bg-white/10
                  transition
                  focus:outline-none
                  focus:ring-2
                  focus:ring-secondary
                "
              >
                {darkMode ? (
                  <Sun size={20} />
                ) : (
                  <Moon size={20} />
                )}
              </button>

              <Button
                variant="navOutline"
                to="/register"
              >
                Cadastrar
              </Button>

              <Button
                variant="navPrimary"
                to="/login"
              >
                Entrar
              </Button>
            </div>

            {/* Mobile Controls */}
            <div className="flex md:hidden items-center gap-2">
              <AccessibilityToolbar />

              <button
                type="button"
                onClick={toggleDarkMode}
                aria-label={
                  darkMode
                    ? "Ativar modo claro"
                    : "Ativar modo escuro"
                }
                className="
                  p-2
                  rounded-lg
                  text-white
                  hover:bg-white/10
                  transition
                  focus:outline-none
                  focus:ring-2
                  focus:ring-secondary
                "
              >
                {darkMode ? (
                  <Sun size={20} />
                ) : (
                  <Moon size={20} />
                )}
              </button>

              <button
                type="button"
                onClick={() =>
                  setMenuOpen((prev) => !prev)
                }
                aria-expanded={menuOpen}
                aria-controls="mobile-menu"
                aria-label={
                  menuOpen
                    ? "Fechar menu"
                    : "Abrir menu"
                }
                className="
                  p-2
                  rounded-lg
                  text-white
                  hover:bg-white/10
                  transition
                  focus:outline-none
                  focus:ring-2
                  focus:ring-secondary
                "
              >
                {menuOpen ? (
                  <X size={22} />
                ) : (
                  <Menu size={22} />
                )}
              </button>
            </div>
          </nav>
        </div>

        {/* Mobile Menu */}
        <div
          id="mobile-menu"
          role="menu"
          aria-hidden={!menuOpen}
          className={`
            md:hidden
            fixed
            left-0
            right-0
            top-16
            z-40
            overflow-hidden
            transition-all
            duration-300
            bg-primary/95
            backdrop-blur-md
            border-t
            border-white/10
            ${
              menuOpen
                ? "max-h-[500px] opacity-100"
                : "max-h-0 opacity-0 pointer-events-none"
            }
          `}
        >
          <div className="px-6 py-6 flex flex-col gap-1">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                role="menuitem"
                tabIndex={menuOpen ? 0 : -1}
                onClick={handleCloseMenu}
                className="
                  py-3
                  text-white
                  border-b
                  border-white/10
                  hover:text-secondary
                  transition
                  focus:outline-none
                  focus:ring-2
                  focus:ring-secondary
                  rounded-md
                "
              >
                {link.label}
              </Link>
            ))}

            <div className="flex flex-col gap-3 pt-5">
              <Button
                variant="navOutline"
                to="/register"
                className="w-full justify-center"
              >
                Cadastrar
              </Button>

              <Button
                variant="navPrimary"
                to="/login"
                className="w-full justify-center"
              >
                Entrar
              </Button>
            </div>
          </div>
        </div>
      </header>
    </>
  );
}