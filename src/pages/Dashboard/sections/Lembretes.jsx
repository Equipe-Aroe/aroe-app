import { useState } from 'react'
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

// Dados fakes idênticos aos exibidos na imagem image_36de0f.png
const PROXIMOS_LEMBRETES = [
    {
        id: 1,
        horario: '08:00',
        titulo: 'Vitamina D',
        subtitulo: 'Tomar 1 cápsula',
        tag: 'Hoje',
        icon: Sun,
        iconBg: 'bg-orange-50 text-orange-500 dark:bg-orange-950/40 dark:text-orange-400'
    },
    {
        id: 2,
        horario: '20:00',
        titulo: 'Enzimas digestivas',
        subtitulo: 'Tomar 1 cápsula',
        tag: 'Hoje',
        icon: Leaf,
        iconBg: 'bg-emerald-50 text-emerald-600 dark:bg-emerald-950/40 dark:text-emerald-400'
    },
    {
        id: 3,
        horario: '22:00',
        titulo: 'Magnésio Quelato + B6',
        subtitulo: 'Tomar 1 cápsula',
        tag: 'Hoje',
        icon: Moon,
        iconBg: 'bg-indigo-50 text-indigo-600 dark:bg-indigo-950/40 dark:text-indigo-400'
    }
]

const TODOS_LEMBRETES = [
    {
        id: 1,
        horario: '08:00',
        titulo: 'Vitamina D',
        subtitulo: 'Tomar 1 cápsula',
        frequencia: 'Diariamente',
        freqIcon: RefreshCw,
        status: 'Hoje',
        statusCor: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-400',
        icon: Sun
    },
    {
        id: 2,
        horario: '20:00',
        titulo: 'Enzimas digestivas',
        subtitulo: 'Tomar 1 cápsula',
        frequencia: 'Diariamente',
        freqIcon: RefreshCw,
        status: 'Hoje',
        statusCor: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-400',
        icon: Leaf
    },
    {
        id: 3,
        horario: '22:00',
        titulo: 'Magnésio Quelato + B6',
        subtitulo: 'Tomar 1 cápsula',
        frequencia: 'Diariamente',
        freqIcon: RefreshCw,
        status: 'Hoje',
        statusCor: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-400',
        icon: Moon
    },
    {
        id: 4,
        horario: '12:00',
        titulo: 'Ômega 3',
        subtitulo: 'Tomar 2 cápsulas',
        frequencia: 'Seg, Qua, Sex',
        freqIcon: Calendar,
        status: 'Amanhã',
        statusCor: 'bg-purple-100 text-purple-700 dark:bg-purple-950/50 dark:text-purple-400',
        icon: Pill
    },
    {
        id: 5,
        horario: 'Durante o dia',
        titulo: 'Beber água',
        subtitulo: 'Manter-se hidratado',
        frequencia: 'Diariamente',
        freqIcon: RefreshCw,
        status: 'Todos os dias',
        statusCor: 'bg-blue-100 text-blue-700 dark:bg-blue-950/50 dark:text-blue-400',
        icon: Droplet,
        horarioCor: 'text-emerald-600 dark:text-emerald-400 font-semibold'
    },
    {
        id: 6,
        horario: '08:00',
        titulo: 'Alongamento',
        subtitulo: '10 Minutos de alongamento',
        frequencia: 'Ter, Qui, Sáb',
        freqIcon: Calendar,
        status: 'Sábado',
        statusCor: 'bg-orange-100 text-orange-700 dark:bg-orange-950/50 dark:text-orange-400',
        icon: Heart
    }
]

export default function DashboardLembretes() {
    const { highContrast } = useThemeContext()
    const [activeTab, setActiveTab] = useState('todos')

    // Estilizações condicionais de acordo com o Alto Contraste
    const containerDestaqueClass = highContrast
        ? 'bg-white text-black border-4 border-black dark:bg-black dark:text-white dark:border-white'
        : 'bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800/80 shadow-sm rounded-3xl'

    const itemDestaqueClass = highContrast
        ? 'border-2 border-black dark:border-white'
        : 'border border-slate-100 dark:border-slate-800 rounded-2xl hover:shadow-md hover:border-slate-200/60 dark:hover:border-slate-700/60'

    const rowItemClass = highContrast
        ? 'border-b-2 border-black dark:border-white text-black dark:text-white'
        : 'border-b border-slate-50 dark:border-slate-900 hover:bg-slate-50/40 dark:hover:bg-slate-900/20'

    return (
        <div className="space-y-6">
            {/* Título interno para telas Mobile */}
            <div className="flex flex-col gap-1 md:hidden">
                <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Lembretes</h2>
                <p className="text-sm text-slate-500 dark:text-slate-400">
                    Seus lembretes e horários para cuidar da sua saúde.
                </p>
            </div>

            {/* SEÇÃO SUPERIOR: Próximos Lembretes (Cards Horizontais) */}
            <div className={`p-6 ${containerDestaqueClass} space-y-4`}>
                <div className="flex items-center gap-2">
                    <div className="p-1.5 bg-emerald-50 dark:bg-emerald-950/30 text-emerald-600 dark:text-emerald-400 rounded-lg">
                        <Bell size={18} />
                    </div>
                    <h3 className="text-base font-bold text-slate-900 dark:text-white">Próximos lembretes</h3>
                </div>

                {/* Grid contendo os 3 cards da imagem */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {PROXIMOS_LEMBRETES.map((item) => {
                        const IconComponent = item.icon
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

                {/* Nota de rodapé informativa sobre fuso horário */}
                <div className="flex items-center gap-1.5 text-[11px] text-slate-400 dark:text-slate-500 pt-1">
                    <Clock size={13} />
                    <span>Todos os horários são baseados no seu fuso horário</span>
                </div>
            </div>

            {/* SEÇÃO INFERIOR: Listagem completa estruturada */}
            <div className="space-y-4 pt-2">
                <h3 className="text-base font-bold text-slate-900 dark:text-white">Todos os lembretes</h3>

                {/* Abas de filtros rápidos horizontais */}
                <div className="flex items-center gap-6 border-b border-slate-100 dark:border-slate-800/60 overflow-x-auto scroller-hidden pb-1">
                    <button 
                        onClick={() => setActiveTab('todos')}
                        className={`pb-2.5 text-xs font-bold transition-all relative shrink-0 ${activeTab === 'todos' ? 'text-emerald-600 dark:text-emerald-400' : 'text-slate-400 dark:text-slate-500'}`}
                    >
                        Todos (6)
                        {activeTab === 'todos' && <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-emerald-500 dark:bg-emerald-400 rounded-full" />}
                    </button>
                    <button 
                        onClick={() => setActiveTab('hoje')}
                        className={`pb-2.5 text-xs font-bold transition-all relative shrink-0 ${activeTab === 'hoje' ? 'text-emerald-600 dark:text-emerald-400' : 'text-slate-400 dark:text-slate-500'}`}
                    >
                        Hoje (3)
                    </button>
                    <button 
                        onClick={() => setActiveTab('amanha')}
                        className={`pb-2.5 text-xs font-bold transition-all relative shrink-0 ${activeTab === 'amanha' ? 'text-emerald-600 dark:text-emerald-400' : 'text-slate-400 dark:text-slate-500'}`}
                    >
                        Amanhã (2)
                    </button>
                    <button 
                        onClick={() => setActiveTab('semana')}
                        className={`pb-2.5 text-xs font-bold transition-all relative shrink-0 ${activeTab === 'semana' ? 'text-emerald-600 dark:text-emerald-400' : 'text-slate-400 dark:text-slate-500'}`}
                    >
                        Essa semana (6)
                    </button>
                </div>

                {/* Renderização das linhas de lembretes */}
                <div className="space-y-0.5">
                    {TODOS_LEMBRETES.map((lembrete) => {
                        const IconComponent = lembrete.icon
                        const FreqIconComponent = lembrete.freqIcon
                        return (
                            <div 
                                key={lembrete.id}
                                className={`flex flex-col sm:flex-row sm:items-center justify-between p-4 gap-4 transition-all ${rowItemClass}`}
                            >
                                {/* Bloco 1: Ícone + Horário + Nome do medicamento */}
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

                                {/* Bloco 2: Frequência + Status da data + Menu de contexto */}
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
                </div>
            </div>
        </div>
    )
}