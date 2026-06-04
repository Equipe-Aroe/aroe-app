import { useEffect, useState } from "react"
import { Link, useLocation } from "react-router-dom"
import { Menu, X } from 'lucide-react'
import Button from "../ui/Button"
import { scrollToSection } from "../../utils/scrollToSection"

const NAV_LINKS = [
    { label: 'Início', to: '/', hash: 'inicio' },
    { label: 'Como funciona', to: '/', hash: 'como-funciona' },
    { label: 'Sobre', to: '/pages/sobre' },
]

export default function Navbar() {
    const location = useLocation()
    const [scrolled, setScrolled] = useState(false)
    const [menuOpen, setMenuOpen] = useState(false)

    function handleNavClick(e, link) {
        if (!link.hash) return

        if (location.pathname === '/') {
            e.preventDefault()
            scrollToSection(link.hash)
        }
    }

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 120)
        window.addEventListener("scroll", handleScroll, { passive: true })
        return () => window.removeEventListener("scroll", handleScroll)
    }, [])

    useEffect(() => {
        if (scrolled) setMenuOpen(false)
    }, [scrolled])

    useEffect(() => {
        document.body.style.overflow = menuOpen ? 'hidden' : ''
        return () => { document.body.style.overflow = ''}
    }, [menuOpen])

    return (
        <header className="fixed top-0 left-0 right-0 z-50">

            <div
                className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
                    scrolled || menuOpen
                        ? "bg-primary/95 backdrop-blur-md shadow-lg shadow-black/20"
                        : "bg-transparent"
                }`}
            >

                <nav className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-2.5 sm:py-3 flex items-center justify-between">

                    <Link to="/" className="flex items-center flex-shrink-0">
                        <img src="/logo.png" alt="Logo da Aroê" className="h-7 sm:h-9 w-auto"/>
                    </Link>

                    <ul className="hidden md:flex items-center gap-6 lg:gap-10">
                        {NAV_LINKS.map((link) => (
                            <li key={link.label}>
                                <Link
                                    to={link.hash ? { pathname: link.to, hash: `#${link.hash}` } : link.to}
                                    onClick={(e) => handleNavClick(e, link)}
                                    className="text-white/90 text-sm font-medium hover:text-white transition-colors duration-200 whitespace-nowrap"
                                >
                                    {link.label}
                                </Link>
                            </li>
                        ))}
                    </ul>

                    {/* cta desktop */}
                    <div className="hidden md:flex items-center gap-3">
                        <Button variant="navOutline" to="/register">
                            Cadastrar
                        </Button>

                        <Button variant="navPrimary" to="/login">
                            Entrar
                        </Button>
                    </div>

                    {/* menu hamburguer */}
                    <button
                        className="md:hidden p-2 rounded-lg text-white hover:bg-white/10 transition-colors duration-500"
                        onClick={() => setMenuOpen((prev) => !prev)}
                        aria-label={menuOpen ? 'Fechar menu' : 'Abrir menu'}
                        aria-expanded={menuOpen}
                    >
                        {menuOpen ? <X size={22}/> : <Menu size={22} />}
                    </button>

                </nav>
            </div>
            
            <div
                className={`md:hidden fixed left-0 right-0 top-[25px] z-40 overflow-hidden transition-all duration-300 ease-in-out bg-primary/98 backdrop-blur-md border-t  border-white/10
                    ${menuOpen
                        ? 'max-h-[400px] opacity-100 pointer-events-auto'
                        : 'max-h-0 opacity-0 pointer-events-none'
                    }`}
            >

                
                <div className="px-6 py-6 flex flex-col gap-1 mt-6">
 
                    {NAV_LINKS.map((link) => (
                        <Link
                            key={link.label}
                            to={link.hash ? { pathname: link.to, hash: `#${link.hash}` } : link.to}
                            onClick={(e) => {
                                handleNavClick(e, link)
                                setMenuOpen(false)
                            }}
                            className="text-white/85 text-base font-medium py-3 border-b border-white/10 hover:text-white hover:pl-1 transition-all duration-200"
                        >
                            {link.label}
                        </Link>
                    ))}
 
                    <div className="flex flex-col gap-3 pt-5">
                        <Button variant="navOutline" to="/register" className="w-full justify-center">
                            Cadastrar
                        </Button>
                        <Button variant="navPrimary" to="/login" className="w-full justify-center">
                            Entrar
                        </Button>
                    </div>
 
                </div>
            </div>
        </header>
    )
}