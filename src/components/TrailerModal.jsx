import { CloseIcon } from "./Icons";

export default function TrailerModal({ open, onClose, embedUrl }) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[60] grid place-items-center bg-black/95 p-4" role="dialog" aria-modal="true" aria-label="Film trailer">
      <button onClick={onClose} className="absolute right-6 top-6" aria-label="Close trailer">
        <CloseIcon className="h-8 w-8" />
      </button>
      <div className="aspect-video w-full max-w-6xl border border-white/20 bg-neutral-950">
        {embedUrl ? (
          <iframe
            src={embedUrl}
            title="Film trailer"
            className="h-full w-full"
            allow="autoplay; fullscreen; picture-in-picture"
            allowFullScreen
          />
        ) : (
          <div className="grid h-full place-items-center bg-[radial-gradient(circle_at_center,rgba(141,31,27,.35),transparent_55%)] text-center">
            <div>
              <p className="font-display text-6xl font-black uppercase sm:text-8xl">Trailer coming soon</p>
              <p className="mt-5 text-[9px] uppercase tracking-cinema text-white/45">
                Replace trailerEmbedUrl in src/data/filmData.js
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
