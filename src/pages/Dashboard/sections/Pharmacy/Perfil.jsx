import { useState } from 'react'
import { Store, MapPin, Phone, Mail, Clock, ShieldCheck, FileText, Save, Upload, Calendar } from 'lucide-react'
import { useThemeContext } from '../../../../contexts/ThemeContext'

export default function PharmacyProfile() {
    const { highContrast } = useThemeContext()
    
    // Estados do formulário de simulação para a Demo
    const [formData, setFormData] = useState({
        corporateName: 'Drogaria Aroê S.A.',
        tradeName: 'Aroê Farmácias - Filial Centro',
        cnpj: '12.345.678/0001-99',
        crf: 'CRF-SP 45678',
        pharmacistInCharge: 'Dra. Amanda Silva',
        phone: '(11) 99999-1234',
        email: 'contato.centro@aroe.com.br',
        hours: 'Segunda a Sábado, das 07h às 22h',
        cep: '01311-200',
        address: 'Avenida Paulista, 1000',
        city: 'São Paulo - SP'
    })

    const [isSaving, setIsSaving] = useState(false)

    const handleInputChange = (e) => {
        const { name, value } = e.target
        setFormData(prev => ({ ...prev, [name]: value }))
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        setIsSaving(true)
        // Simulação de salvamento
        setTimeout(() => {
            setIsSaving(false)
            alert('Perfil atualizado com sucesso!')
        }, 1000)
    }

    // Classes dinâmicas baseadas no Tema e Alto Contraste
    const cardClass = highContrast
        ? 'bg-white text-black border-4 border-black p-6 rounded-none'
        : 'bg-white dark:bg-slate-900 border border-gray-100 dark:border-slate-800 p-6 rounded-2xl shadow-sm'

    const inputClass = highContrast
        ? 'w-full px-3 py-2 border-2 border-black bg-white text-black focus:outline-none rounded-none'
        : 'w-full px-4 py-2.5 rounded-xl border border-gray-200 bg-white dark:bg-slate-950 text-gray-900 dark:text-slate-100 dark:border-slate-800 focus:border-purple-500 focus:ring-1 focus:ring-purple-500 focus:outline-none transition-colors'

    const labelClass = highContrast
        ? 'block text-xs font-black uppercase text-black mb-1'
        : 'block text-xs font-semibold text-gray-500 dark:text-slate-400 mb-1.5'

    const buttonClass = highContrast
        ? 'bg-black text-white border-2 border-black px-6 py-3 font-black uppercase tracking-wider hover:bg-white hover:text-black transition-colors'
        : 'bg-purple-600 hover:bg-purple-700 text-white px-6 py-2.5 rounded-xl font-medium shadow-sm shadow-purple-500/10 transition-colors flex items-center gap-2'

    return (
        <div className="max-w-5xl mx-auto space-y-6 animate-fade-in p-4 md:p-6">
            
            {/* Header do Perfil */}
            <div className={`flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pb-4 border-b ${highContrast ? 'border-black' : 'border-gray-100 dark:border-slate-900'}`}>
                <div>
                    <h1 className={`text-2xl font-bold tracking-tight ${highContrast ? 'text-black dark:text-white' : 'text-gray-900 dark:text-white'}`}>
                        Perfil da Farmácia
                    </h1>
                    <p className={`text-sm ${highContrast ? 'text-black dark:text-slate-300' : 'text-gray-500 dark:text-slate-400'}`}>
                        Gerencie as informações públicas, documentos e dados operacionais do seu estabelecimento.
                    </p>
                </div>
            </div>

            <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                
                {/* Coluna Esquerda: Foto e Status Regulatório */}
                <div className="lg:col-span-1 space-y-6">
                    <div className={`${cardClass} flex flex-col items-center text-center`}>
                        {/* Avatar do Estabelecimento */}
                        <div className={`w-24 h-24 rounded-full flex items-center justify-center relative mb-4 ${highContrast ? 'border-4 border-black bg-white' : 'bg-purple-50 dark:bg-purple-950/20 text-purple-600'}`}>
                            <Store size={40} />
                            <button 
                                type="button"
                                className={`absolute bottom-0 right-0 p-2 rounded-full shadow-md transition-transform hover:scale-105 ${highContrast ? 'bg-black text-white' : 'bg-white dark:bg-slate-800 text-gray-600 dark:text-slate-300'}`}
                                title="Alterar foto da fachada"
                            >
                                <Upload size={14} />
                            </button>
                        </div>
                        
                        <h2 className="font-bold text-lg">{formData.tradeName}</h2>
                        <p className={`text-xs ${highContrast ? 'text-black' : 'text-gray-400 dark:text-slate-500'} mb-4`}>
                            {formData.cnpj}
                        </p>

                        {/* Badges de Verificação Regulatória */}
                        <div className="w-full pt-4 border-t border-dashed border-gray-200 dark:border-slate-800 space-y-2 text-left">
                            <div className="flex items-center gap-2.5 text-xs text-emerald-600 dark:text-emerald-400 font-medium">
                                <ShieldCheck size={16} />
                                <span>Conectado à Anvisa (SNGPC)</span>
                            </div>
                            <div className="flex items-center gap-2.5 text-xs text-emerald-600 dark:text-emerald-400 font-medium">
                                <FileText size={16} />
                                <span>Licença Sanitária Regularizada</span>
                            </div>
                            <div className="flex items-center gap-2.5 text-xs text-gray-500 dark:text-slate-400 font-medium">
                                <Calendar size={16} />
                                <span>Última inspeção: Março/2026</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Coluna Direita: Formulários com Dados Cadastrais */}
                <div className="lg:col-span-2 space-y-6">
                    
                    {/* Bloco 1: Informações Gerais */}
                    <div className={cardClass}>
                        <h3 className="text-base font-bold mb-4 flex items-center gap-2">
                            <Store size={18} className="text-purple-600" />
                            Dados Institucionais
                        </h3>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className={labelClass}>Razão Social</label>
                                <input type="text" name="corporateName" value={formData.corporateName} onChange={handleInputChange} className={inputClass} />
                            </div>
                            <div>
                                <label className={labelClass}>Nome Fantasia da Filial</label>
                                <input type="text" name="tradeName" value={formData.tradeName} onChange={handleInputChange} className={inputClass} />
                            </div>
                            <div>
                                <label className={labelClass}>Farmacêutico Responsável Técnico</label>
                                <input type="text" name="pharmacistInCharge" value={formData.pharmacistInCharge} onChange={handleInputChange} className={inputClass} />
                            </div>
                            <div>
                                <label className={labelClass}>Inscrição CRF</label>
                                <input type="text" name="crf" value={formData.crf} onChange={handleInputChange} className={inputClass} />
                            </div>
                        </div>
                    </div>

                    {/* Bloco 2: Contato e Funcionamento */}
                    <div className={cardClass}>
                        <h3 className="text-base font-bold mb-4 flex items-center gap-2">
                            <Clock size={18} className="text-purple-600" />
                            Contato e Horários
                        </h3>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className={labelClass}>Telefone Comercial</label>
                                <div className="relative">
                                    <Phone size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                                    <input type="text" name="phone" value={formData.phone} onChange={handleInputChange} className={`${inputClass} pl-10`} />
                                </div>
                            </div>
                            <div>
                                <label className={labelClass}>E-mail Corporativo de Pedidos</label>
                                <div className="relative">
                                    <Mail size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                                    <input type="email" name="email" value={formData.email} onChange={handleInputChange} className={`${inputClass} pl-10`} />
                                </div>
                            </div>
                            <div className="md:col-span-2">
                                <label className={labelClass}>Horário de Funcionamento</label>
                                <input type="text" name="hours" value={formData.hours} onChange={handleInputChange} className={inputClass} />
                            </div>
                        </div>
                    </div>

                    {/* Bloco 3: Localização */}
                    <div className={cardClass}>
                        <h3 className="text-base font-bold mb-4 flex items-center gap-2">
                            <MapPin size={18} className="text-purple-600" />
                            Endereço Comercial
                        </h3>
                        
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div>
                                <label className={labelClass}>CEP</label>
                                <input type="text" name="cep" value={formData.cep} onChange={handleInputChange} className={inputClass} />
                            </div>
                            <div className="md:col-span-2">
                                <label className={labelClass}>Logradouro e Número</label>
                                <input type="text" name="address" value={formData.address} onChange={handleInputChange} className={inputClass} />
                            </div>
                            <div className="md:col-span-3">
                                <label className={labelClass}>Cidade e Estado</label>
                                <input type="text" name="city" value={formData.city} onChange={handleInputChange} className={inputClass} />
                            </div>
                        </div>
                    </div>

                    {/* Botão de Ação */}
                    <div className="flex justify-end pt-2">
                        <button 
                            type="submit" 
                            disabled={isSaving}
                            className={buttonClass}
                        >
                            <Save size={18} />
                            {isSaving ? 'Salvando alterações...' : 'Salvar Alterações do Perfil'}
                        </button>
                    </div>

                </div>
            </form>
        </div>
    )
}