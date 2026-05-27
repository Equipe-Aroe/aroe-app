// import pharmacist from "@/assets/pharmacist";
// import appMockup from "@/assets/app-mockup";
// import delivery from "@/assets/delivery";

export default function NossaHistoria() {
  return (
    <section className="bg-[#1e1b5e] text-white py-16 px-6 font-sans">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-center font-serif italic text-5xl md:text-6xl mb-12">
          Nossa história
        </h2>

        <p className="text-lg md:text-xl leading-relaxed max-w-3xl mb-10">
          A Aroê nasceu para simplificar.
          <br />
          Encontrar medicamentos manipulados pode ser demorado e confuso.
          Criamos uma forma de enviar sua receita, comparar preços e escolher a
          melhor opção em poucos passos.
        </p>

        <div className="flex flex-wrap justify-center gap-8 md:gap-20 mb-12">
          {["Simples", "Rápido", "Sem complicação"].map((label) => (
            <span
              key={label}
              className="bg-[#7be0a3] text-[#1e1b5e] font-bold px-8 py-3 rounded-full shadow-md"
            >
              {label}
            </span>
          ))}
        </div>

        <div className="grid grid-cols-3 gap-1">
          <img src={pharmacist} alt="Farmacêutica" loading="lazy" width={1024} height={1024} className="w-full h-56 md:h-64 object-cover" />
          <img src={appMockup} alt="App Aroê" loading="lazy" width={1024} height={1024} className="w-full h-56 md:h-64 object-cover" />
          <img src={delivery} alt="Entregador" loading="lazy" width={1024} height={1024} className="w-full h-56 md:h-64 object-cover" />
        </div>
      </div>
    </section>
  );
}