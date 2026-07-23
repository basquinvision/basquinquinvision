import SectionHeading from "./SectionHeading";

export default function CastCrew({ people }) {
  return (
    <section id="cast" className="bg-ink px-5 py-24 sm:px-8 lg:px-12 lg:py-36">
      <div className="mx-auto max-w-[1350px]">
        <SectionHeading number="02" eyebrow="Cast & crew" title="The people" accent="behind it" />
        <div className="grid gap-px bg-white/15 sm:grid-cols-2 lg:grid-cols-4">
          {people.map((person, index) => (
            <article key={`${person.role}-${person.name}`} className="group bg-ink">
              <div className="relative aspect-[4/5] overflow-hidden bg-neutral-900">
                <img
                  src={person.photo}
                  alt={`Placeholder portrait for ${person.name}`}
                  className="h-full w-full object-cover grayscale transition duration-700 group-hover:scale-105 group-hover:grayscale-0"
                />
                <span className="absolute left-5 top-5 text-[9px] tracking-cinema text-white/60">
                  0{index + 1}
                </span>
                <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black to-transparent" />
              </div>
              <div className="border-t border-white/15 p-6">
                <p className="text-[8px] uppercase tracking-cinema text-gold">{person.role}</p>
                <h3 className="mt-3 font-display text-3xl font-bold uppercase">{person.name}</h3>
                <p className="mt-4 text-xs leading-6 text-white/45">{person.bio}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
