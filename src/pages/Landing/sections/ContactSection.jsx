"use client"

import { useState } from 'react'
import { Clock3, ShieldCheck, ArrowRight, User, Store, MessageSquare, CheckCircle2 } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import Button from '../../../components/ui/Button' // Ajuste o caminho se necessário

export default function ContactSection() {
    // 'user' = Pessoa Física (Paciente) | 'business' = Pessoa Jurídica (Farmácia)
    const [activeTab, setActiveTab] = useState('user')
    const [isSubmitting, setIsSubmitting] = useState(false)

    // Estados isolados para não misturar os dados ao trocar de aba
    const [userForm, setUserForm] = useState({ nome: '', whatsapp: '', email: '', cidade: '', mensagem: '' })
    const [businessForm, setBusinessForm] = useState({ nomeFarmacia: '', cnpj: '', responsavel: '', whatsapp: '', email: '', cidade: '' })

    const handleUserChange = (e) => {
        const { name, value } = e.target
        setUserForm(prev => ({ ...prev, [name]: value }))
    }

    const handleBusinessChange = (e) => {
        const { name, value } = e.target
        setBusinessForm(prev => ({ ...prev, [name]: value }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setIsSubmitting(true)
        
        const dadosFinais = activeTab === 'user' ? userForm : businessForm
        
        try {
            console.log(`Dados enviados (${activeTab}):`, dadosFinais)
            // TODO: Integrar com sua API, CRM ou Webhook
            
            await new Promise(resolve => setTimeout(resolve, 1500))
            alert("Obrigado pelo contato! Nossa equipe falará com você em breve.")
            
            // Reseta a aba correspondente
            if (activeTab === 'user') {
                setUserForm({ nome: '', whatsapp: '', email: '', cidade: '', mensagem: '' })
            } else {
                setBusinessForm({ nomeFarmacia: '', cnpj: '', responsavel: '', whatsapp: '', email: '', cidade: '' })
            }
        } catch (error) {
            console.error(error)
        } finally {
            setIsSubmitting(false)
        }
    }

    return (
        <section id="contato" className="mt-36 mb-20 px-4 max-w-6xl mx-auto">
            <motion.div 
                className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center rounded-[32px] sm:rounded-[40px] bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xl p-6 sm:p-10 lg:p-14 transition-colors duration-500 relative overflow-hidden"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, ease: "easeOut" }}
            >
                {/* Detalhe estético de fundo */}
                <div className="absolute -top-24 -left-24 w-48 h-48 bg-primary/5 dark:bg-primary/10 rounded-full blur-3xl pointer-events-none" />

                {/* COLUNA DE INFORMAÇÕES (Muda sutilmente com base na aba) */}
                <div className="flex flex-col h-full justify-center space-y-8">
                    <div>
                        <span className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-4 py-1.5 text-xs font-bold tracking-wider uppercase text-primary dark:bg-primary/20 dark:text-primary-light">
                            💬 Fale Conosco
                        </span>
                        <h2 className="mt-4 text-3xl sm:text-4xl font-bold font-serif text-slate-900 dark:text-white tracking-tight leading-tight">
                            {activeTab === 'user' ? (
                                <>Dúvidas sobre o app? <br /><span className="text-primary dark:text-primary-light">Nós te ajudamos.</span></>
                            ) : (
                                <>Entre em contato com <br /><span className="text-primary dark:text-primary-light">nossa equipe.</span></>
                            )}
                        </h2>
                        <p className="mt-4 text-sm sm:text-base text-slate-600 dark:text-slate-400 leading-relaxed max-w-md">
                            {activeTab === 'user' 
                                ? "Quer saber como acompanhar seu pedido, como funciona nossa IA de leitura de receitas ou precisa de suporte? Envie sua mensagem."
                                : "Tem dúvidas sobre como funciona a nossa plataforma ou quer entender como integrar sua farmácia e aumentar suas vendas? Fale com nosso comercial."
                            }
                        </p>
                    </div>

                    {/* Diferenciais */}
                    <div className="space-y-4">
                        <div className="flex gap-4 p-3 rounded-2xl hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors duration-200">
                            <div className="h-11 w-11 rounded-xl bg-green-100 dark:bg-green-950/50 flex items-center justify-center flex-shrink-0 border border-green-200/50 dark:border-green-900/30">
                                <Clock3 className="text-green-600 dark:text-green-400" size={20} />
                            </div>
                            <div>
                                <h4 className="font-semibold text-sm text-slate-900 dark:text-white">Retorno rápido</h4>
                                <p className="text-slate-500 dark:text-slate-400 text-xs mt-0.5">Respondemos sua solicitação em até 24 horas úteis.</p>
                            </div>
                        </div>

                        <div className="flex gap-4 p-3 rounded-2xl hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors duration-200">
                            <div className="h-11 w-11 rounded-xl bg-blue-100 dark:bg-blue-950/50 flex items-center justify-center flex-shrink-0 border border-blue-200/50 dark:border-blue-900/30">
                                <MessageSquare className="text-blue-600 dark:text-blue-400" size={20} />
                            </div>
                            <div>
                                <h4 className="font-semibold text-sm text-slate-900 dark:text-white">Atendimento Humano</h4>
                                <p className="text-slate-500 dark:text-slate-400 text-xs mt-0.5">Conversas diretas e sem robôs travados para resolver seu problema.</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* COLUNA DO FORMULÁRIO DINÂMICO */}
                <div className="flex flex-col gap-5 bg-slate-50/50 dark:bg-slate-800/20 p-6 sm:p-8 rounded-2xl border border-slate-100 dark:border-slate-800/60 shadow-inner">
                    
                    {/* Seletor de Abas (Tabs) */}
                    <div className="flex p-1 bg-slate-100 dark:bg-slate-950 rounded-xl border border-slate-200/40 dark:border-slate-800/60">
                        <button
                            type="button"
                            onClick={() => setActiveTab('user')}
                            className={`flex items-center justify-center gap-2 flex-1 py-2.5 text-xs font-semibold rounded-lg transition-all ${
                                activeTab === 'user'
                                    ? 'bg-white dark:bg-slate-900 text-primary dark:text-white shadow-sm'
                                    : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-300'
                            }`}
                        >
                            <User size={14} /> Para Você
                        </button>
                        <button
                            type="button"
                            onClick={() => setActiveTab('business')}
                            className={`flex items-center justify-center gap-2 flex-1 py-2.5 text-xs font-semibold rounded-lg transition-all ${
                                activeTab === 'business'
                                    ? 'bg-white dark:bg-slate-900 text-primary dark:text-white shadow-sm'
                                    : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-300'
                            }`}
                        >
                            <Store size={14} /> Para sua Farmácia
                        </button>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <AnimatePresence mode="wait">
                            {activeTab === 'user' ? (
                                /* FORMULÁRIO PESSOA FÍSICA */
                                <motion.div
                                    key="user-form"
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: 10 }}
                                    transition={{ duration: 0.2 }}
                                    className="space-y-4"
                                >
                                    <div className="flex flex-col gap-1.5">
                                        <label className="text-xs font-semibold text-slate-600 dark:text-slate-400">Seu Nome</label>
                                        <input type="text" name="nome" placeholder="Digite seu nome completo" value={userForm.nome} onChange={handleUserChange} required className="w-full px-4 py-3 text-sm bg-white dark:bg-slate-950 text-slate-900 dark:text-white rounded-xl border border-slate-200 dark:border-slate-800 focus:border-primary outline-none transition-all placeholder:text-slate-400 dark:placeholder:text-slate-600" />
                                    </div>
                                    <div className="grid md:grid-cols-2 gap-4">
                                        <div className="flex flex-col gap-1.5">
                                            <label className="text-xs font-semibold text-slate-600 dark:text-slate-400">WhatsApp</label>
                                            <input type="text" name="whatsapp" placeholder="(11) 99999-9999" value={userForm.whatsapp} onChange={handleUserChange} required className="w-full px-4 py-3 text-sm bg-white dark:bg-slate-950 text-slate-900 dark:text-white rounded-xl border border-slate-200 dark:border-slate-800 focus:border-primary outline-none transition-all placeholder:text-slate-400" />
                                        </div>
                                        <div className="flex flex-col gap-1.5">
                                            <label className="text-xs font-semibold text-slate-600 dark:text-slate-400">Cidade / Estado</label>
                                            <input type="text" name="cidade" placeholder="Ex: São Paulo - SP" value={userForm.cidade} onChange={handleUserChange} required className="w-full px-4 py-3 text-sm bg-white dark:bg-slate-950 text-slate-900 dark:text-white rounded-xl border border-slate-200 dark:border-slate-800 focus:border-primary outline-none transition-all placeholder:text-slate-400" />
                                        </div>
                                    </div>
                                    <div className="flex flex-col gap-1.5">
                                        <label className="text-xs font-semibold text-slate-600 dark:text-slate-400">E-mail (Opcional)</label>
                                        <input type="email" name="email" placeholder="seu@email.com" value={userForm.email} onChange={handleUserChange} className="w-full px-4 py-3 text-sm bg-white dark:bg-slate-950 text-slate-900 dark:text-white rounded-xl border border-slate-200 dark:border-slate-800 focus:border-primary outline-none transition-all placeholder:text-slate-400" />
                                    </div>
                                    <div className="flex flex-col gap-1.5">
                                        <label className="text-xs font-semibold text-slate-600 dark:text-slate-400">Como podemos ajudar?</label>
                                        <textarea name="mensagem" rows={3} placeholder="Escreva sua dúvida ou mensagem..." value={userForm.mensagem} onChange={handleUserChange} required className="w-full px-4 py-3 text-sm bg-white dark:bg-slate-950 text-slate-900 dark:text-white rounded-xl border border-slate-200 dark:border-slate-800 focus:border-primary outline-none transition-all placeholder:text-slate-400 resize-none" />
                                    </div>
                                </motion.div>
                            ) : (
                                /* FORMULÁRIO FARMÁCIA (B2B) */
                                <motion.div
                                    key="business-form"
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: 10 }}
                                    transition={{ duration: 0.2 }}
                                    className="space-y-4"
                                >
                                    <div className="grid md:grid-cols-2 gap-4">
                                        <div className="flex flex-col gap-1.5">
                                            <label className="text-xs font-semibold text-slate-600 dark:text-slate-400">Nome da Farmácia</label>
                                            <input type="text" name="nomeFarmacia" placeholder="Farmácia Exemplo" value={businessForm.nomeFarmacia} onChange={handleBusinessChange} required className="w-full px-4 py-3 text-sm bg-white dark:bg-slate-950 text-slate-900 dark:text-white rounded-xl border border-slate-200 dark:border-slate-800 focus:border-primary outline-none transition-all placeholder:text-slate-400" />
                                        </div>
                                        <div className="flex flex-col gap-1.5">
                                            <label className="text-xs font-semibold text-slate-600 dark:text-slate-400">CNPJ</label>
                                            <input type="text" name="cnpj" placeholder="00.000.000/0000-00" value={businessForm.cnpj} onChange={handleBusinessChange} required className="w-full px-4 py-3 text-sm bg-white dark:bg-slate-950 text-slate-900 dark:text-white rounded-xl border border-slate-200 dark:border-slate-800 focus:border-primary outline-none transition-all placeholder:text-slate-400" />
                                        </div>
                                    </div>
                                    <div className="grid md:grid-cols-2 gap-4">
                                        <div className="flex flex-col gap-1.5">
                                            <label className="text-xs font-semibold text-slate-600 dark:text-slate-400">Nome do Responsável</label>
                                            <input type="text" name="responsavel" placeholder="Seu nome" value={businessForm.responsavel} onChange={handleBusinessChange} required className="w-full px-4 py-3 text-sm bg-white dark:bg-slate-950 text-slate-900 dark:text-white rounded-xl border border-slate-200 dark:border-slate-800 focus:border-primary outline-none transition-all placeholder:text-slate-400" />
                                        </div>
                                        <div className="flex flex-col gap-1.5">
                                            <label className="text-xs font-semibold text-slate-600 dark:text-slate-400">Cidade / Estado</label>
                                            <input type="text" name="cidade" placeholder="São Paulo - SP" value={businessForm.cidade} onChange={handleBusinessChange} required className="w-full px-4 py-3 text-sm bg-white dark:bg-slate-950 text-slate-900 dark:text-white rounded-xl border border-slate-200 dark:border-slate-800 focus:border-primary outline-none transition-all placeholder:text-slate-400" />
                                        </div>
                                    </div>
                                    <div className="grid md:grid-cols-2 gap-4">
                                        <div className="flex flex-col gap-1.5">
                                            <label className="text-xs font-semibold text-slate-600 dark:text-slate-400">WhatsApp Corporativo</label>
                                            <input type="text" name="whatsapp" placeholder="(11) 99999-9999" value={businessForm.whatsapp} onChange={handleBusinessChange} required className="w-full px-4 py-3 text-sm bg-white dark:bg-slate-950 text-slate-900 dark:text-white rounded-xl border border-slate-200 dark:border-slate-800 focus:border-primary outline-none transition-all placeholder:text-slate-400" />
                                        </div>
                                        <div className="flex flex-col gap-1.5">
                                            <label className="text-xs font-semibold text-slate-600 dark:text-slate-400">E-mail Comercial</label>
                                            <input type="email" name="email" placeholder="comercial@farmacia.com" value={businessForm.email} onChange={handleBusinessChange} required className="w-full px-4 py-3 text-sm bg-white dark:bg-slate-950 text-slate-900 dark:text-white rounded-xl border border-slate-200 dark:border-slate-800 focus:border-primary outline-none transition-all placeholder:text-slate-400" />
                                        </div>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>

                        {/* Botão de Ação Dinâmico */}
                        <Button
                            type="submit"
                            disabled={isSubmitting}
                            className="group w-full py-3.5 bg-primary hover:bg-primary-dark text-white rounded-xl font-semibold shadow-md hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-2 focus:ring-2 focus:ring-primary disabled:opacity-70 disabled:cursor-not-allowed mt-2"
                        >
                            {isSubmitting ? 'Enviando Mensagem...' : 'Entrar em Contato'}
                            {!isSubmitting && <ArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-1" />}
                        </Button>
                    </form>
                </div>
            </motion.div>
        </section>
    )
}