/* eslint-disable react/prop-types */
import { Link, useLocation } from 'react-router-dom'
import { Home, Sparkles, FileText, ShoppingCart, Pill, Heart, Bell, History, Settings, HelpCircle, X, ChevronLeft, Menu } from 'lucide-react'
import { useThemeContext } from '../../contexts/ThemeContext' // Ajuste o caminho conforme seu projeto

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

    // Gerenciamento de cores dinâmicas para Alto Contraste, Dark e Light Mode
    const sidebarBgClass = highContrast
        ? 'bg-white text-black border-r-4 border-black dark:bg-black dark:text-white dark:border-white'
        : 'bg-gradient-to-b from-primary to-[#1F1645] text-white dark:from-slate-950 dark:to-slate-950 dark:border-slate-900 dark:text-slate-200'

    const buttonToggleClass = highContrast
        ? 'border-2 border-black text-black hover:bg-black hover:text-white dark:border-white dark:text-white dark:hover:bg-white dark:hover:text-black'
        : 'bg-white/10 text-white/80 hover:text-white hover:bg-white/20 dark:bg-slate-900 dark:text-slate-400 dark:hover:bg-slate-800'

    return (
        <>
            {/* Overlay para telas mobile */}
            {isOpen && (
                <div
                    className="fixed inset-0 bg-black/60 backdrop-blur-sm z-30 md:hidden"
                    onClick={() => setIsOpen(false)}
                />
            )}

            {/* Sidebar Lateral */}
            <aside
                className={`fixed left-0 top-0 h-screen flex flex-col justify-between p-6 transition-all duration-300 z-40 md:z-auto md:relative border-r border-transparent ${sidebarBgClass} ${
                    isOpen 
                        ? 'translate-x-0 w-64' 
                        : '-translate-x-full md:translate-x-0 md:w-20 md:px-3'
                }`}
            >
                <div>
                    {/* Header com logo + Botão de Recolher/Expandir */}
                    <div className={`flex items-center justify-between mb-8 ${!isOpen && 'md:flex-col md:gap-4 md:justify-center'}`}>
                        <div className="flex items-center gap-3">
                            <div className={`w-10 h-10 rounded-xl flex items-center justify-center shadow-inner transition-colors ${
                                highContrast 
                                    ? 'bg-black text-white dark:bg-white dark:text-black border-2 border-current' 
                                    : 'bg-white/10 dark:bg-slate-900 border border-white/10 dark:border-slate-800'
                            }`}>
                                <span className={`text-lg font-extrabold ${highContrast ? 'text-current' : 'text-white dark:text-secondary'}`}>A+</span>
                            </div>
                            <span className={`text-xl font-bold tracking-tight text-current transition-all duration-200 ${
                                isOpen ? 'opacity-100 block' : 'md:opacity-0 md:hidden'
                            }`}>
                                Aroê
                            </span>
                        </div>

                        {/* Botão de abrir/fechar (Suporta click no desktop e mobile) */}
                        <button
                            type="button"
                            onClick={() => setIsOpen(!isOpen)}
                            className={`p-2 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-secondary ${buttonToggleClass}`}
                            title={isOpen ? "Recolher menu lateral" : "Expandir menu lateral"}
                        >
                            {isOpen ? <ChevronLeft size={18} /> : <Menu size={18} />}
                        </button>
                    </div>

                    {/* Menu principal */}
                    <nav className="space-y-1.5">
                        {MENU_ITEMS.map((item) => {
                            const Icon = item.icon
                            const active = isActive(item.to)
                            
                            // Classes customizadas de item ativo/inativo para o Alto Contraste e Temas comuns
                            const activeClass = highContrast
                                ? active 
                                    ? 'bg-black text-white dark:bg-white dark:text-black border-2 border-black dark:border-white font-black' 
                                    : 'text-black hover:bg-black/10 dark:text-white dark:hover:bg-white/10'
                                : active
                                    ? 'bg-white/15 text-white dark:bg-secondary/15 dark:text-secondary shadow-sm'
                                    : 'text-white/70 hover:text-white hover:bg-white/5 dark:text-slate-400 dark:hover:text-slate-200 dark:hover:bg-slate-900/50'

                            return (
                                <Link
                                    key={item.to}
                                    to={item.to}
                                    onClick={() => window.innerWidth < 768 && setIsOpen(false)}
                                    className={`flex items-center rounded-xl transition-all duration-200 font-medium text-sm group ${activeClass} ${
                                        isOpen ? 'px-4 py-3 gap-3' : 'md:justify-center md:p-3'
                                    }`}
                                    title={!isOpen ? item.label : undefined}
                                >
                                    <Icon 
                                        size={18} 
                                        className={`transition-transform group-hover:scale-105 shrink-0 ${
                                            highContrast ? 'text-current' : active ? 'text-white dark:text-secondary' : 'text-white/70 dark:text-slate-400'
                                        }`} 
                                    />
                                    <span className={`transition-all duration-200 ${isOpen ? 'opacity-100 block' : 'md:opacity-0 md:hidden'}`}>
                                        {item.label}
                                    </span>
                                    
                                    {item.badge && (
                                        <span className={`bg-secondary text-white text-[10px] font-bold rounded-full shadow-sm shrink-0 ${
                                            isOpen ? 'ml-auto px-2 py-0.5' : 'absolute md:top-2 md:right-2 px-1 py-0'
                                        }`}>
                                            1
                                        </span>
                                    )}
                                </Link>
                            )
                        })}
                    </nav>
                </div>

                {/* Menu inferior ancorado embaixo */}
                <nav className={`space-y-1.5 border-t pt-4 ${highContrast ? 'border-black/30 dark:border-white/30' : 'border-white/10 dark:border-slate-900'}`}>
                    {BOTTOM_MENU_ITEMS.map((item) => {
                        const Icon = item.icon
                        const active = isActive(item.to)

                        const activeBottomClass = highContrast
                            ? active 
                                ? 'bg-black text-white dark:bg-white dark:text-black border-2 border-black dark:border-white font-black' 
                                : 'text-black hover:bg-black/10 dark:text-white dark:hover:bg-white/10'
                            : active
                                ? 'bg-white/15 text-white dark:bg-secondary/15 dark:text-secondary'
                                : 'text-white/70 hover:text-white hover:bg-white/5 dark:text-slate-400 dark:hover:text-slate-200 dark:hover:bg-slate-900/50'

                        return (
                            <Link
                                key={item.to}
                                to={item.to}
                                onClick={() => window.innerWidth < 768 && setIsOpen(false)}
                                className={`flex items-center rounded-xl transition-all duration-200 font-medium text-sm group ${activeBottomClass} ${
                                    isOpen ? 'px-4 py-3 gap-3' : 'md:justify-center md:p-3'
                                }`}
                                title={!isOpen ? item.label : undefined}
                            >
                                <Icon 
                                    size={18} 
                                    className={`transition-transform group-hover:scale-105 shrink-0 ${
                                        highContrast ? 'text-current' : active ? 'text-white dark:text-secondary' : 'text-white/70 dark:text-slate-400'
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