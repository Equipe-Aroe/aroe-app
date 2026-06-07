import { useState } from 'react'
import { 
    User, 
    Lock, 
    Bell, 
    Shield, 
    CreditCard, 
    MapPin, 
    Globe, 
    Heart,
    ChevronRight,
    Sun,
    Moon,
    Monitor,
    HelpCircle,
    MessageSquare,
    Info,
    LogOut,
    ExternalLink,
    ArrowLeft
} from 'lucide-react'
import { useThemeContext } from '../../../contexts/ThemeContext'

const PREFERENCIAS_LISTA = [
    {
        id: 'dados',
        titulo: 'Dados pessoais',
        descricao: 'Gerencie suas informações pessoais e de contato',
        icon: User,
        iconBg: 'bg-emerald-50 text-emerald-600 dark:bg-emerald-950/40 dark:text-emerald-400'
    },
    {
        id: 'seguranca',
        titulo: 'Segurança',
        descricao: 'Altere sua senha e gerencie acesso à sua conta',
        icon: Lock,
        iconBg: 'bg-emerald-50 text-emerald-600 dark:bg-emerald-950/40 dark:text-emerald-400'
    },
    {
        id: 'notificacoes',
        titulo: 'Notificações',
        descricao: 'Escolha como e quando deseja receber notificações',
        icon: Bell,
        iconBg: 'bg-emerald-50 text-emerald-600 dark:bg-emerald-950/40 dark:text-emerald-400'
    },
    {
        id: 'privacidade',
        titulo: 'Privacidade',
        descricao: 'Gerencie seus dados e preferência de privacidade',
        icon: Shield,
        iconBg: 'bg-emerald-50 text-emerald-600 dark:bg-emerald-950/40 dark:text-emerald-400'
    },
    {
        id: 'pagamento',
        titulo: 'Métodos de pagamento',
        descricao: 'Cadastre e gerencie seus cartões e formas de pagamento',
        icon: CreditCard,
        iconBg: 'bg-emerald-50 text-emerald-600 dark:bg-emerald-950/40 dark:text-emerald-400'
    },
    {
        id: 'enderecos',
        titulo: 'Endereços',
        descricao: 'Gerencie seus endereços de entrega',
        icon: MapPin,
        iconBg: 'bg-emerald-50 text-emerald-600 dark:bg-emerald-950/40 dark:text-emerald-400'
    },
    {
        id: 'idioma',
        titulo: 'Idioma e região',
        descricao: 'Defina o idioma e suas preferências regionais',
        icon: Globe,
        iconBg: 'bg-emerald-50 text-emerald-600 dark:bg-emerald-950/40 dark:text-emerald-400'
    }
]

export default function DashboardConfiguracoes() {
    const { highContrast, darkMode, toggleDarkMode } = useThemeContext()
    const [themeSelection, setThemeSelection] = useState(darkMode ? 'escuro' : 'claro')
    const [secaoAtiva, setSecaoAtiva] = useState(null)

    const cardBgClass = highContrast
        ? 'bg-white text-black border-2 border-black dark:bg-black dark:text-white dark:border-white p-5 space-y-4 rounded-2xl'
        : 'bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800/60 shadow-sm rounded-2xl p-5 space-y-4'

    const rowItemClass = highContrast
        ? 'border-b-2 border-black dark:border-white text-black dark:text-white py-3'
        : 'border-b border-slate-50 dark:border-slate-900/60 hover:bg-slate-50/40 dark:hover:bg-slate-900/20 py-3 px-2 rounded-xl transition-all'

    const bannerBgClass = highContrast
        ? 'bg-white text-black border-4 border-black dark:bg-black dark:text-white dark:border-white'
        : 'bg-slate-50/60 dark:bg-slate-900/40 border border-slate-100/60 dark:border-slate-800/40'

    const radioCircleClass = highContrast
        ? 'border-2 border-black dark:border-white'
        : 'border border-slate-300 dark:border-slate-700'

    const inputClass = highContrast
        ? 'border-2 border-black bg-white text-black dark:bg-black dark:text-white dark:border-white p-2 rounded-lg text-xs w-full'
        : 'border border-slate-200 dark:border-slate-700 bg-transparent p-2 rounded-lg text-xs w-full focus:outline-none focus:border-emerald-500'

    const handleThemeChange = (type) => {
        setThemeSelection(type)
        if ((type === 'escuro' && !darkMode) || (type === 'claro' && darkMode)) {
            toggleDarkMode()
        }
    }

    const renderConteudoSecao = () => {
        switch (secaoAtiva) {
            case 'dados':
                return (
                    <div className="space-y-4 animate-in fade-in duration-200">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="text-xs font-bold block mb-1">Nome Completo</label>
                                <input type="text" defaultValue="Amanda Santos" className={inputClass} />
                            </div>
                            <div>
                                <label className="text-xs font-bold block mb-1">E-mail</label>
                                <input type="email" defaultValue="amanda.silva@email.com" className={inputClass} />
                            </div>
                        </div>
                        <button className="bg-emerald-600 text-white text-xs font-bold px-4 py-2 rounded-xl hover:bg-emerald-700 transition-colors">
                            Salvar Alterações
                        </button>
                    </div>
                )
            case 'seguranca':
                return (
                    <div className="space-y-4 animate-in fade-in duration-200">
                        <div className="max-w-xs space-y-3">
                            <div>
                                <label className="text-xs font-bold block mb-1">Senha Atual</label>
                                <input type="password" className={inputClass} />
                            </div>
                            <div>
                                <label className="text-xs font-bold block mb-1">Nova Senha</label>
                                <input type="password" className={inputClass} />
                            </div>
                        </div>
                        <button className="bg-emerald-600 text-white text-xs font-bold px-4 py-2 rounded-xl hover:bg-emerald-700 transition-colors">
                            Atualizar Senha
                        </button>
                    </div>
                )
            case 'notificacoes':
                return (
                    <div className="space-y-3 text-xs animate-in fade-in duration-200">
                        <label className="flex items-center gap-3 cursor-pointer p-1">
                            <input type="checkbox" defaultChecked className="rounded text-emerald-600 focus:ring-emerald-500 w-4 h-4" />
                            <span>Receber alertas sobre novos orçamentos de fórmulas</span>
                        </label>
                        <label className="flex items-center gap-3 cursor-pointer p-1">
                            <input type="checkbox" defaultChecked className="rounded text-emerald-600 focus:ring-emerald-500 w-4 h-4" />
                            <span>Notificações de atualizações de frete e entrega</span>
                        </label>
                    </div>
                )
            default:
                return (
                    <div className="text-xs text-slate-400 p-4 border border-dashed rounded-xl text-center">
                        Funcionalidade de {PREFERENCIAS_LISTA.find(p => p.id === secaoAtiva)?.titulo} em desenvolvimento.
                    </div>
                )
        }
    }

    return (
        <div className="space-y-6">
            <div className="flex flex-col gap-1 md:hidden">
                <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Configurações</h2>
                <p className="text-sm text-slate-500 dark:text-slate-400">Personalize sua experiência no Aroê</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
                
                <div className="lg:col-span-2 space-y-5">
                    <div className="flex items-center gap-3">
                        {secaoAtiva !== null && (
                            <button 
                                onClick={() => setSecaoAtiva(null)}
                                className="p-1.5 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg text-slate-500 transition-colors"
                                title="Voltar para a lista"
                            >
                                <ArrowLeft size={16} />
                            </button>
                        )}
                        <div>
                            <h3 className="text-sm font-bold text-slate-900 dark:text-white tracking-tight">
                                {secaoAtiva === null 
                                    ? 'Preferências da conta' 
                                    : PREFERENCIAS_LISTA.find(p => p.id === secaoAtiva)?.titulo
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
                        <div className="space-y-0.5">
                            {PREFERENCIAS_LISTA.map((item) => {
                                const IconComponent = item.icon
                                return (
                                    <div
                                        key={item.id}
                                        onClick={() => setSecaoAtiva(item.id)}
                                        className={`flex items-center justify-between cursor-pointer group ${rowItemClass}`}
                                    >
                                        <div className="flex items-center gap-4 min-w-0">
                                            <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${highContrast ? 'border border-black dark:border-white text-current' : item.iconBg}`}>
                                                <IconComponent size={18} />
                                            </div>
                                            <div className="min-w-0">
                                                <h4 className="text-sm font-bold text-slate-900 dark:text-white leading-tight">
                                                    {item.titulo}
                                                </h4>
                                                <p className="text-xs text-slate-400 dark:text-slate-500 truncate mt-0.5">
                                                    {item.descricao}
                                                </p>
                                            </div>
                                        </div>
                                        <ChevronRight size={16} className="text-slate-400 dark:text-slate-600 group-hover:translate-x-0.5 transition-transform shrink-0 ml-2" />
                                    </div>
                                )
                            })}
                        </div>
                    ) : (
                        <div className={cardBgClass}>
                            {renderConteudoSecao()}
                        </div>
                    )}

                    <div className={`p-5 rounded-3xl flex items-center gap-4 ${bannerBgClass}`}>
                        <div className="w-12 h-12 rounded-full bg-white dark:bg-slate-900 text-emerald-600 dark:text-emerald-400 flex items-center justify-center border border-slate-100 dark:border-slate-800 shrink-0 shadow-sm">
                            <Heart size={20} className="fill-current" />
                        </div>
                        <div>
                            <h4 className="text-sm font-bold text-slate-900 dark:text-white leading-tight">
                                Pequenas escolhas, grandes transformações
                            </h4>
                            <p className="text-xs text-slate-400 dark:text-slate-500 mt-0.5">
                                A constância é a chave para o bem-estar.
                            </p>
                        </div>
                    </div>
                </div>

                <div className="space-y-5">
                    <div className={cardBgClass}>
                        <h3 className="text-xs font-bold text-slate-400 dark:text-slate-500 tracking-wider uppercase">
                            Resumo do pedido
                        </h3>
                        <div className="flex items-center gap-3 pt-1">
                            <img
                                src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=80&h=80&q=80"
                                alt="Amanda Santos"
                                className="w-12 h-12 rounded-full object-cover border border-slate-100 dark:border-slate-800"
                            />
                            <div className="min-w-0">
                                <h4 className="text-sm font-bold text-slate-900 dark:text-white truncate">Amanda Santos</h4>
                                <p className="text-xs text-slate-400 dark:text-slate-500 underline truncate cursor-pointer">
                                    amanda.silva@email.com
                                </p>
                            </div>
                        </div>
                        <div className="pt-2">
                            <button 
                                onClick={() => setSecaoAtiva('dados')}
                                className="text-xs font-bold text-emerald-600 dark:text-emerald-400 hover:underline"
                            >
                                Ver meu perfil
                            </button>
                        </div>
                    </div>

                    <div className={cardBgClass}>
                        <div>
                            <h3 className="text-sm font-bold text-slate-900 dark:text-white">Tema da aplicação</h3>
                            <p className="text-xs text-slate-400 dark:text-slate-500 mt-0.5">
                                Escolha o tema que mais combina com você
                            </p>
                        </div>

                        <div className="space-y-2 pt-2">
                            <button 
                                onClick={() => handleThemeChange('claro')}
                                className="w-full flex items-center justify-between p-2 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800/40 text-left text-xs transition-all"
                            >
                                <span className="flex items-center gap-2.5 font-semibold text-slate-700 dark:text-slate-300">
                                    <Sun size={16} className="text-slate-400" /> Claro
                                </span>
                                <div className={`w-4 h-4 rounded-full flex items-center justify-center ${radioCircleClass} ${themeSelection === 'claro' ? 'border-emerald-500 dark:border-emerald-400' : ''}`}>
                                    {themeSelection === 'claro' && <div className="w-2 h-2 rounded-full bg-emerald-500 dark:bg-emerald-400" />}
                                </div>
                            </button>

                            <button 
                                onClick={() => handleThemeChange('escuro')}
                                className="w-full flex items-center justify-between p-2 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800/40 text-left text-xs transition-all"
                            >
                                <span className="flex items-center gap-2.5 font-semibold text-slate-700 dark:text-slate-300">
                                    <Moon size={16} className="text-slate-400" /> Escuro
                                </span>
                                <div className={`w-4 h-4 rounded-full flex items-center justify-center ${radioCircleClass} ${themeSelection === 'escuro' ? 'border-emerald-500 dark:border-emerald-400' : ''}`}>
                                    {themeSelection === 'escuro' && <div className="w-2 h-2 rounded-full bg-emerald-500 dark:bg-emerald-400" />}
                                </div>
                            </button>

                            <button 
                                onClick={() => setThemeSelection('automatico')}
                                className="w-full flex items-center justify-between p-2 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800/40 text-left text-xs transition-all"
                            >
                                <span className="flex items-center gap-2.5 font-semibold text-slate-700 dark:text-slate-300">
                                    <Monitor size={16} className="text-slate-400" /> Automático
                                </span>
                                <div className={`w-4 h-4 rounded-full flex items-center justify-center ${radioCircleClass} ${themeSelection === 'automatico' ? 'border-emerald-500 dark:border-emerald-400' : ''}`}>
                                    {themeSelection === 'automatico' && <div className="w-2 h-2 rounded-full bg-emerald-500 dark:bg-emerald-400" />}
                                </div>
                            </button>
                        </div>
                    </div>

                    <div className={cardBgClass}>
                        <h3 className="text-xs font-bold text-slate-400 dark:text-slate-500 tracking-wider uppercase">
                            Outras opções
                        </h3>
                        <div className="space-y-1.5 pt-1">
                            <button className="w-full flex items-center justify-between p-2 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800/40 text-left text-xs font-semibold text-slate-700 dark:text-slate-300 transition-all">
                                <span className="flex items-center gap-2.5"><HelpCircle size={16} className="text-slate-400" /> Central de ajuda</span>
                                <ExternalLink size={14} className="text-slate-400" />
                            </button>
                            <button className="w-full flex items-center justify-between p-2 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800/40 text-left text-xs font-semibold text-slate-700 dark:text-slate-300 transition-all">
                                <span className="flex items-center gap-2.5"><MessageSquare size={16} className="text-slate-400" /> Fale conosco</span>
                                <ExternalLink size={14} className="text-slate-400" />
                            </button>
                            <button className="w-full flex items-center justify-between p-2 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800/40 text-left text-xs font-semibold text-slate-700 dark:text-slate-300 transition-all">
                                <span className="flex items-center gap-2.5"><Info size={16} className="text-slate-400" /> Sobre à Aroê</span>
                                <ChevronRight size={14} className="text-slate-400" />
                            </button>
                            <button className="w-full flex items-center justify-between p-2 rounded-xl hover:bg-rose-50 dark:hover:bg-rose-950/20 text-left text-xs font-bold text-rose-500 transition-all">
                                <span className="flex items-center gap-2.5"><LogOut size={16} /> Sair da conta</span>
                                <ChevronRight size={14} />
                            </button>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}
