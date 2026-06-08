import { useState, useRef } from 'react'
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
import Tesseract from 'tesseract.js'

// Função matemática para validar CNPJ real
function validarCNPJ(cnpj) {
    cnpj = cnpj.replace(/[^\d]+/g, '');
    if (cnpj.length !== 14) return false;
    if (/^(\d)\1+$/.test(cnpj)) return false;
    
    let tamanho = cnpj.length - 2
    let numeros = cnpj.substring(0, tamanho);
    let digitos = cnpj.substring(tamanho);
    let soma = 0;
    let pos = tamanho - 7;
    for (let i = tamanho; i >= 1; i--) {
      soma += numeros.charAt(tamanho - i) * pos--;
      if (pos < 2) pos = 9;
    }
    let resultado = soma % 11 < 2 ? 0 : 11 - (soma % 11);
    if (resultado !== parseInt(digitos.charAt(0))) return false;
    
    tamanho = tamanho + 1;
    numeros = cnpj.substring(0, tamanho);
    soma = 0;
    pos = tamanho - 7;
    for (let i = tamanho; i >= 1; i--) {
      soma += numeros.charAt(tamanho - i) * pos--;
      if (pos < 2) pos = 9;
    }
    resultado = soma % 11 < 2 ? 0 : 11 - (soma % 11);
    if (resultado !== parseInt(digitos.charAt(1))) return false;
    return true;
}

export default function DashboardReceitas() {
    const { highContrast } = useThemeContext()
    const [search, setSearch] = useState('')
    const [receitas, setReceitas] = useState([])
    const [isProcessing, setIsProcessing] = useState(false)
    const fileInputRef = useRef(null)
    
    // Modais e Preview de Imagem
    const [receitaSelecionada, setReceitaSelecionada] = useState(null)
    const [isReviewOpen, setIsReviewOpen] = useState(false)
    const [imgPreviewUrl, setImgPreviewUrl] = useState(null) 
    
    // Estado do formulário de revisão humana
    const [reviewData, setReviewData] = useState({
        id: null,
        nome: '',
        textoExtraido: '',
        paciente: '',
        crmMedico: '',
        nomeMedico: '',
        cnpjFarmacia: '',
        dataEmissao: '',
        validadeDias: '30',
        tipoReceita: 'Simples', 
        confidence: 0,
        imagemUrl: '' 
    })

    const preprocessImage = (file) => {
        return new Promise((resolve) => {
            const reader = new FileReader();
            reader.onload = (event) => {
                const img = new Image();
                img.onload = () => {
                    const canvas = document.createElement('canvas');
                    const ctx = canvas.getContext('2d');
                    canvas.width = img.width;
                    canvas.height = img.height;
                    ctx.drawImage(img, 0, 0);
                    const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
                    const data = imgData.data;
                    for (let i = 0; i < data.length; i += 4) {
                        const brightness = 0.34 * data[i] + 0.5 * data[i + 1] + 0.16 * data[i + 2];
                        const v = brightness < 120 ? 0 : 255;
                        data[i] = v; data[i+1] = v; data[i+2] = v;
                    }
                    ctx.putImageData(imgData, 0, 0);
                    resolve(canvas.toDataURL());
                };
                img.src = event.target.result;
            };
            reader.readAsDataURL(file);
        });
    };

    const handleOcrUpload = async (event) => {
        const file = event.target.files[0]
        if (!file) return

        setIsProcessing(true)
        const urlOriginalDaImagem = URL.createObjectURL(file)

        try {
            const processedImgUrl = await preprocessImage(file)
            const result = await Tesseract.recognize(processedImgUrl, 'por')
            const text = result.data.text
            const confidence = result.data.confidence

            // Expressões Regulares
            const crmRegex = /(?:CRM|crm)[:\s]*(\d+[\s]*\/[\s]*[A-Za-z]{2}|\d+)/i
            const cnpjRegex = /(\d{2}\.\d{3}\.\d{3}\/\d{4}-\d{2}|\d{14})/
            const pacienteRegex = /(?:Paciente|Nome|Para)[:\s]*([A-Za-zÀ-ÖØ-öø-ÿ\s]{3,30})/i
            const medicoRegex = /(?:Dr\.|Dra\.|Médico|Médica)[:\s]*([A-Za-zÀ-ÖØ-öø-ÿ\s]{3,30})/i
            const dataRegex = /(\d{2}\/\d{2}\/\d{4}|\d{2}\/\d{2}\/\d{2})/

            const crmMatch = text.match(crmRegex)
            const cnpjMatch = text.match(cnpjRegex)
            const pacienteMatch = text.match(pacienteRegex)
            const medicoMatch = text.match(medicoRegex)
            const dataMatch = text.match(dataRegex)

            const cnpjDetectado = cnpjMatch ? cnpjMatch[0].replace(/[^\d]+/g, '') : '';
            const isCnpjValido = cnpjDetectado ? validarCNPJ(cnpjDetectado) : false;

            let tipoDetectado = 'Simples';
            if (/controle especial|notificação|retida/i.test(text)) tipoDetectado = 'Controle Especial (C1/C5)';
            if (/antibiótico|antimicrobiano|amoxicilina|azimicina/i.test(text)) tipoDetectado = 'Antimicrobiano';

            const primeiraLinha = text.split('\n').find(l => l.trim().length > 0) || 'Fórmula Identificada'

            const dadosCapturados = {
                id: Date.now(),
                nome: primeiraLinha.substring(0, 30).trim(),
                textoExtraido: text,
                paciente: pacienteMatch ? pacienteMatch[1].trim() : '',
                crmMedico: crmMatch ? crmMatch[1].trim() : '',
                nomeMedico: medicoMatch ? medicoMatch[1].trim() : '',
                cnpjFarmacia: isCnpjValido ? cnpjMatch[0].trim() : '', 
                dataEmissao: dataMatch ? dataMatch[0] : new Date().toLocaleDateString('pt-BR'),
                validadeDias: tipoDetectado === 'Antimicrobiano' ? '10' : '30',
                tipoReceita: tipoDetectado,
                confidence: confidence,
                imagemUrl: urlOriginalDaImagem
            }

            // Fallback se faltar dados obrigatórios
            if (!dadosCapturados.paciente || !dadosCapturados.crmMedico || !dadosCapturados.cnpjFarmacia) {
                setReviewData(dadosCapturados);
                setIsReviewOpen(true);
            } else {
                salvarReceitaNoEstado(dadosCapturados);
            }

        } catch (error) {
            console.error(error)
            URL.revokeObjectURL(urlOriginalDaImagem)
            alert("Erro ao ler e processar os metadados da receita.")
        } finally {
            setIsProcessing(false)
            if (fileInputRef.current) fileInputRef.current.value = '' // Limpa o input file
        }
    }

    const salvarReceitaNoEstado = (dados) => {
        const novaReceita = {
            id: dados.id,
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
        receita.dadosEstruturados?.paciente.toLowerCase().includes(search.toLowerCase())
    )

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
                                    <div className="w-14 h-14 rounded-xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-400 shrink-0"><FileText size={20} /></div>
                                ) /* Fechamento correto da condicional de imagemUrl */}

                                <div className="space-y-0.5">
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
                <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/85 p-4 animate-fade-in" onClick={() => setImgPreviewUrl(null)}>
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
                        <div className="flex-1 flex flex-col gap-2 border-r dark:border-slate-800 pr-0 md:pr-4text-left">
                            <div className="flex items-center gap-2 text-amber-600 font-bold text-sm mb-2">
                                <AlertTriangle size={18} /> <span>Revisão de Metadados Obrigatórios</span>
                            </div>
                            {reviewData.imagemUrl && (
                                <img src={reviewData.imagemUrl} alt="Documento" className="w-full h-40 object-contain rounded-lg bg-slate-50 dark:bg-slate-950 p-2 border border-dashed border-slate-200 dark:border-slate-800" />
                            )}
                            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mt-2">Texto Digitalizado:</p>
                            <div className="flex-1 p-3 bg-slate-50 dark:bg-slate-950 rounded-xl font-mono text-[11px] overflow-y-auto max-h-32 text-slate-700 dark:text-slate-300">{reviewData.textoExtraido || "Incapaz de ler"}</div>
                        </div>

                        <form onSubmit={handleSalvarRevisao} className="flex-1 space-y-3 text-left">
                            <h3 className="text-base font-bold text-slate-900 dark:text-white">Validar Receituário</h3>
                            
                            <div className="grid grid-cols-2 gap-2">
                                <div>
                                    <label className="text-[10px] font-bold text-slate-400 block">Tipo de Receita</label>
                                    <select value={reviewData.tipoReceita} onChange={e => setReviewData(p => ({...p, tipoReceita: e.target.value}))} className={`w-full p-2 mt-1 rounded-lg text-xs ${inputClass}`}>
                                        <option value="Simples">Simples</option>
                                        <option value="Antimicrobiano">Antimicrobiano (10 dias)</option>
                                        <option value="Controle Especial (C1/C5)">Controle Especial</option>
                                        <option value="Uso Contínuo">Uso Contínuo (180 dias)</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="text-[10px] font-bold text-slate-400 block">Validade (Dias)</label>
                                    <input type="number" value={reviewData.validadeDias} onChange={e => setReviewData(p => ({...p, validadeDias: e.target.value}))} className={`w-full p-2 mt-1 rounded-lg text-xs ${inputClass}`} />
                                </div>
                            </div>

                            <div>
                                <label className="text-[10px] font-bold text-slate-400 block">Nome do Paciente *</label>
                                <input type="text" required value={reviewData.paciente} onChange={e => setReviewData(p => ({...p, paciente: e.target.value}))} className={`w-full p-2 mt-1 rounded-lg text-xs ${inputClass}`} />
                            </div>

                            <div className="grid grid-cols-2 gap-2">
                                <div>
                                    <label className="text-[10px] font-bold text-slate-400 block">Nome do Médico</label>
                                    <input type="text" value={reviewData.nomeMedico} onChange={e => setReviewData(p => ({...p, nomeMedico: e.target.value}))} className={`w-full p-2 mt-1 rounded-lg text-xs ${inputClass}`} placeholder="Dr. ..." />
                                </div>
                                <div>
                                    <label className="text-[10px] font-bold text-slate-400 block">CRM *</label>
                                    <input type="text" required value={reviewData.crmMedico} onChange={e => setReviewData(p => ({...p, crmMedico: e.target.value}))} className={`w-full p-2 mt-1 rounded-lg text-xs ${inputClass}`} placeholder="12345/SP" />
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-2">
                                <div>
                                    <label className="text-[10px] font-bold text-slate-400 block">CNPJ Farmácia *</label>
                                    <input type="text" required value={reviewData.cnpjFarmacia} onChange={e => setReviewData(p => ({...p, cnpjFarmacia: e.target.value}))} className={`w-full p-2 mt-1 rounded-lg text-xs ${inputClass}`} />
                                </div>
                                <div>
                                    <label className="text-[10px] font-bold text-slate-400 block">Data de Emissão</label>
                                    <input type="text" value={reviewData.dataEmissao} onChange={e => setReviewData(p => ({...p, dataEmissao: e.target.value}))} className={`w-full p-2 mt-1 rounded-lg text-xs ${inputClass}`} />
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
                                <div className="h-44 rounded-xl bg-slate-100 dark:bg-slate-950 flex items-center justify-center text-slate-400"><FileText size={28} /></div>
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
                                <button onClick={() => setReceitaSelecionada(null)} className="p-1 text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg"><X size={18} /></button>
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