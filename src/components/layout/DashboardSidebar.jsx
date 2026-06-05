/* eslint-disable react/prop-types */
import { Link, useLocation } from 'react-router-dom'
import { Home, Sparkles, FileText, ShoppingCart, Pill, Heart, Bell, History, Settings, HelpCircle, ChevronLeft, Menu } from 'lucide-react'
import { useThemeContext } from '../../contexts/ThemeContext'

// Importação do logotipo oficial fornecido da Aroê
import aroeLogo from '/pill-logo.png' 

const MENU_ITEMS = [
    { label: 'Início', icon: Home, to: '/dashboard' },
    { label: 'Ária IA', icon: Sparkles, to: '/dashboard/aria' },
    { label: 'Receitas', icon: FileText, to: '/dashboard/receitas' },
    { label: 'Pedidos', icon: ShoppingCart, to: '/dashboard/pedidos' },
    { label: 'Tratamentos', icon: Pill, to: '/dashboard/tratamentos' },
    { label: 'Lembretes', icon: Heart, to: '/dashboard/lembretes' },
    { label: 'Notificações', icon: Bell, to: '/dashboard/notificacoes', badge: true },
    { label: 'Histórico', icon: History, to: '/dashboard/historico' },
]

const BOTTOM_MENU_ITEMS = [
    { label: 'Configurações', icon: Settings, to: '/dashboard/configuracoes' },
    { label: 'Ajuda e suporte', icon: HelpCircle, to: '/dashboard/ajuda' },
]

export default function DashboardSidebar({ isOpen, setIsOpen }) {
    const location = useLocation()
    const { highContrast } = useThemeContext()

    const isActive = (path) => location.pathname === path

    // Ajuste Clean: Saem os gradientes escuros pesados e entram fundos minimalistas e sofisticados
    const sidebarBgClass = highContrast
        ? 'bg-white text-black border-r-4 border-black dark:bg-black dark:text-white dark:border-white'
        : 'bg-white border-r border-gray-100 text-gray-700 dark:bg-slate-950 dark:text-slate-200 dark:border-slate-900'

    const buttonToggleClass = highContrast
        ? 'border-2 border-black text-black hover:bg-black hover:text-white dark:border-white dark:text-white dark:hover:bg-white dark:hover:text-black'
        : 'bg-gray-50 text-gray-500 hover:bg-gray-100 dark:bg-slate-900 dark:text-slate-400 dark:hover:bg-slate-800'

    return (
        <>
            {/* Overlay para telas mobile */}
            {isOpen && (
                <div
                    className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-30 md:hidden animate-fade-in"
                    onClick={() => setIsOpen(false)}
                />
            )}

            {/* Sidebar Lateral */}
            <aside
                className={`fixed left-0 top-0 h-screen flex flex-col justify-between p-5 transition-all duration-300 z-40 md:z-auto md:relative ${sidebarBgClass} ${
                    isOpen 
                        ? 'translate-x-0 w-64' 
                        : '-translate-x-full md:translate-x-0 md:w-20 md:px-3'
                }`}
            >
                <div>
                    {/* Header: Substituído o quadrado genérico pelo Logo original em formato de Cápsula */}
                    <div className={`flex items-center justify-between mb-8 ${!isOpen && 'md:flex-col md:gap-4 md:justify-center'}`}>
                        <div className="flex items-center gap-2.5">
                            <div className="w-9 h-9 flex items-center justify-center overflow-hidden shrink-0">
                                <img src={aroeLogo} alt="Aroê Logo" className="w-full h-full object-contain scale-125" />
                            </div>
                            <span className={`text-lg font-bold tracking-tight text-gray-900 dark:text-white transition-all duration-200 ${
                                isOpen ? 'opacity-100 block' : 'md:opacity-0 md:hidden'
                            }`}>
                                Aroê
                            </span>
                        </div>

                        {/* Botão Minimizar */}
                        <button
                            type="button"
                            onClick={() => setIsOpen(!isOpen)}
                            className={`p-1.5 rounded-lg transition-colors focus:outline-none ${buttonToggleClass}`}
                            title={isOpen ? "Recolher menu lateral" : "Expandir menu lateral"}
                        >
                            {isOpen ? <ChevronLeft size={16} /> : <Menu size={16} />}
                        </button>
                    </div>

                    {/* Menu principal */}
                    <nav className="space-y-1">
                        {MENU_ITEMS.map((item) => {
                            const Icon = item.icon
                            const active = isActive(item.to)
                            
                            // Estilo Clean: Item ativo ganha fundo suave e uma borda esquerda elegante
                            const activeClass = highContrast
                                ? active 
                                    ? 'bg-black text-white dark:bg-white dark:text-black border-2 border-black dark:border-white font-black' 
                                    : 'text-black hover:bg-black/10 dark:text-white dark:hover:bg-white/10'
                                : active
                                    ? 'bg-purple-50/60 text-purple-700 border-l-4 border-purple-600 dark:bg-purple-950/20 dark:text-purple-400 dark:border-purple-400 font-semibold'
                                    : 'text-gray-500 hover:text-gray-900 hover:bg-gray-50 dark:text-slate-400 dark:hover:text-slate-100 dark:hover:bg-slate-900/60 border-l-4 border-transparent'

                            return (
                                <Link
                                    key={item.to}
                                    to={item.to}
                                    onClick={() => window.innerWidth < 768 && setIsOpen(false)}
                                    className={`flex items-center rounded-r-xl transition-all duration-150 text-sm group ${activeClass} ${
                                        isOpen ? 'px-3.5 py-2.5 gap-3' : 'md:justify-center md:py-3 md:px-0'
                                    }`}
                                    title={!isOpen ? item.label : undefined}
                                >
                                    <Icon 
                                        size={18} 
                                        className={`transition-transform shrink-0 ${
                                            highContrast 
                                                ? 'text-current' 
                                                : active 
                                                    ? 'text-purple-600 dark:text-purple-400' 
                                                    : 'text-gray-400 group-hover:text-gray-600 dark:text-slate-500 dark:group-hover:text-slate-400'
                                        }`} 
                                    />
                                    <span className={`transition-all duration-200 ${isOpen ? 'opacity-100 block' : 'md:opacity-0 md:hidden'}`}>
                                        {item.label}
                                    </span>
                                    
                                    {item.badge && (
                                        <span className={`bg-emerald-500 text-white text-[10px] font-bold rounded-full shadow-sm shrink-0 ${
                                            isOpen ? 'ml-auto px-1.5 py-0.5' : 'absolute md:top-2 md:right-2 w-2 h-2 !p-0 overflow-hidden text-transparent'
                                        }`}>
                                            1
                                        </span>
                                    )}
                                </Link>
                            )
                        })}
                    </nav>
                </div>

                {/* Menu inferior */}
                <nav className={`space-y-1 border-t pt-4 ${highContrast ? 'border-black/30 dark:border-white/30' : 'border-gray-100 dark:border-slate-900'}`}>
                    {BOTTOM_MENU_ITEMS.map((item) => {
                        const Icon = item.icon
                        const active = isActive(item.to)

                        const activeBottomClass = highContrast
                            ? active 
                                ? 'bg-black text-white dark:bg-white dark:text-black border-2 border-black dark:border-white font-black' 
                                : 'text-black hover:bg-black/10 dark:text-white dark:hover:bg-white/10'
                            : active
                                ? 'bg-purple-50/60 text-purple-700 border-l-4 border-purple-600 dark:bg-purple-950/20 dark:text-purple-400 dark:border-purple-400 font-semibold'
                                : 'text-gray-500 hover:text-gray-900 hover:bg-gray-50 dark:text-slate-400 dark:hover:text-slate-100 dark:hover:bg-slate-900/60 border-l-4 border-transparent'

                        return (
                            <Link
                                key={item.to}
                                to={item.to}
                                onClick={() => window.innerWidth < 768 && setIsOpen(false)}
                                className={`flex items-center rounded-r-xl transition-all duration-150 text-sm group ${activeBottomClass} ${
                                    isOpen ? 'px-3.5 py-2.5 gap-3' : 'md:justify-center md:py-3 md:px-0'
                                }`}
                                title={!isOpen ? item.label : undefined}
                            >
                                <Icon 
                                    size={18} 
                                    className={`transition-transform shrink-0 ${
                                        highContrast 
                                            ? 'text-current' 
                                            : active 
                                                ? 'text-purple-600 dark:text-purple-400' 
                                                : 'text-gray-400 group-hover:text-gray-600 dark:text-slate-500 dark:group-hover:text-slate-400'
                                    }`} 
                                />
                                <span className={`transition-all duration-200 ${isOpen ? 'opacity-100 block' : 'md:opacity-0 md:hidden'}`}>
                                    {item.label}
                                </span>
                            </Link>
                        )
                    })}
                </nav>
            </aside>
        </>
    )
}