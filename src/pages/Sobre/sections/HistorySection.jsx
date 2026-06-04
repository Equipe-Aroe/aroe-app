import { motion } from "framer-motion";

const highlights = ["Simples", "Rápido", "Sem complicação"];

const particles = [
  { id: 1, size: 6, left: "10%", top: "15%", duration: 6 },
  { id: 2, size: 8, left: "25%", top: "70%", duration: 8 },
  { id: 3, size: 5, left: "40%", top: "30%", duration: 7 },
  { id: 4, size: 10, left: "60%", top: "20%", duration: 9 },
  { id: 5, size: 7, left: "75%", top: "80%", duration: 6 },
  { id: 6, size: 5, left: "85%", top: "40%", duration: 8 },
  { id: 7, size: 9, left: "15%", top: "90%", duration: 7 },
  { id: 8, size: 6, left: "50%", top: "60%", duration: 10 },
]; 

export default function HistorySection() {
  return (
    <section className="relative min-h-screen overflow-hidden bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white py-20 px-6 transition-colors duration-500">

      {/* Glows de Fundo Adaptáveis */}
      <div className="absolute top-20 left-1/2 -translate-x-1/2 w-125 h-125 bg-secondary/15 dark:bg-secondary/10 blur-[140px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-100 h-100 bg-secondary/10 dark:bg-primary-light/10 blur-[120px] rounded-full pointer-events-none" />

      {/* Partículas */}
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute rounded-full bg-secondary/30 dark:bg-secondary/20 pointer-events-none"
          style={{
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            left: particle.left,
            top: particle.top,
          }}
          animate={{
            y: [0, -25, 0],
            opacity: [0.3, 1, 0.3],
          }}
          transition={{
            duration: particle.duration,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}

      <div className="relative z-10 max-w-6xl mx-auto">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center"
        >
          {/* Badge */}
          <span className="inline-flex px-4 py-2 rounded-full bg-slate-200/60 dark:bg-white/10 backdrop-blur-md border border-slate-300/50 dark:border-white/10 text-sm text-secondary dark:text-secondary-light font-medium mb-6">
            Nossa trajetória
          </span>

          <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 dark:text-white">
            Nossa história
          </h2>

          <div className="w-24 h-1 bg-secondary dark:bg-secondary-light rounded-full mx-auto mt-6" />

          <p className="mt-8 max-w-3xl mx-auto text-slate-600 dark:text-slate-300 text-base md:text-lg leading-relaxed">
            A Aroê nasceu para simplificar. Encontrar medicamentos manipulados
            pode ser demorado e confuso. Criamos uma forma de enviar sua
            receita, comparar preços e escolher a melhor opção em poucos
            passos.
          </p>
        </motion.div>

        {/* Highlights */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="flex flex-wrap justify-center gap-4 mt-12"
        >
          {highlights.map((label) => (
            <motion.div
              key={label}
              whileHover={{
                y: -4,
                scale: 1.05,
              }}
              className="
                px-6 py-3
                rounded-full
                bg-white dark:bg-white/10
                backdrop-blur-md
                border
                border-slate-200 dark:border-white/10
                hover:border-secondary dark:hover:border-secondary-light
                text-slate-800 dark:text-white
                shadow-sm dark:shadow-none
                transition-all
                duration-300
              "
            >
              <span className="font-medium">
                {label}
              </span>
            </motion.div>
          ))}
        </motion.div>

        {/* Imagem */}
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{
            duration: 0.8,
            delay: 0.3,
          }}
          className="mt-16"
        >
          <div className="relative">
            {/* Glow da imagem */}
            <div className="absolute inset-0 bg-secondary/10 dark:bg-secondary/5 blur-3xl rounded-[40px] pointer-events-none" />

            <motion.img
              src="/history-banner.png"
              alt="Farmacêutica, app Aroê e entregador"
              loading="lazy"
              whileHover={{
                scale: 1.01,
              }}
              transition={{
                duration: 0.6,
              }}
              className="
                relative
                w-full
                h-auto
                rounded-3xl md:rounded-[32px]
                border
                border-slate-200/60 dark:border-white/10
                shadow-[0_20px_50px_rgba(0,0,0,0.08)] dark:shadow-[0_20px_80px_rgba(0,0,0,0.4)]
                dark:brightness-95
                transition-all
                duration-500
              "
            />
          </div>
        </motion.div>

      </div>
    </section>
  );
}