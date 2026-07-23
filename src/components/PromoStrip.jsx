export default function PromoStrip() {
  return (
    <section id="promo" className="overflow-hidden border-y border-white/10 bg-ink py-8">
      <div className="flex w-max animate-marquee gap-10 font-display text-5xl font-black uppercase tracking-[-0.02em] text-white/10 sm:text-7xl">
        {Array.from({ length: 2 }).map((_, group) => (
          <div key={group} className="flex gap-10">
            <span>Music videos</span>
            <span className="text-gold/40">Wedding films</span>
            <span>Promo campaigns</span>
            <span className="text-crimson/50">Film stills</span>
            <span>Private drops</span>
            <span className="text-gold/40">South Florida cinema</span>
          </div>
        ))}
      </div>
    </section>
  );
}
