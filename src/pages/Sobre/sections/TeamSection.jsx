import { ArrowRight } from "lucide-react"
import { Link } from "react-router-dom"

const team = [
  {
    name: "Bruno Brito",
    role: "Product Owner",
    roleColor: "#4DAA5C",
    img: "/team/bruno.png",
    github: "https://github.com/brunobdev04",
    linkedin: "https://linkedin.com/in/brunobdev04",
  },
  {
    name: "Gabriel Alecrim",
    role: "Scrum Master",
    roleColor: "#4DAA5C",
    img: "/team/gabriel.png",
    github: "https://github.com/gabriel.old",
    linkedin: "https://linkedin.com/in/gabriel-oldrado",
  },
  {
    name: "Amanda Carvalho",
    role: "Full Stack",
    roleColor: "#FD6925",
    img: "/team/amanda.png",
    github: "https://github.com/Amanda-SCarvalho",
    linkedin: "https://linkedin.com/in/amanda-scarvalho ",
  },
  {
    name: "Isabelly Junin",
    role: "Marketing",
    roleColor: "#FD6925",
    img: "/team/isabelly.png",
    github: "https://github.com/belly23cassimiro-arch",
    linkedin: "https://linkedin.com/in/isabelly-cassimiro",
  },
  {
    name: "Emelly",
    role: "Designer",
    roleColor: "#2A1F5E",
    img: "/team/emelly.png",
    github: "https://github.com/emillylaianny-bot",
    linkedin: "https://linkedin.com/in/emelly-laianny-gomes-441a78305",
  },
  {
    name: "Felipe",
    role: "Back-End",
    roleColor: "#FD6925",
    img: "/team/felipe.png",
    github: "https://github.com/Felipeclem-dotcom",
    linkedin: "https://linkedin.com/in/felipe-clementino",
  },
  {
    name: "Leandro Muniz",
    role: "Full-Stack",
    roleColor: "#2A1F5E",
    img: "/team/leandro.png",
    github: "https://github.com/Leand09",
    linkedin: "https://linkedin.com/in/leandromunizsantana",
  },
  {
    name: "Paulo Henrique",
    role: "Back-End",
    roleColor: "#FD6925",
    img: "/team/paulo.png",
    github: "https://github.com/PauloHQueirozz",
    linkedin: "https://linkedin.com/in/paulo-queiroz-064a522b6",
  },
]

function GitHubIcon() {
  return (
    <svg viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor">
      <path d="M12 2C6.477 2 2 6.477 2 12c0 4.418 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.009-.868-.013-1.703-2.782.604-3.369-1.342-3.369-1.342-.454-1.155-1.11-1.463-1.11-1.463-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0 1 12 6.836a9.59 9.59 0 0 1 2.504.337c1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.202 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.163 22 16.418 22 12c0-5.523-4.477-10-10-10z" />
    </svg>
  )
}

function LinkedInIcon() {
  return (
    <svg viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  )
}

function MemberCard({ name, role, roleColor, bio, img, github, linkedin }) {
  return (
    <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 rounded-2xl border border-gray-200 bg-white p-3 sm:p-4 shadow-sm hover:shadow-md hover:border-gray-300 transition-all duration-300">
      <img
        src={img}
        alt={`Foto de ${name}`}
        loading="lazy"
        className="h-24 sm:h-28 w-24 sm:w-28 flex-shrink-0 rounded-xl object-cover object-top bg-gray-100"
      />
      <div className="flex flex-col gap-1 min-w-0 flex-1">
        <h3 className="text-sm sm:text-base font-bold text-primary">{name}</h3>
        <p className="text-xs sm:text-sm font-semibold" style={{ color: roleColor }}>{role}</p>
        <p className="text-xs text-gray-500 leading-relaxed mt-0.5 line-clamp-2">{bio}</p>
        <div className="mt-auto flex gap-2 pt-2">
          <a
            href={github}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`GitHub de ${name}`}
            className="w-6 sm:w-7 h-6 sm:h-7 rounded-md border border-gray-200 flex items-center justify-center text-gray-400 hover:text-primary hover:border-primary/30 transition-all duration-200 flex-shrink-0"
          >
            <GitHubIcon />
          </a>
          <a
            href={linkedin}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`LinkedIn de ${name}`}
            className="w-6 sm:w-7 h-6 sm:h-7 rounded-md border border-gray-200 flex items-center justify-center text-gray-400 hover:text-primary hover:border-primary/30 transition-all duration-200 flex-shrink-0"
          >
            <LinkedInIcon />
          </a>
        </div>
      </div>
    </div>
  )
}

export default function TeamSection() {
  return (
    <section className="bg-white px-4 sm:px-6 lg:px-10 py-12 sm:py-16 lg:py-20">
      <div className="mx-auto max-w-5xl flex flex-col gap-8 sm:gap-10">

        {/* Header */}
        <div className="flex flex-col gap-3 sm:gap-4">
          <span className="inline-flex items-center gap-2 self-start text-xs font-semibold px-3 py-1.5 rounded-full bg-primary/8 text-primary border border-primary/15">
            <svg viewBox="0 0 24 24" className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
              <circle cx="9" cy="7" r="4" />
              <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
              <path d="M16 3.13a4 4 0 0 1 0 7.75" />
            </svg>
            Our team
          </span>

          <div>
            <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold text-primary leading-tight">
              Conheça nossa equipe
            </h2>
            <p className="mt-2 text-xs sm:text-sm text-gray-500 max-w-xl">
              Complete the form below to send us a message. Our support team will promptly respond to your request.
            </p>
          </div>

          <Link
            to="/contato"
            className="inline-flex items-center gap-2 self-start rounded-xl bg-primary px-5 py-2.5 text-sm font-semibold text-white hover:bg-primary/90 transition-colors duration-200"
          >
            Contato <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {team.map((member) => (
            <MemberCard key={member.name} {...member} />
          ))}
        </div>

      </div>
    </section>
  )
}
