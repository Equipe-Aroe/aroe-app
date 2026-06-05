/* eslint-disable react/prop-types */
import { useState } from 'react'
import { Menu, Search, LogOut, User, Settings, Sun, Moon } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { useThemeContext } from '../../contexts/ThemeContext' // Ajuste o caminho do context conforme seu projeto
import AccessibilityToolbar from '../../components/layout/AccessibilityToolbar' // Ajuste o caminho do toolbar conforme seu projeto

export default function DashboardHeader({ userName = 'Amanda', onMenuClick }) {
    const navigate = useNavigate()
    const { darkMode, toggleDarkMode } = useThemeContext()
    const [isProfileOpen, setIsProfileOpen] = useState(false)

    const handleLogout = () => {
        // Limpar dados da sessão aqui se necessário
        navigate('/login')
    }

    return (
        <header className="bg-white dark:bg-slate-950 border-b border-gray-200 dark:border-slate-900 sticky top-0 z-20 transition-colors duration-500">
            <div className="flex items-center justify-between px-6 py-4">
                
                {/* Left side - Menu mobile + greeting */}
                <div className="flex items-center gap-4">
                    <button
                        onClick={onMenuClick}
                        className="md:hidden p-2 hover:bg-gray-100 dark:hover:bg-slate-900 rounded-lg transition-colors text-slate-700 dark:text-slate-300"
                    >
                        <Menu size={24} />
                    </button>
                    <div>
                        <h1 className="text-xl sm:text-2xl font-bold text-primary dark:text-white transition-colors">
                            Olá, {userName}!
                        </h1>
                        <p className="text-xs sm:text-sm text-gray-500 dark:text-slate-400">
                            Seu cuidado continua hoje
                        </p>
                    </div>
                </div>

                {/* Middle - Search (Desktop) */}
                <div className="hidden md:flex flex-1 max-w-md mx-8">
                    <div className="w-full relative">
                        <Search size={20} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-slate-500" />
                        <input
                            type="text"
                            placeholder="Buscar"
                            className="w-full pl-10 pr-4 py-2 bg-gray-50 dark:bg-slate-900 text-slate-900 dark:text-white border border-gray-200 dark:border-slate-800 rounded-lg focus:outline-none focus:border-secondary dark:focus:border-secondary transition-colors placeholder-gray-400 dark:placeholder-slate-500"
                        />
                    </div>
                </div>

                {/* Right side - Controles Globais + Perfil */}
                <div className="flex items-center gap-2 sm:gap-4">
                    
                    {/* Botão Dark Mode */}
                    <button
                        type="button"
                        onClick={toggleDarkMode}
                        className="p-2 rounded-lg text-slate-500 dark:text-slate-400 hover:bg-gray-100 dark:hover:bg-slate-900 transition-colors focus:outline-none focus:ring-2 focus:ring-secondary"
                        title={darkMode ? "Ativar Modo Claro" : "Ativar Modo Escuro"}
                    >
                        {darkMode ? <Sun size={20} /> : <Moon size={20} />}
                    </button>

                    {/* Botão de Acessibilidade (Abrindo para baixo com segurança) */}
                    <div className="text-slate-500 dark:text-slate-400">
                        <AccessibilityToolbar position="down" />
                    </div>

                    <div className="w-[1px] h-6 bg-gray-200 dark:bg-slate-800 mx-1 hidden sm:block" />

                    {/* Menu Perfil c/ Dropdown On Hover */}
                    <div 
                        className="relative"
                        onMouseEnter={() => setIsProfileOpen(true)}
                        onMouseLeave={() => setIsProfileOpen(false)}
                    >
                        {/* Gatilho do Perfil */}
                        <button className="flex items-center gap-3 focus:outline-none group p-1 rounded-xl hover:bg-gray-50 dark:hover:bg-slate-900 transition-colors">
                            <div className="text-right hidden sm:block">
                                <p className="text-sm font-semibold text-primary dark:text-slate-200 group-hover:text-secondary transition-colors">
                                    {userName}
                                </p>
                                <p className="text-xs text-gray-500 dark:text-slate-400">Usuário</p>
                            </div>
                            
                            {/* Avatar em formato de iniciais */}
                            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-primary/80 dark:from-secondary dark:to-secondary/80 flex items-center justify-center text-white font-bold shadow-sm">
                                {userName.charAt(0).toUpperCase()}
                            </div>
                        </button>

                        {/* Dropdown Menu */}
                        <div className={`absolute right-0 mt-1 w-48 bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-800 rounded-xl shadow-lg py-2 z-50 transition-all duration-200 origin-top-right ${
                            isProfileOpen 
                                ? 'opacity-100 scale-100 translate-y-0 visible' 
                                : 'opacity-0 scale-95 -translate-y-2 invisible pointer-events-none'
                        }`}>
                            <div className="px-4 py-2 border-b border-gray-100 dark:border-slate-800 sm:hidden">
                                <p className="text-sm font-semibold text-primary dark:text-white">{userName}</p>
                                <p className="text-xs text-gray-500">Usuário</p>
                            </div>

                            <button className="w-full flex items-center gap-2 px-4 py-2 text-sm text-slate-600 dark:text-slate-300 hover:bg-gray-50 dark:hover:bg-slate-800 transition-colors text-left">
                                <User size={16} /> Meu Perfil
                            </button>
                            
                            <button className="w-full flex items-center gap-2 px-4 py-2 text-sm text-slate-600 dark:text-slate-300 hover:bg-gray-50 dark:hover:bg-slate-800 transition-colors text-left">
                                <Settings size={16} /> Configurações
                            </button>

                            <div className="h-[1px] bg-gray-100 dark:bg-slate-800 my-1" />

                            <button 
                                onClick={handleLogout}
                                className="w-full flex items-center gap-2 px-4 py-2 text-sm text-red-500 hover:bg-red-50 dark:hover:bg-red-950/30 transition-colors text-left font-medium"
                            >
                                <LogOut size={16} /> Sair da conta
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Mobile Search */}
            <div className="md:hidden px-6 pb-4">
                <div className="relative">
                    <Search size={20} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-slate-500" />
                    <input
                        type="text"
                        placeholder="Buscar"
                        className="w-full pl-10 pr-4 py-2 bg-gray-50 dark:bg-slate-900 text-slate-900 dark:text-white border border-gray-200 dark:border-slate-800 rounded-lg focus:outline-none focus:border-secondary dark:focus:border-secondary transition-colors placeholder-gray-400 dark:placeholder-slate-500"
                    />
                </div>
            </div>
        </header>
    )
}