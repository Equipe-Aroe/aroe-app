import { useEffect, useState } from "react";

export function useAccessibility() {
  const [highContrast, setHighContrast] = useState(() => {
    return localStorage.getItem("highContrast") === "true";
  });

  const [fontSize, setFontSize] = useState(() => {
    return parseFloat(localStorage.getItem("fontSize")) || 16;
  });

  const [voiceEnabled, setVoiceEnabled] = useState(false);

  // Aplicar alto contraste
  useEffect(() => {
    document.documentElement.classList.toggle(
      "high-contrast",
      highContrast
    );
    localStorage.setItem("highContrast", highContrast);
  }, [highContrast]);

  // Aplicar tamanho de fonte
  useEffect(() => {
    document.documentElement.style.fontSize = `${fontSize}px`;
    localStorage.setItem("fontSize", fontSize);
  }, [fontSize]);

  // Resetar tudo
  const resetAccessibility = () => {
    setHighContrast(false);
    setFontSize(16);
    setVoiceEnabled(false);
  };

  // Aumentar fonte
  const increaseFontSize = () => {
    setFontSize((prev) => Math.min(prev + 2, 28));
  };

  // Diminuir fonte
  const decreaseFontSize = () => {
    setFontSize((prev) => Math.max(prev - 2, 12));
  };

  // Ler texto em voz alta
  const speakText = (text) => {
    if (!window.speechSynthesis) {
      alert("Leitor de voz não suportado neste navegador");
      return;
    }

    window.speechSynthesis.cancel(); // Cancelar fala anterior

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "pt-BR";
    utterance.rate = 1;
    utterance.pitch = 1;
    utterance.volume = 1;

    window.speechSynthesis.speak(utterance);
  };

  // Parar leitura
  const stopSpeech = () => {
    window.speechSynthesis.cancel();
  };

  return {
    highContrast,
    setHighContrast,
    fontSize,
    increaseFontSize,
    decreaseFontSize,
    voiceEnabled,
    setVoiceEnabled,
    speakText,
    stopSpeech,
    resetAccessibility,
  };
}
