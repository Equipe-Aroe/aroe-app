import { CheckCircle2, Store, Leaf, Zap, ShieldCheck, Star, LineChart } from 'lucide-react'
import Button from '../../../components/ui/Button'

const plans = [
    {
        id: 'broto',
        name: 'Plano Broto',
        desc: 'O essencial para receber orçamentos digitais e começar no marketplace sem custo fixo.',
        price: 0,
        icon: <Leaf size={18} className="text-secondary dark:text-secondary-light" />,
        features: [
            'Painel Web padrão para recebimento passivo de orçamentos.',
            'Exibição padrão nas buscas orgânicas por preço ou distância.',
            'Take Rate padrão de 12% por pedido liquidado.'
        ],
        cta: 'Começar gratuitamente',
        ctaVariant: 'outlineDark',
        highlight: false,
    },
    {
        id: 'raiz',
        name: 'Plano Raiz',
        desc: 'Para laboratórios que buscam recorrência automatizada e fidelização de clientes.',
        price: 199.00,
        icon: <Zap size={18} className="text-secondary dark:text-secondary-light" />,
        features: [
            'Todas as ferramentas do plano Broto.',
            'Módulo de controle de posologia via app do paciente.',
            'Gatilho de Recompra Automática disparado no 25º dia de tratamento.',
            'Retenção inteligente direcionando a renovação para o seu caixa.'
        ],
        cta: 'Escolher plano Raiz',
        ctaVariant: 'outlineDark',
        highlight: false,
    },
    {
        id: 'aroeira',
        name: 'Plano Aroeira',
        desc: 'Experiência enterprise com inteligência de mercado, integração ERP e alcance máximo.',
        price: 499.00,
        icon: <LineChart size={18} className="text-secondary dark:text-secondary-light" />,
        features: [
            'Todas as automações do plano Raiz.',
            'Selo de "Farmácia Recomendada" e topo das buscas regionais.',
            'Integração direta via API restrita com o ERP interno da sua rede.',
            'Painel IA de Predição de Demanda Regional (Insumos/Matérias-primas).',
            'Bônus de performance: Take Rate reduzido para até 10% por volume.'
        ],
        cta: 'Escolher plano Aroeira',
        ctaVariant: 'primary',
        highlight: true,
    },
]

const perks = [
    { icon: <Store size={15} className="text-secondary dark:text-secondary-light" />, label: 'Canal exclusivo de vendas B2B' },
    { icon: <Zap size={15} className="text-secondary dark:text-secondary-light" />, label: 'Automação de gatilhos de recompra' },
    { icon: <LineChart size={15} className="text-secondary dark:text-secondary-light" />, label: 'Predição de demanda por IA (ARIA)' },
    { icon: <ShieldCheck size={15} className="text-secondary dark:text-secondary-light" />, label: 'Split de pagamento direto e seguro' },
]

export default function PricingSection() {
    return (
        <section className="min-h-screen flex flex-col justify-center px-4 sm:px-6 lg:px-10 py-12 sm:py-16 overflow-hidden bg-gradient-to-br from-[#f0ecfb] to-[#e8f4ea] dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 transition-colors duration-500">
            <div className="max-w-5xl mx-auto w-full flex flex-col gap-8">

                {/* Header */}
                <div className="flex flex-col items-center gap-3 text-center">
                    
                    {/* Badge */}
                    <div className="inline-flex items-center gap-2 text-xs font-semibold px-4 py-1.5 rounded-full bg-white/70 dark:bg-slate-900/80 border border-secondary/30 dark:border-secondary/40 text-secondary dark:text-secondary-light shadow-sm">
                        <Leaf size={12} />
                        Infraestrutura digital SaaS para o Mercado Magistral
                    </div>

                    <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-900 dark:text-white leading-snug max-w-xl">
                        Aumente o faturamento de sua farmácia com{' '}
                        <span className="text-secondary dark:text-secondary-light">tecnologia recorrente.</span>
                    </h2> 

                    <p className="text-sm text-slate-600 dark:text-slate-400 max-w-md px-2">
                        Escolha o plano ideal para escalar a operação de manipulação do seu laboratório, reduzir custos com insumos e fidelizar pacientes de forma ativa.
                    </p>
                </div>

                {/* Cards Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch mt-4">
                    {plans.map((plan) => (
                        <div
                            key={plan.id}
                            className={`relative flex flex-col justify-between rounded-2xl p-6 transition-all duration-300 ${
                                plan.highlight
                                    ? 'bg-white dark:bg-slate-900 border-2 border-secondary dark:border-secondary-light shadow-xl shadow-secondary/10 dark:shadow-secondary/5 md:scale-105 z-10'
                                    : 'bg-white/80 dark:bg-slate-900/50 backdrop-blur-sm border border-slate-200/60 dark:border-slate-800 shadow-sm'
                            }`}
                        >
                            {/* Destaque "Mais escolhido" */}
                            {plan.highlight && (
                                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 inline-flex items-center gap-1.5 text-xs font-semibold px-4 py-1 rounded-full bg-secondary dark:bg-secondary-light text-white dark:text-slate-950 shadow-md whitespace-nowrap">
                                    <Star size={10} className="fill-current" />
                                    Máxima Performance
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
                                    {plan.features.map((feature, idx) => (
                                        <li key={idx} className="flex items-start gap-2 text-xs text-slate-600 dark:text-slate-300 leading-snug">
                                            <CheckCircle2 size={14} className="text-secondary dark:text-secondary-light flex-shrink-0 mt-0.5" />
                                            <span>{feature}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            {/* Botão de Ação Inferior */}
                            <div className="mt-6">
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

                {/* Grid de Benefícios Extras (Perks) */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mt-8 pt-6 border-t border-slate-200/60 dark:border-slate-800/80">
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