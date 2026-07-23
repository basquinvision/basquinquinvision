import SectionHeading from "./SectionHeading";

export default function MediaHub({ tabs }) {
  return (
    <section id="media" className="bg-bone px-5 py-20 text-ink sm:px-8 lg:px-12 lg:py-32">
      <div className="mx-auto max-w-[1350px]">
        <SectionHeading number="02" eyebrow="All media tabs" title="The" accent="archive" tone="light" />
        <div className="grid gap-4 md:grid-cols-2">
          {tabs.map((tab, index) => (
            <a
              key={tab.title}
              href={tab.href}
              className={`group relative min-h-[340px] overflow-hidden bg-ink text-white shadow-2xl shadow-black/10 sm:min-h-[430px] ${index === 0 ? "md:col-span-2 lg:min-h-[540px]" : ""}`}
            >
              <img
                src={tab.image}
                alt=""
                loading="lazy"
                className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-[1.04]"
              />
              <div className="absolute inset-0 bg-[linear-gradient(0deg,rgba(0,0,0,.9),rgba(0,0,0,.14)_60%)]" />
              <div className="absolute left-5 top-5 rounded-full border border-white/20 bg-black/35 px-4 py-2 text-[9px] uppercase tracking-cinema text-white/60 backdrop-blur">
                0{index + 1}
              </div>
              <div className="absolute inset-x-0 bottom-0 p-6 sm:p-8">
                <p className="text-[9px] uppercase tracking-cinema text-gold">{tab.label}</p>
                <div className="mt-4 flex items-end justify-between gap-6">
                  <div>
                    <h3 className="font-display text-5xl font-black uppercase leading-none sm:text-7xl">{tab.title}</h3>
                    <p className="mt-4 max-w-xl text-sm leading-6 text-white/60">{tab.description}</p>
                  </div>
                  <span className="hidden text-5xl text-white/40 transition group-hover:translate-x-2 group-hover:text-gold sm:block">→</span>
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
