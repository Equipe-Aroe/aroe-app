import { useState } from "react";
import {
  Volume2,
  X,
  Plus,
  Minus,
  Contrast,
  RotateCcw,
  VolumeX,
  Eye,
} from "lucide-react";
import { useThemeContext } from "../../contexts/ThemeContext";

export default function AccessibilityToolbar() {
  const [isOpen, setIsOpen] = useState(false);
  const {
    highContrast,
    toggleHighContrast,
    fontSize,
    increaseFontSize,
    decreaseFontSize,
    colorFilter,      // Resgatado corretamente do hook
    setColorFilter,   // Resgatado corretamente do hook
    resetAccessibility,
  } = useThemeContext();

  const [voiceEnabled, setVoiceEnabled] = useState(false);

  const speakText = (text) => {
    if (!globalThis.speechSynthesis) {
      alert("Leitor de voz não suportado neste navegador");
      return;
    }

    globalThis.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "pt-BR";
    utterance.rate = 1;
    utterance.pitch = 1;
    utterance.volume = 1;

    globalThis.speechSynthesis.speak(utterance);
  };

  const stopSpeech = () => {
    globalThis.speechSynthesis.cancel();
  };

  const handleSpeakPage = () => {
    if (voiceEnabled) {
      stopSpeech();
      setVoiceEnabled(false);
    } else {
      const pageText = document.body.innerText;
      speakText(pageText);
      setVoiceEnabled(true);
    }
  };

  // Lista dos filtros disponíveis para mapear os botões de forma limpa
  const daltonismFilters = [
    { id: "normal", label: "Padrão" },
    { id: "protanopia", label: "Protanopia" },
    { id: "deuteranopia", label: "Deuteranopia" },
    { id: "tritanopia", label: "Tritanopia" },
  ];

  return (
    <div className="relative">
      {/* Botão de Acessibilidade com cores dinâmicas para o modo claro/escuro */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Abre menu de acessibilidade"
        aria-expanded={isOpen}
        className="
          p-2
          rounded-xl
          text-slate-400 
          hover:text-slate-600 
          dark:text-slate-400
          dark:hover:text-slate-200 
          hover:bg-slate-50 
          dark:hover:bg-slate-900 
          transition-all
          focus:outline-none
          focus:ring-2
          focus:ring-purple-500/20
          relative
        "
        title="Acessibilidade"
      >
        <Eye size={20} />
      </button>

      {/* Menu de Acessibilidade */}
      {isOpen && (
        <div
          className="
            absolute
            top-full
            right-0
            mt-2
            bg-white
            dark:bg-slate-900
            rounded-2xl
            shadow-xl
            border
            border-slate-100
            dark:border-slate-800/80
            p-4
            w-64
            z-50
          "
        >
          {/* Header */}
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-sm font-bold text-slate-800 dark:text-slate-200">
              Acessibilidade
            </h3>
            <button
              onClick={() => setIsOpen(false)}
              aria-label="Fechar menu"
              className="text-slate-400 hover:text-slate-600 dark:text-slate-500 dark:hover:text-slate-300"
            >
              <X size={18} />
            </button>
          </div>

          <div className="space-y-4">
            {/* Alto Contraste */}
            <div className="flex items-center justify-between">
              <label
                htmlFor="contrast-toggle"
                className="text-xs font-medium text-slate-600 dark:text-slate-400 flex items-center gap-2"
              >
                <Contrast size={16} />
                Alto Contraste
              </label>
              <button
                id="contrast-toggle"
                onClick={toggleHighContrast}
                className={`
                  relative
                  inline-flex
                  w-10
                  h-6
                  rounded-full
                  transition-colors
                  focus:outline-none
                  focus:ring-2
                  focus:ring-purple-500/20
                  ${
                    highContrast
                      ? "bg-purple-600"
                      : "bg-slate-200 dark:bg-slate-700"
                  }
                `}
                aria-pressed={highContrast}
              >
                <span
                  className={`
                    inline-block
                    w-5
                    h-5
                    transform
                    rounded-full
                    bg-white
                    transition-transform
                    ${highContrast ? "translate-x-4.5" : "translate-x-0.5"}
                  `}
                />
              </button>
            </div>

            {/* Ajuste de Fonte */}
            <div>
              <label className="text-xs font-medium text-slate-600 dark:text-slate-400 block mb-2">
                Tamanho da Fonte: {fontSize}px
              </label>
              <div className="flex items-center gap-2">
                <button
                  onClick={decreaseFontSize}
                  disabled={fontSize <= 12}
                  aria-label="Diminuir tamanho da fonte"
                  className="
                    p-1.5
                    rounded-xl
                    bg-slate-100
                    dark:bg-slate-800
                    text-slate-600
                    dark:text-slate-400
                    hover:bg-slate-200
                    dark:hover:bg-slate-700
                    disabled:opacity-50
                    disabled:cursor-not-allowed
                    transition-all
                    focus:outline-none
                  "
                >
                  <Minus size={16} />
                </button>

                <div className="flex-1 bg-slate-100 dark:bg-slate-800 h-2 rounded">
                  <div
                    className="bg-purple-600 h-2 rounded transition-all"
                    style={{
                      width: `${((fontSize - 12) / 16) * 100}%`,
                    }}
                  />
                </div>

                <button
                  onClick={increaseFontSize}
                  disabled={fontSize >= 28}
                  aria-label="Aumentar tamanho da fonte"
                  className="
                    p-1.5
                    rounded-xl
                    bg-slate-100
                    dark:bg-slate-800
                    text-slate-600
                    dark:text-slate-400
                    hover:bg-slate-200
                    dark:hover:bg-slate-700
                    disabled:opacity-50
                    disabled:cursor-not-allowed
                    transition-all
                    focus:outline-none
                  "
                >
                  <Plus size={16} />
                </button>
              </div>
            </div>

            {/* Leitor de Voz */}
            <div className="flex items-center justify-between">
              <label
                htmlFor="voice-toggle"
                className="text-xs font-medium text-slate-600 dark:text-slate-400 flex items-center gap-2"
              >
                {voiceEnabled ? <VolumeX size={16} /> : <Volume2 size={16} />}
                Leitor de Voz
              </label>
              <button
                id="voice-toggle"
                onClick={handleSpeakPage}
                className={`
                  relative
                  inline-flex
                  w-10
                  h-6
                  rounded-full
                  transition-colors
                  focus:outline-none
                  focus:ring-2
                  focus:ring-purple-500/20
                  ${
                    voiceEnabled
                      ? "bg-purple-600"
                      : "bg-slate-200 dark:bg-slate-700"
                  }
                `}
                aria-pressed={voiceEnabled}
              >
                <span
                  className={`
                    inline-block
                    w-5
                    h-5
                    transform
                    rounded-full
                    bg-white
                    transition-transform
                    ${voiceEnabled ? "translate-x-4.5" : "translate-x-0.5"}
                  `}
                />
              </button>
            </div>

            {/* Seção de Filtros de Daltonismo */}
            <div className="border-t border-slate-100 dark:border-slate-800/80 pt-3">
              <span className="text-xs font-medium text-slate-600 dark:text-slate-400 block mb-2">
                Filtros para Daltonismo
              </span>
              <div className="grid grid-cols-2 gap-1.5">
                {daltonismFilters.map((filter) => (
                  <button
                    key={filter.id}
                    onClick={() => setColorFilter(filter.id)}
                    className={`
                      text-[11px]
                      font-medium
                      py-1.5
                      px-2
                      rounded-lg
                      transition-all
                      focus:outline-none
                      border
                      ${
                        colorFilter === filter.id
                          ? "bg-purple-50 dark:bg-purple-950/40 text-purple-600 dark:text-purple-400 border-purple-200 dark:border-purple-900/50 shadow-sm"
                          : "bg-slate-50 dark:bg-slate-800/40 text-slate-600 dark:text-slate-400 border-transparent hover:bg-slate-100 dark:hover:bg-slate-800"
                      }
                    `}
                  >
                    {filter.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Botão Resetar */}
            <button
              onClick={() => {
                if (typeof resetAccessibility === "function") {
                  resetAccessibility();
                }
                setIsOpen(false);
              }}
              className="
                w-full
                mt-2
                py-2
                px-3
                rounded-xl
                bg-slate-100
                dark:bg-slate-800
                hover:bg-slate-200
                dark:hover:bg-slate-700
                text-slate-700
                dark:text-slate-300
                text-xs
                font-medium
                flex
                items-center
                justify-center
                gap-2
                transition-all
                focus:outline-none
              "
            >
              <RotateCcw size={14} />
              Restaurar Padrão
            </button>
          </div>
        </div>
      )}
    </div>
  );
}