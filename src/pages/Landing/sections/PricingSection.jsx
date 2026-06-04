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
            icon: <Leaf size={18} className="text-secondary" />,
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
            icon: <Leaf size={18} className="text-secondary" />,
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
            icon: <Leaf size={18} className="text-primary-light" />,
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
            icon: <Leaf size={18} className="text-secondary" />,
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
            icon: <Leaf size={18} className="text-secondary" />,
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
            icon: <Leaf size={18} className="text-primary-light" />,
            features: ['Visibilidade Máxima: Topo das buscas com selo de "Farmácia Recomendada".', 'Raio de Alcance: Raio ilimitado / toda a cidade. Entregue onde quiser.', 'Mapa de Demanda (IA): A inteligência artificial (ARIA) analisa e mostra os medicamentos mais vendidos nas regiões próximas para a farmácia conseguir antecipar o estoque e não perder vendas.'],
            cta: 'Escolher este plano',
            ctaVariant: 'primary',
            highlight: true,
        },
    ],
}

const perks = [
    { icon: <CheckCircle2 size={15} className="text-secondary" />, label: 'Mais praticidade no seu dia a dia'      },
    { icon: <Zap          size={15} className="text-secondary" />, label: 'Economize tempo e dinheiro'             },
    { icon: <Heart        size={15} className="text-secondary" />, label: 'Acompanhamento simplificado'            },
    { icon: <Lock         size={15} className="text-secondary" />, label: 'Segurança e privacidade em primeiro lugar' },
]

const TABS = ['Usuários', 'Farmácias']

export default function PricingSection() {
    const [activeTab, setActiveTab] = useState('Usuários')

    return (
        <section
            className="min-h-screen flex flex-col justify-center px-4 sm:px-6 lg:px-10 py-8 sm:py-10 overflow-hidden"
            style={{ background: 'linear-gradient(160deg, #f0ecfb 0%, #e8f4ea 100%)' }}
        >
            <div className="max-w-5xl mx-auto w-full flex flex-col gap-5">

                {/* header */}
                <div className="flex flex-col items-center gap-2 text-center">

                    <div className="inline-flex items-center gap-2 text-xs font-semibold px-3 sm:px-4 py-1.5 rounded-full bg-white/70 border border-secondary/30 text-secondary">
                        <Leaf size={12} />
                        Sem compromisso • Cancele quando quiser
                    </div>

                    <h2 className="font-serif text-xl sm:text-2xl lg:text-3xl font-bold text-primary leading-snug max-w-lg">
                        Escolha como deseja simplificar{' '}
                        <span className="text-secondary">seu cuidado</span>
                    </h2>

                    <p className="text-xs text-primary/60 max-w-md px-2">
                        Planos pensados para facilitar seu tratamento com praticidade e segurança.
                    </p>

                    {/* tabs; mt-1 separa levemente do subtítulo */}
                    <div className="flex bg-white/60 rounded-full p-1 gap-1 shadow-sm mt-2">
                        {TABS.map((tab) => (
                            <button
                                key={tab}
                                onClick={() => setActiveTab(tab)}
                                className={`flex items-center gap-2 px-3 sm:px-5 py-1.5 rounded-full text-xs sm:text-sm font-semibold transition-all duration-300 ${
                                    activeTab === tab
                                        ? 'bg-primary text-white shadow-sm'
                                        : 'text-primary/50 hover:text-primary'
                                }`}
                            >
                                {tab === 'Usuários' ? <Users size={13} /> : <Store size={13} />}
                                {tab}
                            </button>
                        ))}
                    </div>
                </div>

                {/* cards; mt-3 abre espaço entre tabs e cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 items-center mt-4 sm:mt-6">
                    {plans[activeTab].map((plan) => (
                        <div
                            key={plan.id}
                            className={`relative flex flex-col gap-2.5 rounded-2xl p-4 transition-all duration-300 ${
                                plan.highlight
                                    ? 'bg-white border-2 border-secondary shadow-xl shadow-secondary/10 sm:scale-105'
                                    : 'bg-white/70 border border-white shadow-sm'
                            }`}
                        >
                            {/* badge "mais escolhido" só no highlight */}
                            {plan.highlight && (
                                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1 rounded-full bg-secondary text-white shadow-md whitespace-nowrap">
                                    <Star size={10} className="fill-white" />
                                    Mais escolhido
                                </div>
                            )}

                            {/* plan header */}
                            <div className="flex flex-col gap-1.5">
                                <div className={`w-8 h-8 rounded-xl flex items-center justify-center ${
                                    plan.highlight ? 'bg-secondary/15' : 'bg-primary/6'
                                }`}>
                                    {plan.icon}
                                </div>
                                <div>
                                    <p className={`font-bold text-base ${plan.highlight ? 'text-secondary' : 'text-primary'}`}>
                                        {plan.name}
                                    </p>
                                    <p className="text-xs text-primary/55 leading-relaxed">{plan.desc}</p>
                                </div>
                            </div>

                            <hr className="border-gray-100" />

                            {/* preço */}
                            <div className="flex items-baseline gap-0.5">
                                <span className="text-xs text-primary/50 font-medium">R$</span>
                                <span className="font-serif text-2xl font-bold text-primary">
                                    {plan.price === 0 ? '0' : plan.price.toFixed(2).replace('.', ',')}
                                </span>
                                <span className="text-xs text-primary/50 ml-1">/mês</span>
                            </div>

                            {/* features */}
                            <ul className="flex flex-col gap-1.5">
                                {plan.features.map((f) => (
                                    <li key={f} className="flex items-center gap-2 text-xs text-primary/70">
                                        <CheckCircle2 size={13} className="text-secondary flex-shrink-0" />
                                        {f}
                                    </li>
                                ))}
                            </ul>

                            {/* cta */}
                            <Button
                                variant={plan.ctaVariant}
                                className={`w-full justify-center mt-1 ${plan.highlight ? '!bg-secondary !text-white hover:!bg-secondary/90 !border-0' : ''}`}
                            >
                                {plan.cta}
                            </Button>
                        </div>
                    ))}
                </div>

                {/* segurança */}
                <p className="flex items-center gap-1.5 text-xs text-primary/40 justify-center">
                    <Lock size={11} />
                    Seus dados estão protegidos com segurança.
                </p>

                {/* perks */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {perks.map((perk) => (
                        <div key={perk.label} className="flex items-center gap-2">
                            <div className="w-7 h-7 rounded-lg bg-white/70 flex items-center justify-center flex-shrink-0 shadow-sm">
                                {perk.icon}
                            </div>
                            <p className="text-xs text-primary/60 leading-snug">{perk.label}</p>
                        </div>
                    ))}
                </div>

            </div>
        </section>
    )
}
