import { Heart } from "lucide-react";

import storyFuture from "@/assets/story-future.jpg";
import storyPaths from "@/assets/story-paths.jpg";
import storyUnion from "@/assets/story-union.jpg";
import storyVows from "@/assets/story-vows.jpg";

const storyMoments = [
  {
    number: "01",
    title: "Quando nossos caminhos se cruzaram",
    description: "Dois caminhos, um encontro que transformou tudo.",
    image: storyPaths,
    imageAlt: "Dois fios dourados se encontram junto a uma pequena flor sobre um fundo marfim",
  },
  {
    number: "02",
    title: "Quando o “eu” virou “nós”",
    description: "Escolhas diárias que nos fizeram escolher um ao outro.",
    image: storyUnion,
    imageAlt: "Duas alianças douradas entrelaçadas sobre tecido e fita em tons champagne",
  },
  {
    number: "03",
    title: "Quando o futuro virou plano",
    description: "Sonhos que dividimos, planos que começamos a construir.",
    image: storyFuture,
    imageAlt:
      "Chave antiga, envelope com selo botânico, bilhete e pequena casa sobre tecidos claros",
  },
  {
    number: "04",
    title: "O nosso sim",
    date: "27.06.2026",
    description: "O começo oficial de uma vida inteira juntos.",
    image: storyVows,
    imageAlt: "Medalhão com monograma N e M, duas alianças e flores sobre tecido marfim",
  },
] as const;

function BotanicalBranch({ className }: { className: string }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 260 360"
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g stroke="currentColor" strokeWidth="1.15" strokeLinecap="round" strokeLinejoin="round">
        <path d="M246 4C226 59 201 104 171 147C132 202 91 248 22 351" />
        <path d="M205 98C205 67 215 39 240 20C243 54 232 82 205 98Z" />
        <path d="M177 142C164 109 169 75 190 49C200 83 196 114 177 142Z" />
        <path d="M151 180C123 165 104 140 101 110C131 123 149 147 151 180Z" />
        <path d="M118 222C89 211 66 189 59 160C90 169 111 190 118 222Z" />
        <path d="M83 270C57 263 31 245 19 218C49 223 73 241 83 270Z" />
        <path d="M181 137C215 126 240 132 255 151C226 160 201 156 181 137Z" />
        <path d="M142 190C177 183 204 193 217 216C184 220 159 211 142 190Z" />
        <path d="M105 238C137 234 160 248 170 270C139 271 117 260 105 238Z" />
        <path d="M49 308C75 306 96 317 108 337C82 340 61 330 49 308Z" />
        <path d="M218 97C233 91 247 97 253 111C239 119 224 113 218 97Z" />
        <path d="M137 166C144 145 160 134 180 137C180 157 164 171 137 166Z" />
        <path d="M87 259C92 239 107 226 128 228C127 248 112 262 87 259Z" />
      </g>
    </svg>
  );
}

export function StoryChapters() {
  return (
    <section
      id="historia"
      aria-labelledby="history-heading"
      className="relative isolate overflow-hidden bg-cream px-5 py-24 sm:px-8 md:py-28 lg:py-32"
    >
      <BotanicalBranch className="pointer-events-none absolute -right-14 -top-6 -z-10 w-56 text-gold opacity-[0.18] sm:-right-8 sm:w-72 lg:w-80" />
      <BotanicalBranch className="pointer-events-none absolute -bottom-12 -left-16 -z-10 w-56 rotate-180 text-gold opacity-[0.16] sm:-left-10 sm:w-72 lg:w-80" />

      <div className="mx-auto max-w-[64rem]">
        <header className="mb-16 text-center md:mb-20 lg:mb-24">
          <h2 id="history-heading" className="font-display text-5xl text-dusty md:text-6xl">
            Nossa história
          </h2>
          <div className="mt-6 flex items-center justify-center gap-3 text-gold">
            <span className="h-px w-10 bg-gold/60" />
            <Heart className="h-3 w-3 fill-gold" strokeWidth={0} aria-hidden="true" />
            <span className="h-px w-10 bg-gold/60" />
          </div>
          <p className="mx-auto mt-7 max-w-2xl text-base leading-relaxed text-dusty/80 sm:text-lg">
            Nem toda história precisa de datas para ser lembrada.
            <br className="hidden sm:block" /> Algumas ficam pelos momentos que mudaram tudo.
          </p>
        </header>

        <div className="relative">
          <span
            aria-hidden="true"
            className="absolute bottom-1 left-[0.4375rem] top-2 w-px bg-gold/45 md:left-[40%]"
          />

          <ol className="space-y-16 md:space-y-10">
            {storyMoments.map((moment) => (
              <li
                key={moment.number}
                className="relative md:grid md:grid-cols-[34%_12%_54%] md:items-start"
              >
                <span
                  aria-hidden="true"
                  className="absolute left-0 top-2 grid h-3.5 w-3.5 place-items-center rounded-full bg-cream md:left-[40%] md:-translate-x-1/2"
                >
                  <span className="block h-2.5 w-2.5 rounded-full bg-gold" />
                </span>

                <article className="pl-10 text-center md:col-start-1 md:pl-0 md:pr-8 md:pt-2 lg:pr-10">
                  <p className="font-display text-2xl tracking-[0.08em] text-gold">
                    {moment.number}
                  </p>
                  <span className="mt-2 inline-block h-px w-9 bg-gold/70" aria-hidden="true" />
                  <h3 className="mx-auto mt-4 max-w-[18rem] font-display text-[1.9rem] leading-[1.08] text-dusty md:text-[2rem]">
                    {moment.title}
                  </h3>
                  {"date" in moment && (
                    <p className="mt-2 font-display text-2xl leading-none text-dusty">
                      {moment.date}
                    </p>
                  )}
                  <Heart
                    className="mt-4 inline-block h-3 w-3 fill-gold text-gold"
                    strokeWidth={0}
                    aria-hidden="true"
                  />
                  <p className="mx-auto mt-4 max-w-[16rem] text-sm leading-relaxed text-muted-ink sm:text-[0.95rem]">
                    {moment.description}
                  </p>
                </article>

                <figure className="ml-10 mt-8 md:col-start-3 md:ml-0 md:mt-0 md:justify-self-start">
                  <img
                    src={moment.image}
                    alt={moment.imageAlt}
                    loading="lazy"
                    decoding="async"
                    width={1536}
                    height={1024}
                    className="aspect-[3/2] w-full max-w-[28rem] rounded-xl object-cover shadow-[0_10px_30px_rgba(93,72,45,0.09)]"
                  />
                </figure>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
