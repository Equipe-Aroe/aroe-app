"use client"

import { FileText, CircleDollarSign, Truck, Upload, Play } from 'lucide-react'
import { motion } from 'framer-motion'
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

// Variantes para o container dos textos (Stagger effect)
const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.2, // Tempo entre a animação de cada filho
        }
    }
}

// Variantes para itens individuais da esquerda
const itemVariants = {
    hidden: { opacity: 0, x: -30 },
    visible: { 
        opacity: 1, 
        x: 0,
        transition: { type: "spring", stiffness: 100, damping: 15 }
    }
}

export default function HowItWorksSection() {
    return (
        <section 
            id="como-funciona" 
            className="relative flex flex-col lg:flex-row overflow-hidden min-h-screen bg-slate-50 dark:bg-slate-950 transition-colors duration-500"
        >
            {/* bg */}
            <div
                className="absolute inset-0 bg-cover bg-top z-0 opacity-10 dark:opacity-5 mix-blend-overlay pointer-events-none"
                style={{ backgroundImage: `url('/bg-howItWorks.png')` }}
            />

            {/* text */}
            <motion.div 
                className="relative z-20 w-full lg:w-1/2 flex items-center px-4 sm:px-6 lg:px-16 py-12 sm:py-16 lg:py-24 lg:min-h-screen"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
                variants={containerVariants}
            >
                <div className="flex flex-col gap-4 max-w-xl w-full">

                    {/* Badge */}
                    <motion.div 
                        variants={itemVariants}
                        className="inline-flex items-center gap-2 self-start text-xs font-semibold tracking-widest px-4 py-1.5 rounded-full border border-secondary/40 bg-secondary/10 text-secondary dark:text-secondary-light"
                    >
                        <span>🌿</span>
                        PRÁTICO E COMPLETO
                    </motion.div>

                    <motion.div variants={itemVariants}>
                        {/* Título Principal */}
                        <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold text-slate-900 dark:text-white leading-snug">
                            Controle seu tratamento do{" "}
                            <span className="text-secondary dark:text-secondary-light">início ao fim.</span>
                        </h2>
                        {/* Descrição Principal */}
                        <p className="mt-3 sm:mt-4 text-sm sm:text-base lg:text-lg text-slate-600 dark:text-slate-300 leading-relaxed">
                            Envie sua receita, compare preços e finalize com a melhor
                            opção — tudo pelo celular.
                        </p>
                    </motion.div>

                    {/* steps */}
                    <div className="flex flex-col gap-0 mt-4">
                        {steps.map((step, index) => (
                            <motion.div 
                                key={step.title} 
                                variants={itemVariants}
                                className="flex items-start gap-4"
                            >
                                <div className="flex flex-col items-center flex-shrink-0">
                                    {/* Círculo do Número */}
                                    <div className="w-11 h-11 mt-2 rounded-xl border-2 border-secondary/40 bg-secondary/10 text-secondary dark:text-secondary-light flex items-center justify-center font-bold text-xs">
                                        {step.number}
                                    </div>
                                    {/* Linha Conectora da Timeline */}
                                    {index < steps.length - 1 && (
                                        <motion.div 
                                            className="w-px bg-secondary/20 dark:bg-secondary/40 my-1"
                                            initial={{ height: 0 }}
                                            whileInView={{ height: "2rem" }} // Equivalente ao h-8 do Tailwind
                                            viewport={{ once: true }}
                                            transition={{ delay: 0.4 + index * 0.2, duration: 0.5 }}
                                        />
                                    )}
                                </div>

                                <div className="pt-2.5 pb-6">
                                    {/* Título do Step */}
                                    <p className="font-semibold text-slate-900 dark:text-white text-base">
                                        {step.title}
                                    </p>
                                    {/* Descrição do Step */}
                                    <p className="text-sm text-slate-500 dark:text-slate-400 mt-0.5">
                                        {step.desc}
                                    </p>
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    {/* buttons */}
                    <motion.div variants={itemVariants} className="flex gap-4 flex-wrap mt-2">
                        <Button variant='primary'>
                            <Upload size={16} />
                            Enviar receita
                        </Button>

                        <Button variant='outlineDark' className="dark:border-white dark:text-white dark:hover:bg-white/10">
                            <Play size={14} className="fill-current" />
                            Ver como funciona
                        </Button>
                    </motion.div>

                </div>
            </motion.div>

            {/* mockups */}
            <div className="relative z-20 w-full lg:w-1/2 flex justify-center items-center min-h-48 sm:min-h-64 lg:min-h-screen overflow-hidden px-4 sm:px-6 pb-12 sm:pb-16 lg:pb-0">
                <motion.img
                    src="/mockups.png"
                    alt="Mockup do aplicativo Aroê mostrando a tela de cotação"
                    loading="lazy"
                    className="w-full max-w-sm lg:max-w-2xl drop-shadow-2xl dark:brightness-95 contrast-105"
                    
                    // Animação de entrada + Flutuação contínua
                    initial={{ opacity: 0, y: 50, scale: 0.95 }}
                    whileInView={{ 
                        opacity: 1, 
                        y: [0, -12, 0], // Cria o efeito de flutuar suavemente para cima e para baixo
                        scale: 1,
                        transition: {
                            y: {
                                repeat: Infinity,
                                duration: 5,
                                ease: "easeInOut"
                            },
                            opacity: { duration: 0.8 },
                            scale: { duration: 0.8 }
                        }
                    }}
                    viewport={{ once: true }}
                />
            </div>

        </section>
    )
}