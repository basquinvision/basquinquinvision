import { useState } from "react";
import { CloseIcon } from "./Icons";
import SectionHeading from "./SectionHeading";

export default function Gallery({ images }) {
  const [active, setActive] = useState(null);

  return (
    <section id="gallery" className="bg-bone px-5 py-24 text-ink sm:px-8 lg:px-12 lg:py-36">
      <div className="mx-auto max-w-[1350px]">
        <div className="[&_.text-white\\/50]:!text-ink/45 [&_.border-white\\/20]:!border-ink/20">
          <SectionHeading number="03" eyebrow="Production stills" title="Inside" accent="the frame" />
        </div>
        <div className="grid gap-4 lg:grid-cols-12">
          {images.map((image, index) => (
            <button
              key={image.src}
              onClick={() => setActive(image)}
              className={`group relative overflow-hidden text-left ${index === 0 ? "lg:col-span-7" : index === 1 ? "lg:col-span-5" : "lg:col-span-12"}`}
            >
              <img
                src={image.src}
                alt={image.alt}
                className={`w-full object-cover transition duration-700 group-hover:scale-[1.025] ${index === 2 ? "aspect-[16/7]" : "aspect-[4/3]"}`}
              />
              <div className="absolute inset-x-0 bottom-0 flex items-end justify-between bg-gradient-to-t from-black/80 to-transparent p-5 text-white">
                <span className="text-[9px] uppercase tracking-cinema">{image.label}</span>
                <span className="text-2xl">＋</span>
              </div>
            </button>
          ))}
        </div>
      </div>

      {active && (
        <div className="fixed inset-0 z-50 grid place-items-center bg-black/95 p-5" role="dialog" aria-modal="true">
          <button className="absolute right-6 top-6 text-white" onClick={() => setActive(null)} aria-label="Close image">
            <CloseIcon className="h-8 w-8" />
          </button>
          <img src={active.src} alt={active.alt} className="max-h-[85vh] max-w-full object-contain" />
        </div>
      )}
    </section>
  );
}
