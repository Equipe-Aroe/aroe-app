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
    <section className="relative overflow-hidden bg-gradient-to-br from-secondary/5 via-white to-primary/5">
      {/* Background Blur */}
      <div className="absolute top-10 sm:top-20 left-5 sm:left-10 w-48 sm:w-72 h-48 sm:h-72 bg-secondary/10 rounded-full blur-3xl" />
      <div className="absolute bottom-10 right-5 sm:right-10 w-48 sm:w-72 h-48 sm:h-72 bg-primary/10 rounded-full blur-3xl" />

      <div
        className="
    relative
    max-w-7xl
    mx-auto
    min-h-screen
    lg:min-h-[850px]
    flex
    flex-col
    lg:flex-row
    items-center
    gap-8
    lg:gap-0
  "
      >
        {/* IMAGEM */}
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
  "
          >
            {/* Glow */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="w-72 h-72 lg:w-96 lg:h-96 rounded-full bg-gradient-to-r from-secondary/20 to-primary/20 blur-3xl" />
            </div>

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
              className="absolute top-8 sm:top-16 -left-2 sm:left-0 lg:left-8 z-20 backdrop-blur-md bg-white/80 border border-white rounded-xl sm:rounded-2xl px-3 sm:px-4 py-2 sm:py-3 shadow-xl text-xs sm:text-sm"
            >
              <div className="flex items-center gap-2">
                <FileText size={18} className="text-secondary" />
                <div>
                  <p className="text-xs text-primary/60">Receita recebida</p>
                  <p className="text-sm font-semibold text-primary">
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
              className="absolute top-[50%] -right-2 sm:right-0 lg:right-8 z-20 backdrop-blur-md bg-white/80 border border-white rounded-xl sm:rounded-2xl px-3 sm:px-4 py-2 sm:py-3 shadow-xl text-xs sm:text-sm"
            >
              <div className="flex items-center gap-2">
                <ShieldCheck size={18} className="text-green-500" />
                <div>
                  <p className="text-xs text-primary/60">Receita validada</p>
                  <p className="text-sm font-semibold text-primary">
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
              className="absolute -bottom-1 sm:bottom-12 left-2 sm:left-4 lg:left-12 z-20 backdrop-blur-md bg-white/80 border border-white rounded-xl sm:rounded-2xl px-3 sm:px-4 py-2 sm:py-3 shadow-xl text-xs sm:text-sm"
            >
              <div className="flex items-center gap-2">
                <BadgeDollarSign size={18} className="text-primary-light" />
                <div>
                  <p className="text-xs text-primary/60">Melhor oferta</p>
                  <p className="text-sm font-semibold text-primary">
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
              <Sparkles size={16} className="text-secondary" />
              <span className="text-sm font-medium text-primary">
                Tecnologia Aroê
              </span>
            </div>

            {/* Título */}
            <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold text-primary leading-tight">
              Sua receita vira
              <span className="block text-primary-light">
                orçamentos em segundos
              </span>
            </h2>

            <p className="mt-4 sm:mt-6 text-base sm:text-lg text-primary/70 leading-relaxed">
              Nossa inteligência artificial interpreta sua receita, encontra
              farmácias parceiras e organiza automaticamente as melhores opções
              para você.
            </p>

            {/* Timeline */}
            <div className="mt-12 relative">
              <div className="absolute left-5 top-6 bottom-6 w-px bg-primary/10" />

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
                            ? "bg-white/90 border-primary/20 shadow-xl"
                            : "bg-white/60 border-primary/10 hover:bg-white hover:-translate-y-1 hover:shadow-2xl"
                        }`}
                      >
                        <div className="flex items-center gap-4 px-6 py-5">
                          <div
                            className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition-all ${
                              isActive
                                ? "bg-primary text-white"
                                : "bg-primary/10 text-primary"
                            }`}
                          >
                            {feature.number}
                          </div>

                          <div className="flex-1">
                            <div className="flex items-center gap-2">
                              <CheckCircle2
                                size={16}
                                className={
                                  isActive ? "text-primary" : "text-primary/40"
                                }
                              />

                              <span
                                className={`font-semibold ${
                                  isActive ? "text-primary" : "text-primary/80"
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
                              <p className="text-sm text-primary/70 leading-relaxed">
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
