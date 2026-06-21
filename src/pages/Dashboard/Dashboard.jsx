import { useState } from 'react'
import { Outlet, useNavigate } from 'react-router-dom' // Importado o useNavigate
import DashboardSidebar from '../../components/layout/DashboardSidebar'
import DashboardHeader from '../../components/layout/DashboardHeader'
import { useThemeContext } from '../../contexts/ThemeContext'

export default function Dashboard() {
    const [sidebarOpen, setSidebarOpen] = useState(false)
    const { highContrast } = useThemeContext()
    const navigate = useNavigate() // Instanciando o navegador de rotas

    const bgLayoutClass = highContrast
        ? 'bg-white text-black dark:bg-black dark:text-white'
        : 'bg-gray-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100'

    return (
        <div className={`flex h-screen overflow-hidden transition-colors duration-500 ${bgLayoutClass}`}>
            {/* Sidebar */}
            <DashboardSidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />

            {/* Main content */}
            <div className="flex-1 flex flex-col overflow-hidden">
                {/* Header Dinâmico */}
                <DashboardHeader
                    onMenuClick={() => setSidebarOpen(!sidebarOpen)}
                />

                {/* Content */}
                <main className="flex-1 overflow-auto">
                    <div className="p-4 sm:p-6 max-w-7xl mx-auto w-full">
                        {/* PASSANDO O NAVIGATE VIA CONTEXT PARA AS SUB-ROTAS */}
                        <Outlet context={{ onNavigateToTab: (route) => navigate(route) }} />
                    </div>
                </main>
            </div>
        </div>
    )
}