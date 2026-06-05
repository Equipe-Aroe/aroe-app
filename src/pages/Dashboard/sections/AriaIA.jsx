import { useState, useEffect, useRef } from "react";
import { 
  Info, Volume2, VolumeX, Trash2, Mic, MicOff, 
  Paperclip, ImagePlus, Send, Sparkles, Heart, 
  ShieldCheck, FileText, Pill, Clock, Activity, HelpCircle 
} from "lucide-react";

// Caminho da imagem da Ária (Certifique-se de salvar a imagem na sua pasta de assets)
import ariaAvatar from "/pill-mascot2.png"; 

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
    text: "A Ária é a assistente inteligente da Aroê. Ela traduz receitas complexas e ajuda você a gerenciar seus tratamentos e fórmulas manipuladas de forma simples.",
    icon: Sparkles,
  },
  {
    title: "Como ela funciona?",
    text: "Ela analisa suas receitas enviadas, organiza seus horários de medicamentos e busca as melhores cotações nas farmácias parceiras de forma automatizada.",
    icon: Sparkles,
  },
  {
    title: "Como ajuda a economizar?",
    text: "A Ária cruza orçamentos de laboratórios de manipulação confiáveis para encontrar o menor preço e os melhores descontos para a sua fórmula.",
    icon: Heart,
  },
  {
    title: "O que ela analisa?",
    text: "Composições de receitas médicas, prazos de entrega de pedidos, cronogramas de tratamentos contínuos e notificações de horários.",
    icon: FileText,
  },
  {
    title: "Benefícios para o usuário",
    text: "Mais clareza sobre suas dosagens, alertas inteligentes para não esquecer o remédio, histórico médico unificado e economia garantida em fórmulas.",
    icon: Pill,
  },
  {
    title: "Segurança e privacidade",
    text: "Seus dados de saúde e receitas receitas médicas são totalmente confidenciais e criptografados. Suas informações nunca são exibidas fora do seu painel seguro.",
    icon: ShieldCheck,
  },
  {
    title: "Tratamentos e Fórmulas",
    text: "A Ária acompanha o ciclo de uso do seu medicamento e avisa o momento ideal de solicitar uma nova manipulação antes que o seu pote acabe.",
    icon: Clock,
  },
  {
    title: "Exemplos de perguntas",
    text: "Pergunte sobre status de entrega, alertas de horários, envio de novas receitas manipuladas, valores ou dúvidas de uso da plataforma.",
    icon: Info,
  },
];

function getNowTime() {
  return new Intl.DateTimeFormat("pt-BR", { hour: "2-digit", minute: "2-digit" }).format(
    new Date(),
  );
}

function getAriaAnswer(question) {
  const text = question.toLowerCase();
  if (text.includes("receita") || text.includes("enviar") || text.includes("mandar")) {
    return "Para enviar uma nova receita, basta clicar no ícone de clipe ou câmera aqui embaixo no chat, ou usar o botão 'Enviar nova receita' na sua página inicial. Nossa equipe vai digitalizar e cotar em até 3 laboratórios parceiros.";
  }
  if (text.includes("status") || text.includes("pedido") || text.includes("onde está") || text.includes("entrega")) {
    return "Seu pedido atual de 'Vitaminas A-Z (Fórmula manipulada)' já foi recebido e está na etapa 'Em Produção'. A previsão de envio é próxima semana. Você receberá uma notificação assim que ele sair para entrega!";
  }
  if (text.includes("lembrete") || text.includes("horário") || text.includes("remedio") || text.includes("remédio")) {
    return "Para configurar seus alarmes, acesse a aba 'Lembretes' no menu lateral. Lá você pode definir o nome do medicamento, de quantas em quantas horas precisa tomar e a Ária te notificará no painel ou SMS.";
  }
  if (text.includes("dica") || text.includes("bem-estar") || text.includes("saude") || text.includes("saúde")) {
    return "Lembre-se de que a constância é o segredo do tratamento manipulado! Tente tomar seus suplementos e vitaminas sempre no mesmo horário, preferencialmente junto às principais refeições para melhorar a absorção.";
  }
  if (text.includes("orçamento") || text.includes("preço") || text.includes("valor") || text.includes("desconto")) {
    return "Atualmente você possui 3 orçamentos disponíveis para a sua receita. O melhor valor encontrado foi na 'Farmácia Bem Viver' por R$ 43,50, já aplicando o seu cupom de desconto de primeira compra.";
  }
  return "Entendi perfeitamente. Como sua assistente de saúde Aroê, posso te ajudar a acompanhar seus pedidos em andamento, tirar dúvidas sobre envio de receitas, criar lembretes de dosagem ou conferir orçamentos.";
}

export default function AriaIAContent() {
  const [tab, setTab] = useState("chat");
  const [input, setInput] = useState("");
  const [audioEnabled, setAudioEnabled] = useState(true);
  const [listening, setListening] = useState(false);
  const [speaking, setSpeaking] = useState(false);
  const recognitionRef = useRef(null);
  const fileInputRef = useRef(null);
  const imageInputRef = useRef(null);
  const messagesEndRef = useRef(null);
  
  const [messages, setMessages] = useState(() => {
    if (typeof window === "undefined") return [];
    const saved = localStorage.getItem("aroe_aria_chat");
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch { /* empty */ }
    }
    return [
      {
        id: 1,
        role: "aria",
        text: "Olá! Eu sou a Ária, sua assistente virtual da Aroê. Estou aqui para cuidar do seu bem-estar. Posso ajudar com suas receitas, status de pedidos, lembretes de medicamentos e orçamentos.",
        time: getNowTime(),
      },
    ];
  });

  // CORREÇÃO DO MUDO: Cancela o áudio imediatamente se o botão for desativado
  useEffect(() => {
    if (!audioEnabled && typeof window !== "undefined" && "speechSynthesis" in window) {
      globalThis.speechSynthesis.cancel();
      setSpeaking(false);
    }
  }, [audioEnabled]);

  useEffect(() => {
    if (typeof window !== "undefined")
      localStorage.setItem("aroe_aria_chat", JSON.stringify(messages));
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [messages]);

  const pickFemaleVoice = () => {
    if (typeof window === "undefined" || !("speechSynthesis" in window)) return undefined;
    const voices = window.speechSynthesis.getVoices();
    return (
      voices.find((voice) =>
        /maria|helena|heloisa|luciana|francisca|manuela|vitória|vitoria|catarina|joana|raquel|female|feminina|mulher/i.test(
          `${voice.name} ${voice.lang}`,
        )
      ) ||
      voices.find((voice) => voice.lang?.toLowerCase() === "pt-br" && !/male|masculina|homem/i.test(voice.name)) ||
      voices.find((voice) => voice.lang?.toLowerCase() === "pt-br")
    );
  };

  useEffect(() => {
    if (typeof window === "undefined" || !("speechSynthesis" in window)) return;
    window.speechSynthesis.getVoices();
    window.speechSynthesis.onvoiceschanged = () => window.speechSynthesis.getVoices();
    return () => {
      window.speechSynthesis.onvoiceschanged = null;
    };
  }, []);

  const speak = (text) => {
    if (!audioEnabled || typeof window === "undefined" || !("speechSynthesis" in window)) return;
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "pt-BR";
    const selectedVoice = pickFemaleVoice();
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
    
    const userMessage = {
      id: Date.now(),
      role: "user",
      text: question,
      time: getNowTime(),
    };
    
    const answerText = getAriaAnswer(question);
    const answer = {
      id: Date.now() + 1,
      role: "aria",
      text: answerText,
      time: getNowTime(),
    };
    
    setMessages((current) => [...current, userMessage, answer]);
    setInput("");
    setTimeout(() => speak(answerText), 120);
  };

  const startListening = () => {
    if (typeof window === "undefined") return;
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      const msg = "Seu navegador não suporta o reconhecimento de voz. Por favor, digite sua dúvida.";
      setMessages((current) => [...current, { id: Date.now(), role: "aria", text: msg, time: getNowTime() }]);
      speak(msg);
      return;
    }
    if (recognitionRef.current) recognitionRef.current.stop();
    const recognition = new SpeechRecognition();
    recognition.lang = "pt-BR";
    recognition.interimResults = false;
    recognition.continuous = false;
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
    const initial = {
      id: Date.now(),
      role: "aria",
      text: "Histórico limpo. Pode me perguntar novamente sobre receitas, medicamentos, status de manipulação ou orçamentos.",
      time: getNowTime(),
    };
    setMessages([initial]);
    speak(initial.text);
  };

  const handleAttachment = (type, files) => {
    const file = files?.[0];
    if (!file) return;
    const userText = type === "imagem" ? `Foto enviada: ${file.name}` : `Documento digitalizado: ${file.name}`;
    const answerText = type === "imagem" 
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
    <section className={`aria-ia-page aria-tab-${tab} p-1`} aria-label="Ária IA">
      <div className="flex border-b border-gray-100 dark:border-slate-800 gap-4 mb-4" role="tablist">
        <button
          type="button"
          className={`pb-2 text-sm font-bold flex items-center gap-2 border-b-2 transition-colors ${tab === "chat" ? "border-primary text-primary dark:border-secondary dark:text-secondary" : "border-transparent text-gray-400"}`}
          onClick={() => setTab("chat")}
          role="tab"
          aria-selected={tab === "chat"}
        >
          {/* Mudado de Bot para imagem miniatura da Ária */}
          <img src={ariaAvatar} alt="" className="w-5 h-5 object-contain" /> Chat Ária
        </button>
        <button
          type="button"
          className={`pb-2 text-sm font-bold flex items-center gap-2 border-b-2 transition-colors ${tab === "about" ? "border-primary text-primary dark:border-secondary dark:text-secondary" : "border-transparent text-gray-400"}`}
          onClick={() => setTab("about")}
          role="tab"
          aria-selected={tab === "about"}
        >
          <Info size={18} /> Conhecer a Ária
        </button>
      </div>

      {tab === "chat" ? (
        <div className="bg-white dark:bg-slate-900 border border-gray-100 dark:border-slate-800 rounded-2xl shadow-sm flex flex-col h-[calc(100vh-180px)]">
          {/* Header do Chat com imagem da Ária */}
          <div className="p-4 border-b border-gray-100 dark:border-slate-800 flex items-center justify-between bg-gray-50/50 dark:bg-slate-900/50 rounded-t-2xl">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-white dark:bg-slate-800 border border-gray-100 dark:border-slate-700 flex items-center justify-center overflow-hidden">
                <img src={ariaAvatar} alt="Ária Avatar" className="w-9 h-9 object-contain" />
              </div>
              <div>
                <h2 className="font-bold text-gray-900 dark:text-white text-base">Ária</h2>
                <p className="text-xs text-gray-500 dark:text-slate-400">
                  {listening ? "Ouvindo sua voz..." : speaking ? "Ária falando..." : "Sua Inteligência de Saúde"}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button
                type="button"
                className={`p-2 rounded-lg text-gray-500 hover:bg-gray-100 dark:hover:bg-slate-800 ${audioEnabled ? "text-primary dark:text-secondary" : ""}`}
                onClick={() => setAudioEnabled((v) => !v)}
                aria-label={audioEnabled ? "Mutar Ária" : "Ativar Voz da Ária"}
              >
                {audioEnabled ? <Volume2 size={18} /> : <VolumeX size={18} />}
              </button>
              <button 
                type="button" 
                className="p-2 rounded-lg text-gray-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-950/30" 
                onClick={clearChat} 
              >
                <Trash2 size={17} />
              </button>
            </div>
          </div>

          {/* Mensagens do Chat */}
          <div className="flex-1 p-4 overflow-y-auto space-y-4">
            {messages.map((message) => (
              <article 
                className={`flex flex-col max-w-[80%] ${message.role === "aria" ? "self-start items-start" : "self-end items-end ml-auto"}`} 
                key={message.id}
              >
                <span className="text-[11px] font-bold text-gray-400 mb-1">
                  {message.role === "aria" ? "Ária • Aroê" : "Você"}
                </span>
                <div className={`p-3.5 rounded-2xl text-sm ${
                  message.role === "aria" 
                    ? "bg-gray-100 dark:bg-slate-800 text-gray-800 dark:text-slate-100 rounded-tl-none" 
                    : "bg-primary dark:bg-secondary text-white rounded-tr-none"
                }`}>
                  <p className="leading-relaxed whitespace-pre-line">{message.text}</p>
                </div>
                <time className="text-[10px] text-gray-400 mt-1 block">{message.time}</time>
              </article>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="p-4 border-t border-gray-100 dark:border-slate-800 bg-gray-50/30 dark:bg-slate-900/30 rounded-b-2xl">
            <div className="flex gap-2 overflow-x-auto pb-3 mb-3 border-b border-gray-100 dark:border-slate-800/60 scrollbar-none">
              {ariaQuickQuestions.map((question, index) => {
                const icons = [FileText, Clock, Pill, Activity, HelpCircle];
                const Icon = icons[index] || HelpCircle;
                return (
                  <button 
                    type="button" 
                    key={question} 
                    onClick={() => sendMessage(question)}
                    className="flex items-center gap-1.5 px-3 py-1.5 bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-full text-xs font-medium text-gray-600 dark:text-slate-300 whitespace-nowrap hover:border-primary dark:hover:border-secondary transition-colors"
                  >
                    <Icon size={13} className="text-gray-400" /> {question}
                  </button>
                );
              })}
            </div>

            <form className="flex items-center gap-2" onSubmit={(e) => { e.preventDefault(); sendMessage(); }}>
              <button
                type="button"
                className={`p-2.5 rounded-xl transition-all ${listening ? "bg-red-500 text-white animate-pulse" : "bg-gray-100 dark:bg-slate-800 text-gray-600 dark:text-slate-300"}`}
                onClick={startListening}
              >
                {listening ? <MicOff size={18} /> : <Mic size={18} />}
              </button>
              <button
                type="button"
                className="p-2.5 rounded-xl bg-gray-100 dark:bg-slate-800 text-gray-600 dark:text-slate-300 hover:text-primary dark:hover:text-secondary"
                onClick={() => fileInputRef.current?.click()}
              >
                <Paperclip size={18} />
              </button>
              <button
                type="button"
                className="p-2.5 rounded-xl bg-gray-100 dark:bg-slate-800 text-gray-600 dark:text-slate-300 hover:text-primary dark:hover:text-secondary"
                onClick={() => imageInputRef.current?.click()}
              >
                <ImagePlus size={18} />
              </button>
              
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Pergunte sobre receitas, medicamentos ou cotações..."
                className="flex-1 bg-gray-100 dark:bg-slate-800 border-none rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary dark:focus:ring-secondary text-gray-900 dark:text-white"
              />
              
              <button type="submit" className="p-2.5 rounded-xl bg-primary dark:bg-secondary text-white hover:opacity-90">
                <Send size={18} />
              </button>

              <input ref={fileInputRef} type="file" className="hidden" onChange={(e) => handleAttachment("arquivo", e.target.files)} />
              <input ref={imageInputRef} type="file" accept="image/*" className="hidden" onChange={(e) => handleAttachment("imagem", e.target.files)} />
            </form>
          </div>
        </div>
      ) : (
        /* Aba "Sobre a Ária" com a imagem em Destaque */
        <div className="space-y-8 max-w-4xl mx-auto py-4">
          <div className="text-center space-y-3">
            <div className="w-24 h-24 flex items-center justify-center mx-auto drop-shadow-md">
              <img src={ariaAvatar} alt="Ária 3D" className="w-full h-full object-contain" />
            </div>
            <span className="text-xs font-bold uppercase tracking-widest text-primary dark:text-secondary">Conheça a Ária</span>
            <h2 className="text-2xl font-black text-gray-900 dark:text-white">Seus tratamentos organizados de forma inteligente.</h2>
            <p className="text-sm text-gray-600 dark:text-slate-400 max-w-xl mx-auto">
              A Ária analisa receitas médicas complexas de fórmulas manipuladas e as transforma em orientações simples, cronogramas de dosagem e cotações fáceis.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {aboutAriaCards.map((card) => {
              const Icon = card.icon;
              return (
                <article key={card.title} className="p-4 bg-white dark:bg-slate-900 border border-gray-100 dark:border-slate-800 rounded-2xl flex gap-4">
                  <div className="w-10 h-10 rounded-xl bg-gray-50 dark:bg-slate-800 flex items-center justify-center shrink-0 text-primary dark:text-secondary">
                    <Icon size={20} />
                  </div>
                  <div className="space-y-1">
                    <h4 className="font-bold text-sm text-gray-900 dark:text-white">{card.title}</h4>
                    <p className="text-xs text-gray-500 dark:text-slate-400 leading-relaxed">{card.text}</p>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      )}
    </section>
  );
}