import { useState, useEffect } from 'react'
import { 
    Calendar, 
    Clock, 
    Pill, 
    Plus, 
    MoreVertical, 
    FileText,
    Activity 
} from 'lucide-react'
import { useThemeContext } from '../../../contexts/ThemeContext'

const DEMO_STORAGE_KEY = '@Aroe:demo_session'

// Tratamento padrão (Fallback - Amanda)
const TRATAMENTO_PRINCIPAL_PADRAO = {
    nome: 'Enzimas digestivas',
    tipo: 'Fórmula manipulada',
    status: 'Em andamento',
    iniciadoEm: '15/04/2025',
    duracao: '30 dias',
    frequencia: '1 cápsula por dia',
    progresso: 70,
    progressoTexto: '20 de 30 dias concluídos'
}

const OUTROS_TRATAMENTOS_MOCK_PADRAO = [
    {
        nome: 'Complexo Vitamínico B',
        tipo: 'Suplementação manipulada',
        status: 'Entregue',
        statusCor: 'bg-purple-100 text-purple-700 dark:bg-purple-950/40 dark:text-purple-400',
        iniciadoEm: '10/03/2025',
        duracao: '60 dias',
        frequencia: '1 cápsula pela manhã'
    }
]

export default function DashboardTratamentos() {
    const { highContrast } = useThemeContext()
    const [activeTab, setActiveTab] = useState('ativos')
    
    // Estados dinâmicos que mudam de acordo com o Ricardo ou Dona Irene
    const [tratamentoPrincipal, setTratamentoPrincipal] = useState(TRATAMENTO_PRINCIPAL_PADRAO)
    const [outrosTratamentos, setOutrosTratamentos] = useState(OUTROS_TRATAMENTOS_MOCK_PADRAO)

    // Captura os dados injetados da Persona no ciclo de vida do componente
    useEffect(() => {
        const demoDataRaw = localStorage.getItem(DEMO_STORAGE_KEY)
        
        if (demoDataRaw) {
            const session = JSON.parse(demoDataRaw)
            const nomeUsuario = session.user?.nome || ''

            if (nomeUsuario.includes('Ricardo')) {
                // Injeta o tratamento de Hipertensão e Vitaminas do Ricardo
                setTratamentoPrincipal({
                    nome: 'Anti-hipertensivo (Losartana + Anlodipino)',
                    tipo: 'Tratamento Contínuo',
                    status: 'Em andamento',
                    iniciadoEm: new Date().toLocaleDateString('pt-BR'),
                    duracao: 'Uso Contínuo',
                    frequencia: '1 cápsula a cada 12h',
                    progresso: 15,
                    progressoTexto: 'Tratamento recém-iniciado (Fórmula Nova)'
                })

                setOutrosTratamentos([
                    {
                        nome: 'Complexo Vitamínico (D3 + B12 Personalizado)',
                        tipo: 'Suplementação de Hipovitaminose',
                        status: 'Produzindo',
                        statusCor: 'bg-amber-100 text-amber-700 dark:bg-amber-950/40 dark:text-amber-400',
                        iniciadoEm: 'Aguardando Lab',
                        duracao: '90 dias',
                        frequencia: '1 cápsula ao dia no almoço'
                    }
                ])
            } 
            else if (nomeUsuario.includes('Irene')) {
                // Injeta o tratamento de Osteoporose e o do cachorrinho Fred
                setTratamentoPrincipal({
                    nome: 'Biscoito Cardiopata Palatável (Fred 🐶)',
                    tipo: 'Fórmula Manipulada Veterinária',
                    status: 'Em andamento',
                    iniciadoEm: new Date().toLocaleDateString('pt-BR'),
                    duracao: '30 dias',
                    frequencia: '1 biscoito sabor carne por dia',
                    progresso: 40,
                    progressoTexto: '12 de 30 biscoitos consumidos'
                })

                setOutrosTratamentos([
                    {
                        nome: 'Cálcio + Alendronato Sódico',
                        tipo: 'Tratamento de Osteoporose (Dona Irene)',
                        status: 'Entregue',
                        statusCor: 'bg-purple-100 text-purple-700 dark:bg-purple-950/40 dark:text-purple-400',
                        iniciadoEm: '01/05/2026',
                        duracao: '180 dias',
                        frequencia: '1 vez ao dia pela manhã'
                    }
                ])
            }
        }
    }, [])

    // Estilização condicional baseada no contexto de Alto Contraste
    const cardDestaqueBgClass = highContrast
        ? 'bg-white text-black border-4 border-black dark:bg-black dark:text-white dark:border-white'
        : 'bg-slate-50/60 dark:bg-slate-900/40 border border-slate-100/80 dark:border-slate-800/60 shadow-sm'

    const cardBgClass = highContrast
        ? 'bg-white text-black border-2 border-black dark:bg-black dark:text-white dark:border-white'
        : 'bg-white dark:bg-slate-900 border border-slate-50 dark:border-slate-800/40 shadow-sm'

    const progressContainerClass = highContrast
        ? 'bg-white border-2 border-black dark:bg-black dark:border-white'
        : 'bg-white dark:bg-slate-950 border border-slate-100 dark:border-slate-800/80 shadow-md shadow-slate-100/50 dark:shadow-none'

    const progressBarBgClass = highContrast ? 'bg-slate-200 dark:bg-slate-800' : 'bg-slate-100 dark:bg-slate-800'
    const progressBarFillClass = highContrast ? 'bg-black dark:bg-white' : 'bg-purple-600 dark:bg-purple-500'

    const buttonActionClass = highContrast
        ? 'bg-black text-white hover:bg-black/80 dark:bg-white dark:text-black'
        : 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-sm'

    const buttonSecondaryClass = highContrast
        ? 'border-2 border-black text-black dark:border-white dark:text-white font-black'
        : 'border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-900'

    const buttonDestaqueClass = highContrast
        ? 'bg-black text-white dark:bg-white dark:text-black font-black'
        : 'bg-purple-500 hover:bg-purple-600 text-white shadow-sm'

    return (
        <div className="space-y-6">
            {/* Título de seção Mobile */}
            <div className="flex flex-col gap-1 md:hidden">
                <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Tratamentos</h2>
                <p className="text-sm text-slate-500 dark:text-slate-400">
                    Acompanhe seus tratamentos e cuide da sua saúde.
                </p>
            </div>

            {/* Abas e Botão Adicionar */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 dark:border-slate-800/60 pb-1">
                <div className="flex items-center gap-6">
                    <button
                        onClick={() => setActiveTab('ativos')}
                        className={`pb-3 text-sm font-bold transition-all relative ${
                            activeTab === 'ativos'
                                ? 'text-emerald-600 dark:text-emerald-400'
                                : 'text-slate-400 dark:text-slate-500 hover:text-slate-600'
                        }`}
                    >
                        Ativos
                        {activeTab === 'ativos' && (
                            <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-emerald-500 dark:bg-emerald-400 rounded-full" />
                        )}
                    </button>
                    <button
                        onClick={() => setActiveTab('concluidos')}
                        className={`pb-3 text-sm font-bold transition-all relative ${
                            activeTab === 'concluidos'
                                ? 'text-emerald-600 dark:text-emerald-400'
                                : 'text-slate-400 dark:text-slate-500 hover:text-slate-600'
                        }`}
                    >
                        Concluídos
                        {activeTab === 'concluidos' && (
                            <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-emerald-500 dark:bg-emerald-400 rounded-full" />
                        )}
                    </button>
                </div>

                <button className={`flex items-center justify-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all shrink-0 ${buttonActionClass}`}>
                    <Plus size={14} />
                    Adicionar tratamento
                </button>
            </div>

            {/* CARD EM DESTAQUE: Tratamento Principal Ativo (Dinâmico) */}
            <div className={`p-6 rounded-3xl flex flex-col xl:flex-row gap-6 justify-between items-start xl:items-center ${cardDestaqueBgClass}`}>
                <div className="flex flex-col md:flex-row gap-5 items-start flex-1 w-full">
                    {/* Ícone Redondo */}
                    <div className="w-14 h-14 rounded-full bg-white dark:bg-slate-900 flex items-center justify-center text-purple-400 dark:text-purple-300 shadow-sm border border-slate-50 dark:border-slate-800 shrink-0">
                        <Activity size={26} />
                    </div>

                    {/* Dados Básicos */}
                    <div className="space-y-4 flex-1">
                        <div className="space-y-1">
                            <h3 className="text-xl font-bold text-slate-900 dark:text-white">{tratamentoPrincipal.nome}</h3>
                            <p className="text-xs text-slate-400 dark:text-slate-500">{tratamentoPrincipal.tipo}</p>
                            <span className="inline-block bg-emerald-50 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-400 text-[11px] font-bold px-2.5 py-0.5 rounded-full mt-1">
                                {tratamentoPrincipal.status}
                            </span>
                        </div>

                        {/* Grade Informativa */}
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
                            <div className="flex items-center gap-2.5 text-xs text-slate-500 dark:text-slate-400">
                                <Calendar size={16} className="text-slate-400 shrink-0" />
                                <div>
                                    <p className="text-slate-400 text-[10px]">Iniciado em:</p>
                                    <p className="font-bold text-slate-700 dark:text-slate-300">{tratamentoPrincipal.iniciadoEm}</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-2.5 text-xs text-slate-500 dark:text-slate-400">
                                <Clock size={16} className="text-slate-400 shrink-0" />
                                <div>
                                    <p className="text-slate-400 text-[10px]">Duração</p>
                                    <p className="font-bold text-slate-700 dark:text-slate-300">{tratamentoPrincipal.duracao}</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-2.5 text-xs text-slate-500 dark:text-slate-400">
                                <Pill size={16} className="text-slate-400 shrink-0" />
                                <div>
                                    <p className="text-slate-400 text-[10px]">Frequência</p>
                                    <p className="font-bold text-slate-700 dark:text-slate-300">{tratamentoPrincipal.frequencia}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Subcard de Progresso Visual */}
                <div className="flex flex-col sm:flex-row xl:flex-col items-stretch sm:items-center xl:items-stretch gap-4 w-full xl:w-80 shrink-0">
                    <div className={`p-4 rounded-2xl flex-1 space-y-3 ${progressContainerClass}`}>
                        <div className="flex justify-between items-center text-xs">
                            <span className="font-bold text-slate-800 dark:text-slate-200">Seu progresso</span>
                            <span className="font-bold text-purple-600 dark:text-purple-400">{tratamentoPrincipal.progresso}%</span>
                        </div>
                        {/* Linha da barra */}
                        <div className={`w-full h-2 rounded-full overflow-hidden ${progressBarBgClass}`}>
                            <div className={`h-full rounded-full ${progressBarFillClass}`} style={{ width: `${tratamentoPrincipal.progresso}%` }} />
                        </div>
                        <p className="text-[11px] text-slate-400 dark:text-slate-500 font-medium">
                            {tratamentoPrincipal.progressoTexto}
                        </p>
                    </div>

                    <button className={`w-full py-2.5 rounded-xl text-xs font-bold transition-all shrink-0 ${buttonDestaqueClass}`}>
                        Ver detalhes
                    </button>
                </div>
            </div>

            {/* LISTA INFERIOR: Outros tratamentos (Dinâmicos) */}
            <div className="space-y-4 pt-2">
                <h4 className="text-sm font-bold text-emerald-800 dark:text-emerald-400 px-1">
                    Outros tratamentos ativos
                </h4>

                <div className="space-y-2.5">
                    {outrosTratamentos.map((tratamento, index) => (
                        <div 
                            key={index} 
                            className={`flex flex-col lg:flex-row lg:items-center justify-between p-4 rounded-2xl gap-4 transition-all ${cardBgClass}`}
                        >
                            {/* Lado Esquerdo: Ícone + Título */}
                            <div className="flex items-center gap-4 min-w-[240px]">
                                <div className="w-12 h-12 rounded-full bg-emerald-50 dark:bg-emerald-950/30 flex items-center justify-center text-emerald-600 dark:text-emerald-400 shrink-0">
                                    <FileText size={20} />
                                </div>
                                <div className="space-y-0.5">
                                    <h5 className="text-sm font-bold text-slate-900 dark:text-white leading-tight">
                                        {tratamento.nome}
                                    </h5>
                                    <p className="text-xs text-slate-400 dark:text-slate-500">
                                        {tratamento.tipo}
                                    </p>
                                    <span className={`inline-block text-[10px] font-bold px-2 py-0.5 rounded-full mt-1 ${tratamento.statusCor}`}>
                                        {tratamento.status}
                                    </span>
                                </div>
                            </div>

                            {/* Informações Centrais Alinhadas */}
                            <div className="grid grid-cols-3 gap-2 flex-1 max-w-xl text-left border-t lg:border-t-0 pt-3 lg:pt-0 border-slate-50 dark:border-slate-800/40">
                                <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
                                    <Calendar size={14} className="text-slate-400 shrink-0" />
                                    <div>
                                        <p className="text-slate-400 text-[9px] hidden sm:block">Iniciado em:</p>
                                        <p className="font-semibold">{tratamento.iniciadoEm}</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
                                    <Clock size={14} className="text-slate-400 shrink-0" />
                                    <div>
                                        <p className="text-slate-400 text-[9px] hidden sm:block">Duração</p>
                                        <p className="font-semibold">{tratamento.duracao}</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
                                    <Pill size={14} className="text-slate-400 shrink-0" />
                                    <div>
                                        <p className="text-slate-400 text-[9px] hidden sm:block">Frequência</p>
                                        <p className="font-semibold truncate">{tratamento.frequencia}</p>
                                    </div>
                                </div>
                            </div>

                            {/* Ações do Card */}
                            <div className="flex items-center justify-end gap-2 shrink-0 border-t lg:border-t-0 pt-3 lg:pt-0 border-slate-50 dark:border-slate-800/40">
                                <button className={`px-4 py-1.5 rounded-xl text-xs font-bold transition-all ${buttonSecondaryClass}`}>
                                    Ver detalhes
                                </button>
                                <button className="p-2 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-xl transition-all text-slate-400 hover:text-slate-600 dark:hover:text-slate-300">
                                    <MoreVertical size={16} />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}