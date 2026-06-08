import { useState, useEffect } from 'react'
import { 
    Lock, 
    Bell, 
    Shield, 
    CreditCard, 
    Globe, 
    ChevronRight,
    ArrowLeft,
    CheckCircle2,
    Briefcase
} from 'lucide-react'
import { useThemeContext } from '../../../contexts/ThemeContext'

const DEMO_STORAGE_KEY = '@Aroe:demo_session'

const PREFERENCIAS_LISTA = [
    {
        id: 'notificacoes',
        titulo: 'Central de Alertas',
        descricao: 'Escolha como receber avisos de novos orçamentos solicitados por pacientes',
        icon: Bell,
        iconBg: 'bg-emerald-50 text-emerald-600 dark:bg-emerald-950/40 dark:text-emerald-400'
    },
    {
        id: 'privacidade',
        titulo: 'Segurança & ANVISA / LGPD',
        descricao: 'Gerencie normas de sigilo de receitas digitais e dados compartilhados',
        icon: Shield,
        iconBg: 'bg-emerald-50 text-emerald-600 dark:bg-emerald-950/40 dark:text-emerald-400'
    },
    {
        id: 'pagamento',
        titulo: 'Repasses e Faturamento',
        descricao: 'Configure a conta bancária para recebimento do ecossistema Aroê',
        icon: CreditCard,
        iconBg: 'bg-emerald-50 text-emerald-600 dark:bg-emerald-950/40 dark:text-emerald-400'
    },
    {
        id: 'idioma',
        titulo: 'Idioma e Região',
        descricao: 'Defina o fuso horário padrão para a contagem de SLA de entrega',
        icon: Globe,
        iconBg: 'bg-emerald-50 text-emerald-600 dark:bg-emerald-950/40 dark:text-emerald-400'
    }
]

export default function DashboardConfiguracoes() {
    const { highContrast, darkMode, toggleDarkMode } = useThemeContext()
    const [themeSelection, setThemeSelection] = useState(darkMode ? 'escuro' : 'claro')
    const [secaoAtiva, setSecaoAtiva] = useState(null)
    
    const [perfilIdentificado, setPerfilIdentificado] = useState({
        nome: 'Amanda',
        tipo: 'paciente',
        isTitular: true
    })

    useEffect(() => {
        const demoDataRaw = localStorage.getItem(DEMO_STORAGE_KEY)
        if (demoDataRaw) {
            const session = JSON.parse(demoDataRaw)
            const userObj = session.user || session
            const nomeUsuario = userObj?.nome || ''

            if (nomeUsuario.includes('Ricardo')) {
                setPerfilIdentificado({ nome: 'Ricardo', tipo: 'paciente', isTitular: false })
            } else if (nomeUsuario.includes('Irene')) {
                setPerfilIdentificado({ nome: 'Dona Irene', tipo: 'paciente', isTitular: false })
            } else if (nomeUsuario.includes('Farmacia') || nomeUsuario.includes('Central')) {
                setPerfilIdentificado({ nome: 'Farmácia Central', tipo: 'farmacia', isTitular: true })
            } else {
                setPerfilIdentificado({ nome: 'Amanda', tipo: 'paciente', isTitular: true })
            }
        }
    }, [])

    useEffect(() => {
        setThemeSelection(darkMode ? 'escuro' : 'claro')
    }, [darkMode])

    const isFarmacia = perfilIdentificado.tipo === 'farmacia'

    const cardBgClass = highContrast
        ? 'bg-white text-black border-2 border-black dark:bg-black dark:text-white dark:border-white p-5 space-y-4 rounded-2xl'
        : 'bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800/60 shadow-sm rounded-2xl p-5 space-y-4'

    const rowItemClass = highContrast
        ? 'border-b-2 border-black dark:border-white text-black dark:text-white py-3'
        : 'border-b border-slate-50 dark:border-slate-900/60 hover:bg-slate-50/40 dark:hover:bg-slate-900/20 py-3 px-2 rounded-xl transition-all cursor-pointer flex items-center justify-between'

    const renderConteudoSecao = () => {
        switch (secaoAtiva) {
            case 'notificacoes':
                return (
                    <div className="space-y-3 text-xs animate-in fade-in duration-200">
                        <label className="flex items-center gap-3 cursor-pointer p-1">
                            <input type="checkbox" defaultChecked className="rounded text-emerald-600 focus:ring-emerald-500 w-4 h-4" />
                            <span>{isFarmacia 
                                ? 'Notificar via e-mail a cada nova receita enviada para cotação.' 
                                : `Receber alertas sobre orçamentos para ${perfilIdentificado.nome}`}</span>
                        </label>
                        <label className="flex items-center gap-3 cursor-pointer p-1">
                            <input type="checkbox" defaultChecked className="rounded text-emerald-600 focus:ring-emerald-500 w-4 h-4" />
                            <span>{isFarmacia 
                                ? 'Alertar o laboratório quando o prazo de manipulação (SLA) estiver perto do limite.' 
                                : 'Notificações automáticas de atualizações de frete.'}</span>
                        </label>
                    </div>
                )
            case 'privacidade':
                return (
                    <div className="space-y-4 text-xs animate-in fade-in duration-200">
                        <p className="text-slate-500 dark:text-slate-400 leading-relaxed">
                            {isFarmacia 
                                ? 'Os dados recebidos dos pacientes estão resguardados sob o sigilo médico-farmacêutico e diretrizes gerais de compliance da ANVISA.'
                                : `O Aroê garante total transparência sobre o uso dos dados de saúde de ${perfilIdentificado.nome}.`}
                        </p>
                        {isFarmacia && (
                            <label className="flex items-center gap-3 cursor-pointer p-1">
                                <input type="checkbox" defaultChecked className="rounded text-emerald-600 focus:ring-emerald-500 w-4 h-4" />
                                <span>Bloquear download local de receitas com dados sensíveis de pacientes (Recomendado).</span>
                            </label>
                        )}
                    </div>
                )
            case 'pagamento':
                return (
                    <div className="space-y-3 animate-in fade-in duration-200">
                        {isFarmacia ? (
                            <>
                                <div className="border border-slate-100 dark:border-slate-800/60 p-4 rounded-xl flex items-center justify-between text-xs">
                                    <div className="flex items-center gap-3">
                                        <div className="p-2 bg-slate-100 dark:bg-slate-800 rounded-lg font-mono font-bold">Banco PJ</div>
                                        <div>
                                            <p className="font-bold">Agência: 0001 | Conta: 99843-2</p>
                                            <p className="text-[10px] text-slate-400">Banco Itaú Unibanco S.A.</p>
                                        </div>
                                    </div>
                                    <span className="text-[10px] bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-400 px-2 py-0.5 rounded font-bold">Padrão</span>
                                </div>
                                <button className="bg-emerald-600 text-white text-xs font-bold px-4 py-2 rounded-xl hover:bg-emerald-700 transition-colors">
                                    Alterar Domicílio Bancário
                                </button>
                            </>
                        ) : (
                            <div className="space-y-2">
                                <p className="text-xs text-slate-400">Cartão Visa cadastrado final 4321</p>
                            </div>
                        )}
                    </div>
                )
            default:
                return (
                    <div className="text-xs text-slate-400 p-4 border border-dashed rounded-xl text-center">
                        Funcionalidade em homologação para {perfilIdentificado.nome}.
                    </div>
                )
        }
    }

    return (
        <div className="space-y-6 max-w-4xl mx-auto pb-12">
            <div className="flex flex-col gap-1">
                <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Configurações</h2>
                <p className="text-sm text-slate-500 dark:text-slate-400">
                    Personalize o comportamento do seu painel corporativo ou pessoal.
                </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
                <div className="lg:col-span-2 space-y-5">
                    <div className="flex items-center gap-3">
                        {secaoAtiva !== null && (
                            <button onClick={() => setSecaoAtiva(null)} className="p-1.5 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg text-slate-500 transition-colors">
                                <ArrowLeft size={16} />
                            </button>
                        )}
                        <div>
                            <h3 className="text-sm font-bold text-slate-900 dark:text-white tracking-tight">
                                {secaoAtiva === null 
                                    ? `Preferências Gerais (${perfilIdentificado.nome})` 
                                    : `${PREFERENCIAS_LISTA.find(p => p.id === secaoAtiva)?.titulo}`}
                            </h3>
                        </div>
                    </div>

                    {secaoAtiva === null ? (
                        <div className="space-y-1">
                            {PREFERENCIAS_LISTA.map((item) => {
                                const IconComponent = item.icon
                                // Altera os labels textuais em tempo de renderização caso seja farmácia
                                let tituloFinal = item.titulo
                                let descFinal = item.descricao
                                
                                if (isFarmacia && item.id === 'pagamento') {
                                    tituloFinal = 'Dados para Repasse PIX/Ted'
                                    descFinal = 'Gerencie as contas bancárias onde recebe os pagamentos dos pedidos'
                                }

                                return (
                                    <div key={item.id} onClick={() => setSecaoAtiva(item.id)} className={rowItemClass}>
                                        <div className="flex items-center gap-3">
                                            <div className={`p-2 rounded-xl ${item.iconBg} shrink-0`}>
                                                <IconComponent size={16} />
                                            </div>
                                            <div className="text-left">
                                                <h4 className="text-xs font-bold text-slate-800 dark:text-slate-200">{tituloFinal}</h4>
                                                <p className="text-[11px] text-slate-400 dark:text-slate-500 leading-tight">{descFinal}</p>
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

                {/* ABA LATERAL DE TEMA */}
                <div className={cardBgClass}>
                    <h3 className="text-sm font-bold text-slate-900 dark:text-white">Aparência do Painel</h3>
                    <div className="grid grid-cols-2 gap-2">
                        <button onClick={() => toggleDarkMode()} className={`p-3 text-xs rounded-xl border flex flex-col items-center gap-2 ${!darkMode ? 'border-purple-500 bg-purple-50/50 text-purple-700' : 'border-slate-200 dark:border-slate-800'}`}>
                            Claro
                        </button>
                        <button onClick={() => toggleDarkMode()} className={`p-3 text-xs rounded-xl border flex flex-col items-center gap-2 ${darkMode ? 'border-purple-400 bg-purple-950/20 text-purple-400' : 'border-slate-200 dark:border-slate-800'}`}>
                            Escuro
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}