import { Crosshair, Eye, TreePine, MapPin } from "lucide-react";
 
const valores = [

  "Agilidade",

  "Continuidade",

  "Empatia",

  "Economia",

  "Segurança",

  "Transparência",

  "Diversidade",

];
 
export default function MvvSection() {

  return (
<section className="bg-[#eeecfb] min-h-screen w-full flex items-center py-16 px-6 md:px-12">
<div className="w-full max-w-[1600px] mx-auto">
<h2 className="text-center text-4xl md:text-5xl font-serif font-bold">
<span className="text-[#2d1b69]">Missão, Visão e </span>
<span className="text-[#22c55e]">Valores</span>
</h2>
<p className="text-center text-[#2d1b69] font-semibold mt-6 mb-12">

          Os princípios que guiam nossas decisões e nos movem todos os dias
</p>
 
        <div className="space-y-8">

          {/* Missão */}
<div className="bg-white rounded-3xl border border-[#22c55e]/40 shadow-md px-10 py-10 flex items-center gap-10">
<div className="shrink-0 w-20 h-20 rounded-full bg-[#22c55e] flex items-center justify-center">
<Crosshair className="w-10 h-10 text-white" strokeWidth={2.5} />
</div>
<h3 className="text-3xl text-[#2d1b69] font-medium w-40 shrink-0">Missão</h3>
<p className="text-base text-[#2d1b69]/80 leading-relaxed">

              Contribuir simplificando o acesso a medicamentos manipulados por meio de plataforma digital.

              Queremos conectar pacientes e farmácias garantindo a continuidade dos tratamentos de saúde

              e <em>economia</em>.
</p>
</div>
 
          {/* Visão */}
<div className="bg-white rounded-3xl border border-[#2d1b69]/30 shadow-md px-10 py-10 flex items-center gap-10">
<div className="shrink-0 w-20 h-20 rounded-full bg-[#2d1b69] flex items-center justify-center">
<Eye className="w-10 h-10 text-white" strokeWidth={2.5} />
</div>
<h3 className="text-3xl text-[#2d1b69] font-medium w-40 shrink-0">Visão</h3>
<p className="text-base text-[#2d1b69]/80 leading-relaxed">

              Nos consolidar como a solução facilitadora para quem depende desses medicamentos.

              Queremos transformar um processo que hoje é manual e cansativo em uma experiência digital,

              simples, humana, e acima de tudo, eficiente.
</p>
</div>
 
          {/* Valores */}
<div className="bg-white rounded-3xl border border-[#22c55e]/40 shadow-md px-10 py-10 flex items-center gap-10">
<div className="shrink-0 w-20 h-20 rounded-full bg-[#22c55e] flex items-center justify-center">
<TreePine className="w-10 h-10 text-white" strokeWidth={2.5} />
</div>
<h3 className="text-3xl text-[#2d1b69] font-medium w-40 shrink-0">Valores</h3>
<div className="grid grid-cols-2 md:grid-cols-4 gap-x-8 gap-y-4 text-base text-[#2d1b69]/80 flex-1">

              {valores.map((v) => (
<div key={v} className="flex items-center gap-2">
<MapPin className="w-5 h-5 text-[#22c55e]" />
<span>{v}</span>
</div>

              ))}
</div>
</div>
</div>
</div>
</section>

  );

}
 