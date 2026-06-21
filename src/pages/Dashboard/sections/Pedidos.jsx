import { useState, useEffect } from 'react'
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
// Importa os dados reais do seu arquivo de personas
import { personasPayloads } from '../../../data/personasData'

const DEMO_STORAGE_KEY = 'sua_chave_do_localstorage_aqui' // ⚠️ Substitua pela sua constante real caso ela venha de outro arquivo

export default function DashboardPedidos() {
    const { highContrast } = useThemeContext()
    
    // Estados locais para controle do perfil e filtros
    const [perfilAtivo, setPerfilAtivo] = useState('amanda')
    const [activeTab, setActiveTab] = useState('andamento') 
    const [search, setSearch] = useState('')

    // Sincroniza o perfil ativo com a sessão simulada no localStorage
    useEffect(() => {
        const demoDataRaw = localStorage.getItem(DEMO_STORAGE_KEY)
        
        if (demoDataRaw) {
            const session = JSON.parse(demoDataRaw)
            const nomeUsuario = session.user?.nome || ''

            if (nomeUsuario.includes('Ricardo')) {
                setPerfilAtivo('ricardo')
            } else if (nomeUsuario.includes('Irene')) {
                setPerfilAtivo('irene')
            } else if (nomeUsuario.includes('NatuFórmula') || session.user?.tipo === 'Farmácia Parceira') {
                setPerfilAtivo('farmacia')
            } else {
                setPerfilAtivo('amanda')
            }
        }
    }, [])

    // Resgate seguro dos dados vindos diretamente do personasData.js
    const dadosPerfil = personasPayloads[perfilAtivo] || personasPayloads['amanda']
    // Puxa as receitas do perfil atual ou joga um array vazio se não houver
    const receitasContexto = dadosPerfil?.receitasIniciais || []

    // Fallbacks visuais para Alto Contraste
    const cardBgClass = highContrast
        ? 'bg-white text-black border-2 border-black dark:bg-black dark:text-white dark:border-white'
        : 'bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800/60 shadow-sm'

    const inputClass = highContrast
        ? 'border-2 border-black bg-white text-black dark:border-white dark:bg-black dark:text-white'
        : 'bg-slate-50 dark:bg-slate-900 border border-transparent dark:border-slate-800 text-slate-900 dark:text-slate-100 focus:bg-white dark:focus:bg-slate-950 focus:ring-2 focus:ring-purple-500/20'

    const buttonSecondaryClass = highContrast
        ? 'border-2 border-black text-black dark:border-white dark:text-white'
        : 'border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800'

    // Função para mapear dinamicamente as cores e ícones dos status (JavaScript Puro)
    const getStatusConfig = (status) => {
        switch (status) {
            case 'Entregue':
                return { Icon: CheckCircle, cor: 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-400' }
            case 'Em transporte':
                return { Icon: Truck, cor: 'bg-blue-50 text-blue-700 dark:bg-blue-950/40 dark:text-blue-400' }
            case 'Recebido':
            case 'Aguardando orçamento':
                return { Icon: Clock, cor: 'bg-amber-50 text-amber-700 dark:bg-amber-950/40 dark:text-amber-400' }
            default:
                return { Icon: AlertCircle, cor: 'bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400' }
        }
    }

    // Filtragem dos pedidos usando as chaves reais do seu arquivo
    const pedidosFiltrados = receitasContexto.filter((receita) => {
        // 1. Filtro por Aba (Andamento vs Histórico)
        if (activeTab === 'andamento' && receita.status === 'Entregue') {
            return false
        }
        
        // 2. Filtro por Termo de Busca (Mapeado para 'nome' e 'pedidoId')
        const termoBusca = search.toLowerCase()
        const correspondeItem = receita.nome?.toLowerCase().includes(termoBusca)
        const correspondeCodigo = receita.pedidoId?.toLowerCase().includes(termoBusca)
        
        return correspondeItem || correspondeCodigo
    })

    return (
        <div className="space-y-6">
            {/* Título Mobile */}
            <div className="flex flex-col gap-1 md:hidden">
                <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Pedidos</h2>
                <p className="text-sm text-slate-500 dark:text-slate-400">
                    Acompanhe o status e a entrega dos seus medicamentos
                </p>
            </div>

            {/* Abas Superiores */}
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

            {/* Barra de Filtros */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="flex flex-wrap items-center gap-3 flex-1 w-full">
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

                    <button className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-medium transition-all ${buttonSecondaryClass}`}>
                        <Calendar size={14} className="text-slate-400" />
                        <span>Período: <strong className="font-semibold text-slate-800 dark:text-slate-200">Últimos 30 dias</strong></span>
                        <ChevronDown size={14} className="text-slate-400 ml-1" />
                    </button>

                    <button className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-medium transition-all ${buttonSecondaryClass}`}>
                        <span>Status: <strong className="font-semibold text-slate-800 dark:text-slate-200">Todos</strong></span>
                        <ChevronDown size={14} className="text-slate-400 ml-1" />
                    </button>
                </div>
            </div>

            {/* Listagem Dinâmica dos Cards */}
            <div className="space-y-3">
                {pedidosFiltrados.length > 0 ? (
                    pedidosFiltrados.map((receita) => {
                        const statusConfig = getStatusConfig(receita.status)
                        const StatusIcon = statusConfig.Icon

                        return (
                            <div 
                                key={receita.id} 
                                className={`flex flex-col lg:flex-row lg:items-center justify-between p-5 rounded-2xl gap-4 transition-all ${cardBgClass}`}
                            >
                                <div className="flex items-start gap-4">
                                    <div className="w-12 h-12 rounded-full bg-slate-50 dark:bg-slate-800 flex items-center justify-center text-slate-600 dark:text-slate-300 shrink-0">
                                        <Package size={22} />
                                    </div>
                                    <div className="space-y-1">
                                        <h4 className="text-base font-bold text-slate-900 dark:text-white leading-tight">
                                            {receita.nome}
                                        </h4>
                                        <p className="text-xs text-slate-400 dark:text-slate-500 font-medium">
                                            {receita.formula}
                                        </p>
                                        <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-slate-400 dark:text-slate-500 pt-1">
                                            <span className="font-bold text-emerald-600 dark:text-emerald-400">
                                                Código: {receita.pedidoId}
                                            </span>
                                            <span className="flex items-center gap-1">
                                                <Calendar size={12} /> Enviado em {receita.dataEnvio}
                                            </span>
                                            <span className="font-semibold text-slate-700 dark:text-slate-300">
                                                {receita.price}
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex items-center justify-between lg:justify-end gap-6 border-t lg:border-t-0 pt-3 lg:pt-0 border-slate-50 dark:border-slate-800/40">
                                    <div className="text-left lg:text-right space-y-1">
                                        <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold ${statusConfig.cor}`}>
                                            <StatusIcon size={12} />
                                            {receita.status}
                                        </span>
                                        <p className="text-[11px] text-slate-400 dark:text-slate-500 tracking-tight">
                                            {receita.entregaInfo}
                                        </p>
                                    </div>

                                    <div className="flex items-center gap-2">
                                        <button className={`px-4 py-1.5 rounded-xl text-xs font-bold transition-all ${buttonSecondaryClass}`}>
                                            Ver Proposta
                                        </button>
                                        <button className="p-2 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-xl transition-all text-slate-400 hover:text-slate-600 dark:hover:text-slate-300">
                                            <MoreVertical size={16} />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )
                    })
                ) : (
                    <div className={`p-12 text-center rounded-2xl border border-dashed border-slate-200 dark:border-slate-800 ${cardBgClass}`}>
                        <Package size={36} className="mx-auto text-slate-300 dark:text-slate-700 mb-2" />
                        <p className="text-sm font-medium text-slate-500 dark:text-slate-400">
                            Nenhum pedido ou cotação encontrado.
                        </p>
                    </div>
                )}
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