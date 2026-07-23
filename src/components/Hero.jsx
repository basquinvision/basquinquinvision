import { ArrowIcon, PlayIcon } from "./Icons";

const heroLinks = [
  { label: "South Florida weddings", href: "/#/weddings" },
  { label: "Music videos", href: "#services" },
  { label: "Regular events", href: "#packages" },
];

export default function Hero({ brand }) {
  return (
    <section id="top" className="relative min-h-screen overflow-hidden bg-ink">
      <img
        src="/images/flip-it-hero.png"
        alt="Cinematic night scene from a Basquin Vision shoot"
        className="absolute inset-0 h-full w-full animate-slow-zoom object-cover object-[66%_center]"
      />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_72%_35%,rgba(188,48,40,.32),transparent_28%),linear-gradient(90deg,rgba(7,7,7,.97)_0%,rgba(7,7,7,.78)_43%,rgba(7,7,7,.2)_80%),linear-gradient(0deg,rgba(7,7,7,.86),transparent_54%)]" />
      <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-ink/80 to-transparent" />
      <div className="absolute left-0 top-0 hidden h-full w-px bg-gradient-to-b from-gold/0 via-gold/60 to-gold/0 lg:block" />

      <div className="relative z-10 mx-auto flex min-h-screen max-w-[1500px] flex-col justify-center px-5 pb-12 pt-28 sm:px-8 lg:justify-end lg:px-12 lg:pb-20 lg:pt-32">
        <div className="mb-5 flex flex-wrap items-center gap-x-4 gap-y-2 text-[9px] uppercase tracking-cinema text-gold lg:mb-7">
          <span className="h-px w-10 bg-gold" />
          {brand.city} media house
          <span className="hidden text-white/25 sm:inline">/</span>
          <span className="text-white/55">films · photos · promos</span>
        </div>
        <h1 className="max-w-6xl font-display text-[19vw] font-black uppercase leading-[0.78] tracking-[-0.03em] sm:text-[14vw] lg:text-[11rem]">
          Basquin
          <br />
          <span className="text-outline italic">Vision</span>
        </h1>
        <div className="mt-7 grid gap-7 border-t border-white/20 pt-7 lg:mt-9 lg:grid-cols-[1.1fr_.9fr] lg:items-end lg:gap-10">
          <div>
            <p className="max-w-3xl font-display text-2xl font-semibold uppercase tracking-[0.02em] sm:text-4xl">
              {brand.tagline}
            </p>
            <p className="mt-3 text-[9px] uppercase tracking-cinema text-white/45">
              Weddings · music videos · events · artist promos · private media delivery
            </p>
          </div>
          <div className="flex flex-col gap-4 lg:items-end">
            <p className="inline-flex items-center gap-2.5 text-[9px] uppercase tracking-cinema text-white/60">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-gold opacity-60" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-gold" />
              </span>
              {brand.availability}
            </p>
            <div className="flex w-full flex-col gap-3 sm:flex-row lg:justify-end">
              <a
                href="#contact"
                className="group flex items-center justify-center gap-4 bg-crimson px-8 py-4 text-[10px] font-bold uppercase tracking-[0.2em] text-white transition hover:-translate-y-1 hover:bg-gold hover:text-ink"
              >
                Book a shoot <ArrowIcon />
              </a>
              <a
                href="#work"
                className="group flex items-center justify-center gap-3 border border-white/40 px-8 py-4 text-[10px] font-bold uppercase tracking-[0.2em] transition hover:-translate-y-1 hover:border-bone hover:bg-bone hover:text-ink"
              >
                <PlayIcon /> View work
              </a>
            </div>
          </div>
        </div>
        <div className="mt-8 grid max-w-4xl gap-3 sm:grid-cols-3">
          {heroLinks.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="group flex items-center justify-between border border-white/15 bg-black/25 px-4 py-3.5 text-[9px] uppercase tracking-cinema text-white/60 backdrop-blur transition hover:border-gold/50 hover:text-gold"
            >
              <span>✦ {item.label}</span>
              <span className="translate-x-0 transition group-hover:translate-x-1">→</span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
