import { useState, useEffect } from 'react'
import { 
    Sun, 
    Leaf, 
    Moon, 
    Clock, 
    Bell, 
    RefreshCw, 
    Calendar, 
    MoreVertical, 
    ChevronRight,
    Pill,
    Droplet,
    Heart
} from 'lucide-react'
import { useThemeContext } from '../../../contexts/ThemeContext'
// IMPORTAÇÃO DOS SEUS DADOS CENTRALIZADOS:
import { personasPayloads } from '../../../data/personasData'

const DEMO_STORAGE_KEY = '@Aroe:demo_session'

// Função auxiliar para mapear strings estáticas para componentes Lucide reais
const getIconComponent = (type) => {
    const mapping = {
        sun: Sun,
        leaf: Leaf,
        moon: Moon,
        clock: Clock,
        refresh: RefreshCw,
        calendar: Calendar,
        pill: Pill,
        droplet: Droplet,
        heart: Heart
    }
    return mapping[type] || Pill
}

export default function DashboardLembretes() {
    const { highContrast } = useThemeContext()
    const [perfilAtivo, setPerfilAtivo] = useState('amanda')
    const [activeTab, setActiveTab] = useState('todos')

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

    const containerDestaqueClass = highContrast
        ? 'bg-white text-black border-4 border-black dark:bg-black dark:text-white dark:border-white'
        : 'bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800/80 shadow-sm rounded-3xl'

    const itemDestaqueClass = highContrast
        ? 'border-2 border-black dark:border-white'
        : 'border border-slate-100 dark:border-slate-800 rounded-2xl hover:shadow-md hover:border-slate-200/60 dark:hover:border-slate-700/60'

    const rowItemClass = highContrast
        ? 'border-b-2 border-black dark:border-white text-black dark:text-white'
        : 'border-b border-slate-50 dark:border-slate-900 hover:bg-slate-50/40 dark:hover:bg-slate-900/20'

    // Resgata os dados dinamicamente direto da sua fonte unificada payloads
    const personaData = personasPayloads[perfilAtivo] || personasPayloads['amanda']
    const lembretesData = personaData?.lembretes || { proximos: [], todos: [] }
    const nomeExibicao = personaData?.user?.nome || "Usuário"

    const lembretesFiltrados = (lembretesData.todos || []).filter(item => {
        if (activeTab === 'todos' || activeTab === 'semana') return true
        if (activeTab === 'hoje') return item.status?.toLowerCase() === 'hoje'
        if (activeTab === 'amanha') return item.status?.toLowerCase() === 'amanhã'
        return true
    })

    return (
        <div className="space-y-6">
            <div className="flex flex-col gap-1 md:hidden">
                <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Lembretes</h2>
                <p className="text-sm text-slate-500 dark:text-slate-400">
                    Seus lembretes e horários para cuidar da sua saúde.
                </p>
            </div>

            {/* PRÓXIMOS LEMBRETES */}
            <div className={`p-6 ${containerDestaqueClass} space-y-4`}>
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <div className="p-1.5 bg-emerald-50 dark:bg-emerald-950/30 text-emerald-600 dark:text-emerald-400 rounded-lg">
                            <Bell size={18} />
                        </div>
                        <h3 className="text-base font-bold text-slate-900 dark:text-white">
                            Próximos lembretes <span className="text-sm font-normal text-slate-400 dark:text-slate-500">({nomeExibicao})</span>
                        </h3>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {lembretesData.proximos?.map((item) => {
                        const IconComponent = getIconComponent(item.iconType)
                        return (
                            <div 
                                key={item.id}
                                className={`p-4 flex items-center justify-between cursor-pointer transition-all ${itemDestaqueClass}`}
                            >
                                <div className="flex items-center gap-4 min-w-0">
                                    <div className={`w-11 h-11 rounded-full flex items-center justify-center shrink-0 ${highContrast ? 'border border-black dark:border-white text-current' : item.iconBg}`}>
                                        <IconComponent size={20} />
                                    </div>
                                    <div className="min-w-0">
                                        <div className="flex items-baseline gap-1.5">
                                            <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400">{item.horario}</span>
                                        </div>
                                        <h4 className="text-sm font-bold text-slate-900 dark:text-white truncate leading-tight mt-0.5">
                                            {item.titulo}
                                        </h4>
                                        <p className="text-[11px] text-slate-400 dark:text-slate-500 truncate mt-0.5">
                                            {item.subtitulo}
                                        </p>
                                        <span className="inline-block bg-slate-900 text-white dark:bg-white dark:text-black text-[9px] font-bold px-2 py-0.5 rounded mt-2">
                                            {item.tag}
                                        </span>
                                    </div>
                                </div>
                                <ChevronRight size={16} className="text-slate-300 dark:text-slate-600 shrink-0 ml-2" />
                            </div>
                        )
                    })}
                </div>

                <div className="flex items-center gap-1.5 text-[11px] text-slate-400 dark:text-slate-500 pt-1">
                    <Clock size={13} />
                    <span>Todos os horários são baseados no seu fuso horário</span>
                </div>
            </div>

            {/* LISTAGEM GERAL */}
            <div className="space-y-4 pt-2">
                <h3 className="text-base font-bold text-slate-900 dark:text-white">Todos os lembretes</h3>

                <div className="flex items-center gap-6 border-b border-slate-100 dark:border-slate-800/60 overflow-x-auto scroller-hidden pb-1">
                    <button 
                        onClick={() => setActiveTab('todos')}
                        className={`pb-2.5 text-xs font-bold transition-all relative shrink-0 ${activeTab === 'todos' ? 'text-emerald-600 dark:text-emerald-400' : 'text-slate-400 dark:text-slate-500'}`}
                    >
                        Todos ({lembretesData.todos?.length || 0})
                        {activeTab === 'todos' && <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-emerald-500 dark:bg-emerald-400 rounded-full" />}
                    </button>
                    <button 
                        onClick={() => setActiveTab('hoje')}
                        className={`pb-2.5 text-xs font-bold transition-all relative shrink-0 ${activeTab === 'hoje' ? 'text-emerald-600 dark:text-emerald-400' : 'text-slate-400 dark:text-slate-500'}`}
                    >
                        Hoje ({lembretesData.todos?.filter(i => i.status?.toLowerCase() === 'hoje').length || 0})
                        {activeTab === 'hoje' && <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-emerald-500 dark:bg-emerald-400 rounded-full" />}
                    </button>
                    <button 
                        onClick={() => setActiveTab('amanha')}
                        className={`pb-2.5 text-xs font-bold transition-all relative shrink-0 ${activeTab === 'amanha' ? 'text-emerald-600 dark:text-emerald-400' : 'text-slate-400 dark:text-slate-500'}`}
                    >
                        Amanhã ({lembretesData.todos?.filter(i => i.status?.toLowerCase() === 'amanhã').length || 0})
                        {activeTab === 'amanha' && <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-emerald-500 dark:bg-emerald-400 rounded-full" />}
                    </button>
                </div>

                <div className="space-y-0.5">
                    {lembretesFiltrados.map((lembrete) => {
                        const IconComponent = getIconComponent(lembrete.iconType)
                        const FreqIconComponent = getIconComponent(lembrete.freqIconType)
                        return (
                            <div 
                                key={lembrete.id}
                                className={`flex flex-col sm:flex-row sm:items-center justify-between p-4 gap-4 transition-all ${rowItemClass}`}
                            >
                                <div className="flex items-center gap-4 flex-1 min-w-0">
                                    <div className="w-9 h-9 rounded-full bg-slate-50 dark:bg-slate-900 text-slate-400 dark:text-slate-500 flex items-center justify-center shrink-0">
                                        <IconComponent size={16} />
                                    </div>
                                    <div className="w-20 shrink-0">
                                        <span className={`text-sm font-bold ${lembrete.horarioCor || 'text-slate-900 dark:text-white'}`}>
                                            {lembrete.horario}
                                        </span>
                                    </div>
                                    <div className="min-w-0 flex-1">
                                        <h4 className="text-sm font-bold text-slate-900 dark:text-white truncate leading-tight">
                                            {lembrete.titulo}
                                        </h4>
                                        <p className="text-xs text-slate-400 dark:text-slate-500 truncate mt-0.5">
                                            {lembrete.subtitulo}
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-center justify-between sm:justify-end gap-8 shrink-0 border-t sm:border-t-0 pt-3 sm:pt-0 border-slate-50 dark:border-slate-900">
                                    <div className="flex items-center gap-1.5 text-xs text-slate-400 dark:text-slate-500 min-w-[100px]">
                                        <FreqIconComponent size={14} className="text-slate-300 dark:text-slate-600 shrink-0" />
                                        <span className="truncate">{lembrete.frequencia}</span>
                                    </div>

                                    <div className="flex items-center gap-3">
                                        <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold shrink-0 ${highContrast ? 'border border-black dark:border-white text-current bg-transparent' : lembrete.statusCor}`}>
                                            {lembrete.status}
                                        </span>
                                        <button className="p-1.5 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-all text-slate-400 hover:text-slate-600 dark:hover:text-slate-300">
                                            <MoreVertical size={16} />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )
                    })}

                    {lembretesFiltrados.length === 0 && (
                        <div className="text-center py-8 text-sm text-slate-400 dark:text-slate-500">
                            Nenhum lembrete agendado para este filtro.
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}