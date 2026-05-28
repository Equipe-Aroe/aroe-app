import { Heart, Activity, Boxes, Flower2, Leaf } from "lucide-react";

const ods = [
  {
    number: "3",
    title: "SAÚDE E\nBEM-ESTAR",
    color: "#4C9F38",
    bg: "#EEF1E9",
    icon: (
      <svg viewBox="0 0 120 80" className="w-32 h-20" fill="none" stroke="#4C9F38" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round">
        <path d="M5 50 L25 50 L35 30 L50 65 L60 20 L72 55 L82 45 L95 50" />
        <path d="M95 50 c5 -10 20 -10 20 4 c0 10 -15 18 -20 24 c-5 -6 -20 -14 -20 -24 c0 -14 15 -14 20 -4 z" fill="#4C9F38" stroke="#4C9F38"/>
      </svg>
    ),
    caption: "Mais acesso, cuidado e continuidade no tratamento.",
  },
  {
    number: "9",
    title: "INDÚSTRIA, INOVAÇÃO\nE INFRAESTRUTURA",
    color: "#FD6925",
    bg: "#F5EEE8",
    icon: (
      <svg viewBox="0 0 120 90" className="w-28 h-24" fill="#FD6925" stroke="#7a2f10" strokeWidth="1.5" strokeLinejoin="round">
        <polygon points="40,15 60,5 80,15 60,25" />
        <polygon points="40,15 40,40 60,50 60,25" />
        <polygon points="80,15 80,40 60,50 60,25" opacity="0.85"/>
        <polygon points="20,45 40,35 60,45 40,55" />
        <polygon points="20,45 20,70 40,80 40,55" />
        <polygon points="60,45 60,70 40,80 40,55" opacity="0.85"/>
        <polygon points="60,45 80,35 100,45 80,55" />
        <polygon points="60,45 60,70 80,80 80,55" />
        <polygon points="100,45 100,70 80,80 80,55" opacity="0.85"/>
      </svg>
    ),
    caption: "Tecnologia para simplificar o cuidado com a saúde.",
  },
  {
    number: "17",
    title: "PARCERIAS PARA O\nDESENVOLVIMENTO",
    color: "#19486A",
    bg: "#E8EAEF",
    icon: (
      <svg viewBox="0 0 120 120" className="w-28 h-24" fill="none" stroke="#19486A" strokeWidth="5">
        <circle cx="60" cy="35" r="22"/>
        <circle cx="35" cy="55" r="22"/>
        <circle cx="85" cy="55" r="22"/>
        <circle cx="45" cy="85" r="22"/>
        <circle cx="75" cy="85" r="22"/>
      </svg>
    ),
    caption: "Conectando pessoas para gerar impacto positivo.",
  },
];

export default function OdsSection() {
  return (
    <section className="min-h-screen w-full bg-[#E9E7F5] py-16 px-6 md:px-16 font-sans">
      <div className="max-w-6xl mx-auto">
        <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-[#0B1B4D] leading-tight">
          Compromisso com um{" "}
          <span className="text-[#4C9F38] italic font-serif">mundo melhor</span>
        </h1>

        <div className="mt-8 space-y-2 text-[#1a1a1a] text-base md:text-lg max-w-3xl">
          <p>A Aroê nasce com um propósito claro.</p>
          <p>
            Impactar diretamente a saúde e o bem-estar das pesssoas, por meio da
            inovação e da conexão.
          </p>
          <p>E assim estamos alinhados com três grandes</p>
        </div>

        <div className="mt-4 h-[3px] w-full max-w-md bg-[#6C63FF] rounded-full" />

        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-12">
          {ods.map((o, i) => (
            <div key={i} className="flex flex-col">
              <div
                className="rounded-sm p-4 flex flex-col items-center justify-between aspect-square"
                style={{ backgroundColor: o.bg }}
              >
                <div className="w-full flex items-start gap-2">
                  <span
                    className="text-5xl font-extrabold leading-none"
                    style={{ color: o.color }}
                  >
                    {o.number}
                  </span>
                  <span
                    className="text-[11px] md:text-xs font-extrabold leading-tight whitespace-pre-line mt-1"
                    style={{ color: o.color }}
                  >
                    {o.title}
                  </span>
                </div>
                <div className="flex-1 flex items-center justify-center">
                  {o.icon}
                </div>
              </div>
              <p
                className="mt-5 text-lg md:text-xl font-medium leading-snug"
                style={{ color: o.color }}
              >
                {o.caption}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-16 flex justify-center">
          <div className="flex items-center gap-3 px-6 py-3 rounded-full border-2 border-[#6C63FF]/60 bg-white/40">
            <span className="flex items-center justify-center w-8 h-8 rounded-full bg-[#dfeede]">
              <Leaf className="w-4 h-4 text-[#4C9F38]" />
            </span>
            <p className="text-[#0B1B4D] text-sm md:text-base">
              Cuidar de pessoas é o que nos movem. Inovar é o que a gente faz
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
