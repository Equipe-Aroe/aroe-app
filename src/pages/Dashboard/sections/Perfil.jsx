import { useState, useEffect } from "react";
import {
  User,
  Mail,
  Fingerprint,
  MapPin,
  Save,
  CheckCircle2,
  Loader2,
  ShieldAlert,
  Scale,
  Ruler,
  Lock,
} from "lucide-react";
import { useThemeContext } from "../../../contexts/ThemeContext";

const LOCAL_STORAGE_KEY = "@Aroe:demo_session";

// Base de dados robusta para a Demo
const DADOS_PERFIL = {
  irene: {
    nome: "Irene Souza Silva",
    email: "dona.irene@exemplo.com",
    cpf: "987.654.321-11",
    endereco: "Av. Paulista, 1500 - Bela Vista, São Paulo - SP",
    peso: "74",
    altura: "1.58",
    alergias:
      "Hipertensa. Alergia severa a Corante Tartrazina e AAS (Ácido Acetilsalicílico).",
  },
  ricardo: {
    nome: "Ricardo Almeida Prado",
    email: "ricardo.prado@exemplo.com",
    cpf: "456.123.789-55",
    endereco: "Rua dos Pinheiros, 840 - Pinheiros, São Paulo - SP",
    peso: "88",
    altura: "1.82",
    alergias:
      "Diabético Tipo 2. Intolerância a Lactose (utilizar cápsulas livres de excipientes com lactose).",
  },
  amanda: {
    nome: "Amanda Santos de Carvalho",
    email: "amanda.santos@exemplo.com",
    cpf: "123.456.789-00",
    endereco: "Rua das Flores, 123 - Centro, São Paulo - SP",
    peso: "62",
    altura: "1.65",
    alergias:
      "Nenhuma alergia grave relatada. Sensibilidade a corantes artificiais.",
  },
};

const getLoggedProfile = () => {
  const demoData = localStorage.getItem("@Aroe:demo_session");

  if (demoData) {
    const session = JSON.parse(demoData);

    const nome = session.user?.nome || "";

    if (nome.includes("Irene")) {
      return {
        ...DADOS_PERFIL.irene,
        ...session.user,
      };
    }

    if (nome.includes("Ricardo")) {
      return {
        ...DADOS_PERFIL.ricardo,
        ...session.user,
      };
    }
    // 1. Tenta buscar pelas chaves mais comuns de sistemas de login
    const savedData =
      localStorage.getItem("aroe_user_profile") ||
      localStorage.getItem("user_profile") ||
      localStorage.getItem("user") ||
      localStorage.getItem("loggedUser");

    if (!savedData) {
      console.warn(
        "Aroê Demo: Nenhum usuário encontrado no localStorage. Carregando padrão (Amanda).",
      );
      return DADOS_PERFIL.amanda;
    }

    try {
      const parsed = JSON.parse(savedData);
      console.log("Aroê Demo: Dados brutos detectados no login:", parsed);

      // Padroniza possíveis variações de propriedades (nome vs name, email vs Email)
      const nome = (
        parsed.nome ||
        parsed.name ||
        parsed.fullName ||
        ""
      ).toLowerCase();
      const email = (
        parsed.email ||
        parsed.Email ||
        parsed.userEmail ||
        ""
      ).toLowerCase();

      // 2. Procura por correspondência da Dona Irene (via nome ou e-mail)
      if (nome.includes("irene") || email.includes("irene")) {
        return {
          ...DADOS_PERFIL.irene,
          ...parsed,
          nome: parsed.nome || parsed.name || DADOS_PERFIL.irene.nome,
        };
      }

      // 3. Procura por correspondência do Ricardo (via nome ou e-mail)
      if (nome.includes("ricardo") || email.includes("ricardo")) {
        return {
          ...DADOS_PERFIL.ricardo,
          ...parsed,
          nome: parsed.nome || parsed.name || DADOS_PERFIL.ricardo.nome,
        };
      }

      // 4. Se houver um usuário logado mas não for nenhum dos dois acima, mantém os dados dele mas aplica a base estruturada
      return {
        ...DADOS_PERFIL.amanda,
        ...parsed,
        nome: parsed.nome || parsed.name || DADOS_PERFIL.amanda.nome,
      };
    } catch (e) {
      console.error("Aroê Demo: Erro ao fazer o parse dos dados do usuário", e);
      return DADOS_PERFIL.amanda;
    }
  }
};
  export default function DashboardPerfil() {
    const { highContrast } = useThemeContext();

    // Inicia o estado com quem estiver logado de verdade no ecossistema
    const [profile, setProfile] = useState(() => getLoggedProfile());

    const [isSaving, setIsSaving] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);
    const [passwordData, setPasswordData] = useState({
      atual: "",
      nova: "",
      confirmar: "",
    });
    const [isChangingPassword, setIsChangingPassword] = useState(false);
    const [showPasswordSuccess, setShowPasswordSuccess] = useState(false);

    // Escuta alterações externas (ex: se o usuário deslogar ou trocar de conta na navbar)
    useEffect(() => {
      const handleExternalUpdate = () => {
        setProfile(getLoggedProfile());
      };
      window.addEventListener("profileUpdated", handleExternalUpdate);
      return () =>
        window.removeEventListener("profileUpdated", handleExternalUpdate);
    }, []);

    const maskCPF = (value) => {
      return value
        .replace(/\D/g, "")
        .replace(/(\d{3})(\d)/, "$1.$2")
        .replace(/(\d{3})(\d)/, "$1.$2")
        .replace(/(\d{3})(\d{1,2})$/, "$1-$2")
        .substring(0, 14);
    };

    const handleChange = (e) => {
      const { name, value } = e.target;
      setProfile((prev) => ({
        ...prev,
        [name]: name === "cpf" ? maskCPF(value) : value,
      }));
    };

    const handleSave = (e) => {
      e.preventDefault();
      setIsSaving(true);

      setTimeout(() => {
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(profile));
        setIsSaving(false);
        setShowSuccess(true);

        // Avisa o restante do app que as informações deste usuário mudaram
        window.dispatchEvent(new Event("profileUpdated"));
        setTimeout(() => setShowSuccess(false), 3000);
      }, 800);
    };

    const handlePasswordSubmit = (e) => {
      e.preventDefault();
      if (!passwordData.nova || passwordData.nova !== passwordData.confirmar) {
        alert("As senhas não coincidem!");
        return;
      }

      setIsChangingPassword(true);
      setTimeout(() => {
        setIsChangingPassword(false);
        setPasswordData({ atual: "", nova: "", confirmar: "" });
        setShowPasswordSuccess(true);
        setTimeout(() => setShowPasswordSuccess(false), 3000);
      }, 1000);
    };

    const getInitials = (name) => {
      if (!name) return "PA";
      const parts = name.trim().split(" ");
      if (parts.length > 1) {
        return `${parts[0].charAt(0)}${parts[parts.length - 1].charAt(0)}`.toUpperCase();
      }
      return parts[0].substring(0, 2).toUpperCase();
    };

    const cardBgClass = highContrast
      ? "bg-white text-black border-2 border-black dark:bg-black dark:text-white dark:border-white"
      : "bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800/60 shadow-sm";

    const inputClass = highContrast
      ? "border-2 border-black bg-white text-black dark:border-white dark:bg-black dark:text-white focus:outline-none p-2.5 rounded-xl w-full text-sm"
      : "bg-slate-50 dark:bg-slate-900 border border-transparent dark:border-slate-800 text-slate-900 dark:text-slate-100 focus:bg-white dark:focus:bg-slate-950 focus:outline-none focus:ring-2 focus:ring-purple-500/20 dark:focus:ring-purple-400/20 transition-all text-sm rounded-xl w-full px-4 py-2.5";

    const personalFields = [
      {
        label: "Nome Completo",
        name: "nome",
        type: "text",
        icon: <User size={12} />,
        required: true,
      },
      {
        label: "E-mail de Contato",
        name: "email",
        type: "email",
        icon: <Mail size={12} />,
        required: true,
      },
      {
        label: "CPF",
        name: "cpf",
        type: "text",
        icon: <Fingerprint size={12} />,
        required: true,
      },
      {
        label: "Endereço de Entrega",
        name: "endereco",
        type: "text",
        icon: <MapPin size={12} />,
        required: false,
      },
    ];

    return (
      <div className="space-y-6 max-w-4xl mx-auto pb-12">
        {/* Cabeçalho de Secção */}
        <div className="flex flex-col gap-1 px-2">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
            Meu Perfil
          </h2>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Gerencie suas informações cadastrais, fisiológicas e clínicas
            essenciais.
          </p>
        </div>

        {/* Banner de Resumo Rápido */}
        <div
          className={`p-6 rounded-2xl flex flex-col sm:flex-row items-center gap-5 transition-all ${cardBgClass}`}
        >
          <div className="w-20 h-20 rounded-full bg-purple-100 dark:bg-purple-950/40 flex items-center justify-center text-purple-600 dark:text-purple-400 font-bold text-2xl tracking-wider border-2 border-purple-500/20 shrink-0">
            {getInitials(profile.nome)}
          </div>
          <div className="text-center sm:text-left space-y-1">
            <h3 className="text-xl font-bold text-slate-900 dark:text-white leading-tight">
              {profile.nome || "Nome não informado"}
            </h3>
            <p className="text-sm text-slate-400 dark:text-slate-500 font-medium">
              {profile.email || "E-mail não informado"}
            </p>
            <div className="flex flex-wrap gap-2 justify-center sm:justify-start pt-1">
              <span className="inline-block bg-purple-50 dark:bg-purple-950/40 px-2.5 py-0.5 rounded-full text-xs font-semibold text-purple-600 dark:text-purple-400">
                Paciente Digital Aroê
              </span>
              {Number(profile.peso) > 0 && Number(profile.altura) > 0 && (
                <span className="inline-block bg-slate-100 dark:bg-slate-800 px-2.5 py-0.5 rounded-full text-xs font-medium text-slate-500 dark:text-slate-400">
                  IMC:{" "}
                  {(
                    Number(profile.peso) /
                    (Number(profile.altura) * Number(profile.altura))
                  ).toFixed(1)}
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Formulário Principal de Dados */}
        <form onSubmit={handleSave} className="space-y-6">
          {/* CARD 1: DADOS CADASTRAIS */}
          <div
            className={`p-6 rounded-2xl space-y-6 transition-all ${cardBgClass}`}
          >
            <div className="border-b border-slate-100 dark:border-slate-800 pb-3">
              <h4 className="text-base font-bold text-slate-900 dark:text-white">
                Dados Cadastrais
              </h4>
              <p className="text-xs text-slate-400 dark:text-slate-500">
                Informações civis necessárias para emissão de receitas e notas
                fiscais de fórmulas.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {personalFields.map((field) => (
                <div key={field.name} className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase flex items-center gap-1">
                    {field.icon} {field.label}
                  </label>
                  <input
                    type={field.type}
                    name={field.name}
                    value={profile[field.name] || ""}
                    onChange={handleChange}
                    required={field.required}
                    className={inputClass}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* CARD 2: PERFIL CLÍNICO */}
          <div
            className={`p-6 rounded-2xl space-y-6 transition-all ${cardBgClass}`}
          >
            <div className="border-b border-slate-100 dark:border-slate-800 pb-3">
              <h4 className="text-base font-bold text-slate-900 dark:text-white">
                Perfil Fisiológico & Alergias
              </h4>
              <p className="text-xs text-slate-400 dark:text-slate-500">
                Esses dados auxiliam os laboratórios parceiros a validar
                dosagens e evitar substâncias ou corantes perigosos.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase flex items-center gap-1">
                  <Scale size={12} /> Peso Atual (kg)
                </label>
                <input
                  type="number"
                  name="peso"
                  value={profile.peso || ""}
                  onChange={handleChange}
                  placeholder="Ex: 65"
                  className={inputClass}
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase flex items-center gap-1">
                  <Ruler size={12} /> Altura (m)
                </label>
                <input
                  type="text"
                  name="altura"
                  value={profile.altura || ""}
                  onChange={handleChange}
                  placeholder="Ex: 1.70"
                  className={inputClass}
                />
              </div>

              <div className="space-y-1.5 md:col-span-2">
                <label className="text-xs font-bold uppercase flex items-center gap-1 text-rose-500 dark:text-rose-400">
                  <ShieldAlert size={12} /> Alergias Clínicas ou Restrições a
                  Ativos
                </label>
                <textarea
                  name="alergias"
                  value={profile.alergias || ""}
                  onChange={handleChange}
                  rows={3}
                  className={`${inputClass} resize-none py-3`}
                />
              </div>
            </div>
          </div>

          {/* Feedback e Botão de Salvar */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 rounded-2xl bg-slate-50/50 dark:bg-slate-900/30 border border-slate-100 dark:border-slate-800/40">
            <div className="min-h-[24px]">
              {showSuccess && (
                <div className="flex items-center gap-1.5 text-emerald-600 dark:text-emerald-400 text-xs font-bold animate-pulse">
                  <CheckCircle2 size={16} /> Alterações salvas com sucesso no
                  seu prontuário Aroê!
                </div>
              )}
            </div>

            <button
              type="submit"
              disabled={isSaving}
              className={`flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl text-sm font-bold transition-all w-full sm:w-auto ${
                highContrast
                  ? "bg-black text-white"
                  : "bg-purple-600 hover:bg-purple-700 text-white shadow-sm"
              } disabled:opacity-70`}
            >
              {isSaving ? (
                <>
                  <Loader2 size={16} className="animate-spin" /> Salvando...
                </>
              ) : (
                <>
                  <Save size={16} /> Salvar alterações
                </>
              )}
            </button>
          </div>
        </form>

        {/* CARD 3: SEGURANÇA */}
        <form
          onSubmit={handlePasswordSubmit}
          className={`p-6 rounded-2xl space-y-4 transition-all ${cardBgClass}`}
        >
          <div className="border-b border-slate-100 dark:border-slate-800 pb-3">
            <h4 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Lock size={16} className="text-purple-500" /> Segurança da Conta
            </h4>
            <p className="text-xs text-slate-400 dark:text-slate-500">
              Atualize suas credenciais de autenticação local
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-400 dark:text-slate-500">
                Senha Atual
              </label>
              <input
                type="password"
                placeholder="••••••••"
                value={passwordData.atual}
                onChange={(e) =>
                  setPasswordData({ ...passwordData, atual: e.target.value })
                }
                className={inputClass}
                required
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-400 dark:text-slate-500">
                Nova Senha
              </label>
              <input
                type="password"
                placeholder="Mín. 6 caracteres"
                value={passwordData.nova}
                onChange={(e) =>
                  setPasswordData({ ...passwordData, nova: e.target.value })
                }
                className={inputClass}
                required
                minLength={6}
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-400 dark:text-slate-500">
                Confirmar Nova Senha
              </label>
              <input
                type="password"
                placeholder="Confirme a senha"
                value={passwordData.confirmar}
                onChange={(e) =>
                  setPasswordData({
                    ...passwordData,
                    confirmar: e.target.value,
                  })
                }
                className={inputClass}
                required
              />
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
            <div className="min-h-[20px]">
              {showPasswordSuccess && (
                <div className="flex items-center gap-1.5 text-emerald-600 dark:text-emerald-400 text-xs font-bold">
                  <CheckCircle2 size={14} /> Senha atualizada com sucesso!
                </div>
              )}
            </div>

            <button
              type="submit"
              disabled={isChangingPassword || !passwordData.nova}
              className="px-4 py-2 rounded-xl text-xs font-bold border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors disabled:opacity-50 w-full sm:w-auto text-center"
            >
              {isChangingPassword ? "Atualizando..." : "Atualizar Senha"}
            </button>
          </div>
        </form>
      </div>
    );
  }
