import { Leaf } from "lucide-react"

const ods = [
  {
    number: "3",
    title: "SAÚDE E\nBEM-ESTAR",
    color: "#4C9F38",
    // Classes de fundo específicas para o Light e o Dark
    bgClass: "bg-[#EEF1E9] dark:bg-[#4C9F38]/10 dark:border dark:border-[#4C9F38]/20",
    icon: (
      <svg viewBox="0 0 120 80" className="w-32 h-20" fill="none" stroke="#4C9F38" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round">
        <path d="M5 50 L25 50 L35 30 L50 65 L60 20 L72 55 L82 45 L95 50" />
        <path d="M95 50 c5 -10 20 -10 20 4 c0 10 -15 18 -20 24 c-5 -6 -20 -14 -20 -24 c0 -14 15 -14 20 -4 z" fill="#4C9F38" stroke="#4C9F38" />
      </svg>
    ),
    caption: "Mais acesso, cuidado e continuidade no tratamento.",
  },
  {
    number: "9",
    title: "INDÚSTRIA, INOVAÇÃO\nE INFRAESTRUTURA",
    color: "#FD6925",
    bgClass: "bg-[#F5EEE8] dark:bg-[#FD6925]/10 dark:border dark:border-[#FD6925]/20",
    icon: (
      // Alterado fills estáticos internos por herança de classe (fill-current)
      <svg viewBox="0 0 120 90" className="w-28 h-24 text-[#FD6925]" strokeWidth="1.5" strokeLinejoin="round">
        <polygon className="fill-current stroke-[#7a2f10] dark:stroke-[#FD6925]/40" points="40,15 60,5 80,15 60,25" />
        <polygon className="fill-current stroke-[#7a2f10] dark:stroke-[#FD6925]/40" points="40,15 40,40 60,50 60,25" />
        <polygon className="fill-current stroke-[#7a2f10] dark:stroke-[#FD6925]/40" points="80,15 80,40 60,50 60,25" opacity="0.85" />
        <polygon className="fill-current stroke-[#7a2f10] dark:stroke-[#FD6925]/40" points="20,45 40,35 60,45 40,55" />
        <polygon className="fill-current stroke-[#7a2f10] dark:stroke-[#FD6925]/40" points="20,45 20,70 40,80 40,55" />
        <polygon className="fill-current stroke-[#7a2f10] dark:stroke-[#FD6925]/40" points="60,45 60,70 40,80 40,55" opacity="0.85" />
        <polygon className="fill-current stroke-[#7a2f10] dark:stroke-[#FD6925]/40" points="60,45 80,35 100,45 80,55" />
        <polygon className="fill-current stroke-[#7a2f10] dark:stroke-[#FD6925]/40" points="60,45 60,70 80,80 80,55" />
        <polygon className="fill-current stroke-[#7a2f10] dark:stroke-[#FD6925]/40" points="100,45 100,70 80,80 80,55" opacity="0.85" />
      </svg>
    ),
    caption: "Tecnologia para simplificar o cuidado com a saúde.",
  },
  {
    number: "17",
    title: "PARCERIAS PARA O\nDESENVOLVIMENTO",
    color: "#19486A",
    // Adicionado text-sky-400 no dark para a ODS 17 ter excelente contraste sobre o fundo escuro
    colorDark: "#38bdf8",
    bgClass: "bg-[#E8EAEF] dark:bg-[#38bdf8]/10 dark:border dark:border-[#38bdf8]/20",
    icon: (
      // Adicionado stroke-current para que a cor mude via Tailwind
      <svg viewBox="0 0 120 120" className="w-28 h-24 stroke-current text-[#19486A] dark:text-[#38bdf8]" fill="none" strokeWidth="5">
        <circle cx="60" cy="35" r="22" />
        <circle cx="35" cy="55" r="22" />
        <circle cx="85" cy="55" r="22" />
        <circle cx="45" cy="85" r="22" />
        <circle cx="75" cy="85" r="22" />
      </svg>
    ),
    caption: "Conectando pessoas para gerar impacto positivo.",
  },
]

export default function OdsSection() {
  return (
    // Fundo dinâmico: Lilás clarinho no Light, Midnight (#2A1F5E) no Dark
    <section className="w-full py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-10 bg-[#EDEAF6] dark:bg-[#2A1F5E] transition-colors duration-500">
      <div className="max-w-5xl mx-auto flex flex-col gap-8 sm:gap-10">

        {/* Header */}
        <div className="flex flex-col gap-2 sm:gap-3">
          <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold text-[#2A1F5E] dark:text-white leading-tight">
            Compromisso com um{" "}
            <span className="text-[#4DAA5C] dark:text-[#C3ACF1]">mundo melhor</span>
          </h2>

          <div className="flex flex-col gap-1 text-[#2A1F5E]/80 dark:text-purple-100/80 text-sm sm:text-base lg:text-lg max-w-2xl">
            <p>A Aroê nasce com um propósito claro.</p>
            <p>
              Impactar diretamente a saúde e o bem-estar das pessoas, por meio da
              inovação e da conexão.
            </p>
            <p>E assim estamos alinhados com três grandes</p>
          </div>

          <div className="h-[3px] w-32 sm:w-48 bg-[#4DAA5C] dark:bg-[#C3ACF1] rounded-full mt-1" />
        </div>

        {/* Cards ODS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {ods.map((o) => {
            // Logica simples para lidar com a cor customizada da ODS 17 no dark mode
            const currentTextColor = `var(--current-color, ${o.color})`

            return (
              <article 
                key={o.number} 
                className="flex flex-col gap-3 sm:gap-4 group"
                style={{ '--current-color': typeof window !== 'undefined' && document.documentElement.classList.contains('dark') ? (o.colorDark || o.color) : o.color }}
              >
                {/* Topo: número + título lado a lado */}
                <div className="flex items-start gap-2">
                  <span
                    className="text-3xl sm:text-4xl lg:text-5xl font-extrabold leading-none transition-colors duration-300"
                    style={{ color: currentTextColor }}
                  >
                    {o.number}
                  </span>
                  <span
                    className="text-[10px] sm:text-[11px] font-extrabold leading-tight whitespace-pre-line mt-1 transition-colors duration-300"
                    style={{ color: currentTextColor }}
                  >
                    {o.title}
                  </span>
                </div>

                {/* Ícone com fundo adaptável */}
                <div className={`rounded-xl flex items-center justify-center py-6 sm:py-8 transition-all duration-300 shadow-sm group-hover:shadow-md ${o.bgClass}`}>
                  {o.icon}
                </div>

                {/* Caption */}
                <p
                  className="text-sm sm:text-base font-semibold leading-snug transition-colors duration-300"
                  style={{ color: currentTextColor }}
                >
                  {o.caption}
                </p>
              </article>
            )
          })}
        </div>

        {/* Rodapé / Badge Central */}
        <div className="flex justify-center mt-4">
          <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-3 px-5 sm:px-6 py-3 rounded-full border border-[#2A1F5E]/10 dark:border-[#C3ACF1]/20 bg-white/70 dark:bg-[#2A1F5E]/40 backdrop-blur-sm text-center sm:text-left transition-all duration-300 shadow-sm">
            <span className="flex items-center justify-center w-6 sm:w-7 h-6 sm:h-7 rounded-full bg-[#4DAA5C]/15 dark:bg-[#4DAA5C]/20 flex-shrink-0">
              <Leaf className="w-3 sm:w-4 h-3 sm:h-4 text-[#4DAA5C]" />
            </span>
            <p className="text-[#2A1F5E]/80 dark:text-purple-100/90 text-xs sm:text-sm font-medium">
              Cuidar de pessoas é o que nos move. Inovar é o que a gente faz.
            </p>
          </div>
        </div>

      </div>
    </section>
  )
}