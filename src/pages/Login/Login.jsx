import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Moon, Sun, Accessibility } from 'lucide-react'
import AuthLayout from './AuthLayout'
import Button from '../../components/ui/Button'
import { useThemeContext } from '../../contexts/ThemeContext'
import AccessibilityToolbar from '../../components/layout/AccessibilityToolbar'

function GoogleIcon() {
    return (
        <svg className="w-4 sm:w-5 h-4 sm:h-5" viewBox="0 0 24 24" aria-hidden="true" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M23.64 12.205c0-.78-.07-1.53-.2-2.255H12v4.27h6.41c-.28 1.5-1.06 2.77-2.26 3.62v3.01h3.65c2.13-1.96 3.36-4.86 3.36-8.64z" fill="#4285F4"/>
            <path d="M12 24c2.7 0 4.97-.9 6.63-2.45l-3.65-3.01c-1.02.68-2.33 1.08-3.99 1.08-3.06 0-5.66-2.06-6.59-4.84H1.66v3.04C3.32 20.9 7.33 24 12 24z" fill="#34A853"/>
            <path d="M5.41 14.78a7.44 7.44 0 010-4.56V7.18H1.66a12 12 0 000 9.64l3.75-2.04z" fill="#FBBC05"/>
            <path d="M12 4.78c1.47 0 2.78.5 3.82 1.48l2.86-2.86C16.97 1.72 14.7 1 12 1 7.33 1 3.32 4.1 1.66 8.18l3.75 2.04C6.34 6.84 8.94 4.78 12 4.78z" fill="#EA4335"/>
        </svg>
    )
}

export default function Login() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate()
    const { darkMode, toggleDarkMode } = useThemeContext()

    function handleSubmit(e) {
        e.preventDefault()
        console.log('login', { email, password })
        alert('Login realizado com sucesso')
        navigate('/dashboard')
    }

    return (
        // Forçando o fundo da página inteira a mudar no dark mode
        <div className="relative min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors duration-500">
            
            {/* Controles Flutuantes */}
            <div className="absolute top-4 right-4 sm:top-6 sm:right-6 z-50 flex items-center gap-2 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md p-1.5 rounded-xl border border-gray-200 dark:border-slate-800 shadow-sm">
                <div className="text-slate-600 dark:text-slate-300 hover:bg-gray-100 dark:hover:bg-slate-800 rounded-lg transition p-0.5">
                    <AccessibilityToolbar scrolled={true} darkMode={darkMode} icon={<Accessibility size={19} />} />
                </div>
                <div className="h-4 w-[1px] bg-gray-200 dark:bg-slate-800" />
                <button
                    type="button"
                    onClick={toggleDarkMode}
                    aria-label={darkMode ? "Ativar modo claro" : "Ativar modo escuro"}
                    className="p-2 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-gray-100 dark:hover:bg-slate-800 transition focus:outline-none focus:ring-2 focus:ring-[#4DAA5C]"
                >
                    {darkMode ? <Sun size={19} /> : <Moon size={19} />}
                </button>
            </div>

            {/* Form de Login */}
            <AuthLayout title="Seja bem-vindo" subtitle="Faça o login na sua conta">
                <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-4">
                    <div>
                        <label className="block text-xs font-semibold text-gray-600 dark:text-slate-400">Email</label>
                        <input
                            type="email"
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                            placeholder="exemplo@exemplo.com"
                            required
                            className="mt-2 w-full px-3 sm:px-4 py-2 sm:py-3 text-sm bg-white dark:bg-slate-900 text-[#2A1F5E] dark:text-white border border-gray-200 dark:border-slate-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4DAA5C] placeholder-gray-400 dark:placeholder-slate-500 transition-colors"
                        />
                    </div>

                    <div>
                        <label className="block text-xs font-semibold text-gray-600 dark:text-slate-400">Senha</label>
                        <input
                            type="password"
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                            placeholder="entre com a sua senha"
                            required
                            className="mt-2 w-full px-3 sm:px-4 py-2 sm:py-3 text-sm bg-white dark:bg-slate-900 text-[#2A1F5E] dark:text-white border border-gray-200 dark:border-slate-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4DAA5C] placeholder-gray-400 dark:placeholder-slate-500 transition-colors"
                        />
                        <div className="text-xs sm:text-sm text-right mt-2">
                            <Link to="#" className="text-[#4DAA5C] dark:text-[#C3ACF1] font-medium hover:underline">Esqueceu a senha?</Link>
                        </div>
                    </div>

                    <Button type="submit" variant="primaryFull" className="py-2 sm:py-3 text-sm sm:text-base mt-2">
                        Entrar
                    </Button>

                    <div className="flex items-center gap-3 py-1">
                        <div className="flex-1 border-t border-gray-200 dark:border-slate-800" />
                        <div className="text-xs text-gray-400 dark:text-slate-500 font-medium">Ou</div>
                        <div className="flex-1 border-t border-gray-200 dark:border-slate-800" />
                    </div>

		<Button type="button" variant="outlineFull" className="py-2 sm:py-3 text-xs sm:text-sm">
		  <GoogleIcon />
		  Continue com Google
		</Button>

                    <p className="text-center text-xs sm:text-sm text-gray-500 dark:text-slate-400 pt-2">
                        Não tem uma conta? <Link to="/register" className="text-[#4DAA5C] dark:text-[#C3ACF1] font-semibold hover:underline">Cadastre-se</Link>
                    </p>
                </form>
            </AuthLayout>
        </div>
    )
}