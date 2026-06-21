import heroBg from '../../../assets/hero.jpg'
import Button from '../../../components/ui/Button'
// import { Check } from 'lucide-react'

export default function HeroSection() {
    return (
        <section id="inicio" className="relative h-screen flex items-center justify-start overflow-hidden antialiased">
            
            <div
                className="absolute inset-0 bg-cover bg-center z-0"
                style={{ backgroundImage: `url(${heroBg})` }}
            />
            <div
                className="absolute inset-0 z-10"
                style={{
                    background: 'linear-gradient(105deg, rgba(10,6,28,0.88) 0%, rgba(10,6,28,0.6) 50%, rgba(10,6,28,0.2) 100%)'
                }}
            />

            <div className="relative z-20 w-full max-w-xl px-4 sm:px-6 md:px-12 pt-16 sm:pt-20">
                <span className="inline-flex items-center gap-1.5 text-xs font-semibold tracking-widest px-3 py-1 rounded-full mb-6 text-white border border-white/30 bg-white/15 backdrop-blur-sm">
                    <span className="w-1.5 h-1.5 rounded-full bg-secondary" />
                    A tecnologia que cuida de você
                </span>

{/* Logo adicionado aqui embaixo da tag, vindo da pasta public */}
<div className="mb-6">
    <img src="/logo2.png" alt="Logo Aroe" className="h-32 w-auto object-contain" />
</div>

                <h1 className="font-serif text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold leading-tight text-white mb-4">
                    Seus medicamentos<br />
                    manipulados,
                    <span className="text-secondary"> sem complicação.</span>
                </h1>

                <p className="text-xs sm:text-sm text-white/90 leading-relaxed mb-6 sm:mb-8 max-w-sm">
                    Envie sua receita uma vez, compare orçamentos de farmácias
                    qualificadas e receba em casa com total transparência.
                </p>

                <div className="flex gap-2 sm:gap-4 flex-wrap mb-8 sm:mb-10">
                    <Button variant="outline" onClick={() => window.location.href = '/pages/farmacia'}>Sou Farmácia</Button>
                    <Button variant="primary" onClick={() => window.location.href = '/pages/login'}>Entrar como Paciente</Button>
                </div>

                <div className="flex gap-6 flex-wrap">

                    <div className="flex items-center gap-1.5 text-xs text-white/85">
                        <div className="w-5 h-5 rounded-full flex items-center justify-center text-secondary bg-secondary/25 text-[15px]">
                            ✓
                        </div>
                        Envio único de receita
                    </div>

                    <div className="flex items-center gap-1.5 text-xs text-white/85">
                        <div className="w-5 h-5 rounded-full flex items-center justify-center text-primary-light bg-primary-light/30 text-[15px]">
                            ✓
                        </div>
                        Compare preços
                    </div>

                    <div className="flex items-center gap-1.5 text-xs text-white/85">
                        <div className="w-5 h-5 rounded-full flex items-center justify-center text-secondary bg-secondary/25 text-[15px]">
                            ✓
                        </div>
                        Farmácias verificadas
                    </div>
                </div>
            </div>
        </section>
    )
}