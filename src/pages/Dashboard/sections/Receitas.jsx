import { useState } from 'react'
import { 
    Search, 
    Calendar, 
    Tag, 
    Upload, 
    MoreVertical, 
    ChevronLeft, 
    ChevronRight, 
    ChevronDown,
    FileText 
} from 'lucide-react'
import { useThemeContext } from '../../../contexts/ThemeContext'

// Dados fakes baseados exatamente na imagem image_399849.png
const RECEITAS_MOCK = [
    {
        id: 1,
        nome: 'Enzimas digestivas',
        tipo: 'Fórmula manipulada',
        dataEnvio: '15/04/2025',
        pedidoId: '#122022',
        status: 'Em produção',
        statusCor: 'bg-purple-100 text-purple-700 dark:bg-purple-950/40 dark:text-purple-400',
        entregaInfo: 'Entregue em 15/04'
    },
    {
        id: 2,
        nome: 'Magnésio Quelato + B6',
        tipo: 'Fórmula manipulada',
        dataEnvio: '15/04/2025',
        pedidoId: '#122022',
        status: 'Aguardando orçamento',
        statusCor: 'bg-orange-100 text-orange-700 dark:bg-orange-950/40 dark:text-orange-400',
        entregaInfo: 'Entregue em 15/04'
    },
    {
        id: 3,
        nome: 'Colágeno Tipo II',
        tipo: 'Dose Única',
        dataEnvio: '15/04/2025',
        pedidoId: '#122022',
        status: 'Entregue',
        statusCor: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-400',
        entregaInfo: 'Entregue em 15/04'
    },
    {
        id: 4,
        nome: 'Ômega 3',
        tipo: 'Fórmula manipulada',
        dataEnvio: '15/04/2025',
        pedidoId: '#122022',
        status: 'Cancelado',
        statusCor: 'bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400',
        entregaInfo: 'Cancelado em 15/04'
    }
]

export default function DashboardReceitas() {
    const { highContrast } = useThemeContext()
    const [activeTab, setActiveTab] = useState('minhas') // 'minhas' ou 'arquivadas'
    const [search, setSearch] = useState('')

    // Definição de estilos baseados no Alto Contraste (seguindo seu padrão da Sidebar)
    const cardBgClass = highContrast
        ? 'bg-white text-black border-2 border-black dark:bg-black dark:text-white dark:border-white'
        : 'bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800/60 shadow-sm'

    const inputClass = highContrast
        ? 'border-2 border-black bg-white text-black dark:border-white dark:bg-black dark:text-white'
        : 'bg-slate-50 dark:bg-slate-900 border border-transparent dark:border-slate-800 text-slate-900 dark:text-slate-100 focus:bg-white dark:focus:bg-slate-950 focus:ring-2 focus:ring-purple-500/20'

    const buttonActionClass = highContrast
        ? 'bg-black text-white hover:bg-black/80 dark:bg-white dark:text-black'
        : 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-sm'

    const buttonSecondaryClass = highContrast
        ? 'border-2 border-black text-black dark:border-white dark:text-white'
        : 'border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800'

    return (
        <div className="space-y-6">
            {/* Cabeçalho Interno da Página (Subtítulo dinâmico alinhado com a imagem) */}
            <div className="flex flex-col gap-1 md:hidden">
                <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Receitas</h2>
                <p className="text-sm text-slate-500 dark:text-slate-400">
                    Gerencie suas receitas e acompanhe seus tratamentos
                </p>
            </div>

            {/* Abas (Tabs) - Minhas receitas / Receitas arquivadas */}
            <div className="flex items-center gap-6 border-b border-slate-100 dark:border-slate-800/60 pb-1">
                <button
                    onClick={() => setActiveTab('minhas')}
                    className={`pb-3 text-sm font-bold transition-all relative ${
                        activeTab === 'minhas'
                            ? 'text-emerald-600 dark:text-emerald-400'
                            : 'text-slate-400 dark:text-slate-500 hover:text-slate-600'
                    }`}
                >
                    Minhas receitas
                    {activeTab === 'minhas' && (
                        <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-emerald-500 dark:bg-emerald-400 rounded-full" />
                    )}
                </button>
                <button
                    onClick={() => setActiveTab('arquivadas')}
                    className={`pb-3 text-sm font-bold transition-all relative ${
                        activeTab === 'arquivadas'
                            ? 'text-emerald-600 dark:text-emerald-400'
                            : 'text-slate-400 dark:text-slate-500 hover:text-slate-600'
                    }`}
                >
                    Receitas arquivadas
                    {activeTab === 'arquivadas' && (
                        <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-emerald-500 dark:bg-emerald-400 rounded-full" />
                    )}
                </button>
            </div>

            {/* Barra de Filtros e Ferramentas */}
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                <div className="flex flex-wrap items-center gap-3 flex-1 max-w-3xl">
                    {/* Campo Buscar Local da Lista */}
                    <div className="relative flex-1 min-w-[200px]">
                        <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                        <input
                            type="text"
                            placeholder="Buscar"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className={`w-full pl-10 pr-4 py-2 rounded-xl text-sm focus:outline-none transition-all ${inputClass}`}
                        />
                    </div>

                    {/* Filtro Período */}
                    <button className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-medium transition-all ${buttonSecondaryClass}`}>
                        <Calendar size={14} className="text-slate-400" />
                        <span>Período: <strong className="font-semibold text-slate-800 dark:text-slate-200">Todos</strong></span>
                        <ChevronDown size={14} className="text-slate-400 ml-1" />
                    </button>

                    {/* Filtro Tipo */}
                    <button className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-medium transition-all ${buttonSecondaryClass}`}>
                        <span>Tipo: <strong className="font-semibold text-slate-800 dark:text-slate-200">Todos</strong></span>
                        <ChevronDown size={14} className="text-slate-400 ml-1" />
                    </button>

                    {/* Filtro Status */}
                    <button className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-medium transition-all ${buttonSecondaryClass}`}>
                        <span>Status: <strong className="font-semibold text-slate-800 dark:text-slate-200">Todos</strong></span>
                        <ChevronDown size={14} className="text-slate-400 ml-1" />
                    </button>
                </div>

                {/* Botão Enviar Receita */}
                <button className={`flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold transition-all shrink-0 ${buttonActionClass}`}>
                    <Upload size={16} />
                    Enviar receita
                </button>
            </div>

            {/* Lista de Receitas em Cards */}
            <div className="space-y-3">
                {RECEITAS_MOCK.map((receita) => (
                    <div 
                        key={receita.id} 
                        className={`flex flex-col sm:flex-row sm:items-center justify-between p-4 rounded-2xl gap-4 transition-all ${cardBgClass}`}
                    >
                        {/* Lado Esquerdo: Ícone + Infos Principais */}
                        <div className="flex items-start gap-4">
                            <div className="w-12 h-12 rounded-full bg-emerald-50 dark:bg-emerald-950/30 flex items-center justify-center text-emerald-600 dark:text-emerald-400 shrink-0">
                                <FileText size={22} />
                            </div>
                            <div className="space-y-1">
                                <h4 className="text-base font-bold text-slate-900 dark:text-white leading-tight">
                                    {receita.nome}
                                </h4>
                                <p className="text-xs text-slate-400 dark:text-slate-500">
                                    {receita.tipo}
                                </p>
                                <div className="flex flex-wrap items-center gap-x-4 gap-y-1 pt-1 text-xs text-slate-400 dark:text-slate-500">
                                    <span className="flex items-center gap-1">
                                        <Calendar size={12} /> Enviada em {receita.dataEnvio}
                                    </span>
                                    <span className="flex items-center gap-1 text-emerald-600 dark:text-emerald-400 font-medium">
                                        <Tag size={12} /> Pedido {receita.pedidoId}
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* Lado Direito: Status + Ações */}
                        <div className="flex items-center justify-between sm:justify-end gap-6 border-t sm:border-t-0 pt-3 sm:pt-0 border-slate-50 dark:border-slate-800/40">
                            <div className="text-left sm:text-right space-y-1">
                                <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${receita.statusCor}`}>
                                    {receita.status}
                                </span>
                                <p className="text-[11px] text-slate-400 dark:text-slate-500">
                                    {receita.entregaInfo}
                                </p>
                            </div>

                            <div className="flex items-center gap-2">
                                <button className={`px-4 py-1.5 rounded-xl text-xs font-bold transition-all ${buttonSecondaryClass}`}>
                                    Ver detalhes
                                </button>
                                <button className="p-2 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-xl transition-all text-slate-400 hover:text-slate-600 dark:hover:text-slate-300">
                                    <MoreVertical size={16} />
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Paginação Inferior */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-slate-100 dark:border-slate-800/60">
                {/* Controles de navegação numérica */}
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
                    <button className={`w-8 h-8 rounded-lg text-xs font-bold transition-all ${buttonSecondaryClass}`}>
                        3
                    </button>
                    <button className={`p-2 rounded-lg transition-all ${buttonSecondaryClass}`}>
                        <ChevronRight size={14} />
                    </button>
                </div>

                {/* Seletor de itens por página */}
                <button className={`flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-medium transition-all ${buttonSecondaryClass}`}>
                    <span>4 por página</span>
                    <ChevronDown size={14} className="text-slate-400" />
                </button>
            </div>
        </div>
    )
}