import { ArrowRight, Github, Linkedin } from "lucide-react";
import bruno from "./assets/bruno";
import gabriel from "./assets/gabriel";
import amanda from "./assets/amanda";
import isabelly from "./assets/isabelly";
import emelly from "./assets/emelly";
import felipe from "./assets/felipe";
import leandro from "./assets/leandro";
import paulo from "./assets/paulo";
 
const team = [
  { name: "Bruno Brito", role: "Product Owner", img: bruno, desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit." },
  { name: "Gabriel Alecrim", role: "Scrum Master", img: gabriel, desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit." },
  { name: "Amanda Carvalho", role: "Full Stack", img: amanda, desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit." },
  { name: "Isabelly Junin", role: "Marketing", img: isabelly, desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit." },
  { name: "Emelly", role: "Designer", img: emelly, desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit." },
  { name: "Felipe", role: "Back-End", img: felipe, desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit." },
  { name: "Leandro Muniz", role: "Full-Stack", img: leandro, desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit." },
  { name: "Paulo Henrique", role: "Back-End", img: paulo, desc: "Desgraçado manda logo a foto" },
];
 
export default function Team() {
  return (
<div className="min-h-screen bg-white px-6 py-16 md:px-16">
<div className="mx-auto max-w-6xl">
<span className="inline-flex items-center gap-2 rounded-md bg-indigo-50 px-2 py-1 text-xs font-medium text-indigo-600">
          ✦ Our team
</span>
<h1 className="mt-4 text-4xl font-bold tracking-tight text-gray-900 md:text-5xl">
          Conheça nossa equipe
</h1>
<p className="mt-3 max-w-2xl text-sm text-gray-500">
          Complete the form below to send us a message. Our support team will promptly respond to your request.
</p>
<button className="mt-5 inline-flex items-center gap-2 rounded-md bg-indigo-900 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-800">
          Contato <ArrowRight className="h-4 w-4" />
</button>
</div>
 
      <div className="mx-auto mt-12 max-w-5xl px-6 md:px-16">
<div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          {team.map((m) => (
<div key={m.name} className="flex gap-4 rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
<img
                src={m.img}
                alt={m.name}
                loading="lazy"
                width={1024}
                height={1024}
                className="h-32 w-32 flex-shrink-0 rounded-md object-cover"
              />
<div className="flex flex-col">
<h3 className="text-base font-semibold text-gray-900">{m.name}</h3>
<p className="text-sm font-medium text-indigo-600">{m.role}</p>
<p className="mt-2 text-sm text-gray-500">{m.desc}</p>
<div className="mt-auto flex gap-3 pt-3 text-gray-400">
<Github className="h-4 w-4 cursor-pointer hover:text-gray-700" />
<Linkedin className="h-4 w-4 cursor-pointer hover:text-gray-700" />
</div>
</div>
</div>
          ))}
</div>
</div>
</div>
  );
}