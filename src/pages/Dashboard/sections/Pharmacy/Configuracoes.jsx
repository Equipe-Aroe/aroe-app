import { useState } from 'react'
import { Bell, Shield, Database, Users, Globe, Save } from 'lucide-react'
import { useThemeContext } from '../../../../contexts/ThemeContext'

export default function PharmacySettings() {
    const { highContrast } = useThemeContext()

    // Estados dos toggles de configuração
    const [settings, setSettings] = useState({
        lowStockAlert: true,
        autoSNGPC: true,
        emailNotifications: true,
        publicVisibility: true
    })

    const toggleSetting = (key) => {
        setSettings(prev => ({ ...prev, [key]: !prev[key] }))
    }

    const cardClass = highContrast
        ? 'bg-white text-black border-4 border-black p-6 rounded-none'
        : 'bg-white dark:bg-slate-900 border border-gray-100 dark:border-slate-800 p-6 rounded-2xl shadow-sm'

    return (
        <div className="max-w-4xl mx-auto p-4 md:p-6 space-y-6 animate-fade-in">
            <div>
                <h1 className={`text-2xl font-bold ${highContrast ? 'text-black' : 'text-gray-900 dark:text-white'}`}>Configurações</h1>
                <p className={`text-sm ${highContrast ? 'text-black' : 'text-gray-500 dark:text-slate-400'}`}>Gerencie as preferências operacionais e de sistema da sua unidade.</p>
            </div>

            <div className="space-y-6">
                
                {/* Notificações e Estoque */}
                <div className={cardClass}>
                    <h3 className="font-bold mb-4 flex items-center gap-2"><Bell size={18} className="text-purple-600"/> Notificações e Alertas</h3>
                    <div className="space-y-4">
                        <SettingToggle 
                            label="Alertas de estoque baixo" 
                            checked={settings.lowStockAlert} 
                            onChange={() => toggleSetting('lowStockAlert')} 
                        />
                        <SettingToggle 
                            label="Notificações por e-mail" 
                            checked={settings.emailNotifications} 
                            onChange={() => toggleSetting('emailNotifications')} 
                        />
                    </div>
                </div>

                {/* Integrações */}
                <div className={cardClass}>
                    <h3 className="font-bold mb-4 flex items-center gap-2"><Database size={18} className="text-purple-600"/> Integrações e SNGPC</h3>
                    <div className="space-y-4">
                        <SettingToggle 
                            label="Sincronização automática SNGPC" 
                            checked={settings.autoSNGPC} 
                            onChange={() => toggleSetting('autoSNGPC')} 
                        />
                    </div>
                </div>

                {/* Segurança e Equipe */}
                <div className={cardClass}>
                    <h3 className="font-bold mb-4 flex items-center gap-2"><Shield size={18} className="text-purple-600"/> Segurança e Acessos</h3>
                    <div className="flex justify-between items-center py-2">
                        <span className="text-sm">Gestão de membros da equipe</span>
                        <button className="text-sm font-semibold text-purple-600 hover:underline">Gerenciar acessos</button>
                    </div>
                    <div className="flex justify-between items-center py-2 border-t border-gray-100 dark:border-slate-800 mt-2">
                        <span className="text-sm">Visibilidade pública da farmácia</span>
                        <SettingToggle 
                            checked={settings.publicVisibility} 
                            onChange={() => toggleSetting('publicVisibility')} 
                        />
                    </div>
                </div>

                <div className="flex justify-end mt-6">
                    <button className="flex items-center gap-2 bg-purple-600 text-white px-6 py-2.5 rounded-xl font-medium hover:bg-purple-700 transition">
                        <Save size={18} /> Salvar Preferências
                    </button>
                </div>
            </div>
        </div>
    )
}

// Componente auxiliar de Toggle
function SettingToggle({ label, checked, onChange }) {
    return (
        <div className="flex justify-between items-center">
            <span className="text-sm text-gray-700 dark:text-slate-300">{label}</span>
            <button 
                onClick={onChange}
                className={`w-12 h-6 rounded-full transition-colors relative ${checked ? 'bg-purple-600' : 'bg-gray-300 dark:bg-slate-700'}`}
            >
                <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all ${checked ? 'left-7' : 'left-1'}`} />
            </button>
        </div>
    )
}