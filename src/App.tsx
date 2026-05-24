/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { BrowserRouter, Routes, Route, Link, useLocation, useNavigate } from "react-router-dom";

// 👉 Imports das imagens da seção Casal
import casal from "./assets/casal.jpeg";
import casal1 from "./assets/casal1.jpeg";
import casal2 from "./assets/casal2.jpeg";
import casal3 from "./assets/casal3.jpeg";
import casal4 from "./assets/casal4.jpeg";
import casal5 from "./assets/casal5.jpeg";
import casal6 from "./assets/casal6.jpeg";
import casal7 from "./assets/casal7.jpeg";
import casal8 from "./assets/casal8.jpeg";
import casal9 from "./assets/casal9.jpeg";
import casal10 from "./assets/casal10.jpeg";
import casal11 from "./assets/casal11.jpeg";
import casal12 from "./assets/casal12.jpeg";
import presentesImg from "./assets/Presentes.jpg";
import azul from "./assets/azul.jpg";
import { supabase } from "../lib/supabase";

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [pathname]);

  return null;
}

const weddingDate = new Date("2026-06-27T12:00:00");

const staggerContainer: any = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

const fadeUp: any = {
  hidden: { opacity: 0, y: 15 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6 }
  }
};

function getTimeLeft() {
  const now = new Date();
  const diff = weddingDate.getTime() - now.getTime();

  if (diff <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0 };
  }

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((diff / (1000 * 60)) % 60);
  const seconds = Math.floor((diff / 1000) % 60);

  return { days, hours, minutes, seconds };
}

const SECTIONS = [
  { id: "home", label: "Home", path: "/" },
  { id: "casal", label: "Casal", path: "/casal" },
  { id: "local", label: "Local", path: "/local" },
  { id: "presentes", label: "Presentes", path: "/presentes" },
  { id: "galeria", label: "Galeria", path: "/galeria" },
  { id: "rsvp", label: "RSVP", path: "/rsvp" },
  { id: "depoimentos", label: "Depoimentos", path: "/depoimentos" },
];

function IntroScreen({ onEnter }: { onEnter: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1.2, ease: [0.23, 1, 0.32, 1] }}
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center global-floral-bg overflow-hidden"
      style={{
        paddingLeft: "var(--menu-safe-zone)",
        paddingRight: "var(--menu-safe-zone)"
      }}
    >
      <div className="relative z-10 flex flex-col items-center text-center px-6 max-w-2xl">
        <span className="editorial-subtitle mb-6 block">
          Sejam bem-vindos
        </span>

        <h1
          className="editorial-display mb-8 tracking-tight"
          style={{ fontSize: "clamp(2.5rem, 2rem + 3vw, 5rem)" }}
        >
          Natan <span className="text-gold/80">&</span> Marina
        </h1>

        <p
          className="font-serif italic font-light tracking-wide leading-relaxed max-w-md mx-auto text-text-gray"
          style={{ fontSize: "clamp(1rem, 0.9rem + 0.4vw, 1.25rem)" }}
        >
          Estamos ansiosos para celebrar este dia com você
        </p>

        <div className="w-24 gold-divider mb-12 mt-8" />

        <button
          onClick={onEnter}
          className="btn-secondary group border-gold/40 hover:border-gold transition-all duration-300"
        >
          <span className="transition-all duration-700">Entrar</span>
        </button>
      </div>
    </motion.div>
  );
}

function MenuDecorations() {
  const decorations = [
    {
      id: "heart-fg",
      className: "top-[100px] left-[100px] w-20 h-20",
      svg: (
        <svg viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="2" style={{ filter: "drop-shadow(0 0 5px rgba(255,255,255,0.3))" }}>
          <path d="M50 30 C 50 10, 90 10, 90 40 C 90 70, 50 90, 50 90 C 50 90, 10 70, 10 40 C 10 10, 50 10, 50 30 Z" />
        </svg>
      ),
      animate: {
        opacity: [0.4, 0.85, 0.6, 0.85, 0.4],
        y: [0, -20, 10, -15, 0],
        x: [0, 10, -5, 5, 0],
        rotate: [0, 3, -3, 2, 0]
      },
      duration: 18,
      delay: 0
    },
    {
      id: "butterfly-fg",
      className: "top-1/2 right-[80px] w-16 h-16 -translate-y-1/2",
      svg: (
        <svg viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="1.8" style={{ filter: "drop-shadow(0 0 8px rgba(255,255,255,0.4))" }}>
          <path d="M50 50 C 70 20, 95 40, 50 50 C 5 40, 30 20, 50 50 Z" />
          <path d="M50 50 C 70 80, 95 60, 50 50 C 5 60, 30 80, 50 50 Z" opacity="0.7" />
          <path d="M50 45 L 50 55" strokeWidth="1" />
        </svg>
      ),
      animate: {
        opacity: [0.3, 0.75, 0.5, 0.75, 0.3],
        y: [0, -30, 20, -10, 0],
        x: [0, -20, 15, -5, 0],
        rotate: [5, 15, -5, 10, 5]
      },
      duration: 15,
      delay: 2
    },
    {
      id: "arabesque-bg-bl",
      className: "bottom-[60px] left-[60px] w-80 h-80",
      svg: (
        <svg viewBox="0 0 200 200" fill="none" stroke="currentColor" strokeWidth="0.4">
          <path d="M20 180 C 40 120, 80 80, 120 80 S 180 40, 180 20" />
          <path d="M30 170 C 50 130, 90 100, 110 100" opacity="0.4" />
          <circle cx="120" cy="80" r="1" fill="currentColor" opacity="0.3" />
        </svg>
      ),
      animate: {
        opacity: [0.02, 0.08, 0.04, 0.08, 0.02],
        scale: [1, 1.03, 0.99, 1.03, 1],
        rotate: [0, 2, -2, 1, 0]
      },
      duration: 35,
      delay: 5
    },
    {
      id: "arabesque-bg-tr",
      className: "top-10 right-10 w-64 h-64",
      svg: (
        <svg viewBox="0 0 200 200" fill="none" stroke="currentColor" strokeWidth="0.5">
          <path d="M20 180 Q 100 20, 180 180" />
          <path d="M40 160 Q 100 60, 160 160" opacity="0.5" />
          <path d="M60 140 Q 100 100, 140 140" opacity="0.3" />
          <circle cx="100" cy="40" r="2" fill="currentColor" opacity="0.4" />
        </svg>
      ),
      animate: {
        opacity: [0.02, 0.08, 0.04, 0.08, 0.02],
        y: [0, 10, -5, 5, 0],
        rotate: [0, -2, 2, -1, 0]
      },
      duration: 40,
      delay: 8
    },
    {
      id: "floral-bg-br",
      className: "bottom-20 right-20 w-32 h-32",
      svg: (
        <svg viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="0.8">
          <path d="M50 50 C 60 30, 80 40, 50 50 C 20 40, 40 30, 50 50 Z" />
          <path d="M50 50 C 60 70, 80 60, 50 50 C 20 60, 40 70, 50 50 Z" opacity="0.4" />
        </svg>
      ),
      animate: {
        opacity: [0, 0.08, 0.02, 0.08, 0],
        scale: [0.9, 1.1, 0.95, 1.1, 0.9]
      },
      duration: 25,
      delay: 12
    }
  ];

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {decorations.map((dec) => (
        <motion.div
          key={dec.id}
          className={`absolute ${dec.className} text-white`}
          initial={{ opacity: 0 }}
          animate={dec.animate}
          transition={{
            duration: dec.duration,
            repeat: Infinity,
            delay: dec.delay,
            ease: "easeInOut"
          }}
        >
          {dec.svg}
        </motion.div>
      ))}
    </div>
  );
}

function Layout({
  children,
  showIntro,
  isLightboxOpen
}: {
  children: React.ReactNode;
  showIntro: boolean;
  isLightboxOpen: boolean;
}) {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  return (
    <div className={`relative w-full min-h-[100dvh] text-text-dark font-sans overflow-x-hidden global-bg ${showIntro || isLightboxOpen ? "h-[100dvh] overflow-hidden" : ""}`}>
      <div className="fixed inset-0 paper-texture opacity-[0.03] pointer-events-none z-50" />

      <motion.div
        animate={{
          x: [0, 3, 0],
          y: [0, 2, 0],
          rotate: [0, 0.5, 0]
        }}
        transition={{
          x: { duration: 25, repeat: Infinity, ease: "easeInOut" },
          y: { duration: 30, repeat: Infinity, ease: "easeInOut" },
          rotate: { duration: 40, repeat: Infinity, ease: "easeInOut" }
        }}
        className="fixed top-0 left-0 w-64 h-64 floral-corner-tl opacity-[0.04] pointer-events-none z-40"
      />
      <motion.div
        animate={{
          x: [0, -3, 0],
          y: [0, -2, 0],
          rotate: [0, -0.5, 0]
        }}
        transition={{
          x: { duration: 28, repeat: Infinity, ease: "easeInOut" },
          y: { duration: 35, repeat: Infinity, ease: "easeInOut" },
          rotate: { duration: 45, repeat: Infinity, ease: "easeInOut" }
        }}
        className="fixed bottom-0 right-0 w-64 h-64 floral-corner-br opacity-[0.04] pointer-events-none z-40"
      />

      {!showIntro && !isLightboxOpen && !menuOpen && (
        <header className="mobile-header">
          <div className="flex items-center" />
        <button
  type="button"
  onClick={() => setMenuOpen(true)}
  className="p-2 -mr-2 flex lg:hidden items-center justify-center rounded-full bg-white/35 backdrop-blur-md border border-white/30 shadow-[0_8px_30px_rgba(0,0,0,0.08)]"
  aria-label="Open menu"
>
  <div className="flex flex-col items-end gap-[5px]">
    <span className="block h-[1.5px] w-6 bg-gold-strong rounded-full" />
    <span className="block h-[1.5px] w-4 bg-gold-strong rounded-full" />
    <span className="block h-[1.5px] w-5 bg-gold-strong rounded-full" />
  </div>
</button>
        </header>
      )}

      {!showIntro && !isLightboxOpen && !menuOpen && (
    <button
  type="button"
  aria-label="Toggle menu"
  onClick={() => setMenuOpen(true)}
  className="fixed top-8 lg:top-12 z-[110] group hidden lg:flex h-12 w-12 items-center justify-center cursor-pointer transition-all duration-500 rounded-full bg-white/35 backdrop-blur-md border border-white/30 shadow-[0_8px_30px_rgba(0,0,0,0.08)] hover:bg-white/50"
  style={{ right: "calc(var(--menu-safe-zone) / 2 - 24px)" }}
>
  <div className="flex flex-col items-end justify-center gap-[6px]">
    <span className="block h-[1.5px] w-6 bg-gold-strong group-hover:bg-gold rounded-full transition-all duration-500" />
    <span className="block h-[1.5px] w-4 bg-gold-strong group-hover:bg-gold rounded-full transition-all duration-500" />
    <span className="block h-[1.5px] w-5 bg-gold-strong group-hover:bg-gold rounded-full transition-all duration-500" />
  </div>
</button>
      )}

      <div style={{ position: "relative", zIndex: 10 }} className={isLightboxOpen ? "pointer-events-none" : ""}>
        <AnimatePresence>
          {menuOpen && !showIntro && (
            <motion.div
              initial={{ opacity: 0, backdropFilter: "blur(0px)" }}
              animate={{ opacity: 1, backdropFilter: "blur(8px)" }}
              exit={{ opacity: 0, backdropFilter: "blur(0px)" }}
              transition={{ duration: 0.35, ease: "easeOut" }}
              className="fixed inset-0 z-[9999] menu-overlay-bg flex flex-col items-center justify-center p-8 w-screen h-[100dvh] overflow-y-auto"
            >
              <button
                onClick={() => setMenuOpen(false)}
                className="absolute top-4 right-4 lg:top-10 lg:right-[calc(var(--menu-safe-zone)/2-24px)] z-[120] text-white/70 hover:text-white transition-colors p-4 flex items-center justify-center"
              >
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 6 6 18M6 6l12 12" />
                </svg>
              </button>

              <MenuDecorations />

              <nav className="flex flex-col gap-3 md:gap-4 lg:gap-5 items-center w-full max-h-full overflow-hidden relative z-10">
                {SECTIONS.map((section, index) => {
                  const isActive = location.pathname === section.path;
                  return (
                    <motion.div
                      key={section.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.05 + index * 0.05, duration: 0.4, ease: "easeOut" }}
                      className="w-full flex justify-center"
                    >
                      <Link
                        to={section.path}
                        onClick={(e) => {
                          e.preventDefault();
                          setMenuOpen(false);

                          if (section.path === "/") {
                            if (location.pathname === "/") {
                              window.scrollTo({ top: 0, behavior: "smooth" });
                            } else {
                              navigate("/");
                            }
                          } else {
                            navigate(section.path);
                          }
                        }}
                        className="group flex flex-col items-center gap-1 md:gap-1.5 lg:gap-2 text-center w-full max-w-xs cursor-pointer"
                      >
                        <span
                          className={`text-[15px] md:text-[18px] lg:text-[22px] tracking-[0.3em] md:tracking-[0.4em] uppercase transition-all duration-500 ease-[0.23,1,0.32,1] font-serif ${
                            isActive ? "text-gold opacity-100" : "text-white/70 hover:text-white"
                          }`}
                        >
                          {section.label}
                        </span>
                        <div
                          className={`h-[1px] transition-all duration-700 ease-[0.23,1,0.32,1] ${
                            isActive ? "w-6 md:w-8 bg-gold" : "w-0 bg-white/30 group-hover:w-5"
                          }`}
                        />
                      </Link>
                    </motion.div>
                  );
                })}
              </nav>
            </motion.div>
          )}
        </AnimatePresence>

    <div
  className={`relative z-10 w-full min-h-[100dvh] flex flex-col ${!showIntro && !isLightboxOpen ? "pt-20 lg:pt-0" : ""}`}
  style={{
    paddingLeft: "var(--menu-safe-zone)",
    paddingRight: "var(--menu-safe-zone)"
  }}
>
          <div className="flex-grow w-full">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}

function Home() {
  const [timeLeft, setTimeLeft] = useState(getTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(getTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
    >
      <div className="relative">
      <section
  id="home"
  className="hero-section hero-full-bleed relative w-screen flex flex-col justify-center items-center overflow-hidden
  min-h-[48vh] sm:min-h-[54vh] md:min-h-[62vh] lg:min-h-[70vh]
  pt-20 sm:pt-24 md:pt-28 lg:pt-32
  pb-2 sm:pb-4 md:pb-6 lg:pb-8"
>
          <div className="max-w-4xl w-full text-center relative z-10 px-6 md:px-10 lg:px-12">
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              animate="visible"
              className="flex flex-col justify-center items-center space-y-6 sm:space-y-8 md:space-y-10"
            >
              <motion.div variants={fadeUp} className="relative w-full flex justify-center">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] md:w-[150%] h-[150%] md:h-[200%] bg-[radial-gradient(circle_at_center,rgba(250,245,235,0.6)_0%,transparent_65%)] pointer-events-none -z-10 blur-3xl" />
                <h1 className="home-title text-blue-gray max-w-[90%] md:max-w-3xl mx-auto relative z-10">
                  Um dia para celebrar o amor, <br className="hidden md:block" />
                  a conexão e os momentos<br className="hidden md:block" />
                  que realmente importam.
                </h1>
              </motion.div>

              <motion.p variants={fadeUp} className="supporting-text text-text-dark font-light mx-auto">
                Esperamos você para viver esse capítulo conosco.
              </motion.p>
            </motion.div>
          </div>

          <div className="absolute inset-0 pointer-events-none">
            {[...Array(3)].map((_, i) => (
              <motion.div
                key={i}
                className="butterfly-accent"
                initial={{
                  x: Math.random() * 100 + "%",
                  y: Math.random() * 100 + "%",
                  opacity: 0
                }}
                animate={{
                  x: [null, (Math.random() - 0.5) * 200 + "px"],
                  y: [null, (Math.random() - 0.5) * 200 + "px"],
                  opacity: [0, 0.03, 0]
                }}
                transition={{
                  duration: Math.random() * 10 + 15,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
            ))}
          </div>
        </section>

        <div className="relative">
          <section className="relative z-10 w-full overflow-hidden countdown-section">
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              className="text-center px-6 relative z-10 flex flex-col items-center justify-center w-full"
            >
              <motion.div variants={fadeUp} className="gold-invitation-card">
                <span className="editorial-subtitle block text-white">
                  SAVE THE DATE
                </span>
                <p className="editorial-title font-normal tracking-widest">
                  27 de Junho de 2026
                </p>
              </motion.div>

              <motion.div variants={fadeUp} className="countdown-wrapper">
                <div className="countdown-card">
                  <p className="countdown-number">{timeLeft.days.toString().padStart(2, "0")}</p>
                  <span className="countdown-label">dias</span>
                </div>

                <div className="countdown-card">
                  <p className="countdown-number">{timeLeft.hours.toString().padStart(2, "0")}</p>
                  <span className="countdown-label">horas</span>
                </div>

                <div className="countdown-card">
                  <p className="countdown-number">{timeLeft.minutes.toString().padStart(2, "0")}</p>
                  <span className="countdown-label">minutos</span>
                </div>

                <div className="countdown-card">
                  <p className="countdown-number">{timeLeft.seconds.toString().padStart(2, "0")}</p>
                  <span className="countdown-label">segundos</span>
                </div>
              </motion.div>

              <motion.p variants={fadeUp} className="countdown-subtitle">
                para o nosso grande dia
              </motion.p>
            </motion.div>
          </section>
        </div>
      </div>

      <footer className="w-full px-4 relative z-10 pt-[20px] md:pt-[24px] lg:pt-[28px] pb-[16px] md:pb-[20px] lg:pb-[24px]">
        <div className="max-w-4xl mx-auto">
          <div className="w-full gold-divider footer-divider-margin" />
          <div className="text-center space-y-[14px]">
            <p className="footer-line">Feito com carinho para celebrar o amor</p>
            <p className="footer-line">&copy; 2026 Natan & Marina</p>
            <p className="footer-line">Design e desenvolvimento por Thiago Pereira</p>
          </div>
        </div>
      </footer>
    </motion.div>
  );
}

function Lightbox({
  images,
  currentIndex,
  onClose,
  onNext,
  onPrev
}: {
  images: string[];
  currentIndex: number;
  onClose: () => void;
  onNext: () => void;
  onPrev: () => void;
}) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") onNext();
      if (e.key === "ArrowLeft") onPrev();
      if (e.key === "Escape") onClose();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onNext, onPrev, onClose]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[9999] bg-black/95 backdrop-blur-xl flex items-center justify-center p-4 md:p-12"
      onClick={onClose}
    >
      <div className="relative w-full h-full flex items-center justify-center">
        <div
          className="absolute left-0 top-0 w-1/4 h-full z-20 cursor-w-resize"
          onClick={(e) => {
            e.stopPropagation();
            onPrev();
          }}
        />
        <div
          className="absolute right-0 top-0 w-1/4 h-full z-20 cursor-e-resize"
          onClick={(e) => {
            e.stopPropagation();
            onNext();
          }}
        />

        <AnimatePresence mode="wait">
          <motion.img
            key={currentIndex}
            src={images[currentIndex]}
            initial={{ opacity: 0, scale: 0.9, x: 20 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            exit={{ opacity: 0, scale: 0.9, x: -20 }}
            transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
            className="max-w-full max-h-full object-contain shadow-2xl"
            onClick={(e) => e.stopPropagation()}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            onDragEnd={(_, info) => {
              if (info.offset.x > 100) onPrev();
              else if (info.offset.x < -100) onNext();
            }}
          />
        </AnimatePresence>

        <button
          onClick={(e) => {
            e.stopPropagation();
            onClose();
          }}
          className="absolute top-4 right-4 text-white/40 hover:text-white transition-colors p-4 z-[10000] pointer-events-auto"
          aria-label="Close lightbox"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M18 6 6 18M6 6l12 12" />
          </svg>
        </button>
      </div>
    </motion.div>
  );
}

function CasalPage() {
  return (
    <motion.section
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
      variants={staggerContainer}
      className="relative w-full px-4 pt-12 pb-[60px] md:pt-32 md:pb-[70px] lg:pt-[100px] lg:pb-[90px] flex flex-col items-center"
    >
      <div className="max-w-4xl w-full text-center px-4 sm:px-0">
        <motion.div variants={fadeUp} className="flex flex-col items-center">
          <span className="editorial-subtitle mb-4">Nossa História</span>
          <h2 className="editorial-title mb-8 tracking-tight">Uma Jornada de Amor</h2>
          <div className="w-24 gold-divider mb-12" />
        </motion.div>

        <motion.div variants={fadeUp} className="space-y-8 body-text text-text-dark mx-auto">
          <p>
            Tudo começou de forma inesperada, mas logo percebemos que nossos caminhos eram destinados a se cruzar.
            Entre risos, conversas profundas e momentos inesquecíveis, construímos uma base sólida de amizade e cumplicidade.
          </p>
          <p>
            Cada dia ao lado um do outro é uma nova descoberta. Aprendemos que o amor está nos pequenos detalhes,
            no apoio mútuo e no desejo constante de ver o outro feliz. Agora, estamos prontos para dar o passo mais
            importante de nossas vidas e começar este novo capítulo como marido e mulher.
          </p>
        </motion.div>

        <motion.div variants={fadeUp} className="mt-20 grid grid-cols-1 md:grid-cols-2 gap-10 items-end">
          <div className="relative group">
            <div className="ornament-circle -top-6 -left-6 w-32 h-32" />
            <div className="aspect-[4/5] organic-frame image-vignette overflow-hidden shadow-xl border border-white/40">
             <img
  src={casal1}
  alt="Natan e Marina"
  className="w-full h-full object-cover transition-transform duration-1000 ease-out group-hover:scale-[1.05]"
/>
            </div>
          </div>
          <div className="relative group md:mb-16">
            <div className="ornament-circle -bottom-6 -right-6 w-40 h-40" />
            <div className="aspect-[4/5] organic-frame image-vignette overflow-hidden shadow-xl border border-white/40">
              <img
  src={casal}
  alt="Natan e Marina"
  className="w-full h-full object-cover transition-transform duration-1000 ease-out group-hover:scale-[1.05]"
/>
            </div>
          </div>
        </motion.div>

        <motion.div variants={fadeUp} className="mt-16 sm:mt-20 lg:mt-24">
          <Link to="/" className="back-to-home">
            Voltar para a Home
          </Link>
        </motion.div>
      </div>
    </motion.section>
  );
}

function LocalPage() {
  const address = "Rua João Nutti, 761, Jardim Paulista, Ribeirão Preto - SP, 14090-290";
  const mapsUrl = "https://goo.gl/maps/fRUmpbQeZGWNvv6Q6";
  const embedUrl = `https://www.google.com/maps?q=${encodeURIComponent(address)}&output=embed`;

  return (
    <motion.section
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
      variants={staggerContainer}
      className="relative w-full px-4 pt-12 pb-[60px] md:pt-32 md:pb-[70px] lg:pt-[100px] lg:pb-[90px] flex flex-col items-center"
    >
      <div className="max-w-6xl w-full text-center px-4 sm:px-0">
        <motion.div variants={fadeUp} className="flex flex-col items-center">
          <span className="editorial-subtitle mb-4">Onde & Quando</span>
          <h2 className="editorial-title mb-8 tracking-tight">A Celebração</h2>
          <div className="w-24 gold-divider mb-12" />
        </motion.div>

        <motion.p variants={fadeUp} className="body-text text-text-dark mx-auto mb-12">
          Onde celebraremos juntos este momento especial.
          <br />
          Este encontro será um almoço especial em comemoração ao casamento civil de Natan & Marina. Será um momento íntimo e muito especial para celebrarmos juntos essa nova etapa de nossas vidas.
        </motion.p>

        <motion.div variants={fadeUp} className="grid grid-cols-1 lg:grid-cols-[1fr_1.5fr] gap-12 lg:gap-20 items-start">
          <div className="text-left space-y-12">
            <div className="space-y-8">
              <div>
                <h3 className="editorial-title font-normal mb-3" style={{ fontSize: "clamp(1.5rem, 1.2rem + 1vw, 2.2rem)" }}>
                  Data & Horário
                </h3>
                <p className="body-text text-text-dark">
                  Sábado, 27 de Junho de 2026 às 12:00
                </p>
              </div>

              <div>
                <h3 className="editorial-title font-normal mb-3" style={{ fontSize: "clamp(1.5rem, 1.2rem + 1vw, 2.2rem)" }}>
                  Endereço
                </h3>
               <p className="body-text text-text-dark">
  Rua João Nutti, 761
  <br />
  Jardim Paulista, Ribeirão Preto - SP
  <br />
  CEP: 14090-290
</p>
              </div>

              <a
                href={mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary inline-flex"
              >
                Ver no Google Maps
              </a>
            </div>

            <div className="pt-10 border-t border-gold-soft">
              <h3 className="editorial-title font-normal mb-4" style={{ fontSize: "clamp(1.5rem, 1.2rem + 1vw, 2.2rem)" }}>
                Dress Code
              </h3>
              <div className="bg-white/40 backdrop-blur-md p-6 rounded-[2rem] border border-gold-soft shadow-sm max-w-[620px]">
                <p className="supporting-text italic text-text-gray">
                  “Para este dia especial, pedimos gentilmente que os convidados evitem utilizar trajes brancos.”
                </p>
              </div>
            </div>
          </div>

          <div className="w-full aspect-video lg:h-[500px] rounded-[2rem] image-vignette overflow-hidden shadow-2xl border border-white/40 relative group">
            <iframe
              title="Google Maps"
              width="100%"
              height="100%"
              frameBorder="0"
              style={{ border: 0 }}
              src={embedUrl}
              allowFullScreen
              loading="lazy"
              className="grayscale-[0.4] contrast-[1.1] opacity-80 group-hover:opacity-100 transition-opacity duration-1000"
            />
          </div>
        </motion.div>

        <motion.div variants={fadeUp} className="mt-16 sm:mt-20 lg:mt-24">
          <Link to="/" className="back-to-home">
            Voltar para a Home
          </Link>
        </motion.div>
      </div>
    </motion.section>
  );
}

function PresentesPage() {
  const lists = [
    {
      name: "Camicado",
      url: "https://www.camicado.com.br/lista/convidado/marinaenatan",
      image: presentesImg
    },
    {
      name: "Havan",
      url: "https://lista.havan.com.br/Convidado/ItensListaPresente/908285",
      image: presentesImg
    },
    {
      name: "Quero de Casamento",
      url: "https://www.querodecasamento.com.br/lista-de-casamento/marina-natan",
      image: presentesImg
    }
  ];

  return (
    <motion.section
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
      variants={staggerContainer}
      className="relative w-full px-4 pt-12 pb-[60px] md:pt-32 md:pb-[70px] lg:pt-[100px] lg:pb-[90px] flex flex-col items-center"
    >
      <div className="max-w-5xl w-full text-center px-4 sm:px-0">
        <motion.div variants={fadeUp} className="flex flex-col items-center">
          <span className="editorial-subtitle mb-4">Lista de Presentes</span>
          <h2 className="editorial-title mb-8 tracking-tight">Mimos & Carinho</h2>
          <div className="w-24 gold-divider mb-12" />
        </motion.div>

        <motion.p variants={fadeUp} className="body-text text-text-dark mx-auto mb-12">
          Sua presença é o nosso maior presente, mas se desejar nos presentear, aqui estão algumas opções.
        </motion.p>

        <motion.div variants={fadeUp} className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {lists.map((list) => (
            <a
              key={list.name}
              href={list.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group block relative aspect-[3/4] organic-frame image-vignette overflow-hidden shadow-xl transition-all duration-1000 ease-out border border-white/40"
            >
              <div className="ornament-circle -top-4 -left-4 w-24 h-24" />
              <img
                src={list.image}
                alt={list.name}
                className="w-full h-full object-cover transition-transform duration-1000 ease-out group-hover:scale-[1.05] contrast-[1.05]"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-blue-gray/20 group-hover:bg-blue-gray/40 transition-colors duration-700" />
              <div className="absolute inset-0 flex flex-col items-center justify-center p-8 text-white">
                <h3 className="card-title">{list.name}</h3>
                <span className="card-btn-text border border-white/40 px-8 py-3 rounded-full group-hover:bg-gold group-hover:border-gold group-hover:text-bg-main transition-all duration-300">
                  Ver Lista
                </span>
              </div>
            </a>
          ))}
        </motion.div>

        <motion.div variants={fadeUp} className="mt-16 sm:mt-20 lg:mt-24">
          <Link to="/" className="back-to-home">
            Voltar para a Home
          </Link>
        </motion.div>
      </div>
    </motion.section>
  );
}

function RSVPPage() {
  const [showRsvpForm, setShowRsvpForm] = useState(true);
  const [rsvpResponseType, setRsvpResponseType] = useState<"positive" | "negative" | null>(null);
  const [presence, setPresence] = useState<string | null>(null);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [companions, setCompanions] = useState("0");
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!name.trim() || !phone.trim() || !presence) {
      setError("Por favor, preencha todos os campos obrigatórios.");
      return;
    }

    let message = "";

    if (presence === "yes") {
      message = `Olá! Estou confirmando minha presença no almoço em comemoração ao casamento civil de Natan & Marina.\n\nNome: ${name}\nTelefone: ${phone}\nAcompanhantes: ${companions}\nResposta: Confirmo presença`;
    } else {
      message = `Olá! Infelizmente não poderei comparecer ao almoço em comemoração ao casamento civil de Natan & Marina.\n\nNome: ${name}\nTelefone: ${phone}`;
    }

    const whatsappNumber = "5516988329622";
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;

    try {
      window.open(whatsappUrl, "_blank");
    } catch (err) {
      console.error("Popup blocked", err);
    }

    setRsvpResponseType(presence === "yes" ? "positive" : "negative");
    setShowRsvpForm(false);
  };

  return (
    <section className="relative w-full px-6 pt-12 pb-[60px] md:pt-32 md:pb-[70px] lg:pt-[100px] lg:pb-[90px] flex flex-col items-center min-h-[85vh]">
      <div className="max-w-2xl w-full text-center px-4 sm:px-0">
        <motion.div initial="hidden" animate="visible" variants={staggerContainer} className="flex flex-col items-center mb-12">
          <motion.div variants={fadeUp} className="flex flex-col items-center">
            <span className="editorial-subtitle mb-4">Confirmação</span>
            <h2 className="editorial-title mb-8 tracking-tight">Estará Conosco?</h2>
            <div className="w-24 gold-divider" />
          </motion.div>
        </motion.div>

        <div className="w-full min-h-[400px] flex flex-col items-center justify-center relative z-10">
          {(showRsvpForm || !rsvpResponseType) && (
            <motion.div initial="hidden" animate="visible" variants={staggerContainer} className="w-full">
              <motion.p variants={fadeUp} className="body-text text-text-dark mb-12">
                Por favor, confirme sua presença até dia 15/06/2026.
              </motion.p>

              <motion.form
                variants={fadeUp}
                onSubmit={handleSubmit}
                className="text-left space-y-8 bg-white/40 backdrop-blur-xl p-8 sm:p-12 md:p-16 rounded-[2.5rem] border border-gold-soft shadow-2xl shadow-blue-gray/5"
              >
                <div className="space-y-3">
                  <label className="form-label">Seu nome *</label>
                  <input
                    type="text"
                    className="form-input"
                    placeholder="Como no convite"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                  <div className="space-y-3">
                    <label className="form-label">Telefone / WhatsApp *</label>
                    <input
                      type="tel"
                      className="form-input"
                      placeholder="(00) 00000-0000"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      required
                    />
                  </div>

                  <div className="space-y-3">
                    <label className="form-label">Acompanhantes</label>
                    <div className="relative">
                      <select
                        className="form-input appearance-none cursor-pointer"
                        value={companions}
                        onChange={(e) => setCompanions(e.target.value)}
                        disabled={presence === "no"}
                      >
                        <option value="0">0</option>
                        <option value="1">1</option>
                      </select>
                      <div className="absolute right-0 top-1/2 -translate-y-1/2 pointer-events-none text-gold/40">
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="m6 9 6 6 6-6" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <label className="form-label">Você comparecerá? *</label>
                  <div className="rsvp-radio-group">
                    <div
                      onClick={() => setPresence("yes")}
                      className={`rsvp-radio-item group ${presence === "yes" ? "rsvp-radio-item-active" : ""}`}
                    >
                      <div className="rsvp-radio-circle">
                        <div className="rsvp-radio-inner" />
                      </div>
                      <span className="rsvp-radio-label">Sim, com certeza!</span>
                    </div>

                    <div
                      onClick={() => {
                        setPresence("no");
                        setCompanions("0");
                      }}
                      className={`rsvp-radio-item group ${presence === "no" ? "rsvp-radio-item-active" : ""}`}
                    >
                      <div className="rsvp-radio-circle">
                        <div className="rsvp-radio-inner" />
                      </div>
                      <span className="rsvp-radio-label">Infelizmente não poderei</span>
                    </div>
                  </div>
                </div>

                {error && (
                  <p className="text-[#c5a46a] text-[0.85rem] text-center font-light">{error}</p>
                )}

                <button type="submit" className="btn-primary w-full mt-12">
                  Confirmar Presença
                </button>
              </motion.form>
            </motion.div>
          )}

          {!showRsvpForm && rsvpResponseType === "positive" && (
            <motion.div
              initial="hidden"
              animate="visible"
              variants={fadeUp}
              className="bg-white/40 backdrop-blur-xl p-12 md:p-16 rounded-[2.5rem] border border-gold-soft shadow-2xl shadow-blue-gray/10 text-center flex flex-col items-center w-full"
            >
              <div className="mb-8 text-gold/40">
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                </svg>
              </div>
              <div className="space-y-6 mb-12">
                <h3 className="editorial-title text-3xl md:text-4xl text-blue-gray">Obrigado por confirmar!</h3>
                <p className="body-text text-text-dark mx-auto max-w-md">
                  Sua presença tornará esse momento ainda mais especial. Nos vemos em breve.
                </p>
              </div>
              <button
                type="button"
                onClick={() => {
                  setShowRsvpForm(true);
                  setRsvpResponseType(null);
                }}
                className="btn-secondary w-full md:w-auto px-12 font-medium"
              >
                Voltar para o RSVP
              </button>
            </motion.div>
          )}

          {!showRsvpForm && rsvpResponseType === "negative" && (
            <motion.div
              initial="hidden"
              animate="visible"
              variants={fadeUp}
              className="bg-white/40 backdrop-blur-xl p-12 md:p-16 rounded-[2.5rem] border border-gold-soft shadow-2xl shadow-blue-gray/10 text-center flex flex-col items-center w-full"
            >
              <div className="mb-8 text-gold/40">
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                </svg>
              </div>
              <div className="space-y-6 mb-12">
                <h3 className="editorial-title text-3xl md:text-4xl text-blue-gray">Recebemos sua resposta</h3>
                <p className="body-text text-text-dark mx-auto max-w-md">
                  Sentiremos sua falta neste dia tão especial, mas agradecemos muito por nos avisar. Com carinho, Natan & Marina.
                </p>
              </div>
              <button
                type="button"
                onClick={() => {
                  setShowRsvpForm(true);
                  setRsvpResponseType(null);
                }}
                className="btn-secondary w-full md:w-auto px-12 font-medium"
              >
                Voltar para o RSVP
              </button>
            </motion.div>
          )}
        </div>

        <motion.div initial="hidden" animate="visible" variants={fadeUp} className="mt-16">
          <Link to="/" className="back-to-home inline-block">
            Voltar para a Home
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

function DepoimentosPage() {
 const [showAdminModal, setShowAdminModal] = useState(false);
const [isAdmin, setIsAdmin] = useState(false);
const [password, setPassword] = useState("");
const [adminError, setAdminError] = useState("");
const [name, setName] = useState("");
const [message, setMessage] = useState("");
const [messages, setMessages] = useState<any[]>([]);
const [editingId, setEditingId] = useState<string | null>(null);
const [editText, setEditText] = useState("");
const [loadingMessages, setLoadingMessages] = useState(true);
const [submittingMessage, setSubmittingMessage] = useState(false);

useEffect(() => {
  fetchMessages();
}, []);

async function fetchMessages() {
  setLoadingMessages(true);

  try {
    const { data, error } = await supabase
      .from("messages")
      .select("id, name, message, created_at")
      .order("created_at", { ascending: false });

    console.log("FETCH MESSAGES DATA:", data);
    console.log("FETCH MESSAGES ERROR:", error);

    if (error) {
      console.error("Erro ao buscar mensagens:", error);
      setMessages([]);
      return;
    }

    setMessages(data || []);
  } catch (err) {
    console.error("Erro inesperado ao buscar mensagens:", err);
    setMessages([]);
  } finally {
    setLoadingMessages(false);
  }
}

const handleAccess = async () => {
  const isLocalhost =
    window.location.hostname === "localhost" ||
    window.location.hostname === "127.0.0.1";

  if (isLocalhost) {
    if (password === import.meta.env.VITE_ADMIN_PASSWORD) {
      setIsAdmin(true);
      setShowAdminModal(false);
      setPassword("");
      setAdminError("");
    } else {
      setAdminError("Senha incorreta. Tente novamente.");
    }
    return;
  }

  try {
    const response = await fetch("/api/admin-login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ password }),
    });

    const data = await response.json();

    if (data.success) {
      setIsAdmin(true);
      setShowAdminModal(false);
      setPassword("");
      setAdminError("");
    } else {
      setAdminError("Senha incorreta. Tente novamente.");
    }
  } catch (error) {
    console.error("Erro ao validar senha:", error);
    setAdminError("Erro ao validar senha. Tente novamente.");
  }
};

const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  if (!name.trim() || !message.trim()) return;

  setSubmittingMessage(true);

  try {
    const { error } = await supabase.from("messages").insert([
      {
        name: name.trim(),
        message: message.trim(),
      },
    ]);

    if (error) {
      console.error("Erro completo ao salvar mensagem:", error);
      alert(`Não foi possível enviar a mensagem: ${error.message}`);
      return;
    }

    setName("");
    setMessage("");
    await fetchMessages();
  } catch (err) {
    console.error("Erro inesperado ao salvar mensagem:", err);
    alert("Não foi possível enviar a mensagem.");
  } finally {
    setSubmittingMessage(false);
  }
};

const handleDelete = async (id: string) => {
  try {
    const { error } = await supabase
      .from("messages")
      .delete()
      .eq("id", id);

    if (error) {
      console.error("Erro ao excluir mensagem:", error);
      alert("Não foi possível excluir a mensagem.");
      return;
    }

    await fetchMessages();
  } catch (err) {
    console.error("Erro inesperado ao excluir mensagem:", err);
    alert("Não foi possível excluir a mensagem.");
  }
};

const startEdit = (msg: any) => {
  setEditingId(msg.id);
  setEditText(msg.message);
};

const saveEdit = async () => {
  if (!editingId) return;

  try {
    const { error } = await supabase
      .from("messages")
      .update({ message: editText.trim() })
      .eq("id", editingId);

    if (error) {
      console.error("Erro ao editar mensagem:", error);
      alert("Não foi possível editar a mensagem.");
      return;
    }

    setEditingId(null);
    setEditText("");
    await fetchMessages();
  } catch (err) {
    console.error("Erro inesperado ao editar mensagem:", err);
    alert("Não foi possível editar a mensagem.");
  }
};

  return (
    <motion.section
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
      variants={staggerContainer}
      className="relative w-full px-6 pt-24 pb-[60px] md:pt-32 md:pb-[70px] lg:pt-[100px] lg:pb-[90px] flex flex-col items-center"
    >
      <div className="max-w-3xl w-full text-center px-4 sm:px-0">
        <motion.div variants={fadeUp} className="flex flex-col items-center">
          <span className="editorial-subtitle mb-4">Depoimentos</span>
          <h2 className="editorial-title mb-8 tracking-tight">Mensagens de Carinho</h2>
          <div className="w-24 gold-divider mb-12" />
        </motion.div>

        <motion.p variants={fadeUp} className="body-text text-text-dark mb-12">
          Deixe uma mensagem carinhosa para o casal.
        </motion.p>

        <motion.form
          variants={fadeUp}
          onSubmit={handleSubmit}
          className="text-left space-y-10 bg-white/40 backdrop-blur-xl p-10 md:p-16 rounded-[2.5rem] border border-gold-soft shadow-2xl shadow-blue-gray/5 mb-20"
        >
          <div className="space-y-3">
            <label className="form-label">Seu Nome</label>
            <input
              type="text"
              className="form-input"
              placeholder="Como deseja ser identificado"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="space-y-3">
            <label className="form-label">Mensagem</label>
            <textarea
              rows={4}
              className="form-input resize-none"
              placeholder="Escreva aqui seu carinho..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="btn-primary w-full" disabled={submittingMessage}>
  {submittingMessage ? "Enviando..." : "Enviar Mensagem"}
</button>
        </motion.form>

<div className="space-y-8 mb-20">
  {loadingMessages && (
    <p className="body-text text-text-dark italic py-10">
      Carregando mensagens...
    </p>
  )}

  {!loadingMessages && messages.length === 0 && (
    <p className="body-text text-text-dark italic py-10">
      Ainda não há mensagens por aqui. Seja o primeiro a deixar um carinho para o casal!
    </p>
  )}

  {!loadingMessages &&
    messages.length > 0 &&
    messages.map((msg) => (
      <div
        key={msg.id}
        className="bg-white/30 backdrop-blur-sm p-8 md:p-10 rounded-[2rem] border border-gold-soft/30 text-left relative group"
      >
        <div className="flex justify-between items-start mb-4">
          <div>
            <h4 className="font-serif text-xl text-text-dark">{msg.name}</h4>
            <span className="text-[10px] uppercase tracking-widest text-text-gray/60">
              {msg.created_at
                ? new Date(msg.created_at).toLocaleDateString("pt-BR")
                : ""}
            </span>
          </div>

          {isAdmin && (
            <div className="flex gap-4">
              <button
                type="button"
                onClick={() => startEdit(msg)}
                className="text-[10px] uppercase tracking-widest text-blue-gray hover:text-gold transition-colors"
              >
                Editar
              </button>
              <button
                type="button"
                onClick={() => handleDelete(msg.id)}
                className="text-[10px] uppercase tracking-widest text-red-400 hover:text-red-600 transition-colors"
              >
                Excluir
              </button>
            </div>
          )}
        </div>

        {editingId === msg.id ? (
          <div className="space-y-4">
            <textarea
              className="form-input resize-none text-[0.85rem]"
              rows={3}
              value={editText}
              onChange={(e) => setEditText(e.target.value)}
            />
            <div className="flex gap-4">
              <button
                type="button"
                onClick={saveEdit}
                className="btn-primary !py-2 !px-6 !text-[10px]"
              >
                Salvar
              </button>
              <button
                type="button"
                onClick={() => setEditingId(null)}
                className="btn-secondary !py-2 !px-6 !text-[10px]"
              >
                Cancelar
              </button>
            </div>
          </div>
        ) : (
          <p className="body-text text-text-dark leading-relaxed italic">
            "{msg.message}"
          </p>
        )}
      </div>
    ))}
</div>

        <motion.div variants={fadeUp} className="mt-12 pt-10 border-t border-gold-soft w-full flex flex-col items-center">
          {isAdmin ? (
            <div className="flex flex-col items-center gap-4">
              <span className="text-[10px] uppercase tracking-[0.4em] text-gold font-light">
                Modo Administrador Ativo
              </span>
              <button
                onClick={() => setIsAdmin(false)}
                className="text-[10px] uppercase tracking-[0.2em] text-text-gray/60 hover:text-text-gray transition-all"
              >
                Sair do modo admin
              </button>
            </div>
          ) : (
            <button
              onClick={() => setShowAdminModal(true)}
              className="text-[11px] uppercase tracking-[0.4em] text-blue-gray hover:text-gold transition-all duration-700 cursor-pointer"
            >
              Área do casal
            </button>
          )}
        </motion.div>

        <motion.div variants={fadeUp} className="mt-16 sm:mt-20 lg:mt-24">
          <Link to="/" className="back-to-home">
            Voltar para a Home
          </Link>
        </motion.div>
      </div>

      <AnimatePresence>
        {showAdminModal && (
          <div className="fixed inset-0 z-[200] flex items-center justify-center p-6">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowAdminModal(false)}
              className="absolute inset-0 bg-blue-gray/20 backdrop-blur-md"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-md bg-white/90 backdrop-blur-2xl p-10 md:p-12 rounded-[2.5rem] border border-gold-soft shadow-2xl text-center"
            >
              <h3 className="editorial-title text-2xl mb-8">Área do Casal</h3>
              <div className="space-y-6">
                <div className="space-y-2 text-left">
                  <label className="form-label text-[10px]">Senha de Acesso</label>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Digite a senha"
                    className="form-input"
                    onKeyDown={(e) => e.key === "Enter" && handleAccess()}
                    autoFocus
                  />
                </div>

                {adminError && (
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-[10px] text-red-400 uppercase tracking-widest"
                  >
                    {adminError}
                  </motion.p>
                )}

                <div className="flex flex-col gap-4 pt-4">
                  <button onClick={handleAccess} className="btn-primary w-full">
                    Entrar
                  </button>
                  <button
                    onClick={() => {
                      setShowAdminModal(false);
                      setPassword("");
                      setAdminError("");
                    }}
                    className="text-[10px] uppercase tracking-[0.2em] text-text-gray/60 hover:text-text-gray transition-all"
                  >
                    Cancelar
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </motion.section>
  );
}

function GaleriaCasalPage({
  onOpenLightbox,
}: {
  onOpenLightbox: (images: string[], index: number) => void;
}) {
  const images = [
    { src: casal2, size: "md" },
    { src: casal3, size: "sm" },
    { src: casal4, size: "lg" },
    { src: casal5, size: "md" },
    { src: casal6, size: "sm" },
    { src: casal7, size: "md" },
    { src: casal8, size: "lg" },
    { src: casal9, size: "sm" },
    { src: casal10, size: "md" },
    { src: casal11, size: "lg" },
    { src: casal12, size: "sm" },
  ];

  const imageUrls = images.map((img) => img.src);

  return (
    <motion.section
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
      variants={staggerContainer}
      className="relative w-full px-4 pt-12 pb-[60px] md:pt-32 md:pb-[70px] lg:pt-[100px] lg:pb-[90px] flex flex-col items-center"
    >
      <div className="w-full text-center">
        <motion.div variants={fadeUp} className="flex flex-col items-center">
          <span className="editorial-subtitle mb-4">Momentos</span>
          <h2 className="editorial-title mb-16 tracking-tight">Nossa História</h2>
          <div className="w-24 gold-divider mb-12" />
        </motion.div>

        <motion.div
          variants={fadeUp}
          className="pinterest-grid max-w-7xl mx-auto w-full"
        >
          {images.map((img, index) => (
            <motion.div
              key={index}
              className={`pinterest-item pinterest-item-${img.size} cinematic-reveal cursor-pointer`}
              style={{ animationDelay: `${index * 120}ms` }}
              onClick={() => onOpenLightbox(imageUrls, index)}
            >
              <div className="pinterest-card group relative">
                <div className="absolute inset-0 vignette-overlay z-10" />
                <img
                  src={img.src}
                  alt={`Foto do casal ${index + 1}`}
                  className="w-full h-full object-cover transition-transform duration-1000 ease-out group-hover:scale-[1.04]"
                />
              </div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div variants={fadeUp} className="mt-16 sm:mt-20 lg:mt-24">
          <Link to="/galeria" className="back-to-home">
            Voltar para a Galeria
          </Link>
        </motion.div>
      </div>
    </motion.section>
  );
}

function GaleriaEventoPage({ onOpenLightbox }: { onOpenLightbox: (images: string[], index: number) => void }) {
  const images: string[] = [];

  return (
    <motion.section
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
      variants={staggerContainer}
      className="relative w-full px-6 pt-12 pb-[60px] md:pt-32 md:pb-[70px] lg:pt-[100px] lg:pb-[90px] flex flex-col items-center overflow-hidden"
    >
      <div className="max-w-6xl w-full text-center px-4 flex flex-col items-center justify-center">
        <motion.div variants={fadeUp} className="flex flex-col items-center">
          <span className="editorial-subtitle mb-4">O Grande Dia</span>
          <h2 className="editorial-title mb-8 tracking-tight">Registros do Evento</h2>
          <div className="w-24 gold-divider mb-12" />
        </motion.div>
        <motion.p variants={fadeUp} className="body-text text-text-dark mx-auto italic">
          "Os registros deste dia serão guardados com o mesmo cuidado com que foram vividos."
        </motion.p>
      </div>

      {images.length > 0 && (
        <motion.div variants={fadeUp} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 px-6 max-w-6xl mx-auto">
          {images.map((src, index) => (
            <motion.div
              key={index}
              className="relative aspect-[4/3] sm:aspect-[16/9] rounded-[2rem] overflow-hidden shadow-xl cursor-pointer group"
              whileHover={{ scale: 1.02 }}
              onClick={() => onOpenLightbox(images, index)}
            >
              <div className="absolute inset-0 vignette-overlay z-10" />
              <img
                src={src}
                alt={`Evento ${index + 1}`}
                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                referrerPolicy="no-referrer"
              />
            </motion.div>
          ))}
        </motion.div>
      )}

      <motion.div variants={fadeUp} className="mt-16 sm:mt-20 lg:mt-24">
        <Link to="/galeria" className="back-to-home">
          Voltar para a Galeria
        </Link>
      </motion.div>
    </motion.section>
  );
}

function GaleriaPage() {
  const categories = [
    {
      title: "Fotos do Casal",
      subtitle: "Nossa história",
      path: "/galeria/casal",
      image: azul
    },
    {
      title: "Registros do Evento",
      subtitle: "O grande dia",
      path: "/galeria/evento",
      image: azul
    }
  ];

  return (
    <motion.section
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
      variants={staggerContainer}
      className="relative w-full px-4 pt-12 pb-[60px] md:pt-32 md:pb-[70px] lg:pt-[100px] lg:pb-[90px] flex flex-col items-center"
    >
      <div className="max-w-6xl w-full text-center">
        <motion.div variants={fadeUp} className="flex flex-col items-center">
          <span className="editorial-subtitle mb-4">Galeria</span>
          <h2 className="editorial-title mb-8 tracking-tight">Nossa Galeria</h2>
          <div className="w-24 gold-divider mb-12" />
        </motion.div>

        <motion.p variants={fadeUp} className="body-text text-text-dark mb-12 mx-auto">
          Alguns dos momentos mais especiais que compartilhamos até aqui.
        </motion.p>

        <motion.div variants={fadeUp} className="grid grid-cols-1 sm:grid-cols-2 gap-8 md:gap-12 w-full max-w-5xl mx-auto">
          {categories.map((cat, index) => (
            <Link
              key={index}
              to={cat.path}
              className="group relative aspect-[4/5] sm:aspect-[3/4] magazine-frame overflow-hidden magazine-shadow transition-all duration-1000 ease-out border border-white/40 hover:-translate-y-1"
            >
              <div className="absolute inset-0 vignette-overlay z-10" />
              <div className="absolute inset-0 gold-rose-overlay opacity-0 group-hover:opacity-100 transition-opacity duration-700 z-10" />
              <div className="absolute inset-0 scale-100 group-hover:scale-[1.05] transition-transform duration-1000 ease-out">
                <img
                  src={cat.image}
                  alt={cat.title}
                  className="w-full h-full object-cover contrast-[1.05] brightness-[0.95] group-hover:brightness-[1.02]"
                  referrerPolicy="no-referrer"
                />
              </div>

              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-black/40 group-hover:via-black/30 transition-colors duration-700 ease-out" />

              <div className="absolute inset-0 flex flex-col items-center justify-center p-8 -translate-y-4">
                <span className="text-white/70 text-[0.65rem] uppercase tracking-[0.4em] mb-3 font-light opacity-0 group-hover:opacity-100 transition-opacity duration-700 ease-out">
                  {cat.subtitle}
                </span>
                <h3 className="card-title text-white italic" style={{ fontSize: "clamp(1.5rem, 1.2rem + 1vw, 2.5rem)" }}>
                  {cat.title}
                </h3>
                <div className="w-8 h-[1px] bg-white/30 mt-6 scale-x-0 group-hover:scale-x-100 transition-transform duration-700 ease-out origin-center" />
              </div>
            </Link>
          ))}
        </motion.div>

        <motion.div variants={fadeUp} className="mt-16 sm:mt-20 lg:mt-24">
          <Link to="/" className="back-to-home">
            Voltar para a Home
          </Link>
        </motion.div>
      </div>
    </motion.section>
  );
}

function GenericPage({ title }: { title: string }) {
  return (
    <motion.section
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
      variants={staggerContainer}
      className="relative w-full px-6 pt-24 pb-[60px] md:pt-32 md:pb-[70px] lg:pt-[100px] lg:pb-[90px] flex flex-col items-center justify-center"
    >
      <div className="absolute top-0 left-0 w-80 h-80 floral-corner-tl opacity-[0.03] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-80 h-80 floral-corner-br opacity-[0.03] pointer-events-none" />
      <motion.div variants={fadeUp} className="flex flex-col items-center">
        <span className="editorial-subtitle mb-4">{title}</span>
        <h2 className="editorial-title mb-8 tracking-tight">{title}</h2>
        <div className="w-24 gold-divider mb-12" />
      </motion.div>
      <motion.p variants={fadeUp} className="body-text text-text-dark text-center max-w-lg">
        Conteúdo da página {title.toLowerCase()} será adicionado em breve.
      </motion.p>
      <motion.div variants={fadeUp} className="mt-16 sm:mt-20 lg:mt-24">
        <Link to="/" className="back-to-home">
          Voltar para a Home
        </Link>
      </motion.div>
    </motion.section>
  );
}

export default function App() {
  const [showIntro, setShowIntro] = useState(true);
  const [lightboxData, setLightboxData] = useState<{ images: string[]; index: number } | null>(null);

  const handleEnter = () => {
    setShowIntro(false);
  };

  const openLightbox = (images: string[], index: number) => {
    setLightboxData({ images, index });
  };

  const closeLightbox = () => {
    setLightboxData(null);
  };

  const nextLightbox = () => {
    if (lightboxData) {
      setLightboxData({
        ...lightboxData,
        index: (lightboxData.index + 1) % lightboxData.images.length
      });
    }
  };

  const prevLightbox = () => {
    if (lightboxData) {
      setLightboxData({
        ...lightboxData,
        index: (lightboxData.index - 1 + lightboxData.images.length) % lightboxData.images.length
      });
    }
  };

  const isLightboxOpen = lightboxData !== null;

  return (
    <BrowserRouter>
      <ScrollToTop />
      <AnimatePresence>
        {showIntro && <IntroScreen onEnter={handleEnter} />}
      </AnimatePresence>

      <Layout showIntro={showIntro} isLightboxOpen={isLightboxOpen}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/casal" element={<CasalPage />} />
          <Route path="/local" element={<LocalPage />} />
          <Route path="/presentes" element={<PresentesPage />} />
          <Route path="/galeria" element={<GaleriaPage />} />
          <Route path="/galeria/casal" element={<GaleriaCasalPage onOpenLightbox={openLightbox} />} />
          <Route path="/galeria/evento" element={<GaleriaEventoPage onOpenLightbox={openLightbox} />} />
          <Route path="/rsvp" element={<RSVPPage />} />
          <Route path="/depoimentos" element={<DepoimentosPage />} />
        </Routes>
      </Layout>

      <AnimatePresence>
        {isLightboxOpen && lightboxData && (
          <Lightbox
            images={lightboxData.images}
            currentIndex={lightboxData.index}
            onClose={closeLightbox}
            onNext={nextLightbox}
            onPrev={prevLightbox}
          />
        )}
      </AnimatePresence>
    </BrowserRouter>
  );
}