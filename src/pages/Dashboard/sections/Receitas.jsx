import { useState, useRef, useEffect } from 'react'
import {
    Search,
    Upload,
    FileText,
    Loader2,
    X,
    AlertTriangle,
    Eye,
    Clock
} from 'lucide-react'
import { useThemeContext } from '../../../contexts/ThemeContext'

// Importa os serviços externos, utilitários e base centralizada
import { processarReceitaOCR } from '../../../services/ocrService'
import { validarCNPJ } from '../../../utils/validateCnpj'
import { personasPayloads } from '../../../data/personasData'

const DEMO_STORAGE_KEY = '@Aroe:demo_session'

// Função geradora de CNPJ matemático válido para simulações e testes
function gerarCnpjValido() {
    const random = (n) => Math.round(Math.random() * n);
    const mod = (dividendo, divisor) => Math.round(dividendo - (Math.floor(dividendo / divisor) * divisor));

    const n1 = random(9); const n2 = random(9); const n3 = random(9);
    const n4 = random(9); const n5 = random(9); const n6 = random(9);
    const n7 = random(9); const n8 = random(9);
    const n9 = 0; const n10 = 0; const n11 = 0; const n12 = 1; // Final 0001 (Matriz)

    let d1 = n12 * 2 + n11 * 3 + n10 * 4 + n9 * 5 + n8 * 6 + n7 * 7 + n6 * 8 + n5 * 9 + n4 * 2 + n3 * 3 + n2 * 4 + n1 * 5;
    d1 = 11 - (mod(d1, 11));
    if (d1 >= 10) d1 = 0;

    let d2 = d1 * 2 + n12 * 3 + n11 * 4 + n10 * 5 + n9 * 6 + n8 * 7 + n7 * 8 + n6 * 9 + n5 * 2 + n4 * 3 + n3 * 4 + n2 * 5 + n1 * 6;
    d2 = 11 - (mod(d2, 11));
    if (d2 >= 10) d2 = 0;

    // Retorna mascarado no padrão: 00.000.000/0001-00
    return `${n1}${n2}.${n3}${n4}${n5}.${n6}${n7}${n8}/${n9}${n10}${n11}${n12}-${d1}${d2}`;
}

export default function DashboardReceitas() {
    const { highContrast } = useThemeContext()
    const [search, setSearch] = useState('')
    const [receitas, setReceitas] = useState([])
    const [isProcessing, setIsProcessing] = useState(false)
    const fileInputRef = useRef(null)

    // 2. Inicializa o estado com o mesmo padrão da Home
    const [perfilAtivo, setPerfilAtivo] = useState('amanda')

    // Modais e Preview de Imagem
    const [receitaSelecionada, setReceitaSelecionada] = useState(null)
    const [isReviewOpen, setIsReviewOpen] = useState(false)
    const [imgPreviewUrl, setImgPreviewUrl] = useState(null)

    // Estado do formulário de revisão humana
    const [reviewData, setReviewData] = useState({
        id: null, nome: '', textoExtraido: '', paciente: '', crmMedico: '',
        nomeMedico: '', cnpjFarmacia: '', dataEmissao: '', validadeDias: '30',
        tipoReceita: 'Simples', confidence: 0, imagemUrl: ''
    })

    const handleGerarCnpjExemplo = () => {
        const cnpjGerado = gerarCnpjValido();

        setReviewData(prev => ({
            ...prev,
            cnpjFarmacia: cnpjGerado
        }));
    };

    // 3. Efeito sincronizador baseado no LocalStorage (Igual ao da Home)
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
    }, []) // Roda uma vez ao montar o componente

    // 4. Carrega as receitas certas sempre que o perfilAtivo for descoberto ou alterado
    useEffect(() => {
        if (personasPayloads && personasPayloads[perfilAtivo]) {

            // Pega APENAS o array de receitas da persona ativa capturada no localStorage
            const dadosPersona = personasPayloads[perfilAtivo].receitasIniciais || []

            const receitasFormatadas = dadosPersona.map(dados => ({
                id: dados.id || Math.floor(Math.random() * 10000),
                nome: dados.nome || 'Fórmula Avançada',
                tipo: dados.tipo || dados.dadosEstruturados?.tipoReceita || 'Simples',
                dataEnvio: dados.dataEnvio || new Date().toLocaleDateString('pt-BR'),
                pedidoId: dados.pedidoId || `#${Math.floor(100000 + Math.random() * 900000)}`,
                status: dados.status || 'Aguardando orçamento',
                statusCor: dados.statusCor || 'bg-orange-100 text-orange-700 dark:bg-orange-950/40 dark:text-orange-400',
                entregaInfo: dados.entregaInfo || `Validade: ${dados.dadosEstruturados?.validadeDias || '30'} dias`,
                textoExtraido: dados.textoExtraido || '',
                confidence: dados.confidence || 100,
                imagemUrl: dados.imagemUrl || '',
                dadosEstruturados: {
                    paciente: dados.dadosEstruturados?.paciente || 'Não informado',
                    nomeMedico: dados.dadosEstruturados?.nomeMedico || 'Não informado',
                    crmMedico: dados.dadosEstruturados?.crmMedico || '',
                    cnpjFarmacia: dados.dadosEstruturados?.cnpjFarmacia || '',
                    dataEmissao: dados.dadosEstruturados?.dataEmissao || new Date().toLocaleDateString('pt-BR'),
                    validadeDias: dados.dadosEstruturados?.validadeDias || '30',
                    tipoReceita: dados.dadosEstruturados?.tipoReceita || 'Simples'
                }
            }))

            setReceitas(receitasFormatadas)
        } else {
            setReceitas([])
        }
    }, [perfilAtivo])

    // Manipulador do Upload que consome o serviço de OCR isolado
    const handleOcrUpload = async (event) => {
        const file = event.target.files[0]
        if (!file) return

        setIsProcessing(true)

        try {
            // Chama o serviço responsável por pré-processar e rodar o Tesseract
            const dadosCapturados = await processarReceitaOCR(file)

            // Fallback se faltar dados obrigatórios
            if (!dadosCapturados.paciente || !dadosCapturados.crmMedico || !dadosCapturados.cnpjFarmacia) {
                setReviewData(dadosCapturados);
                setIsReviewOpen(true);
            } else {
                salvarReceitaNoEstado(dadosCapturados);
            }

        } catch (error) {
            console.error(error)
            alert(error.message || "Erro ao ler e processar os metadados da receita.")
        } finally {
            setIsProcessing(false)
            if (fileInputRef.current) fileInputRef.current.value = '' // Limpa o input file
        }
    }

    const salvarReceitaNoEstado = (dados) => {
        const novaReceita = {
            id: dados.id || Math.floor(Math.random() * 10000),
            nome: dados.nome || 'Fórmula Avançada',
            tipo: dados.tipoReceita,
            dataEnvio: new Date().toLocaleDateString('pt-BR'),
            pedidoId: `#${Math.floor(100000 + Math.random() * 900000)}`,
            status: 'Aguardando orçamento',
            statusCor: 'bg-orange-100 text-orange-700 dark:bg-orange-950/40 dark:text-orange-400',
            entregaInfo: `Validade: ${dados.validadeDias} dias`,
            textoExtraido: dados.textoExtraido,
            confidence: dados.confidence,
            imagemUrl: dados.imagemUrl,
            dadosEstruturados: {
                paciente: dados.paciente,
                nomeMedico: dados.nomeMedico || 'Não informado',
                crmMedico: dados.crmMedico,
                cnpjFarmacia: dados.cnpjFarmacia,
                dataEmissao: dados.dataEmissao,
                validadeDias: dados.validadeDias,
                tipoReceita: dados.tipoReceita
            }
        }
        setReceitas(prev => [novaReceita, ...prev])
    }

    const handleSalvarRevisao = (e) => {
        e.preventDefault();
        if (!reviewData.paciente || !reviewData.crmMedico || !reviewData.cnpjFarmacia) {
            alert("Preencha todos os campos obrigatórios.");
            return;
        }
        if (!validarCNPJ(reviewData.cnpjFarmacia)) {
            alert("CNPJ inválido.");
            return;
        }
        salvarReceitaNoEstado(reviewData);
        setIsReviewOpen(false);
    }

    // Filtro de receitas baseado no input de busca
    const receitasFiltradas = receitas.filter(receita =>
        receita.nome.toLowerCase().includes(search.toLowerCase()) ||
        receita.dadosEstruturados?.paciente?.toLowerCase().includes(search.toLowerCase())
    )

    // Classes de estilização baseadas no contraste
    const cardBgClass = highContrast ? 'bg-white text-black border-2 border-black dark:bg-black dark:text-white dark:border-white' : 'bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800/60 shadow-sm'
    const inputClass = highContrast ? 'border-2 border-black bg-white text-black dark:border-white' : 'bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-slate-100'
    const buttonActionClass = highContrast ? 'bg-black text-white' : 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-sm'
    const buttonSecondaryClass = highContrast ? 'border-2 border-black text-black' : 'border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300'

    return (
        <div className="space-y-6">
            <input type="file" ref={fileInputRef} onChange={handleOcrUpload} accept="image/*" className="hidden" />

            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                <div className="relative flex-1 max-w-md">
                    <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input
                        type="text"
                        placeholder="Buscar por fórmula ou paciente..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className={`w-full pl-10 pr-4 py-2 rounded-xl text-sm focus:outline-none ${inputClass}`}
                    />
                </div>

                <button
                    onClick={() => fileInputRef.current?.click()}
                    disabled={isProcessing}
                    className={`flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold transition-all ${buttonActionClass} ${isProcessing ? 'opacity-70 cursor-not-allowed' : ''}`}
                >
                    {isProcessing ? (
                        <><Loader2 size={16} className="animate-spin" /> Processando Metadados...</>
                    ) : (
                        <><Upload size={16} /> Digitalizar Receita</>
                    )}
                </button>
            </div>

            {/* Listagem Dinâmica Filtrada */}
            <div className="space-y-3">
                {receitasFiltradas.length > 0 ? (
                    receitasFiltradas.map((receita) => (
                        <div key={receita.id} className={`flex flex-col sm:flex-row sm:items-center justify-between p-4 rounded-2xl gap-4 transition-all ${cardBgClass}`}>
                            <div className="flex items-center gap-4">
                                {receita.imagemUrl ? (
                                    <div
                                        onClick={() => setImgPreviewUrl(receita.imagemUrl)}
                                        className="w-14 h-14 rounded-xl overflow-hidden border border-slate-200 dark:border-slate-700 relative group cursor-zoom-in shrink-0 shadow-inner"
                                    >
                                        <img src={receita.imagemUrl} alt="Receita" className="w-full h-full object-cover group-hover:scale-110 transition-transform" />
                                        <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                                            <Eye size={14} className="text-white" />
                                        </div>
                                    </div>
                                ) : (
                                    <div className="w-14 h-14 rounded-xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-400 shrink-0">
                                        <FileText size={20} />
                                    </div>
                                )}

                                <div className="space-y-0.5 text-left">
                                    <h4 className="text-base font-bold text-slate-900 dark:text-white">{receita.nome}</h4>
                                    <div className="flex flex-wrap items-center gap-x-3 gap-y-0.5 text-xs text-slate-400">
                                        <span className="bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 px-2 py-0.5 rounded-md font-medium text-[10px]">{receita.tipo}</span>
                                        {receita.dadosEstruturados?.paciente && (
                                            <span className="font-medium text-slate-500 dark:text-slate-400">Pac: {receita.dadosEstruturados.paciente}</span>
                                        )}
                                        <span className="flex items-center gap-1"><Clock size={12} /> Emitida: {receita.dadosEstruturados?.dataEmissao}</span>
                                    </div>
                                </div>
                            </div>

                            <div className="flex items-center gap-2 justify-end">
                                <button onClick={() => setReceitaSelecionada(receita)} className={`px-4 py-1.5 rounded-xl text-xs font-bold transition-colors ${buttonSecondaryClass}`}>
                                    Ver detalhes
                                </button>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="text-center py-12 text-sm text-slate-400 bg-slate-50/50 dark:bg-slate-900/30 rounded-2xl border border-dashed border-slate-200 dark:border-slate-800">
                        <FileText className="mx-auto mb-2 text-slate-300 dark:text-slate-700" size={32} />
                        {search ? 'Nenhuma receita corresponde à sua busca.' : 'Nenhuma receita digitalizada ainda.'}
                    </div>
                )}
            </div>

            {/* LIGHTBOX DE EXPANSÃO DA MINIATURA */}
            {imgPreviewUrl && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/85 p-4" onClick={() => setImgPreviewUrl(null)}>
                    <div className="relative max-w-3xl max-h-[90vh]" onClick={(e) => e.stopPropagation()}>
                        <button
                            onClick={() => setImgPreviewUrl(null)}
                            className="absolute -top-12 right-0 text-white flex items-center gap-1 text-sm bg-white/10 px-3 py-1.5 rounded-xl hover:bg-white/20 transition-all"
                        >
                            <X size={16} /> Fechar
                        </button>
                        <img src={imgPreviewUrl} alt="Receita Expandida" className="max-w-full max-h-[80vh] rounded-xl object-contain shadow-2xl border border-white/10" />
                    </div>
                </div>
            )}

            {/* MODAL 1: FALLBACK REVISÃO HUMANA */}
            {isReviewOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
                    <div className="w-full max-w-3xl rounded-2xl p-6 shadow-2xl border flex flex-col md:flex-row gap-6 max-h-[90vh] overflow-y-auto bg-white dark:bg-slate-900 dark:border-slate-800">
                        <div className="flex-1 flex flex-col gap-2 border-r dark:border-slate-800 pr-0 md:pr-4 text-left">
                            <div className="flex items-center gap-2 text-amber-600 font-bold text-sm mb-2">
                                <AlertTriangle size={18} /> <span>Revisão de Metadados Obrigatórios</span>
                            </div>
                            {reviewData.imagemUrl && (
                                <img src={reviewData.imagemUrl} alt="Documento" className="w-full h-40 object-contain rounded-lg bg-slate-50 dark:bg-slate-950 p-2 border border-dashed border-slate-200 dark:border-slate-800" />
                            )}
                            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mt-2">Texto Digitalizado:</p>
                            <div className="flex-1 p-3 bg-slate-50 dark:bg-slate-950 rounded-xl font-mono text-[11px] overflow-y-auto max-h-32 text-slate-700 dark:text-slate-300">
                                {reviewData.textoExtraido || "Incapaz de ler"}
                            </div>
                        </div>

                        <form onSubmit={handleSalvarRevisao} className="flex-1 space-y-3 text-left">
                            <h3 className="text-base font-bold text-slate-900 dark:text-white">Validar Receituário</h3>

                            <div className="grid grid-cols-2 gap-2">
                                <div>
                                    <label className="text-[10px] font-bold text-slate-400 block">Tipo de Receita</label>
                                    <select value={reviewData.tipoReceita} onChange={e => setReviewData(p => ({ ...p, tipoReceita: e.target.value }))} className={`w-full p-2 mt-1 rounded-lg text-xs ${inputClass}`}>
                                        <option value="Simples">Simples</option>
                                        <option value="Antimicrobiano">Antimicrobiano (10 dias)</option>
                                        <option value="Controle Especial (C1/C5)">Controle Especial</option>
                                        <option value="Uso Contínuo">Uso Contínuo (180 dias)</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="text-[10px] font-bold text-slate-400 block">Validade (Dias)</label>
                                    <input type="number" value={reviewData.validadeDias} onChange={e => setReviewData(p => ({ ...p, validadeDias: e.target.value }))} className={`w-full p-2 mt-1 rounded-lg text-xs ${inputClass}`} />
                                </div>
                            </div>

                            <div>
                                <label className="text-[10px] font-bold text-slate-400 block">Nome do Paciente *</label>
                                <input type="text" required value={reviewData.paciente} onChange={e => setReviewData(p => ({ ...p, paciente: e.target.value }))} className={`w-full p-2 mt-1 rounded-lg text-xs ${inputClass}`} />
                            </div>

                            <div className="grid grid-cols-2 gap-2">
                                <div>
                                    <label className="text-[10px] font-bold text-slate-400 block">Nome do Médico</label>
                                    <input type="text" value={reviewData.nomeMedico} onChange={e => setReviewData(p => ({ ...p, nomeMedico: e.target.value }))} className={`w-full p-2 mt-1 rounded-lg text-xs ${inputClass}`} placeholder="Dr. ..." />
                                </div>
                                <div>
                                    <label className="text-[10px] font-bold text-slate-400 block">CRM *</label>
                                    <input type="text" required value={reviewData.crmMedico} onChange={e => setReviewData(p => ({ ...p, crmMedico: e.target.value }))} className={`w-full p-2 mt-1 rounded-lg text-xs ${inputClass}`} placeholder="12345/SP" />
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-2">
                                <div>
                                    <label className="text-[10px] font-bold text-slate-400 block">CNPJ Farmácia *</label>
                                    {/* Adicionada a div relative para envelopar o input e o botão juntos */}
                                    <div className="relative flex items-center">
                                        <input
                                            type="text"
                                            required
                                            placeholder="00.000.000/0001-00"
                                            value={reviewData.cnpjFarmacia}
                                            onChange={e => setReviewData(p => ({ ...p, cnpjFarmacia: e.target.value }))}
                                            className={`w-full p-2 pr-12 mt-1 rounded-lg text-xs ${inputClass}`} // Adicionado pr-12 para o texto não ficar por baixo do botão
                                        />
                                        {/* Botão posicionado de forma absoluta dentro do input */}
                                        <button
                                            type="button"
                                            onClick={handleGerarCnpjExemplo}
                                            className="absolute right-1.5 bottom-1 px-1.5 py-1 bg-purple-100 hover:bg-purple-200 dark:bg-purple-900/50 dark:hover:bg-purple-900/80 text-purple-700 dark:text-purple-300 rounded text-[9px] font-extrabold uppercase transition-colors"
                                            title="Gerar CNPJ válido para teste"
                                        >
                                            Gerar
                                        </button>
                                    </div>
                                </div>
                                <div>
                                    <label className="text-[10px] font-bold text-slate-400 block">Data de Emissão</label>
                                    <input
                                        type="text"
                                        value={reviewData.dataEmissao}
                                        onChange={e => setReviewData(p => ({ ...p, dataEmissao: e.target.value }))}
                                        className={`w-full p-2 mt-1 rounded-lg text-xs ${inputClass}`}
                                    />
                                </div>
                            </div>

                            <div className="flex gap-2 pt-4 border-t dark:border-slate-800">
                                <button type="button" onClick={() => setIsReviewOpen(false)} className={`flex-1 py-2 rounded-xl text-xs font-bold ${buttonSecondaryClass}`}>Cancelar</button>
                                <button type="submit" className={`flex-1 py-2 rounded-xl text-xs font-bold ${buttonActionClass}`}>Salvar e Validar</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* MODAL 2: VISUALIZAÇÃO COMPLETA */}
            {receitaSelecionada && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm" onClick={() => setReceitaSelecionada(null)}>
                    <div className="w-full max-w-2xl rounded-2xl p-6 relative shadow-xl border bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 flex flex-col md:flex-row gap-6" onClick={(e) => e.stopPropagation()}>

                        <div className="w-full md:w-48 space-y-2 text-left">
                            <label className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block">Documento Anexo</label>
                            {receitaSelecionada.imagemUrl ? (
                                <div className="relative group rounded-xl overflow-hidden border border-slate-200 dark:border-slate-800 bg-slate-50 cursor-zoom-in" onClick={() => setImgPreviewUrl(receitaSelecionada.imagemUrl)}>
                                    <img src={receitaSelecionada.imagemUrl} alt="Receita Digital" className="w-full h-44 object-contain" />
                                    <div className="absolute inset-0 bg-black/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                        <Eye size={18} className="text-white" />
                                    </div>
                                </div>
                            ) : (
                                <div className="h-44 rounded-xl bg-slate-100 dark:bg-slate-950 flex items-center justify-center text-slate-400">
                                    <FileText size={28} />
                                </div>
                            )}
                        </div>

                        <div className="flex-1 space-y-3 text-left">
                            <div className="flex items-start justify-between pb-2 border-b dark:border-slate-800">
                                <div>
                                    <span className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold mb-1 ${receitaSelecionada.statusCor}`}>
                                        {receitaSelecionada.dadosEstruturados?.tipoReceita}
                                    </span>
                                    <h3 className="text-lg font-bold text-slate-900 dark:text-white">{receitaSelecionada.nome}</h3>
                                </div>
                                <button onClick={() => setReceitaSelecionada(null)} className="p-1 text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg">
                                    <X size={18} />
                                </button>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                                <div className="bg-slate-50 dark:bg-slate-950 p-2.5 rounded-xl border border-slate-100 dark:border-slate-800/60">
                                    <span className="text-slate-400 block text-[10px] uppercase font-bold">Paciente</span>
                                    <span className="font-semibold text-slate-800 dark:text-slate-200">{receitaSelecionada.dadosEstruturados?.paciente}</span>
                                </div>
                                <div className="bg-slate-50 dark:bg-slate-950 p-2.5 rounded-xl border border-slate-100 dark:border-slate-800/60">
                                    <span className="text-slate-400 block text-[10px] uppercase font-bold">Profissional Prescritor</span>
                                    <span className="font-semibold text-slate-800 dark:text-slate-200">{receitaSelecionada.dadosEstruturados?.nomeMedico} ({receitaSelecionada.dadosEstruturados?.crmMedico})</span>
                                </div>
                                <div className="bg-slate-50 dark:bg-slate-950 p-2.5 rounded-xl border border-slate-100 dark:border-slate-800/60">
                                    <span className="text-slate-400 block text-[10px] uppercase font-bold">CNPJ Destino</span>
                                    <span className="font-semibold text-slate-800 dark:text-slate-200">{receitaSelecionada.dadosEstruturados?.cnpjFarmacia}</span>
                                </div>
                                <div className="bg-slate-50 dark:bg-slate-950 p-2.5 rounded-xl border border-slate-100 dark:border-slate-800/60">
                                    <span className="text-slate-400 block text-[10px] uppercase font-bold">Emissão & Validade</span>
                                    <span className="font-semibold text-slate-800 dark:text-slate-200">{receitaSelecionada.dadosEstruturados?.dataEmissao} • Validade de {receitaSelecionada.dadosEstruturados?.validadeDias} dias</span>
                                </div>
                            </div>

                            <div className="mt-4 flex justify-end gap-2">
                                <button onClick={() => setReceitaSelecionada(null)} className={`px-4 py-2 rounded-xl text-xs font-bold ${buttonSecondaryClass}`}>Fechar</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}