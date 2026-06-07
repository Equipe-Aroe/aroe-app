import { useState, useRef, useEffect } from "react";
import {
  Search,
  FileText,
  HelpCircle,
  MessageSquare,
  Truck,
  DollarSign,
  ShieldAlert,
  ArrowRight,
  ChevronDown,
  Send,
  ArrowLeft,
  Bot,
  Sparkles,
  User,
} from "lucide-react";
import { useThemeContext } from "../../../contexts/ThemeContext";
import imgAria from "/pill-mascot3.png";

export default function DashboardAjuda() {
  const { highContrast } = useThemeContext();
  const [searchQuery, setSearchQuery] = useState("");
  const [openFaq, setOpenFaq] = useState(null);

  // Estados do Chatbot integrado
  const [showChat, setShowChat] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: "bot",
      text: "Olá! Sou o assistente virtual do Aroê. 🌿",
      time: "Agora",
    },
    {
      id: 2,
      sender: "bot",
      text: "Posso te ajudar a encontrar uma resposta rápida. Qual é o assunto do seu contato?",
      time: "Agora",
    },
  ]);
  const chatEndRef = useRef(null);

  const quickOptions = [
    "Problema com Orçamento",
    "Prazo de Entrega",
    "Como enviar receita",
    "Falar com Humano",
  ];

  // Rolagem automática do chat
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, showChat]);

  // Lógica de envio do Chatbot
  const handleSendMessage = (text) => {
    if (!text.trim()) return;

    const userMsg = { id: Date.now(), sender: "user", text, time: "Agora" };
    setMessages((prev) => [...prev, userMsg]);
    setInputValue("");

    setTimeout(() => {
      let botReplyText =
        "Entendi! Vou processar essa informação para você. Um momento.";

      if (text.includes("Orçamento")) {
        botReplyText =
          'Para problemas com orçamentos, você pode revisar a aba "Pedidos". Se uma farmácia ainda não respondeu, vale lembrar que o prazo médio delas é de até 15 minutos!';
      } else if (text.includes("Entrega") || text.includes("Prazo")) {
        botReplyText =
          "Os laboratórios levam de 24h a 48h para manipular sua fórmula. Você consegue ver o rastreamento detalhado direto no card do pedido na Home.";
      } else if (text.includes("Humano")) {
        botReplyText =
          "Sem problemas! Estou transferindo você para um de nossos atendentes especialistas em manipulação. Tempo de espera estimado: 3 minutos. ⏳";
      }

      setMessages((prev) => [
        ...prev,
        {
          id: Date.now() + 1,
          sender: "bot",
          text: botReplyText,
          time: "Agora",
        },
      ]);
    }, 800);
  };

  const faqs = [
    {
      question: "Como funciona o sistema de cotação entre as farmácias?",
      answer:
        "Assim que você envia sua receita, nossa plataforma a direciona para farmácias de manipulação parceiras e homologadas. Em até alguns minutos, elas respondem com os respectivos orçamentos, e você pode escolher a que melhor te atende por preço, prazo ou avaliação.",
    },
    {
      question: "Os medicamentos têm garantia de controle de qualidade?",
      answer:
        "Sim. Todas as farmácias integradas ao Aroê são rigorosamente validadas, possuem licença da ANVISA e passam por auditorias periódicas para garantir a procedência das matérias-primas e a precisão das fórmulas.",
    },
    {
      question: "Qual é o prazo médio de produção e entrega?",
      answer:
        "O prazo de produção de um medicamento manipulado costuma variar entre 24h e 48h úteis. O prazo de entrega final dependerá da modalidade de frete escolhida (Expressa ou Padrão) no momento da finalização do pedido.",
    },
    {
      question: "Posso cancelar um pedido de fórmula manipulada?",
      answer:
        "Por serem produtos personalizados e feitos sob medida para a sua receita, o cancelamento só pode ser realizado antes do início da produção pela farmácia escolhida. Verifique o status na sua tela de pedidos.",
    },
  ];

  const categories = [
    {
      icon: DollarSign,
      title: "Cotações e Preços",
      desc: "Dúvidas sobre pagamentos e valores",
      color: "text-emerald-500 bg-emerald-50 dark:bg-emerald-950/30",
    },
    {
      icon: FileText,
      title: "Envio de Receitas",
      desc: "Formatos aceitos, rasuras e validação",
      color: "text-purple-500 bg-purple-50 dark:bg-purple-950/30",
    },
    {
      icon: Truck,
      title: "Entregas e Prazos",
      desc: "Rastreamento e prazos de laboratório",
      color: "text-blue-500 bg-blue-50 dark:bg-blue-950/30",
    },
    {
      icon: ShieldAlert,
      title: "Segurança e Dados",
      desc: "Privacidade da receita e termos",
      color: "text-amber-500 bg-amber-50 dark:bg-amber-950/30",
    },
  ];

  const styles = {
    card: highContrast
      ? "bg-white text-black border-4 border-black dark:bg-black dark:text-white dark:border-white shadow-none"
      : "bg-white/80 dark:bg-slate-900/50 backdrop-blur-md border border-slate-100 dark:border-slate-800/80 shadow-sm rounded-3xl p-6 transition-all",
    textPrimary: highContrast
      ? "text-black dark:text-white font-black"
      : "text-slate-900 dark:text-slate-100",
    textSecondary: highContrast
      ? "text-black/90 dark:text-white/80"
      : "text-slate-500 dark:text-slate-400",
    input: highContrast
      ? "border-2 border-black dark:border-white bg-white dark:bg-black text-black dark:text-white"
      : "bg-slate-50 dark:bg-slate-900/60 text-slate-900 dark:text-slate-100 border border-slate-100 dark:border-slate-800 focus:ring-2 focus:ring-purple-500/20",
    btnPrimary: highContrast
      ? "bg-black text-white dark:bg-white dark:text-black border-2 border-black font-black"
      : "bg-slate-900 hover:bg-slate-800 dark:bg-white dark:text-slate-950 dark:hover:bg-slate-100 text-white transition-all",
  };

  const filteredFaqs = faqs.filter(
    (faq) =>
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  return (
    <div className="max-w-5xl mx-auto space-y-10 transition-colors duration-500 pb-12">
      {/* Header de Ajuda com Busca integrada */}
      <div
        className={
          highContrast
            ? "border-4 border-black p-8"
            : "bg-gradient-to-br from-purple-900 to-indigo-950 rounded-3xl p-10 text-white shadow-xl relative overflow-hidden"
        }
      >
        {!highContrast && (
          <div className="absolute -right-10 -bottom-10 w-40 h-40 bg-purple-500/10 rounded-full blur-3xl" />
        )}

        <div className="max-w-xl space-y-4 relative z-10">
          <span
            className={`px-3 py-1 text-xs font-bold uppercase tracking-widest rounded-full ${highContrast ? "bg-black text-white" : "bg-purple-500/20 text-purple-300"}`}
          >
            Suporte Aroê
          </span>
          <h2 className="text-3xl font-extrabold tracking-tight">
            Como podemos ajudar você hoje?
          </h2>
          <p
            className={
              highContrast ? "text-black" : "text-purple-200/80 text-sm"
            }
          >
            Tire dúvidas sobre suas fórmulas manipuladas, acompanhe entregas ou
            fale com nossa equipe especializada.
          </p>

          <div className="relative mt-6">
            <Search
              size={18}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
            />
            <input
              type="text"
              placeholder="Digite sua dúvida (ex: prazo, receita, pagamento)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className={`w-full pl-12 pr-4 py-3 rounded-2xl text-sm focus:outline-none transition-all ${styles.input} ${!highContrast && "text-slate-950 bg-white placeholder-slate-400"}`}
            />
          </div>
        </div>
      </div>

      {/* Categorias Principais em Grid Dinâmico */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {categories.map((cat, idx) => (
          <div
            key={idx}
            className={`${styles.card} hover:translate-y-[-2px] cursor-pointer group`}
          >
            <div
              className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-4 transition-colors ${highContrast ? "border-2 border-black dark:border-white" : cat.color}`}
            >
              <cat.icon
                size={22}
                className={highContrast ? "text-current" : ""}
              />
            </div>
            <h4
              className={`font-bold text-base mb-1 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors ${styles.textPrimary}`}
            >
              {cat.title}
            </h4>
            <p className={`text-xs leading-relaxed ${styles.textSecondary}`}>
              {cat.desc}
            </p>
          </div>
        ))}
      </div>

      {/* Seção Dupla: FAQ + ChatBot Colapsável */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Accordion de FAQs (Col 1 e 2) */}
        <div className="lg:col-span-2 space-y-4">
          <h3
            className={`text-lg font-bold px-1 mb-2 flex items-center gap-2 ${styles.textPrimary}`}
          >
            <HelpCircle size={20} className="text-purple-500" /> Perguntas
            frequentes
          </h3>

          {filteredFaqs.length === 0 ? (
            <p className={`text-sm p-4 ${styles.textSecondary}`}>
              Nenhum resultado encontrado para sua busca.
            </p>
          ) : (
            filteredFaqs.map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div
                  key={idx}
                  className={`${styles.card} !p-0 overflow-hidden`}
                >
                  <button
                    onClick={() => setOpenFaq(isOpen ? null : idx)}
                    className="w-full flex items-center justify-between p-5 text-left font-semibold text-sm transition-colors hover:bg-slate-50/50 dark:hover:bg-slate-800/30"
                  >
                    <span className={styles.textPrimary}>{faq.question}</span>
                    <ChevronDown
                      size={18}
                      className={`text-slate-400 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
                    />
                  </button>

                  <div
                    className={`transition-all duration-300 ease-in-out overflow-hidden ${isOpen ? "max-h-40 border-t border-slate-100 dark:border-slate-800" : "max-h-0"}`}
                  >
                    <p
                      className={`p-5 text-xs sm:text-sm leading-relaxed bg-slate-50/40 dark:bg-slate-900/20 ${styles.textSecondary}`}
                    >
                      {faq.answer}
                    </p>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Coluna 3: Chatbot integrado controlado por estado */}
        <div className="space-y-4">
          <h3 className={`text-lg font-bold px-1 mb-2 ${styles.textPrimary}`}>
            {showChat ? "Assistente Virtual" : "Não encontrou a resposta?"}
          </h3>

          {!showChat ? (
            /* ESTADO A: Card Chamada para o Chat */
            <div className={`${styles.card} border-dashed`}>
              <div className="w-12 h-12 rounded-2xl bg-purple-50 dark:bg-purple-950/50 flex items-center justify-center text-purple-600 dark:text-purple-400 mb-4">
                <MessageSquare size={22} />
              </div>
              <h4 className={`font-bold text-lg mb-1 ${styles.textPrimary}`}>
                Fale conosco
              </h4>
              <p
                className={`text-xs mb-6 leading-relaxed ${styles.textSecondary}`}
              >
                Tire dúvidas sobre fórmulas, prazos ou converse com o nosso
                suporte humano.
              </p>

              <button
                onClick={() => setShowChat(true)}
                className={`w-full py-3 rounded-xl font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 ${styles.btnPrimary}`}
              >
                Iniciar Assistente Virtual
              </button>
            </div>
          ) : (
            /* ESTADO B: Janela de Chat ativa */
            <div
              className={`${styles.card} !p-0 flex flex-col h-[480px] overflow-hidden transition-all`}
            >
              {/* Header Interno do Chat */}
              <div className="p-4 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between bg-slate-50/50 dark:bg-slate-900/50">
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setShowChat(false)}
                    className="p-1.5 hover:bg-slate-200/60 dark:hover:bg-slate-800 rounded-lg text-slate-500"
                  >
                    <ArrowLeft size={16} />
                  </button>

                  {/* FOTO DA ARIA NO HEADER */}
                  <div className="relative">
                    <img
                      src={imgAria}
                      alt="Aria"
                      className="w-9 h-9 rounded-xl object-cover border border-purple-200 dark:border-purple-900/50"
                    />
                    <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-500 border-2 border-white dark:border-slate-900 rounded-full" />
                  </div>

                  <div>
                    <div className="flex items-center gap-1.5">
                      <h5 className="text-sm font-bold">Aria — Suporte</h5>
                      {!highContrast && (
                        <Sparkles size={12} className="text-purple-500" />
                      )}
                    </div>
                    <p className="text-[10px] text-emerald-600 dark:text-emerald-400 font-medium">
                      Online agora
                    </p>
                  </div>
                </div>
              </div>

              {/* Corpo de Mensagens */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50/30 dark:bg-slate-950/10">
                {messages.map((msg) => {
                  const isBot = msg.sender === "bot";
                  return (
                    <div
                      key={msg.id}
                      className={`flex gap-2.5 max-w-[85%] ${isBot ? "mr-auto" : "ml-auto flex-row-reverse"}`}
                    >
                      {/* AVATAR INTERNO DA MENSAGEM */}
                      <div className="w-6 h-6 rounded-md overflow-hidden shrink-0">
                        {isBot ? (
                          <img
                            src={imgAria}
                            alt="Aria"
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full bg-slate-200 dark:bg-slate-800 flex items-center justify-center text-[10px]">
                            <User size={12} />
                          </div>
                        )}
                      </div>

                      <div className="space-y-1">
                        <div
                          className={`p-3 text-xs rounded-2xl ${
                            isBot
                              ? highContrast
                                ? "bg-white text-black border border-black"
                                : "bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100 shadow-sm"
                              : highContrast
                                ? "bg-black text-white"
                                : "bg-purple-600 text-white rounded-tr-none"
                          }`}
                        >
                          <p className="leading-relaxed whitespace-pre-line">
                            {msg.text}
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                })}
                <div ref={chatEndRef} />
              </div>

              {/* Pílulas de Opções Rápidas + Input */}
              <div className="p-3 border-t border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-3">
                <div className="flex gap-1.5 overflow-x-auto pb-1 no-scrollbar scrollbar-none">
                  {quickOptions.map((opt, i) => (
                    <button
                      key={i}
                      onClick={() => handleSendMessage(opt)}
                      className={`text-[11px] font-medium px-3 py-1.5 rounded-full whitespace-nowrap transition-all shrink-0 ${
                        highContrast
                          ? "border border-black bg-white text-black dark:border-white dark:bg-black dark:text-white"
                          : "bg-slate-50 hover:bg-purple-50 dark:bg-slate-800 dark:hover:bg-purple-950/40 text-slate-600 dark:text-slate-300"
                      }`}
                    >
                      {opt}
                    </button>
                  ))}
                </div>

                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    handleSendMessage(inputValue);
                  }}
                  className="flex items-center gap-2"
                >
                  <input
                    type="text"
                    placeholder="Digite sua dúvida..."
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    className={`flex-1 px-3 py-2 text-xs rounded-xl focus:outline-none transition-all ${styles.input}`}
                  />
                  <button
                    type="submit"
                    className={`p-2 rounded-xl transition-all ${
                      highContrast
                        ? "bg-black text-white dark:bg-white dark:text-black"
                        : "bg-purple-600 text-white hover:bg-purple-700"
                    }`}
                  >
                    <ArrowRight size={14} />
                  </button>
                </form>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
