import { ArrowIcon } from "./Icons";
import SectionHeading from "./SectionHeading";

export default function PremiumDrops({ drops }) {
  return (
    <section id="drops" className="bg-blood px-5 py-20 sm:px-8 lg:px-12 lg:py-32">
      <div className="mx-auto max-w-[1350px]">
        <SectionHeading number="05" eyebrow="Private delivery / paywall" title="Premium" accent="drops" />
        <div className="grid gap-5 lg:grid-cols-3">
          {drops.map((drop) => (
            <article key={drop.title} className="flex min-h-[340px] flex-col justify-between border border-white/20 bg-black/25 p-6 transition duration-300 hover:border-gold/50 hover:bg-black/40">
              <div>
                <p className="font-display text-2xl font-bold uppercase text-gold">{drop.price}</p>
                <h3 className="mt-5 font-display text-4xl font-black uppercase leading-none">{drop.title}</h3>
                <p className="mt-5 text-sm leading-7 text-white/60">{drop.description}</p>
              </div>
              <a
                href="#contact"
                className="mt-10 inline-flex items-center justify-center gap-4 border border-white/30 px-6 py-3.5 text-[10px] font-bold uppercase tracking-[0.2em] text-white transition hover:border-gold hover:bg-gold hover:text-ink"
              >
                Request access <ArrowIcon />
              </a>
            </article>
          ))}
        </div>
        {/* Paywall/checkout (Stripe, Gumroad, or client login) can be wired to these cards later. */}
        <p className="mt-8 max-w-2xl text-xs leading-6 text-white/50">
          Every drop is delivered through a private, protected link — pay-to-unlock or client-only access, sent
          straight to your inbox.
        </p>
      </div>
    </section>
  );
}
