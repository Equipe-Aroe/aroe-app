import { useState, useEffect } from 'react'
import { 
    FileText, 
    Box, 
    Leaf, 
    Bell, 
    Tag, 
    ChevronDown, 
    ChevronRight, 
    Calendar, 
    Heart
} from 'lucide-react'
import { useThemeContext } from '../../../contexts/ThemeContext'
import { personasPayloads } from '../../../data/personasData'

const DEMO_STORAGE_KEY = '@Aroe:demo_session'

const getIconComponent = (type) => {
    const mapping = {
        box: Box,
        leaf: Leaf,
        bell: Bell,
        tag: Tag,
        heart: Heart,
        fileText: FileText,
        calendar: Calendar,
    }
    return mapping[type] || Box
}

export default function DashboardHistorico() {
    const { highContrast } = useThemeContext()
    const [perfilAtivo, setPerfilAtivo] = useState('amanda')
    const [activeTab, setActiveTab] = useState('todos')

    useEffect(() => {
        const demoDataRaw = localStorage.getItem(DEMO_STORAGE_KEY)
        
        if (demoDataRaw) {
            const session = JSON.parse(demoDataRaw)
            const nomeUsuario = session.user?.nome || ''

            if (nomeUsuario.includes('Irene')) {
                setPerfilAtivo('irene')
            } else if (nomeUsuario.includes('Ricardo')) {
                setPerfilAtivo('ricardo')
            } else if (nomeUsuario.includes('NatuFórmula') || session.user?.tipo === 'Farmácia Parceira') {
                setPerfilAtivo('farmacia')
            } else {
                setPerfilAtivo('amanda')
            }
        }
    }, [])

    useEffect(() => {
        setActiveTab('todos')
    }, [perfilAtivo])

    const cardBgClass = highContrast
        ? 'bg-white text-black border-2 border-black dark:bg-black dark:text-white dark:border-white p-5 space-y-4 rounded-2xl'
        : 'bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800/60 shadow-sm rounded-2xl p-5 space-y-4'

    const filterButtonClass = highContrast
        ? 'border-2 border-black text-black bg-white dark:border-white dark:text-white dark:bg-black font-black'
        : 'border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300 bg-white dark:bg-slate-900'

    const timelineItemClass = highContrast
        ? 'border-b-2 border-black dark:border-white text-black dark:text-white'
        : 'border-b border-slate-50 dark:border-slate-900/60 hover:bg-slate-50/40 dark:hover:bg-slate-900/20'

    // Resgate dinâmico e seguro do histórico da persona ativa
    const dadosAtuais = personasPayloads[perfilAtivo]?.historico || personasPayloads['amanda'].historico

    const filtrarPorAba = (lista = []) => {
        if (activeTab === 'todos') return lista
        return lista.filter(item => item.categoria === activeTab)
    }

    // Filtros com fallback seguro (caso venha indefinido de alguma persona)
    const historicoMaioFiltrado = filtrarPorAba(dadosAtuais?.maio || [])
    const historicoAbrilFiltrado = filtrarPorAba(dadosAtuais?.abril || [])

    return (
        <div className="space-y-6">
            {/* Título interno visível apenas em telas menores (Mobile Layout) */}
            <div className="flex flex-col gap-1 md:hidden">
                <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Histórico</h2>
                <p className="text-sm text-slate-500 dark:text-slate-400">Acompanhe suas atividades e interações</p>
            </div>

            {/* Layout em Grid Duplo (Histórico principal + Estatísticas Laterais) */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
                
                {/* COLUNA ESQUERDA: Filtros e Linha do Tempo */}
                <div className="lg:col-span-2 space-y-5">
                    
                    {/* Abas Superiores de Categoria */}
                    <div className="flex items-center gap-5 border-b border-slate-100 dark:border-slate-800/60 overflow-x-auto scroller-hidden pb-1">
                        {['todos', 'pedidos', 'tratamentos', 'lembretes', 'orçamentos'].map((tab) => (
                            <button
                                key={tab}
                                onClick={() => setActiveTab(tab)}
                                className={`pb-2 text-xs font-bold capitalize transition-all relative shrink-0 ${
                                    activeTab === tab ? 'text-emerald-600 dark:text-emerald-400' : 'text-slate-400 dark:text-slate-500'
                                }`}
                            >
                                {tab}
                                {activeTab === tab && (
                                    <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-emerald-500 dark:bg-emerald-400 rounded-full" />
                                )}
                            </button>
                        ))}
                    </div>

                    {/* Botões de Filtro Suspensos */}
                    <div className="flex flex-wrap items-center gap-3 pt-1">
                        <button className={`flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-medium transition-all ${filterButtonClass}`}>
                            <Calendar size={14} className="text-slate-400" />
                            <span>Período: <span className="font-bold">Últimos 6 meses</span></span>
                            <ChevronDown size={14} className="text-slate-400" />
                        </button>
                        
                        <button className={`flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-medium transition-all ${filterButtonClass}`}>
                            <span>Tipo: <span className="font-bold">Todos</span></span>
                            <ChevronDown size={14} className="text-slate-400" />
                        </button>

                        <button className={`flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-medium transition-all ${filterButtonClass}`}>
                            <span>Status: <span className="font-bold">Todos</span></span>
                            <ChevronDown size={14} className="text-slate-400" />
                        </button>
                    </div>

                    {/* Grupo: Maio de 2025 */}
                    <div className="space-y-3 pt-3">
                        <h3 className="text-sm font-bold text-slate-900 dark:text-white px-1">Maio de 2025</h3>
                        <div className="space-y-0.5">
                            {historicoMaioFiltrado.map((item) => {
                                const IconComponent = getIconComponent(item.iconType)
                                return (
                                    <div key={item.id} className={`flex items-center justify-between p-3 gap-4 cursor-pointer group ${timelineItemClass}`}>
                                        <div className="flex items-center gap-4 min-w-0 flex-1">
                                            <div className={`w-9 h-9 rounded-full flex items-center justify-center shrink-0 ${highContrast ? 'border border-black dark:border-white text-current' : item.iconBg}`}>
                                                <IconComponent size={16} />
                                            </div>
                                            <div className="min-w-0 flex-1">
                                                <h4 className="text-xs font-bold text-slate-900 dark:text-white leading-tight">
                                                    {item.titulo}
                                                </h4>
                                                <p className="text-[11px] text-slate-400 dark:text-slate-500 mt-0.5 leading-relaxed">
                                                    {item.descricao}
                                                </p>
                                            </div>
                                        </div>
                                        <div className="text-right shrink-0 min-w-[70px]">
                                            <p className="text-[10px] font-semibold text-slate-500 dark:text-slate-400">{item.data}</p>
                                            <p className="text-[10px] text-slate-400 dark:text-slate-500 mt-0.5">{item.hora}</p>
                                        </div>
                                        <ChevronRight size={14} className="text-slate-300 dark:text-slate-600 group-hover:translate-x-0.5 transition-transform shrink-0" />
                                    </div>
                                )
                            })}
                            {historicoMaioFiltrado.length === 0 && (
                                <p className="text-[11px] text-slate-400 dark:text-slate-500 text-center py-4">Nenhuma atividade nesta categoria para este mês.</p>
                            )}
                        </div>

                        <div className="flex justify-center pt-2">
                            <button className={`flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-bold transition-all ${filterButtonClass}`}>
                                <span>Ver mais</span>
                                <ChevronDown size={14} className="text-slate-400" />
                            </button>
                        </div>
                    </div>

                    {/* Grupo: Abril de 2025 */}
                    <div className="space-y-3 pt-2">
                        <h3 className="text-sm font-bold text-slate-900 dark:text-white px-1">Abril de 2025</h3>
                        <div className="space-y-0.5">
                            {historicoAbrilFiltrado.map((item) => {
                                const IconComponent = getIconComponent(item.iconType)
                                return (
                                    <div key={item.id} className={`flex items-center justify-between p-3 gap-4 cursor-pointer group ${timelineItemClass}`}>
                                        <div className="flex items-center gap-4 min-w-0 flex-1">
                                            <div className={`w-9 h-9 rounded-full flex items-center justify-center shrink-0 ${highContrast ? 'border border-black dark:border-white text-current' : item.iconBg}`}>
                                                <IconComponent size={16} />
                                            </div>
                                            <div className="min-w-0 flex-1">
                                                <h4 className="text-xs font-bold text-slate-900 dark:text-white leading-tight">
                                                    {item.titulo}
                                                </h4>
                                                <p className="text-[11px] text-slate-400 dark:text-slate-500 mt-0.5 leading-relaxed">
                                                    {item.descricao}
                                                </p>
                                            </div>
                                        </div>
                                        <div className="text-right shrink-0 min-w-[70px]">
                                            <p className="text-[10px] font-semibold text-slate-500 dark:text-slate-400">{item.data}</p>
                                            <p className="text-[10px] text-slate-400 dark:text-slate-500 mt-0.5">{item.hora}</p>
                                        </div>
                                        <ChevronRight size={14} className="text-slate-300 dark:text-slate-600 group-hover:translate-x-0.5 transition-transform shrink-0" />
                                    </div>
                                )
                            })}
                            {historicoAbrilFiltrado.length === 0 && (
                                <p className="text-[11px] text-slate-400 dark:text-slate-500 text-center py-4">Nenhuma atividade nesta categoria para este mês.</p>
                            )}
                        </div>
                    </div>

                </div>

                {/* COLUNA DIREITA: Indicadores Globais Dinâmicos baseados no perfil */}
                <div className="space-y-5 lg:sticky lg:top-24">
                    
                    {/* Widget 1: Resumo do Período */}
                    <div className={cardBgClass}>
                        <div className="flex justify-between items-baseline">
                            <h3 className="text-sm font-bold text-slate-900 dark:text-white">Resumo do período</h3>
                            <span className="text-[10px] text-slate-400 dark:text-slate-500 font-medium">Últimos 6 meses</span>
                        </div>
                        
                        <div className="space-y-2.5 pt-1 text-xs">
                            <div className="flex justify-between items-center">
                                <span className="text-slate-500 dark:text-slate-400 font-medium">
                                    {perfilAtivo === 'farmacia' ? 'Pedidos faturados' : 'Pedidos realizados'}
                                </span>
                                <span className="font-bold text-slate-800 dark:text-slate-200">
                                    {dadosAtuais?.resumo?.pedidos || 0}
                                </span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-slate-500 dark:text-slate-400 font-medium">
                                    {perfilAtivo === 'farmacia' ? 'Receitas recebidas' : 'Receitas enviadas'}
                                </span>
                                <span className="font-bold text-slate-800 dark:text-slate-200">
                                    {dadosAtuais?.resumo?.receitas || 0}
                                </span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-slate-500 dark:text-slate-400 font-medium">Propostas concluídas</span>
                                <span className="font-bold text-slate-800 dark:text-slate-200">
                                    {dadosAtuais?.resumo?.concluidos || 0}
                                </span>
                            </div>
                            <div className="flex justify-between items-center border-t border-slate-50 dark:border-slate-800/80 pt-2.5">
                                <span className="text-slate-500 dark:text-slate-400 font-medium">Taxa de cumprimento</span>
                                <span className="font-bold text-emerald-600 dark:text-emerald-400">
                                    {dadosAtuais?.resumo?.cumprimento || '0%'}
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Widget 2: Economia Financeira Acumulada / Faturamento */}
                    <div className={cardBgClass}>
                        <div>
                            <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                                {perfilAtivo === 'farmacia' ? 'Faturamento bruto' : 'Economia total'}
                            </h3>
                            <p className="text-[11px] text-slate-400 dark:text-slate-500 mt-0.5">
                                {perfilAtivo === 'farmacia' ? 'Gerado pela plataforma' : 'Em pedidos entregues'}
                            </p>
                        </div>

                        <div className="py-2 flex items-baseline gap-1">
                            <span className="text-sm font-bold text-emerald-600 dark:text-emerald-400">R$</span>
                            <span className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">
                                {dadosAtuais?.economia || '0,00'}
                            </span>
                        </div>

                        <p className="text-[10px] text-slate-400 dark:text-slate-500 font-medium leading-normal">
                            {perfilAtivo === 'farmacia' 
                                ? 'Repassado de forma direta para sua conta' 
                                : 'Em relação ao preço médio de mercado'}
                        </p>
                    </div>

                </div>

            </div>
        </div>
    )
}