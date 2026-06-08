import { useState } from 'react'
import {
    Search,
    Users,
    Plus,
    Edit2,
    Trash2,
    Phone,
    Mail,
    MapPin,
    FileText,
    MoreVertical
} from 'lucide-react'
import { useThemeContext } from '../../../../contexts/ThemeContext'

const CLIENTES_MOCK = [
    {
        id: 1,
        nome: 'Irene Souza Silva',
        email: 'dona.irene@exemplo.com',
        telefone: '(11) 98765-4321',
        endereco: 'Av. Paulista, 1500 - São Paulo - SP',
        totalCompras: 12,
        ultimaCompra: '15/04/2026',
        valorTotal: 'R$ 523,40',
        prescricoes: ['Hipertensão', 'Alergia a Tartrazina'],
        status: 'Ativo'
    },
    {
        id: 2,
        nome: 'Ricardo Almeida Prado',
        email: 'ricardo.prado@exemplo.com',
        telefone: '(11) 99876-5432',
        endereco: 'Rua dos Pinheiros, 840 - São Paulo - SP',
        totalCompras: 8,
        ultimaCompra: '15/04/2026',
        valorTotal: 'R$ 312,75',
        prescricoes: ['Diabetes Tipo 2', 'Intolerância a Lactose'],
        status: 'Ativo'
    },
    {
        id: 3,
        nome: 'Amanda Santos de Carvalho',
        email: 'amanda.santos@exemplo.com',
        telefone: '(11) 97654-3210',
        endereco: 'Rua das Flores, 123 - São Paulo - SP',
        totalCompras: 5,
        ultimaCompra: '10/04/2026',
        valorTotal: 'R$ 178,90',
        prescricoes: ['Sensibilidade a corantes'],
        status: 'Ativo'
    },
    {
        id: 4,
        nome: 'José Maria Silva',
        email: 'jose.maria@exemplo.com',
        telefone: '(11) 96543-2109',
        endereco: 'Rua do Comércio, 456 - São Paulo - SP',
        totalCompras: 3,
        ultimaCompra: '08/04/2026',
        valorTotal: 'R$ 89,50',
        prescricoes: ['Artrite'],
        status: 'Inativo'
    }
]

export default function ClientesPharmacy() {
    const { highContrast } = useThemeContext()
    const [search, setSearch] = useState('')
    const [filterStatus, setFilterStatus] = useState('todos')

    const cardBgClass = highContrast
        ? 'bg-white text-black border-2 border-black dark:bg-black dark:text-white dark:border-white'
        : 'bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800/60 shadow-sm'

    const inputClass = highContrast
        ? 'border-2 border-black bg-white text-black dark:border-white dark:bg-black dark:text-white'
        : 'bg-slate-50 dark:bg-slate-900 border border-transparent dark:border-slate-800 text-slate-900 dark:text-slate-100 focus:bg-white dark:focus:bg-slate-950 focus:ring-2 focus:ring-purple-500/20'

    const buttonClass = highContrast
        ? 'bg-black text-white border-2 border-black dark:bg-white dark:text-black dark:border-white'
        : 'bg-purple-600 hover:bg-purple-700 text-white'

    const clientesFiltrados = CLIENTES_MOCK.filter(cliente => {
        const matchSearch = cliente.nome.toLowerCase().includes(search.toLowerCase()) ||
                          cliente.email.toLowerCase().includes(search.toLowerCase()) ||
                          cliente.telefone.includes(search)
        const matchStatus = filterStatus === 'todos' || cliente.status === filterStatus
        return matchSearch && matchStatus
    })

    const totalClientes = CLIENTES_MOCK.length
    const clientesAtivos = CLIENTES_MOCK.filter(c => c.status === 'Ativo').length

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold">Clientes</h1>
                    <p className="text-slate-500 dark:text-slate-400 mt-1">
                        Gerenciar clientes e histórico de compras
                    </p>
                </div>
                <button className={`flex items-center gap-2 px-4 py-2.5 rounded-lg font-semibold transition-colors ${buttonClass}`}>
                    <Plus size={20} />
                    Novo Cliente
                </button>
            </div>

            {/* Cards de resumo */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className={`${cardBgClass} rounded-lg p-4`}>
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm opacity-75">Total de Clientes</p>
                            <p className="text-2xl font-bold mt-1">{totalClientes}</p>
                        </div>
                        <Users className="opacity-50" size={32} />
                    </div>
                </div>

                <div className={`${cardBgClass} rounded-lg p-4`}>
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm opacity-75">Clientes Ativos</p>
                            <p className="text-2xl font-bold mt-1 text-emerald-600">{clientesAtivos}</p>
                        </div>
                        <Users className="opacity-50 text-emerald-600" size={32} />
                    </div>
                </div>

                <div className={`${cardBgClass} rounded-lg p-4`}>
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm opacity-75">Taxa de Retenção</p>
                            <p className="text-2xl font-bold mt-1">75%</p>
                        </div>
                        <Users className="opacity-50" size={32} />
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
                                placeholder="Buscar por nome, email ou telefone..."
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
                        <option value="Ativo">Ativo</option>
                        <option value="Inativo">Inativo</option>
                    </select>
                </div>
            </div>

            {/* Lista de clientes */}
            <div className="grid grid-cols-1 gap-4">
                {clientesFiltrados.map((cliente) => (
                    <div key={cliente.id} className={`${cardBgClass} rounded-lg p-6`}>
                        <div className="flex items-start justify-between gap-4">
                            <div className="flex-1">
                                <div className="flex items-center gap-3 mb-3">
                                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-400 to-purple-600 flex items-center justify-center text-white font-bold text-lg">
                                        {cliente.nome.charAt(0)}
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-semibold">{cliente.nome}</h3>
                                        <span className={`inline-block px-2.5 py-1 rounded-full text-xs font-semibold mt-1 ${
                                            cliente.status === 'Ativo'
                                                ? 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-400'
                                                : 'bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400'
                                        }`}>
                                            {cliente.status}
                                        </span>
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-3">
                                    <div className="flex items-center gap-2 text-sm opacity-75">
                                        <Mail size={16} />
                                        <a href={`mailto:${cliente.email}`} className="hover:underline">{cliente.email}</a>
                                    </div>
                                    <div className="flex items-center gap-2 text-sm opacity-75">
                                        <Phone size={16} />
                                        <a href={`tel:${cliente.telefone}`} className="hover:underline">{cliente.telefone}</a>
                                    </div>
                                    <div className="flex items-start gap-2 text-sm opacity-75">
                                        <MapPin size={16} className="mt-0.5 flex-shrink-0" />
                                        <span>{cliente.endereco}</span>
                                    </div>
                                    <div className="flex items-start gap-2 text-sm opacity-75">
                                        <FileText size={16} className="mt-0.5 flex-shrink-0" />
                                        <span>{cliente.prescricoes.join(', ')}</span>
                                    </div>
                                </div>

                                <div className="flex items-center gap-4 text-sm">
                                    <div>
                                        <span className="opacity-75">Compras:</span>
                                        <span className="font-semibold ml-1">{cliente.totalCompras}</span>
                                    </div>
                                    <div>
                                        <span className="opacity-75">Total Gasto:</span>
                                        <span className="font-semibold ml-1">{cliente.valorTotal}</span>
                                    </div>
                                    <div>
                                        <span className="opacity-75">Última Compra:</span>
                                        <span className="font-semibold ml-1">{cliente.ultimaCompra}</span>
                                    </div>
                                </div>
                            </div>

                            <div className="flex gap-2">
                                <button className="p-2 hover:bg-slate-200 dark:hover:bg-slate-700 rounded transition-colors" title="Editar">
                                    <Edit2 size={18} />
                                </button>
                                <button className="p-2 hover:bg-slate-200 dark:hover:bg-slate-700 rounded transition-colors" title="Mais opções">
                                    <MoreVertical size={18} />
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}
