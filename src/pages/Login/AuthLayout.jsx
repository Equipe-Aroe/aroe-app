import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
// Use public images served from the `public/` folder
// Place your images at `public/loginimg` and `public/registroimg` (with extension)

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

  const imageBackground = reverse
    ? 'bg-gradient-to-tl from-indigo-50 to-transparent'
    : 'bg-gradient-to-tr from-indigo-50 to-transparent'

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4 sm:px-6">
      <div className="max-w-6xl w-full bg-white shadow-lg rounded-xl overflow-hidden grid grid-cols-1 md:grid-cols-2">
        <div className={`hidden md:flex items-center justify-center ${imageBackground} p-8 sm:p-10 transition-all duration-700 ease-out will-change-transform ${reverse ? 'md:order-2' : 'md:order-1'} ${isVisible ? 'md:translate-x-0 md:opacity-100' : imageMotion}`}>
          <div className="w-full max-w-sm transition-transform duration-700 ease-out">
            <img src={resolvedImage} alt="auth visual" className="w-full h-full object-cover" />
          </div>
        </div>

        <div className={`p-6 sm:p-8 md:p-12 lg:p-16 transition-all duration-700 ease-out will-change-transform ${reverse ? 'md:order-1' : 'md:order-2'} ${isVisible ? 'md:translate-x-0 md:opacity-100' : formMotion}`}>
          <Link
            to={backTo}
            className="mb-4 sm:mb-6 inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-emerald-600 transition hover:text-emerald-700"
          >
            <span aria-hidden="true">&laquo;</span>
            {backLabel}
          </Link>

          <h2 className="text-2xl sm:text-3xl font-bold text-gray-800">{title}</h2>
          {subtitle && <p className="text-xs sm:text-sm text-gray-500 mt-1 mb-4 sm:mb-6">{subtitle}</p>}

          {children}
        </div>
      </div>
    </div>
  )
}
