import { ArrowIcon } from "./Icons";
import SectionHeading from "./SectionHeading";

export default function FeaturedWork({ projects }) {
  return (
    <section id="work" className="bg-ink px-5 py-20 sm:px-8 lg:px-12 lg:py-32">
      <div className="mx-auto max-w-[1350px]">
        <SectionHeading number="04" eyebrow="Selected work" title="Featured" accent="reels" />
        <div className="grid gap-5 lg:grid-cols-3">
          {projects.map((project) => {
            const Wrapper = project.href ? "a" : "article";
            return (
              <Wrapper
                key={project.title}
                {...(project.href ? { href: project.href } : {})}
                className="group flex flex-col overflow-hidden border border-white/15 bg-white/[.03] transition duration-300 hover:border-white/30"
              >
                <div className="relative aspect-[4/5] overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.title}
                    loading="lazy"
                    className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
                  <p className="absolute left-5 top-5 text-[9px] uppercase tracking-cinema text-gold">{project.type}</p>
                  <p className="absolute right-5 top-5 text-[9px] uppercase tracking-cinema text-white/50">{project.year}</p>
                </div>
                <div className="flex flex-1 flex-col p-6">
                  <h3 className="font-display text-4xl font-black uppercase leading-none">{project.title}</h3>
                  <p className="mt-4 text-sm leading-7 text-white/55">{project.description}</p>
                  {project.href && (
                    <p className="mt-auto flex items-center gap-3 pt-6 text-[10px] font-bold uppercase tracking-[0.2em] text-gold">
                      {project.cta || "View project"}
                      <ArrowIcon className="h-3.5 w-3.5 transition group-hover:translate-x-1" />
                    </p>
                  )}
                </div>
              </Wrapper>
            );
          })}
        </div>
      </div>
    </section>
  );
}
