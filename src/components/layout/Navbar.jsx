import { useEffect, useState } from "react"
import { Link, useLocation } from "react-router-dom"
import { Menu, Moon, Sun, X } from "lucide-react"

import Button from "../ui/Button"
import AccessibilityToolbar from "./AccessibilityToolbar"
import { useThemeContext } from "../../contexts/ThemeContext"
import { scrollToSection } from "../../utils/scrollToSection"

const NAV_LINKS = [
  { label: "Início", to: "/", hash: "inicio" },
  { label: "Como funciona", to: "/", hash: "como-funciona" },
  { label: "Sobre", to: "/pages/sobre" },
]

export default function Navbar() {
  const location = useLocation()
  const { darkMode, toggleDarkMode } = useThemeContext()
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 120)

    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    if (scrolled) setMenuOpen(false)
  }, [scrolled])

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : ""
    return () => {
      document.body.style.overflow = ""
    }
  }, [menuOpen])

  function handleNavClick(event, link) {
    if (!link.hash) return

    if (location.pathname === "/") {
      event.preventDefault()
      scrollToSection(link.hash)
      setMenuOpen(false)
    }
  }

  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only fixed top-4 left-4 z-50 bg-white text-primary px-4 py-2 rounded-xl shadow-lg font-medium"
      >
        Pular para conteúdo
      </a>

      <div
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled || menuOpen
            ? "bg-primary/95 backdrop-blur-md shadow-lg shadow-black/20"
            : "bg-transparent"
        }`}
      >
        <nav
          aria-label="Navegação principal"
          className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-2.5 sm:py-3 flex items-center justify-between"
        >
          <Link to="/" className="flex items-center flex-shrink-0" aria-label="Página inicial da Aroê">
            <img src="/logo.png" alt="Logo da Aroê" className="h-7 sm:h-9 w-auto" />
          </Link>

          <ul className="hidden md:flex items-center gap-6 lg:gap-10">
            {NAV_LINKS.map((link) => (
              <li key={link.label}>
                <Link
                  to={link.hash ? { pathname: link.to, hash: `#${link.hash}` } : link.to}
                  onClick={(event) => handleNavClick(event, link)}
                  className="text-white/90 text-sm font-medium hover:text-white transition-colors duration-200 whitespace-nowrap"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          <div className="hidden md:flex items-center gap-3">
            <AccessibilityToolbar />

            <button
              type="button"
              onClick={toggleDarkMode}
              aria-label={darkMode ? "Ativar modo claro" : "Ativar modo escuro"}
              className="p-2 rounded-lg text-white hover:bg-white/10 transition focus:outline-none focus:ring-2 focus:ring-secondary"
            >
              {darkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>

            <Button variant="navOutline" to="/register">
              Cadastrar
            </Button>

            <Button variant="navPrimary" to="/login">
              Entrar
            </Button>
          </div>

          <div className="flex md:hidden items-center gap-2">
            <AccessibilityToolbar />

            <button
              type="button"
              onClick={toggleDarkMode}
              aria-label={darkMode ? "Ativar modo claro" : "Ativar modo escuro"}
              className="p-2 rounded-lg text-white hover:bg-white/10 transition focus:outline-none focus:ring-2 focus:ring-secondary"
            >
              {darkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>

            <button
              type="button"
              onClick={() => setMenuOpen((prev) => !prev)}
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
              aria-label={menuOpen ? "Fechar menu" : "Abrir menu"}
              className="p-2 rounded-lg text-white hover:bg-white/10 transition focus:outline-none focus:ring-2 focus:ring-secondary"
            >
              {menuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </nav>
      </div>

      <div
        id="mobile-menu"
        role="menu"
        aria-hidden={!menuOpen}
        className={`md:hidden fixed left-0 right-0 top-16 z-40 overflow-hidden transition-all duration-300 bg-primary/95 backdrop-blur-md border-t border-white/10 ${
          menuOpen ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0 pointer-events-none"
        }`}
      >
        <div className="px-6 py-6 flex flex-col gap-1">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.label}
              to={link.hash ? { pathname: link.to, hash: `#${link.hash}` } : link.to}
              role="menuitem"
              tabIndex={menuOpen ? 0 : -1}
              onClick={(event) => handleNavClick(event, link)}
              className="py-3 text-white border-b border-white/10 hover:text-secondary transition focus:outline-none focus:ring-2 focus:ring-secondary rounded-md"
            >
              {link.label}
            </Link>
          ))}

          <div className="flex flex-col gap-3 pt-5">
            <Button variant="navOutline" to="/register" className="w-full justify-center" onClick={() => setMenuOpen(false)}>
              Cadastrar
            </Button>

            <Button variant="navPrimary" to="/login" className="w-full justify-center" onClick={() => setMenuOpen(false)}>
              Entrar
            </Button>
          </div>
        </div>
      </div>
    </header>
  )
}
