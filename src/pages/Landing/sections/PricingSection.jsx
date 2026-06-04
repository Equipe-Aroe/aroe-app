import { useState } from 'react'
import { CheckCircle2, Users, Store, Leaf, Zap, Heart, Lock, Star } from 'lucide-react'
import Button from '../../../components/ui/Button'

const plans = {
    Usuários: [
        {
            id: 'broto',
            name: 'Broto',
            desc: 'Ideal para começar a cuidar da sua saúde com mais praticidade.',
            price: 0,
            icon: <Leaf size={18} className="text-secondary dark:text-secondary-light" />,
            features: ['Enviar receitas', 'Receber orçamentos', 'Comparar preços'],
            cta: 'Começar gratuitamente',
            ctaVariant: 'outlineDark',
            highlight: false,
        },
        {
            id: 'raiz',
            name: 'Raiz',
            desc: 'Mais agilidade e benefícios para acompanhar seu tratamento.',
            price: 9.90,
            icon: <Leaf size={18} className="text-secondary dark:text-secondary-light" />,
            features: ['Tudo do plano Broto', 'Receber orçamentos mais rápido', 'Destaque nas farmácias', 'Histórico completo', 'Custom Data Retention'],
            cta: 'Escolher este plano',
            ctaVariant: 'primary',
            highlight: true,
        },
        {
            id: 'aroeira',
            name: 'Aroeira',
            desc: 'Experiência completa com prioridade e suporte personalizado.',
            price: 19.90,
            icon: <Leaf size={18} className="text-secondary dark:text-secondary-light" />,
            features: ['Tudo do plano Raiz', 'Prioridade máxima', 'Suporte prioritário', 'Recomendações inteligentes'],
            cta: 'Escolher este plano',
            ctaVariant: 'outlineDark',
            highlight: false,
        },
    ],
    Farmácias: [
        {
            id: 'broto',
            name: 'Broto',
            desc: 'O essencial para começar a receber receitas digitais sem custo fixo.',
            price: 0,
            icon: <Leaf size={18} className="text-secondary dark:text-secondary-light" />,
            features: ['Visibilidade Padrão: Aparece nas buscas orgânicas da região.', 'Raio de Alcance: Recebe pedidos num raio de até 5km.', 'Entrega: Focada no bairro/vizinhança.'],
            cta: 'Começar gratuitamente',
            ctaVariant: 'outlineDark',
            highlight: false,
        },
        {
            id: 'raiz',
            name: 'Raiz',
            desc: 'Para farmácias que querem expandir sua base de clientes e entregar mais longe.',
            price: 49.99,
            icon: <Leaf size={18} className="text-secondary dark:text-secondary-light" />,
            features: ['Maior Visibilidade: Destaque acima dos planos gratuitos nas buscas.', 'Raio de Alcance: Recebe pedidos num raio de até 15km.', 'Entrega: Abrange múltiplas regiões da cidade.'],
            cta: 'Escolher este plano',
            ctaVariant: 'outlineDark',
            highlight: false,
        },
        {
            id: 'aroeira',
            name: 'Aroeira',
            desc: 'Experiência completa com alcance máximo e inteligência artificial para o seu negócio.',
            price: 99.90,
            icon: <Leaf size={18} className="text-secondary dark:text-secondary-light" />,
            features: ['Visibilidade Máxima: Topo das buscas com selo de "Farmácia Recomendada".', 'Raio de Alcance: Raio ilimitado / toda a cidade. Entregue onde quiser.', 'Mapa de Demanda (IA): A inteligência artificial (ARIA) analisa e mostra os medicamentos mais vendidos nas regiões próximas.'],
            cta: 'Escolher este plano',
            ctaVariant: 'primary',
            highlight: true,
        },
    ],
}

const perks = [
    { icon: <CheckCircle2 size={15} className="text-secondary dark:text-secondary-light" />, label: 'Mais praticidade no seu dia a dia'      },
    { icon: <Zap          size={15} className="text-secondary dark:text-secondary-light" />, label: 'Economize tempo e dinheiro'             },
    { icon: <Heart        size={15} className="text-secondary dark:text-secondary-light" />, label: 'Acompanhamento simplificado'            },
    { icon: <Lock         size={15} className="text-secondary dark:text-secondary-light" />, label: 'Segurança e privacidade em primeiro lugar' },
]

const TABS = ['Usuários', 'Farmácias']

export default function PricingSection() {
    const [activeTab, setActiveTab] = useState('Usuários')

    return (
        <section className="min-h-screen flex flex-col justify-center px-4 sm:px-6 lg:px-10 py-12 sm:py-16 overflow-hidden bg-gradient-to-br from-[#f0ecfb] to-[#e8f4ea] dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 transition-colors duration-500">
            <div className="max-w-5xl mx-auto w-full flex flex-col gap-8">

                {/* Header */}
                <div className="flex flex-col items-center gap-3 text-center">

                    {/* Badge */}
                    <div className="inline-flex items-center gap-2 text-xs font-semibold px-4 py-1.5 rounded-full bg-white/70 dark:bg-slate-900/80 border border-secondary/30 dark:border-secondary/40 text-secondary dark:text-secondary-light shadow-sm">
                        <Leaf size={12} />
                        Sem compromisso • Cancele quando quiser
                    </div>

                    <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-900 dark:text-white leading-snug max-w-lg">
                        Escolha como deseja simplificar{' '}
                        <span className="text-secondary dark:text-secondary-light">seu cuidado</span>
                    </h2> 

                    <p className="text-sm text-slate-600 dark:text-slate-400 max-w-md px-2">
                        Planos pensados para facilitar seu tratamento com praticidade e segurança.
                    </p>

                    {/* Tabs Segmentadas */}
                    <div className="flex bg-white/60 dark:bg-slate-900/60 backdrop-blur-sm rounded-full p-1 gap-1 shadow-inner mt-2 border border-slate-200/50 dark:border-slate-800">
                        {TABS.map((tab) => (
                            <button
                                key={tab}
                                onClick={() => setActiveTab(tab)}
                                className={`flex items-center gap-2 px-4 sm:px-6 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all duration-300 ${
                                    activeTab === tab
                                        ? 'bg-slate-900 dark:bg-white text-white dark:text-slate-900 shadow-md'
                                        : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                                }`}
                            >
                                {tab === 'Usuários' ? <Users size={14} /> : <Store size={14} />}
                                {tab}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Cards Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch mt-2">
                    {plans[activeTab].map((plan) => (
                        <div
                            key={plan.id}
                            className={`relative flex flex-col justify-between rounded-2xl p-6 transition-all duration-300 ${
                                plan.highlight
                                    ? 'bg-white dark:bg-slate-900 border-2 border-secondary dark:border-secondary-light shadow-xl shadow-secondary/10 dark:shadow-secondary/5 sm:scale-105 z-10'
                                    : 'bg-white/80 dark:bg-slate-900/50 backdrop-blur-sm border border-slate-200/60 dark:border-slate-800 shadow-sm'
                            }`}
                        >
                            {/* Destaque "Mais escolhido" */}
                            {plan.highlight && (
                                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 inline-flex items-center gap-1.5 text-xs font-semibold px-4 py-1 rounded-full bg-secondary dark:bg-secondary-light text-white dark:text-slate-950 shadow-md whitespace-nowrap">
                                    <Star size={10} className="fill-current" />
                                    Mais escolhido
                                </div>
                            )}

                            {/* Conteúdo Superior */}
                            <div className="flex flex-col gap-4">
                                <div className="flex flex-col gap-2">
                                    <div className={`w-9 h-9 rounded-xl flex items-center justify-center ${
                                        plan.highlight ? 'bg-secondary/15 dark:bg-secondary/20' : 'bg-slate-100 dark:bg-slate-800'
                                    }`}>
                                        {plan.icon}
                                    </div>
                                    <div>
                                        <p className={`font-bold text-lg ${plan.highlight ? 'text-secondary dark:text-secondary-light' : 'text-slate-900 dark:text-white'}`}>
                                            {plan.name}
                                        </p>
                                        <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5 leading-relaxed">{plan.desc}</p>
                                    </div>
                                </div>

                                <hr className="border-slate-100 dark:border-slate-800" />

                                {/* Preço */}
                                <div className="flex items-baseline gap-1">
                                    <span className="text-xs text-slate-400 dark:text-slate-500 font-medium">R$</span>
                                    <span className="font-serif text-3xl font-bold text-slate-900 dark:text-white">
                                        {plan.price === 0 ? '0' : plan.price.toFixed(2).replace('.', ',')}
                                    </span>
                                    <span className="text-xs text-slate-400 dark:text-slate-500 ml-0.5">/mês</span>
                                </div>

                                {/* Features */}
                                <ul className="flex flex-col gap-2.5 my-2">
                                    {plan.features.map((f) => (
                                        <li key={f} className="flex items-start gap-2 text-xs text-slate-600 dark:text-slate-300 leading-snug">
                                            <CheckCircle2 size={14} className="text-secondary dark:text-secondary-light flex-shrink-0 mt-0.5" />
                                            <span>{f}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            {/* Botão de Ação Inferior */}
                            <div className="mt-4">
                                <Button
                                    variant={plan.ctaVariant}
                                    className={`w-full justify-center ${
                                        plan.highlight 
                                            ? '!bg-secondary dark:!bg-secondary-light !text-white dark:!text-slate-950 hover:opacity-90 transition-opacity !border-0' 
                                            : 'dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-800'
                                    }`}
                                >
                                    {plan.cta}
                                </Button>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Footer de Segurança */}
                <p className="flex items-center gap-1.5 text-xs text-slate-400 dark:text-slate-500 justify-center mt-2">
                    <Lock size={12} />
                    Seus dados estão protegidos com segurança ponta a ponta.
                </p>

                {/* Grid de Benefícios Extras (Perks) */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mt-4 pt-6 border-t border-slate-200/60 dark:border-slate-800/80">
                    {perks.map((perk) => (
                        <div key={perk.label} className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-xl bg-white/80 dark:bg-slate-900/60 border border-slate-100 dark:border-slate-800/50 flex items-center justify-center flex-shrink-0 shadow-sm">
                                {perk.icon}
                            </div>
                            <p className="text-xs font-medium text-slate-600 dark:text-slate-400 leading-snug">{perk.label}</p>
                        </div>
                    ))}
                </div>

            </div>
        </section>
    )
}