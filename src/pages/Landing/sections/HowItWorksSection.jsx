import { FileText, CircleDollarSign, Truck, Upload, Play } from 'lucide-react'
import Button from '../../../components/ui/Button'

const steps = [
    {
        number: '01',
        icon: <FileText size={20} />,
        title: "Envie sua receita em segundos",
        desc: "Foto ou PDF de forma rápida e segura.",
    },
    {
        number: '02',
        icon: <CircleDollarSign size={20} />,
        title: "Compare orçamentos facilmente",
        desc: "Veja preços e condições das melhores farmácias.",
    },
    {
        number: '03',
        icon: <Truck size={20} />,
        title: "Receba em casa com segurança",
        desc: "Entrega rápida e acompanhamento do pedido.",
    },
]

export default function HowItWorksSection() {
    return (
        <section id="como-funciona" className="relative flex flex-col lg:flex-row overflow-hidden min-h-screen">

            {/* bg */}
            <div
                className="absolute inset-0 bg-cover bg-top z-0"
                style={{ backgroundImage: `url('/bg-howItWorks.png')` }}
            />

            {/* text */}
            <div className="relative z-20 w-full lg:w-1/2 flex items-center px-4 sm:px-6 lg:px-16 py-12 sm:py-16 lg:py-24 lg:min-h-screen">
                <div className="flex flex-col gap-4 max-w-xl w-full">

                    <div className="inline-flex items-center gap-2 self-start text-xs font-semibold tracking-widest px-4 py-1.5 rounded-full border border-secondary/40 bg-secondary/10 text-secondary">
                        <span>🌿</span>
                        PRÁTICO E COMPLETO
                    </div>

                    <div>
                        <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold text-primary leading-snug">
                            Controle seu tratamento
                            do{" "}
                            <span className="text-secondary">início ao fim.</span>
                        </h2>
                        <p className="mt-3 sm:mt-4 text-sm sm:text-base lg:text-lg text-primary/70 leading-relaxed">
                            Envie sua receita, compare preços e finalize com a melhor
                            opção — tudo pelo celular.
                        </p>
                    </div>

                    {/* steps */}
                    <div className="flex flex-col gap-0">
                        {steps.map((step, index) => (
                            <div key={step.title} className="flex items-start gap-4">

                                <div className="flex flex-col items-center flex-shrink-0">
                                    <div className="w-11 h-11 mt-2 rounded-xl border-2 border-secondary/40 bg-secondary/10 text-secondary flex items-center justify-center font-bold text-xs">
                                        {step.number}
                                    </div>
                                    {index < steps.length - 1 && (
                                        <div className="w-px h-8 bg-secondary/20 my-1" />
                                    )}
                                </div>

                                <div className="pt-2.5 pb-6">
                                    <p className="font-semibold text-primary text-base">{step.title}</p>
                                    <p className="text-sm text-primary/60 mt-0.5">{step.desc}</p>
                                </div>

                            </div>
                        ))}
                    </div>

                    {/* buttons */}
                    <div className="flex gap-4 flex-wrap">
                        <Button variant='primary'>
                            <Upload size={16} />
                            Enviar receita
                        </Button>

                        <Button variant='outlineDark'>
                            <Play size={14} className="fill-current" />
                            Ver como funciona
                        </Button>
                    </div>

                </div>
            </div>

            {/* mockups */}
            <div className="relative z-20 w-full lg:w-1/2 flex justify-center items-center min-h-48 sm:min-h-64 lg:min-h-screen overflow-hidden px-4 sm:px-6 pb-12 sm:pb-16 lg:pb-0">
                <img
                    src="/mockups.png"
                    alt="Mockup do aplicativo Aroê mostrando a tela de cotação"
                    loading="lazy"
                    className="w-full max-w-sm lg:max-w-2xl drop-shadow-2xl"
                />
            </div>

        </section>
    )
}