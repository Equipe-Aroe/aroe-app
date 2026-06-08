/* eslint-disable react/prop-types */
import { useState, useRef, useEffect } from 'react'
import { Menu, Search, LogOut, User, Settings, Sun, Moon, Bell, Eye } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { useThemeContext } from '../../contexts/ThemeContext'
import AccessibilityToolbar from '../../components/layout/AccessibilityToolbar'

const LOCAL_STORAGE_KEY = 'aroe_user_profile'
const DEMO_STORAGE_KEY = '@Aroe:demo_session'

export default function DashboardHeader({ onMenuClick, onNavigateSection }) {
    const navigate = useNavigate()
    const { darkMode, toggleDarkMode } = useThemeContext()
    const [isProfileOpen, setIsProfileOpen] = useState(false)
    const dropdownRef = useRef(null)

    // Estado reativo para o Nome do Usuário (Suporta Produção e a Demo das Personas)
    const [displayName, setDisplayName] = useState(() => {
        const demoData = localStorage.getItem(DEMO_STORAGE_KEY)
        if (demoData) {
            const session = JSON.parse(demoData)
            return session.user?.nome ? session.user.nome.split(' ')[0] : 'Usuário'
        }

        const savedData = localStorage.getItem(LOCAL_STORAGE_KEY)
        if (savedData) {
            const profile = JSON.parse(savedData)
            return profile.nome ? profile.nome.split(' ')[0] : 'Amanda'
        }
        return 'Amanda'
    })

    // Estado reativo para a Foto do Avatar baseado na persona escolhida
    const [avatarUrl, setAvatarUrl] = useState(() => {
        const demoData = localStorage.getItem(DEMO_STORAGE_KEY)
        if (demoData) {
            const session = JSON.parse(demoData)
            // Fotos condizentes com o Ricardo ou com a Dona Irene
            if (session.user?.nome?.includes('Ricardo')) {
                return 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&h=120&q=80' // Ricardo (mock)
            }
            if (session.user?.nome?.includes('Irene')) {
                return 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=120&h=120&q=80' // Dona Irene (mock)
            }
        }
        // Avatar padrão da Amanda
        return 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=120&h=120&q=80'
    })

    // Escuta atualizações do perfil em tempo real
    useEffect(() => {
        const handleProfileUpdate = () => {
            const demoData = localStorage.getItem(DEMO_STORAGE_KEY)
            if (demoData) {
                const session = JSON.parse(demoData)
                setDisplayName(session.user?.nome ? session.user.nome.split(' ')[0] : 'Usuário')
                return
            }

            const savedData = localStorage.getItem(LOCAL_STORAGE_KEY)
            if (savedData) {
                const profile = JSON.parse(savedData)
                if (profile.nome) {
                    setDisplayName(profile.nome.split(' ')[0])
                }
            }
        }

        window.addEventListener('profileUpdated', handleProfileUpdate)
        return () => window.removeEventListener('profileUpdated', handleProfileUpdate)
    }, [])

    const handleLogout = () => {
        // Limpa a sessão demo ao deslogar para não travar a aplicação no perfil da persona
        localStorage.removeItem(DEMO_STORAGE_KEY)
        navigate('/login')
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

    useEffect(() => {
        function handleClickOutside(event) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsProfileOpen(false)
            }
        }
        document.addEventListener('mousedown', handleClickOutside)
        return () => document.removeEventListener('mousedown', handleClickOutside)
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
                            Olá, {displayName} {localStorage.getItem(DEMO_STORAGE_KEY) ? '⚡' : '✨'}
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
                    <button className="p-2 rounded-xl text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-900 transition-all">
                        <Bell size={20} />
                    </button>

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
                            onClick={() => setIsProfileOpen(!isProfileOpen)}
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