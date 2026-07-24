import { ArrowIcon } from "./Icons";
import SectionHeading from "./SectionHeading";

export default function BookingPackages({ packages, addOns = [] }) {
  return (
    <section id="packages" className="bg-bone px-5 py-20 text-ink sm:px-8 lg:px-12 lg:py-32">
      <div className="mx-auto max-w-[1350px]">
        <SectionHeading number="05" eyebrow="Simple photo pricing" title="Pick" accent="a package" tone="light" />
        <div className="mb-8 grid gap-4 border border-ink/15 bg-white p-5 md:grid-cols-[1fr_auto] md:items-center">
          <p className="max-w-3xl text-sm leading-7 text-ink/65">
            Photo coverage is simple: $150/hour. These three options make it easy to choose without guessing. Video,
            prints, travel, and rush delivery can be added when needed.
          </p>
          <a
            href="#contact"
            className="inline-flex items-center justify-center gap-3 bg-ink px-6 py-3 text-[10px] font-bold uppercase tracking-[0.2em] text-white transition hover:bg-crimson"
          >
            Ask a question <ArrowIcon />
          </a>
        </div>
        <div className="grid gap-5 lg:grid-cols-3">
          {packages.map((pack, index) => {
            const featured = index === 1;
            return (
              <article
                key={pack.title}
                className={`relative flex min-h-[430px] flex-col justify-between border p-6 ${
                  featured ? "border-blood bg-ink text-white shadow-2xl shadow-blood/25" : "border-ink/20 bg-white"
                }`}
              >
                {pack.badge && (
                  <span className="absolute -top-3 left-6 bg-crimson px-3 py-1.5 text-[9px] font-bold uppercase tracking-cinema text-white">
                    {pack.badge}
                  </span>
                )}
                <div>
                  <p className={`text-[9px] uppercase tracking-cinema ${featured ? "text-gold" : "text-blood"}`}>{pack.timeline}</p>
                  <h3 className="mt-6 font-display text-5xl font-black uppercase leading-none">{pack.title}</h3>
                  <p className="mt-4 font-display text-3xl font-bold uppercase">{pack.price}</p>
                  {pack.bestFor && (
                    <p className={`mt-4 text-sm leading-6 ${featured ? "text-white/60" : "text-ink/60"}`}>
                      {pack.bestFor}
                    </p>
                  )}
                  <ul className={`mt-8 grid gap-3 text-sm ${featured ? "text-white/65" : "text-ink/65"}`}>
                    {pack.includes.map((item) => (
                      <li key={item} className="flex gap-3">
                        <span className={featured ? "text-gold" : "text-blood"}>✦</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
                <a
                  href="#contact"
                  className={`mt-10 flex items-center justify-center gap-4 px-6 py-4 text-[10px] font-bold uppercase tracking-[0.2em] transition ${
                    featured
                      ? "bg-crimson text-white hover:bg-gold hover:text-ink"
                      : "border border-ink/25 text-ink hover:border-ink hover:bg-ink hover:text-white"
                  }`}
                >
                  Start booking <ArrowIcon />
                </a>
              </article>
            );
          })}
        </div>
        {addOns.length > 0 && (
          <div className="mt-8 grid gap-3 md:grid-cols-4">
            {addOns.map((addOn) => (
              <article key={addOn.title} className="border border-ink/15 bg-white p-5">
                <div className="flex items-start justify-between gap-4">
                  <h3 className="font-display text-2xl font-black uppercase leading-none">{addOn.title}</h3>
                  <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-blood">{addOn.price}</p>
                </div>
                <p className="mt-4 text-xs leading-6 text-ink/60">{addOn.detail}</p>
              </article>
            ))}
          </div>
        )}
        <div className="mt-10 flex flex-col gap-4 border border-ink/15 bg-white p-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="max-w-2xl font-display text-2xl font-bold uppercase leading-tight">
            Need video, travel, prints, or something custom? Send the details and we’ll quote it clearly.
          </p>
          <a
            href="#contact"
            className="inline-flex items-center justify-center gap-4 bg-ink px-7 py-4 text-[10px] font-bold uppercase tracking-[0.2em] text-white transition hover:bg-crimson"
          >
            Get a custom quote <ArrowIcon />
          </a>
        </div>
      </div>
    </section>
  );
}
