import { useMemo, useState } from "react";
import Navbar from "./Navbar";
import { ArrowIcon } from "./Icons";
import { brand, serviceAreas, socialLinks } from "../data/filmData";
import { clientGalleries, galleryAccessCodes, galleryProducts } from "../data/clientGalleryData";
import { applySeo } from "../utils/seo";
import { useEffect } from "react";

const inputClasses =
  "mt-2 w-full border border-white/15 bg-white/[.04] px-4 py-3 text-white outline-none placeholder:text-white/30 focus:border-gold";

function buildOrderEmail({ gallery, product, selected, message }) {
  const subject = `Client gallery order — ${gallery?.title || "Basquin Vision"}`;
  const body = [
    `Gallery: ${gallery?.title || "Not selected"}`,
    `Client: ${gallery?.client || "—"}`,
    `Product: ${product || "—"}`,
    `Selected photo: ${selected || "—"}`,
    "",
    "Message:",
    message || "I want to order from this gallery.",
  ].join("\n");

  return `mailto:${brand.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

export default function ClientGalleryPortal() {
  const [accessCode, setAccessCode] = useState("");
  const [unlocked, setUnlocked] = useState(false);
  const [activeGalleryId, setActiveGalleryId] = useState(clientGalleries[0].id);
  const [selectedPhoto, setSelectedPhoto] = useState("");
  const [selectedProduct, setSelectedProduct] = useState(galleryProducts[0].title);
  const [message, setMessage] = useState("");
  const [uploads, setUploads] = useState([]);

  const activeGallery = useMemo(
    () => clientGalleries.find((gallery) => gallery.id === activeGalleryId) || clientGalleries[0],
    [activeGalleryId],
  );

  useEffect(() => {
    applySeo({
      title: "Client Galleries | Basquin Vision",
      description:
        "Private Basquin Vision client galleries for viewing photos, selecting favorites, and ordering downloads, prints, and canvases.",
      keywords: [
        "Basquin Vision client gallery",
        "South Florida photo gallery",
        "buy event photos",
        "photo prints South Florida",
        "private photo gallery",
      ],
      path: "/galleries",
      image: "/images/wedding-details.png",
    });
  }, []);

  function handleUnlock(event) {
    event.preventDefault();
    const cleaned = accessCode.trim().toUpperCase();
    setUnlocked(galleryAccessCodes.includes(cleaned));
  }

  function handleUploadPreview(event) {
    const files = Array.from(event.target.files || []);
    const imageFiles = files.filter((file) => file.type.startsWith("image/"));
    const previews = imageFiles.map((file) => ({
      name: file.name,
      size: `${Math.max(1, Math.round(file.size / 1024))} KB`,
      url: URL.createObjectURL(file),
    }));
    setUploads(previews);
  }

  return (
    <div className="min-h-screen overflow-x-hidden bg-ink font-body text-bone">
      <Navbar />
      <main>
        <section className="relative overflow-hidden px-5 pb-20 pt-32 sm:px-8 lg:px-12 lg:pb-28 lg:pt-40">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(188,48,40,.22),transparent_30%),radial-gradient(circle_at_80%_0%,rgba(184,154,97,.16),transparent_28%)]" />
          <div className="relative mx-auto grid max-w-[1500px] gap-10 lg:grid-cols-[1.05fr_.95fr] lg:items-end">
            <div>
              <p className="text-[9px] uppercase tracking-cinema text-gold">Private delivery / photos / prints</p>
              <h1 className="mt-6 font-display text-6xl font-black uppercase leading-[0.82] tracking-[-0.03em] sm:text-8xl lg:text-[10rem]">
                Client
                <br />
                <span className="text-outline italic">Galleries</span>
              </h1>
            </div>
            <div className="border border-white/15 bg-white/[.04] p-6">
              <p className="font-display text-3xl font-bold uppercase leading-tight">
                Clients can view their photos, pick favorites, and request downloads, prints, or canvases.
              </p>
              <p className="mt-5 text-sm leading-7 text-white/55">
                This page is ready for proofing and ordering. For full real uploads and card payments, connect cloud photo
                storage and Stripe/checkout next.
              </p>
              <form onSubmit={handleUnlock} className="mt-7 grid gap-3 sm:grid-cols-[1fr_auto]">
                <label>
                  <span className="text-[8px] uppercase tracking-cinema text-white/55">Client access code</span>
                  <input
                    value={accessCode}
                    onChange={(event) => setAccessCode(event.target.value)}
                    placeholder="Try BASQUIN"
                    className={inputClasses}
                  />
                </label>
                <button className="self-end bg-crimson px-7 py-4 text-[10px] font-bold uppercase tracking-[0.2em] text-white transition hover:bg-gold hover:text-ink">
                  Unlock
                </button>
              </form>
              {accessCode && !unlocked && (
                <p className="mt-3 text-xs text-gold/80">Use sample code BASQUIN for now. Real private codes can be added per client.</p>
              )}
            </div>
          </div>
        </section>

        <section className="bg-bone px-5 py-20 text-ink sm:px-8 lg:px-12 lg:py-28">
          <div className="mx-auto max-w-[1350px]">
            <div className="grid gap-5 md:grid-cols-2">
              {clientGalleries.map((gallery) => (
                <button
                  key={gallery.id}
                  onClick={() => {
                    setActiveGalleryId(gallery.id);
                    setSelectedPhoto("");
                  }}
                  className={`group grid gap-5 border p-4 text-left transition md:grid-cols-[190px_1fr] ${
                    activeGallery.id === gallery.id ? "border-blood bg-white shadow-2xl shadow-blood/10" : "border-ink/15 bg-white/70"
                  }`}
                >
                  <div className="aspect-[4/3] overflow-hidden bg-ink">
                    <img src={gallery.cover} alt={gallery.title} className="h-full w-full object-cover transition duration-700 group-hover:scale-105" />
                  </div>
                  <div className="flex flex-col justify-between">
                    <div>
                      <p className="text-[9px] uppercase tracking-cinema text-blood">{gallery.status}</p>
                      <h2 className="mt-3 font-display text-4xl font-black uppercase leading-none">{gallery.title}</h2>
                      <p className="mt-3 text-sm text-ink/55">{gallery.client} · {gallery.date}</p>
                    </div>
                    <p className="mt-5 text-xs leading-6 text-ink/60">{gallery.note}</p>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-ink px-5 py-20 sm:px-8 lg:px-12 lg:py-28">
          <div className="mx-auto grid max-w-[1350px] gap-8 lg:grid-cols-[1fr_360px]">
            <div>
              <div className="mb-6 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
                <div>
                  <p className="text-[9px] uppercase tracking-cinema text-gold">Viewing gallery</p>
                  <h2 className="mt-2 font-display text-5xl font-black uppercase leading-none">{activeGallery.title}</h2>
                </div>
                <p className="text-[9px] uppercase tracking-cinema text-white/45">{unlocked ? "Unlocked preview" : "Locked sample preview"}</p>
              </div>
              <div className={`grid gap-4 sm:grid-cols-2 xl:grid-cols-3 ${unlocked ? "" : "blur-[1px]"}`}>
                {activeGallery.photos.map((photo) => (
                  <button
                    key={photo.title}
                    onClick={() => setSelectedPhoto(photo.title)}
                    className={`group overflow-hidden border text-left transition ${
                      selectedPhoto === photo.title ? "border-gold bg-gold/10" : "border-white/15 bg-white/[.03]"
                    }`}
                  >
                    <div className="aspect-[4/5] overflow-hidden">
                      <img src={photo.src} alt={photo.title} className="h-full w-full object-cover transition duration-700 group-hover:scale-105" />
                    </div>
                    <div className="flex items-center justify-between p-4">
                      <div>
                        <p className="font-display text-xl font-black uppercase leading-none">{photo.title}</p>
                        <p className="mt-1 text-[9px] uppercase tracking-cinema text-white/40">{photo.tag}</p>
                      </div>
                      <span className="text-gold">✦</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            <aside className="h-fit border border-white/15 bg-white/[.04] p-6 lg:sticky lg:top-24">
              <p className="text-[9px] uppercase tracking-cinema text-gold">Buy / order</p>
              <h3 className="mt-3 font-display text-4xl font-black uppercase leading-none">Photo products</h3>
              <div className="mt-6 grid gap-3">
                {galleryProducts.map((product) => (
                  <button
                    key={product.title}
                    onClick={() => setSelectedProduct(product.title)}
                    className={`border p-4 text-left transition ${
                      selectedProduct === product.title ? "border-gold bg-gold/10" : "border-white/15 bg-black/20"
                    }`}
                  >
                    <div className="flex items-start justify-between gap-4">
                      <p className="text-sm font-bold uppercase tracking-[0.12em]">{product.title}</p>
                      <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-gold">{product.price}</p>
                    </div>
                    <p className="mt-2 text-xs leading-6 text-white/50">{product.detail}</p>
                  </button>
                ))}
              </div>
              <label className="mt-5 block">
                <span className="text-[8px] uppercase tracking-cinema text-white/55">Order note</span>
                <textarea
                  value={message}
                  onChange={(event) => setMessage(event.target.value)}
                  rows="4"
                  placeholder="Example: I want photo 03 as an 8x10 print."
                  className={`${inputClasses} resize-none`}
                />
              </label>
              <a
                href={buildOrderEmail({ gallery: activeGallery, product: selectedProduct, selected: selectedPhoto, message })}
                className="mt-5 flex items-center justify-center gap-4 bg-crimson px-6 py-4 text-[10px] font-bold uppercase tracking-[0.2em] text-white transition hover:bg-gold hover:text-ink"
              >
                Request order <ArrowIcon />
              </a>
              <p className="mt-4 text-xs leading-6 text-white/45">
                Next step: connect Stripe so this button becomes instant checkout for downloads, prints, and canvases.
              </p>
            </aside>
          </div>
        </section>

        <section className="bg-blood px-5 py-20 sm:px-8 lg:px-12 lg:py-28">
          <div className="mx-auto grid max-w-[1350px] gap-10 lg:grid-cols-[.9fr_1.1fr] lg:items-start">
            <div>
              <p className="text-[9px] uppercase tracking-cinema text-white/55">Junior upload desk</p>
              <h2 className="mt-5 font-display text-6xl font-black uppercase leading-[0.82] tracking-[-0.02em]">
                Upload
                <br />
                <span className="text-outline italic">preview</span>
              </h2>
              <p className="mt-6 max-w-lg text-sm leading-7 text-white/60">
                Drop photos here to preview how a client gallery will look. This preview stays on this device until real
                cloud storage is connected.
              </p>
            </div>
            <div className="border border-white/20 bg-black/15 p-6">
              <label className="flex min-h-52 cursor-pointer flex-col items-center justify-center border border-dashed border-white/30 bg-black/20 px-6 py-10 text-center transition hover:border-gold">
                <span className="font-display text-3xl font-black uppercase">Choose photos</span>
                <span className="mt-3 text-xs leading-6 text-white/55">JPG or PNG. This is a safe preview uploader.</span>
                <input type="file" accept="image/*" multiple onChange={handleUploadPreview} className="sr-only" />
              </label>
              {uploads.length > 0 && (
                <div className="mt-6 grid gap-3 sm:grid-cols-3">
                  {uploads.map((upload) => (
                    <article key={upload.url} className="overflow-hidden border border-white/15 bg-black/20">
                      <img src={upload.url} alt={upload.name} className="aspect-square w-full object-cover" />
                      <div className="p-3">
                        <p className="truncate text-xs font-semibold">{upload.name}</p>
                        <p className="mt-1 text-[9px] uppercase tracking-cinema text-white/40">{upload.size}</p>
                      </div>
                    </article>
                  ))}
                </div>
              )}
              <div className="mt-6 grid gap-3 text-[9px] uppercase tracking-cinema text-white/60 sm:grid-cols-3">
                <span className="border border-white/15 px-4 py-3">1. Upload photos</span>
                <span className="border border-white/15 px-4 py-3">2. Set prices</span>
                <span className="border border-white/15 px-4 py-3">3. Send private link</span>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="border-t border-white/10 bg-ink px-5 py-10 sm:px-8 lg:px-12">
        <div className="mx-auto flex max-w-[1500px] flex-col gap-4 text-[9px] uppercase tracking-cinema text-white/35 sm:flex-row sm:items-center sm:justify-between">
          <p>Basquin Vision client galleries · Serving {serviceAreas.join(" · ")}</p>
          <div className="flex flex-wrap gap-5">
            {socialLinks.map((social) => (
              <a key={social.label} href={social.href} className="transition hover:text-gold">
                {social.label}
              </a>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
}
