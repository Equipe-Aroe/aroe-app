import { useState } from 'react'
import { Outlet } from 'react-router-dom'
import DashboardSidebar from '../../components/layout/DashboardSidebar'
import DashboardHeader from '../../components/layout/DashboardHeader'
import { useThemeContext } from '../../contexts/ThemeContext' // Importação do contexto global de tema

export default function Dashboard() {
    const [sidebarOpen, setSidebarOpen] = useState(false)
    const { highContrast } = useThemeContext()

    // Define o fundo do layout de acordo com o modo escuro ou de alto contraste
    const bgLayoutClass = highContrast
        ? 'bg-white text-black dark:bg-black dark:text-white' // No alto contraste, ou é fundo branco puro ou preto puro
        : 'bg-gray-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100' // Transição normal do light para dark slate

    return (
        <div className={`flex h-screen overflow-hidden transition-colors duration-500 ${bgLayoutClass}`}>
            {/* Sidebar */}
            <DashboardSidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />

            {/* Main content */}
            <div className="flex-1 flex flex-col overflow-hidden">
                {/* Header */}
                <DashboardHeader
                    userName="Amanda"
                    onMenuClick={() => setSidebarOpen(!sidebarOpen)}
                />

                {/* Content */}
                <main className="flex-1 overflow-auto">
                    <div className="p-4 sm:p-6 max-w-7xl mx-auto w-full">
                        <Outlet />
                    </div>
                </main>
            </div>
        </div>
    )
}