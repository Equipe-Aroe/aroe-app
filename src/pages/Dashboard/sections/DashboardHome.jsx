import { useState, useRef, useEffect } from 'react'
import { 
    CheckCircle, 
    Package, 
    Truck, 
    Box, 
    Heart, 
    ChevronRight, 
    Loader2,
    Activity,
    Calendar,
    ArrowRight
} from 'lucide-react'
import { useThemeContext } from '../../../contexts/ThemeContext'
import { personasPayloads } from '../../../data/personasData' // Importando a base centralizada
import Tesseract from 'tesseract.js'

const DEMO_STORAGE_KEY = '@Aroe:demo_session'

export default function DashboardHome() {
    const { highContrast } = useThemeContext()
    const fileInputRef = useRef(null)
    
    // Estado do perfil controlado via Session
    const [perfilAtivo, setPerfilAtivo] = useState('amanda') 
    const [isProcessing, setIsProcessing] = useState(false)
    const [ocrResult, setOcrResult] = useState(null)

    // Sincroniza o perfil ativo com a sessão simulada no localStorage
    useEffect(() => {
        const demoDataRaw = localStorage.getItem(DEMO_STORAGE_KEY)
        
        if (demoDataRaw) {
            const session = JSON.parse(demoDataRaw)
            const nomeUsuario = session.user?.nome || ''

            if (nomeUsuario.includes('Ricardo')) {
                setPerfilAtivo('ricardo')
            } else if (nomeUsuario.includes('Irene')) {
                setPerfilAtivo('irene')
            } else if (nomeUsuario.includes('NatuFórmula') || session.user?.tipo === 'Farmácia Parceira') {
                setPerfilAtivo('farmacia')
            } else {
                setPerfilAtivo('amanda')
            }
        }
        setOcrResult(null)
    }, [])

    // Resgate seguro dos dados vindos diretamente do personasData.js
    const dadosPerfil = personasPayloads[perfilAtivo] || personasPayloads['amanda']

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
            ? 'bg-black text-white p-6 rounded-2xl border-4 border-black'
            : `bg-gradient-to-br ${dadosPerfil.ui.gradient} p-6 rounded-2xl text-white`,
        statusActive: 'bg-emerald-500 text-white',
        statusNext: 'bg-purple-100 text-purple-600 border-2 border-purple-200 dark:bg-purple-900/30 dark:border-purple-800 dark:text-purple-400',
        statusInactive: 'bg-slate-100 text-slate-400 dark:bg-slate-800 dark:text-slate-600',
        textPrimary: highContrast ? 'text-black dark:text-white font-bold' : 'text-slate-900 dark:text-slate-100',
        textSecondary: highContrast ? 'text-black/90 dark:text-white/80' : 'text-slate-500 dark:text-slate-400',
    }

    return (
        <div className="max-w-6xl mx-auto space-y-6 transition-colors duration-500 pb-10 px-4 sm:px-0">
            {/* Input File Oculto para OCR */}
            <input 
                type="file" 
                ref={fileInputRef} 
                onChange={handleOcrProcess} 
                accept="image/*" 
                className="hidden" 
            />

            {/* Seção de Boas-vindas Dinâmica baseada na UI do Payload */}
            <div className={styles.welcomeCard}>
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                    <div className="space-y-3 max-w-2xl">
                        <div className="flex items-center gap-3">
                            <span className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-md ${dadosPerfil.ui.badgeCor}`}>
                                {dadosPerfil.ui.badge}
                            </span>
                            <span className="text-white/40 text-xs">•</span>
                            <span className="text-xs font-medium text-purple-100/80 dark:text-slate-300 flex items-center gap-1">
                                <Calendar size={12} />
                                {new Date().toLocaleDateString("pt-BR", { weekday: 'long', day: 'numeric', month: 'short' })}
                            </span>
                        </div>
                        
                        <h2 className="text-2xl sm:text-3xl font-black tracking-tight">
                            Olá, {dadosPerfil.user.nome} 
                        </h2>
                        
                        <p 
                            className="text-white/90 dark:text-slate-200 text-sm sm:text-base leading-relaxed font-normal"
                            dangerouslySetInnerHTML={{ __html: dadosPerfil.ui.mensagemWelcome }}
                        />
                    </div>

                    {/* Destaque lateral da primeira cotação ativa, se houver */}
                    {dadosPerfil.receitasIniciais.length > 0 && dadosPerfil.receitasIniciais[0].price && (
                        <div className="bg-white/10 backdrop-blur-md border border-white/10 p-4 rounded-xl flex items-center gap-4 shrink-0 md:max-w-xs w-full justify-between">
                            <div>
                                <p className="text-[10px] uppercase font-bold text-white/60 tracking-wider">Última Proposta</p>
                                <p className="text-xl font-black mt-0.5">{dadosPerfil.receitasIniciais[0].price}</p>
                                <p className="text-[11px] text-white/80 mt-0.5">{dadosPerfil.receitasIniciais[0].farmaciaDestaque}</p>
                            </div>
                            <button className="p-2.5 bg-white text-slate-900 rounded-lg shadow-sm hover:bg-slate-100 transition-colors">
                                <ArrowRight size={16} className="text-purple-700" />
                            </button>
                        </div>
                    )}
                </div>
            </div>

            {/* Resultado do OCR / Aria Intelligent Reading */}
            {ocrResult && (
                <div className="p-6 bg-purple-50 dark:bg-purple-950/20 border border-purple-200 dark:border-purple-900 rounded-3xl space-y-3 animate-fade-in">
                    <h4 className="font-bold text-purple-900 dark:text-purple-300 text-sm flex items-center gap-2">
                        ✨ Aria identificou os seguintes componentes na receita de {dadosPerfil.user.nome}:
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

            {/* Mapeamento de receitasIniciais vindas do Payloads */}
            <section className="space-y-4">
                <div className="flex items-center justify-between px-2">
                    <h3 className={`text-lg font-bold ${styles.textPrimary}`}>
                        {dadosPerfil.user.tipo === 'Farmácia Parceira' ? 'Demandas Recebidas da Região' : 'Acompanhamento de Pedido'}
                    </h3>
                    <button className="text-sm font-semibold text-purple-600 dark:text-purple-400 hover:underline flex items-center gap-1">
                        Ver histórico <ChevronRight size={16} />
                    </button>
                </div>

                {dadosPerfil.receitasIniciais.map((order) => (
                    <div key={order.id} className={`rounded-3xl p-6 sm:p-8 transition-all ${styles.card}`}>
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
                            <div className="flex items-center gap-5">
                                <div className="w-14 h-14 bg-purple-50 dark:bg-purple-900/20 rounded-2xl flex items-center justify-center">
                                    <Package className="text-purple-600 dark:text-purple-400" size={28} />
                                </div>
                                <div>
                                    <div className="flex items-center gap-2 flex-wrap">
                                        <h3 className="text-xl sm:text-2xl font-bold tracking-tight">{order.nome}</h3>
                                        <span className="text-[10px] px-2 py-0.5 font-medium bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 rounded">
                                            {order.pedidoId}
                                        </span>
                                    </div>
                                    <p className={styles.textSecondary + " text-sm mt-0.5"}>{order.formula || "Fórmula extraída digitalmente"}</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-3">
                                <span className={`px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider ${order.statusCor || 'bg-emerald-100 text-emerald-700'}`}>
                                    {order.status}
                                </span>
                            </div>
                        </div>

                        {/* Linha do tempo dinâmica baseada nos steps do payload */}
                        <div className="relative flex flex-col md:flex-row justify-between items-start md:items-center gap-8 mb-12">
                            <div className="absolute hidden md:block top-6 left-0 right-0 h-0.5 bg-slate-100 dark:bg-slate-800 -z-10" />
                            {[
                                { label: 'Recebido', date: order.dataEnvio, icon: CheckCircle, active: (order.stepAtivo || 1) >= 1 },
                                { label: 'Produção', date: order.nextDate || 'Em análise', icon: Activity, active: (order.stepAtivo || 1) >= 2 },
                                { label: 'Enviado', date: 'Previsão Prox. Dias', icon: Truck, active: (order.stepAtivo || 1) >= 3 },
                                { label: 'Entrega', date: 'Previsão Prox. Dias', icon: Box, active: (order.stepAtivo || 1) >= 4 }
                            ].map((step, idx) => {
                                let stepStyle = styles.statusInactive
                                if (step.active && idx + 1 === (order.stepAtivo || 1)) {
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
                                    <h4 className="font-bold text-sm">Ações</h4>
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
                                    <span className="text-3xl font-black text-emerald-600 dark:text-emerald-400">
                                        {order.price || 'Sob Análise'}
                                    </span>
                                    {order.price && <span className="text-xs text-slate-400 font-medium">/ total</span>}
                                </div>
                                <p className="text-xs text-slate-400">
                                    {order.pharmacies || '0'} {order.pharmacies === 1 ? 'farmácia homologada' : 'farmácias homologadas'}
                                </p>
                            </div>

                            <div className="bg-slate-50 dark:bg-slate-800/40 rounded-2xl p-4 flex items-center justify-between border border-dashed border-slate-200 dark:border-slate-700">
                                <div>
                                    <p className="text-[10px] font-bold text-purple-600 dark:text-purple-400 uppercase tracking-widest mb-1">Status</p>
                                    <p className="text-sm font-bold">{order.farmaciaDestaque || 'Aguardando Propostas'}</p>
                                    <p className="text-[11px] text-slate-400 mt-0.5">{order.entregaInfo}</p>
                                </div>
                                <button className="p-2 bg-white dark:bg-slate-800 rounded-lg shadow-sm">
                                    <ChevronRight size={18} className="text-slate-400" />
                                </button>
                            </div>
                        </div>
                    </div>
                ))}

                {/* Empty State se as receitasIniciais estiverem vazias (Ex: Perfil de Farmácia ou Conta Limpa) */}
                {dadosPerfil.receitasIniciais.length === 0 && (
                    <div className="text-center py-16 bg-slate-50 dark:bg-slate-900/40 border border-dashed rounded-3xl p-6">
                        <Package size={40} className="mx-auto text-slate-300 dark:text-slate-700 mb-3" />
                        <h4 className="text-sm font-bold text-slate-700 dark:text-slate-300">Nenhuma demanda ativa para {dadosPerfil.user.nome}</h4>
                        <p className="text-xs text-slate-400 mt-1 max-w-sm mx-auto">
                            {dadosPerfil.user.tipo === 'Farmácia Parceira' 
                              ? 'Aguarde novas notificações de receitas médicas postadas por pacientes na sua região geográfica.' 
                              : 'Envie uma nova receita no botão abaixo para disparar um orçamento simultâneo.'}
                        </p>
                        {dadosPerfil.user.tipo !== 'Farmácia Parceira' && (
                            <button 
                                onClick={() => fileInputRef.current?.click()}
                                className="mt-4 px-4 py-2 bg-purple-600 text-white rounded-xl text-xs font-bold hover:bg-purple-700 transition-all"
                            >
                                Digitalizar Nova Receita
                            </button>
                        )}
                    </div>
                )}
            </section>
        </div>
    )
}