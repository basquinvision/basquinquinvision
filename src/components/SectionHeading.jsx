// tone="dark" for dark sections (default), tone="light" for bone/ivory sections.
export default function SectionHeading({ number, eyebrow, title, accent, tone = "dark" }) {
  const light = tone === "light";

  return (
    <div className="mb-12 flex flex-col gap-7 lg:mb-20 lg:flex-row lg:items-end lg:justify-between">
      <p className={`flex items-center gap-3 text-[9px] uppercase tracking-cinema ${light ? "text-ink/45" : "text-white/50"}`}>
        <span className={`grid h-8 w-8 place-items-center rounded-full border ${light ? "border-ink/20" : "border-white/20"}`}>
          {number}
        </span>
        {eyebrow}
      </p>
      <h2 className="font-display text-6xl font-black uppercase leading-[0.8] tracking-[-0.02em] sm:text-8xl lg:text-right lg:text-9xl">
        {title}
        {accent && (
          <>
            <br />
            <span className="text-outline-red italic">{accent}</span>
          </>
        )}
      </h2>
    </div>
  );
}
