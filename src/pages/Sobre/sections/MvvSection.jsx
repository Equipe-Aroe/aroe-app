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
        icon: <Crosshair className="w-8 h-8 text-white" strokeWidth={2.5} />,
        accent: "secondary",   // borda e ícone bg verde
        text: "Contribuir simplificando o acesso a medicamentos manipulados por meio de plataforma digital. Queremos conectar pacientes e farmácias, garantindo a continuidade dos tratamentos de saúde e economia.",
    },
    {
        key: "visao",
        label: "Visão",
        icon: <Eye className="w-8 h-8 text-white" strokeWidth={2.5} />,
        accent: "primary",     // borda e ícone bg roxo
        text: "Nos consolidar como a solução facilitadora para quem depende desses medicamentos. Transformar um processo manual e cansativo em uma experiência digital, simples, humana e eficiente.",
    },
]

export default function MvvSection() {
    return (
        <section
            className="min-h-screen w-full flex items-center py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-10"
            style={{ background: "linear-gradient(135deg, #f0ecfb 0%, #e8f4ea 100%)" }}
        >
            <div className="w-full max-w-5xl mx-auto flex flex-col gap-8 sm:gap-10">

                {/* header */}
                <div className="flex flex-col items-center gap-2 sm:gap-3 text-center">
                    <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold text-primary leading-tight">
                        Missão, Visão e{" "}
                        <span className="text-secondary">Valores</span>
                    </h2>
                    <p className="text-primary/60 text-xs sm:text-sm lg:text-base max-w-md px-2">
                        Os princípios que guiam nossas decisões e nos movem todos os dias.
                    </p>
                </div>

                <div className="flex flex-col gap-4 sm:gap-5">

                    {/* Missão + Visão */}
                    {cards.map(({ key, label, icon, accent, text }) => (
                        <div
                            key={key}
                            className={`bg-white rounded-2xl border shadow-sm px-4 sm:px-6 lg:px-8 py-6 sm:py-8 flex flex-col sm:flex-row items-start gap-4 sm:gap-6
                                ${accent === "secondary" ? "border-secondary/30" : "border-primary/20"}`}
                        >
                            <div className={`shrink-0 w-12 sm:w-14 h-12 sm:h-14 rounded-xl flex items-center justify-center
                                ${accent === "secondary" ? "bg-secondary" : "bg-primary"}`}>
                                {icon}
                            </div>
                            <div className="flex flex-col gap-1.5 sm:gap-2">
                                <h3 className="text-lg sm:text-xl font-bold text-primary">{label}</h3>
                                <p className="text-xs sm:text-sm text-primary/65 leading-relaxed">{text}</p>
                            </div>
                        </div>
                    ))}

                    {/* Valores */}
                    <div className="bg-white rounded-2xl border border-secondary/30 shadow-sm px-4 sm:px-6 lg:px-8 py-6 sm:py-8 flex flex-col sm:flex-row items-start gap-4 sm:gap-6">
                        <div className="shrink-0 w-12 sm:w-14 h-12 sm:h-14 rounded-xl bg-secondary flex items-center justify-center">
                            <TreePine className="w-6 sm:w-8 h-6 sm:h-8 text-white" strokeWidth={2.5} />
                        </div>
                        <div className="flex flex-col gap-3 sm:gap-4 flex-1">
                            <h3 className="text-lg sm:text-xl font-bold text-primary">Valores</h3>
                            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-x-3 sm:gap-x-6 gap-y-2 sm:gap-y-3">
                                {valores.map((v) => (
                                    <div key={v} className="flex items-center gap-2">
                                        <CheckCircle2 className="w-3 sm:w-4 h-3 sm:h-4 text-secondary flex-shrink-0" />
                                        <span className="text-xs sm:text-sm text-primary/70">{v}</span>
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