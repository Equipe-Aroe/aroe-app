import { useState } from 'react'
import { BarChart3, Users, Boxes, PackageCheck, AlertCircle, TrendingUp, DollarSign, Clock } from 'lucide-react'
import { useThemeContext } from '../../../../contexts/ThemeContext'

// Componente de Card de Estatística
const StatCard = ({ title, value, change, icon: Icon, color }) => {
    const { highContrast } = useThemeContext()
    const cardBg = highContrast ? 'border-4 border-black' : 'bg-white dark:bg-slate-900 border border-gray-100 dark:border-slate-800'
    
    return (
        <div className={`${cardBg} p-5 rounded-2xl shadow-sm flex items-start justify-between`}>
            <div>
                <p className="text-xs font-semibold text-gray-500 dark:text-slate-400 uppercase tracking-wider">{title}</p>
                <h3 className="text-2xl font-bold mt-1 text-gray-900 dark:text-white">{value}</h3>
                <span className={`text-xs font-medium mt-2 block ${change.startsWith('+') ? 'text-emerald-500' : 'text-red-500'}`}>
                    {change} em relação a ontem
                </span>
            </div>
            <div className={`p-3 rounded-xl ${color} bg-opacity-10 dark:bg-opacity-20`}>
                <Icon size={20} className={color.replace('bg-', 'text-')} />
            </div>
        </div>
    )
}

export default function PharmacyDashboard() {
    const { highContrast } = useThemeContext()
    
    // Simulação de dados
    const pendingOrders = [
        { id: '#A-1024', customer: 'João Silva', time: '10 min', status: 'Preparando' },
        { id: '#A-1025', customer: 'Maria Souza', time: '25 min', status: 'Aguardando Coleta' },
        { id: '#A-1026', customer: 'Carlos Lima', time: '45 min', status: 'Pendente' },
    ]

    return (
        <div className="p-6 space-y-8 animate-fade-in max-w-7xl mx-auto">
            
            {/* Header */}
            <div>
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Visão Geral da Farmácia</h1>
                <p className="text-sm text-gray-500 dark:text-slate-400">Bem-vindo de volta! Confira o resumo das operações de hoje.</p>
            </div>

            {/* KPIs */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatCard title="Vendas Hoje" value="R$ 4.250,00" change="+12%" icon={DollarSign} color="bg-blue-600" />
                <StatCard title="Pedidos Pendentes" value="14" change="-3%" icon={PackageCheck} color="bg-amber-600" />
                <StatCard title="Estoque Baixo" value="8 itens" change="+2" icon={AlertCircle} color="bg-rose-600" />
                <StatCard title="Clientes Ativos" value="128" change="+5%" icon={Users} color="bg-purple-600" />
            </div>

            {/* Área de Ação e Pedidos */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                
                {/* Pedidos em tempo real */}
                <div className={`lg:col-span-2 ${highContrast ? 'border-4 border-black' : 'bg-white dark:bg-slate-900 border border-gray-100 dark:border-slate-800'} p-6 rounded-2xl shadow-sm`}>
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="font-bold text-lg">Pedidos Recentes</h2>
                        <button className="text-xs font-semibold text-purple-600 hover:underline">Ver todos</button>
                    </div>
                    
                    <div className="space-y-4">
                        {pendingOrders.map((order) => (
                            <div key={order.id} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-slate-950 rounded-xl border border-gray-100 dark:border-slate-800">
                                <div className="flex items-center gap-4">
                                    <div className="bg-purple-100 dark:bg-purple-900/30 p-2 rounded-lg">
                                        <PackageCheck size={18} className="text-purple-600" />
                                    </div>
                                    <div>
                                        <p className="font-semibold text-sm">{order.id} - {order.customer}</p>
                                        <p className="text-xs text-gray-500">{order.status}</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-2 text-xs font-medium text-gray-500">
                                    <Clock size={14} />
                                    {order.time}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Atalhos Rápidos */}
                <div className="space-y-4">
                    <h2 className="font-bold text-lg">Ações Rápidas</h2>
                    <button className="w-full flex items-center justify-between p-4 bg-purple-600 text-white rounded-2xl hover:bg-purple-700 transition shadow-lg shadow-purple-500/20">
                        <span className="font-medium">Novo Pedido Manual</span>
                        <TrendingUp size={18} />
                    </button>
                    <button className={`w-full flex items-center justify-between p-4 ${highContrast ? 'border-2 border-black' : 'bg-white dark:bg-slate-900 border border-gray-100 dark:border-slate-800'} rounded-2xl hover:bg-gray-50 dark:hover:bg-slate-800 transition`}>
                        <span className="font-medium">Reposição de Estoque</span>
                        <Boxes size={18} />
                    </button>
                    <button className={`w-full flex items-center justify-between p-4 ${highContrast ? 'border-2 border-black' : 'bg-white dark:bg-slate-900 border border-gray-100 dark:border-slate-800'} rounded-2xl hover:bg-gray-50 dark:hover:bg-slate-800 transition`}>
                        <span className="font-medium">Relatório do Dia</span>
                        <BarChart3 size={18} />
                    </button>
                </div>
            </div>
        </div>
    )
}