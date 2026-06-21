"use client"

import { useState, useRef, useEffect } from "react";
import {
  Sparkles,
  FileText,
  Upload,
  X,
  Camera,
  ArrowRight,
  CircleDollarSign,
  Truck,
  ShieldCheck, 
  BadgeDollarSign,
  CheckCircle2
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Button from '../../../components/ui/Button';

// Importações do serviço unificado de OCR e Câmera
import {
  processarReceitaOCR,
  iniciarCamera,
  pararCamera,
  capturarFotoDaCamera
} from '../../../services/ocrService';

const features = [
  {
    id: 1,
    number: "01",
    label: "Identificamos os medicamentos",
    detail:
      "Nossa IA lê receitas em foto ou PDF, reconhecendo medicamentos, dosagens e informações importantes.",
  },
  {
    id: 2,
    number: "02",
    label: "Consultamos farmácias parceiras",
    detail:
      "A receita é enviada automaticamente para farmácias verificadas que podem atender sua solicitação.",
  },
  {
    id: 3,
    number: "03",
    label: "Organizamos as melhores ofertas",
    detail:
      "Você compara preços, prazo de entrega e avaliações in um único lugar.",
  },
];

export default function IntelligenceSection() {
  const [activeFeature, setActiveFeature] = useState(1);

  // Estados para controle dos modais e fluxo da IA
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [isOcrProcessing, setIsOcrProcessing] = useState(false);
  const [dadosResultado, setDadosResultado] = useState(null);
  const [isCameraActive, setIsCameraActive] = useState(false);
  const [cameraStream, setCameraStream] = useState(null);

  const videoRef = useRef(null);

  // Fluxo: Abrir Câmera (Igual ao que funciona)
  const handleLigarcamera = async () => {
    try {
      const stream = await iniciarCamera();
      setCameraStream(stream);
      setIsCameraActive(true);

      setTimeout(() => {
        if (videoRef.current) videoRef.current.srcObject = stream;
      }, 100);
    } catch (err) {
      alert(err.message || "Não foi possível acessar a câmera.");
    }
  };

  // Fluxo: Capturar Foto
  const handleTirarFoto = async () => {
    if (!videoRef.current) return;
    try {
      const arquivoFoto = await capturarFotoDaCamera(videoRef.current);
      handleFecharCamera();
      await executarProcessamentoOCR(arquivoFoto);
    } catch (error) {
      console.error("Erro ao capturar foto:", error);
    }
  };

  // Handler unificado de OCR
  const executarProcessamentoOCR = async (arquivo) => {
    if (!arquivo) return;

    setIsOcrProcessing(true);
    setDadosResultado(null);

    try {
      const urlPreview = URL.createObjectURL(arquivo);
      const dadosExtraidos = await processarReceitaOCR(arquivo);

      setDadosResultado({
        ...dadosExtraidos,
        previewUrl: urlPreview
      });
    } catch (error) {
      console.error("Erro no processamento da receita:", error);
      alert(error.message || "Não foi possível ler os dados da imagem.");
    } finally {
      setIsOcrProcessing(false);
    }
  };

  const handleFileChange = async (e) => {
    const arquivoSelecionado = e.target.files?.[0];
    if (arquivoSelecionado) {
      await executarProcessamentoOCR(arquivoSelecionado);
    }
  };

  const handleFecharCamera = () => {
    pararCamera(cameraStream);
    setCameraStream(null);
    setIsCameraActive(false);
  };

  const handleFecharModalPrincipal = () => {
    handleFecharCamera();
    setDadosResultado(null);
    setIsUploadModalOpen(false);
  };

  return (
    <section
      className="
        relative
        overflow-hidden
        bg-gradient-to-br
        from-slate-50
        via-white
        to-violet-50
        dark:from-slate-950
        dark:via-slate-900
        dark:to-slate-950
        transition-colors
        duration-500
      "
    >
      {/* Background Blur */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-secondary/15 dark:bg-secondary/10 rounded-full blur-3xl" />
      <div className="absolute bottom-10 right-10 w-72 h-72 bg-primary-light/20 dark:bg-primary/20 rounded-full blur-3xl" />

      <div
        className="
          relative
          max-w-7xl
          mx-auto
          min-h-screen
          lg:min-h-212.5
          flex
          flex-col
          lg:flex-row
          items-center
          gap-8
          lg:gap-0
        "
      >
        <div
          className="
            w-full
            lg:w-[45%]
            flex
            justify-center
            items-center
            px-4
            sm:px-6
            py-12
            sm:py-16
            lg:py-0
          "
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="
              relative
              w-full
              max-w-sm
              sm:max-w-md
              lg:max-w-lg
              xl:max-w-2xl
              flex
              items-center
              justify-center
            "
          >
            {/* Glow */}
            <div
              className="
                absolute
                top-1/2
                left-1/2
                -translate-x-1/2
                -translate-y-1/2
                w-72
                h-72
                lg:w-96
                lg:h-96
                rounded-full
                bg-gradient-to-r
                from-secondary/25
                to-primary-light/30
                dark:from-secondary/15
                dark:to-primary/20
                blur-3xl
                z-0
              "
            />

            {/* Mascote */}
            <motion.img
              src="/pill-mascot2.png"
              alt="Mascote Aroê"
              className="
                relative
                z-10
                w-full
                h-auto
                object-contain
              "
              animate={{
                y: [0, -15, 0],
              }}
              transition={{
                duration: 6,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />

            {/* Card 1 */}
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{
                duration: 5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="
                absolute
                top-12
                left-4
                z-20
                backdrop-blur-xl
                bg-white/90
                dark:bg-slate-800/90
                border
                border-slate-200
                dark:border-slate-700
                rounded-2xl
                px-4
                py-3
                shadow-xl
              "
            >
              <div className="flex items-center gap-2">
                <FileText size={18} className="text-secondary dark:text-secondary-light" />
                <div>
                  <p className="text-xs text-primary/60 dark:text-slate-400">Receita recebida</p>
                  <p className="text-sm font-semibold text-slate-900 dark:text-white">
                    IA analisando
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Card 2 */}
            <motion.div
              animate={{ y: [0, 12, 0] }}
              transition={{
                duration: 7,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="
                absolute
                top-1/3
                -right-2
                z-20
                backdrop-blur-xl
                bg-white/90
                dark:bg-slate-800/90
                border
                border-slate-200
                dark:border-slate-700
                rounded-2xl
                px-4
                py-3
                shadow-xl
              "
            >
              <div className="flex items-center gap-2">
                <ShieldCheck size={18} className="text-green-500" />
                <div>
                  <p className="text-xs text-slate-500 dark:text-slate-400">Receita validada</p>
                  <p className="text-sm font-semibold text-slate-900 dark:text-white">
                    Farmácias consultadas
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Card 3 */}
            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{
                duration: 6,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="
                absolute
                bottom-6
                left-4
                z-20
                backdrop-blur-xl
                bg-white/90
                dark:bg-slate-800/90
                border
                border-slate-200
                dark:border-slate-700
                rounded-2xl
                px-4
                py-3
                shadow-xl
                text-xs
                sm:text-sm
              "
            >
              <div className="flex items-center gap-2">
                <BadgeDollarSign size={18} className="text-primary-light" />
                <div>
                  <p className="text-xs text-slate-500 dark:text-slate-400">Melhor oferta</p>
                  <p className="text-sm font-semibold text-slate-900 dark:text-white">
                    Economia garantida
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* CONTEÚDO */}
        <div
          className="
            w-full
            lg:w-[55%]
            px-4
            sm:px-6
            lg:px-16
            py-8
            sm:py-12
            lg:py-16
          "
        >
          <motion.div
            className="max-w-xl"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary/10 border border-secondary/20 mb-6">
              <Sparkles size={16} className="text-secondary dark:text-secondary-light" />
              <span className="text-sm font-medium text-slate-900 dark:text-white">
                Tecnologia Aroê
              </span>
            </div>

            {/* Título */}
            <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold text-slate-900 dark:text-white leading-tight">
              Sua receita vira
              <span className="block text-primary-light">
                orçamentos em segundos
              </span>
            </h2>

            <p className="mt-4 sm:mt-6 text-base sm:text-lg text-slate-700 dark:text-slate-300 leading-relaxed">
              Nossa inteligência artificial interpreta sua receita, encontra
              farmácias parceiras e organiza automaticamente as melhores opções
              para você.
            </p>

            {/* Timeline */}
            <div className="mt-12 relative">
              <div className="absolute left-5 top-6 bottom-6 w-px bg-slate-300 dark:bg-slate-700" />

              <div className="flex flex-col gap-5">
                {features.map((feature, index) => {
                  const isActive = activeFeature === feature.id;

                  return (
                    <motion.div
                      key={feature.id}
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{
                        duration: 0.5,
                        delay: index * 0.15,
                      }}
                    >
                      <button
                        onClick={() =>
                          setActiveFeature(isActive ? null : feature.id)
                        }
                        className={`w-full relative text-left rounded-3xl transition-all duration-300 backdrop-blur-md border overflow-hidden ${isActive
                          ? "bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 shadow-xl"
                          : "bg-white/70 dark:bg-slate-900/70 border-slate-200 dark:border-slate-700 hover:bg-white dark:hover:bg-slate-800 hover:-translate-y-1 hover:shadow-2xl"
                          }`}
                      >
                        <div className="flex items-center gap-4 px-6 py-5">
                          <div
                            className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition-all ${isActive
                              ? "bg-primary text-white"
                              : "bg-slate-200 dark:bg-slate-700 text-slate-900 dark:text-white"
                              }`}
                          >
                            {feature.number}
                          </div>

                          <div className="flex-1">
                            <div className="flex items-center gap-2">
                              <CheckCircle2
                                size={16}
                                className={
                                  isActive
                                    ? "text-slate-900 dark:text-white"
                                    : "text-slate-400 dark:text-slate-500"
                                }
                              />

                              <span
                                className={`font-semibold ${isActive
                                  ? "text-slate-900 dark:text-white"
                                  : "text-slate-700 dark:text-slate-400"
                                  }`}
                              >
                                {feature.label}
                              </span>
                            </div>

                            <div
                              className={`transition-all duration-300 overflow-hidden ${isActive
                                ? "max-h-40 opacity-100 mt-3"
                                : "max-h-0 opacity-0"
                                }`}
                            >
                              <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                                {feature.detail}
                              </p>
                            </div>
                          </div>
                        </div>
                      </button>
                    </motion.div>
                  );
                })}
              </div>
            </div>

            {/* CTA */}
            <div className="mt-10">
              <Button variant='primary' onClick={() => setIsUploadModalOpen(true)}>
                <Upload size={16} className="inline mr-2" /> Testar IA da Aroê
              </Button>
            </div>
          </motion.div>

          {/* ================= MODAIS E FLUXO OCR INTEGRADOS ================= */}
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

                  {/* TELA 2: EXIBIÇÃO DOS RESULTADOS DA IA */}
                  {!isOcrProcessing && dadosResultado && (
                    <motion.div
                      className="flex flex-col gap-5 pt-2"
                      initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }}
                    >
                      <div className="inline-flex items-center gap-2 self-start text-[11px] font-bold tracking-wider px-3 py-1 rounded-md bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                        <Sparkles size={12} className="fill-current" />
                        ESSA É A NOSSA IA FUNCIONANDO
                      </div>

                      <div>
                        <h3 className="font-serif text-xl font-bold">Leitura Concluída!</h3>
                        <p className="text-xs text-slate-400 dark:text-slate-500 mt-0.5">Veja abaixo os principais dados extraídos:</p>
                      </div>

                      <div className="flex flex-col gap-2 bg-slate-50 dark:bg-slate-950 p-4 rounded-2xl border border-slate-100 dark:border-slate-800 max-h-[180px] overflow-y-auto">
                        <span className="text-[10px] uppercase tracking-wider font-semibold text-slate-400 block">Texto Detectado</span>
                        <p className="text-xs text-slate-700 dark:text-slate-300 whitespace-pre-line leading-relaxed italic font-mono">
                          {dadosResultado.textoExtraido || "Nenhum texto legível foi identificado."}
                        </p>
                      </div>

                      <div className="grid grid-cols-2 gap-2 text-[11px] bg-slate-50/50 dark:bg-slate-900/50 p-3 rounded-xl border border-slate-100 dark:border-slate-800">
                        <div><span className="text-slate-400">Médico:</span> <strong className="block truncate">{dadosResultado.nomeMedico || 'Não identificado'}</strong></div>
                        <div><span className="text-slate-400">CRM:</span> <strong className="block truncate">{dadosResultado.crmMedico || 'Não identificado'}</strong></div>
                        <div><span className="text-slate-400">Tipo:</span> <strong className="block truncate text-secondary">{dadosResultado.tipoReceita}</strong></div>
                        <div><span className="text-slate-400">Confiança IA:</span> <strong className="block text-emerald-500">{dadosResultado.confidence?.toFixed(0) || 94}%</strong></div>
                      </div>

                      <div className="flex gap-2 mt-2 w-full">
                        <Button
                          variant="outlineDark"
                          className="flex-1 text-xs py-3 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-800"
                          onClick={() => {
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

                  {/* TELA 4: SELEÇÃO INICIAL */}
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
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}

