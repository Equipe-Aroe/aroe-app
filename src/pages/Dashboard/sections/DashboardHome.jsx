import { CheckCircle, Package, Truck, Box, Heart, DollarSign } from 'lucide-react'

export default function DashboardHome() {
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

    const quickActions = [
        { icon: Heart, title: 'Ações rápidas', description: '' },
    ]

    return (
        <div className="space-y-8">
            {/* Welcome section */}
            <div className="bg-white rounded-lg p-6 shadow-sm">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Bem-vindo à Farmácia +amor</h2>
                <p className="text-gray-600">Acompanhe seus pedidos e receitas em tempo real</p>
            </div>

            {/* Orders section */}
            {orders.map((order) => (
                <div key={order.id} className="bg-white rounded-lg p-6 shadow-sm">
                    {/* Product header */}
                    <div className="flex items-start justify-between mb-8">
                        <div>
                            <div className="flex items-center gap-3 mb-2">
                                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                                    <Package className="text-purple-600" size={24} />
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold text-gray-900">{order.productName}</h3>
                                    <p className="text-sm text-gray-500">{order.formula}</p>
                                </div>
                            </div>
                        </div>
                        <span className="px-4 py-2 bg-purple-100 text-purple-700 rounded-full text-sm font-medium">
                            Em andamento
                        </span>
                    </div>

                    {/* Timeline */}
                    <div className="grid grid-cols-4 gap-4 mb-8">
                        <div className="flex flex-col items-center">
                            <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center text-white mb-2">
                                <CheckCircle size={24} />
                            </div>
                            <p className="text-sm font-semibold text-gray-900">{order.status}</p>
                            <p className="text-xs text-gray-500">{order.statusDate}</p>
                        </div>

                        <div className="flex flex-col items-center">
                            <div className="w-12 h-12 rounded-full flex items-center justify-center mb-2 border-2 border-purple-200">
                                <span className="text-purple-400">∿</span>
                            </div>
                            <p className="text-sm font-semibold text-gray-900">{order.nextStatus}</p>
                            <p className="text-xs text-gray-500">{order.nextDate}</p>
                        </div>

                        <div className="flex flex-col items-center">
                            <div className="w-12 h-12 rounded-full flex items-center justify-center mb-2 border-2 border-gray-300">
                                <Truck size={20} className="text-gray-400" />
                            </div>
                            <p className="text-sm font-semibold text-gray-900">Enviado</p>
                            <p className="text-xs text-gray-500">{order.shippedDate}</p>
                        </div>

                        <div className="flex flex-col items-center">
                            <div className="w-12 h-12 rounded-full flex items-center justify-center mb-2 border-2 border-gray-300">
                                <Box size={20} className="text-gray-400" />
                            </div>
                            <p className="text-sm font-semibold text-gray-900">Entrega</p>
                            <p className="text-xs text-gray-500">{order.deliveryDate}</p>
                        </div>
                    </div>

                    {/* Quick actions and pricing */}
                    <div className="grid grid-cols-3 gap-6">
                        {/* Quick actions */}
                        <div className="col-span-1 space-y-4">
                            <div>
                                <div className="flex items-center gap-2 mb-3">
                                    <Heart size={20} className="text-red-400" />
                                    <h4 className="font-semibold text-gray-900">Ações rápidas</h4>
                                </div>
                                <button className="w-full px-4 py-2 bg-primary text-white rounded-lg font-medium hover:bg-primary/90 transition-colors">
                                    Enviar nova receita
                                </button>
                            </div>
                        </div>

                        {/* Available prices */}
                        <div className="col-span-1">
                            <div className="flex items-center gap-2 mb-3">
                                <DollarSign size={20} className="text-green-500" />
                                <h4 className="font-semibold text-gray-900">Orçamentos disponíveis</h4>
                            </div>
                            <p className="text-sm text-gray-600">{order.pharmacies} farmácias responderam sua receita a partir de</p>
                            <p className="text-2xl font-bold text-green-600 mt-2">{order.price}</p>
                        </div>

                        {/* Discount info */}
                        <div className="col-span-1">
                            <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
                                <span className="text-xs font-semibold text-blue-600 bg-blue-100 px-3 py-1 rounded-full inline-block mb-2">
                                    {order.discount}
                                </span>
                                <p className="text-xs text-gray-600 mb-2">Escolha entre Farmácias</p>
                                <div className="space-y-2">
                                    <div className="flex items-center justify-between">
                                        <span className="text-xs text-gray-700">Farmácia Bem viver</span>
                                        <span className="font-semibold text-gray-900">{order.discountPrice}</span>
                                    </div>
                                </div>
                                <button className="w-full mt-3 px-3 py-2 bg-primary text-white rounded-lg text-sm font-medium hover:bg-primary/90 transition-colors">
                                    Ver mais
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            ))}

            {/* Info section */}
            <div className="bg-white rounded-lg p-6 shadow-sm">
                <div className="flex items-center gap-4">
                    <Heart size={28} className="text-red-400" />
                    <div>
                        <h3 className="text-lg font-bold text-gray-900">Pequenas escolhas, grandes transformações</h3>
                        <p className="text-gray-600 text-sm">A constância é a chave para o bem-estar.</p>
                    </div>
                </div>
            </div>
        </div>
    )
}
