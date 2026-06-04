import { useState } from 'react'
import { Outlet } from 'react-router-dom'
import DashboardSidebar from '../../components/layout/DashboardSidebar'
import DashboardHeader from '../../components/layout/DashboardHeader'
import DashboardHome from './sections/DashboardHome'

export default function Dashboard() {
    const [sidebarOpen, setSidebarOpen] = useState(false)

    return (
        <div className="flex h-screen bg-gray-50">
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
                    <div className="p-6">
                        <Outlet />
                    </div>
                </main>
            </div>
        </div>
    )
}
