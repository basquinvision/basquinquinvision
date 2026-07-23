import { ArrowIcon } from "./Icons";
import SectionHeading from "./SectionHeading";

export default function Services({ services }) {
  return (
    <section id="services" className="bg-ink px-5 py-20 sm:px-8 lg:px-12 lg:py-32">
      <div className="mx-auto max-w-[1350px]">
        <SectionHeading number="03" eyebrow="What people can book" title="Media" accent="services" />
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((service, index) => (
            <a
              key={service.title}
              href="#contact"
              className="group flex flex-col justify-between border border-white/15 bg-white/[.03] p-6 transition duration-300 hover:-translate-y-2 hover:border-gold/60 hover:bg-gold/10"
            >
              <div>
                <p className="text-[9px] uppercase tracking-cinema text-white/35">0{index + 1}</p>
                <h3 className="mt-5 font-display text-3xl font-bold uppercase leading-none">{service.title}</h3>
                <p className="mt-4 text-sm leading-6 text-white/50">{service.description}</p>
              </div>
              <div className="mt-8">
                {service.deliverable && (
                  <p className="text-[9px] uppercase tracking-cinema text-gold/80">
                    You get: <span className="text-white/60">{service.deliverable}</span>
                  </p>
                )}
                <div className="mt-4 flex items-center justify-between border-t border-white/10 pt-4">
                  <span className="text-[9px] font-bold uppercase tracking-[0.2em] text-white/45 transition group-hover:text-gold">
                    Book this
                  </span>
                  <ArrowIcon className="h-3.5 w-3.5 text-white/45 transition group-hover:translate-x-1 group-hover:text-gold" />
                </div>
              </div>
            </a>
          ))}
        </div>
        <p className="mt-8 border border-white/10 bg-white/[.02] px-5 py-4 text-center text-[9px] uppercase tracking-cinema text-white/45">
          Every booking includes color-graded delivery + a private client link
        </p>
      </div>
    </section>
  );
}
