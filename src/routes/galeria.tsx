import { useCallback, useEffect, useRef, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { ChevronLeft, ChevronRight, Heart, Play, X } from "lucide-react";
import { galleryImages, galleryVideos } from "@/lib/gallery";

type GalleryItem =
  | { type: "image"; src: string; alt: string; width: number; height: number }
  | { type: "video"; src: string; title: string; width: number; height: number };

const mediaItems: GalleryItem[] = [
  ...galleryImages.map((image, index) => ({
    type: "image" as const,
    ...image,
    alt: `Foto ${index + 1}`,
  })),
  ...galleryVideos.map((video) => ({ type: "video" as const, ...video })),
];

const galleryGridImages = galleryImages.map((image) => ({
  ...image,
  thumbnailSrc: `/gallery/thumbs/${image.src.slice(image.src.lastIndexOf("/") + 1).replace(/\.[^.]+$/, ".webp")}`,
}));

export const Route = createFileRoute("/galeria")({
  component: Galeria,
});

function Galeria() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const openerRef = useRef<HTMLButtonElement | null>(null);
  const closeButtonRef = useRef<HTMLButtonElement | null>(null);
  const dialogRef = useRef<HTMLDivElement | null>(null);
  const touchStartX = useRef<number | null>(null);

  const activeItem = activeIndex === null ? null : mediaItems[activeIndex];
  const isLightboxOpen = activeIndex !== null;

  const openItem = (index: number, opener: HTMLButtonElement) => {
    openerRef.current = opener;
    setActiveIndex(index);
  };

  const closeLightbox = useCallback(() => setActiveIndex(null), []);
  const showPrevious = useCallback(() => {
    setActiveIndex((current) =>
      current === null ? null : (current - 1 + mediaItems.length) % mediaItems.length,
    );
  }, []);
  const showNext = useCallback(() => {
    setActiveIndex((current) => (current === null ? null : (current + 1) % mediaItems.length));
  }, []);

  useEffect(() => {
    if (!isLightboxOpen) return;

    const previousOverflow = document.body.style.overflow;
    const previousPaddingRight = document.body.style.paddingRight;
    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;

    if (scrollbarWidth > 0) document.body.style.paddingRight = `${scrollbarWidth}px`;
    document.body.style.overflow = "hidden";
    closeButtonRef.current?.focus();

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        closeLightbox();
        return;
      }

      if (event.key === "ArrowLeft") {
        event.preventDefault();
        showPrevious();
        return;
      }

      if (event.key === "ArrowRight") {
        event.preventDefault();
        showNext();
        return;
      }

      if (event.key !== "Tab" || !dialogRef.current) return;

      const focusable = Array.from(
        dialogRef.current.querySelectorAll<HTMLElement>(
          'button:not([disabled]), video[controls], [tabindex]:not([tabindex="-1"])',
        ),
      ).filter((element) => !element.hasAttribute("disabled"));

      if (focusable.length === 0) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.body.style.paddingRight = previousPaddingRight;
      window.removeEventListener("keydown", handleKeyDown);
      openerRef.current?.focus();
    };
  }, [isLightboxOpen, closeLightbox, showNext, showPrevious]);

  useEffect(() => {
    if (activeIndex === null) return;

    [
      mediaItems[(activeIndex - 1 + mediaItems.length) % mediaItems.length],
      mediaItems[(activeIndex + 1) % mediaItems.length],
    ].forEach((item) => {
      if (item.type === "image") {
        const image = new Image();
        image.decoding = "async";
        image.fetchPriority = "low";
        image.src = item.src;
      }
    });
  }, [activeIndex]);

  const handleTouchEnd = (event: React.TouchEvent<HTMLDivElement>) => {
    if (touchStartX.current === null) return;
    const horizontalDistance = event.changedTouches[0].clientX - touchStartX.current;
    touchStartX.current = null;

    if (horizontalDistance > 50) showPrevious();
    if (horizontalDistance < -50) showNext();
  };

  return (
    <div className="min-h-screen bg-cream font-body text-ink">
      <header className="bg-cream">
        <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-6">
          <Link to="/" className="font-display text-lg tracking-wide text-black opacity-100">
            Nosso dia
          </Link>
        </nav>
      </header>

      <section className="px-6 py-16 text-center">
        <p className="text-xs uppercase tracking-[0.4em] text-gold">27 · 06 · 2026</p>
        <h1 className="mt-4 font-display text-5xl text-ink md:text-6xl">Galeria completa</h1>
        <div className="mt-6 flex items-center justify-center gap-3 text-gold">
          <span className="h-px w-10 bg-gold/60" />
          <Heart className="h-3 w-3 fill-gold" strokeWidth={0} />
          <span className="h-px w-10 bg-gold/60" />
        </div>
        <p className="mx-auto mt-6 max-w-xl text-sm leading-relaxed text-muted-ink">
          Todas as fotos e vídeos do nosso grande dia, reunidos em um só lugar.
        </p>
      </section>

      <section className="px-6 pb-24">
        <div className="mx-auto max-w-6xl">
          <h2 className="mb-8 font-display text-3xl text-ink">Fotos</h2>
          <div className="columns-1 gap-3 sm:columns-2 md:columns-3 md:gap-4 lg:columns-4">
            {galleryGridImages.map((image, index) => (
              <button
                key={image.src}
                type="button"
                onClick={(event) => openItem(index, event.currentTarget)}
                className="group mb-3 block w-full break-inside-avoid overflow-hidden rounded-sm text-left shadow-sm transition focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold md:mb-4"
                aria-label={`Abrir foto ${index + 1}`}
              >
                <img
                  src={image.thumbnailSrc}
                  alt={`Foto ${index + 1}`}
                  width={image.width}
                  height={image.height}
                  loading={index === 0 ? "eager" : "lazy"}
                  fetchPriority={index === 0 ? "high" : "auto"}
                  decoding="async"
                  className="block h-auto w-full object-contain transition duration-300 group-hover:scale-[1.01] group-hover:opacity-95"
                />
              </button>
            ))}
          </div>

          <h2 className="mb-8 mt-20 font-display text-3xl text-ink">Vídeos</h2>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {galleryVideos.map((video, videoIndex) => {
              const index = galleryImages.length + videoIndex;

              return (
                <button
                  key={video.src}
                  type="button"
                  onClick={(event) => openItem(index, event.currentTarget)}
                  className="group relative block w-full overflow-hidden rounded-sm bg-black text-left shadow-sm transition focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold"
                  aria-label={`Abrir ${video.title}`}
                >
                  <video
                    src={video.src}
                    width={video.width}
                    height={video.height}
                    muted
                    playsInline
                    preload="none"
                    className="block h-auto w-full object-contain"
                  />
                  <span className="absolute inset-0 grid place-items-center bg-black/15 transition group-hover:bg-black/25">
                    <span className="grid h-12 w-12 place-items-center rounded-full border border-cream/80 bg-black/30 text-cream">
                      <Play className="ml-0.5 h-5 w-5 fill-current" aria-hidden="true" />
                    </span>
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      <footer className="bg-cream px-6 py-16 text-center">
        <p className="text-xs tracking-wider text-black opacity-100">© 2026 Natan & Marina</p>
      </footer>

      {activeItem && activeIndex !== null && (
        <div
          ref={dialogRef}
          role="dialog"
          aria-modal="true"
          aria-label="Visualização ampliada da galeria"
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 p-4 motion-safe:animate-in motion-safe:fade-in motion-safe:duration-300 sm:p-8"
          onClick={closeLightbox}
        >
          <button
            ref={closeButtonRef}
            type="button"
            onClick={closeLightbox}
            className="absolute right-4 top-4 z-10 grid h-12 w-12 place-items-center rounded-full text-cream/90 transition hover:bg-white/10 hover:text-cream focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cream sm:right-6 sm:top-6"
            aria-label="Fechar visualização"
          >
            <X className="h-7 w-7" aria-hidden="true" />
          </button>

          <button
            type="button"
            onClick={(event) => {
              event.stopPropagation();
              showPrevious();
            }}
            className="absolute left-2 z-10 grid h-12 w-12 place-items-center rounded-full text-cream/90 transition hover:bg-white/10 hover:text-cream focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cream sm:left-6 sm:h-14 sm:w-14"
            aria-label="Mídia anterior"
          >
            <ChevronLeft className="h-8 w-8" aria-hidden="true" />
          </button>

          <div
            className="relative flex max-h-full max-w-full flex-col items-center justify-center"
            onClick={(event) => event.stopPropagation()}
            onTouchStart={(event) => {
              touchStartX.current = event.touches[0].clientX;
            }}
            onTouchEnd={handleTouchEnd}
          >
            {activeItem.type === "image" ? (
              <img
                src={activeItem.src}
                alt={activeItem.alt}
                width={activeItem.width}
                height={activeItem.height}
                decoding="async"
                fetchPriority="high"
                className="max-h-[calc(100vh-7rem)] max-w-[calc(100vw-7rem)] rounded-sm object-contain shadow-2xl sm:max-h-[calc(100vh-8rem)] sm:max-w-[calc(100vw-10rem)]"
              />
            ) : (
              <video
                key={activeItem.src}
                src={activeItem.src}
                title={activeItem.title}
                aria-label={activeItem.title}
                width={activeItem.width}
                height={activeItem.height}
                controls
                playsInline
                preload="metadata"
                className="max-h-[calc(100vh-7rem)] max-w-[calc(100vw-7rem)] rounded-sm bg-black object-contain shadow-2xl sm:max-h-[calc(100vh-8rem)] sm:max-w-[calc(100vw-10rem)]"
              />
            )}
            <p className="mt-3 text-xs tracking-[0.2em] text-cream/75" aria-live="polite">
              {activeIndex + 1} / {mediaItems.length}
            </p>
          </div>

          <button
            type="button"
            onClick={(event) => {
              event.stopPropagation();
              showNext();
            }}
            className="absolute right-2 z-10 grid h-12 w-12 place-items-center rounded-full text-cream/90 transition hover:bg-white/10 hover:text-cream focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cream sm:right-6 sm:h-14 sm:w-14"
            aria-label="Próxima mídia"
          >
            <ChevronRight className="h-8 w-8" aria-hidden="true" />
          </button>
        </div>
      )}
    </div>
  );
}
