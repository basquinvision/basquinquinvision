export default function TrustStrip({ points }) {
  return (
    <section className="border-y border-white/10 bg-crimson px-5 py-4 sm:px-8 lg:px-12">
      <div className="mx-auto flex max-w-[1500px] flex-wrap items-center justify-center gap-x-8 gap-y-3 text-center text-[9px] font-bold uppercase tracking-cinema text-white/75">
        {points.map((point) => (
          <span key={point} className="inline-flex items-center gap-3">
            <span className="h-1.5 w-1.5 rounded-full bg-gold" />
            {point}
          </span>
        ))}
      </div>
    </section>
  );
}
