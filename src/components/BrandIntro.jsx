import { ArrowIcon } from "./Icons";

export default function BrandIntro({ brand }) {
  return (
    <section id="vision" className="relative overflow-hidden bg-ink px-5 py-20 sm:px-8 lg:px-12 lg:py-32">
      <div className="absolute -left-40 top-20 h-96 w-96 rounded-full bg-crimson/20 blur-3xl" />
      <div className="absolute -right-32 bottom-10 h-80 w-80 rounded-full bg-gold/10 blur-3xl" />
      <div className="absolute inset-0 opacity-[.08] [background-image:linear-gradient(rgba(255,255,255,.6)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.6)_1px,transparent_1px)] [background-size:64px_64px]" />
      <div className="relative mx-auto grid max-w-[1350px] gap-12 lg:grid-cols-[1.1fr_.9fr] lg:items-end">
        <div>
          <p className="text-[9px] uppercase tracking-cinema text-gold">{brand.city} media house / founded by {brand.founder}</p>
          <h2 className="mt-6 font-display text-6xl font-black uppercase leading-[0.8] tracking-[-0.02em] sm:text-8xl lg:text-[10rem]">
            {brand.name.split(" ")[0]}
            <br />
            <span className="text-outline-red italic">{brand.name.split(" ").slice(1).join(" ")}</span>
          </h2>
        </div>
        <div className="border-l border-white/20 pl-6">
          <p className="font-display text-3xl font-bold uppercase leading-tight">{brand.tagline}</p>
          <p className="mt-6 text-sm leading-7 text-white/55">{brand.description}</p>
          <div className="mt-8 grid gap-3 text-[9px] uppercase tracking-cinema text-white/55 sm:grid-cols-2">
            <span className="border border-white/10 bg-white/[.03] px-4 py-3">✦ Event photos</span>
            <span className="border border-white/10 bg-white/[.03] px-4 py-3">✦ Portrait sessions</span>
            <span className="border border-white/10 bg-white/[.03] px-4 py-3">✦ Promo videos</span>
            <span className="border border-white/10 bg-white/[.03] px-4 py-3">✦ Weddings</span>
          </div>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <a href="#packages" className="flex items-center justify-center gap-4 bg-bone px-7 py-4 text-[10px] font-bold uppercase tracking-[0.2em] text-ink transition hover:bg-gold">
              See prices <ArrowIcon />
            </a>
            <a href="#contact" className="flex items-center justify-center gap-4 border border-white/35 px-7 py-4 text-[10px] font-bold uppercase tracking-[0.2em] transition hover:border-crimson hover:bg-crimson">
              Book {brand.founder.split(" ")[0]}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
