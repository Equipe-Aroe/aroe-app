import { Menu, Search, LogOut } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

export default function DashboardHeader({ userName = 'Amanda', userImage = '', onMenuClick }) {
    const navigate = useNavigate()

    const handleLogout = () => {
        // Limpar dados da sessão aqui
        navigate('/login')
    }

    return (
        <header className="bg-white border-b border-gray-200 sticky top-0 z-20">
            <div className="flex items-center justify-between px-6 py-4">
                {/* Left side - Menu mobile + greeting */}
                <div className="flex items-center gap-4">
                    <button
                        onClick={onMenuClick}
                        className="md:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors"
                    >
                        <Menu size={24} className="text-gray-700" />
                    </button>
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900">Olá, {userName}!</h1>
                        <p className="text-sm text-gray-500">Seu cuidado continua hoje</p>
                    </div>
                </div>

                {/* Middle - Search */}
                <div className="hidden md:flex flex-1 max-w-md mx-8">
                    <div className="w-full relative">
                        <Search size={20} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Buscar"
                            className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:border-primary focus:bg-white transition-colors"
                        />
                    </div>
                </div>

                {/* Right side - User profile + Logout */}
                <div className="flex items-center gap-4">
                    <div className="flex items-center gap-3">
                        <div className="text-right hidden sm:block">
                            <p className="text-sm font-medium text-gray-900">{userName}</p>
                            <p className="text-xs text-gray-500">Usuário</p>
                        </div>
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-primary/70 flex items-center justify-center text-white font-bold">
                            {userName.charAt(0).toUpperCase()}
                        </div>
                    </div>
                    <button
                        onClick={handleLogout}
                        className="p-2 hover:bg-gray-100 rounded-lg transition-colors text-gray-700"
                        title="Sair"
                    >
                        <LogOut size={20} />
                    </button>
                </div>
            </div>

            {/* Mobile Search */}
            <div className="md:hidden px-6 pb-4">
                <div className="relative">
                    <Search size={20} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input
                        type="text"
                        placeholder="Buscar"
                        className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:border-primary focus:bg-white transition-colors"
                    />
                </div>
            </div>
        </header>
    )
}
