import { CheckCircle, Package, Truck, Box, Heart, DollarSign } from 'lucide-react'
import { useThemeContext } from '../../../contexts/ThemeContext' // Certifique-se de que o caminho do context está correto

export default function DashboardHome() {
    const { highContrast } = useThemeContext()

    const orders = [
        {
            id: 1,
            productName: 'Vitaminas A-Z',
            formula: 'Fórmula manipulada',
            status: 'Recebido',
            statusDate: '10/12',
            nextStatus: 'Em Produção',
            nextDate: '11/12',
            shippedDate: 'Previsão 13/12',
            deliveryDate: 'Previsão 13/12',
            price: 'R$ 43,50',
            discount: 'Desconto',
            discountPrice: 'R$ 43,50',
            pharmacies: 3,
        },
    ]

    // Classes dinâmicas baseadas no estado de Alto Contraste para os Cards Principais
    const cardBgClass = highContrast
        ? 'bg-white text-black border-4 border-black dark:bg-black dark:text-white dark:border-4 dark:border-white shadow-none'
        : 'bg-white dark:bg-slate-900 border border-transparent dark:border-slate-800/80 shadow-sm'

    const textPrimaryClass = highContrast
        ? 'text-black dark:text-white font-extrabold'
        : 'text-gray-900 dark:text-white'

    const textSecondaryClass = highContrast
        ? 'text-black/90 dark:text-white/90 font-bold'
        : 'text-gray-600 dark:text-slate-400'

    const textMutedClass = highContrast
        ? 'text-black/80 dark:text-white/80 font-semibold'
        : 'text-gray-500 dark:text-slate-500'

    const buttonClass = highContrast
        ? 'bg-black text-white dark:bg-white dark:text-black border-2 border-black dark:border-white font-black hover:opacity-90'
        : 'bg-primary dark:bg-secondary text-white font-medium hover:opacity-90'

    return (
        <div className="space-y-8 transition-colors duration-500">
            {/* Welcome section */}
            <div className={`rounded-xl p-6 transition-all ${cardBgClass}`}>
                <h2 className={`text-2xl font-bold mb-2 ${textPrimaryClass}`}>
                    Bem-vindo à Farmácia +amor
                </h2>
                <p className={textSecondaryClass}>
                    Acompanhe seus pedidos e receitas em tempo real
                </p>
            </div>

            {/* Orders section */}
            {orders.map((order) => (
                <div key={order.id} className={`rounded-xl p-6 transition-all ${cardBgClass}`}>
                    
                    {/* Product header */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
                        <div className="flex items-center gap-4">
                            <div className={`w-12 h-12 rounded-xl flex items-center justify-center transition-colors ${
                                highContrast 
                                    ? 'bg-black text-white dark:bg-white dark:text-black border border-black dark:border-white' 
                                    : 'bg-primary/10 dark:bg-secondary/10'
                            }`}>
                                <Package className={highContrast ? 'text-current' : 'text-primary dark:text-secondary'} size={24} />
                            </div>
                            <div>
                                <h3 className={`text-xl font-bold ${textPrimaryClass}`}>{order.productName}</h3>
                                <p className={`text-sm ${textMutedClass}`}>{order.formula}</p>
                            </div>
                        </div>
                        
                        <span className={`px-4 py-1.5 rounded-full text-sm font-bold self-start sm:self-center transition-colors ${
                            highContrast
                                ? 'border-2 border-black text-black bg-white dark:border-white dark:text-white dark:bg-black'
                                : 'bg-primary/10 dark:bg-secondary/15 text-primary dark:text-secondary'
                        }`}>
                            Em andamento
                        </span>
                    </div>

                    {/* Timeline */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
                        {/* Status 1 */}
                        <div className="flex flex-col items-center text-center">
                            <div className={`w-12 h-12 rounded-full flex items-center justify-center text-white mb-2 shadow-sm transition-colors ${
                                highContrast ? 'bg-black dark:bg-white text-white dark:text-black border border-current' : 'bg-green-500 dark:bg-green-600'
                            }`}>
                                <CheckCircle size={24} />
                            </div>
                            <p className={`text-sm font-bold ${textPrimaryClass}`}>{order.status}</p>
                            <p className={`text-xs ${textMutedClass}`}>{order.statusDate}</p>
                        </div>

                        {/* Status 2 */}
                        <div className="flex flex-col items-center text-center">
                            <div className={`w-12 h-12 rounded-full flex items-center justify-center mb-2 font-bold transition-all border-2 ${
                                highContrast 
                                    ? 'border-black text-black dark:border-white dark:text-white bg-black/10 dark:bg-white/10' 
                                    : 'border-primary/30 dark:border-secondary/40 text-primary dark:text-secondary bg-primary/5 dark:bg-secondary/5 animate-pulse'
                            }`}>
                                <span className="text-xl leading-none">∿</span>
                            </div>
                            <p className={`text-sm font-bold ${textPrimaryClass}`}>{order.nextStatus}</p>
                            <p className={`text-xs ${textMutedClass}`}>{order.nextDate}</p>
                        </div>

                        {/* Status 3 */}
                        <div className="flex flex-col items-center text-center">
                            <div className={`w-12 h-12 rounded-full flex items-center justify-center mb-2 border-2 transition-colors ${
                                highContrast ? 'border-black text-black dark:border-white dark:text-white' : 'border-gray-200 dark:border-slate-800 text-gray-400 dark:text-slate-600'
                            }`}>
                                <Truck size={20} />
                            </div>
                            <p className={`text-sm font-bold ${highContrast ? 'text-black dark:text-white' : 'text-gray-400 dark:text-slate-600'}`}>Enviado</p>
                            <p className={`text-xs ${highContrast ? 'text-black/70 dark:text-white/70' : 'text-gray-400 dark:text-slate-600'}`}>{order.shippedDate}</p>
                        </div>

                        {/* Status 4 */}
                        <div className="flex flex-col items-center text-center">
                            <div className={`w-12 h-12 rounded-full flex items-center justify-center mb-2 border-2 transition-colors ${
                                highContrast ? 'border-black text-black dark:border-white dark:text-white' : 'border-gray-200 dark:border-slate-800 text-gray-400 dark:text-slate-600'
                            }`}>
                                <Box size={20} />
                            </div>
                            <p className={`text-sm font-bold ${highContrast ? 'text-black dark:text-white' : 'text-gray-400 dark:text-slate-600'}`}>Entrega</p>
                            <p className={`text-xs ${highContrast ? 'text-black/70 dark:text-white/70' : 'text-gray-400 dark:text-slate-600'}`}>{order.deliveryDate}</p>
                        </div>
                    </div>

                    {/* Quick actions and pricing */}
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 pt-6 border-t border-gray-100 dark:border-slate-800/80">
                        {/* Quick actions */}
                        <div className="space-y-4">
                            <div>
                                <div className="flex items-center gap-2 mb-3">
                                    <Heart size={20} className={highContrast ? 'text-current' : 'text-red-500 dark:text-red-400'} />
                                    <h4 className={`font-bold text-sm ${textPrimaryClass}`}>Ações rápidas</h4>
                                </div>
                                <button className={`w-full px-4 py-2.5 rounded-xl text-sm transition-all shadow-sm ${buttonClass}`}>
                                    Enviar nova receita
                                </button>
                            </div>
                        </div>

                        {/* Available prices */}
                        <div>
                            <div className="flex items-center gap-2 mb-3">
                                <DollarSign size={20} className={highContrast ? 'text-current' : 'text-green-500 dark:text-green-400'} />
                                <h4 className={`font-bold text-sm ${textPrimaryClass}`}>Orçamentos disponíveis</h4>
                            </div>
                            <p className={`text-xs sm:text-sm ${textSecondaryClass}`}>
                                {order.pharmacies} farmácias responderam sua receita a partir de
                            </p>
                            <p className={`text-2xl font-black mt-2 transition-colors ${
                                highContrast ? 'text-black dark:text-white' : 'text-green-600 dark:text-green-400'
                            }`}>
                                {order.price}
                            </p>
                        </div>

                        {/* Discount info Box */}
                        <div>
                            <div className={`rounded-xl p-4 transition-all border ${
                                highContrast 
                                    ? 'bg-white dark:bg-black border-2 border-black dark:border-white text-black dark:text-white' 
                                    : 'bg-blue-50/50 dark:bg-slate-900/40 border-blue-100 dark:border-slate-800'
                            }`}>
                                <span className={`text-xs font-bold px-3 py-0.5 rounded-full inline-block mb-2 transition-colors ${
                                    highContrast
                                        ? 'border border-black dark:border-white bg-black text-white dark:bg-white dark:text-black'
                                        : 'text-blue-600 dark:text-blue-400 bg-blue-100/70 dark:bg-blue-950/40'
                                }`}>
                                    {order.discount}
                                </span>
                                <p className={`text-xs mb-2 ${textMutedClass}`}>Escolha entre Farmácias</p>
                                <div className="space-y-2">
                                    <div className="flex items-center justify-between">
                                        <span className={`text-xs ${textSecondaryClass}`}>Farmácia Bem viver</span>
                                        <span className={`font-bold text-sm ${textPrimaryClass}`}>{order.discountPrice}</span>
                                    </div>
                                </div>
                                <button className={`w-full mt-3 px-3 py-2 rounded-lg text-xs transition-all ${buttonClass}`}>
                                    Ver mais
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            ))}

            {/* Info section */}
            <div className={`rounded-xl p-6 transition-all ${cardBgClass}`}>
                <div className="flex items-center gap-4">
                    <Heart size={28} className={highContrast ? 'text-current' : 'text-red-400 dark:text-red-400'} />
                    <div>
                        <h3 className={`text-base sm:text-lg font-bold ${textPrimaryClass}`}>
                            Pequenas escolhas, grandes transformações
                        </h3>
                        <p className={`text-xs sm:text-sm ${textSecondaryClass}`}>
                            A constância é a chave para o bem-estar.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}