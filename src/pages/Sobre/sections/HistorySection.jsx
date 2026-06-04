const highlights = ["Simples", "Rápido", "Sem complicação"]

export default function HistorySection() {
  return (
    <section className="min-h-screen bg-primary text-white py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-10">
      <div className="max-w-5xl mx-auto flex flex-col gap-6 sm:gap-8">

        <h2 className="text-center font-serif text-2xl sm:text-3xl lg:text-4xl xl:text-5xl lg:text-6xl font-bold leading-tight">
          Nossa história
        </h2>

        <p className="text-xs sm:text-sm lg:text-base lg:text-lg leading-relaxed max-w-3xl text-white mx-auto text-center sm:text-left">
          A Aroê nasceu para simplificar.<br />
          Encontrar medicamentos manipulados pode ser demorado e confuso. Criamos
          uma forma de enviar sua receita, comparar preços e escolher a melhor
          opção em poucos passos.
        </p>

        <div className="flex flex-wrap justify-center sm:justify-start  gap-2 sm:gap-3">
          {highlights.map((label) => (
            <span
              key={label}
              className="border-2 border-secondary text-white font-bold text-xs sm:text-sm px-4 sm:px-8 py-1.5 sm:py-2.5 rounded-full whitespace-nowrap"
            >
              {label}
            </span>
          ))}
        </div>

        <img
          src="/history-banner.png"
          alt="Farmacêutica, app Aroê e entregador"
          loading="lazy"
          className="w-full h-40 sm:h-52 lg:h-72 object-cover rounded-2xl"
        />

      </div>
    </section>
  )
}