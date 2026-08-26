import homeFutureArtwork from "@/assets/home-future-watercolor.webp";

export function HomeFuture() {
  return (
    <section
      data-home-future
      aria-labelledby="home-future-title"
      className="relative w-full overflow-hidden bg-[#c77d68] md:h-[clamp(32rem,50vw,54rem)] 2xl:h-[min(56.28vw,100vh)] 2xl:min-h-[54rem]"
    >
      <img
        src={homeFutureArtwork}
        alt=""
        aria-hidden="true"
        loading="lazy"
        decoding="async"
        width={1672}
        height={941}
        className="absolute inset-0 hidden h-full w-full object-cover md:block 2xl:object-contain"
      />

      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_42%,_#f9e5d8_0%,_#efbea6_62%,_#c97868_100%)] md:hidden"
      >
        <div className="absolute inset-x-0 top-0 h-20 overflow-hidden">
          <img
            src={homeFutureArtwork}
            alt=""
            loading="lazy"
            decoding="async"
            width={1672}
            height={941}
            className="absolute left-1/2 top-0 h-auto w-[160%] max-w-none -translate-x-1/2 opacity-70 [-webkit-mask-image:linear-gradient(to_bottom,black_0%,black_30%,transparent_100%)] [mask-image:linear-gradient(to_bottom,black_0%,black_30%,transparent_100%)]"
          />
        </div>
        <div className="absolute inset-x-0 bottom-0 h-28 overflow-hidden">
          <img
            src={homeFutureArtwork}
            alt=""
            loading="lazy"
            decoding="async"
            width={1672}
            height={941}
            className="absolute bottom-0 left-1/2 h-auto w-[160%] max-w-none -translate-x-1/2 opacity-90 [-webkit-mask-image:linear-gradient(to_bottom,transparent_0%,black_45%,black_100%)] [mask-image:linear-gradient(to_bottom,transparent_0%,black_45%,black_100%)]"
          />
        </div>
      </div>

      <div className="relative flex min-h-[35rem] flex-col items-center justify-center px-7 py-16 text-center text-[#83352e] md:absolute md:inset-0 md:min-h-0 md:px-10 md:py-0">
        <div className="flex flex-col items-center md:sr-only">
          <h2
            id="home-future-title"
            className="font-display text-[2.65rem] font-normal leading-[1.08]"
          >
            Nosso lar, nosso futuro
          </h2>

          <div aria-hidden="true" className="mt-7 flex items-center justify-center text-[#c58d2d]">
            <span className="h-px w-20 bg-current" />
            <span className="mx-4 text-[1.65rem] leading-none">♡</span>
            <span className="h-px w-20 bg-current" />
          </div>

          <p className="mt-7 max-w-[21rem] text-base leading-7">
            Que este seja apenas o começo de uma vida cheia de amor, parceria e novas conquistas.
          </p>
        </div>

        <p className="mt-7 max-w-[23rem] text-[0.95rem] leading-7 md:absolute md:left-1/2 md:top-[67%] md:mt-0 md:w-[min(48rem,80vw)] md:max-w-none md:-translate-x-1/2 md:text-sm md:leading-6 lg:text-[1.05rem] lg:leading-8 2xl:w-[min(64rem,80vw)] 2xl:text-[clamp(1.05rem,1vw,2rem)] 2xl:leading-[1.8]">
          Entre sonhos divididos, planos construídos com calma e o afeto que nos trouxe até aqui,
          seguimos com o coração em paz. O que celebramos hoje não termina no altar. Continua na
          vida que escolhemos viver, um ao lado do outro.
        </p>
      </div>
    </section>
  );
}
