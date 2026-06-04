import { Link } from "react-router-dom"

const variants = {

    primary: 'bg-primary hover:bg-primary/90 text-white rounded-xl shadow-md shadow-primary/20',

    primaryFull: 'w-full justify-center bg-primary hover:bg-primary/90 active:scale-[0.98] text-white rounded-lg shadow-md shadow-primary/20',

    outline: 'bg-white/8 border border-white/30 text-white hover:bg-white/15 rounded-xl backdrop-blur-sm',
    
    outlineFull: 'w-full justify-center bg-white border border-gray-200 text-gray-700 hover:bg-gray-50 active:scale-[0.98] rounded-lg shadow-sm',

    outlineDark: 'border-2 border-primary/30 text-primary hover:border-primary/60 hover:bg-primary/5 rounded-xl',

    navOutline: 'border border-white/50 text-white hover:bg-white/12 rounded-full',

    navPrimary: 'bg-secondary hover:bg-secondary/90 text-white rounded-full shadow-sm shadow-secondary/20',
}



export default function Button({
    children,
    variant = 'primary',
    to,
    type = 'button',
    className = '',
    onClick,
}) {
    const base =
        `inline-flex items-center gap-2 text-xs sm:text-sm font-semibold px-4 sm:px-6 py-2 sm:py-2.5 ` +
        `cursor-pointer transition-all duration-300 select-none ` +
        `${variants[variant] ?? variants.primary} ${className}`
 
    if (to) {
        return (
            <Link to={to} className={base}>
                {children}
            </Link>
        )
    }
 
    return (
        <button type={type} onClick={onClick} className={base}>
            {children}
        </button>
    )
}
