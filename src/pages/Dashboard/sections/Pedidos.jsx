import { useState } from 'react'
import { 
    Search, 
    Calendar, 
    Package, 
    MoreVertical, 
    ChevronLeft, 
    ChevronRight, 
    ChevronDown,
    Truck,
    CheckCircle,
    Clock,
    AlertCircle
} from 'lucide-react'
import { useThemeContext } from '../../../contexts/ThemeContext'

// Dados fakes simulando uma listagem real e elegante de pedidos de medicamentos/fórmulas
const PEDIDOS_MOCK = [
    {
        id: 1,
        codigo: '#122022',
        itens: 'Enzimas digestivas + Magnésio Quelato',
        data: '15/04/2026',
        valor: 'R$ 148,90',
        status: 'Em transporte',
        statusIcon: Truck,
        statusCor: 'bg-blue-50 text-blue-700 dark:bg-blue-950/40 dark:text-blue-400',
        atualizacao: 'Previsão de entrega: Hoje até as 18h'
    },
    {
        id: 2,
        codigo: '#121984',
        itens: 'Colágeno Tipo II - Dose Única',
        data: '10/04/2026',
        valor: 'R$ 89,00',
        status: 'Entregue',
        statusIcon: CheckCircle,
        statusCor: 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-400',
        atualizacao: 'Entregue em 12/04/2026'
    },
    {
        id: 3,
        codigo: '#121540',
        itens: 'Ômega 3 Ultra + Vitamina D3',
        data: '28/03/2026',
        valor: 'R$ 210,50',
        status: 'Processando pagamento',
        statusIcon: Clock,
        statusCor: 'bg-amber-50 text-amber-700 dark:bg-amber-950/40 dark:text-amber-400',
        atualizacao: 'Aguardando confirmação bancária'
    },
    {
        id: 4,
        codigo: '#120811',
        itens: 'Fórmula Manipulada Personalizada Antiox',
        data: '15/03/2026',
        valor: 'R$ 175,00',
        status: 'Cancelado',
        statusIcon: AlertCircle,
        statusCor: 'bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400',
        atualizacao: 'Cancelado pelo usuário'
    }
]

export default function DashboardPedidos() {
    const { highContrast } = useThemeContext()
    const [activeTab, setActiveTab] = useState('andamento') // 'andamento' ou 'historico'
    const [search, setSearch] = useState('')

    // Fallbacks visuais dinâmicos para o modo de Alto Contraste
    const cardBgClass = highContrast
        ? 'bg-white text-black border-2 border-black dark:bg-black dark:text-white dark:border-white'
        : 'bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800/60 shadow-sm'

    const inputClass = highContrast
        ? 'border-2 border-black bg-white text-black dark:border-white dark:bg-black dark:text-white'
        : 'bg-slate-50 dark:bg-slate-900 border border-transparent dark:border-slate-800 text-slate-900 dark:text-slate-100 focus:bg-white dark:focus:bg-slate-950 focus:ring-2 focus:ring-purple-500/20'

    const buttonSecondaryClass = highContrast
        ? 'border-2 border-black text-black dark:border-white dark:text-white'
        : 'border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800'

    return (
        <div className="space-y-6">
            {/* Título de seção Mobile (oculto no desktop para não duplicar com o Header principal) */}
            <div className="flex flex-col gap-1 md:hidden">
                <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Pedidos</h2>
                <p className="text-sm text-slate-500 dark:text-slate-400">
                    Acompanhe o status e a entrega dos seus medicamentos
                </p>
            </div>

            {/* Abas Superiores de Filtro por Fluxo */}
            <div className="flex items-center gap-6 border-b border-slate-100 dark:border-slate-800/60 pb-1">
                <button
                    onClick={() => setActiveTab('andamento')}
                    className={`pb-3 text-sm font-bold transition-all relative ${
                        activeTab === 'andamento'
                            ? 'text-emerald-600 dark:text-emerald-400'
                            : 'text-slate-400 dark:text-slate-500 hover:text-slate-600'
                    }`}
                >
                    Em andamento
                    {activeTab === 'andamento' && (
                        <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-emerald-500 dark:bg-emerald-400 rounded-full" />
                    )}
                </button>
                <button
                    onClick={() => setActiveTab('historico')}
                    className={`pb-3 text-sm font-bold transition-all relative ${
                        activeTab === 'historico'
                            ? 'text-emerald-600 dark:text-emerald-400'
                            : 'text-slate-400 dark:text-slate-500 hover:text-slate-600'
                    }`}
                >
                    Todos os pedidos
                    {activeTab === 'historico' && (
                        <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-emerald-500 dark:bg-emerald-400 rounded-full" />
                    )}
                </button>
            </div>

            {/* Filtros Clean */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="flex flex-wrap items-center gap-3 flex-1 w-full">
                    {/* Input Buscar */}
                    <div className="relative flex-1 min-w-[240px]">
                        <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                        <input
                            type="text"
                            placeholder="Buscar por código ou produto..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className={`w-full pl-10 pr-4 py-2 rounded-xl text-sm focus:outline-none transition-all ${inputClass}`}
                        />
                    </div>

                    {/* Filtro por Período */}
                    <button className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-medium transition-all ${buttonSecondaryClass}`}>
                        <Calendar size={14} className="text-slate-400" />
                        <span>Período: <strong className="font-semibold text-slate-800 dark:text-slate-200">Últimos 30 dias</strong></span>
                        <ChevronDown size={14} className="text-slate-400 ml-1" />
                    </button>

                    {/* Filtro por Status */}
                    <button className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-medium transition-all ${buttonSecondaryClass}`}>
                        <span>Status: <strong className="font-semibold text-slate-800 dark:text-slate-200">Todos</strong></span>
                        <ChevronDown size={14} className="text-slate-400 ml-1" />
                    </button>
                </div>
            </div>

            {/* Listagem de Cards de Pedidos */}
            <div className="space-y-3">
                {PEDIDOS_MOCK.map((pedido) => {
                    const StatusIcon = pedido.statusIcon
                    return (
                        <div 
                            key={pedido.id} 
                            className={`flex flex-col lg:flex-row lg:items-center justify-between p-5 rounded-2xl gap-4 transition-all ${cardBgClass}`}
                        >
                            {/* Bloco Esquerdo: Ícone + Info Produtos */}
                            <div className="flex items-start gap-4">
                                <div className="w-12 h-12 rounded-full bg-slate-50 dark:bg-slate-800 flex items-center justify-center text-slate-600 dark:text-slate-300 shrink-0">
                                    <Package size={22} />
                                </div>
                                <div className="space-y-1">
                                    <div className="flex items-center gap-2 flex-wrap">
                                        <h4 className="text-base font-bold text-slate-900 dark:text-white leading-tight">
                                            {pedido.itens}
                                        </h4>
                                    </div>
                                    <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-slate-400 dark:text-slate-500">
                                        <span className="font-bold text-emerald-600 dark:text-emerald-400">
                                            Código: {pedido.codigo}
                                        </span>
                                        <span className="flex items-center gap-1">
                                            <Calendar size={12} /> Realizado em {pedido.data}
                                        </span>
                                        <span className="font-semibold text-slate-700 dark:text-slate-300">
                                            {pedido.valor}
                                        </span>
                                    </div>
                                </div>
                            </div>

                            {/* Bloco Direito: Status de Rastreio + Botão Detalhes */}
                            <div className="flex items-center justify-between lg:justify-end gap-6 border-t lg:border-t-0 pt-3 lg:pt-0 border-slate-50 dark:border-slate-800/40">
                                <div className="text-left lg:text-right space-y-1">
                                    <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold ${pedido.statusCor}`}>
                                        <StatusIcon size={12} />
                                        {pedido.status}
                                    </span>
                                    <p className="text-[11px] text-slate-400 dark:text-slate-500 tracking-tight">
                                        {pedido.atualizacao}
                                    </p>
                                </div>

                                <div className="flex items-center gap-2">
                                    <button className={`px-4 py-1.5 rounded-xl text-xs font-bold transition-all ${buttonSecondaryClass}`}>
                                        Rastrear pedido
                                    </button>
                                    <button className="p-2 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-xl transition-all text-slate-400 hover:text-slate-600 dark:hover:text-slate-300">
                                        <MoreVertical size={16} />
                                    </button>
                                </div>
                            </div>
                        </div>
                    )
                })}
            </div>

            {/* Rodapé de Paginação */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-slate-100 dark:border-slate-800/60">
                <div className="flex items-center gap-1.5">
                    <button className={`p-2 rounded-lg transition-all ${buttonSecondaryClass}`}>
                        <ChevronLeft size={14} />
                    </button>
                    <button className="w-8 h-8 rounded-lg text-xs font-bold bg-emerald-600 text-white shadow-sm">
                        1
                    </button>
                    <button className={`w-8 h-8 rounded-lg text-xs font-bold transition-all ${buttonSecondaryClass}`}>
                        2
                    </button>
                    <button className={`p-2 rounded-lg transition-all ${buttonSecondaryClass}`}>
                        <ChevronRight size={14} />
                    </button>
                </div>

                <button className={`flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-medium transition-all ${buttonSecondaryClass}`}>
                    <span>10 por página</span>
                    <ChevronDown size={14} className="text-slate-400" />
                </button>
            </div>
        </div>
    )
}