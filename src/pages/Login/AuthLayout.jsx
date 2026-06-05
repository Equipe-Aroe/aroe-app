import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

export default function AuthLayout({ title, subtitle, children, imageSrc = '/loginimg.png', reverse = false, backTo = '/', backLabel = 'VOLTAR' }) {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  const resolvedImage = reverse ? '/registroimg.png' : imageSrc

  const imageMotion = reverse
    ? 'md:translate-x-10 md:opacity-0'
    : 'md:-translate-x-10 md:opacity-0'

  const formMotion = reverse
    ? 'md:-translate-x-10 md:opacity-0'
    : 'md:translate-x-10 md:opacity-0'

  // Gradiente decorativo adaptado para sumir suavemente no Dark Mode também
  const imageBackground = reverse
    ? 'bg-gradient-to-tl from-indigo-50 to-transparent dark:from-slate-900/50 dark:to-transparent'
    : 'bg-gradient-to-tr from-indigo-50 to-transparent dark:from-slate-900/50 dark:to-transparent'

  return (
    // Fundo da página inteira integrado ao Preto Absoluto
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-slate-950 px-4 sm:px-6 transition-colors duration-500">
      
      {/* Container do Card principal com bordas e fundo dark */}
      <div className="max-w-6xl w-full bg-white dark:bg-slate-900 border border-transparent dark:border-slate-800 shadow-lg rounded-xl overflow-hidden grid grid-cols-1 md:grid-cols-2 transition-colors duration-500">
        
        {/* Lado da Imagem */}
        <div className={`hidden md:flex items-center justify-center ${imageBackground} p-8 sm:p-10 transition-all duration-700 ease-out will-change-transform ${reverse ? 'md:order-2' : 'md:order-1'} ${isVisible ? 'md:translate-x-0 md:opacity-100' : imageMotion}`}>
          <div className="w-full max-w-sm transition-transform duration-700 ease-out">
            <img src={resolvedImage} alt="auth visual" className="w-full h-full object-cover rounded-xl" />
          </div>
        </div>

        {/* Lado do Formulário */}
        <div className={`p-6 sm:p-8 md:p-12 lg:p-16 transition-all duration-700 ease-out will-change-transform ${reverse ? 'md:order-1' : 'md:order-2'} ${isVisible ? 'md:translate-x-0 md:opacity-100' : formMotion}`}>
          
          {/* Link Voltar adaptado para o Verde Aroê / Lilás Serene */}
          <Link
            to={backTo}
            className="mb-4 sm:mb-6 inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-[#4DAA5C] dark:text-[#C3ACF1] transition hover:opacity-90"
          >
            <span aria-hidden="true">&laquo;</span>
            {backLabel}
          </Link>

          {/* Título e Subtítulo com suporte a Dark Mode */}
          <h2 className="text-2xl sm:text-3xl font-bold text-[#2A1F5E] dark:text-white transition-colors">
            {title}
          </h2>
          
          {subtitle && (
            <p className="text-xs sm:text-sm text-gray-500 dark:text-slate-400 mt-1 mb-4 sm:mb-6 transition-colors">
              {subtitle}
            </p>
          )}

          {/* Onde os inputs do Login entram */}
          {children}
        </div>
      </div>
    </div>
  )
}