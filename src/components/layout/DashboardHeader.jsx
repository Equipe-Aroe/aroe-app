/* eslint-disable react/prop-types */
import { useState, useRef, useEffect } from 'react'
import {
    Menu, Search, LogOut, User, Settings, Sun, Moon, Bell, Eye,
    Tag, Package, FileText, CheckCircle2, Gift, Heart, ChevronRight
} from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { useThemeContext } from '../../contexts/ThemeContext'
import AccessibilityToolbar from '../../components/layout/AccessibilityToolbar'

const LOCAL_STORAGE_KEY = 'aroe_user_profile'
const DEMO_STORAGE_KEY = '@Aroe:demo_session'

// Mapeia o "iconType" salvo nos dados de notificação para o ícone real do lucide-react
const NOTIF_ICONS = {
    tag: Tag,
    package: Package,
    bell: Bell,
    fileText: FileText,
    checkCircle2: CheckCircle2,
    gift: Gift,
    heart: Heart
}

function getNotifIcon(iconType) {
    return NOTIF_ICONS[iconType] || Bell
}

// Lê nome, avatar e notificações da sessão demo (personas) ou do perfil salvo em produção
function loadSessionData() {
    const demoData = localStorage.getItem(DEMO_STORAGE_KEY)
    if (demoData) {
        try {
            const session = JSON.parse(demoData)
            const nome = session.user?.nome ? session.user.nome.split(' ')[0] : 'Usuário'

            let avatar = 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=120&h=120&q=80'
            if (session.user?.nome?.includes('Ricardo')) {
                avatar = 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&h=120&q=80'
            } else if (session.user?.nome?.includes('Irene')) {
                avatar = 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=120&h=120&q=80'
            }

            return {
                displayName: nome,
                avatarUrl: avatar,
                notifications: Array.isArray(session.notificacoes) ? session.notificacoes : [],
                isDemo: true
            }
        } catch {
            // ignora JSON inválido e cai no fallback de produção
        }
    }

    const savedData = localStorage.getItem(LOCAL_STORAGE_KEY)
    if (savedData) {
        try {
            const profile = JSON.parse(savedData)
            return {
                displayName: profile.nome ? profile.nome.split(' ')[0] : 'Amanda',
                avatarUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=120&h=120&q=80',
                notifications: Array.isArray(profile.notificacoes) ? profile.notificacoes : [],
                isDemo: false
            }
        } catch {
            // ignora e usa default abaixo
        }
    }

    return {
        displayName: 'Amanda',
        avatarUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=120&h=120&q=80',
        notifications: [],
        isDemo: false
    }
}

export default function DashboardHeader({ onMenuClick, onNavigateSection }) {
    const navigate = useNavigate()
    const { darkMode, toggleDarkMode } = useThemeContext()
    const [isProfileOpen, setIsProfileOpen] = useState(false)
    const [isNotifOpen, setIsNotifOpen] = useState(false)
    const dropdownRef = useRef(null)
    const notifDropdownRef = useRef(null)

    // Estado reativo para o Nome do Usuário (Suporta Produção e a Demo das Personas)
    const [displayName, setDisplayName] = useState(() => loadSessionData().displayName)

    // Estado reativo para a Foto do Avatar baseado na persona escolhida
    const [avatarUrl, setAvatarUrl] = useState(() => loadSessionData().avatarUrl)

    // Estado reativo para as notificações da persona / perfil ativo
    const [notifications, setNotifications] = useState(() => loadSessionData().notifications)

    const unreadCount = notifications.filter((n) => !n.lida).length

    // Escuta atualizações do perfil em tempo real (nome, avatar e notificações)
    useEffect(() => {
        const handleProfileUpdate = () => {
            const session = loadSessionData()
            setDisplayName(session.displayName)
            setAvatarUrl(session.avatarUrl)
            setNotifications(session.notifications)
        }

        window.addEventListener('profileUpdated', handleProfileUpdate)
        return () => window.removeEventListener('profileUpdated', handleProfileUpdate)
    }, [])

    const handleLogout = () => {
        localStorage.removeItem('@Aroe:demo_session');
        localStorage.removeItem('@Aroe:dashboard_mode');
        navigate('/login');
    }

    const handleMenuOptionClick = (sectionId) => {
        setIsProfileOpen(false)
        if (onNavigateSection) {
            onNavigateSection(sectionId)
        } else {
            if (sectionId === 'dados') {
                navigate('/dashboard/perfil')
            } else {
                navigate('/dashboard/configuracoes')
            }
        }
    }

    const toggleNotifications = () => {
        setIsProfileOpen(false)
        setIsNotifOpen((prev) => !prev)
    }

    const toggleProfile = () => {
        setIsNotifOpen(false)
        setIsProfileOpen((prev) => !prev)
    }

    const handleNotificationClick = (id) => {
        setNotifications((prev) => prev.map((n) => (n.id === id ? { ...n, lida: true } : n)))
    }

    const handleMarkAllRead = () => {
        setNotifications((prev) => prev.map((n) => ({ ...n, lida: true })))
    }

    const handleViewAllNotifications = () => {
        setIsNotifOpen(false)
        if (onNavigateSection) {
            onNavigateSection('notificacoes')
        } else {
            navigate('/dashboard/notificacoes')
        }
    }

    useEffect(() => {
        function handleClickOutside(event) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsProfileOpen(false)
            }
            if (notifDropdownRef.current && !notifDropdownRef.current.contains(event.target)) {
                setIsNotifOpen(false)
            }
        }
        function handleEscape(event) {
            if (event.key === 'Escape') {
                setIsProfileOpen(false)
                setIsNotifOpen(false)
            }
        }
        document.addEventListener('mousedown', handleClickOutside)
        document.addEventListener('keydown', handleEscape)
        return () => {
            document.removeEventListener('mousedown', handleClickOutside)
            document.removeEventListener('keydown', handleEscape)
        }
    }, [])

    return (
        <header className="bg-white/80 dark:bg-slate-950/80 backdrop-blur-md border-b border-slate-100 dark:border-slate-900/60 sticky top-0 z-20 transition-all duration-300">
            <div className="flex items-center justify-between px-6 py-3.5 max-w-7xl mx-auto w-full">
                
                {/* Left side */}
                <div className="flex items-center gap-4">
                    <button
                        onClick={onMenuClick}
                        className="md:hidden p-2 hover:bg-slate-50 dark:hover:bg-slate-900 rounded-xl transition-colors text-slate-600 dark:text-slate-400"
                    >
                        <Menu size={22} />
                    </button>
                    <div>
                        <h1 className="text-lg font-bold tracking-tight text-slate-900 dark:text-white flex items-center gap-2">
                            Olá, {displayName}
                        </h1>
                        <p className="text-xs text-slate-400 dark:text-slate-500 hidden sm:block">
                            {localStorage.getItem(DEMO_STORAGE_KEY) ? 'Modo de Demonstração Interativo' : 'Seu painel de saúde e bem-estar'}
                        </p>
                    </div>
                </div>

                {/* Middle - Search */}
                <div className="hidden md:flex flex-1 max-w-md mx-8">
                    <div className="w-full relative">
                        <Search size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500" />
                        <input
                            type="text"
                            placeholder="Buscar receitas, pedidos ou farmácias..."
                            className="w-full pl-11 pr-4 py-2 bg-slate-50 dark:bg-slate-900/60 text-slate-900 dark:text-slate-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500/20 dark:focus:ring-purple-400/20 focus:bg-white dark:focus:bg-slate-900 transition-all text-sm placeholder-slate-400 dark:placeholder-slate-500"
                        />
                    </div>
                </div>

                {/* Right side */}
                <div className="flex items-center gap-1 sm:gap-3">
                    {/* Notificações */}
                    <div className="relative" ref={notifDropdownRef}>
                        <button
                            onClick={toggleNotifications}
                            className="relative p-2 rounded-xl text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-900 transition-all"
                            title="Notificações"
                        >
                            <Bell size={20} />
                            {unreadCount > 0 && (
                                <span className="absolute top-1 right-1 min-w-[16px] h-4 px-1 flex items-center justify-center rounded-full bg-rose-500 text-white text-[10px] font-bold leading-none ring-2 ring-white dark:ring-slate-950">
                                    {unreadCount > 9 ? '9+' : unreadCount}
                                </span>
                            )}
                        </button>

                        <div className={`absolute right-0 mt-2 w-80 sm:w-96 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800/80 rounded-2xl shadow-xl z-50 transition-all duration-200 origin-top-right overflow-hidden ${
                            isNotifOpen ? 'opacity-100 scale-100 translate-y-0 visible' : 'opacity-0 scale-95 -translate-y-2 invisible pointer-events-none'
                        }`}>
                            <div className="flex items-center justify-between px-4 py-3 border-b border-slate-50 dark:border-slate-800/60">
                                <p className="text-sm font-bold text-slate-800 dark:text-slate-200">Notificações</p>
                                {unreadCount > 0 && (
                                    <button
                                        onClick={handleMarkAllRead}
                                        className="text-[11px] font-semibold text-purple-600 dark:text-purple-400 hover:underline"
                                    >
                                        Marcar todas como lidas
                                    </button>
                                )}
                            </div>

                            <div className="max-h-80 overflow-y-auto divide-y divide-slate-50 dark:divide-slate-800/60">
                                {notifications.length === 0 ? (
                                    <div className="px-4 py-8 text-center text-sm text-slate-400 dark:text-slate-500">
                                        Nenhuma notificação por enquanto.
                                    </div>
                                ) : (
                                    notifications.slice(0, 6).map((notif) => {
                                        const NotifIcon = getNotifIcon(notif.iconType)
                                        return (
                                            <button
                                                key={notif.id}
                                                onClick={() => handleNotificationClick(notif.id)}
                                                className={`w-full flex items-start gap-3 px-4 py-3 text-left transition-colors hover:bg-slate-50 dark:hover:bg-slate-800/40 ${
                                                    !notif.lida ? 'bg-purple-50/40 dark:bg-purple-950/10' : ''
                                                }`}
                                            >
                                                <div className={`shrink-0 w-9 h-9 rounded-xl flex items-center justify-center ${notif.iconBg}`}>
                                                    <NotifIcon size={16} />
                                                </div>
                                                <div className="flex-1 min-w-0">
                                                    <div className="flex items-center gap-1.5">
                                                        {!notif.lida && (
                                                            <span className="w-1.5 h-1.5 rounded-full bg-purple-500 shrink-0" />
                                                        )}
                                                        <p className="text-sm font-semibold text-slate-800 dark:text-slate-200 truncate">
                                                            {notif.titulo}
                                                        </p>
                                                    </div>
                                                    <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2 mt-0.5">
                                                        {notif.descricao}
                                                    </p>
                                                    <p className="text-[11px] text-slate-400 dark:text-slate-500 mt-1">
                                                        {notif.tempo}
                                                    </p>
                                                </div>
                                            </button>
                                        )
                                    })
                                )}
                            </div>

                            <button
                                onClick={handleViewAllNotifications}
                                className="w-full flex items-center justify-center gap-1 px-4 py-2.5 text-sm font-semibold text-purple-600 dark:text-purple-400 hover:bg-slate-50 dark:hover:bg-slate-800/40 border-t border-slate-50 dark:border-slate-800/60 transition-colors"
                            >
                                Ver todas as notificações
                                <ChevronRight size={15} />
                            </button>
                        </div>
                    </div>

                    <button
                        type="button"
                        onClick={toggleDarkMode}
                        className="p-2 rounded-xl text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-900 transition-all focus:outline-none"
                        title={darkMode ? "Modo Claro" : "Modo Escuro"}
                    >
                        {darkMode ? <Sun size={20} /> : <Moon size={20} />}
                    </button>

                    <div className="relative group p-2 rounded-xl text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-900 transition-all cursor-pointer">
                        <AccessibilityToolbar 
                            position="down" 
                            customButton={<Eye size={20} title="Opções de Acessibilidade" />} 
                        />
                    </div>

                    <div className="w-[1px] h-5 bg-slate-200 dark:bg-slate-800 mx-1 hidden sm:block" />

                    {/* Menu Perfil */}
                    <div className="relative" ref={dropdownRef}>
                        <button 
                            onClick={toggleProfile}
                            className="flex items-center gap-3 focus:outline-none p-1 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-900 transition-all"
                        >
                            <div className="relative w-9 h-9 rounded-full bg-purple-100 dark:bg-purple-950 flex items-center justify-center overflow-hidden ring-2 ring-slate-100 dark:ring-slate-900">
                                <img 
                                    src={avatarUrl}
                                    alt={displayName}
                                    className="w-full h-full object-cover"
                                    onError={(e) => { e.target.style.display = 'none' }}
                                />
                                <span className="absolute text-sm font-bold text-purple-600 dark:text-purple-300 z-[-1]">
                                    {displayName.charAt(0).toUpperCase()}
                                </span>
                            </div>
                        </button>

                        <div className={`absolute right-0 mt-2 w-52 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800/80 rounded-2xl shadow-xl py-2 z-50 transition-all duration-200 origin-top-right ${
                            isProfileOpen ? 'opacity-100 scale-100 translate-y-0 visible' : 'opacity-0 scale-95 -translate-y-2 invisible pointer-events-none'
                        }`}>
                            <div className="px-4 py-2.5 border-b border-slate-50 dark:border-slate-800/60">
                                <p className="text-sm font-bold text-slate-800 dark:text-slate-200">{displayName}</p>
                                <p className="text-[11px] text-slate-400 dark:text-slate-500">
                                    {localStorage.getItem(DEMO_STORAGE_KEY) ? 'Acesso Simulado' : 'Paciente Verificado'}
                                </p>
                            </div>

                            <div className="p-1.5 space-y-0.5">
                                <button onClick={() => handleMenuOptionClick('dados')} className="w-full flex items-center gap-2.5 px-3 py-2 text-sm text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800/60 rounded-xl transition-colors text-left">
                                    <User size={16} className="text-slate-400" /> Meu Perfil
                                </button>
                                <button onClick={() => handleMenuOptionClick('configuracoes')} className="w-full flex items-center gap-2.5 px-3 py-2 text-sm text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800/60 rounded-xl transition-colors text-left">
                                    <Settings size={16} className="text-slate-400" /> Configurações
                                </button>
                                <div className="h-[1px] bg-slate-100 dark:bg-slate-800/60 my-1 mx-1" />
                                <button onClick={handleLogout} className="w-full flex items-center gap-2.5 px-3 py-2 text-sm text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/20 rounded-xl transition-colors text-left font-medium">
                                    <LogOut size={16} /> Sair do Painel
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Mobile Search */}
            <div className="md:hidden px-6 pb-3.5">
                <div className="relative">
                    <Search size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500" />
                    <input
                        type="text"
                        placeholder="Buscar receitas ou pedidos..."
                        className="w-full pl-11 pr-4 py-2 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500/20 transition-all text-sm"
                    />
                </div>
            </div>
        </header>
    )
}