export default function StatsBar({ stats }) {
  return (
    <section className="border-y border-white/10 bg-ink px-5 py-5 sm:px-8 lg:px-12">
      <div className="mx-auto grid max-w-[1500px] grid-cols-2 gap-3 lg:grid-cols-4">
        {stats.map((stat) => (
          <div key={stat.label} className="border border-white/10 bg-white/[.025] px-4 py-5">
            <p className="font-display text-4xl font-black uppercase leading-none text-gold sm:text-5xl">{stat.value}</p>
            <p className="mt-2 text-[9px] uppercase tracking-cinema text-white/45">{stat.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
