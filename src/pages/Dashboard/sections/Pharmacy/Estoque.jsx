import { useState } from 'react'
import { 
    Search, 
    Plus, 
    Edit2, 
    Trash2,
    AlertTriangle,
    Package,
    BarChart3,
    TrendingDown
} from 'lucide-react'
import { useThemeContext } from '../../../../contexts/ThemeContext'

const ESTOQUE_MOCK = [
    {
        id: 1,
        nome: 'Dipirona 500mg',
        lote: 'LT-2026-001',
        validade: '10/2027',
        quantidade: 245,
        minimo: 50,
        maximo: 500,
        preco: 'R$ 0,89',
        categoria: 'Analgésico',
        localizacao: 'Prateleira A1'
    },
    {
        id: 2,
        nome: 'Amoxicilina 500mg',
        lote: 'LT-2026-002',
        validade: '08/2027',
        quantidade: 12,
        minimo: 30,
        maximo: 200,
        preco: 'R$ 1,45',
        categoria: 'Antibiótico',
        localizacao: 'Prateleira B3'
    },
    {
        id: 3,
        nome: 'Omeprazol 20mg',
        lote: 'LT-2026-003',
        validade: '12/2027',
        quantidade: 156,
        minimo: 40,
        maximo: 300,
        preco: 'R$ 0,67',
        categoria: 'Antácido',
        localizacao: 'Prateleira C2'
    },
    {
        id: 4,
        nome: 'Loratadina 10mg',
        lote: 'LT-2026-004',
        validade: '05/2027',
        quantidade: 89,
        minimo: 60,
        maximo: 250,
        preco: 'R$ 0,45',
        categoria: 'Anti-histamínico',
        localizacao: 'Prateleira D1'
    },
    {
        id: 5,
        nome: 'Metformina 500mg',
        lote: 'LT-2026-005',
        validade: '03/2027',
        quantidade: 5,
        minimo: 50,
        maximo: 400,
        preco: 'R$ 0,98',
        categoria: 'Antidiabético',
        localizacao: 'Prateleira A5'
    }
]

export default function EstoquePharmacy() {
    const { highContrast } = useThemeContext()
    const [search, setSearch] = useState('')
    const [filterCategoria, setFilterCategoria] = useState('todos')

    const categories = ['Analgésico', 'Antibiótico', 'Antácido', 'Anti-histamínico', 'Antidiabético']
    
    const estoqueFiltrado = ESTOQUE_MOCK.filter(item => {
        const matchSearch = item.nome.toLowerCase().includes(search.toLowerCase()) ||
                          item.lote.toLowerCase().includes(search.toLowerCase())
        const matchCategoria = filterCategoria === 'todos' || item.categoria === filterCategoria
        return matchSearch && matchCategoria
    })

    const itemsBaixoEstoque = ESTOQUE_MOCK.filter(item => item.quantidade <= item.minimo)
    const vencidosProximamente = ESTOQUE_MOCK.filter(item => {
        const [mes, ano] = item.validade.split('/')
        const dataValidade = new Date(ano, mes - 1)
        const hoje = new Date()
        const diasRestantes = Math.floor((dataValidade - hoje) / (1000 * 60 * 60 * 24))
        return diasRestantes > 0 && diasRestantes <= 90
    })

    const cardBgClass = highContrast
        ? 'bg-white text-black border-2 border-black dark:bg-black dark:text-white dark:border-white'
        : 'bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800/60 shadow-sm'

    const inputClass = highContrast
        ? 'border-2 border-black bg-white text-black dark:border-white dark:bg-black dark:text-white'
        : 'bg-slate-50 dark:bg-slate-900 border border-transparent dark:border-slate-800 text-slate-900 dark:text-slate-100 focus:bg-white dark:focus:bg-slate-950 focus:ring-2 focus:ring-purple-500/20'

    const buttonClass = highContrast
        ? 'bg-black text-white border-2 border-black dark:bg-white dark:text-black dark:border-white'
        : 'bg-purple-600 hover:bg-purple-700 text-white'

    const getStatusColor = (item) => {
        if (item.quantidade <= item.minimo) {
            return 'bg-red-50 text-red-700 dark:bg-red-950/40 dark:text-red-400'
        }
        if (item.quantidade >= item.maximo) {
            return 'bg-amber-50 text-amber-700 dark:bg-amber-950/40 dark:text-amber-400'
        }
        return 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-400'
    }

    const getStatusLabel = (item) => {
        if (item.quantidade <= item.minimo) return 'Crítico'
        if (item.quantidade >= item.maximo) return 'Acima do máximo'
        return 'Normal'
    }

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold">Controle de Estoque</h1>
                    <p className="text-slate-500 dark:text-slate-400 mt-1">
                        Gerenciar medicamentos e produtos da farmácia
                    </p>
                </div>
                <button className={`flex items-center gap-2 px-4 py-2.5 rounded-lg font-semibold transition-colors ${buttonClass}`}>
                    <Plus size={20} />
                    Adicionar Produto
                </button>
            </div>

            {/* Alertas */}
            {(itemsBaixoEstoque.length > 0 || vencidosProximamente.length > 0) && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {itemsBaixoEstoque.length > 0 && (
                        <div className={`${cardBgClass} rounded-lg p-4 border-l-4 border-l-red-500`}>
                            <div className="flex items-start gap-3">
                                <AlertTriangle className="text-red-500 flex-shrink-0 mt-1" size={20} />
                                <div>
                                    <h3 className="font-semibold">Estoque Crítico</h3>
                                    <p className="text-sm opacity-75 mt-1">
                                        {itemsBaixoEstoque.length} produto(s) abaixo do estoque mínimo
                                    </p>
                                </div>
                            </div>
                        </div>
                    )}
                    
                    {vencidosProximamente.length > 0 && (
                        <div className={`${cardBgClass} rounded-lg p-4 border-l-4 border-l-amber-500`}>
                            <div className="flex items-start gap-3">
                                <AlertTriangle className="text-amber-500 flex-shrink-0 mt-1" size={20} />
                                <div>
                                    <h3 className="font-semibold">Vencimentos Próximos</h3>
                                    <p className="text-sm opacity-75 mt-1">
                                        {vencidosProximamente.length} produto(s) vencem em até 90 dias
                                    </p>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            )}

            {/* Cards de resumo */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className={`${cardBgClass} rounded-lg p-4`}>
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm opacity-75">Total de Produtos</p>
                            <p className="text-2xl font-bold mt-1">{ESTOQUE_MOCK.length}</p>
                        </div>
                        <Package className="opacity-50" size={32} />
                    </div>
                </div>

                <div className={`${cardBgClass} rounded-lg p-4`}>
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm opacity-75">Valor Total</p>
                            <p className="text-2xl font-bold mt-1">R$ 2.450</p>
                        </div>
                        <BarChart3 className="opacity-50" size={32} />
                    </div>
                </div>

                <div className={`${cardBgClass} rounded-lg p-4`}>
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm opacity-75">Abaixo do Mínimo</p>
                            <p className="text-2xl font-bold mt-1 text-red-600">{itemsBaixoEstoque.length}</p>
                        </div>
                        <TrendingDown className="opacity-50 text-red-600" size={32} />
                    </div>
                </div>

                <div className={`${cardBgClass} rounded-lg p-4`}>
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm opacity-75">Próximos Vencimentos</p>
                            <p className="text-2xl font-bold mt-1 text-amber-600">{vencidosProximamente.length}</p>
                        </div>
                        <AlertTriangle className="opacity-50 text-amber-600" size={32} />
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
                                placeholder="Buscar por nome ou lote..."
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                className={`w-full pl-10 pr-4 py-2.5 rounded-lg transition-colors ${inputClass}`}
                            />
                        </div>
                    </div>
                    <select
                        value={filterCategoria}
                        onChange={(e) => setFilterCategoria(e.target.value)}
                        className={`px-4 py-2.5 rounded-lg transition-colors ${inputClass}`}
                    >
                        <option value="todos">Todas as Categorias</option>
                        {categories.map(cat => (
                            <option key={cat} value={cat}>{cat}</option>
                        ))}
                    </select>
                </div>
            </div>

            {/* Tabela de estoque */}
            <div className={`${cardBgClass} rounded-lg overflow-hidden`}>
                <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                        <thead className={`border-b ${highContrast ? 'border-black dark:border-white' : 'border-slate-200 dark:border-slate-800'}`}>
                            <tr className={highContrast ? 'bg-white dark:bg-black' : 'bg-slate-50 dark:bg-slate-950/50'}>
                                <th className="text-left px-4 py-3 font-semibold">Produto</th>
                                <th className="text-left px-4 py-3 font-semibold">Lote</th>
                                <th className="text-left px-4 py-3 font-semibold">Validade</th>
                                <th className="text-center px-4 py-3 font-semibold">Qtd</th>
                                <th className="text-center px-4 py-3 font-semibold">Categoria</th>
                                <th className="text-center px-4 py-3 font-semibold">Status</th>
                                <th className="text-center px-4 py-3 font-semibold">Ações</th>
                            </tr>
                        </thead>
                        <tbody>
                            {estoqueFiltrado.map((item) => (
                                <tr key={item.id} className={`border-b ${highContrast ? 'border-black/20 dark:border-white/20 hover:bg-black/5 dark:hover:bg-white/5' : 'border-slate-100 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-950/50'}`}>
                                    <td className="px-4 py-3 font-medium">{item.nome}</td>
                                    <td className="px-4 py-3">{item.lote}</td>
                                    <td className="px-4 py-3">{item.validade}</td>
                                    <td className="px-4 py-3 text-center">{item.quantidade}</td>
                                    <td className="px-4 py-3 text-center text-xs">{item.categoria}</td>
                                    <td className="px-4 py-3 text-center">
                                        <span className={`inline-block px-2.5 py-1 rounded-full text-xs font-semibold ${getStatusColor(item)}`}>
                                            {getStatusLabel(item)}
                                        </span>
                                    </td>
                                    <td className="px-4 py-3">
                                        <div className="flex gap-2 justify-center">
                                            <button className="p-1.5 hover:bg-slate-200 dark:hover:bg-slate-700 rounded transition-colors" title="Editar">
                                                <Edit2 size={16} />
                                            </button>
                                            <button className="p-1.5 hover:bg-red-200 dark:hover:bg-red-900/30 text-red-600 rounded transition-colors" title="Remover">
                                                <Trash2 size={16} />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}
