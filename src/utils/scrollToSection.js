let lenisInstance = null

export function setLenis(instance) {
    lenisInstance = instance
}

export function scrollToSection(id) {
    const el = document.getElementById(id)
    if (!el) return

    // Altura do seu Navbar (80px) + uma folga de respiro (20px) = 100px
    const navbarOffset = -100 

    if (lenisInstance) {
        lenisInstance.scrollTo(el, {
            duration: 1.4,
            lock: true,
            offset: navbarOffset, // O Lenis desconta esse valor automaticamente!
        })
        return
    }

    // Fallback caso o Lenis não esteja ativo:
    // Usar 'center' evita que o topo fique colado/atrás do Navbar
    el.scrollIntoView({ behavior: 'smooth', block: 'center' })
}