export default function About({ film }) {
  const facts = [
    ["Genre", film.genre],
    ["Runtime", film.runtime],
    ["Location", film.location],
    ["Year", film.year],
  ];

  return (
    <section id="about" className="bg-bone px-5 py-24 text-ink sm:px-8 lg:px-12 lg:py-36">
      <div className="mx-auto grid max-w-[1350px] gap-16 lg:grid-cols-[.7fr_2fr]">
        <p className="text-[9px] uppercase tracking-cinema text-ink/45">01 / About the film</p>
        <div>
          <p className="max-w-5xl font-display text-4xl font-bold uppercase leading-[0.98] tracking-[-0.03em] sm:text-6xl lg:text-7xl">
            One night. One choice. <span className="italic text-blood">No clean way out.</span>
          </p>
          <div className="mt-14 grid gap-10 border-t border-ink/20 pt-10 lg:grid-cols-2">
            <p className="max-w-xl text-sm leading-7 text-ink/65">{film.description}</p>
            <dl className="grid grid-cols-2 gap-x-8 gap-y-7">
              {facts.map(([label, value]) => (
                <div key={label} className="border-b border-ink/20 pb-4">
                  <dt className="text-[8px] uppercase tracking-cinema text-ink/40">{label}</dt>
                  <dd className="mt-2 font-display text-lg font-bold uppercase">{value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </div>
    </section>
  );
}
