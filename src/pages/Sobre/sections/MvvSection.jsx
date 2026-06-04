import { Crosshair, Eye, TreePine, CheckCircle2 } from "lucide-react"

const valores = [
    "Agilidade",
    "Continuidade",
    "Empatia",
    "Economia",
    "Segurança",
    "Transparência",
    "Diversidade",
]

const cards = [
    {
        key: "missao",
        label: "Missão",
        // Ícone ganha a cor escura no light e a cor verde viva (Vitaly) no dark
        icon: <Crosshair className="w-6 h-6 sm:w-7 sm:h-7 text-white dark:text-[#4DAA5C]" strokeWidth={2.5} />,
        accent: "secondary",
        text: "Contribuir simplificando o acesso a medicamentos manipulados por meio de plataforma digital. Queremos conectar pacientes e farmácias, garantindo a continuidade dos tratamentos de saúde e economia.",
    },
    {
        key: "visao",
        label: "Visão",
        // Ícone ganha a cor escura no light e a cor lilás serena (Serene) no dark
        icon: <Eye className="w-6 h-6 sm:w-7 sm:h-7 text-white dark:text-[#C3ACF1]" strokeWidth={2.5} />,
        accent: "primary",
        text: "Nos consolidar como a solução facilitadora para quem depende desses medicamentos. Transformar um processo manual e cansativo em uma experiência digital, simples, humana e eficiente.",
    },
]

export default function MvvSection() {
    return (
        // Fundo Dark agora usa o roxo Midnight (#2A1F5E) da Aroê com gradiente suave
        <section className="min-h-screen w-full flex items-center py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-10 bg-gradient-to-br from-[#f0ecfb] to-[#e8f4ea] dark:from-[#2A1F5E] dark:to-[#19123b] transition-colors duration-500">
            <div className="w-full max-w-5xl mx-auto flex flex-col gap-8 sm:gap-10">

                {/* header */}
                <div className="flex flex-col items-center gap-2 sm:gap-3 text-center">
                    <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold text-[#2A1F5E] dark:text-white leading-tight">
                        Missão, Visão e{" "}
                        <span className="text-[#4DAA5C] dark:text-[#C3ACF1]">Valores</span>
                    </h2>
                    <p className="text-slate-600 dark:text-[#C3ACF1]/70 text-xs sm:text-sm lg:text-base max-w-md px-2">
                        Os princípios que guiam nossas decisões e nos movem todos os dias.
                    </p>
                </div>

                <div className="flex flex-col gap-5 sm:gap-6">

                    {/* Missão + Visão */}
                    {cards.map(({ key, label, icon, accent, text }) => (
                        <div
                            key={key}
                            className={`bg-white/90 dark:bg-[#2A1F5E]/40 backdrop-blur-md rounded-2xl border shadow-sm px-5 sm:px-6 lg:px-8 py-6 sm:py-8 flex flex-col sm:flex-row items-start gap-4 sm:gap-6 transition-all duration-300
                                ${accent === "secondary" 
                                    ? "border-[#4DAA5C]/30 dark:border-[#4DAA5C]/40 shadow-[#4DAA5C]/5" 
                                    : "border-[#2A1F5E]/20 dark:border-[#C3ACF1]/30 shadow-[#C3ACF1]/5"
                                }`}
                        >
                            {/* Box do Ícone: No dark mode vira um container transparente com borda colorida correspondente */}
                            <div className={`shrink-0 w-12 sm:w-14 h-12 sm:h-14 rounded-xl flex items-center justify-center shadow-md transition-all duration-300
                                ${accent === "secondary" 
                                    ? "bg-[#4DAA5C] dark:bg-[#4DAA5C]/10 dark:border dark:border-[#4DAA5C]/40" 
                                    : "bg-[#2A1F5E] dark:bg-[#C3ACF1]/10 dark:border dark:border-[#C3ACF1]/40"
                                }`}
                            >
                                {icon}
                            </div>
                            <div className="flex flex-col gap-1.5 sm:gap-2">
                                <h3 className={`text-lg sm:text-xl font-bold ${
                                    accent === "secondary" ? "text-[#2A1F5E] dark:text-[#4DAA5C]" : "text-[#2A1F5E] dark:text-[#C3ACF1]"
                                }`}>
                                    {label}
                                </h3>
                                <p className="text-xs sm:text-sm text-slate-600 dark:text-purple-100/90 leading-relaxed">{text}</p>
                            </div>
                        </div>
                    ))}

                    {/* Valores */}
                    <div className="bg-white/90 dark:bg-[#2A1F5E]/40 backdrop-blur-md rounded-2xl border border-[#4DAA5C]/30 dark:border-[#4DAA5C]/40 shadow-sm shadow-[#4DAA5C]/5 px-5 sm:px-6 lg:px-8 py-6 sm:py-8 flex flex-col sm:flex-row items-start gap-4 sm:gap-6 transition-all duration-300">
                        <div className="shrink-0 w-12 sm:w-14 h-12 sm:h-14 rounded-xl bg-[#4DAA5C] dark:bg-[#4DAA5C]/10 dark:border dark:border-[#4DAA5C]/40 flex items-center justify-center shadow-md">
                            <TreePine className="w-6 h-6 sm:w-7 sm:h-7 text-white dark:text-[#4DAA5C]" strokeWidth={2.5} />
                        </div>
                        <div className="flex flex-col gap-3 sm:gap-4 flex-1 w-full">
                            <h3 className="text-lg sm:text-xl font-bold text-[#2A1F5E] dark:text-[#4DAA5C]">Valores</h3>
                            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-x-3 sm:gap-x-6 gap-y-2.5 sm:gap-y-3">
                                {valores.map((v) => (
                                    <div key={v} className="flex items-center gap-2 group">
                                        <CheckCircle2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#4DAA5C] dark:text-[#4DAA5C] flex-shrink-0" />
                                        <span className="text-xs sm:text-sm text-slate-600 dark:text-purple-100/80 font-medium">{v}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    )
}