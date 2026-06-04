import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import Lenis from 'lenis'
import { setLenis } from '../utils/scrollToSection'

const DISABLED_ON = ['/login', '/register', '/dashboard']

export default function SmoothScroll() {
    const location = useLocation()
    const disabled = DISABLED_ON.some(path => location.pathname.startsWith(path))

    useEffect(() => {
        if (disabled) {
            setLenis(null)
            return
        }

        const lenis = new Lenis({
            duration: 1.4,
            smoothWheel: true,
            autoRaf: true,
        })

        setLenis(lenis)

        return () => {
            lenis.destroy()
            setLenis(null)
        }
    }, [disabled])

    return null
}
