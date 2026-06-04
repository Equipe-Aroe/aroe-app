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
        avatarBg: 'bg-violet-400',
        avatarContent: '♡',
    },
    {
        name: 'Mais Farma',
        delivery: 'Entrega em até 3h',
        price: 'R$ 142,00',
        avatarBg: 'bg-orange-400',
        avatarContent: '✚',
    },
]

function QuoteCard({ name, delivery, price, avatarBg, avatarContent }) {
    return (
        <div className="flex items-center gap-4 px-4 py-3.5 hover:bg-gray-50 rounded-2xl transition-colors duration-150 cursor-pointer">
            <div className={`w-11 h-11 rounded-full flex-shrink-0 flex items-center justify-center text-white font-bold text-lg ${avatarBg}`}>
                {avatarContent}
            </div>
            <div className="flex-1 min-w-0">
                <p className="font-semibold text-primary text-sm">{name}</p>
                <p className="text-xs text-primary/50">{delivery}</p>
            </div>
            <span className="font-bold text-sm text-secondary flex-shrink-0">{price}</span>
            <ArrowRight size={15} className="text-primary/30 flex-shrink-0" />
        </div>
    )
}

export default function CompareSection() {
    return (
        /* bg */
        <section className="min-h-screen flex items-center px-4 sm:px-6 lg:px-10 py-12 sm:py-16 overflow-hidden"
            style={{ background: 'linear-gradient(135deg, #f0ecfb 0%, #e8f4ea 100%)' }}>

            <div className="max-w-5xl mx-auto w-full">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-10 lg:gap-12 items-center">

                    {/* left col */}
                    <div className="flex flex-col gap-4">

                        {/* badge */}
                        <div className="inline-flex items-center gap-2 self-start text-xs font-semibold px-3 sm:px-4 py-1.5 sm:py-2 rounded-full bg-white/80 border border-primary/15 text-primary shadow-sm">
                            <Tag size={13} className="text-primary/60" />
                            Veja na prática
                        </div>

                        {/* title */}
                        <div>
                            <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold text-primary leading-tight">
                                Compare preços <br />
                                e <span className="text-secondary">economize</span>
                            </h2>
                            <p className="mt-3 sm:mt-4 text-sm sm:text-base text-primary/60 leading-relaxed max-w-xs">
                                Enviamos sua receita para diversas farmácias parceiras e você recebe as melhores opções para escolher.
                            </p>
                        </div>

                        <div className="flex flex-col lg:flex-row items-center lg:items-start gap-4">
                            <div className="flex-1 w-full bg-white rounded-2xl p-4 sm:p-5 flex flex-col gap-3 shadow-sm border border-white">

                                {/* receita */}
                                <div className="flex items-center gap-3">
                                    <div className="w-11 h-11 rounded-xl bg-primary/8 flex items-center justify-center flex-shrink-0 relative">
                                        {/* Ícon receita com o +zinho no canto */}
                                        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" className="text-primary">
                                            <rect x="4" y="2" width="12" height="16" rx="2" stroke="currentColor" strokeWidth="1.8"/>
                                            <path d="M8 7h6M8 10h4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
                                            <circle cx="17" cy="17" r="4" fill="#4DAA5C"/>
                                            <path d="M17 15v4M15 17h4" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
                                        </svg>
                                    </div>
                                    <div>
                                        <p className="font-semibold text-primary text-sm">Receita enviada</p>
                                        <p className="text-xs text-primary/50">3 medicamentos</p>
                                    </div>
                                </div>

                                {/* card left */}
                                <div className="bg-secondary-light/60 rounded-xl p-4 border border-secondary/15">
                                    <div className="flex items-center gap-2 mb-2">
                                        <ShieldCheck size={14} className="text-secondary" />
                                        <span className="text-xs text-primary/60 font-medium">Sua economia estimada</span>
                                    </div>
                                    <div className="flex items-baseline gap-3">
                                        <span className="font-bold text-2xl text-secondary">R$ 56,40</span>
                                        <span className="text-xs font-semibold text-secondary bg-secondary/15 px-2.5 py-0.5 rounded-full">
                                            Até 39%
                                        </span>
                                    </div>
                                </div>

                            </div>

                            {/* arrow */}
                            <div className="hidden lg:flex w-10 h-10 rounded-full bg-white shadow-sm border border-gray-100 items-center justify-center flex-shrink-0">
                                <ArrowRight size={17} className="text-primary" />
                            </div>
                        </div>

                        <p className="text-xs text-primary/35">
                            *Valores ilustrativos. Os preços podem variar.
                        </p>
                    </div>

                    {/* right col */}
                    <div className="bg-white rounded-3xl shadow-md border border-white p-4 sm:p-6 flex flex-col gap-1 w-full">

                        {/* header rc */}
                        <div className="flex items-center justify-between mb-4">
                            <span className="font-semibold text-primary">Orçamentos recebidos</span>
                            <span className="text-xs font-semibold bg-primary/8 text-primary px-3 py-1.5 rounded-full">
                                3 opções
                            </span>
                        </div>

                        
                        <div className="flex flex-col gap-1">
                            {quotes.map((q) => (
                                <QuoteCard key={q.name} {...q} />
                            ))}
                        </div>

                        {/* banner do cofrin */}
                        <div className="relative mt-8 bg-primary-light/15 rounded-2xl px-5 py-4 flex items-center justify-between gap-3 overflow-visible">
                            <div className="flex items-center gap-3">
                                <ShieldCheck size={18} className="text-primary/60 flex-shrink-0" />
                                <div>
                                    <p className="font-semibold text-primary text-sm">Você escolhe e economiza!</p>
                                    <p className="text-xs text-primary/55 mt-0.5">Mais opções, mais economia para você.</p>
                                </div>
                            </div>

                            {/* cofrinho */}
                            <div className="relative w-20 h-12 flex-shrink-0">
                                <img
                                    src="/piggy.png"
                                    alt="Cofrinho"
                                    className="absolute -top-10 right-0 w-28 h-28 object-contain drop-shadow-lg"
                                />
                            </div>
                        </div>

                    </div>

                </div>
            </div>
        </section>
    )
}