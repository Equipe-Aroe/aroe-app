let lenisInstance = null

export function setLenis(instance) {
    lenisInstance = instance
}

export function scrollToSection(id) {
    const el = document.getElementById(id)
    if (!el) return

    if (lenisInstance) {
        lenisInstance.scrollTo(el, {
            duration: 1.4,
            lock: true,
        })
        return
    }

    el.scrollIntoView({ behavior: 'smooth', block: 'start' })
}
