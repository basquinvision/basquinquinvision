import { ArrowIcon } from "./Icons";

export default function ServiceAreas({ areas }) {
  return (
    <section id="areas" className="relative overflow-hidden bg-bone px-5 py-20 text-ink sm:px-8 lg:px-12 lg:py-28">
      <div className="absolute right-0 top-0 h-full w-1/2 bg-[radial-gradient(circle_at_center,rgba(188,48,40,.16),transparent_55%)]" />
      <div className="relative mx-auto grid max-w-[1350px] gap-10 lg:grid-cols-[.9fr_1.1fr] lg:items-end">
        <div>
          <p className="text-[9px] uppercase tracking-cinema text-blood/70">Based in South Florida</p>
          <h2 className="mt-5 font-display text-5xl font-black uppercase leading-[0.85] tracking-[-0.02em] sm:text-7xl">
            Film, photo,
            <br />
            <span className="italic text-transparent [-webkit-text-stroke:1px_#8d1f1b]">video & weddings</span>
          </h2>
        </div>
        <div>
          <p className="max-w-2xl text-sm leading-7 text-ink/65">
            Basquin Vision serves South Florida clients looking for cinematic photography, wedding videography, music
            videos, event coverage, promo reels, and private media delivery.
          </p>
          <div className="mt-7 flex flex-wrap gap-3">
            {areas.map((area) => (
              <span key={area} className="border border-ink/15 bg-white px-4 py-3 text-[9px] font-bold uppercase tracking-cinema text-ink/65">
                {area}
              </span>
            ))}
            <span className="border border-dashed border-ink/25 px-4 py-3 text-[9px] font-bold uppercase tracking-cinema text-ink/45">
              + Travel projects
            </span>
          </div>
          <a
            href="#contact"
            className="mt-8 inline-flex items-center gap-4 bg-ink px-8 py-4 text-[10px] font-bold uppercase tracking-[0.2em] text-white transition hover:-translate-y-1 hover:bg-crimson"
          >
            Book in South Florida <ArrowIcon />
          </a>
        </div>
      </div>
    </section>
  );
}
