import { ArrowRight, ShieldCheck, Tag } from 'lucide-react'

const quotes = [
    {
        name: 'Farmácia Vida',
        delivery: 'Entrega em até 2h',
        price: 'R$ 85,60',
        avatarBg: 'bg-emerald-500',
        avatarContent: '✚',
    },
    {
        name: 'Farma&Você',
        delivery: 'Entrega em até 4h',
        price: 'R$ 101,20',
        avatarBg: 'bg-violet-500', // ajustado para melhor contraste
        avatarContent: '♡',
    },
    {
        name: 'Mais Farma',
        delivery: 'Entrega em até 3h',
        price: 'R$ 142,00',
        avatarBg: 'bg-orange-500', // ajustado para melhor contraste
        avatarContent: '✚',
    },
]

function QuoteCard({ name, delivery, price, avatarBg, avatarContent }) {
    return (
        <div className="flex items-center gap-4 px-4 py-3.5 hover:bg-slate-50 dark:hover:bg-slate-800/60 rounded-2xl transition-colors duration-150 cursor-pointer group">
            <div className={`w-11 h-11 rounded-full flex-shrink-0 flex items-center justify-center text-white font-bold text-lg ${avatarBg}`}>
                {avatarContent}
            </div>
            <div className="flex-1 min-w-0">
                <p className="font-semibold text-slate-900 dark:text-white text-sm">{name}</p>
                <p className="text-xs text-slate-500 dark:text-slate-400">{delivery}</p>
            </div>
            <span className="font-bold text-sm text-secondary dark:text-secondary-light flex-shrink-0">{price}</span>
            <ArrowRight size={15} className="text-slate-400 dark:text-slate-600 flex-shrink-0 transition-transform group-hover:translate-x-0.5" />
        </div>
    )
}

export default function CompareSection() {
    return (
        /* Seção Principal com Gradientes Dinâmicos para Light/Dark Mode */
        <section className="min-h-screen flex items-center px-4 sm:px-6 lg:px-10 py-12 sm:py-16 overflow-hidden bg-gradient-to-br from-[#f0ecfb] to-[#e8f4ea] dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 transition-colors duration-500">

            <div className="max-w-5xl mx-auto w-full">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-10 lg:gap-12 items-center">

                    {/* Left Column (Texto e Resumo) */}
                    <div className="flex flex-col gap-4">

                        {/* Badge */}
                        <div className="inline-flex items-center gap-2 self-start text-xs font-semibold px-3 sm:px-4 py-1.5 sm:py-2 rounded-full bg-white/80 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200 shadow-sm">
                            <Tag size={13} className="text-slate-500 dark:text-slate-400" />
                            Veja na prática
                        </div>

                        {/* Title & Desc */}
                        <div>
                            <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold text-slate-900 dark:text-white leading-tight">
                                Compare preços <br />
                                e <span className="text-secondary dark:text-secondary-light">economize</span>
                            </h2>
                            <p className="mt-3 sm:mt-4 text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed max-w-sm">
                                Enviamos sua receita para diversas farmácias parceiras e você recebe as melhores opções para escolher.
                            </p>
                        </div>

                        <div className="flex flex-col lg:flex-row items-center lg:items-start gap-4">
                            {/* Card Receita Enviada */}
                            <div className="flex-1 w-full bg-white dark:bg-slate-900 rounded-2xl p-4 sm:p-5 flex flex-col gap-3 shadow-md border border-slate-100 dark:border-slate-800/50">

                                {/* Receita */}
                                <div className="flex items-center gap-3">
                                    <div className="w-11 h-11 rounded-xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center flex-shrink-0 relative">
                                        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" className="text-slate-700 dark:text-slate-300">
                                            <rect x="4" y="2" width="12" height="16" rx="2" stroke="currentColor" strokeWidth="1.8"/>
                                            <path d="M8 7h6M8 10h4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
                                            <circle cx="17" cy="17" r="4" fill="#4DAA5C"/>
                                            <path d="M17 15v4M15 17h4" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
                                        </svg>
                                    </div>
                                    <div>
                                        <p className="font-semibold text-slate-900 dark:text-white text-sm">Receita enviada</p>
                                        <p className="text-xs text-slate-500 dark:text-slate-400">3 medicamentos</p>
                                    </div>
                                </div>

                                {/* Economia Estimada */}
                                <div className="bg-secondary/5 dark:bg-secondary/10 rounded-xl p-4 border border-secondary/10 dark:border-secondary/20">
                                    <div className="flex items-center gap-2 mb-2">
                                        <ShieldCheck size={14} className="text-secondary dark:text-secondary-light" />
                                        <span className="text-xs text-slate-600 dark:text-slate-300 font-medium">Sua economia estimada</span>
                                    </div>
                                    <div className="flex items-baseline gap-3">
                                        <span className="font-bold text-2xl text-secondary dark:text-secondary-light">R$ 56,40</span>
                                        <span className="text-xs font-semibold text-secondary dark:text-secondary-light bg-secondary/15 dark:bg-secondary/20 px-2.5 py-0.5 rounded-full">
                                            Até 39%
                                        </span>
                                    </div>
                                </div>

                            </div>

                            {/* Arrow Conector */}
                            <div className="hidden lg:flex w-10 h-10 rounded-full bg-white dark:bg-slate-800 shadow-sm border border-slate-100 dark:border-slate-700 items-center justify-center flex-shrink-0 self-center">
                                <ArrowRight size={17} className="text-slate-700 dark:text-slate-300" />
                            </div>
                        </div>

                        <p className="text-[10px] sm:text-xs text-slate-400 dark:text-slate-500">
                            *Valores ilustrativos. Os preços podem variar.
                        </p>
                    </div>

                    {/* Right Column (Lista de Orçamentos) */}
                    <div className="bg-white dark:bg-slate-900 rounded-3xl shadow-lg border border-slate-100 dark:border-slate-800/50 p-4 sm:p-6 flex flex-col gap-1 w-full">

                        {/* Header RC */}
                        <div className="flex items-center justify-between mb-4">
                            <span className="font-semibold text-slate-900 dark:text-white text-sm sm:text-base">Orçamentos recebidos</span>
                            <span className="text-xs font-semibold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 px-3 py-1.5 rounded-full">
                                3 opções
                            </span>
                        </div>

                        {/* Lista */}
                        <div className="flex flex-col gap-1">
                            {quotes.map((q) => (
                                <QuoteCard key={q.name} {...q} />
                            ))}
                        </div>

                        {/* Banner de Incentivo */}
                        <div className="relative mt-8 bg-slate-50 dark:bg-slate-800/50 rounded-2xl px-5 py-4 flex items-center justify-between gap-3 overflow-visible border border-slate-100 dark:border-slate-700/40">
                            <div className="flex items-center gap-3">
                                <ShieldCheck size={18} className="text-secondary dark:text-secondary-light flex-shrink-0" />
                                <div>
                                    <p className="font-semibold text-slate-900 dark:text-white text-sm">Você escolhe e economiza!</p>
                                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">Mais opções, mais economia para você.</p>
                                </div>
                            </div>

                            {/* Cofrinho */}
                            <div className="relative w-20 h-12 flex-shrink-0">
                                <img
                                    src="/piggy.png"
                                    alt="Cofrinho"
                                    className="absolute -top-10 right-0 w-28 h-28 object-contain drop-shadow-lg dark:brightness-90 dark:contrast-110"
                                />
                            </div>
                        </div>

                    </div>

                </div>
            </div>
        </section>
    )
}