import { useState } from 'react'
import { ChevronDown, Minus } from 'lucide-react'

const faqs = [
    {
        q: 'Minha receita fica segura na plataforma?',
        a: 'Sim. Sua receita é compartilhada apenas com as farmácias que você autorizar. Seguimos as diretrizes da LGPD e os dados são criptografados em trânsito e em repouso.',
    },
    {
        q: 'Como envio a minha receita?',
        a: 'Você pode tirar uma foto ou enviar um PDF diretamente pelo app ou pelo WhatsApp. O processo leva menos de dois minutos.',
    },
    {
        q: 'Quanto tempo leva para receber os orçamentos?',
        a: 'Em média, as farmácias respondem em até 2 horas. Em horário comercial, muitas respondem em menos de 30 minutos.',
    },
    {
        q: 'Como funciona o cadastro da minha farmácia?',
        a: 'O processo de cadastro é 100% digital. Você envia os documentos de alvará e CRF, nossa equipe valida em até 48h e sua farmácia já começa a receber solicitações de orçamento.',
    },
    {
        q: 'Posso falar direto com a farmácia?',
        a: 'Sim. Após receber os orçamentos, você pode entrar em contato com a farmácia escolhida.',
    },
]

export default function FaqSection() {
    const [openIndex, setOpenIndex] = useState(null)

    const toggle = (i) => setOpenIndex(openIndex === i ? null : i)

    return (
        <section className="bg-slate-50/60 dark:bg-slate-950 min-h-screen flex items-center py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-10 transition-colors duration-500">
            <div className="max-w-3xl mx-auto flex flex-col gap-8 sm:gap-10 w-full">

                {/* header */}
                <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-900 dark:text-white text-center">
                    Dúvidas Frequentes
                </h2>

                {/* accordion */}
                <div className="flex flex-col">
                    {faqs.map((faq, i) => {
                        const isOpen = openIndex === i

                        return (
                            <div 
                                key={faq.q} 
                                className="border-t border-slate-200 dark:border-slate-800 last:border-b transition-colors duration-300"
                            >
                                <button
                                    onClick={() => toggle(i)}
                                    className="w-full flex items-center justify-between gap-4 py-4 sm:py-6 text-left group"
                                >
                                    <span className={`text-sm sm:text-base font-semibold transition-colors duration-200 ${
                                        isOpen 
                                            ? 'text-secondary dark:text-secondary-light' 
                                            : 'text-slate-900 dark:text-slate-200 group-hover:text-secondary dark:group-hover:text-secondary-light'
                                    }`}>
                                        {faq.q}
                                    </span>

                                    {/* swap do icon */}
                                    <span className={`flex-shrink-0 transition-colors duration-200 ${
                                        isOpen ? 'text-secondary dark:text-secondary-light' : 'text-slate-400 dark:text-slate-500'
                                    }`}>
                                        {isOpen
                                            ? <Minus size={18} />
                                            : <ChevronDown size={18} className="transition-transform duration-200 group-hover:translate-y-0.5" />
                                        }
                                    </span>
                                </button>

                                {/* conteúdo expansível */}
                                <div className={`overflow-hidden transition-all duration-300 ease-in-out ${
                                    isOpen ? 'max-h-48 opacity-100' : 'max-h-0 opacity-0'
                                }`}>
                                    <p className="pb-4 sm:pb-6 text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                                        {faq.a}
                                    </p>
                                </div>
                            </div>
                        )
                    })}
                </div>

            </div>
        </section>
    )
}