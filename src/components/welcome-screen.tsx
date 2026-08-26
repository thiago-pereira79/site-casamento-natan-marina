import { useEffect, useRef, useState, type ReactNode } from "react";

export const WELCOME_SESSION_KEY = "nm-welcome-entered";

type WelcomePhase = "checking" | "visible" | "leaving" | "hidden";

export function WelcomeScreen({ children }: { children: ReactNode }) {
  const [phase, setPhase] = useState<WelcomePhase>("checking");
  const removalTimerRef = useRef<number | null>(null);

  useEffect(() => {
    let alreadyEntered = false;

    try {
      alreadyEntered = window.sessionStorage.getItem(WELCOME_SESSION_KEY) === "1";
    } catch {
      alreadyEntered = false;
    }

    setPhase(alreadyEntered ? "hidden" : "visible");
  }, []);

  useEffect(() => {
    if (phase !== "visible" && phase !== "leaving") return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [phase]);

  useEffect(
    () => () => {
      if (removalTimerRef.current) window.clearTimeout(removalTimerRef.current);
    },
    [],
  );

  const enterSite = () => {
    if (phase !== "visible") return;

    try {
      window.sessionStorage.setItem(WELCOME_SESSION_KEY, "1");
    } catch {
      // The visitor can still enter when storage is unavailable.
    }

    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
    setPhase("leaving");

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    removalTimerRef.current = window.setTimeout(
      () => {
        document.documentElement.dataset.nmWelcome = "seen";
        setPhase("hidden");
        window.scrollTo({ top: 0, left: 0, behavior: "auto" });
      },
      reducedMotion ? 20 : 760,
    );
  };

  const blocksHome = phase === "visible" || phase === "leaving";

  return (
    <>
      {phase !== "hidden" && (
        <div
          className="welcome-screen"
          data-phase={phase}
          role="dialog"
          aria-modal="true"
          aria-label="Boas-vindas ao site de Natan e Marina"
        >
          <div className="welcome-watercolor welcome-watercolor-top" aria-hidden="true" />
          <div className="welcome-watercolor welcome-watercolor-bottom" aria-hidden="true" />

          <div className="welcome-content">
            <h1 className="welcome-monogram" aria-label="N e M">
              <span>N</span>
              <span className="welcome-ampersand" aria-hidden="true">
                &amp;
              </span>
              <span>M</span>
            </h1>

            <p className="welcome-date">27 · 06 · 2026</p>

            <div className="welcome-ornament" aria-hidden="true">
              <span />
              <b>♥</b>
              <span />
            </div>

            <p className="welcome-tagline">Uma história para ser guardada.</p>

            <button
              type="button"
              className="welcome-enter-button"
              onClick={enterSite}
              onKeyDown={(event) => {
                if (event.key !== "Enter" && event.key !== " " && event.key !== "Space") return;
                event.preventDefault();
                enterSite();
              }}
            >
              <span>ENTRAR</span>
            </button>
          </div>
        </div>
      )}

      <div inert={blocksHome ? true : undefined} aria-hidden={blocksHome ? true : undefined}>
        {children}
      </div>
    </>
  );
}
