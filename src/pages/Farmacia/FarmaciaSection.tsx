import React, { useState } from "react";
import {
    Building2,
    TrendingUp,
    ShieldCheck,
    Clock3,
    CheckCircle2,
    Users,
    BadgeCheck,
    ArrowRight,
    FileText,
    Calculator,
    Handshake,
} from "lucide-react";

import Button from "../../components/ui/Button";
import Header from "../../components/layout/Navbar";
import { scrollToSection } from "../../utils/scrollToSection";

interface FarmaciaFormData {
    nomeFarmacia: string;
    cnpj: string;
    responsavel: string;
    whatsapp: string;
    email: string;
    cidade: string;
}

const metrics = [
    {
        title: "24h",
        subtitle: "Tempo médio para análise",
    },
    {
        title: "100%",
        subtitle: "Receitas digitais",
    },
    {
        title: "12%",
        subtitle: "Comissão apenas sobre vendas",
    },
];

const benefits = [
    {
        icon: TrendingUp,
        title: "Mais pedidos",
        description:
            "Receba solicitações de orçamento diariamente sem investir em anúncios ou prospecção.",
        items: [
            "Novos pacientes",
            "Maior faturamento",
            "Mais visibilidade",
        ],
    },
    {
        icon: Clock3,
        title: "Economize tempo",
        description:
            "Receitas organizadas automaticamente para sua equipe apenas calcular e responder.",
        items: [
            "Sem retrabalho",
            "Sem digitação",
            "Fluxo otimizado",
        ],
    },
    {
        icon: ShieldCheck,
        title: "Ambiente seguro",
        description:
            "Somente farmácias homologadas participam da plataforma, garantindo confiança para todos.",
        items: [
            "Validação",
            "Segurança",
            "Concorrência justa",
        ],
    },
];

const steps = [
    {
        icon: Building2,
        title: "Cadastre sua farmácia",
        description:
            "Preencha seus dados e envie sua solicitação de credenciamento.",
    },
    {
        icon: FileText,
        title: "Receba receitas",
        description:
            "Os pedidos chegam organizados diretamente no painel da plataforma.",
    },
    {
        icon: Calculator,
        title: "Envie seu orçamento",
        description:
            "Calcule o pedido rapidamente e envie sua proposta ao paciente.",
    },
    {
        icon: Handshake,
        title: "Conclua a venda",
        description:
            "Ganhe novos clientes e aumente o faturamento da sua farmácia.",
    },
];

const faq = [
    {
        question: "Existe mensalidade?",
        answer:
            "Não. A Aroê cobra apenas uma comissão de 12% sobre pedidos concluídos através da plataforma.",
    },
    {
        question: "Quanto tempo leva a aprovação?",
        answer:
            "Nossa equipe realiza a análise cadastral normalmente em até 24 horas úteis.",
    },
    {
        question: "Posso cancelar quando quiser?",
        answer:
            "Sim. Não há fidelidade ou multa para encerramento da parceria.",
    },
    {
        question: "Como recebo os pedidos?",
        answer:
            "Todos os pedidos ficam disponíveis em um painel exclusivo para sua farmácia.",
    },
];

export default function FarmaciaSection() {
    const [openFaq, setOpenFaq] = useState<number | null>(0);

    const [formData, setFormData] = useState<FarmaciaFormData>({
        nomeFarmacia: "",
        cnpj: "",
        responsavel: "",
        whatsapp: "",
        email: "",
        cidade: "",
    });

    const maskCNPJ = (value: string) =>
        value
            .replace(/\D/g, "")
            .replace(/^(\d{2})(\d)/, "$1.$2")
            .replace(/^(\d{2})\.(\d{3})(\d)/, "$1.$2.$3")
            .replace(/\.(\d{3})(\d)/, ".$1/$2")
            .replace(/(\d{4})(\d)/, "$1-$2")
            .substring(0, 18);

    const maskWhatsApp = (value: string) =>
        value
            .replace(/\D/g, "")
            .replace(/^(\d{2})(\d)/, "($1) $2")
            .replace(/(\d{5})(\d)/, "$1-$2")
            .substring(0, 15);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;

        let newValue = value;

        if (name === "cnpj") newValue = maskCNPJ(value);
        if (name === "whatsapp") newValue = maskWhatsApp(value);

        setFormData((prev) => ({
            ...prev,
            [name]: newValue,
        }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log(formData);
    };

    const renderInput = (
        label: string,
        name: keyof FarmaciaFormData,
        type: string,
        placeholder: string
    ) => (
        <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                {label}
            </label>

            <input
                type={type}
                name={name}
                value={formData[name]}
                onChange={handleChange}
                required
                placeholder={placeholder}
                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none transition-all focus:border-primary focus:bg-white focus:ring-4 focus:ring-primary/10 dark:border-slate-700 dark:bg-slate-900 dark:text-white dark:placeholder-slate-500 dark:focus:border-primary dark:focus:bg-slate-900"
            />
        </div>
    );

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-950 relative overflow-hidden transition-colors duration-300">
            {/* Background */}
            <div className="absolute inset-0 -z-10 overflow-hidden">
                <div className="absolute -top-60 left-1/2 h-[650px] w-[650px] -translate-x-1/2 rounded-full bg-primary/15 blur-3xl dark:bg-primary/10" />
                <div className="absolute top-80 -left-40 h-96 w-96 rounded-full bg-secondary/20 blur-3xl dark:bg-secondary/10" />
                <div className="absolute right-0 bottom-0 h-[450px] w-[450px] rounded-full bg-primary/10 blur-3xl dark:bg-primary/5" />
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#e2e8f020_1px,transparent_1px),linear-gradient(to_bottom,#e2e8f020_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,#33415510_1px,transparent_1px),linear-gradient(to_bottom,#33415510_1px,transparent_1px)] bg-[size:60px_60px]" />
            </div>

            <main id="heroFarmacia" className="pt-32 pb-24">
                <div className="max-w-7xl mx-auto px-6">
                    {/* Wave/Blur decorativo no topo */}
                    <div className="absolute top-0 left-0 w-full overflow-hidden pointer-events-none z-10">
                        <svg viewBox="0 0 1440 140" className="w-full h-auto" preserveAspectRatio="none">
                            <path
                                className="fill-[#2A1F5E] dark:fill-slate-900 transition-colors duration-500"
                                d="M0,90L120,93.3C240,97,480,103,720,100C960,97,1200,83,1320,76.7L1440,70L1440,0L1320,0C1200,0,960,0,720,0C480,0,240,0,120,0L0,0Z"
                            />
                        </svg>
                    </div>

                    {/* HERO */}
                    <section className="grid lg:grid-cols-2 gap-20 items-center z-10 relative">
                        {/* Texto */}
                        <div>
                            <span className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 text-sm font-semibold text-primary dark:bg-primary/20 dark:text-primary-light z-10">
                                <BadgeCheck size={16} />
                                Programa de Parceiros Aroê
                            </span>

                            <h1 className="mt-6 text-5xl lg:text-6xl font-bold leading-tight text-slate-900 dark:text-white">
                                Aumente o faturamento da sua
                                <span className="text-primary dark:text-primary-light"> farmácia de manipulação.</span>
                            </h1>

                            <p className="mt-6 text-lg leading-8 text-slate-600 dark:text-slate-400 max-w-xl">
                                Receba receitas digitais prontas para orçamento, reduza o tempo
                                gasto com atendimento via WhatsApp e conquiste novos clientes
                                através da plataforma Aroê.
                            </p>

                            <div className="mt-8 flex flex-wrap gap-4">
                                <Button
                                    onClick={() => scrollToSection("cadastro")}
                                    className="px-8 py-4 rounded-xl bg-primary hover:bg-primary-dark text-white shadow-lg transition-all"
                                >
                                    Quero ser parceiro
                                </Button>

                                <Button
                                    onClick={() => scrollToSection("dashboard")}
                                    className="px-8 py-4 rounded-xl bg-slate-200 hover:bg-slate-300 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-900 dark:text-white shadow-lg transition-all"
                                >
                                    Conhecer plataforma
                                </Button>
                            </div>

                            <div className="mt-10 grid sm:grid-cols-3 gap-5">
                                {metrics.map((metric) => (
                                    <div key={metric.title} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900/50">
                                        <h3 className="text-3xl font-bold text-primary dark:text-primary-light">
                                            {metric.title}
                                        </h3>
                                        <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
                                            {metric.subtitle}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Mockup */}
                        <div className="relative">
                            <div className="absolute -inset-5 rounded-[40px] bg-primary/10 blur-3xl dark:bg-primary/5" />
                            <div className="relative overflow-hidden rounded-[32px] border border-slate-200 bg-white shadow-2xl dark:border-slate-800 dark:bg-slate-900">
                                <div className="border-b border-slate-200 p-5 dark:border-slate-800">
                                    <div className="flex items-center gap-2">
                                        <div className="h-3 w-3 rounded-full bg-red-400" />
                                        <div className="h-3 w-3 rounded-full bg-yellow-400" />
                                        <div className="h-3 w-3 rounded-full bg-green-400" />
                                    </div>
                                </div>

                                <div className="p-8">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <p className="text-sm text-slate-500 dark:text-slate-400">Dashboard</p>
                                            <h2 className="text-2xl font-bold mt-1 text-slate-900 dark:text-white">Pedidos recebidos</h2>
                                        </div>
                                        <div className="rounded-xl bg-green-100 px-4 py-2 text-green-700 font-semibold dark:bg-green-950/50 dark:text-green-400">
                                            +18%
                                        </div>
                                    </div>

                                    <div className="mt-8 grid grid-cols-2 gap-5">
                                        <div className="rounded-2xl bg-slate-100 p-5 dark:bg-slate-800/50">
                                            <p className="text-sm text-slate-500 dark:text-slate-400">Pedidos</p>
                                            <h3 className="mt-2 text-3xl font-bold text-slate-900 dark:text-white">124</h3>
                                        </div>
                                        <div className="rounded-2xl bg-slate-100 p-5 dark:bg-slate-800/50">
                                            <p className="text-sm text-slate-500 dark:text-slate-400">Orçamentos</p>
                                            <h3 className="mt-2 text-3xl font-bold text-slate-900 dark:text-white">97</h3>
                                        </div>
                                        <div className="rounded-2xl bg-slate-100 p-5 dark:bg-slate-800/50">
                                            <p className="text-sm text-slate-500 dark:text-slate-400">Conversão</p>
                                            <h3 className="mt-2 text-3xl font-bold text-slate-900 dark:text-white">78%</h3>
                                        </div>
                                        <div className="rounded-2xl bg-slate-100 p-5 dark:bg-slate-800/50">
                                            <p className="text-sm text-slate-500 dark:text-slate-400">Receita</p>
                                            <h3 className="mt-2 text-3xl font-bold text-slate-900 dark:text-white">R$ 42 mil</h3>
                                        </div>
                                    </div>

                                    <div className="mt-8 rounded-2xl border border-slate-200 p-5 dark:border-slate-800 dark:bg-slate-900">
                                        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                                            <div>
                                                <h4 className="font-semibold text-slate-900 dark:text-white">Nova receita recebida</h4>
                                                <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                                                    Manipulação • 12 medicamentos
                                                </p>
                                            </div>
                                            <Button
                                                onClick={() => scrollToSection("dashboard")}
                                                className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-primary hover:bg-primary-dark text-white text-sm shadow-md"
                                            >
                                                Visualizar
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* BENEFÍCIOS */}
                    <section className="mt-32">
                        <div className="text-center">
                            <span className="rounded-full bg-primary/10 px-4 py-2 text-sm font-semibold text-primary dark:bg-primary/20 dark:text-primary-light">
                                Benefícios
                            </span>
                            <h2 className="mt-5 text-4xl font-bold text-slate-900 dark:text-white">
                                Por que fazer parte da Aroê?
                            </h2>
                            <p className="mt-5 max-w-2xl mx-auto text-slate-600 dark:text-slate-400">
                                Desenvolvemos uma plataforma para reduzir o tempo gasto no
                                atendimento e aumentar o número de pedidos recebidos pela sua farmácia.
                            </p>
                        </div>

                        <div className="mt-14 grid lg:grid-cols-3 gap-8">
                            {benefits.map((benefit) => {
                                const Icon = benefit.icon;
                                return (
                                    <div key={benefit.title} className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm transition hover:-translate-y-2 hover:shadow-xl dark:border-slate-800 dark:bg-slate-900/40">
                                        <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10 dark:bg-primary/20">
                                            <Icon className="text-primary dark:text-primary-light" size={30} />
                                        </div>
                                        <h3 className="mt-6 text-2xl font-bold text-slate-900 dark:text-white">{benefit.title}</h3>
                                        <p className="mt-4 text-slate-600 dark:text-slate-400 leading-7">{benefit.description}</p>
                                        <div className="mt-6 space-y-3">
                                            {benefit.items.map((item) => (
                                                <div key={item} className="flex items-center gap-3">
                                                    <CheckCircle2 size={18} className="text-green-600 dark:text-green-400 flex-shrink-0" />
                                                    <span className="text-slate-700 dark:text-slate-300">{item}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </section>

                    {/* COMO FUNCIONA */}
                    <section className="mt-32">
                        <div className="text-center">
                            <span className="rounded-full bg-primary/10 px-4 py-2 text-sm font-semibold text-primary dark:bg-primary/20 dark:text-primary-light">
                                Como funciona
                            </span>
                            <h2 className="mt-5 text-4xl font-bold text-slate-900 dark:text-white">
                                Da solicitação até a venda
                            </h2>
                            <p className="mt-5 max-w-3xl mx-auto text-slate-600 dark:text-slate-400 leading-8">
                                Todo o processo acontece digitalmente, reduzindo o tempo gasto
                                com atendimento manual e aumentando a produtividade da equipe.
                            </p>
                        </div>

                        <div className="mt-16 grid lg:grid-cols-4 gap-8">
                            {steps.map((step, index) => {
                                const Icon = step.icon;
                                return (
                                    <div key={step.title} className="relative rounded-3xl bg-white border border-slate-200 p-8 shadow-sm hover:shadow-xl transition dark:border-slate-800 dark:bg-slate-900/40">
                                        <div className="absolute top-6 right-6 text-5xl font-black text-slate-100 dark:text-slate-800/40">
                                            0{index + 1}
                                        </div>
                                        <div className="h-16 w-16 rounded-2xl bg-primary/10 dark:bg-primary/20 flex items-center justify-center">
                                            <Icon size={30} className="text-primary dark:text-primary-light" />
                                        </div>
                                        <h3 className="mt-6 text-xl font-bold text-slate-900 dark:text-white">{step.title}</h3>
                                        <p className="mt-4 text-slate-600 dark:text-slate-400 leading-7">{step.description}</p>
                                    </div>
                                );
                            })}
                        </div>
                    </section>

                    {/* DASHBOARD DETALHES */}
                    <section id="dashboard" className="mt-36">
                        <div className="grid lg:grid-cols-2 gap-20 items-center">
                            <div>
                                <span className="rounded-full bg-primary/10 px-4 py-2 text-sm font-semibold text-primary dark:bg-primary/20 dark:text-primary-light">
                                    Plataforma
                                </span>
                                <h2 className="mt-6 text-4xl font-bold text-slate-900 dark:text-white">
                                    Um painel completo para sua equipe
                                </h2>
                                <p className="mt-6 text-lg text-slate-600 dark:text-slate-400 leading-8">
                                    Esqueça mensagens perdidas, fotos ilegíveis e atendimento
                                    desorganizado. A Aroê centraliza todas as receitas em um único lugar.
                                </p>

                                <div className="mt-10 space-y-5">
                                    <div className="flex gap-4">
                                        <div className="h-12 w-12 rounded-xl bg-green-100 dark:bg-green-950/50 flex items-center justify-center flex-shrink-0">
                                            <CheckCircle2 className="text-green-600 dark:text-green-400" size={22} />
                                        </div>
                                        <div>
                                            <h4 className="font-semibold text-slate-900 dark:text-white">Receitas organizadas</h4>
                                            <p className="text-slate-600 dark:text-slate-400 mt-1">Todas as solicitações chegam estruturadas e prontas para orçamento.</p>
                                        </div>
                                    </div>

                                    <div className="flex gap-4">
                                        <div className="h-12 w-12 rounded-xl bg-blue-100 dark:bg-blue-950/50 flex items-center justify-center flex-shrink-0">
                                            <Users className="text-blue-600 dark:text-blue-400" size={22} />
                                        </div>
                                        <div>
                                            <h4 className="font-semibold text-slate-900 dark:text-white">Gestão da equipe</h4>
                                            <p className="text-slate-600 dark:text-slate-400 mt-1">Distribua pedidos entre colaboradores e acompanhe cada etapa do atendimento.</p>
                                        </div>
                                    </div>

                                    <div className="flex gap-4">
                                        <div className="h-12 w-12 rounded-xl bg-primary/10 dark:bg-primary/20 flex items-center justify-center flex-shrink-0">
                                            <TrendingUp className="text-primary dark:text-primary-light" size={22} />
                                        </div>
                                        <div>
                                            <h4 className="font-semibold text-slate-900 dark:text-white">Indicadores em tempo real</h4>
                                            <p className="text-slate-600 dark:text-slate-400 mt-1">Visualize conversão, faturamento e desempenho em um só lugar.</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="relative">
                                <div className="absolute inset-0 rounded-[40px] bg-primary/10 blur-3xl dark:bg-primary/5"></div>
                                <div className="relative overflow-hidden rounded-[32px] border border-slate-200 bg-white shadow-2xl dark:border-slate-800">
                                    <img src="/dashboard-aroe.png" alt="Dashboard da plataforma" className="w-full dark:brightness-90" />
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* DIFERENCIAIS */}
                    <section className="mt-36">
                        <div className="rounded-[40px] bg-gradient-to-br from-primary to-[#24174F] dark:from-slate-900 dark:to-slate-950 dark:border dark:border-slate-800 overflow-hidden">
                            <div className="grid lg:grid-cols-2 gap-16 items-center p-10 lg:p-16">
                                <div>
                                    <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm font-semibold text-white">
                                        <BadgeCheck size={16} />
                                        Por que escolher a Aroê?
                                    </span>
                                    <h2 className="mt-6 text-4xl font-bold text-white leading-tight">
                                        Um marketplace criado exclusivamente para farmácias de manipulação.
                                    </h2>
                                    <p className="mt-6 text-lg leading-8 text-white/80">
                                        Nossa plataforma conecta pacientes e farmácias de forma simples, segura e totalmente digital, reduzindo custos de aquisição e aumentando as oportunidades de venda.
                                    </p>
                                </div>

                                <div className="grid gap-5">
                                    {[
                                        "Sem mensalidade",
                                        "Sem taxa de adesão",
                                        "Receitas digitais padronizadas",
                                        "Pedidos organizados automaticamente",
                                        "Comissão apenas sobre vendas realizadas",
                                        "Cancelamento sem fidelidade",
                                    ].map((item) => (
                                        <div key={item} className="flex items-center gap-4 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/10 p-5">
                                            <CheckCircle2 className="text-green-400" size={22} />
                                            <span className="text-white font-medium">{item}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* FORMULÁRIO DE CREDENCIAMENTO */}
                    <section id="cadastro" className="mt-36 px-4 max-w-6xl mx-auto">
                        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start rounded-[32px] sm:rounded-[40px] bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xl p-6 sm:p-10 lg:p-14 transition-colors duration-300">

                            {/* Coluna de Informações / Benefícios */}
                            <div className="flex flex-col h-full justify-between space-y-8 lg:space-y-0">
                                <div>
                                    <span className="inline-flex rounded-full bg-primary/10 px-4 py-2 text-sm font-semibold text-primary dark:bg-primary/20 dark:text-primary-light">
                                        Credenciamento
                                    </span>
                                    <h2 className="mt-6 text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white tracking-tight">
                                        Seja uma farmácia parceira.
                                    </h2>
                                    <p className="mt-4 text-base sm:text-lg text-slate-600 dark:text-slate-400 leading-relaxed max-w-md">
                                        Faça parte da Aroê e receba novos pedidos de manipulação diariamente através da nossa plataforma digital.
                                    </p>
                                </div>

                                {/* Diferenciais de Confiança */}
                                <div className="space-y-6 lg:mt-auto">
                                    {/* Item 1 */}
                                    <div className="flex gap-4 p-4 rounded-2xl hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors duration-200">
                                        <div className="h-12 w-12 rounded-xl bg-green-100 dark:bg-green-950/50 flex items-center justify-center flex-shrink-0 border border-green-200/50 dark:border-green-900/30">
                                            <Clock3 className="text-green-600 dark:text-green-400" size={22} />
                                        </div>
                                        <div>
                                            <h4 className="font-semibold text-slate-900 dark:text-white">Aprovação rápida</h4>
                                            <p className="text-slate-600 dark:text-slate-400 text-sm mt-1">Sua conta ativa e pronta em até 24 horas úteis.</p>
                                        </div>
                                    </div>

                                    {/* Item 2 */}
                                    <div className="flex gap-4 p-4 rounded-2xl hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors duration-200">
                                        <div className="h-12 w-12 rounded-xl bg-blue-100 dark:bg-blue-950/50 flex items-center justify-center flex-shrink-0 border border-blue-200/50 dark:border-blue-900/30">
                                            <ShieldCheck className="text-blue-600 dark:text-blue-400" size={22} />
                                        </div>
                                        <div>
                                            <h4 className="font-semibold text-slate-900 dark:text-white">Processo 100% seguro</h4>
                                            <p className="text-slate-600 dark:text-slate-400 text-sm mt-1">Seus dados e documentos protegidos sob análise dedicada da nossa equipe.</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Coluna do Formulário Técnico */}
                            <div className="bg-slate-50/50 dark:bg-slate-800/30 p-6 sm:p-8 rounded-2xl border border-slate-100 dark:border-slate-800">
                                <form onSubmit={handleSubmit} className="space-y-5">
                                    <div className="grid md:grid-cols-2 gap-5">
                                        {renderInput("Nome da Farmácia", "nomeFarmacia", "text", "Farmácia Exemplo")}
                                        {renderInput("CNPJ", "cnpj", "text", "00.000.000/0000-00")}
                                    </div>
                                    <div className="grid md:grid-cols-2 gap-5">
                                        {renderInput("Responsável", "responsavel", "text", "Nome completo")}
                                        {renderInput("Cidade / Estado", "cidade", "text", "São Paulo - SP")}
                                    </div>
                                    <div className="grid md:grid-cols-2 gap-5">
                                        {renderInput("WhatsApp", "whatsapp", "text", "(11) 99999-9999")}
                                        {renderInput("E-mail", "email", "email", "contato@farmacia.com")}
                                    </div>

                                    <Button
                                        type="submit"
                                        className="group w-full py-4 bg-primary hover:bg-primary-dark text-white rounded-xl font-semibold shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-0.5 flex items-center justify-center gap-2 focus:ring-2 focus:ring-offset-2 focus:ring-primary"
                                    >
                                        Enviar Solicitação
                                        <ArrowRight size={18} className="transition-transform duration-300 group-hover:translate-x-1" />
                                    </Button>
                                </form>
                            </div>

                        </div>
                    </section>

                    {/* FAQ */}
                    <section className="mt-36 max-w-4xl mx-auto">
                        <div className="text-center mb-14">
                            <span className="rounded-full bg-primary/10 px-4 py-2 text-sm font-semibold text-primary dark:bg-primary/20 dark:text-primary-light">
                                FAQ
                            </span>
                            <h2 className="mt-5 text-4xl font-bold text-slate-900 dark:text-white">Perguntas Frequentes</h2>
                        </div>

                        <div className="space-y-4">
                            {faq.map((item, index) => (
                                <div key={index} className="border border-slate-200 rounded-2xl bg-white overflow-hidden transition-all shadow-sm dark:border-slate-800 dark:bg-slate-900/40">
                                    <button
                                        type="button"
                                        onClick={() => setOpenFaq(openFaq === index ? null : index)}
                                        className="w-full flex items-center justify-between p-6 text-left font-semibold text-slate-900 dark:text-white hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors"
                                    >
                                        <span>{item.question}</span>
                                        <span className={`text-xl transition-transform duration-200 ${openFaq === index ? "rotate-180" : ""}`}>
                                            ↓
                                        </span>
                                    </button>
                                    
                                    {openFaq === index && (
                                        <div className="p-6 pt-0 border-t border-slate-100 dark:border-slate-800 text-slate-600 dark:text-slate-400 leading-relaxed transition-all">
                                            {item.answer}
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </section>
                </div>
            </main>
        </div>
    );
}