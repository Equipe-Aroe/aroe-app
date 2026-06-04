import { motion } from "framer-motion";

export default function HeroSobre() {
  return (
    <section className="relative overflow-hidden bg-white pt-32 pb-24">
      {/* Blur decorativo */}
      <div className="absolute top-0 left-0 w-full overflow-hidden">
        <svg viewBox="0 0 1440 320" className="w-full h-auto">
          <path
            fill="#2A1F5E"
            d="M0,96L120,122.7C240,149,480,203,720,202.7C960,203,1200,149,1320,122.7L1440,96L1440,0L1320,0C1200,0,960,0,720,0C480,0,240,0,120,0L0,0Z"
          />
        </svg>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Texto */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <span className="inline-flex px-4 py-2 rounded-full bg-secondary/10 text-secondary font-medium text-sm mb-6">
              PROJETO AROÊ
            </span>

            <h1 className="font-serif text-5xl lg:text-6xl text-primary leading-tight">
              Quem somos
            </h1>

            <div className="w-24 h-1 bg-secondary rounded-full my-6" />

            <p className="text-lg text-primary/70 leading-relaxed max-w-xl">
              A Aroê nasceu para simplificar o acesso a medicamentos
              manipulados, conectando pacientes e farmácias através da
              tecnologia e da inteligência artificial.
            </p>
          </motion.div>

          {/* Foto */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <img
              src="/equipe-aroe.jpeg"
              alt="Equipe Aroê"
              className="
                w-full
                rounded-[32px]
                shadow-2xl
                object-cover
                aspect-[4/3]
              "
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
