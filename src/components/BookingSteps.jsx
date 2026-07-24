import { ArrowIcon } from "./Icons";
import SectionHeading from "./SectionHeading";

export default function BookingSteps({ steps }) {
  return (
    <section className="relative overflow-hidden bg-ink px-5 py-20 sm:px-8 lg:px-12 lg:py-28">
      <div className="absolute left-1/2 top-0 h-80 w-80 -translate-x-1/2 rounded-full bg-gold/10 blur-3xl" />
      <div className="relative mx-auto max-w-[1350px]">
        <SectionHeading number="06" eyebrow="How booking works" title="Simple" accent="process" />
        <div className="grid gap-4 lg:grid-cols-3">
          {steps.map((step, index) => (
            <article key={step.title} className="border border-white/15 bg-white/[.03] p-6">
              <p className="font-display text-6xl font-black leading-none text-gold/80">0{index + 1}</p>
              <h3 className="mt-7 font-display text-4xl font-black uppercase leading-none">{step.title}</h3>
              <p className="mt-4 text-sm leading-7 text-white/55">{step.description}</p>
            </article>
          ))}
        </div>
        <div className="mt-8 flex flex-col gap-4 border border-white/15 bg-white/[.03] p-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="max-w-2xl font-display text-2xl font-bold uppercase leading-tight">
            Want it simple? Pick the package, send the details, and I’ll tell you the clean next step.
          </p>
          <div className="flex flex-col gap-3 sm:flex-row">
            <a
              href="/#/galleries"
              className="inline-flex items-center justify-center gap-4 border border-white/30 px-7 py-4 text-[10px] font-bold uppercase tracking-[0.2em] text-white transition hover:-translate-y-1 hover:border-gold hover:text-gold"
            >
              Client galleries
            </a>
            <a
              href="#contact"
              className="inline-flex items-center justify-center gap-4 bg-bone px-7 py-4 text-[10px] font-bold uppercase tracking-[0.2em] text-ink transition hover:-translate-y-1 hover:bg-gold"
            >
              Start booking <ArrowIcon />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
