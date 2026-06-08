import { HelpCircle, Mail, Phone, MessageCircle, FileText, ChevronRight, BookOpen } from 'lucide-react'
import { useThemeContext } from '../../../../contexts/ThemeContext'

export default function PharmacyHelp() {
    const { highContrast } = useThemeContext()

    const cardClass = highContrast
        ? 'bg-white text-black border-4 border-black p-6 rounded-none'
        : 'bg-white dark:bg-slate-900 border border-gray-100 dark:border-slate-800 p-6 rounded-2xl shadow-sm'

    const linkClass = highContrast
        ? 'flex items-center justify-between p-4 border-2 border-black hover:bg-black hover:text-white transition-colors'
        : 'flex items-center justify-between p-4 bg-gray-50 dark:bg-slate-950 rounded-xl hover:bg-purple-50 dark:hover:bg-purple-900/20 transition-colors group'

    return (
        <div className="max-w-4xl mx-auto p-4 md:p-6 space-y-8 animate-fade-in">
            
            {/* Header */}
            <div>
                <h1 className={`text-2xl font-bold ${highContrast ? 'text-black' : 'text-gray-900 dark:text-white'}`}>Central de Ajuda</h1>
                <p className={`text-sm ${highContrast ? 'text-black' : 'text-gray-500 dark:text-slate-400'}`}>Precisa de suporte? Encontre respostas ou fale com nossa equipe.</p>
            </div>

            {/* Canais de Suporte */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <SupportChannel icon={MessageCircle} title="Chat ao vivo" desc="Respondemos em até 5min" />
                <SupportChannel icon={Phone} title="Telefone" desc="0800 123 4567" />
                <SupportChannel icon={Mail} title="E-mail" desc="suporte.farmacia@aroe.com" />
            </div>

            {/* Artigos e FAQ */}
            <div className={cardClass}>
                <h3 className="font-bold mb-6 flex items-center gap-2">
                    <BookOpen size={18} className="text-purple-600" /> 
                    Artigos Populares
                </h3>
                <div className="space-y-3">
                    <HelpLink title="Como configurar a integração com o SNGPC?" />
                    <HelpLink title="Passo a passo para cadastro de novos lotes" />
                    <HelpLink title="Como gerar relatório mensal de vendas?" />
                    <HelpLink title="Dúvidas sobre o fechamento de caixa" />
                </div>
            </div>

            {/* Área de Documentação Técnica */}
            <div className={`${cardClass} border-l-4 border-l-purple-600`}>
                <h3 className="font-bold mb-2">Documentação Técnica</h3>
                <p className="text-sm text-gray-500 dark:text-slate-400 mb-4">
                    Acesse nossos manuais de operação para farmacêuticos e guias de conformidade legal.
                </p>
                <button className="flex items-center gap-2 text-sm font-semibold text-purple-600 hover:underline">
                    <FileText size={16} /> Abrir base de conhecimento (PDF/Wiki)
                </button>
            </div>
        </div>
    )
}

function SupportChannel({ icon: Icon, title, desc }) {
    const { highContrast } = useThemeContext()
    return (
        <div className={`p-5 rounded-2xl flex flex-col items-center text-center gap-2 ${highContrast ? 'border-2 border-black' : 'bg-white dark:bg-slate-900 border border-gray-100 dark:border-slate-800'}`}>
            <Icon size={24} className="text-purple-600" />
            <div className="font-bold text-sm">{title}</div>
            <div className="text-xs text-gray-500">{desc}</div>
        </div>
    )
}

function HelpLink({ title }) {
    const { highContrast } = useThemeContext()
    return (
        <button className={`w-full ${highContrast ? 'border-2 border-black' : 'bg-gray-50 dark:bg-slate-950'} p-4 rounded-xl flex justify-between items-center hover:bg-purple-50 dark:hover:bg-slate-800 transition`}>
            <span className="text-sm font-medium">{title}</span>
            <ChevronRight size={18} className="text-gray-400" />
        </button>
    )
}