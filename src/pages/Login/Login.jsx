import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Sparkles, User, Building2, X, Moon, Sun, Accessibility } from "lucide-react";
import AuthLayout from "./AuthLayout";
import Button from "../../components/ui/Button";
import { useThemeContext } from "../../contexts/ThemeContext";
import AccessibilityToolbar from "../../components/layout/AccessibilityToolbar";


import { personasPayloads } from "../../data/personasData"; 

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isDemoModalOpen, setIsDemoModalOpen] = useState(false);
  const navigate = useNavigate();
  const { darkMode, toggleDarkMode } = useThemeContext();


  const personas = [
    {
      id: "ricardo",
      nome: "Ricardo Augusto",
      tag: "Trabalhador / Hipertenso",
      descricao: "34 anos, rotina exaustiva. Precisa cotar fórmulas de uso contínuo para hipertensão e vitaminas sem perder tempo.",
      cor: "border-blue-200 dark:border-blue-900 bg-blue-50/40 dark:bg-blue-950/10",
      icone: <User className="text-blue-600 dark:text-blue-400" size={20} />,
    },
    {
      id: "irene",
      nome: "Dona Irene (e Fred)",
      tag: "Idosa / Sem Afinidade Tecnológica",
      descricao: "68 anos, aposentada. Trata osteoporose e precisa dos biscoitos medicamentosos do seu cão cardiopata, o Fred.",
      cor: "border-amber-200 dark:border-amber-900 bg-amber-50/40 dark:bg-amber-950/10",
      icone: <User className="text-amber-600 dark:text-amber-400" size={20} />,
    },
    {
      id: "farmacia",
      nome: "NatuFórmula (Farmácia Parceira)",
      tag: "Visão Corporativa B2B",
      descricao: "Painel da farmácia de manipulação para capturar as receitas limpas e responder os orçamentos do Ricardo e da Irene.",
      cor: "border-purple-200 dark:border-purple-900 bg-purple-50/40 dark:bg-purple-950/10",
      icone: <Building2 className="text-purple-600 dark:text-purple-400" size={20} />,
    },
  ];

  const handleSelectPersona = (personaId) => {
    setIsDemoModalOpen(false);

    // PUXANDO O JSON DA PERSONA SELECIONADA ADQUIRIDO DO OUTRO ARQUIVO
    const selectedPayload = personasPayloads[personaId];

    // 1. Salva os dados do payload correspondente
    localStorage.setItem("@Aroe:demo_session", JSON.stringify(selectedPayload));

    // 2. Define o modo baseado no ID da persona
    const mode = personaId === "farmacia" ? "pharmacy" : "patient";
    localStorage.setItem("@Aroe:dashboard_mode", mode);

    navigate("/dashboard");
  };

  function handleSubmit(e) {
    e.preventDefault();
    localStorage.removeItem("@Aroe:demo_session");
    navigate("/dashboard");
  }

  return (
    <div className="relative min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors duration-500">
      {/* Controles Flutuantes */}
      <div className="absolute top-4 right-4 sm:top-6 sm:right-6 z-50 flex items-center gap-2 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md p-1.5 rounded-xl border border-gray-200 dark:border-slate-800 shadow-sm">
        <div className="text-slate-600 dark:text-slate-300 hover:bg-gray-100 dark:hover:bg-slate-800 rounded-lg transition p-0.5">
          <AccessibilityToolbar
            scrolled={true}
            darkMode={darkMode}
            icon={<Accessibility size={19} />}
          />
        </div>
        <div className="h-4 w-[1px] bg-gray-200 dark:bg-slate-800" />
        <button
          type="button"
          onClick={toggleDarkMode}
          className="p-2 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-gray-100 dark:hover:bg-slate-800 transition"
        >
          {darkMode ? <Sun size={19} /> : <Moon size={19} />}
        </button>
      </div>

      <AuthLayout title="Seja bem-vindo" subtitle="Faça o login na sua conta">
        <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-4">
          <div>
            <label className="block text-xs font-semibold text-gray-600 dark:text-slate-400">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="exemplo@exemplo.com"
              required
              className="mt-2 w-full px-3 py-2 text-sm bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-800 rounded-lg focus:ring-2 focus:ring-[#4DAA5C] transition-colors"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-gray-600 dark:text-slate-400">
              Senha
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
              className="mt-2 w-full px-3 py-2 text-sm bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-800 rounded-lg focus:ring-2 focus:ring-[#4DAA5C] transition-colors"
            />
          </div>

          <Button
            type="submit"
            variant="primaryFull"
            className="py-2.5 text-sm mt-2"
          >
            Entrar
          </Button>

          {/* Botão de Apresentação da Demo */}
          <button
            type="button"
            onClick={() => setIsDemoModalOpen(true)}
            className="w-full py-2.5 rounded-lg text-sm font-bold bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white shadow-md flex items-center justify-center gap-2 transition-all"
          >
            <Sparkles size={16} className="animate-pulse" />
            Visite nosso Demo (Acesso Rápido)
          </button>

          <p className="text-center text-xs text-gray-500 dark:text-slate-400 pt-2">
            Não tem uma conta?{" "}
            <Link
              to="/register"
              className="text-[#4DAA5C] font-semibold hover:underline"
            >
              Cadastre-se
            </Link>
          </p>
        </form>
      </AuthLayout>

      {/* MODAL EXPANDIDO DE PERSONAS (ROTEIRO AROÊ) */}
      {isDemoModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm">
          <div className="w-full max-w-xl bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-800 rounded-2xl p-6 shadow-2xl relative text-left">
            <button
              onClick={() => setIsDemoModalOpen(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 p-1 rounded-lg"
            >
              <X size={18} />
            </button>

            <div className="mb-4">
              <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <Sparkles size={18} className="text-emerald-500" />
                Ecossistema de Demonstração — Aroê
              </h3>
              <p className="text-xs text-gray-500 dark:text-slate-400 mt-1">
                Selecione um dos personagens do nosso Pitch para ver como o
                algoritmo organiza e resolve as demandas de saúde de cada
                perfil.
              </p>
            </div>

            <div className="space-y-3 max-h-[60vh] overflow-y-auto pr-1">
              {personas.map((persona) => (
                <button
                  key={persona.id}
                  type="button"
                  onClick={() => handleSelectPersona(persona.id)}
                  className={`w-full text-left p-4 rounded-xl border transition-all flex items-start gap-3 hover:scale-[1.01] ${persona.cor}`}
                >
                  <div className="p-2.5 rounded-xl bg-white dark:bg-slate-950 shadow-sm shrink-0 mt-0.5">
                    {persona.icone}
                  </div>
                  <div className="space-y-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="font-extrabold text-sm text-slate-900 dark:text-white">
                        {persona.nome}
                      </span>
                      <span className="text-[9px] bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 px-1.5 py-0.5 rounded font-bold uppercase tracking-wider">
                        {persona.tag}
                      </span>
                    </div>
                    <p className="text-xs text-gray-600 dark:text-slate-300 leading-relaxed">
                      {persona.descricao}
                    </p>
                  </div>
                </button>
              ))}
            </div>

            <div className="mt-5 pt-3 border-t border-gray-100 dark:border-slate-800 flex justify-between items-center text-[10px] text-gray-400 font-bold tracking-wider">
              <span>PROJETO AROÊ</span>
              <span>PROA 2026</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
