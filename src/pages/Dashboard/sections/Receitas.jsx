import { useState, useRef } from 'react'
import { 
    Search, 
    Calendar, 
    Tag, 
    Upload, 
    MoreVertical, 
    ChevronLeft, 
    ChevronRight, 
    ChevronDown,
    FileText,
    Loader2,
    X // Adicionado ícone de fechar para o modal
} from 'lucide-react'
import { useThemeContext } from '../../../contexts/ThemeContext'
import Tesseract from 'tesseract.js'

const RECEITAS_MOCK_INITIAL = [
    {
        id: 1,
        nome: 'Enzimas digestivas',
        tipo: 'Fórmula manipulada',
        dataEnvio: '15/04/2025',
        pedidoId: '#122022',
        status: 'Em produção',
        statusCor: 'bg-purple-100 text-purple-700 dark:bg-purple-950/40 dark:text-purple-400',
        entregaInfo: 'Entregue em 15/04',
        textoExtraido: 'Fórmula Sono Reparador\n- Melatonina ... 5 mg\n- Passiflora incarnata ... 300 mg\n- Magnésio Bisglicinato ... 250 mg'
    },
    {
        id: 2,
        nome: 'Magnésio Quelato + B6',
        tipo: 'Fórmula manipulada',
        dataEnvio: '15/04/2025',
        pedidoId: '#122022',
        status: 'Aguardando orçamento',
        statusCor: 'bg-orange-100 text-orange-700 dark:bg-orange-950/40 dark:text-orange-400',
        entregaInfo: 'Entregue em 15/04',
        textoExtraido: 'Magnésio Quelato ... 300 mg\nVitamina B6 ... 50 mg\nTomar 1 cápsula à noite.'
    },
]

export default function DashboardReceitas() {
    const { highContrast } = useThemeContext()
    const [activeTab, setActiveTab] = useState('minhas')
    const [search, setSearch] = useState('')
    
    const [receitas, setReceitas] = useState(RECEITAS_MOCK_INITIAL)
    const [isProcessing, setIsProcessing] = useState(false)
    const fileInputRef = useRef(null)

    // NOVO ESTADO: Armazena a receita que está sendo visualizada no detalhe
    const [receitaSelecionada, setReceitaSelecionada] = useState(null)

    const handleOcrUpload = async (event) => {
        const file = event.target.files[0]
        if (!file) return

        setIsProcessing(true)

        try {
            const imageUrl = URL.createObjectURL(file)
            const result = await Tesseract.recognize(imageUrl, 'por')
            const text = result.data.text

            const primeiraLinha = text.split('\n')[0] || 'Fórmula Identificada pela Aria'

            const novaReceita = {
                id: Date.now(),
                nome: primeiraLinha.substring(0, 30) || 'Nova Fórmula Digitalizada',
                tipo: 'Fórmula manipulada',
                dataEnvio: new Date().toLocaleDateString('pt-BR'),
                pedidoId: `#${Math.floor(100000 + Math.random() * 900000)}`,
                status: 'Aguardando orçamento',
                statusCor: 'bg-orange-100 text-orange-700 dark:bg-orange-950/40 dark:text-orange-400',
                entregaInfo: 'Processado via IA',
                textoExtraido: text // Salva o texto completo do OCR para ver nos detalhes
            }

            setReceitas(prev => [novaReceita, ...prev])
            alert(`Receita lida com sucesso!\nComponente identificado: "${primeiraLinha}"`)

        } catch (error) {
            console.error(error)
            alert("Erro ao ler imagem da receita.")
        } finally {
            setIsProcessing(false)
            if (fileInputRef.current) fileInputRef.current.value = ''
        }
    }

    const cardBgClass = highContrast
        ? 'bg-white text-black border-2 border-black dark:bg-black dark:text-white dark:border-white'
        : 'bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800/60 shadow-sm'

    const inputClass = highContrast
        ? 'border-2 border-black bg-white text-black dark:border-white dark:bg-black dark:text-white'
        : 'bg-slate-50 dark:bg-slate-900 border border-transparent dark:border-slate-800 text-slate-900 dark:text-slate-100 focus:bg-white dark:focus:bg-slate-950 focus:ring-2 focus:ring-purple-500/20'

    const buttonActionClass = highContrast
        ? 'bg-black text-white hover:bg-black/80 dark:bg-white dark:text-black'
        : 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-sm'

    const buttonSecondaryClass = highContrast
        ? 'border-2 border-black text-black dark:border-white dark:text-white'
        : 'border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800'

    return (
        <div className="space-y-6">
            <input 
                type="file" 
                ref={fileInputRef}
                onChange={handleOcrUpload}
                accept="image/*"
                className="hidden"
            />

            <div className="flex flex-col gap-1 md:hidden">
                <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Receitas</h2>
                <p className="text-sm text-slate-500 dark:text-slate-400">
                    Gerencie suas receitas e acompanhe seus tratamentos
                </p>
            </div>

            {/* Tabs */}
            <div className="flex items-center gap-6 border-b border-slate-100 dark:border-slate-800/60 pb-1">
                <button onClick={() => setActiveTab('minhas')} className={`pb-3 text-sm font-bold transition-all relative ${activeTab === 'minhas' ? 'text-emerald-600 dark:text-emerald-400' : 'text-slate-400 dark:text-slate-500'}`}>
                    Minhas receitas
                    {activeTab === 'minhas' && <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-emerald-500 dark:bg-emerald-400 rounded-full" />}
                </button>
                <button onClick={() => setActiveTab('arquivadas')} className={`pb-3 text-sm font-bold transition-all relative ${activeTab === 'arquivadas' ? 'text-emerald-600 dark:text-emerald-400' : 'text-slate-400 dark:text-slate-500'}`}>
                    Receitas arquivadas
                    {activeTab === 'arquivadas' && <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-emerald-500 dark:bg-emerald-400 rounded-full" />}
                </button>
            </div>

            {/* Barra de Filtros e Botão Enviar Receita */}
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                <div className="flex flex-wrap items-center gap-3 flex-1 max-w-3xl">
                    <div className="relative flex-1 min-w-[200px]">
                        <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                        <input type="text" placeholder="Buscar" value={search} onChange={(e) => setSearch(e.target.value)} className={`w-full pl-10 pr-4 py-2 rounded-xl text-sm focus:outline-none transition-all ${inputClass}`} />
                    </div>
                </div>

                <button 
                    onClick={() => fileInputRef.current?.click()}
                    disabled={isProcessing}
                    className={`flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold transition-all shrink-0 ${buttonActionClass}`}
                >
                    {isProcessing ? (
                        <>
                            <Loader2 size={16} className="animate-spin" />
                            Aria Processando...
                        </>
                    ) : (
                        <>
                            <Upload size={16} />
                            Enviar receita
                        </>
                    )}
                </button>
            </div>

            {/* Lista de Receitas */}
            <div className="space-y-3">
                {receitas.map((receita) => (
                    <div key={receita.id} className={`flex flex-col sm:flex-row sm:items-center justify-between p-4 rounded-2xl gap-4 transition-all ${cardBgClass}`}>
                        <div className="flex items-start gap-4">
                            <div className="w-12 h-12 rounded-full bg-emerald-50 dark:bg-emerald-950/30 flex items-center justify-center text-emerald-600 dark:text-emerald-400 shrink-0">
                                <FileText size={22} />
                            </div>
                            <div className="space-y-1">
                                <h4 className="text-base font-bold text-slate-900 dark:text-white leading-tight">{receita.nome}</h4>
                                <p className="text-xs text-slate-400 dark:text-slate-500">{receita.tipo}</p>
                                <div className="flex flex-wrap items-center gap-x-4 gap-y-1 pt-1 text-xs text-slate-400 dark:text-slate-500">
                                    <span className="flex items-center gap-1"><Calendar size={12} /> Enviada em {receita.dataEnvio}</span>
                                    <span className="flex items-center gap-1 text-emerald-600 dark:text-emerald-400 font-medium"><Tag size={12} /> Pedido {receita.pedidoId}</span>
                                </div>
                            </div>
                        </div>

                        <div className="flex items-center justify-between sm:justify-end gap-6 border-t sm:border-t-0 pt-3 sm:pt-0 border-slate-50 dark:border-slate-800/40">
                            <div className="text-left sm:text-right space-y-1">
                                <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${receita.statusCor}`}>{receita.status}</span>
                                <p className="text-[11px] text-slate-400 dark:text-slate-500">{receita.entregaInfo}</p>
                            </div>
                            <div className="flex items-center gap-2">
                                {/* MODIFICADO: onClick adicionado para abrir os detalhes */}
                                <button 
                                    onClick={() => setReceitaSelecionada(receita)}
                                    className={`px-4 py-1.5 rounded-xl text-xs font-bold transition-all ${buttonSecondaryClass}`}
                                >
                                    Ver detalhes
                                </button>
                                <button className="p-2 text-slate-400"><MoreVertical size={16} /></button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Paginação Inferior */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-slate-100 dark:border-slate-800/60">
                <div className="flex items-center gap-1.5">
                    <button className={`p-2 rounded-lg transition-all ${buttonSecondaryClass}`}>
                        <ChevronLeft size={14} />
                    </button>
                    <button className="w-8 h-8 rounded-lg text-xs font-bold bg-emerald-600 text-white shadow-sm">1</button>
                    <button className={`w-8 h-8 rounded-lg text-xs font-bold transition-all ${buttonSecondaryClass}`}>2</button>
                    <button className={`w-8 h-8 rounded-lg text-xs font-bold transition-all ${buttonSecondaryClass}`}>3</button>
                    <button className={`p-2 rounded-lg transition-all ${buttonSecondaryClass}`}>
                        <ChevronRight size={14} />
                    </button>
                </div>

                <button className={`flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-medium transition-all ${buttonSecondaryClass}`}>
                    <span>4 por página</span>
                    <ChevronDown size={14} className="text-slate-400" />
                </button>
            </div>

            {/* NOVO: COMPONENTE DE MODAL DE DETALHES */}
            {receitaSelecionada && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-fade-in">
                    <div className={`w-full max-w-lg rounded-2xl p-6 relative overflow-hidden shadow-xl border ${
                        highContrast 
                        ? 'bg-white border-4 border-black text-black dark:bg-black dark:border-white dark:text-white' 
                        : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800'
                    }`}>
                        {/* Header do Modal */}
                        <div className="flex items-start justify-between mb-4 pb-3 border-b border-slate-100 dark:border-slate-800">
                            <div>
                                <span className={`inline-block px-2.5 py-0.5 rounded-full text-[11px] font-bold mb-1.5 ${receitaSelecionada.statusCor}`}>
                                    {receitaSelecionada.status}
                                </span>
                                <h3 className="text-lg font-bold text-slate-900 dark:text-white">{receitaSelecionada.nome}</h3>
                                <p className="text-xs text-slate-400 dark:text-slate-500">Pedido {receitaSelecionada.pedidoId} • {receitaSelecionada.tipo}</p>
                            </div>
                            <button 
                                onClick={() => setReceitaSelecionada(null)}
                                className="p-1.5 rounded-lg text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all"
                            >
                                <X size={18} />
                            </button>
                        </div>

                        {/* Conteúdo Extrapolado do OCR */}
                        <div className="space-y-3">
                            <label className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
                                Conteúdo da Receita (Leitura Digital)
                            </label>
                            <div className={`p-4 rounded-xl text-sm font-mono whitespace-pre-wrap max-h-60 overflow-y-auto ${
                                highContrast ? 'border-2 border-black bg-slate-50' : 'bg-slate-50 dark:bg-slate-950 text-slate-700 dark:text-slate-300'
                            }`}>
                                {receitaSelecionada.textoExtraido || "Nenhum texto adicional pôde ser processado nesta visualização rápida."}
                            </div>
                        </div>

                        {/* Rodapé do Modal */}
                        <div className="mt-6 flex justify-end gap-2">
                            <button 
                                onClick={() => setReceitaSelecionada(null)}
                                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${buttonSecondaryClass}`}
                            >
                                Fechar
                            </button>
                            <button 
                                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${buttonActionClass}`}
                                onClick={() => alert('Direcionando para cotação...')}
                            >
                                Solicitar Orçamento
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}
