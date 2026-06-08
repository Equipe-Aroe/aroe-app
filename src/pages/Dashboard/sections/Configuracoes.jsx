import { useState, useEffect } from 'react'
import { 
    Lock, 
    Bell, 
    Shield, 
    CreditCard, 
    Globe, 
    ChevronRight,
    Sun,
    Moon,
    ArrowLeft,
    CheckCircle2
} from 'lucide-react'
import { useThemeContext } from '../../../contexts/ThemeContext'

const DEMO_STORAGE_KEY = '@Aroe:demo_session'

const PREFERENCIAS_LISTA = [
    {
        id: 'notificacoes',
        titulo: 'Central de Notificações',
        descricao: 'Escolha como e quando deseja receber alertas de orçamentos e envios',
        icon: Bell,
        iconBg: 'bg-emerald-50 text-emerald-600 dark:bg-emerald-950/40 dark:text-emerald-400'
    },
    {
        id: 'privacidade',
        titulo: 'Privacidade & LGPD',
        descricao: 'Gerencie seus consentimentos e dados partilhados com laboratórios',
        icon: Shield,
        iconBg: 'bg-emerald-50 text-emerald-600 dark:bg-emerald-950/40 dark:text-emerald-400'
    },
    {
        id: 'pagamento',
        titulo: 'Métodos de Pagamento',
        descricao: 'Cadastre e altere os seus cartões de crédito para compras rápidas',
        icon: CreditCard,
        iconBg: 'bg-emerald-50 text-emerald-600 dark:bg-emerald-950/40 dark:text-emerald-400'
    },
    {
        id: 'idioma',
        titulo: 'Idioma e Região',
        descricao: 'Defina o idioma padrão do seu painel e formatos regionais',
        icon: Globe,
        iconBg: 'bg-emerald-50 text-emerald-600 dark:bg-emerald-950/40 dark:text-emerald-400'
    }
]

export default function DashboardConfiguracoes() {
    const { highContrast, darkMode, toggleDarkMode } = useThemeContext()
    const [themeSelection, setThemeSelection] = useState(darkMode ? 'escuro' : 'claro')
    const [secaoAtiva, setSecaoAtiva] = useState(null)
    
    // Estado para guardar os metadados do perfil identificado na sessão
    const [perfilIdentificado, setPerfilIdentificado] = useState({
        nome: 'Amanda',
        isTitular: true
    })

    // Captura a sessão igualzinho ao fluxo de tratamentos
    useEffect(() => {
        const demoDataRaw = localStorage.getItem(DEMO_STORAGE_KEY)
        if (demoDataRaw) {
            const session = JSON.parse(demoDataRaw)
            const nomeUsuario = session.user?.nome || ''

            if (nomeUsuario.includes('Ricardo')) {
                setPerfilIdentificado({
                    nome: 'Ricardo',
                    isTitular: false
                })
            } else if (nomeUsuario.includes('Irene')) {
                setPerfilIdentificado({
                    nome: 'Dona Irene',
                    isTitular: false
                })
            } else {
                setPerfilIdentificado({
                    nome: 'Amanda',
                    isTitular: true
                })
            }
        }
    }, [])

    useEffect(() => {
        setThemeSelection(darkMode ? 'escuro' : 'claro')
    }, [darkMode])

    const cardBgClass = highContrast
        ? 'bg-white text-black border-2 border-black dark:bg-black dark:text-white dark:border-white p-5 space-y-4 rounded-2xl'
        : 'bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800/60 shadow-sm rounded-2xl p-5 space-y-4'

    const rowItemClass = highContrast
        ? 'border-b-2 border-black dark:border-white text-black dark:text-white py-3'
        : 'border-b border-slate-50 dark:border-slate-900/60 hover:bg-slate-50/40 dark:hover:bg-slate-900/20 py-3 px-2 rounded-xl transition-all cursor-pointer flex items-center justify-between'

    const bannerBgClass = highContrast
        ? 'bg-white text-black border-4 border-black dark:bg-black dark:text-white dark:border-white'
        : 'bg-slate-50/60 dark:bg-slate-900/40 border border-slate-100/60 dark:border-slate-800/40'

    const handleThemeChange = (type) => {
        setThemeSelection(type)
        if ((type === 'escuro' && !darkMode) || (type === 'claro' && darkMode)) {
            toggleDarkMode()
        }
    }

    const renderConteudoSecao = () => {
        switch (secaoAtiva) {
            case 'notificacoes':
                return (
                    <div className="space-y-3 text-xs animate-in fade-in duration-200">
                        <label className="flex items-center gap-3 cursor-pointer p-1">
                            <input type="checkbox" defaultChecked className="rounded text-emerald-600 focus:ring-emerald-500 w-4 h-4" />
                            <span>Receber alertas em tempo real sobre novos orçamentos de fórmulas para <strong>{perfilIdentificado.nome}</strong></span>
                        </label>
                        <label className="flex items-center gap-3 cursor-pointer p-1">
                            <input type="checkbox" defaultChecked className="rounded text-emerald-600 focus:ring-emerald-500 w-4 h-4" />
                            <span>Notificações automáticas de atualizações de frete e produção deste perfil</span>
                        </label>
                        {!perfilIdentificado.isTitular && (
                            <label className="flex items-center gap-3 cursor-pointer p-1 border-t border-slate-100 dark:border-slate-800/60 pt-2 mt-2">
                                <input type="checkbox" defaultChecked className="rounded text-emerald-600 focus:ring-emerald-500 w-4 h-4" />
                                <span className="text-purple-600 dark:text-purple-400 font-medium">Notificar também o e-mail principal do titular em caso de urgências médicas</span>
                            </label>
                        )}
                    </div>
                )
            case 'privacidade':
                return (
                    <div className="space-y-4 text-xs animate-in fade-in duration-200">
                        <p className="text-slate-500 dark:text-slate-400 leading-relaxed">
                            Em conformidade com a LGPD, o Aroê garante total transparência sobre o uso dos dados de saúde associados ao perfil de <strong>{perfilIdentificado.nome}</strong>.
                        </p>
                        <label className="flex items-center gap-3 cursor-pointer p-1">
                            <input type="checkbox" defaultChecked className="rounded text-emerald-600 focus:ring-emerald-500 w-4 h-4" />
                            <span>Permitir que farmácias parceiras analisem o histórico fisiológico para fins de segurança de interação medicamentosa.</span>
                        </label>
                        <button className="text-xs font-bold text-rose-500 hover:underline block pt-2">
                            {perfilIdentificado.isTitular 
                                ? 'Solicitar revogação ou eliminação total de meus dados cadastrais' 
                                : `Solicitar a revogação de compartilhamento e exclusão dos dados de ${perfilIdentificado.nome}`}
                        </button>
                    </div>
                )
            case 'pagamento':
                return (
                    <div className="space-y-3 animate-in fade-in duration-200">
                        {perfilIdentificado.isTitular ? (
                            <>
                                <div className="border border-slate-100 dark:border-slate-800/60 p-4 rounded-xl flex items-center justify-between text-xs">
                                    <div className="flex items-center gap-3">
                                        <div className="p-2 bg-slate-100 dark:bg-slate-800 rounded-lg font-mono font-bold tracking-wider">•••• 4321</div>
                                        <div>
                                            <p className="font-bold">Visa Classic (Principal)</p>
                                            <p className="text-[10px] text-slate-400">Expira em: 12/29</p>
                                        </div>
                                    </div>
                                    <span className="text-[10px] bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-400 px-2 py-0.5 rounded font-bold">Ativo</span>
                                </div>
                                <button className="bg-emerald-600 text-white text-xs font-bold px-4 py-2 rounded-xl hover:bg-emerald-700 transition-colors">
                                    Adicionar Novo Cartão
                                </button>
                            </>
                        ) : (
                            <div className="space-y-2">
                                <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                                    Os custos e orçamentos do perfil de <strong>{perfilIdentificado.nome}</strong> são gerenciados e cobrados diretamente através do método de pagamento principal do titular da conta.
                                </p>
                                <div className="border border-dashed border-slate-200 dark:border-slate-800 p-4 rounded-xl text-center text-xs text-slate-400">
                                    Nenhum método de faturamento isolado atribuído para este dependente.
                                </div>
                            </div>
                        )}
                    </div>
                )
            default:
                return (
                    <div className="text-xs text-slate-400 p-4 border border-dashed rounded-xl text-center">
                        Funcionalidade de {PREFERENCIAS_LISTA.find(p => p.id === secaoAtiva)?.titulo} para {perfilIdentificado.nome} em homologação.
                    </div>
                )
        }
    }

    return (
        <div className="space-y-6 max-w-4xl mx-auto pb-12">
            <div className="flex flex-col gap-1">
                <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Configurações</h2>
                <p className="text-sm text-slate-500 dark:text-slate-400">
                    Personalize as preferências, segurança e privacidade do perfil de <strong>{perfilIdentificado.nome}</strong>
                </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
                
                {/* LISTA DE PREFERÊNCIAS / CONTEÚDO DINÂMICO */}
                <div className="lg:col-span-2 space-y-5">
                    <div className="flex items-center gap-3">
                        {secaoAtiva !== null && (
                            <button 
                                onClick={() => setSecaoAtiva(null)}
                                className="p-1.5 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg text-slate-500 transition-colors"
                            >
                                <ArrowLeft size={16} />
                            </button>
                        )}
                        <div>
                            <h3 className="text-sm font-bold text-slate-900 dark:text-white tracking-tight">
                                {secaoAtiva === null 
                                    ? `Preferências Gerais da Conta (${perfilIdentificado.nome})` 
                                    : `${PREFERENCIAS_LISTA.find(p => p.id === secaoAtiva)?.titulo} — ${perfilIdentificado.nome}`
                                }
                            </h3>
                            {secaoAtiva !== null && (
                                <p className="text-xs text-slate-400 dark:text-slate-500">
                                    {PREFERENCIAS_LISTA.find(p => p.id === secaoAtiva)?.descricao}
                                </p>
                            )}
                        </div>
                    </div>

                    {secaoAtiva === null ? (
                        <div className="space-y-1">
                            {PREFERENCIAS_LISTA.map((item) => {
                                const IconComponent = item.icon
                                return (
                                    <div
                                        key={item.id}
                                        onClick={() => setSecaoAtiva(item.id)}
                                        className={rowItemClass}
                                    >
                                        <div className="flex items-center gap-3">
                                            <div className={`p-2 rounded-xl ${item.iconBg} shrink-0`}>
                                                <IconComponent size={16} />
                                            </div>
                                            <div className="text-left">
                                                <h4 className="text-xs font-bold text-slate-800 dark:text-slate-200">{item.titulo}</h4>
                                                <p className="text-[11px] text-slate-400 dark:text-slate-500 leading-tight">{item.descricao}</p>
                                            </div>
                                        </div>
                                        <ChevronRight size={14} className="text-slate-400" />
                                    </div>
                                )
                            })}
                        </div>
                    ) : (
                        <div className={cardBgClass}>
                            {renderConteudoSecao()}
                        </div>
                    )}
                </div>

                {/* PAINEL LATERAL DE TEMA E INTERFACE (Global do Sistema) */}
                <div className={cardBgClass}>
                    <div className="border-b border-slate-100 dark:border-slate-800 pb-2">
                        <h4 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider">Aparência do Painel</h4>
                    </div>

                    <div className={`p-3 rounded-xl flex items-center justify-between text-xs ${bannerBgClass}`}>
                        <span className="font-medium text-slate-600 dark:text-slate-400">Alto Contraste</span>
                        <span className="font-bold text-purple-600 dark:text-purple-400">
                            {highContrast ? 'ATIVADO' : 'DESATIVADO'}
                        </span>
                    </div>

                    <div className="space-y-2 pt-1">
                        <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">Tema Visual</label>
                        <div className="grid grid-cols-2 gap-2">
                            <button
                                type="button"
                                onClick={() => handleThemeChange('claro')}
                                className={`p-2.5 rounded-xl border text-xs font-semibold flex items-center justify-center gap-1.5 transition-all ${
                                    themeSelection === 'claro'
                                        ? 'border-emerald-500 bg-emerald-50/40 text-emerald-600 dark:bg-emerald-950/20'
                                        : 'border-slate-100 dark:border-slate-800 text-slate-500 hover:bg-slate-50'
                                }`}
                            >
                                <Sun size={14} /> Claro
                            </button>
                            <button
                                type="button"
                                onClick={() => handleThemeChange('escuro')}
                                className={`p-2.5 rounded-xl border text-xs font-semibold flex items-center justify-center gap-1.5 transition-all ${
                                    themeSelection === 'escuro'
                                        ? 'border-emerald-500 bg-emerald-50/40 text-emerald-400 dark:bg-emerald-950/20'
                                        : 'border-slate-100 dark:border-slate-800 text-slate-500 hover:bg-slate-50'
                                }`}
                            >
                                <Moon size={14} /> Escuro
                            </button>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
}