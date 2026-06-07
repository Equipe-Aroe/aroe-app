import { useState } from 'react'
import { 
    Check, 
    Tag, 
    Package, 
    Bell, 
    FileText, 
    CheckCircle2, 
    Gift, 
    ChevronRight, 
    ChevronDown 
} from 'lucide-react'
import { useThemeContext } from '../../../contexts/ThemeContext'

// Dados fakes baseados exatamente na imagem image_36f12d.png
const NOTIFICACOES_NAO_LIDAS = [
    {
        id: 1,
        titulo: 'Novos orçamentos recebidos',
        descricao: 'Você recebeu 3 novos orçamentos para "Enzimas Digestivas".',
        tempo: 'Há 10 minutos',
        icon: Tag,
        iconBg: 'bg-emerald-50 text-emerald-600 dark:bg-emerald-950/40 dark:text-emerald-400'
    },
    {
        id: 2,
        titulo: 'Novos orçamentos recebidos',
        descricao: 'Você recebeu 3 novos orçamentos para "Enzimas Digestivas".',
        tempo: 'Há 2 horas',
        icon: Package,
        iconBg: 'bg-purple-50 text-purple-600 dark:bg-purple-950/40 dark:text-purple-400'
    },
    {
        id: 3,
        titulo: 'Novos orçamentos recebidos',
        descricao: 'Você recebeu 3 novos orçamentos para "Enzimas Digestivas".',
        tempo: 'Há 3 horas',
        icon: Bell,
        iconBg: 'bg-emerald-50 text-emerald-600 dark:bg-emerald-950/40 dark:text-emerald-400'
    }
]

const NOTIFICACOES_LIDAS = [
    {
        id: 4,
        titulo: 'Receita enviada com sucesso',
        descricao: 'Sua receita "Magnésio Quelato + B6" foi enviada para as farmácias',
        tempo: 'Ontem, 14:30',
        icon: FileText,
        iconBg: 'bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400'
    },
    {
        id: 5,
        titulo: 'Receita enviada com sucesso',
        descricao: 'Sua receita "Magnésio Quelato + B6" foi enviada para as farmácias',
        tempo: '28/05',
        icon: CheckCircle2,
        iconBg: 'bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400'
    },
    {
        id: 6,
        titulo: 'Receita enviada com sucesso',
        descricao: 'Sua receita "Magnésio Quelato + B6" foi enviada para as farmácias',
        tempo: '28/05',
        icon: Gift,
        iconBg: 'bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400'
    }
]

const TABS = ['Todos', 'Não lidas', 'Pedidos', 'Tratamentos', 'Sistema']

export default function DashboardNotificacoes() {
    const { highContrast } = useThemeContext()
    const [activeTab, setActiveTab] = useState('Todos')

    // Estilos customizados respeitando o contexto de alto contraste
    const containerBgClass = highContrast
        ? 'bg-white text-black border-2 border-black dark:bg-black dark:text-white dark:border-white'
        : 'bg-white/40 dark:bg-slate-900/40 backdrop-blur-sm'

    const unreadCardClass = highContrast
        ? 'bg-white text-black border-2 border-black dark:bg-black dark:text-white dark:border-white'
        : 'bg-slate-50/80 dark:bg-slate-900/50 border border-transparent dark:border-slate-800/40 hover:bg-slate-100/50 dark:hover:bg-slate-900/80'

    const readCardClass = highContrast
        ? 'bg-white text-black border-b border-black dark:bg-black dark:text-white dark:border-white'
        : 'border-b border-slate-100/70 dark:border-slate-900/60 hover:bg-slate-50/40 dark:hover:bg-slate-900/20'

    const buttonSecondaryClass = highContrast
        ? 'border-2 border-black text-black dark:border-white dark:text-white font-black'
        : 'border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-900'

    return (
        <div className="space-y-6">
            {/* Título de seção para Mobile */}
            <div className="flex flex-col gap-1 md:hidden">
                <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Notificações</h2>
                <p className="text-sm text-slate-500 dark:text-slate-400">
                    Fique por dentro de tudo o que acontece na Aroê
                </p>
            </div>

            {/* Barra de Filtros (Tabs) e Ação de Marcar como Lidas */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 dark:border-slate-800/60 pb-1">
                <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
                    {TABS.map((tab) => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            className={`pb-3 text-sm font-bold transition-all relative ${
                                activeTab === tab
                                    ? 'text-emerald-600 dark:text-emerald-400'
                                    : 'text-slate-400 dark:text-slate-500 hover:text-slate-600 dark:hover:text-slate-300'
                            }`}
                        >
                            {tab}
                            {activeTab === tab && (
                                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-emerald-500 dark:bg-emerald-400 rounded-full" />
                            )}
                        </button>
                    ))}
                </div>

                <button className={`flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all shrink-0 ${buttonSecondaryClass}`}>
                    <Check size={14} className="text-emerald-600 dark:text-emerald-400" />
                    Marcar todas como lidas
                </button>
            </div>

            {/* Seção: Não lidas */}
            <div className="space-y-3">
                <div className="flex items-center gap-2 px-1">
                    <h3 className="text-sm font-bold text-slate-800 dark:text-slate-200">Não lidas</h3>
                    <span className="bg-emerald-100 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-400 text-xs font-bold px-2 py-0.5 rounded-full">
                        3
                    </span>
                </div>

                <div className="space-y-2.5">
                    {NOTIFICACOES_NAO_LIDAS.map((notif) => {
                        const IconComponent = notif.icon
                        return (
                            <div
                                key={notif.id}
                                className={`flex items-center justify-between p-4 rounded-2xl gap-4 cursor-pointer transition-all ${unreadCardClass}`}
                            >
                                <div className="flex items-center gap-4 min-w-0">
                                    {/* Indicador Verde de não lido */}
                                    <div className="w-2 h-2 rounded-full bg-emerald-500 shrink-0" />
                                    
                                    {/* Círculo do Ícone */}
                                    <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${highContrast ? 'border border-black dark:border-white' : notif.iconBg}`}>
                                        <IconComponent size={18} />
                                    </div>

                                    {/* Textos */}
                                    <div className="min-w-0 space-y-0.5">
                                        <h4 className="text-sm font-bold text-slate-900 dark:text-white truncate">
                                            {notif.titulo}
                                        </h4>
                                        <p className="text-xs text-slate-500 dark:text-slate-400 truncate">
                                            {notif.descricao}
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-center gap-4 shrink-0 text-slate-400 dark:text-slate-500">
                                    <span className="text-xs">{notif.tempo}</span>
                                    <ChevronRight size={16} />
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>

            {/* Seção: Lidas */}
            <div className="space-y-2 pt-2">
                <div className="px-1">
                    <h3 className="text-sm font-bold text-slate-400 dark:text-slate-500">Lidas</h3>
                </div>

                <div className="divide-y divide-slate-100/70 dark:divide-slate-900/60">
                    {NOTIFICACOES_LIDAS.map((notif) => {
                        const IconComponent = notif.icon
                        return (
                            <div
                                key={notif.id}
                                className={`flex items-center justify-between py-3.5 px-4 gap-4 cursor-pointer transition-all ${readCardClass}`}
                            >
                                <div className="flex items-center gap-4 min-w-0 pl-4">
                                    {/* Círculo do Ícone */}
                                    <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${highContrast ? 'border border-black dark:border-white' : notif.iconBg}`}>
                                        <IconComponent size={18} />
                                    </div>

                                    {/* Textos */}
                                    <div className="min-w-0 space-y-0.5">
                                        <h4 className="text-sm font-bold text-slate-700 dark:text-slate-300 truncate">
                                            {notif.titulo}
                                        </h4>
                                        <p className="text-xs text-slate-400 dark:text-slate-500 truncate">
                                            {notif.descricao}
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-center gap-4 shrink-0 text-slate-400 dark:text-slate-500">
                                    <span className="text-xs">{notif.tempo}</span>
                                    <ChevronRight size={16} />
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>

            {/* Botão de Ação: Carregar Mais */}
            <div className="flex justify-center pt-4">
                <button className={`flex items-center gap-2 px-5 py-2 rounded-xl text-xs font-bold transition-all ${buttonSecondaryClass}`}>
                    Carregar mais
                    <ChevronDown size={14} className="text-slate-400" />
                </button>
            </div>
        </div>
    )
}