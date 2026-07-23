import { PlayIcon } from "./Icons";

export default function Trailer({ embedUrl, onPlay }) {
  return (
    <section id="trailer" className="relative min-h-[78vh] overflow-hidden">
      <img src="/images/flip-it-diner.png" alt="" className="absolute inset-0 h-full w-full object-cover" />
      <div className="absolute inset-0 bg-black/65" />
      <div className="relative z-10 grid min-h-[78vh] place-items-center px-5 text-center">
        <div>
          <p className="text-[9px] uppercase tracking-cinema text-gold">Official trailer</p>
          <h2 className="mt-7 font-display text-7xl font-black uppercase leading-[0.8] tracking-[-0.04em] sm:text-9xl">
            Watch the<br /><span className="text-outline italic">night unfold</span>
          </h2>
          <button
            onClick={onPlay}
            className="mx-auto mt-12 grid h-24 w-24 place-items-center rounded-full border border-white/60 transition hover:scale-110 hover:border-crimson hover:bg-crimson"
            aria-label="Watch trailer"
          >
            <PlayIcon className="h-8 w-8" />
          </button>
          {!embedUrl && (
            <p className="mt-5 text-[8px] uppercase tracking-cinema text-white/45">
              Trailer placeholder — add your YouTube or Vimeo URL
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
