import { useState } from 'react'
import {
    BarChart3,
    TrendingUp,
    Calendar,
    Download,
    Filter,
    DollarSign,
    ShoppingCart,
    Users
} from 'lucide-react'
import { useThemeContext } from '../../../../contexts/ThemeContext'

export default function RelatoriosPharmacy() {
    const { highContrast } = useThemeContext()
    const [periodo, setPeriodo] = useState('mes')
    const [filtroRelatorio, setFiltroRelatorio] = useState('vendas')

    const cardBgClass = highContrast
        ? 'bg-white text-black border-2 border-black dark:bg-black dark:text-white dark:border-white'
        : 'bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800/60 shadow-sm'

    const buttonClass = highContrast
        ? 'bg-black text-white border-2 border-black dark:bg-white dark:text-black dark:border-white'
        : 'bg-purple-600 hover:bg-purple-700 text-white'

    const inputClass = highContrast
        ? 'border-2 border-black bg-white text-black dark:border-white dark:bg-black dark:text-white'
        : 'bg-slate-50 dark:bg-slate-900 border border-transparent dark:border-slate-800 text-slate-900 dark:text-slate-100 focus:bg-white dark:focus:bg-slate-950 focus:ring-2 focus:ring-purple-500/20'

    const metricas = {
        vendas: {
            titulo: 'Relatório de Vendas',
            dados: [
                { label: 'Total de Vendas', valor: 'R$ 8.542,30', tendencia: '+15%' },
                { label: 'Número de Transações', valor: '156', tendencia: '+8%' },
                { label: 'Ticket Médio', valor: 'R$ 54,76', tendencia: '+5%' },
                { label: 'Clientes Novos', valor: '12', tendencia: '+20%' }
            ]
        },
        estoque: {
            titulo: 'Relatório de Estoque',
            dados: [
                { label: 'Valor do Estoque', valor: 'R$ 24.567,00', tendencia: '-2%' },
                { label: 'Itens em Estoque', valor: '1.247', tendencia: '+5%' },
                { label: 'Itens Críticos', valor: '8', tendencia: '⚠️' },
                { label: 'Taxa de Rotação', valor: '87%', tendencia: '+3%' }
            ]
        },
        clientes: {
            titulo: 'Relatório de Clientes',
            dados: [
                { label: 'Total de Clientes', valor: '486', tendencia: '+12%' },
                { label: 'Clientes Ativos', valor: '378', tendencia: '+8%' },
                { label: 'Taxa de Retenção', valor: '78%', tendencia: '+2%' },
                { label: 'Lifetime Value (Médio)', valor: 'R$ 1.245,50', tendencia: '+10%' }
            ]
        }
    }

    const relatorioAtual = metricas[filtroRelatorio]

    // Dados simulados para gráfico
    const dadosGrafico = [
        { dia: 'Seg', vendas: 1200, estoque: 2100 },
        { dia: 'Ter', vendas: 1900, estoque: 2210 },
        { dia: 'Qua', vendas: 1600, estoque: 2290 },
        { dia: 'Qui', vendas: 2800, estoque: 2000 },
        { dia: 'Sex', vendas: 2200, estoque: 2181 },
        { dia: 'Sáb', vendas: 2290, estoque: 2500 },
        { dia: 'Dom', vendas: 2000, estoque: 2100 },
    ]

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold">Relatórios</h1>
                    <p className="text-slate-500 dark:text-slate-400 mt-1">
                        Análise de desempenho e métricas da farmácia
                    </p>
                </div>
                <button className={`flex items-center gap-2 px-4 py-2.5 rounded-lg font-semibold transition-colors ${buttonClass}`}>
                    <Download size={20} />
                    Exportar PDF
                </button>
            </div>

            {/* Filtros */}
            <div className={`${cardBgClass} rounded-lg p-6`}>
                <div className="flex flex-col md:flex-row gap-4">
                    <div>
                        <label className="block text-sm font-semibold mb-2">Tipo de Relatório</label>
                        <select
                            value={filtroRelatorio}
                            onChange={(e) => setFiltroRelatorio(e.target.value)}
                            className={`px-4 py-2.5 rounded-lg transition-colors ${inputClass}`}
                        >
                            <option value="vendas">Vendas</option>
                            <option value="estoque">Estoque</option>
                            <option value="clientes">Clientes</option>
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-semibold mb-2">Período</label>
                        <select
                            value={periodo}
                            onChange={(e) => setPeriodo(e.target.value)}
                            className={`px-4 py-2.5 rounded-lg transition-colors ${inputClass}`}
                        >
                            <option value="semana">Esta Semana</option>
                            <option value="mes">Este Mês</option>
                            <option value="trimestre">Este Trimestre</option>
                            <option value="ano">Este Ano</option>
                        </select>
                    </div>
                </div>
            </div>

            {/* Cards de métricas */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {relatorioAtual.dados.map((metrica, idx) => (
                    <div key={idx} className={`${cardBgClass} rounded-lg p-4`}>
                        <p className="text-sm opacity-75 mb-2">{metrica.label}</p>
                        <div className="flex items-end justify-between">
                            <div>
                                <p className="text-2xl font-bold">{metrica.valor}</p>
                            </div>
                            <span className={`text-sm font-semibold px-2 py-1 rounded ${
                                metrica.tendencia.includes('⚠️')
                                    ? 'bg-amber-100 text-amber-700 dark:bg-amber-950/40 dark:text-amber-400'
                                    : metrica.tendencia.startsWith('+')
                                        ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-400'
                                        : 'bg-red-100 text-red-700 dark:bg-red-950/40 dark:text-red-400'
                            }`}>
                                {metrica.tendencia}
                            </span>
                        </div>
                    </div>
                ))}
            </div>

            {/* Gráfico simulado */}
            <div className={`${cardBgClass} rounded-lg p-6`}>
                <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                    <BarChart3 size={24} />
                    Desempenho Semanal
                </h2>
                
                <div className="h-64 flex items-end justify-around gap-2 p-4 bg-slate-50 dark:bg-slate-950/50 rounded-lg">
                    {dadosGrafico.map((dado) => {
                        const maxVal = Math.max(...dadosGrafico.map(d => d.vendas))
                        const altura = (dado.vendas / maxVal) * 100
                        
                        return (
                            <div key={dado.dia} className="flex-1 flex flex-col items-center gap-2">
                                <div 
                                    className="w-full bg-gradient-to-t from-purple-600 to-purple-400 rounded-t transition-all hover:from-purple-700 hover:to-purple-500"
                                    style={{ height: `${altura}%` }}
                                    title={`${dado.dia}: R$ ${dado.vendas}`}
                                ></div>
                                <span className="text-xs font-semibold">{dado.dia}</span>
                            </div>
                        )
                    })}
                </div>
                <p className="text-xs opacity-75 mt-4 text-center">Faturamento em Reais (R$)</p>
            </div>

            {/* Tabela de produtos mais vendidos */}
            <div className={`${cardBgClass} rounded-lg overflow-hidden`}>
                <div className="p-6 border-b border-slate-200 dark:border-slate-800">
                    <h2 className="text-lg font-semibold">Produtos Mais Vendidos</h2>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                        <thead className={`border-b ${highContrast ? 'border-black dark:border-white' : 'border-slate-200 dark:border-slate-800'}`}>
                            <tr className={highContrast ? 'bg-white dark:bg-black' : 'bg-slate-50 dark:bg-slate-950/50'}>
                                <th className="text-left px-4 py-3 font-semibold">Produto</th>
                                <th className="text-center px-4 py-3 font-semibold">Unidades</th>
                                <th className="text-center px-4 py-3 font-semibold">Faturamento</th>
                                <th className="text-center px-4 py-3 font-semibold">% do Total</th>
                            </tr>
                        </thead>
                        <tbody>
                            {[
                                { nome: 'Dipirona 500mg', unidades: 324, faturamento: 'R$ 2.887,60', percentual: '33%' },
                                { nome: 'Omeprazol 20mg', unidades: 156, faturamento: 'R$ 1.045,20', percentual: '12%' },
                                { nome: 'Loratadina 10mg', unidades: 142, faturamento: 'R$ 638,90', percentual: '7%' },
                                { nome: 'Amoxicilina 500mg', unidades: 98, faturamento: 'R$ 1.422,10', percentual: '16%' },
                                { nome: 'Metformina 500mg', unidades: 67, faturamento: 'R$ 656,60', percentual: '7%' },
                            ].map((produto, idx) => (
                                <tr key={idx} className={`border-b ${highContrast ? 'border-black/20 dark:border-white/20 hover:bg-black/5 dark:hover:bg-white/5' : 'border-slate-100 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-950/50'}`}>
                                    <td className="px-4 py-3 font-medium">{produto.nome}</td>
                                    <td className="px-4 py-3 text-center">{produto.unidades}</td>
                                    <td className="px-4 py-3 text-center font-semibold">{produto.faturamento}</td>
                                    <td className="px-4 py-3 text-center">
                                        <span className="inline-block px-2.5 py-1 rounded-full text-xs font-semibold bg-purple-100 text-purple-700 dark:bg-purple-950/40 dark:text-purple-400">
                                            {produto.percentual}
                                        </span>
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
