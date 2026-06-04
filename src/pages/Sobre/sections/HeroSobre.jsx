import { motion } from "framer-motion";

export default function HeroSobre() {
  return (
    <section className="relative overflow-hidden bg-white dark:bg-slate-950 pt-32 pb-24 transition-colors duration-500">
      
      {/* Wave/Blur decorativo no topo */}
      <div className="absolute top-0 left-0 w-full overflow-hidden pointer-events-none">
        <svg viewBox="0 0 1440 320" className="w-full h-auto">
          <path
            className="fill-[#2A1F5E] dark:fill-slate-900 transition-colors duration-500"
            d="M0,96L120,122.7C240,149,480,203,720,202.7C960,203,1200,149,1320,122.7L1440,96L1440,0L1320,0C1200,0,960,0,720,0C480,0,240,0,120,0L0,0Z"
          />
        </svg>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          
          {/* Coluna de Texto */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            {/* Badge adaptável */}
            <span className="inline-flex px-4 py-2 rounded-full bg-secondary/10 dark:bg-secondary-light/10 text-secondary dark:text-secondary-light font-medium text-sm mb-6 tracking-wide">
              PROJETO AROÊ
            </span>

            {/* Título Principal */}
            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold text-slate-900 dark:text-white leading-tight">
              Quem somos
            </h1>

            {/* Divisor */}
            <div className="w-24 h-1 bg-secondary dark:bg-secondary-light rounded-full my-6" />

            {/* Parágrafo de descrição */}
            <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed max-w-xl">
              A Aroê nasceu para simplificar o acesso a medicamentos
              manipados, conectando pacientes e farmácias através da
              tecnologia e da inteligência artificial.
            </p>
          </motion.div>

          {/* Coluna da Imagem */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="w-full"
          >
            <div className="relative group">
              {/* Efeito sutil de glow atrás da imagem no dark mode */}
              <div className="absolute inset-0 bg-secondary/10 dark:bg-secondary-light/5 rounded-[32px] blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
              
              <img
                src="/equipe-aroe.jpeg"
                alt="Equipe Aroê"
                className="
                  w-full
                  rounded-[32px]
                  shadow-2xl
                  dark:shadow-secondary/5
                  object-cover
                  aspect-[4/3]
                  border border-slate-100 dark:border-slate-800/60
                  dark:brightness-95
                  transition-all
                  duration-500
                "
              />
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}