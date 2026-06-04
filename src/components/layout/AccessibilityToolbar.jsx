import { useState } from "react";
import {
  Volume2,
  X,
  Plus,
  Minus,
  Contrast,
  RotateCcw,
  VolumeX,
  Accessibility,
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

  return (
    <div className="relative">
      {/* Botão de Acessibilidade */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Abre menu de acessibilidade"
        aria-expanded={isOpen}
        className="
          p-2
          rounded-lg
          text-white
          hover:bg-white/10
          transition
          focus:outline-none
          focus:ring-2
          focus:ring-secondary
          relative
        "
        title="Acessibilidade"
      >
        <Accessibility size={20} />
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
            dark:bg-slate-800
            rounded-lg
            shadow-xl
            border
            border-gray-200
            dark:border-slate-700
            p-4
            w-64
            z-50
          "
        >
          {/* Header */}
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-sm font-bold text-gray-900 dark:text-white">
              Acessibilidade
            </h3>
            <button
              onClick={() => setIsOpen(false)}
              aria-label="Fechar menu"
              className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
            >
              <X size={18} />
            </button>
          </div>

          <div className="space-y-4">
            {/* Alto Contraste */}
            <div className="flex items-center justify-between">
              <label
                htmlFor="contrast-toggle"
                className="text-xs font-medium text-gray-700 dark:text-gray-300 flex items-center gap-2"
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
                  focus:ring-secondary
                  ${
                    highContrast
                      ? "bg-secondary"
                      : "bg-gray-300 dark:bg-gray-600"
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
                    ${
                      highContrast
                        ? "translate-x-4.5"
                        : "translate-x-0.5"
                    }
                  `}
                />
              </button>
            </div>

            {/* Ajuste de Fonte */}
            <div>
              <label className="text-xs font-medium text-gray-700 dark:text-gray-300 block mb-2">
                Tamanho da Fonte: {fontSize}px
              </label>
              <div className="flex items-center gap-2">
                <button
                  onClick={decreaseFontSize}
                  disabled={fontSize <= 12}
                  aria-label="Diminuir tamanho da fonte"
                  className="
                    p-1.5
                    rounded
                    bg-gray-200
                    dark:bg-gray-700
                    hover:bg-gray-300
                    dark:hover:bg-gray-600
                    disabled:opacity-50
                    disabled:cursor-not-allowed
                    transition
                    focus:outline-none
                    focus:ring-2
                    focus:ring-secondary
                  "
                >
                  <Minus size={16} />
                </button>

                <div className="flex-1 bg-gray-200 dark:bg-gray-700 h-2 rounded">
                  <div
                    className="bg-secondary h-2 rounded transition-all"
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
                    rounded
                    bg-gray-200
                    dark:bg-gray-700
                    hover:bg-gray-300
                    dark:hover:bg-gray-600
                    disabled:opacity-50
                    disabled:cursor-not-allowed
                    transition
                    focus:outline-none
                    focus:ring-2
                    focus:ring-secondary
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
                className="text-xs font-medium text-gray-700 dark:text-gray-300 flex items-center gap-2"
              >
                {voiceEnabled ? (
                  <VolumeX size={16} />
                ) : (
                  <Volume2 size={16} />
                )}
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
                  focus:ring-secondary
                  ${
                    voiceEnabled
                      ? "bg-secondary"
                      : "bg-gray-300 dark:bg-gray-600"
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
                    ${
                      voiceEnabled
                        ? "translate-x-4.5"
                        : "translate-x-0.5"
                    }
                  `}
                />
              </button>
            </div>

            {/* Botão Resetar */}
            <button
              onClick={() => {
                resetAccessibility();
                setIsOpen(false);
              }}toggleHighContrast
              className="
                w-full
                mt-4
                py-2
                px-3
                rounded
                bg-gray-200
                dark:bg-gray-700
                hover:bg-gray-300
                dark:hover:bg-gray-600
                text-gray-900
                dark:text-white
                text-xs
                font-medium
                flex
                items-center
                justify-center
                gap-2
                transition
                focus:outline-none
                focus:ring-2
                focus:ring-secondary
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
