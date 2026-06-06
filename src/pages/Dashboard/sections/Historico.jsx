import { useState } from 'react'
import { 
    FileText, 
    Box, 
    Leaf, 
    Bell, 
    Tag, 
    ChevronDown, 
    ChevronRight, 
    Calendar, 
    Filter, 
    CheckCircle 
} from 'lucide-react'
import { useThemeContext } from '../../../contexts/ThemeContext'

const HISTORICO_MAIO = [
    {
        id: 1,
        titulo: 'Receita enviada',
        descricao: 'Sua receita "Magnésio Quelato + B6" foi enviada para as farmácias',
        data: '28/05/2025',
        hora: '14:30',
        icon: FileText,
        iconBg: 'bg-emerald-50 text-emerald-600 dark:bg-emerald-950/40 dark:text-emerald-400'
    },
    {
        id: 2,
        titulo: 'Pedido entregue',
        descricao: 'Sua receita "Magnésio Quelato + B6" foi enviada para as farmácias',
        data: '28/05/2025',
        hora: '14:30',
        icon: Box,
        iconBg: 'bg-indigo-50 text-indigo-600 dark:bg-indigo-950/40 dark:text-indigo-400'
    },
    {
        id: 3,
        titulo: 'Tratamento atualizado',
        descricao: 'Progresso do tratamento "Enzimas Digestivas" atualizado',
        data: '28/05/2025',
        hora: '14:30',
        icon: Leaf,
        iconBg: 'bg-teal-50 text-teal-600 dark:bg-teal-950/40 dark:text-teal-400'
    },
    {
        id: 4,
        titulo: 'Lembrete criado',
        descricao: 'Você criou um lembrete para "Vitaminas D" às 08:00',
        data: '28/05/2025',
        hora: '14:30',
        icon: Bell,
        iconBg: 'bg-coral-50 text-orange-500 dark:bg-orange-950/40 dark:text-orange-400'
    },
    {
        id: 5,
        titulo: 'Orçamento recebido',
        descricao: '3 novas farmácias enviaram orçamentos para seu pedido #1234',
        data: '28/05/2025',
        hora: '14:30',
        icon: Tag,
        iconBg: 'bg-purple-50 text-purple-600 dark:bg-purple-950/40 dark:text-purple-400'
    }
]

const HISTORICO_ABRIL = [
    {
        id: 6,
        titulo: 'Receita enviada',
        descricao: 'Sua receita "Magnésio Quelato + B6" foi enviada para as farmácias',
        data: '28/05/2025',
        hora: '14:30',
        icon: FileText,
        iconBg: 'bg-emerald-50 text-emerald-600 dark:bg-emerald-950/40 dark:text-emerald-400'
    },
    {
        id: 7,
        titulo: 'Pedido realizado',
        descricao: 'Seu pedido #12220 foi realizado com sucesso',
        data: '28/05/2025',
        hora: '14:30',
        icon: Box,
        iconBg: 'bg-indigo-50 text-indigo-600 dark:bg-indigo-950/40 dark:text-indigo-400'
    }
]

export default function DashboardHistorico() {
    const { highContrast } = useThemeContext()
    const [activeTab, setActiveTab] = useState('todos')

    // Estilizações de Alto Contraste dinâmicas
    const cardBgClass = highContrast
        ? 'bg-white text-black border-2 border-black dark:bg-black dark:text-white dark:border-white'
        : 'bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800/60 shadow-sm rounded-2xl p-5 space-y-4'

    const filterButtonClass = highContrast
        ? 'border-2 border-black text-black bg-white dark:border-white dark:text-white dark:bg-black font-black'
        : 'border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300 bg-white dark:bg-slate-900'

    const timelineItemClass = highContrast
        ? 'border-b-2 border-black dark:border-white text-black dark:text-white'
        : 'border-b border-slate-50 dark:border-slate-900/60 hover:bg-slate-50/40 dark:hover:bg-slate-900/20'

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
                    
                    {/* Abas Superiores de Categoria baseadas no design */}
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

                    {/* Botões de Filtro Suspensos (Dropdowns do Topo) */}
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
                            {HISTORICO_MAIO.map((item) => {
                                const IconComponent = item.icon
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
                        </div>

                        {/* Botão Ver Mais Centralizado conforme Mockup */}
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
                            {HISTORICO_ABRIL.map((item) => {
                                const IconComponent = item.icon
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
                        </div>
                    </div>

                </div>

                {/* COLUNA DIREITA: Indicadores Globais e Widgets */}
                <div className="space-y-5 lg:sticky lg:top-24">
                    
                    {/* Widget 1: Resumo do Período */}
                    <div className={cardBgClass}>
                        <div className="flex justify-between items-baseline">
                            <h3 className="text-sm font-bold text-slate-900 dark:text-white">Resumo do período</h3>
                            <span className="text-[10px] text-slate-400 dark:text-slate-500 font-medium">Últimos 6 meses</span>
                        </div>
                        
                        <div className="space-y-2.5 pt-1 text-xs">
                            <div className="flex justify-between items-center">
                                <span className="text-slate-500 dark:text-slate-400 font-medium">Pedidos realizados</span>
                                <span className="font-bold text-slate-800 dark:text-slate-200">8</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-slate-500 dark:text-slate-400 font-medium">Receitas enviadas</span>
                                <span className="font-bold text-slate-800 dark:text-slate-200">6</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-slate-500 dark:text-slate-400 font-medium">Tratamentos concluídos</span>
                                <span className="font-bold text-slate-800 dark:text-slate-200">3</span>
                            </div>
                            <div className="flex justify-between items-center border-t border-slate-50 dark:border-slate-800/80 pt-2.5">
                                <span className="text-slate-500 dark:text-slate-400 font-medium">Lembretes cumpridos</span>
                                <span className="font-bold text-emerald-600 dark:text-emerald-400">92%</span>
                            </div>
                        </div>
                    </div>

                    {/* Widget 2: Economia Financeira Acumulada */}
                    <div className={cardBgClass}>
                        <div>
                            <h3 className="text-sm font-bold text-slate-900 dark:text-white">Economia total</h3>
                            <p className="text-[11px] text-slate-400 dark:text-slate-500 mt-0.5">Em pedidos entregues</p>
                        </div>

                        <div className="py-2 flex items-baseline gap-1">
                            <span className="text-sm font-bold text-emerald-600 dark:text-emerald-400">R$</span>
                            <span className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">312,45</span>
                        </div>

                        <p className="text-[10px] text-slate-400 dark:text-slate-500 font-medium leading-normal">
                            Em relação ao preço médio de mercado
                        </p>
                    </div>

                </div>

            </div>
        </div>
    )
}