import { useState, useRef, useEffect } from 'react'
import { 
    CheckCircle, 
    Package, 
    Truck, 
    Box, 
    Heart, 
    ChevronRight, 
    Loader2,
    Activity // Corrigido: importando o ícone correto diretamente do lucide
} from 'lucide-react'
import { useThemeContext } from '../../../contexts/ThemeContext'
import Tesseract from 'tesseract.js'

const DEMO_STORAGE_KEY = '@Aroe:demo_session'

// Base de dados simulada estruturada pelas chaves lidas na sessão
const DADOS_HOME_POR_PERFIL = {
    amanda: {
        nome: 'Amanda',
        mensagemWelcome: 'Sua saúde está em dia. Você tem <span class="font-bold text-white underline decoration-wavy decoration-emerald-400">1 pedido</span> em andamento e suas receitas foram validadas.',
        orders: [
            {
                id: 1,
                productName: 'Vitaminas A-Z',
                formula: 'Fórmula manipulada em cápsulas',
                status: 'Recebido',
                statusDate: '10/12',
                nextStatus: 'Em Produção',
                nextDate: '11/12',
                price: 'R$ 43,50',
                pharmacies: 3,
                farmaciaDestaque: 'Farmácia Bem Viver',
                stepAtivo: 1
            }
        ]
    },
    irene: {
        nome: 'Dona Irene',
        mensagemWelcome: 'Monitore os cuidados de sua mãe. Há <span class="font-bold text-white underline decoration-wavy decoration-emerald-400">1 pedido</span> em produção urgente de anti-hipertensivos.',
        orders: [
            {
                id: 2,
                productName: 'Probióticos + Protetor Coronário',
                formula: 'Fórmula em sachês de absorção rápida',
                status: 'Produção',
                statusDate: '06/06',
                nextStatus: 'Pronto para Envio',
                nextDate: '09/06',
                price: 'R$ 112,90',
                pharmacies: 5,
                farmaciaDestaque: 'Naturale Manipulação',
                stepAtivo: 2
            }
        ]
    },
    ricardo: {
        nome: 'Ricardo',
        mensagemWelcome: 'Seu dependente possui <span class="font-bold text-white underline decoration-wavy decoration-slate-400">0 pedidos</span> ativos no momento. Faça um novo orçamento abaixo.',
        orders: []
    }
}

export default function DashboardHome() {
    const { highContrast } = useThemeContext()
    const fileInputRef = useRef(null)
    
    // Estado do perfil controlado de forma silenciosa via Session
    const [perfilAtivo, setPerfilAtivo] = useState('amanda') 
    const [isProcessing, setIsProcessing] = useState(false)
    const [ocrResult, setOcrResult] = useState(null)

    // Captura os dados injetados da Persona no ciclo de vida da aplicação
    useEffect(() => {
        const demoDataRaw = localStorage.getItem(DEMO_STORAGE_KEY)
        
        if (demoDataRaw) {
            const session = JSON.parse(demoDataRaw)
            const nomeUsuario = session.user?.nome || ''

            if (nomeUsuario.includes('Ricardo')) {
                setPerfilAtivo('ricardo')
            } else if (nomeUsuario.includes('Irene')) {
                setPerfilAtivo('irene')
            } else {
                setPerfilAtivo('amanda')
            }
        }
        // Reseta o OCR caso mude de sessão em testes rápidos
        setOcrResult(null)
    }, [])

    // Resgate seguro de dados evitando quebras de objetos indefinidos
    const dadosPerfil = DADOS_HOME_POR_PERFIL[perfilAtivo] || DADOS_HOME_POR_PERFIL['amanda']

    const handleOcrProcess = async (event) => {
        const file = event.target.files[0]
        if (!file) return

        setIsProcessing(true)
        setOcrResult(null)

        try {
            const imageUrl = URL.createObjectURL(file)
            const result = await Tesseract.recognize(imageUrl, 'por')
            setOcrResult(result.data.text)
        } catch (error) {
            console.error("Erro na leitura:", error)
            alert("Não foi possível ler a imagem. Tente uma foto mais nítida.")
        } finally {
            setIsProcessing(false)
            if (fileInputRef.current) fileInputRef.current.value = '' 
        }
    }

    const styles = {
        card: highContrast
            ? 'bg-white text-black border-4 border-black dark:bg-black dark:text-white dark:border-white shadow-none'
            : 'bg-white/80 dark:bg-slate-900/50 backdrop-blur-md border border-slate-200 dark:border-slate-800 shadow-sm',
        welcomeCard: highContrast
            ? 'bg-black text-white p-8 rounded-2xl'
            : perfilAtivo === 'irene' 
                ? 'bg-gradient-to-r from-rose-600 to-orange-600 p-8 rounded-2xl text-white shadow-lg shadow-rose-200 dark:shadow-none'
                : perfilAtivo === 'ricardo'
                ? 'bg-gradient-to-r from-blue-600 to-cyan-600 p-8 rounded-2xl text-white shadow-lg shadow-blue-200 dark:shadow-none'
                : 'bg-gradient-to-r from-purple-600 to-indigo-600 p-8 rounded-2xl text-white shadow-lg shadow-purple-200 dark:shadow-none',
        statusActive: 'bg-emerald-500 text-white',
        statusNext: 'bg-purple-100 text-purple-600 border-2 border-purple-200 dark:bg-purple-900/30 dark:border-purple-800 dark:text-purple-400',
        statusInactive: 'bg-slate-100 text-slate-400 dark:bg-slate-800 dark:text-slate-600',
        textPrimary: highContrast ? 'text-black dark:text-white font-bold' : 'text-slate-900 dark:text-slate-100',
        textSecondary: highContrast ? 'text-black/90 dark:text-white/80' : 'text-slate-500 dark:text-slate-400',
    }

    return (
        <div className="max-w-6xl mx-auto space-y-6 transition-colors duration-500 pb-10">
            {/* Input File Escondido */}
            <input 
                type="file" 
                ref={fileInputRef} 
                onChange={handleOcrProcess} 
                accept="image/*" 
                className="hidden" 
            />

            {/* Seção de Boas-vindas Dinâmica */}
            <div className={styles.welcomeCard}>
                <div className="max-w-2xl">
                    <h2 className="text-3xl font-bold mb-3">Olá, {dadosPerfil.nome}! ✨</h2>
                    <p 
                        className="text-purple-100 dark:text-slate-300 text-lg leading-relaxed"
                        dangerouslySetInnerHTML={{ __html: dadosPerfil.mensagemWelcome }}
                    />
                </div>
            </div>

            {/* Resultado do OCR / Aria Intelligent Reading */}
            {ocrResult && (
                <div className="p-6 bg-purple-50 dark:bg-purple-950/20 border border-purple-200 dark:border-purple-900 rounded-3xl space-y-3 animate-fade-in">
                    <h4 className="font-bold text-purple-900 dark:text-purple-300 text-sm flex items-center gap-2">
                        ✨ Aria identificou os seguintes componentes na receita de {dadosPerfil.nome}:
                    </h4>
                    <p className="text-xs bg-white dark:bg-slate-900 p-4 rounded-xl border whitespace-pre-line text-slate-700 dark:text-slate-300">
                        {ocrResult}
                    </p>
                    <div className="flex gap-2">
                        <button onClick={() => alert('Orçamento Gerado com Sucesso!')} className="px-4 py-2 bg-purple-600 text-white rounded-xl text-xs font-bold hover:bg-purple-700">
                            Confirmar e Cotar Orçamento
                        </button>
                        <button onClick={() => setOcrResult(null)} className="px-4 py-2 bg-slate-200 text-slate-700 rounded-xl text-xs font-bold dark:bg-slate-800 dark:text-slate-300">
                            Descartar
                        </button>
                    </div>
                </div>
            )}

            {/* Seção de Acompanhamento de Pedidos */}
            <section className="space-y-6">
                <div className="flex items-center justify-between px-2">
                    <h3 className={`text-xl font-bold ${styles.textPrimary}`}>Acompanhamento de Pedido</h3>
                    <button className="text-sm font-semibold text-purple-600 dark:text-purple-400 hover:underline flex items-center gap-1">
                        Ver histórico <ChevronRight size={16} />
                    </button>
                </div>

                {dadosPerfil.orders.map((order) => (
                    <div key={order.id} className={`rounded-3xl p-8 transition-all ${styles.card}`}>
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
                            <div className="flex items-center gap-5">
                                <div className="w-14 h-14 bg-purple-50 dark:bg-purple-900/20 rounded-2xl flex items-center justify-center">
                                    <Package className="text-purple-600 dark:text-purple-400" size={28} />
                                </div>
                                <div>
                                    <h3 className="text-2xl font-bold tracking-tight">{order.productName}</h3>
                                    <p className={styles.textSecondary}>{order.formula}</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-3">
                                <span className="px-5 py-2 bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400 rounded-full text-xs font-bold uppercase tracking-wider">
                                    {order.status === 'Recebido' ? 'Processando' : 'Em Produção'}
                                </span>
                            </div>
                        </div>

                        {/* Linha do tempo dinâmica */}
                        <div className="relative flex flex-col md:flex-row justify-between items-start md:items-center gap-8 mb-12">
                            <div className="absolute hidden md:block top-6 left-0 right-0 h-0.5 bg-slate-100 dark:bg-slate-800 -z-10" />
                            {[
                                { label: 'Recebido', date: order.statusDate, icon: CheckCircle, active: order.stepAtivo >= 1 },
                                { label: 'Produção', date: order.nextDate, icon: Activity, active: order.stepAtivo >= 2 },
                                { label: 'Enviado', date: 'Previsão Prox. Dias', icon: Truck, active: order.stepAtivo >= 3 },
                                { label: 'Entrega', date: 'Previsão Prox. Dias', icon: Box, active: order.stepAtivo >= 4 }
                            ].map((step, idx) => {
                                let stepStyle = styles.statusInactive
                                if (step.active && idx + 1 === order.stepAtivo) {
                                    stepStyle = styles.statusNext 
                                } else if (step.active) {
                                    stepStyle = styles.statusActive 
                                }

                                const StepIcon = step.icon

                                return (
                                    <div key={idx} className="flex md:flex-col items-center gap-4 md:gap-3 w-full">
                                        <div className={`w-12 h-12 rounded-full flex items-center justify-center transition-all ${stepStyle}`}>
                                            <StepIcon size={22} />
                                        </div>
                                        <div className="text-left md:text-center">
                                            <p className={`text-sm font-bold ${styles.textPrimary}`}>{step.label}</p>
                                            <p className="text-xs text-slate-400">{step.date}</p>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>

                        {/* Painel inferior de Ações e Valores */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-8 border-t border-slate-100 dark:border-slate-800">
                            <div className="space-y-4">
                                <div className="flex items-center gap-2">
                                    <Heart size={18} className="text-rose-500" />
                                    <h4 className="font-bold text-sm">Autocuidado</h4>
                                </div>
                                <button 
                                    onClick={() => fileInputRef.current?.click()}
                                    disabled={isProcessing}
                                    className="w-full py-3 bg-slate-900 dark:bg-white dark:text-black text-white rounded-xl font-bold text-sm hover:opacity-90 transition-all flex items-center justify-center gap-2"
                                >
                                    {isProcessing ? (
                                        <>
                                            <Loader2 size={16} className="animate-spin text-purple-500" />
                                            Aria lendo receita...
                                        </>
                                    ) : 'Nova Receita'}
                                </button>
                            </div>

                            <div className="space-y-1">
                                <h4 className={styles.textSecondary + " text-sm font-medium"}>Melhor cotação obtida</h4>
                                <div className="flex items-baseline gap-2">
                                    <span className="text-3xl font-black text-emerald-600 dark:text-emerald-400">{order.price}</span>
                                    <span className="text-xs text-slate-400 font-medium">/ total</span>
                                </div>
                                <p className="text-xs text-slate-400">{order.pharmacies} farmácias homologadas</p>
                            </div>

                            <div className="bg-slate-50 dark:bg-slate-800/40 rounded-2xl p-4 flex items-center justify-between border border-dashed border-slate-200 dark:border-slate-700">
                                <div>
                                    <p className="text-[10px] font-bold text-purple-600 dark:text-purple-400 uppercase tracking-widest mb-1">Destaque</p>
                                    <p className="text-sm font-bold">{order.farmaciaDestaque}</p>
                                </div>
                                <button className="p-2 bg-white dark:bg-slate-800 rounded-lg shadow-sm">
                                    <ChevronRight size={18} className="text-slate-400" />
                                </button>
                            </div>
                        </div>
                    </div>
                ))}

                {/* State vazio se o perfil selecionado não tiver pedidos ativos (Ex: Ricardo) */}
                {dadosPerfil.orders.length === 0 && (
                    <div className="text-center py-12 bg-slate-50 dark:bg-slate-900/40 border border-dashed rounded-3xl p-6">
                        <Package size={40} className="mx-auto text-slate-300 dark:text-slate-700 mb-3" />
                        <h4 className="text-sm font-bold text-slate-700 dark:text-slate-300">Nenhum pedido ativo para {dadosPerfil.nome}</h4>
                        <p className="text-xs text-slate-400 mt-1 max-w-sm mx-auto">Envie uma nova receita no botão abaixo para iniciar uma cotação em tempo real com as farmácias parceiras.</p>
                        <button 
                            onClick={() => fileInputRef.current?.click()}
                            className="mt-4 px-4 py-2 bg-purple-600 text-white rounded-xl text-xs font-bold hover:bg-purple-700 transition-all"
                        >
                            Digitalizar Nova Receita
                        </button>
                    </div>
                )}
            </section>
        </div>
    )
}