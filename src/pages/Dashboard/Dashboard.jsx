import { useState } from 'react'
import { Outlet } from 'react-router-dom'
import DashboardSidebar from '../../components/layout/DashboardSidebar'
import DashboardHeader from '../../components/layout/DashboardHeader'
import { useThemeContext } from '../../contexts/ThemeContext'

export default function Dashboard() {
    const [sidebarOpen, setSidebarOpen] = useState(false)
    const { highContrast } = useThemeContext()

    const bgLayoutClass = highContrast
        ? 'bg-white text-black dark:bg-black dark:text-white'
        : 'bg-gray-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100'

    return (
        <div className={`flex h-screen overflow-hidden transition-colors duration-500 ${bgLayoutClass}`}>
            {/* Sidebar */}
            <DashboardSidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />

            {/* Main content */}
            <div className="flex-1 flex flex-col overflow-hidden">
                {/* Header Dinâmico capturando dados injetados automaticamente */}
                <DashboardHeader
                    onMenuClick={() => setSidebarOpen(!sidebarOpen)}
                />

                {/* Content */}
                <main className="flex-1 overflow-auto">
                    <div className="p-4 sm:p-6 max-w-7xl mx-auto w-full">
                        {/* O Outlet renderizará telas como "Receitas.jsx", que lerão as listas do Ricardo ou da Irene do localStorage */}
                        <Outlet />
                    </div>
                </main>
            </div>
        </div>
    )
}