import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Home, FileText, ShoppingCart, Pill, Heart, Bell, History, Settings, HelpCircle, Menu, X } from 'lucide-react'

const MENU_ITEMS = [
    { label: 'Início', icon: Home, to: '/dashboard' },
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

    const isActive = (path) => location.pathname === path

    return (
        <>
            {/* Overlay para mobile */}
            {isOpen && (
                <div
                    className="fixed inset-0 bg-black/50 z-30 md:hidden"
                    onClick={() => setIsOpen(false)}
                />
            )}

            {/* Sidebar */}
            <aside
                className={`fixed left-0 top-0 h-screen w-64 bg-gradient-to-b from-primary to-primary/95 text-white p-6 transition-transform duration-300 z-40 md:z-auto md:relative md:translate-x-0 ${
                    isOpen ? 'translate-x-0' : '-translate-x-full'
                }`}
            >
                {/* Header com logo */}
                <div className="flex items-center justify-between mb-8">
                    <div className="flex items-center gap-2">
                        <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
                            <span className="text-xl font-bold">A+</span>
                        </div>
                        <span className="text-xl font-bold">Aroê</span>
                    </div>
                    <button
                        onClick={() => setIsOpen(false)}
                        className="md:hidden p-2 hover:bg-white/10 rounded-lg"
                    >
                        <X size={20} />
                    </button>
                </div>

                {/* Menu principal */}
                <nav className="space-y-2 flex-1">
                    {MENU_ITEMS.map((item) => {
                        const Icon = item.icon
                        const active = isActive(item.to)
                        return (
                            <Link
                                key={item.to}
                                to={item.to}
                                onClick={() => setIsOpen(false)}
                                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors duration-200 ${
                                    active
                                        ? 'bg-white/20 text-white'
                                        : 'text-white/70 hover:text-white hover:bg-white/10'
                                }`}
                            >
                                <Icon size={20} />
                                <span className="font-medium text-sm">{item.label}</span>
                                {item.badge && (
                                    <span className="ml-auto bg-green-500 text-white text-xs font-semibold px-2 py-1 rounded-full">
                                        1
                                    </span>
                                )}
                            </Link>
                        )
                    })}
                </nav>

                {/* Menu inferior */}
                <nav className="space-y-2 border-t border-white/10 pt-4">
                    {BOTTOM_MENU_ITEMS.map((item) => {
                        const Icon = item.icon
                        const active = isActive(item.to)
                        return (
                            <Link
                                key={item.to}
                                to={item.to}
                                onClick={() => setIsOpen(false)}
                                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors duration-200 ${
                                    active
                                        ? 'bg-white/20 text-white'
                                        : 'text-white/70 hover:text-white hover:bg-white/10'
                                }`}
                            >
                                <Icon size={20} />
                                <span className="font-medium text-sm">{item.label}</span>
                            </Link>
                        )
                    })}
                </nav>
            </aside>
        </>
    )
}
