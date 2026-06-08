import { useState } from 'react'
import {
    Search,
    CheckCircle2,
    Clock,
    AlertCircle,
    Plus,
    X,
    Check,
    Pill,
    AlertTriangle
} from 'lucide-react'
import { useThemeContext } from '../../../../contexts/ThemeContext'

const PREPARACOES_MOCK = [
    {
        id: 1,
        cliente: 'Irene Souza Silva',
        receituario: '#REC-2026-0124',
        data: '15/04/2026',
        hora: '14:30',
        status: 'Preparando',
        statusIcon: Clock,
        statusCor: 'bg-amber-50 text-amber-700 dark:bg-amber-950/40 dark:text-amber-400',
        medicamentos: [
            { nome: 'Dipirona 500mg', qtd: '2 caixas', alergia: false, preparado: true },
            { nome: 'Omeprazol 20mg', qtd: '1 caixa', alergia: false, preparado: true },
            { nome: 'Vitamina D3 1000UI', qtd: '1 caixa', alergia: false, preparado: false }
        ],
        avisos: ['Paciente alérgica a Tartrazina - verificar corantes']
    },
    {
        id: 2,
        cliente: 'Ricardo Almeida Prado',
        receituario: '#REC-2026-0123',
        data: '15/04/2026',
        hora: '13:00',
        status: 'Pronto para Retirada',
        statusIcon: CheckCircle2,
        statusCor: 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-400',
        medicamentos: [
            { nome: 'Metformina 500mg', qtd: '30 comprimidos', alergia: false, preparado: true },
            { nome: 'Glibenclamida 5mg', qtd: '30 comprimidos', alergia: false, preparado: true }
        ],
        avisos: ['Paciente intolerante a Lactose - sem excipientes lactose']
    },
    {
        id: 3,
        cliente: 'Amanda Santos',
        receituario: '#REC-2026-0122',
        data: '14/04/2026',
        hora: '16:45',
        status: 'Aguardando',
        statusIcon: AlertCircle,
        statusCor: 'bg-slate-50 text-slate-600 dark:bg-slate-950/40 dark:text-slate-400',
        medicamentos: [
            { nome: 'Loratadina 10mg', qtd: '30 comprimidos', alergia: false, preparado: false },
            { nome: 'Xarope de Gengibre 150ml', qtd: '1 frasco', alergia: false, preparado: false }
        ],
        avisos: ['Sensibilidade a corantes - usar genéricos sem corantes']
    }
]

export default function PreparacaoPharmacy() {
    const { highContrast } = useThemeContext()
    const [search, setSearch] = useState('')
    const [filterStatus, setFilterStatus] = useState('todos')
    const [expandedId, setExpandedId] = useState(1)

    const cardBgClass = highContrast
        ? 'bg-white text-black border-2 border-black dark:bg-black dark:text-white dark:border-white'
        : 'bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800/60 shadow-sm'

    const inputClass = highContrast
        ? 'border-2 border-black bg-white text-black dark:border-white dark:bg-black dark:text-white'
        : 'bg-slate-50 dark:bg-slate-900 border border-transparent dark:border-slate-800 text-slate-900 dark:text-slate-100 focus:bg-white dark:focus:bg-slate-950 focus:ring-2 focus:ring-purple-500/20'

    const buttonClass = highContrast
        ? 'bg-black text-white border-2 border-black dark:bg-white dark:text-black dark:border-white'
        : 'bg-purple-600 hover:bg-purple-700 text-white'

    const preparacoesFiltradas = PREPARACOES_MOCK.filter(prep => {
        const matchSearch = prep.cliente.toLowerCase().includes(search.toLowerCase()) ||
                          prep.receituario.toLowerCase().includes(search.toLowerCase())
        const matchStatus = filterStatus === 'todos' || prep.status === filterStatus
        return matchSearch && matchStatus
    })

    const statusCount = {
        preparando: PREPARACOES_MOCK.filter(p => p.status === 'Preparando').length,
        pronto: PREPARACOES_MOCK.filter(p => p.status === 'Pronto para Retirada').length,
        aguardando: PREPARACOES_MOCK.filter(p => p.status === 'Aguardando').length
    }

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold">Preparação de Medicamentos</h1>
                    <p className="text-slate-500 dark:text-slate-400 mt-1">
                        Gerenciar separação de receitas e medicamentos
                    </p>
                </div>
                <button className={`flex items-center gap-2 px-4 py-2.5 rounded-lg font-semibold transition-colors ${buttonClass}`}>
                    <Plus size={20} />
                    Nova Preparação
                </button>
            </div>

            {/* Status Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className={`${cardBgClass} rounded-lg p-4 border-l-4 border-l-amber-500`}>
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm opacity-75">Preparando</p>
                            <p className="text-2xl font-bold mt-1">{statusCount.preparando}</p>
                        </div>
                        <Clock className="opacity-50 text-amber-600" size={32} />
                    </div>
                </div>

                <div className={`${cardBgClass} rounded-lg p-4 border-l-4 border-l-emerald-500`}>
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm opacity-75">Pronto para Retirada</p>
                            <p className="text-2xl font-bold mt-1 text-emerald-600">{statusCount.pronto}</p>
                        </div>
                        <CheckCircle2 className="opacity-50 text-emerald-600" size={32} />
                    </div>
                </div>

                <div className={`${cardBgClass} rounded-lg p-4 border-l-4 border-l-slate-500`}>
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm opacity-75">Aguardando</p>
                            <p className="text-2xl font-bold mt-1">{statusCount.aguardando}</p>
                        </div>
                        <AlertCircle className="opacity-50" size={32} />
                    </div>
                </div>
            </div>

            {/* Filtros */}
            <div className={`${cardBgClass} rounded-lg p-6`}>
                <div className="flex flex-col md:flex-row gap-4">
                    <div className="flex-1">
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 opacity-50" size={20} />
                            <input
                                type="text"
                                placeholder="Buscar por cliente ou receituário..."
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                className={`w-full pl-10 pr-4 py-2.5 rounded-lg transition-colors ${inputClass}`}
                            />
                        </div>
                    </div>
                    <select
                        value={filterStatus}
                        onChange={(e) => setFilterStatus(e.target.value)}
                        className={`px-4 py-2.5 rounded-lg transition-colors ${inputClass}`}
                    >
                        <option value="todos">Todos os Status</option>
                        <option value="Preparando">Preparando</option>
                        <option value="Pronto para Retirada">Pronto para Retirada</option>
                        <option value="Aguardando">Aguardando</option>
                    </select>
                </div>
            </div>

            {/* Lista de preparações */}
            <div className="space-y-4">
                {preparacoesFiltradas.map((preparacao) => {
                    const Icon = preparacao.statusIcon
                    const isExpanded = expandedId === preparacao.id
                    const totalMedicamentos = preparacao.medicamentos.length
                    const preparados = preparacao.medicamentos.filter(m => m.preparado).length

                    return (
                        <div key={preparacao.id} className={`${cardBgClass} rounded-lg overflow-hidden`}>
                            {/* Header do card */}
                            <button
                                onClick={() => setExpandedId(isExpanded ? null : preparacao.id)}
                                className="w-full px-6 py-4 flex items-center justify-between hover:bg-slate-50 dark:hover:bg-slate-950/50 transition-colors"
                            >
                                <div className="flex items-center gap-4 flex-1 text-left">
                                    <Icon size={24} className={preparacao.statusCor} />
                                    <div>
                                        <p className="font-semibold text-lg">{preparacao.cliente}</p>
                                        <p className="text-sm opacity-75">{preparacao.receituario} • {preparacao.data} às {preparacao.hora}</p>
                                    </div>
                                </div>

                                <div className="flex items-center gap-4">
                                    <span className={`inline-block px-3 py-1.5 rounded-full text-sm font-semibold ${preparacao.statusCor}`}>
                                        {preparacao.status}
                                    </span>
                                    <div className="text-sm text-center">
                                        <p className="font-semibold">{preparados}/{totalMedicamentos}</p>
                                        <p className="opacity-75 text-xs">Preparados</p>
                                    </div>
                                </div>
                            </button>

                            {/* Conteúdo expandido */}
                            {isExpanded && (
                                <div className={`border-t ${highContrast ? 'border-black/20 dark:border-white/20' : 'border-slate-200 dark:border-slate-800'} px-6 py-4 space-y-4`}>
                                    {/* Avisos */}
                                    {preparacao.avisos.length > 0 && (
                                        <div className="space-y-2">
                                            {preparacao.avisos.map((aviso, idx) => (
                                                <div key={idx} className="flex gap-3 p-3 rounded-lg bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800">
                                                    <AlertTriangle className="text-amber-600 flex-shrink-0 mt-0.5" size={18} />
                                                    <p className="text-sm text-amber-800 dark:text-amber-300">{aviso}</p>
                                                </div>
                                            ))}
                                        </div>
                                    )}

                                    {/* Lista de medicamentos */}
                                    <div>
                                        <h4 className="font-semibold mb-3 flex items-center gap-2">
                                            <Pill size={18} />
                                            Medicamentos
                                        </h4>
                                        <div className="space-y-2">
                                            {preparacao.medicamentos.map((med, idx) => (
                                                <div key={idx} className="flex items-center justify-between p-3 rounded-lg bg-slate-50 dark:bg-slate-950/50">
                                                    <div className="flex items-center gap-3 flex-1">
                                                        <input
                                                            type="checkbox"
                                                            checked={med.preparado}
                                                            readOnly
                                                            className="w-5 h-5 rounded"
                                                        />
                                                        <div>
                                                            <p className={`font-medium ${med.preparado ? 'line-through opacity-75' : ''}`}>
                                                                {med.nome}
                                                            </p>
                                                            <p className="text-sm opacity-75">{med.qtd}</p>
                                                        </div>
                                                    </div>
                                                    {med.preparado && (
                                                        <Check className="text-emerald-600" size={20} />
                                                    )}
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Botões de ação */}
                                    <div className="flex gap-2 pt-4 border-t border-slate-200 dark:border-slate-800">
                                        {preparacao.status === 'Preparando' && (
                                            <button className={`flex-1 py-2 rounded-lg font-semibold transition-colors ${buttonClass}`}>
                                                Marcar como Pronto
                                            </button>
                                        )}
                                        {preparacao.status === 'Pronto para Retirada' && (
                                            <button className={`flex-1 py-2 rounded-lg font-semibold transition-colors ${buttonClass}`}>
                                                Confirmar Retirada
                                            </button>
                                        )}
                                        <button className="flex-1 py-2 rounded-lg font-semibold border border-slate-300 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
                                            Editar
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>
                    )
                })}
            </div>
        </div>
    )
}
