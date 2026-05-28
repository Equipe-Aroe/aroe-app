const highlights = ["Simples", "Rápido", "Sem complicação"]

export default function HistorySection() {
  return (
    <section className="h-screen bg-primary text-white py-16 px-6 sm:px-10">
      <div className="max-w-5xl mx-auto flex flex-col gap-8">

        <h2 className="text-center font-serif text-5xl md:text-6xl font-bold leading-tight">
          Nossa história
        </h2>

        <p className="text-base md:text-lg leading-relaxed max-w-3xl text-white">
          A Aroê nasceu para simplificar.<br />
          Encontrar medicamentos manipulados pode ser demorado e confuso. Criamos
          uma forma de enviar sua receita, comparar preços e escolher a melhor
          opção em poucos passos.
        </p>

        <div className="flex flex-wrap justify-around  gap-3">
          {highlights.map((label) => (
            <span
              key={label}
              className="border-2 border-secondary text-white font-bold text-sm px-8 py-2.5 rounded-full"
            >
              {label}
            </span>
          ))}
        </div>

        <img
          src="/history-banner.png"
          alt="Farmacêutica, app Aroê e entregador"
          loading="lazy"
          className="w-full h-52 md:h-72 object-cover rounded-2xl"
        />

      </div>
    </section>
  )
}