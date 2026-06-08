import { useState } from 'react'
import {
    Search,
    TrendingUp,
    DollarSign,
    ShoppingCart,
    Calendar,
    Filter,
    MoreVertical,
    Eye
} from 'lucide-react'
import { useThemeContext } from '../../../../contexts/ThemeContext'

const VENDAS_MOCK = [
    {
        id: 1,
        numeroVenda: '#V-2026-0847',
        cliente: 'Irene Souza Silva',
        data: '15/04/2026',
        hora: '14:30',
        produtos: 'Dipirona 500mg (2) + Omeprazol 20mg (1)',
        valor: 'R$ 34,45',
        desconto: '10%',
        total: 'R$ 31,00',
        metodo: 'Cartão',
        status: 'Concluído'
    },
    {
        id: 2,
        numeroVenda: '#V-2026-0846',
        cliente: 'Ricardo Almeida Prado',
        data: '15/04/2026',
        hora: '13:15',
        produtos: 'Metformina 500mg (30)',
        valor: 'R$ 29,40',
        desconto: '-',
        total: 'R$ 29,40',
        metodo: 'PIX',
        status: 'Concluído'
    },
    {
        id: 3,
        numeroVenda: '#V-2026-0845',
        cliente: 'Amanda Santos',
        data: '15/04/2026',
        hora: '12:45',
        produtos: 'Loratadina 10mg (1) + Vitamina C (1)',
        valor: 'R$ 28,90',
        desconto: '-',
        total: 'R$ 28,90',
        metodo: 'Dinheiro',
        status: 'Concluído'
    },
    {
        id: 4,
        numeroVenda: '#V-2026-0844',
        cliente: 'João Silva',
        data: '14/04/2026',
        hora: '16:20',
        produtos: 'Amoxicilina 500mg (15)',
        valor: 'R$ 21,75',
        desconto: '5%',
        total: 'R$ 20,66',
        metodo: 'Cartão',
        status: 'Concluído'
    }
]

export default function VendasPharmacy() {
    const { highContrast } = useThemeContext()
    const [search, setSearch] = useState('')
    const [filterPeriodo, setFilterPeriodo] = useState('hoje')

    const cardBgClass = highContrast
        ? 'bg-white text-black border-2 border-black dark:bg-black dark:text-white dark:border-white'
        : 'bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800/60 shadow-sm'

    const inputClass = highContrast
        ? 'border-2 border-black bg-white text-black dark:border-white dark:bg-black dark:text-white'
        : 'bg-slate-50 dark:bg-slate-900 border border-transparent dark:border-slate-800 text-slate-900 dark:text-slate-100 focus:bg-white dark:focus:bg-slate-950 focus:ring-2 focus:ring-purple-500/20'

    const buttonClass = highContrast
        ? 'bg-black text-white border-2 border-black dark:bg-white dark:text-black dark:border-white'
        : 'bg-purple-600 hover:bg-purple-700 text-white'

    // Cálculos
    const totalVendas = VENDAS_MOCK.length
    const totalRecebimento = VENDAS_MOCK.reduce((acc, v) => {
        const valor = parseFloat(v.total.replace('R$ ', '').replace(',', '.'))
        return acc + valor
    }, 0)
    const ticketMedio = totalRecebimento / totalVendas

    const vendaFiltrada = VENDAS_MOCK.filter(venda => 
        venda.cliente.toLowerCase().includes(search.toLowerCase()) ||
        venda.numeroVenda.toLowerCase().includes(search.toLowerCase())
    )

    return (
        <div className="space-y-6">
            {/* Header */}
            <div>
                <h1 className="text-3xl font-bold">Vendas</h1>
                <p className="text-slate-500 dark:text-slate-400 mt-1">
                    Histórico e análise de vendas da farmácia
                </p>
            </div>

            {/* Cards de resumo */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className={`${cardBgClass} rounded-lg p-4`}>
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm opacity-75">Vendas Hoje</p>
                            <p className="text-2xl font-bold mt-1">{totalVendas}</p>
                        </div>
                        <ShoppingCart className="opacity-50" size={32} />
                    </div>
                </div>

                <div className={`${cardBgClass} rounded-lg p-4`}>
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm opacity-75">Faturamento</p>
                            <p className="text-2xl font-bold mt-1">R$ {totalRecebimento.toFixed(2).replace('.', ',')}</p>
                        </div>
                        <DollarSign className="opacity-50" size={32} />
                    </div>
                </div>

                <div className={`${cardBgClass} rounded-lg p-4`}>
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm opacity-75">Ticket Médio</p>
                            <p className="text-2xl font-bold mt-1">R$ {ticketMedio.toFixed(2).replace('.', ',')}</p>
                        </div>
                        <TrendingUp className="opacity-50" size={32} />
                    </div>
                </div>

                <div className={`${cardBgClass} rounded-lg p-4`}>
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm opacity-75">Período</p>
                            <p className="text-2xl font-bold mt-1">Hoje</p>
                        </div>
                        <Calendar className="opacity-50" size={32} />
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
                                placeholder="Buscar por cliente ou número da venda..."
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                className={`w-full pl-10 pr-4 py-2.5 rounded-lg transition-colors ${inputClass}`}
                            />
                        </div>
                    </div>
                    <select
                        value={filterPeriodo}
                        onChange={(e) => setFilterPeriodo(e.target.value)}
                        className={`px-4 py-2.5 rounded-lg transition-colors ${inputClass}`}
                    >
                        <option value="hoje">Hoje</option>
                        <option value="semana">Esta Semana</option>
                        <option value="mes">Este Mês</option>
                        <option value="todos">Todos os Períodos</option>
                    </select>
                </div>
            </div>

            {/* Tabela de vendas */}
            <div className={`${cardBgClass} rounded-lg overflow-hidden`}>
                <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                        <thead className={`border-b ${highContrast ? 'border-black dark:border-white' : 'border-slate-200 dark:border-slate-800'}`}>
                            <tr className={highContrast ? 'bg-white dark:bg-black' : 'bg-slate-50 dark:bg-slate-950/50'}>
                                <th className="text-left px-4 py-3 font-semibold">Número</th>
                                <th className="text-left px-4 py-3 font-semibold">Cliente</th>
                                <th className="text-left px-4 py-3 font-semibold">Data/Hora</th>
                                <th className="text-left px-4 py-3 font-semibold">Produtos</th>
                                <th className="text-center px-4 py-3 font-semibold">Método</th>
                                <th className="text-right px-4 py-3 font-semibold">Total</th>
                                <th className="text-center px-4 py-3 font-semibold">Ações</th>
                            </tr>
                        </thead>
                        <tbody>
                            {vendaFiltrada.map((venda) => (
                                <tr key={venda.id} className={`border-b ${highContrast ? 'border-black/20 dark:border-white/20 hover:bg-black/5 dark:hover:bg-white/5' : 'border-slate-100 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-950/50'}`}>
                                    <td className="px-4 py-3 font-mono font-semibold text-purple-600 dark:text-purple-400">{venda.numeroVenda}</td>
                                    <td className="px-4 py-3">{venda.cliente}</td>
                                    <td className="px-4 py-3 text-xs">
                                        <div>{venda.data}</div>
                                        <div className="opacity-75">{venda.hora}</div>
                                    </td>
                                    <td className="px-4 py-3 text-xs">{venda.produtos}</td>
                                    <td className="px-4 py-3 text-center">
                                        <span className="inline-block px-2.5 py-1 rounded-full text-xs font-semibold bg-slate-200 dark:bg-slate-700">
                                            {venda.metodo}
                                        </span>
                                    </td>
                                    <td className="px-4 py-3 text-right font-semibold">{venda.total}</td>
                                    <td className="px-4 py-3">
                                        <div className="flex gap-2 justify-center">
                                            <button className="p-1.5 hover:bg-slate-200 dark:hover:bg-slate-700 rounded transition-colors" title="Visualizar">
                                                <Eye size={16} />
                                            </button>
                                            <button className="p-1.5 hover:bg-slate-200 dark:hover:bg-slate-700 rounded transition-colors" title="Mais opções">
                                                <MoreVertical size={16} />
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
