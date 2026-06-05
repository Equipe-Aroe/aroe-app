import { useState, useEffect, useRef } from "react";
import { 
  Volume2, VolumeX, Trash2, Mic, MicOff, 
  Paperclip, ImagePlus, Send, Sparkles, 
  ShieldCheck, FileText, Clock, Activity, 
  BadgeDollarSign
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

import ariaAvatar from "/pill-mascot3.png"; 

// --- CONFIGURAÇÕES E MAPAS DE DADOS (Isolados para reduzir complexidade) ---
const ariaQuickQuestions = [
  "Enviar receita médica",
  "Status do meu pedido",
  "Lembrete de remédios",
  "Dicas de bem-estar",
  "Melhores orçamentos",
];

const aboutAriaCards = [
  {
    title: "O que é a Ária?",
    text: "A Ária é a assistente inteligente da Aroê. Ela traduz receitas complexas e ajuda você a gerenciar seus tratamentos.",
    icon: Sparkles,
    color: "text-purple-500 bg-purple-50 dark:bg-purple-950/30",
  },
  {
    title: "Como ela funciona?",
    text: "Ela analisa suas receitas enviadas, organiza seus horários e busca as melhores cotações nas farmácias parceiras.",
    icon: Activity,
    color: "text-emerald-500 bg-emerald-50 dark:bg-emerald-950/30",
  },
  {
    title: "Segurança e privacidade",
    text: "Seus dados de saúde e receitas médicas são totalmente confidenciais, criptografados e protegidos.",
    icon: ShieldCheck,
    color: "text-teal-500 bg-teal-50 dark:bg-teal-950/30",
  },
  {
    title: "Tratamentos e Fórmulas",
    text: "Acompanha o ciclo do seu medicamento e avisa o momento ideal de solicitar uma nova manipulação.",
    icon: Clock,
    color: "text-indigo-500 bg-indigo-50 dark:bg-indigo-950/30",
  },
];

// Mapeamento de intenções por palavras-chave (Evita a cascata de if/else)
const INTENT_RESPONSES = [
  {
    keywords: ["receita", "enviar", "mandar"],
    response: "Para enviar uma nova receita, basta clicar no ícone de clipe ou câmera aqui embaixo no chat, ou usar o botão 'Enviar nova receita' na sua página inicial. Nossa equipe vai digitalizar e cotar em até 3 laboratórios parceiros."
  },
  {
    keywords: ["status", "pedido", "onde está", "entrega"],
    response: "Seu pedido atual de 'Vitaminas A-Z (Fórmula manipulada)' já foi recebido e está na etapa 'Em Produção'. A previsão de envio é próxima semana. Você receberá uma notificação assim que ele sair para entrega!"
  },
  {
    keywords: ["lembrete", "horário", "remedio", "remédio"],
    response: "Para configurar seus alarmes, acesse a aba 'Lembretes' no menu lateral. Lá você pode definir o nome do medicamento, de quantas em quantas horas precisa tomar e a Ária te notificará no painel ou SMS."
  },
  {
    keywords: ["dica", "bem-estar", "saude", "saúde"],
    response: "Lembre-se de que a constância é o segredo do tratamento manipulado! Tente tomar seus suplementos e vitaminas sempre no mesmo horário, preferencialmente junto às principais refeições para melhorar a absorção."
  },
  {
    keywords: ["orçamento", "preço", "valor", "desconto"],
    response: "Atualmente você possui 3 orçamentos disponíveis para a sua receita. O melhor valor encontrado foi na 'Farmácia Bem Viver' por R$ 43,50, já aplicando o seu cupom de desconto de primeira compra."
  }
];

// --- FUNÇÕES UTILIÁRIAS PURAS ---
function getNowTime() {
  return new Intl.DateTimeFormat("pt-BR", { hour: "2-digit", minute: "2-digit" }).format(new Date());
}

function getAriaAnswer(question) {
  const text = question.toLowerCase();
  const matched = INTENT_RESPONSES.find(intent => 
    intent.keywords.some(keyword => text.includes(keyword))
  );
  return matched ? matched.response : "Entendi perfeitamente. Como sua assistente de saúde Aroê, posso te ajudar a acompanhar seus pedidos em andamento, tirar dúvidas sobre envio de receitas, criar lembretes de dosagem ou conferir orçamentos.";
}

function pickFemaleVoice(voices) {
  return (
    voices.find((v) => /maria|helena|heloisa|luciana|francisca|manuela|vitória|vitoria|catarina|joana|raquel|female|feminina|mulher/i.test(`${v.name} ${v.lang}`)) ||
    voices.find((v) => v.lang?.toLowerCase() === "pt-br" && !/male|masculina|homem/i.test(v.name)) ||
    voices.find((v) => v.lang?.toLowerCase() === "pt-br")
  );
}

// --- COMPONENTE PRINCIPAL ---
export default function AriaIAContent() {
  const [tab, setTab] = useState("chat");
  const [input, setInput] = useState("");
  const [audioEnabled, setAudioEnabled] = useState(false);
  const [listening, setListening] = useState(false);
  const [speaking, setSpeaking] = useState(false);
  
  const recognitionRef = useRef(null);
  const fileInputRef = useRef(null);
  const imageInputRef = useRef(null);
  const messagesEndRef = useRef(null);
  
  const [messages, setMessages] = useState(() => {
    if (typeof window === "undefined") return [];
    try {
      const saved = localStorage.getItem("aroe_aria_chat");
      if (saved) return JSON.parse(saved);
    } catch { /* fallback silencioso */ }
    return [{
      id: 1,
      role: "aria",
      text: "Olá! Eu sou a Ária, sua assistente virtual da Aroê. Estou aqui para cuidar do seu bem-estar. Posso ajudar com suas receitas, status de pedidos, lembretes de medicamentos e orçamentos.",
      time: getNowTime(),
    }];
  });

  // Efeitos colaterais simplificados
  useEffect(() => {
    if (!audioEnabled && typeof window !== "undefined" && "speechSynthesis" in window) {
      globalThis.speechSynthesis.cancel();
      setSpeaking(false);
    }
  }, [audioEnabled]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("aroe_aria_chat", JSON.stringify(messages));
    }
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [messages]);

  useEffect(() => {
    if (typeof window === "undefined" || !("speechSynthesis" in window)) return;
    const updateVoices = () => window.speechSynthesis.getVoices();
    window.speechSynthesis.onvoiceschanged = updateVoices;
    return () => { window.speechSynthesis.onvoiceschanged = null; };
  }, []);

  // Handlers de Ações
  const speak = (text) => {
    if (!audioEnabled || typeof window === "undefined" || !("speechSynthesis" in window)) return;
    
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "pt-BR";
    
    const selectedVoice = pickFemaleVoice(window.speechSynthesis.getVoices());
    if (selectedVoice) utterance.voice = selectedVoice;
    
    utterance.rate = 0.98;
    utterance.pitch = 1.25; 
    utterance.onstart = () => setSpeaking(true);
    utterance.onend = () => setSpeaking(false);
    utterance.onerror = () => setSpeaking(false);
    window.speechSynthesis.speak(utterance);
  };

  const sendMessage = (text) => {
    const question = (text ?? input).trim();
    if (!question) return;
    
    const answerText = getAriaAnswer(question);
    setMessages((current) => [
      ...current,
      { id: Date.now(), role: "user", text: question, time: getNowTime() },
      { id: Date.now() + 1, role: "aria", text: answerText, time: getNowTime() }
    ]);
    setInput("");
    setTimeout(() => speak(answerText), 120);
  };

  const startListening = () => {
    if (typeof window === "undefined") return;
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    
    if (!SpeechRecognition) {
      const msg = "Seu navegador não suporta o reconhecimento de voz.";
      setMessages((current) => [...current, { id: Date.now(), role: "aria", text: msg, time: getNowTime() }]);
      return;
    }
    
    if (recognitionRef.current) recognitionRef.current.stop();
    
    const recognition = new SpeechRecognition();
    recognition.lang = "pt-BR";
    recognition.onstart = () => setListening(true);
    recognition.onend = () => setListening(false);
    recognition.onerror = () => setListening(false);
    recognition.onresult = (event) => {
      const transcript = event.results?.[0]?.[0]?.transcript || "";
      setInput(transcript);
      if (transcript) setTimeout(() => sendMessage(transcript), 180);
    };
    
    recognitionRef.current = recognition;
    recognition.start();
  };

  const clearChat = () => {
    setMessages([{
      id: Date.now(),
      role: "aria",
      text: "Histórico limpo. Pode me perguntar novamente sobre receitas, medicamentos, status de manipulação ou orçamentos.",
      time: getNowTime(),
    }]);
  };

  const handleAttachment = (type, files) => {
    const file = files?.[0];
    if (!file) return;

    const isImage = type === "imagem";
    const userText = isImage ? `Foto enviada: ${file.name}` : `Documento digitalizado: ${file.name}`;
    const answerText = isImage 
      ? "Recebi a foto do seu documento de saúde. Nossa equipe médica e farmacêutica vai realizar a leitura dos compostos para gerar suas opções de orçamento!"
      : "Recebi seu arquivo digital. Vou extrair os dados da receita e anexar ao seu perfil para iniciar as cotações nas farmácias parceiras.";
    
    setMessages((current) => [
      ...current,
      { id: Date.now(), role: "user", text: userText, time: getNowTime() },
      { id: Date.now() + 1, role: "aria", text: answerText, time: getNowTime() },
    ]);
    setTimeout(() => speak(answerText), 120);
  };

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-slate-50 via-white to-purple-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 min-h-screen transition-colors duration-500 p-4 sm:p-6 lg:p-8 flex flex-col justify-center">
      <div className="absolute top-20 left-10 w-72 h-72 bg-purple-400/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-72 h-72 bg-emerald-400/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto w-full flex flex-col lg:flex-row items-center gap-8 lg:gap-12">
        
        {/* COLUNA ESQUERDA: IA FLUTUANDO */}
        <div className="w-full lg:w-[45%] flex flex-col justify-center items-center relative py-6 lg:py-0">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative w-full max-w-sm sm:max-w-md lg:max-w-lg flex items-center justify-center min-h-[360px] sm:min-h-[440px]"
          >
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 lg:w-80 lg:h-80 rounded-full bg-gradient-to-r from-purple-500/20 to-emerald-400/20 blur-3xl z-0" />

            <motion.img
              src={ariaAvatar}
              alt="Mascote Ária"
              className="relative z-10 w-3/4 h-auto object-contain max-h-[380px]"
              animate={{
                y: listening ? [0, -8, 0] : [0, -18, 0],
                scale: speaking ? [1, 1.03, 1] : 1
              }}
              transition={{
                duration: listening ? 1.5 : 5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />

            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
              className="absolute top-6 left-2 sm:-left-4 z-20 backdrop-blur-xl bg-white/80 dark:bg-slate-900/85 border border-slate-200/60 dark:border-slate-800 rounded-2xl px-4 py-3 shadow-xl flex items-center gap-2.5"
            >
              <div className="w-8 h-8 rounded-full bg-purple-50 dark:bg-purple-950/50 flex items-center justify-center text-purple-600 dark:text-purple-400">
                <FileText size={16} />
              </div>
              <div>
                <p className="text-[10px] uppercase font-bold tracking-wider text-slate-400">Análise de Receitas</p>
                <p className="text-xs font-semibold text-slate-800 dark:text-slate-200">Leitura Inteligente por Foto/PDF</p>
              </div>
            </motion.div>

            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut" }}
              className="absolute top-1/3 -right-2 sm:-right-6 z-20 backdrop-blur-xl bg-white/80 dark:bg-slate-900/85 border border-slate-200/60 dark:border-slate-800 rounded-2xl px-4 py-3 shadow-xl flex items-center gap-2.5"
            >
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${listening ? "bg-red-500 text-white animate-pulse" : "bg-emerald-50 dark:bg-emerald-950/50 text-emerald-600 dark:text-emerald-400"}`}>
                {listening ? <Mic size={15} /> : <ShieldCheck size={15} />}
              </div>
              <div>
                <p className="text-[10px] uppercase font-bold tracking-wider text-slate-400">Interação</p>
                <p className="text-xs font-semibold text-slate-800 dark:text-slate-200">
                  {listening ? "Ouvindo comandos..." : "Voz Ativada por Clique"}
                </p>
              </div>
            </motion.div>

            <motion.div
              animate={{ y: [0, -6, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              className="absolute bottom-6 left-6 z-20 backdrop-blur-xl bg-white/80 dark:bg-slate-900/85 border border-slate-200/60 dark:border-slate-800 rounded-2xl px-4 py-3 shadow-xl flex items-center gap-2.5"
            >
              <div className="w-8 h-8 rounded-full bg-amber-50 dark:bg-amber-950/50 flex items-center justify-center text-amber-500">
                <BadgeDollarSign size={16} />
              </div>
              <div>
                <p className="text-[10px] uppercase font-bold tracking-wider text-slate-400">Cotação integrada</p>
                <p className="text-xs font-semibold text-slate-800 dark:text-slate-200">Menor preço mapeado</p>
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* COLUNA DIREITA: PAINEL DO CHAT */}
        <div className="w-full lg:w-[55%] flex flex-col justify-center">
          <div className="flex border-b border-slate-100 dark:border-slate-800/60 gap-6 mb-4" role="tablist">
            <button
              type="button"
              className={`pb-2.5 text-xs font-bold uppercase tracking-wider border-b-2 transition-all ${tab === "chat" ? "border-purple-600 text-purple-600 dark:border-purple-400 dark:text-purple-400" : "border-transparent text-slate-400 hover:text-slate-600"}`}
              onClick={() => setTab("chat")}
              role="tab"
              aria-selected={tab === "chat"}
            >
              Assistente Virtual
            </button>
            <button
              type="button"
              className={`pb-2.5 text-xs font-bold uppercase tracking-wider border-b-2 transition-all ${tab === "about" ? "border-purple-600 text-purple-600 dark:border-purple-400 dark:text-purple-400" : "border-transparent text-slate-400 hover:text-slate-600"}`}
              onClick={() => setTab("about")}
              role="tab"
              aria-selected={tab === "about"}
            >
              Recursos Avançados
            </button>
          </div>

          <AnimatePresence mode="wait">
            {tab === "chat" ? (
              <motion.div
                key="chat-tab"
                initial={{ opacity: 0, x: 15 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -15 }}
                className="bg-white/80 dark:bg-slate-950/40 backdrop-blur-md border border-slate-200/50 dark:border-slate-900 rounded-3xl shadow-2xl flex flex-col h-[520px] overflow-hidden"
              >
                {/* Header */}
                <div className="px-6 py-4 border-b border-slate-100 dark:border-slate-900/60 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-purple-500 animate-pulse"></span>
                    <h3 className="text-sm font-bold text-slate-800 dark:text-white">Ária Inteligência de Saúde</h3>
                  </div>

                  <div className="flex items-center gap-1.5 bg-slate-100/60 dark:bg-slate-900 p-1 rounded-xl">
                    <button
                      type="button"
                      title={audioEnabled ? "Desativar voz" : "Ativar voz"}
                      className={`p-1.5 rounded-lg text-slate-400 hover:text-purple-600 transition-all ${audioEnabled ? "text-purple-600 bg-white dark:bg-slate-800 shadow-xs" : ""}`}
                      onClick={() => setAudioEnabled((v) => !v)}
                    >
                      {audioEnabled ? <Volume2 size={15} /> : <VolumeX size={15} />}
                    </button>
                    <button type="button" className="p-1.5 rounded-lg text-slate-400 hover:text-red-500 transition-colors" onClick={clearChat}>
                      <Trash2 size={14} />
                    </button>
                  </div>
                </div>

                {/* Mensagens */}
                <div className="flex-1 px-6 py-4 overflow-y-auto space-y-4 scrollbar-none">
                  {messages.map((message) => (
                    <div 
                      key={message.id}
                      className={`flex flex-col max-w-[85%] ${message.role === "aria" ? "self-start items-start" : "self-end items-end ml-auto"}`}
                    >
                      <div className={`px-4 py-2.5 rounded-2xl text-sm leading-relaxed shadow-xs ${
                        message.role === "aria" 
                          ? "bg-slate-100/80 dark:bg-slate-900 text-slate-800 dark:text-slate-200 rounded-tl-xs" 
                          : "bg-purple-600 text-white rounded-tr-xs"
                      }`}>
                        <p className="whitespace-pre-line text-xs sm:text-sm">{message.text}</p>
                      </div>
                      <time className="text-[10px] text-slate-400 mt-1 px-1">{message.time}</time>
                    </div>
                  ))}
                  <div ref={messagesEndRef} />
                </div>

                {/* Footer Inputs */}
                <div className="p-4 bg-white/40 dark:bg-slate-950/40 border-t border-slate-100 dark:border-slate-900/60">
                  <div className="flex gap-2 overflow-x-auto pb-3 mb-2 scrollbar-none">
                    {ariaQuickQuestions.map((question) => (
                      <button 
                        type="button" 
                        key={question} 
                        onClick={() => sendMessage(question)}
                        className="px-3 py-1.5 bg-white dark:bg-slate-900 hover:bg-purple-50 hover:text-purple-600 dark:hover:bg-purple-950/30 dark:hover:text-purple-400 border border-slate-200/60 dark:border-slate-800 text-slate-600 dark:text-slate-400 rounded-full text-xs font-medium whitespace-nowrap transition-all shadow-2xs"
                      >
                        {question}
                      </button>
                    ))}
                  </div>

                  <form className="flex items-center gap-1.5 bg-slate-50 dark:bg-slate-900 p-1.5 rounded-2xl border border-slate-200/40 dark:border-slate-800 focus-within:border-purple-500/40 transition-all" onSubmit={(e) => { e.preventDefault(); sendMessage(); }}>
                    <div className="flex items-center">
                      <button
                        type="button"
                        title="Fale com a Ária"
                        className={`p-2 rounded-xl transition-all ${listening ? "bg-red-500 text-white animate-pulse" : "text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-200/50 dark:hover:bg-slate-800"}`}
                        onClick={startListening}
                      >
                        {listening ? <MicOff size={15} /> : <Mic size={15} />}
                      </button>
                      <button
                        type="button"
                        className="p-2 rounded-xl text-slate-400 hover:text-purple-600 dark:hover:text-purple-400 hover:bg-gray-200/50 dark:hover:bg-slate-800 transition-colors"
                        onClick={() => fileInputRef.current?.click()}
                      >
                        <Paperclip size={15} />
                      </button>
                      <button
                        type="button"
                        className="p-2 rounded-xl text-slate-400 hover:text-purple-600 dark:hover:text-purple-400 hover:bg-gray-200/50 dark:hover:bg-slate-800 transition-colors"
                        onClick={() => imageInputRef.current?.click()}
                      >
                        <ImagePlus size={15} />
                      </button>
                    </div>

                    <input
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      placeholder="Converse com a Ária..."
                      className="flex-1 bg-transparent border-none outline-none text-xs sm:text-sm text-slate-900 dark:text-white px-2 placeholder-slate-400"
                    />

                    <button type="submit" className="p-2 rounded-xl bg-purple-600 dark:bg-purple-500 text-white hover:opacity-95 shadow-xs shrink-0 transition-opacity">
                      <Send size={15} />
                    </button>

                    <input ref={fileInputRef} type="file" className="hidden" onChange={(e) => handleAttachment("arquivo", e.target.files)} />
                    <input ref={imageInputRef} type="file" accept="image/*" className="hidden" onChange={(e) => handleAttachment("imagem", e.target.files)} />
                  </form>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="about-tab"
                initial={{ opacity: 0, x: -15 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 15 }}
                className="grid grid-cols-1 sm:grid-cols-2 gap-4"
              >
                {aboutAriaCards.map((card) => {
                  const Icon = card.icon;
                  return (
                    <article key={card.title} className="p-5 bg-white/80 dark:bg-slate-900/60 backdrop-blur-md border border-slate-200/50 dark:border-slate-800 rounded-3xl flex flex-col gap-3 shadow-xs">
                      <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${card.color}`}>
                        <Icon size={16} />
                      </div>
                      <div className="space-y-1">
                        <h4 className="font-bold text-sm text-slate-900 dark:text-white">{card.title}</h4>
                        <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">{card.text}</p>
                      </div>
                    </article>
                  );
                })}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

      </div>
    </section>
  );
}