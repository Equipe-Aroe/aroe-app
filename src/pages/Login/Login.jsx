import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { Sparkles, User, Building2, X, Moon, Sun, Accessibility } from 'lucide-react'
import AuthLayout from './AuthLayout'
import Button from '../../components/ui/Button'
import { useThemeContext } from '../../contexts/ThemeContext'
import AccessibilityToolbar from '../../components/layout/AccessibilityToolbar'

export default function Login() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [isDemoModalOpen, setIsDemoModalOpen] = useState(false)
    const navigate = useNavigate()
    const { darkMode, toggleDarkMode } = useThemeContext()

    // Base de dados injetada dinamicamente na Demo de acordo com o roteiro de vocês
    const personas = [
        {
            id: 'ricardo',
            nome: 'Ricardo Augusto',
            tag: 'Trabalhador / Hipertenso',
            descricao: '34 anos, rotina exaustiva. Precisa cotar fórmulas de uso contínuo para hipertensão e vitaminas sem perder tempo.',
            cor: 'border-blue-200 dark:border-blue-900 bg-blue-50/40 dark:bg-blue-950/10',
            icone: <User className="text-blue-600 dark:text-blue-400" size={20} />,
            // Dados que serão injetados no Dashboard
            payload: {
                user: { nome: "Ricardo Augusto", tipo: "Paciente" },
                receitasIniciais: [
                    {
                        id: 101,
                        nome: 'Anti-hipertensivo + Complexo Vitamínico',
                        tipo: 'Uso Contínuo',
                        dataEnvio: new Date().toLocaleDateString('pt-BR'),
                        pedidoId: '#AROE-8831',
                        status: 'Aguardando orçamento',
                        statusCor: 'bg-orange-100 text-orange-700 dark:bg-orange-950/40 dark:text-orange-400',
                        entregaInfo: 'Validade: 180 dias',
                        textoExtraido: 'Dr. Carlos Eduardo - Cardiologista\nCRM: 456789/SP\n\nPaciente: Ricardo Augusto\n\nUso Contínuo:\n1. Losartana Potássica 50mg\n2. Anlodipino 5mg\n3. Vitamina D 2.000 UI\n4. Vitamina B12 500mcg\nMandar qsp 60 cápsulas.',
                        confidence: 94,
                        imagemUrl: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=500&auto=format&fit=crop&q=60', // Mock de receita médica
                        dadosEstruturados: {
                            paciente: 'Ricardo Augusto',
                            nomeMedico: 'Dr. Carlos Eduardo',
                            crmMedico: '456789/SP',
                            cnpjFarmacia: '12.345.678/0001-99',
                            dataEmissao: new Date().toLocaleDateString('pt-BR'),
                            validadeDias: '180',
                            tipoReceita: 'Uso Contínuo'
                        }
                    }
                ]
            }
        },
        {
            id: 'irene',
            nome: 'Dona Irene (e Fred)',
            tag: 'Idosa / Sem Afinidade Tecnológica',
            descricao: '68 anos, aposentada. Trata osteoporose e precisa dos biscoitos medicamentosos do seu cão cardiopata, o Fred.',
            cor: 'border-amber-200 dark:border-amber-900 bg-amber-50/40 dark:bg-amber-950/10',
            icone: <User className="text-amber-600 dark:text-amber-400" size={20} />,
            payload: {
                user: { nome: "Dona Irene", tipo: "Paciente (WhatsApp)" },
                receitasIniciais: [
                    {
                        id: 201,
                        nome: 'Manipulado Veterinário (Fred)',
                        tipo: 'Uso Veterinário',
                        dataEnvio: new Date().toLocaleDateString('pt-BR'),
                        pedidoId: '#AROE-4421',
                        status: 'Aguardando orçamento',
                        statusCor: 'bg-orange-100 text-orange-700 dark:bg-orange-950/40 dark:text-orange-400',
                        entregaInfo: 'Validade: 30 dias',
                        textoExtraido: 'Dra. Amanda Silva - Medicina Veterinária\nCRMV: 9912-SP\n\nPaciente Canino: Fred (Prop. Irene)\n\nUso Oral:\n1. Pimobendan 2,5mg em formato de biscoito palatável flavorizado sabor carne.\nEnviar 30 biscoitos.',
                        confidence: 88,
                        imagemUrl: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=500&auto=format&fit=crop&q=60', // Mock dog para ilustrar o Fred
                        dadosEstruturados: {
                            paciente: 'Fred (Cachorro da Dona Irene)',
                            nomeMedico: 'Dra. Amanda Silva (CRMV)',
                            crmMedico: '9912/SP',
                            cnpjFarmacia: '99.888.777/0001-11',
                            dataEmissao: new Date().toLocaleDateString('pt-BR'),
                            validadeDias: '30',
                            tipoReceita: 'Uso Veterinário'
                        }
                    },
                    {
                        id: 202,
                        nome: 'Cálcio + Fixador de Osteoporose',
                        tipo: 'Uso Contínuo',
                        dataEnvio: new Date().toLocaleDateString('pt-BR'),
                        pedidoId: '#AROE-4422',
                        status: 'Aguardando orçamento',
                        statusCor: 'bg-orange-100 text-orange-700 dark:bg-orange-950/40 dark:text-orange-400',
                        entregaInfo: 'Validade: 180 dias',
                        textoExtraido: 'Dra. Júlia Lima - Geriatria\nCRM: 112233/SP\n\nPaciente: Irene dos Santos\n\nUso Diário:\n1. Carbonato de Cálcio 500mg\n2. Alendronato Sódico 70mg\n3. Magnésio Quelato 150mg\nTomar 1 vez ao dia pela manhã.',
                        confidence: 91,
                        imagemUrl: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=500&auto=format&fit=crop&q=60',
                        dadosEstruturados: {
                            paciente: 'Irene dos Santos',
                            nomeMedico: 'Dra. Júlia Lima',
                            crmMedico: '112233/SP',
                            cnpjFarmacia: '99.888.777/0001-11',
                            dataEmissao: new Date().toLocaleDateString('pt-BR'),
                            validadeDias: '180',
                            tipoReceita: 'Uso Contínuo'
                        }
                    }
                ]
            }
        },
        {
            id: 'farmacia',
            nome: 'NatuFórmula (Farmácia Parceira)',
            tag: 'Visão Corporativa B2B',
            descricao: 'Painel da farmácia de manipulação para capturar as receitas limpas e responder os orçamentos do Ricardo e da Irene.',
            cor: 'border-purple-200 dark:border-purple-900 bg-purple-50/40 dark:bg-purple-950/10',
            icone: <Building2 className="text-purple-600 dark:text-purple-400" size={20} />,
            payload: {
                user: { nome: "NatuFórmula Centro", tipo: "Farmácia Parceira" },
                receitasIniciais: []
            }
        }
    ]

    const handleSelectPersona = (persona) => {
        setIsDemoModalOpen(false)
        // Injeção de Dados Mestre via LocalStorage
        localStorage.setItem('@Aroe:demo_session', JSON.stringify(persona.payload))
        navigate('/dashboard')
    }

    function handleSubmit(e) {
        e.preventDefault()
        // Limpa sessões de demonstração se logar normalmente
        localStorage.removeItem('@Aroe:demo_session')
        navigate('/dashboard')
    }

    return (
        <div className="relative min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors duration-500">
            {/* Controles Flutuantes */}
            <div className="absolute top-4 right-4 sm:top-6 sm:right-6 z-50 flex items-center gap-2 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md p-1.5 rounded-xl border border-gray-200 dark:border-slate-800 shadow-sm">
                <div className="text-slate-600 dark:text-slate-300 hover:bg-gray-100 dark:hover:bg-slate-800 rounded-lg transition p-0.5">
                    <AccessibilityToolbar scrolled={true} darkMode={darkMode} icon={<Accessibility size={19} />} />
                </div>
                <div className="h-4 w-[1px] bg-gray-200 dark:bg-slate-800" />
                <button type="button" onClick={toggleDarkMode} className="p-2 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-gray-100 dark:hover:bg-slate-800 transition">
                    {darkMode ? <Sun size={19} /> : <Moon size={19} />}
                </button>
            </div>

            <AuthLayout title="Seja bem-vindo" subtitle="Faça o login na sua conta">
                <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-4">
                    <div>
                        <label className="block text-xs font-semibold text-gray-600 dark:text-slate-400">Email</label>
                        <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="exemplo@exemplo.com" required className="mt-2 w-full px-3 py-2 text-sm bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-800 rounded-lg focus:ring-2 focus:ring-[#4DAA5C] transition-colors" />
                    </div>
                    <div>
                        <label className="block text-xs font-semibold text-gray-600 dark:text-slate-400">Senha</label>
                        <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="••••••••" required className="mt-2 w-full px-3 py-2 text-sm bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-800 rounded-lg focus:ring-2 focus:ring-[#4DAA5C] transition-colors" />
                    </div>

                    <Button type="submit" variant="primaryFull" className="py-2.5 text-sm mt-2">Entrar</Button>

                    {/* Botão de Apresentação da Demo */}
                    <button
                        type="button"
                        onClick={() => setIsDemoModalOpen(true)}
                        className="w-full py-2.5 rounded-lg text-sm font-bold bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white shadow-md flex items-center justify-center gap-2 transition-all"
                    >
                        <Sparkles size={16} className="animate-pulse" />
                        Visite nosso Demo (Acesso Rápido)
                    </button>

                    <p className="text-center text-xs text-gray-500 dark:text-slate-400 pt-2">
                        Não tem uma conta? <Link to="/register" className="text-[#4DAA5C] font-semibold hover:underline">Cadastre-se</Link>
                    </p>
                </form>
            </AuthLayout>

            {/* MODAL EXPANDIDO DE PERSONAS (ROTEIRO AROÊ) */}
            {isDemoModalOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm">
                    <div className="w-full max-w-xl bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-800 rounded-2xl p-6 shadow-2xl relative text-left">
                        <button onClick={() => setIsDemoModalOpen(false)} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 p-1 rounded-lg">
                            <X size={18} />
                        </button>

                        <div className="mb-4">
                            <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                                <Sparkles size={18} className="text-emerald-500" />
                                Ecossistema de Demonstração — Aroê
                            </h3>
                            <p className="text-xs text-gray-500 dark:text-slate-400 mt-1">
                                Selecione um dos personagens do nosso Pitch para ver como o algoritmo organiza e resolve as demandas de saúde de cada perfil.
                            </p>
                        </div>

                        <div className="space-y-3 max-h-[60vh] overflow-y-auto pr-1">
                            {personas.map((persona) => (
                                <button
                                    key={persona.id}
                                    type="button"
                                    onClick={() => handleSelectPersona(persona)}
                                    className={`w-full text-left p-4 rounded-xl border transition-all flex items-start gap-3 hover:scale-[1.01] ${persona.cor}`}
                                >
                                    <div className="p-2.5 rounded-xl bg-white dark:bg-slate-950 shadow-sm shrink-0 mt-0.5">
                                        {persona.icone}
                                    </div>
                                    <div className="space-y-1">
                                        <div className="flex flex-wrap items-center gap-2">
                                            <span className="font-extrabold text-sm text-slate-900 dark:text-white">{persona.nome}</span>
                                            <span className="text-[9px] bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 px-1.5 py-0.5 rounded font-bold uppercase tracking-wider">
                                                {persona.tag}
                                            </span>
                                        </div>
                                        <p className="text-xs text-gray-600 dark:text-slate-300 leading-relaxed">
                                            {persona.descricao}
                                        </p>
                                    </div>
                                </button>
                            ))}
                        </div>

                        <div className="mt-5 pt-3 border-t border-gray-100 dark:border-slate-800 flex justify-between items-center text-[10px] text-gray-400 font-bold tracking-wider">
                            <span>PROJETO AROÊ</span>
                            <span>PROA 2026</span>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}