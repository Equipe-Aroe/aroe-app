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

// Centralizando os dados iniciais com uma propriedade 'lida' e 'categoria' para permitir filtros dinâmicos
const INITIAL_NOTIFICACOES = [
    {
        id: 1,
        titulo: 'Novos orçamentos recebidos',
        descricao: 'Você recebeu 3 novos orçamentos para "Enzimas Digestivas".',
        tempo: 'Há 10 min',
        icon: Tag,
        iconBg: 'bg-emerald-50 text-emerald-600 dark:bg-emerald-950/40 dark:text-emerald-400',
        lida: false,
        categoria: 'Pedidos'
    },
    {
        id: 2,
        titulo: 'Medicamento pronto para retirada',
        descricao: 'Sua fórmula personalizada já está disponível na farmácia parceira.',
        tempo: 'Há 2 horas',
        icon: Package,
        iconBg: 'bg-purple-50 text-purple-600 dark:bg-purple-950/40 dark:text-purple-400',
        lida: false,
        categoria: 'Pedidos'
    },
    {
        id: 3,
        titulo: 'Lembrete de Tratamento',
        descricao: 'Está quase na hora de tomar seu Antiox Personalizado.',
        tempo: 'Há 3 horas',
        icon: Bell,
        iconBg: 'bg-amber-50 text-amber-600 dark:bg-amber-950/40 dark:text-amber-400',
        lida: false,
        categoria: 'Tratamentos'
    },
    {
        id: 4,
        titulo: 'Receita enviada com sucesso',
        descricao: 'Sua receita "Magnésio Quelato + B6" foi enviada para as farmácias.',
        tempo: 'Ontem, 14:30',
        icon: FileText,
        iconBg: 'bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400',
        lida: true,
        categoria: 'Sistema'
    },
    {
        id: 5,
        titulo: 'Cadastro Validado',
        descricao: 'Seu perfil técnico e dados de acesso foram validados com sucesso.',
        tempo: '28/05',
        icon: CheckCircle2,
        iconBg: 'bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400',
        lida: true,
        categoria: 'Sistema'
    },
    {
        id: 6,
        titulo: 'Cupom de Boas-vindas Aroê',
        descricao: 'Aproveite R$ 20 de desconto no seu primeiro pedido solicitado.',
        tempo: '28/05',
        icon: Gift,
        iconBg: 'bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400',
        lida: true,
        categoria: 'Sistema'
    }
]

const TABS = ['Todos', 'Não lidas', 'Pedidos', 'Tratamentos', 'Sistema']

export default function DashboardNotificacoes() {
    const { highContrast } = useThemeContext()
    const [activeTab, setActiveTab] = useState('Todos')
    const [notificacoes, setNotificacoes] = useState(INITIAL_NOTIFICACOES)

    // Ações interativas para rodar em tempo real na demo
    const marcarTodasComoLidas = () => {
        setNotificacoes(prev => prev.map(n => ({ ...n, lida: true })))
    }

    const marcarComoLida = (id) => {
        setNotificacoes(prev => prev.map(n => n.id === id ? { ...n, lida: true } : n))
    }

    // Estilos customizados respeitando o alto contraste
    const unreadCardClass = highContrast
        ? 'bg-white text-black border-2 border-black dark:bg-black dark:text-white dark:border-white'
        : 'bg-slate-50/80 dark:bg-slate-900/50 border border-transparent dark:border-slate-800/40 hover:bg-slate-100/50 dark:hover:bg-slate-900/80'

    const readCardClass = highContrast
        ? 'bg-white text-black border-b border-black dark:bg-black dark:text-white dark:border-white'
        : 'border-b border-slate-100/70 dark:border-slate-800/40 hover:bg-slate-50/40 dark:hover:bg-slate-900/20'

    const buttonSecondaryClass = highContrast
        ? 'border-2 border-black text-black dark:border-white dark:text-white font-black'
        : 'border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-900'

    // Filtros lógicos baseados na tab ativa
    const notificacoesFiltradas = notificacoes.filter(n => {
        if (activeTab === 'Todos') return true
        if (activeTab === 'Não lidas') return !n.lida
        return n.categoria === activeTab
    })

    const listaNaoLidas = notificacoesFiltradas.filter(n => !n.lida)
    const listaLidas = notificacoesFiltradas.filter(n => n.lida)
    const totalNaoLidasGlobal = notificacoes.filter(n => !n.lida).length

    return (
        <div className="space-y-6">
            {/* Título de seção para Mobile */}
            <div className="flex flex-col gap-1 md:hidden">
                <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Notificações</h2>
                <p className="text-sm text-slate-500 dark:text-slate-400">
                    Fique por dentro de tudo o que acontece na Aroê
                </p>
            </div>

            {/* Barra de Filtros (Tabs) e Ação */}
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

                {totalNaoLidasGlobal > 0 && (
                    <button 
                        onClick={marcarTodasComoLidas}
                        className={`flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all shrink-0 ${buttonSecondaryClass}`}
                    >
                        <Check size={14} className="text-emerald-600 dark:text-emerald-400" />
                        Marcar todas como lidas
                    </button>
                )}
            </div>

            {/* Seção: Não lidas */}
            {listaNaoLidas.length > 0 && (
                <div className="space-y-3">
                    <div className="flex items-center gap-2 px-1">
                        <h3 className="text-sm font-bold text-slate-800 dark:text-slate-200">Não lidas</h3>
                        <span className="bg-emerald-100 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-400 text-xs font-bold px-2 py-0.5 rounded-full">
                            {listaNaoLidas.length}
                        </span>
                    </div>

                    <div className="space-y-2.5">
                        {listaNaoLidas.map((notif) => {
                            const IconComponent = notif.icon
                            return (
                                <div
                                    key={notif.id}
                                    onClick={() => marcarComoLida(notif.id)}
                                    className={`flex items-center justify-between p-4 rounded-2xl gap-4 cursor-pointer transition-all ${unreadCardClass}`}
                                    title="Clique para marcar como lida"
                                >
                                    <div className="flex items-center gap-4 min-w-0">
                                        <div className="w-2 h-2 rounded-full bg-emerald-500 shrink-0" />
                                        
                                        <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${highContrast ? 'border border-black dark:border-white' : notif.iconBg}`}>
                                            <IconComponent size={18} />
                                        </div>

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
            )}

            {/* Seção: Lidas */}
            {listaLidas.length > 0 && (
                <div className="space-y-2 pt-2">
                    <div className="px-1">
                        <h3 className="text-sm font-bold text-slate-400 dark:text-slate-500">Lidas</h3>
                    </div>

                    <div className="divide-y divide-slate-100/70 dark:divide-slate-800/40 rounded-2xl overflow-hidden bg-white/10 dark:bg-slate-950/5">
                        {listaLidas.map((notif) => {
                            const IconComponent = notif.icon
                            return (
                                <div
                                    key={notif.id}
                                    className={`flex items-center justify-between py-3.5 px-4 gap-4 transition-all ${readCardClass}`}
                                >
                                    <div className="flex items-center gap-4 min-w-0 pl-4">
                                        <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${highContrast ? 'border border-black dark:border-white' : 'bg-slate-100 text-slate-500 dark:bg-slate-800/70 dark:text-slate-400'}`}>
                                            <IconComponent size={18} />
                                        </div>

                                        <div className="min-w-0 space-y-0.5">
                                            <h4 className="text-sm font-semibold text-slate-600 dark:text-slate-400 truncate">
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
            )}

            {/* Estado de Lista Completamente Vazia */}
            {notificacoesFiltradas.length === 0 && (
                <div className="p-12 text-center rounded-2xl border border-dashed border-slate-200 dark:border-slate-800/80">
                    <Bell size={32} className="mx-auto text-slate-300 dark:text-slate-700 mb-2" />
                    <p className="text-sm font-medium text-slate-500 dark:text-slate-400">
                        Nenhuma notificação encontrada nesta categoria.
                    </p>
                </div>
            )}

            {/* Botão de Ação: Carregar Mais */}
            {notificacoesFiltradas.length > 0 && (
                <div className="flex justify-center pt-4">
                    <button className={`flex items-center gap-2 px-5 py-2 rounded-xl text-xs font-bold transition-all ${buttonSecondaryClass}`}>
                        Carregar mais
                        <ChevronDown size={14} className="text-slate-400" />
                    </button>
                </div>
            )}
        </div>
    )
}