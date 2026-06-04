import { useState } from "react";
import {
  Sparkles,
  CheckCircle2,
  FileText,
  ShieldCheck,
  BadgeDollarSign,
} from "lucide-react";
import { motion } from "framer-motion";

const features = [
  {
    id: 1,
    number: "01",
    label: "Identificamos os medicamentos",
    detail:
      "Nossa IA lê receitas em foto ou PDF, reconhecendo medicamentos, dosagens e informações importantes.",
  },
  {
    id: 2,
    number: "02",
    label: "Consultamos farmácias parceiras",
    detail:
      "A receita é enviada automaticamente para farmácias verificadas que podem atender sua solicitação.",
  },
  {
    id: 3,
    number: "03",
    label: "Organizamos as melhores ofertas",
    detail:
      "Você compara preços, prazo de entrega e avaliações em um único lugar.",
  },
];

export default function IntelligenceSection() {
  const [activeFeature, setActiveFeature] = useState(1);

  return (
    <section
      className="
        relative
        overflow-hidden
        bg-gradient-to-br
        from-slate-50
        via-white
        to-violet-50
        dark:from-slate-950
        dark:via-slate-900
        dark:to-slate-950
        transition-colors
        duration-500
      "
    >
      {/* Background Blur */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-secondary/15 dark:bg-secondary/10 rounded-full blur-3xl" />
      <div className="absolute bottom-10 right-10 w-72 h-72 bg-primary-light/20 dark:bg-primary/20 rounded-full blur-3xl" />

      <div
        className="
          relative
          max-w-7xl
          mx-auto
          min-h-screen
          lg:min-h-212.5
          flex
          flex-col
          lg:flex-row
          items-center
          gap-8
          lg:gap-0
        "
      >
        {/* IMAGEM CORRIGIDA */}
        <div
          className="
            w-full
            lg:w-[45%]
            flex
            justify-center
            items-center
            px-4
            sm:px-6
            py-12
            sm:py-16
            lg:py-0
          "
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="
              relative
              w-full
              max-w-sm
              sm:max-w-md
              lg:max-w-lg
              xl:max-w-2xl
              flex
              items-center
              justify-center
            "
          >
            {/* Glow CORRIGIDO: Adicionado 'absolute' para não empurrar a imagem */}
            <div
              className="
                absolute
                top-1/2
                left-1/2
                -translate-x-1/2
                -translate-y-1/2
                w-72
                h-72
                lg:w-96
                lg:h-96
                rounded-full
                bg-gradient-to-r
                from-secondary/25
                to-primary-light/30
                dark:from-secondary/15
                dark:to-primary/20
                blur-3xl
                z-0
              "
            />

            {/* Mascote */}
            <motion.img
              src="/pill-mascot2.png"
              alt="Mascote Aroê"
              className="
                relative
                z-10
                w-full
                h-auto
                object-contain
              "
              animate={{
                y: [0, -15, 0],
              }}
              transition={{
                duration: 6,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />

            {/* Card 1 */}
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{
                duration: 5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="
                absolute
                top-12
                left-4
                z-20
                backdrop-blur-xl
                bg-white/90
                dark:bg-slate-800/90
                border
                border-slate-200
                dark:border-slate-700
                rounded-2xl
                px-4
                py-3
                shadow-xl
              "
            >
              <div className="flex items-center gap-2">
                <FileText size={18} className="text-secondary dark:text-secondary-light" />
                <div>
                  <p className="text-xs text-primary/60 dark:text-slate-400">Receita recebida</p>
                  <p className="text-sm font-semibold text-slate-900 dark:text-white">
                    IA analisando
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Card 2 */}
            <motion.div
              animate={{ y: [0, 12, 0] }}
              transition={{
                duration: 7,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="
                absolute
                top-1/3
                -right-2
                z-20
                backdrop-blur-xl
                bg-white/90
                dark:bg-slate-800/90
                border
                border-slate-200
                dark:border-slate-700
                rounded-2xl
                px-4
                py-3
                shadow-xl
              "
            >
              <div className="flex items-center gap-2">
                <ShieldCheck size={18} className="text-green-500" />
                <div>
                  <p className="text-xs text-slate-500 dark:text-slate-400">Receita validada</p>
                  <p className="text-sm font-semibold text-slate-900 dark:text-white">
                    Farmácias consultadas
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Card 3 */}
            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{
                duration: 6,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="
                absolute
                bottom-6
                left-4
                z-20
                backdrop-blur-xl
                bg-white/90
                dark:bg-slate-800/90
                border
                border-slate-200
                dark:border-slate-700
                rounded-2xl
                px-4
                py-3
                shadow-xl
                text-xs
                sm:text-sm
              "
            >
              <div className="flex items-center gap-2">
                <BadgeDollarSign size={18} className="text-primary-light" />
                <div>
                  <p className="text-xs text-slate-500 dark:text-slate-400">Melhor oferta</p>
                  <p className="text-sm font-semibold text-slate-900 dark:text-white">
                    Economia garantida
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* CONTEÚDO */}
        <div
          className="
            w-full
            lg:w-[55%]
            px-4
            sm:px-6
            lg:px-16
            py-8
            sm:py-12
            lg:py-16
          "
        >
          <motion.div
            className="max-w-xl"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary/10 border border-secondary/20 mb-6">
              <Sparkles size={16} className="text-secondary dark:text-secondary-light" />
              <span className="text-sm font-medium text-slate-900 dark:text-white">
                Tecnologia Aroê
              </span>
            </div>

            {/* Título */}
            <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold text-slate-900 dark:text-white leading-tight">
              Sua receita vira
              <span className="block text-primary-light">
                orçamentos em segundos
              </span>
            </h2>

            <p className="mt-4 sm:mt-6 text-base sm:text-lg text-slate-700 dark:text-slate-300 leading-relaxed">
              Nossa inteligência artificial interpreta sua receita, encontra
              farmácias parceiras e organiza automaticamente as melhores opções
              para você.
            </p>

            {/* Timeline */}
            <div className="mt-12 relative">
              <div className="absolute left-5 top-6 bottom-6 w-px bg-slate-300 dark:bg-slate-700" />

              <div className="flex flex-col gap-5">
                {features.map((feature, index) => {
                  const isActive = activeFeature === feature.id;

                  return (
                    <motion.div
                      key={feature.id}
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{
                        duration: 0.5,
                        delay: index * 0.15,
                      }}
                    >
                      <button
                        onClick={() =>
                          setActiveFeature(isActive ? null : feature.id)
                        }
                        className={`w-full relative text-left rounded-3xl transition-all duration-300 backdrop-blur-md border overflow-hidden ${
                          isActive
                            ? "bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 shadow-xl"
                            : "bg-white/70 dark:bg-slate-900/70 border-slate-200 dark:border-slate-700 hover:bg-white dark:hover:bg-slate-800 hover:-translate-y-1 hover:shadow-2xl"
                        }`}
                      >
                        <div className="flex items-center gap-4 px-6 py-5">
                          <div
                            className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition-all ${
                              isActive
                                ? "bg-primary text-white"
                                : "bg-slate-200 dark:bg-slate-700 text-slate-900 dark:text-white"
                            }`}
                          >
                            {feature.number}
                          </div>

                          <div className="flex-1">
                            <div className="flex items-center gap-2">
                              <CheckCircle2
                                size={16}
                                className={
                                  isActive
                                    ? "text-slate-900 dark:text-white"
                                    : "text-slate-400 dark:text-slate-500"
                                }
                              />

                              <span
                                className={`font-semibold ${
                                  isActive
                                    ? "text-slate-900 dark:text-white"
                                    : "text-slate-700 dark:text-slate-400"
                                }`}
                              >
                                {feature.label}
                              </span>
                            </div>

                            <div
                              className={`transition-all duration-300 overflow-hidden ${
                                isActive
                                  ? "max-h-40 opacity-100 mt-3"
                                  : "max-h-0 opacity-0"
                              }`}
                            >
                              <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                                {feature.detail}
                              </p>
                            </div>
                          </div>
                        </div>
                      </button>
                    </motion.div>
                  );
                })}
              </div>
            </div>

            {/* CTA */}
            <button className="mt-10 px-6 py-3 rounded-full bg-primary text-white font-medium hover:scale-105 transition-all shadow-lg">
              Experimentar agora
            </button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}