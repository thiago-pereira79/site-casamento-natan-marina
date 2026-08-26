import { createFileRoute, Link } from "@tanstack/react-router";
import { Heart, Eye, Sparkles, Hand } from "lucide-react";
import { useState } from "react";
import hero from "@/assets/hero-real-black-and-white.webp";
import { HomeFuture } from "@/components/home-future";
import { StoryChapters } from "@/components/story-chapters";
import { WelcomeScreen } from "@/components/welcome-screen";
import { galleryPreviewImages } from "@/lib/gallery-preview";

export const Route = createFileRoute("/")({
  component: Index,
});

const details = [
  { icon: Heart, label: "Cada sorriso compartilhado" },
  { icon: Hand, label: "Cada abraço sincero" },
  { icon: Eye, label: "Cada olhar que dizia tudo" },
  { icon: Sparkles, label: "Cada instante eterno" },
];

function Ornament() {
  return (
    <div className="flex items-center justify-center gap-3 text-gold">
      <span className="h-px w-10 bg-gold/60" />
      <Heart className="h-3 w-3 fill-gold" strokeWidth={0} />
      <span className="h-px w-10 bg-gold/60" />
    </div>
  );
}

function Index() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <WelcomeScreen>
      <div className="min-h-screen bg-cream font-body text-ink">
        {/* Nav */}
        <header className="bg-cream">
          <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-6">
            <span className="font-display text-lg tracking-wide text-black opacity-100">
              Nosso dia
            </span>
            <ul className="hidden gap-8 text-sm tracking-wide text-black opacity-100 md:flex">
              <li>
                <a href="#historia" className="text-black opacity-100">
                  História
                </a>
              </li>
              <li>
                <a href="#memorias" className="text-black opacity-100">
                  Memórias
                </a>
              </li>
            </ul>
            <button
              type="button"
              className="grid h-11 w-11 place-items-center text-black md:hidden"
              aria-label={isMobileMenuOpen ? "Fechar menu de navegação" : "Abrir menu de navegação"}
              aria-controls="mobile-navigation"
              aria-expanded={isMobileMenuOpen}
              onClick={() => setIsMobileMenuOpen((isOpen) => !isOpen)}
            >
              <span className="flex w-5 flex-col gap-1.5" aria-hidden="true">
                <span className="h-px w-full bg-current" />
                <span className="h-px w-full bg-current" />
                <span className="h-px w-full bg-current" />
              </span>
            </button>
          </nav>
          {isMobileMenuOpen && (
            <ul
              id="mobile-navigation"
              className="border-t border-black/10 px-6 py-4 text-center text-sm tracking-wide text-black md:hidden"
            >
              <li>
                <a
                  href="#historia"
                  className="block py-3"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  História
                </a>
              </li>
              <li>
                <a
                  href="#memorias"
                  className="block py-3"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Memórias
                </a>
              </li>
            </ul>
          )}
        </header>

        {/* Hero */}
        <section className="relative">
          <div className="grid min-h-[92vh] grid-cols-1 md:grid-cols-2">
            <div className="relative h-[60vh] md:h-auto">
              <img
                src={hero}
                alt="Natan e Marina"
                width={1066}
                height={1600}
                fetchPriority="high"
                className="h-full w-full object-cover"
                style={{ objectPosition: "center top" }}
              />
              <div className="absolute inset-0 bg-gradient-to-r from-transparent to-cream/40 md:to-cream" />
            </div>
            <div className="flex flex-col items-center justify-center gap-6 bg-cream px-8 py-16 text-center">
              <p className="text-xs uppercase tracking-[0.4em] text-gold">Ribeirão Preto/SP</p>
              <h1 className="font-display text-6xl leading-[0.95] text-dusty md:text-7xl lg:text-8xl">
                Natan
                <br />
                <span className="italic text-gold">&</span>
                <br />
                Marina
              </h1>
              <Ornament />
              <p className="font-display text-2xl tracking-[0.3em] text-ink/80">27 · 06 · 2026</p>
              <p className="mt-2 text-xs uppercase tracking-[0.4em] text-muted-ink">
                Nossa história continua
              </p>
            </div>
          </div>
        </section>

        {/* Quote band */}
        <section className="bg-dusty px-6 py-20 text-center text-dusty-foreground">
          <p className="mx-auto max-w-2xl font-display text-2xl leading-relaxed md:text-3xl">
            O grande dia passou.
            <br />O amor ficou e agora vive em cada lembrança.
          </p>
        </section>

        {/* Story chapters */}
        <StoryChapters />

        {/* Memories */}
        <section id="memorias" className="bg-dusty px-6 pb-[5.625rem] pt-24 text-dusty-foreground">
          <div className="mx-auto max-w-[80.625rem]">
            <div className="mb-[3.25rem] text-center">
              <h2 className="font-display text-5xl">Memórias que guardamos</h2>
              <div className="mt-9 flex items-center justify-center gap-3">
                <span className="h-px w-10 bg-cream/50" />
                <Heart className="h-3 w-3 fill-cream text-cream" strokeWidth={0} />
                <span className="h-px w-10 bg-cream/50" />
              </div>
            </div>

            <div className="grid grid-cols-1 gap-8 lg:grid-cols-3 lg:gap-10">
              {galleryPreviewImages.map((image) => (
                <img
                  key={image.src}
                  src={image.src}
                  alt={image.accessibleAlt}
                  loading="lazy"
                  decoding="async"
                  width={image.width}
                  height={image.height}
                  style={{ objectPosition: image.objectPosition }}
                  className="mx-auto aspect-[3/2] w-full max-w-[26rem] rounded-sm object-cover shadow-md lg:mx-0 lg:max-w-none"
                />
              ))}
            </div>

            <div className="mt-[5.25rem] text-center">
              <Link
                to="/galeria"
                className="inline-block border border-cream/60 px-20 py-5 text-xs uppercase tracking-[0.3em] transition hover:bg-cream hover:text-dusty"
              >
                Ver galeria completa
              </Link>
            </div>
          </div>
        </section>

        {/* Future */}
        <HomeFuture />

        {/* Footer */}
        <footer className="bg-cream px-6 py-4 lg:py-5">
          <div className="mx-auto grid max-w-6xl items-center gap-x-6 gap-y-1 text-center lg:grid-cols-[1fr_auto_1fr]">
            <p className="text-xs tracking-wider text-black opacity-100 lg:justify-self-start lg:whitespace-nowrap lg:text-left">
              © 2026 Natan & Marina
            </p>
            <p className="font-display text-lg not-italic text-black opacity-100 lg:justify-self-center lg:whitespace-nowrap">
              Feito com carinho para celebrar o amor
            </p>
            <p className="text-xs tracking-wider text-black opacity-100 lg:justify-self-end lg:whitespace-nowrap lg:text-right">
              Design e desenvolvimento por{" "}
              <a
                href="http://tpstudio.com.br/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-black opacity-100"
              >
                TP STUDIO
              </a>
            </p>
          </div>
        </footer>
      </div>
    </WelcomeScreen>
  );
}
