"use client"

import { useState, useRef } from 'react'
import { FileText, CircleDollarSign, Truck, Upload, Play, X, Loader2, Camera, Sparkles, ArrowRight } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import Button from '../../../components/ui/Button'

// Importações do serviço unificado de OCR e Câmera
import {
    processarReceitaOCR,
    iniciarCamera,
    pararCamera,
    capturarFotoDaCamera
} from '../../../services/ocrService'

const steps = [
    {
        number: '01',
        icon: <FileText size={20} />,
        title: "Envie sua receita em segundos",
        desc: "Foto ou PDF de forma rápida e segura.",
    },
    {
        number: '02',
        icon: <CircleDollarSign size={20} />,
        title: "Compare orçamentos facilmente",
        desc: "Veja preços e condições das melhores farmácias.",
    },
    {
        number: '03',
        icon: <Truck size={20} />,
        title: "Receba em casa com segurança",
        desc: "Entrega rápida e acompanhamento do pedido.",
    },
]

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { staggerChildren: 0.2 }
    }
}

const itemVariants = {
    hidden: { opacity: 0, x: -30 },
    visible: {
        opacity: 1,
        x: 0,
        transition: { type: "spring", stiffness: 100, damping: 15 }
    }
}

export default function HowItWorksSection() {
    const [isUploadModalOpen, setIsUploadModalOpen] = useState(false)
    const [isVideoModalOpen, setIsVideoModalOpen] = useState(false)
    const [isOcrProcessing, setIsOcrProcessing] = useState(false)

    // Estados da Câmera
    const [isCameraActive, setIsCameraActive] = useState(false)
    const [cameraStream, setCameraStream] = useState(null)
    const videoRef = useRef(null)

    // NOVO: Estado para armazenar o resultado da leitura da IA e o preview da imagem
    const [dadosResultado, setDadosResultado] = useState(null)

    // Handler unificado de OCR
    const executarProcessamentoOCR = async (arquivo) => {
        if (!arquivo) return

        setIsOcrProcessing(true)
        setDadosResultado(null) // Limpa resultados anteriores

        try {
            // Cria um preview local temporário da imagem capturada/enviada
            const urlPreview = URL.createObjectURL(arquivo)

            const dadosExtraidos = await processarReceitaOCR(arquivo)

            // Salva os dados estruturados + a imagem para mostrar na tela de sucesso
            setDadosResultado({
                ...dadosExtraidos,
                previewUrl: urlPreview
            })

        } catch (error) {
            console.error("Erro no processamento da receita:", error)
            alert(error.message || "Não foi possível ler os dados da imagem.")
        } finally {
            setIsOcrProcessing(false)
        }
    }

    // Fluxo: Upload de arquivo
    const handleFileChange = async (e) => {
        const arquivoSelecionado = e.target.files?.[0]
        if (arquivoSelecionado) {
            await executarProcessamentoOCR(arquivoSelecionado)
        }
    }

    // Fluxo: Abrir Câmera
    const handleLigarcamera = async () => {
        try {
            const stream = await iniciarCamera()
            setCameraStream(stream)
            setIsCameraActive(true)

            setTimeout(() => {
                if (videoRef.current) videoRef.current.srcObject = stream
            }, 100)
        } catch (err) {
            alert(err.message)
        }
    }

    // Fluxo: Capturar Foto
    const handleTirarFoto = async () => {
        if (!videoRef.current) return
        try {
            const arquivoFoto = await capturarFotoDaCamera(videoRef.current)
            handleFecharCamera() // Desliga o hardware imediatamente para economizar processamento
            await executarProcessamentoOCR(arquivoFoto) // Dispara a leitura da IA
        } catch (error) {
            console.error("Erro ao capturar foto:", error)
        }
    }

    const handleFecharCamera = () => {
        pararCamera(cameraStream)
        setCameraStream(null)
        setIsCameraActive(false)
    }

    const handleFecharModalPrincipal = () => {
        handleFecharCamera()
        setDadosResultado(null)
        setIsUploadModalOpen(false)
    }

    return (
        <section
            id="como-funciona"
            className="relative flex flex-col lg:flex-row overflow-hidden min-h-screen bg-slate-50 dark:bg-slate-950 transition-colors duration-500"
        >
            {/* bg */}
            <div
                className="absolute inset-0 bg-cover bg-top z-0 opacity-10 dark:opacity-5 mix-blend-overlay pointer-events-none"
                style={{ backgroundImage: `url('/bg-howItWorks.png')` }}
            />

            {/* text */}
            <motion.div
                className="relative z-20 w-full lg:w-1/2 flex items-center px-4 sm:px-6 lg:px-16 py-12 sm:py-16 lg:py-24 lg:min-h-screen"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
                variants={containerVariants}
            >
                <div className="flex flex-col gap-4 max-w-xl w-full">
                    <motion.div
                        variants={itemVariants}
                        className="inline-flex items-center gap-2 self-start text-xs font-semibold tracking-widest px-4 py-1.5 rounded-full border border-secondary/40 bg-secondary/10 text-secondary dark:text-secondary-light"
                    >
                        <span>🌿</span> PRÁTICO E COMPLETO
                    </motion.div>

                    <motion.div variants={itemVariants}>
                        <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold text-slate-900 dark:text-white leading-snug">
                            Controle seu tratamento do <span className="text-secondary dark:text-secondary-light">início ao fim.</span>
                        </h2>
                        <p className="mt-3 sm:mt-4 text-sm sm:text-base lg:text-lg text-slate-600 dark:text-slate-300 leading-relaxed">
                            Envie sua receita, compare preços e finalize com a melhor opção — tudo pelo celular.
                        </p>
                    </motion.div>

                    {/* steps */}
                    <div className="flex flex-col gap-0 mt-4">
                        {steps.map((step, index) => (
                            <motion.div key={step.title} variants={itemVariants} className="flex items-start gap-4">
                                <div className="flex flex-col items-center flex-shrink-0">
                                    <div className="w-11 h-11 mt-2 rounded-xl border-2 border-secondary/40 bg-secondary/10 text-secondary dark:text-secondary-light flex items-center justify-center font-bold text-xs">
                                        {step.number}
                                    </div>
                                    {index < steps.length - 1 && (
                                        <motion.div
                                            className="w-px bg-secondary/20 dark:bg-secondary/40 my-1"
                                            initial={{ height: 0 }}
                                            whileInView={{ height: "2rem" }}
                                            viewport={{ once: true }}
                                            transition={{ delay: 0.4 + index * 0.2, duration: 0.5 }}
                                        />
                                    )}
                                </div>
                                <div className="pt-2.5 pb-6">
                                    <p className="font-semibold text-slate-900 dark:text-white text-base">{step.title}</p>
                                    <p className="text-sm text-slate-500 dark:text-slate-400 mt-0.5">{step.desc}</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    {/* buttons */}
                    <motion.div variants={itemVariants} className="flex gap-4 flex-wrap mt-2">
                        <Button variant='primary' onClick={() => setIsUploadModalOpen(true)}>
                            <Upload size={16} /> Enviar receita
                        </Button>
                        <Button
                            variant='outlineDark'
                            className="dark:border-white dark:text-white dark:hover:bg-white/10"
                            onClick={() => setIsVideoModalOpen(true)}
                        >
                            <Play size={14} className="fill-current" /> Ver como funciona
                        </Button>
                    </motion.div>
                </div>
            </motion.div>

            {/* mockups */}
            <div className="relative z-20 w-full lg:w-1/2 flex justify-center items-center min-h-48 sm:min-h-64 lg:min-h-screen overflow-hidden px-4 sm:px-6 pb-12 sm:pb-16 lg:pb-0">
                <motion.img
                    src="/mockups.png"
                    alt="Mockup"
                    loading="lazy"
                    className="w-full max-w-sm lg:max-w-2xl drop-shadow-2xl"
                    initial={{ opacity: 0, y: 50, scale: 0.95 }}
                    whileInView={{ opacity: 1, y: [0, -12, 0], scale: 1, transition: { y: { repeat: Infinity, duration: 5, ease: "easeInOut" }, opacity: { duration: 0.8 }, scale: { duration: 0.8 } } }}
                    viewport={{ once: true }}
                />
            </div>

            {/* ================= MODAIS NA ESCUTA ================= */}
            <AnimatePresence>
                {isUploadModalOpen && (
                    <motion.div
                        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md"
                        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                    >
                        <motion.div
                            className="relative w-full max-w-md bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl text-slate-900 dark:text-white overflow-hidden"
                            initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.9, y: 20 }}
                        >
                            <button
                                className="absolute top-4 right-4 z-50 p-2 rounded-full bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 transition"
                                onClick={handleFecharModalPrincipal}
                            >
                                <X size={18} />
                            </button>

                            {/* TELA 1: PROCESSANDO LEITURA DA IA */}
                            {isOcrProcessing && (
                                <div className="min-h-[300px] flex flex-col items-center justify-center gap-4 text-center">
                                    <div className="relative p-4 bg-secondary/10 text-secondary rounded-2xl animate-pulse">
                                        <Sparkles size={32} className="animate-spin duration-1000" />
                                    </div>
                                    <div>
                                        <h4 className="font-semibold text-lg text-slate-900 dark:text-white">Nossa IA está trabalhando...</h4>
                                        <p className="text-sm text-slate-500 dark:text-slate-400 mt-1 max-w-[280px] mx-auto">
                                            Lendo compostos, identificando CRM e validando a receita digitalmente.
                                        </p>
                                    </div>
                                    <div className="w-full bg-slate-100 dark:bg-slate-800 h-1.5 rounded-full overflow-hidden max-w-[200px]">
                                        <div className="bg-secondary h-full w-2/3 animate-infinite-loading rounded-full" />
                                    </div>
                                </div>
                            )}

                            {/* TELA 2: EXIBIÇÃO DOS RESULTADOS DA IA (FOTO COPIADA + TEXTO EXTRAÍDO) */}
                            {!isOcrProcessing && dadosResultado && (
                                <motion.div
                                    className="flex flex-col gap-5 pt-2 animate-fadeIn"
                                    initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }}
                                >
                                    {/* Tag de Sucesso da IA */}
                                    <div className="inline-flex items-center gap-2 self-start text-[11px] font-bold tracking-wider px-3 py-1 rounded-md bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                                        <Sparkles size={12} className="fill-current" />
                                        ESSA É A NOSSA IA FUNCIONANDO
                                    </div>

                                    <div>
                                        <h3 className="font-serif text-xl font-bold">Leitura Concluída!</h3>
                                        <p className="text-xs text-slate-400 dark:text-slate-500 mt-0.5">Veja abaixo os principais dados extraídos da sua imagem:</p>
                                    </div>

                                    {/* Bloco de Preview do Texto Extraído */}
                                    <div className="flex flex-col gap-2 bg-slate-50 dark:bg-slate-950 p-4 rounded-2xl border border-slate-100 dark:border-slate-800 max-h-[180px] overflow-y-auto">
                                        <span className="text-[10px] uppercase tracking-wider font-semibold text-slate-400 block">Texto Detectado na Receita</span>
                                        <p className="text-xs text-slate-700 dark:text-slate-300 whitespace-pre-line leading-relaxed italic font-mono">
                                            {dadosResultado.textoExtraido || "Nenhum texto legível foi identificado."}
                                        </p>
                                    </div>

                                    {/* Mini Metadados Estruturados */}
                                    <div className="grid grid-cols-2 gap-2 text-[11px] bg-slate-50/50 dark:bg-slate-900/50 p-3 rounded-xl border border-slate-100 dark:border-slate-800">
                                        <div><span className="text-slate-400">Médico:</span> <strong className="block truncate">{dadosResultado.nomeMedico || 'Não identificado'}</strong></div>
                                        <div><span className="text-slate-400">CRM:</span> <strong className="block truncate">{dadosResultado.crmMedico || 'Não identificado'}</strong></div>
                                        <div><span className="text-slate-400">Tipo:</span> <strong className="block truncate text-secondary">{dadosResultado.tipoReceita}</strong></div>
                                        <div><span className="text-slate-400">Confiança IA:</span> <strong className="block text-emerald-500">{dadosResultado.confidence?.toFixed(0)}%</strong></div>
                                    </div>

                                    {/* Botões Finais de Ação */}
                                    <div className="flex gap-2 mt-2 w-full">
                                        <Button
                                            variant="outlineDark"
                                            className="flex-1 text-xs py-3 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-800"
                                            onClick={() => {
                                                // Limpa o resultado anterior para permitir que o usuário tire outra foto ou faça novo upload
                                                setDadosResultado(null);
                                                setIsCameraActive(false);
                                            }}
                                        >
                                            Testar Novamente
                                        </Button>
                                        <Button
                                            variant="primary"
                                            className="flex-1 text-xs py-3"
                                            onClick={() => {
                                                console.log("Direcionando usuário para a plataforma com os dados:", dadosResultado);
                                                setIsUploadModalOpen(false);

                                                // Aqui você faz o roteamento/redirecionamento para o dashboard ou app principal
                                                // Exemplo com Next.js: router.push('/plataforma')
                                            }}
                                        >
                                            Acessar Plataforma <ArrowRight size={14} />
                                        </Button>
                                    </div>
                                </motion.div>
                            )}

                            {/* TELA 3: VISOR DA CÂMERA ATIVA */}
                            {!isOcrProcessing && !dadosResultado && isCameraActive && (
                                <div className="flex flex-col gap-4">
                                    <div className="relative aspect-[3/4] w-full rounded-2xl bg-black overflow-hidden border border-slate-700 shadow-inner">
                                        <video ref={videoRef} autoPlay playsInline className="w-full h-full object-cover" />
                                        <div className="absolute inset-0 border-2 border-dashed border-white/30 m-6 rounded-xl pointer-events-none flex items-center justify-center">
                                            <p className="text-[10px] text-white/70 bg-black/50 backdrop-blur-sm px-2 py-1 rounded">Enquadre a receita e segure firme</p>
                                        </div>
                                    </div>
                                    <div className="flex gap-2">
                                        <Button className="flex-1" variant="primary" onClick={handleTirarFoto}>
                                            <Camera size={16} /> Capturar Foto
                                        </Button>
                                        <Button variant="outlineDark" onClick={handleFecharCamera}>Cancelar</Button>
                                    </div>
                                </div>
                            )}

                            {/* TELA 4: SELEÇÃO INICIAL (CARD ORIGINAL DO MODAL) */}
                            {!isOcrProcessing && !dadosResultado && !isCameraActive && (
                                <div className="flex flex-col gap-3">
                                    <button
                                        onClick={handleLigarcamera}
                                        className="flex items-center gap-4 w-full p-4 rounded-2xl border border-slate-200 dark:border-slate-800 hover:border-secondary/60 dark:hover:border-secondary/60 bg-slate-50 dark:bg-slate-950/50 hover:bg-secondary/5 dark:hover:bg-secondary/5 transition text-left group"
                                    >
                                        <div className="p-3 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 group-hover:text-secondary group-hover:bg-secondary/10 transition">
                                            <Camera size={22} />
                                        </div>
                                        <div>
                                            <p className="text-sm font-semibold">Usar a câmera do celular</p>
                                            <p className="text-xs text-slate-400">Tire uma foto nítida agora mesmo</p>
                                        </div>
                                    </button>

                                    <label className="flex items-center gap-4 w-full p-4 rounded-2xl border-2 border-dashed border-slate-200 dark:border-slate-800 hover:border-secondary/60 dark:hover:border-secondary/60 bg-slate-50 dark:bg-slate-950/50 hover:bg-secondary/5 dark:hover:bg-secondary/5 cursor-pointer transition text-left group">
                                        <div className="p-3 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 group-hover:text-secondary group-hover:bg-secondary/10 transition">
                                            <Upload size={22} />
                                        </div>
                                        <div>
                                            <p className="text-sm font-semibold text-slate-700 dark:text-slate-300">Escolher arquivo salvo</p>
                                            <p className="text-xs text-slate-400">Suporta PNG, JPG ou PDFs de até 10MB</p>
                                        </div>
                                        <input type="file" accept="image/*,.pdf" className="hidden" onChange={handleFileChange} />
                                    </label>
                                </div>
                            )}
                        </motion.div>
                    </motion.div>
                )}

                {/* MODAL DE VÍDEO (SEM ALTERAÇÃO) */}
                {isVideoModalOpen && (
                    <motion.div
                        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md"
                        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                    >
                        <motion.div
                            className="relative w-full max-w-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl overflow-hidden shadow-2xl"
                            initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.9, y: 20 }}
                        >
                            <button
                                className="absolute top-4 right-4 z-30 p-2 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300"
                                onClick={() => setIsVideoModalOpen(false)}
                            >
                                <X size={18} />
                            </button>
                            <div className="p-6 sm:p-8">
                                <h3 className="font-serif text-xl sm:text-2xl font-bold mb-2">Veja o Aroê em ação</h3>
                                <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mb-6">
                                    Descubra como nossa tecnologia simplifica o orçamento de medicamentos manipulados.
                                </p>
                                <div className="relative aspect-video w-full rounded-2xl bg-slate-100 dark:bg-slate-950 overflow-hidden">
                                    <video src="/demo-aroe.mp4" controls autoPlay className="w-full h-full object-cover" poster="/video-thumbnail.png">
                                        Seu navegador não suporta vídeos.
                                    </video>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    )
}