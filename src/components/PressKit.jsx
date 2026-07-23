import { DownloadIcon } from "./Icons";
import SectionHeading from "./SectionHeading";

export default function PressKit({ items }) {
  return (
    <section id="press" className="bg-ink px-5 py-24 sm:px-8 lg:px-12 lg:py-36">
      <div className="mx-auto max-w-[1350px]">
        <SectionHeading number="04" eyebrow="Press & festivals" title="Press" accent="kit" />
        <div className="border-t border-white/20">
          {items.map((item, index) => (
            <a
              key={item.title}
              href={item.href}
              download
              className="group grid gap-4 border-b border-white/20 py-7 transition hover:px-4 hover:bg-white/[.04] sm:grid-cols-[60px_1fr_auto] sm:items-center"
            >
              <span className="text-[9px] tracking-cinema text-white/35">0{index + 1}</span>
              <div>
                <h3 className="font-display text-3xl font-bold uppercase">{item.title}</h3>
                <p className="mt-1 text-xs text-white/40">{item.description}</p>
              </div>
              <DownloadIcon className="h-6 w-6 text-gold transition group-hover:translate-y-1" />
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
