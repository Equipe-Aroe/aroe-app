import { Link, useLocation } from "react-router-dom";
import { scrollToSection } from "../../utils/scrollToSection";

const links = {
    Produtos: [
        {label: "Vitaminas", to: "/medicamentos/vitaminas"},
        {label: "Suplementos", to: "/medicamentos/suplementos"},
        {label: "Hormônios", to: "/medicamentos/hormonios"},
        {label: "Fitoterápicos", to: "/medicamentos/fitoterapicos"},
    ],
    Empresa: [
        {label: "Sobre nós", to: "/pages/sobre"},
        {label: "Como Funciona", to: "/", hash: "como-funciona"},
        {label: "Blog", to: "/blog"},
        {label: "Carreiras", to: "/carreiras"},
    ],
    Suporte: [
        {label: "FAQ", to: "/faq"},
        {label: "Fale Conosco", to: "/contato"},
        {label: "Política de Privacidade", to: "/privacidade"},
        {label: "Termos de Uso", to: "/termos"},
    ],
}

export default function Footer() {
    const location = useLocation()

    function handleLinkClick(e, item) {
        if (!item.hash) return

        if (location.pathname === '/') {
            e.preventDefault()
            scrollToSection(item.hash)
        }
    }

    return (
        <footer className="bg-primary text-white">

            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-14">
                <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 lg:gap-12">

                    <div className="flex flex-col gap-3 sm:gap-4">
                        <img src="/logo.png" alt="Logo Aroê" className="h-6 sm:h-8 w-fit" />
                        <p className="text-xs sm:text-sm text-white/60 leading-relaxed max-w-xs">
                            Medicamentos manipulados com precisão farmacêutica e entregues com cuidado diretamente para você.    
                        </p>
                    </div>

                    {Object.entries(links).map(([title, items]) => (
                        <div key={title} className="flex flex-col gap-3 sm:gap-4">
                            <span className="text-xs sm:text-sm font-semibold text-primary-light">
                                {title}
                            </span>

                            <ul className="flex flex-col gap-2 sm:gap-3">
                                {items.map((item) => (
                                    <li key={item.label}>
                                        <Link
                                            to={item.hash ? { pathname: item.to, hash: `#${item.hash}` } : item.to}
                                            onClick={(e) => handleLinkClick(e, item)}
                                            className="text-xs sm:text-sm text-white/60 hover:text-white transition-colors duration-200"
                                        >
                                            {item.label}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}

                </div>
            </div>

            <div className="border-t border-white/10">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-5">
                    <p className="text-xs text-white/40 text-center sm:text-left">
                        © {new Date().getFullYear()} Aroê Farmácia Magistral. Todos os direitos reservados.
                    </p>
                </div>
            </div>
        </footer>
    )

}