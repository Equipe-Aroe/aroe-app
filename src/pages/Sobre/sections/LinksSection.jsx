import { ArrowUpRight, ExternalLink, Smartphone, Compass } from "lucide-react";

// SVG nativo do GitHub para evitar problemas de versão do lucide-react
function GitHubIcon() {
  return (
    <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor">
      <path d="M12 2C6.477 2 2 6.477 2 12c0 4.418 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.009-.868-.013-1.703-2.782.604-3.369-1.342-3.369-1.342-.454-1.155-1.11-1.463-1.11-1.463-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0 1 12 6.836a9.59 9.59 0 0 1 2.504.337c1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.202 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.163 22 16.418 22 12c0-5.523-4.477-10-10-10z" />
    </svg>
  );
}

const linksOficiais = [
  {
    title: "App Oficial",
    description: "Acesse a versão de demonstração da nossa plataforma digital.",
    url: "https://aroe-app.vercel.app",
    icon: <Smartphone className="w-5 h-5" />,
    label: "Acessar App",
    accent: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20",
  },
  {
    title: "GitHub Organização",
    description: "Explore os repositórios, códigos-fonte e documentação técnica do projeto.",
    url: "https://github.com/Equipe-Aroe",
    icon: <GitHubIcon />,
    label: "Ver Repositórios",
    accent: "bg-slate-900/10 text-slate-800 dark:bg-white/10 dark:text-white border-slate-900/20 dark:border-white/10",
  },
  {
    title: "Linktree Oficial",
    description: "Nossa central de links, redes sociais e comunicações unificadas.",
    url: "https://linktr.ee/AroeOficial",
    icon: <Compass className="w-5 h-5" />,
    label: "Nossos Links",
    accent: "bg-[#2A1F5E]/10 text-[#2A1F5E] dark:text-[#C3ACF1] border-[#2A1F5E]/20",
  },
  {
    title: "Pitch & Apresentação",
    description: "Visualize nossa identidade de marca e proposta de valor no Canva.",
    url: "https://canva.link/ftpweaysv3lad28",
    icon: <ExternalLink className="w-5 h-5" />,
    label: "Abrir Apresentação",
    accent: "bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20",
  },
];

export default function LinksSection() {
  return (
    <section className="bg-slate-50 dark:bg-slate-950 px-4 sm:px-6 lg:px-10 py-12 sm:py-16 lg:py-20 transition-colors duration-500 relative overflow-hidden">
      <div className="absolute -bottom-20 left-1/4 w-96 h-96 bg-[#4DAA5C]/10 dark:bg-[#4DAA5C]/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="mx-auto max-w-5xl flex flex-col gap-8 sm:gap-10 relative z-10">
        
        {/* Header */}
        <div className="flex flex-col gap-3 sm:gap-4 text-center md:text-left">
          <span className="inline-flex items-center gap-2 self-center md:self-start text-xs font-semibold px-3 py-1.5 rounded-full bg-[#4DAA5C]/10 dark:bg-[#4DAA5C]/20 text-[#4DAA5C] dark:text-[#4DAA5C] border border-[#4DAA5C]/20">
            Ecossistema Digital
          </span>
          <div>
            <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold text-[#2A1F5E] dark:text-white leading-tight">
              Nossos Canais Oficiais
            </h2>
            <p className="mt-2 text-xs sm:text-sm text-gray-500 dark:text-slate-400 max-w-xl">
              Acompanhe o Projeto Aroê de perto. Explore nosso ecossistema de desenvolvimento, design, redes e aplicação.
            </p>
          </div>
          <div className="h-[3px] w-24 bg-[#4DAA5C] dark:bg-[#C3ACF1] rounded-full mt-1 mx-auto md:mx-0" />
        </div>

        {/* Grid de Links */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:gap-6">
          {linksOficiais.map((item) => (
            <a
              key={item.title}
              href={item.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex flex-col justify-between p-5 sm:p-6 rounded-2xl border border-gray-200 dark:border-slate-800 bg-white dark:bg-slate-900/40 backdrop-blur-sm shadow-sm hover:shadow-md hover:border-[#4DAA5C]/40 dark:hover:border-[#C3ACF1]/40 transition-all duration-300"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className={`p-2.5 rounded-xl border ${item.accent} flex items-center justify-center`}>
                    {item.icon}
                  </div>
                  <ArrowUpRight className="w-5 h-5 text-gray-400 group-hover:text-[#4DAA5C] dark:group-hover:text-[#C3ACF1] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-200" />
                </div>

                <h3 className="text-base sm:text-lg font-bold text-[#2A1F5E] dark:text-white group-hover:text-[#4DAA5C] dark:group-hover:text-[#C3ACF1] transition-colors duration-200">
                  {item.title}
                </h3>
                <p className="text-xs sm:text-sm text-gray-500 dark:text-slate-400 leading-relaxed mt-2">
                  {item.description}
                </p>
              </div>

              <div className="mt-6 flex items-center gap-1.5 text-xs font-semibold text-slate-600 dark:text-slate-300 group-hover:text-[#4DAA5C] dark:group-hover:text-[#C3ACF1] transition-colors duration-200">
                <span>{item.label}</span>
                <span className="text-gray-400 group-hover:text-inherit">→</span>
              </div>
            </a>
          ))}
        </div>

      </div>
    </section>
  );
}