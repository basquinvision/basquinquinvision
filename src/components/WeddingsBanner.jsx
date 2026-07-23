import { ArrowIcon } from "./Icons";

// Homepage cross-sell banner for the /weddings landing page.
export default function WeddingsBanner({ promo }) {
  return (
    <section id="weddings" className="relative overflow-hidden bg-ivory px-5 py-20 text-night sm:px-8 lg:px-12 lg:py-28">
      <div className="relative mx-auto grid max-w-[1350px] items-center gap-10 lg:grid-cols-[1.05fr_.95fr]">
        <div>
          <p className="flex items-center gap-4 text-[9px] uppercase tracking-cinema text-bronze">
            <span className="h-px w-10 bg-bronze" />
            {promo.eyebrow}
          </p>
          <h2 className="mt-6 font-serif text-5xl font-semibold leading-[1.02] tracking-tight sm:text-7xl">
            {promo.title}
            <br />
            <span className="italic text-bronze">{promo.accent}</span>
          </h2>
          <p className="mt-6 max-w-xl text-sm leading-7 text-night/65">{promo.description}</p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <a
              href={promo.primaryCta.href}
              className="flex items-center justify-center gap-4 bg-night px-8 py-4 text-[10px] font-bold uppercase tracking-[0.2em] text-white transition hover:-translate-y-1 hover:bg-bronze"
            >
              {promo.primaryCta.label} <ArrowIcon />
            </a>
            <a
              href={promo.secondaryCta.href}
              className="flex items-center justify-center gap-4 border border-night/25 px-8 py-4 text-[10px] font-bold uppercase tracking-[0.2em] text-night transition hover:-translate-y-1 hover:border-bronze hover:text-bronze"
            >
              {promo.secondaryCta.label}
            </a>
          </div>
        </div>
        <a href={promo.primaryCta.href} className="group relative block overflow-hidden shadow-2xl shadow-night/20">
          <div className="aspect-[16/11] overflow-hidden">
            <img
              src={promo.image}
              alt="South Florida couple during a cinematic wedding portrait session"
              loading="lazy"
              className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-night/70 via-transparent to-transparent" />
          <p className="absolute bottom-5 left-5 text-[9px] uppercase tracking-cinema text-white/85">
            Wedding films · photo · albums · private galleries
          </p>
        </a>
      </div>
    </section>
  );
}
