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
  const [uploadTitle, setUploadTitle] = useState("New Client Gallery");
  const [clientName, setClientName] = useState("");
  const [clientEmail, setClientEmail] = useState("");
  const [realGalleryUrl, setRealGalleryUrl] = useState("");
  const [digitalPrice, setDigitalPrice] = useState("$25");
  const [galleryPrice, setGalleryPrice] = useState("$199");
  const [privateCode, setPrivateCode] = useState("BASQUIN");
  const [statusMessage, setStatusMessage] = useState("");

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
    if (previews.length > 0) {
      setStatusMessage(`${previews.length} photo${previews.length === 1 ? "" : "s"} added to the preview.`);
    }
  }

  const privateGalleryLink = `${window.location.origin}/#/galleries?code=${encodeURIComponent(privateCode || "BASQUIN")}`;

  function handleSetPricing() {
    setStatusMessage(`Prices set: ${digitalPrice} per download / ${galleryPrice} full gallery.`);
  }

  function buildClientMessage() {
    return [
      `Hey${clientName.trim() ? ` ${clientName.trim()}` : ""}, your Basquin Vision gallery is ready.`,
      "",
      `Gallery: ${uploadTitle || "Client Gallery"}`,
      `Photo link: ${realGalleryUrl.trim()}`,
      "",
      "Ordering options:",
      `Single digital download: ${digitalPrice}`,
      `Full gallery download: ${galleryPrice}`,
      "",
      "Reply with the photo names/numbers you want, or tell me if you want prints, canvases, or the full gallery.",
      "",
      "— Junior Basquin / Basquin Vision",
    ].join("\n");
  }

  async function handleCopyClientMessage() {
    if (!realGalleryUrl.trim()) {
      setStatusMessage("Add a real Dropbox, Google Drive, Pixieset, or online gallery link first. The preview photos only live on this device.");
      return;
    }
    const text = buildClientMessage();
    try {
      await navigator.clipboard.writeText(text);
      setStatusMessage("Client message copied. Paste it into a text or email.");
    } catch {
      setStatusMessage("Client message is ready below. Copy it manually if your browser blocks clipboard access.");
    }
  }

  function buildPrivateLinkEmail() {
    const subject = `Your Basquin Vision gallery — ${uploadTitle || "Client Gallery"}`;
    const body = buildClientMessage();
    const to = clientEmail.trim();
    return `mailto:${to}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  }

  function handleEmailRealGallery(event) {
    if (!realGalleryUrl.trim()) {
      event.preventDefault();
      setStatusMessage("Upload the photos somewhere online first, paste that real gallery link, then send it to the client.");
      return;
    }
    setStatusMessage("Opening email with the real gallery link. Hit send in your email app.");
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
                This page is ready for proofing and ordering. For today, send clients a real hosted gallery link from
                Dropbox, Google Drive, Pixieset, or another gallery service. Full in-site uploads and card payments can be
                connected next.
              </p>
              <a
                href="/#/profile"
                className="mt-6 inline-flex items-center gap-4 border border-white/25 px-6 py-3 text-[10px] font-bold uppercase tracking-[0.2em] transition hover:border-gold hover:text-gold"
              >
                Create client profile <ArrowIcon />
              </a>
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
                Drop photos here to preview the look, then paste the real online gallery link you want the client to open.
                Preview photos stay on this device — they do not get sent or uploaded yet.
              </p>
              <div className="mt-8 border border-white/15 bg-black/20 p-5 text-xs leading-6 text-white/65">
                <p className="font-display text-2xl font-black uppercase text-white">Send a real gallery today</p>
                <ol className="mt-4 list-decimal space-y-2 pl-5">
                  <li>Upload the photos to Dropbox, Google Drive, Pixieset, or ShootProof.</li>
                  <li>Copy the share link and paste it into “Real gallery link.”</li>
                  <li>Click “Email real gallery link” or “Copy client message.”</li>
                </ol>
              </div>
            </div>
            <div className="border border-white/20 bg-black/15 p-6">
              <div className="mb-5 border border-gold/30 bg-gold/10 p-4 text-xs leading-6 text-white/75">
                <p className="font-semibold text-gold">Important:</p>
                <p>
                  The photo chooser below is only a local preview. Clients cannot see those files unless you upload them to
                  a real online folder and paste that link here.
                </p>
              </div>
              <div className="mb-5 grid gap-4 sm:grid-cols-2">
                <label>
                  <span className="text-[8px] uppercase tracking-cinema text-white/55">Gallery title</span>
                  <input
                    value={uploadTitle}
                    onChange={(event) => setUploadTitle(event.target.value)}
                    className={inputClasses}
                  />
                </label>
                <label>
                  <span className="text-[8px] uppercase tracking-cinema text-white/55">Client name</span>
                  <input
                    value={clientName}
                    onChange={(event) => setClientName(event.target.value)}
                    placeholder="Client name"
                    className={inputClasses}
                  />
                </label>
                <label>
                  <span className="text-[8px] uppercase tracking-cinema text-white/55">Client email</span>
                  <input
                    value={clientEmail}
                    onChange={(event) => setClientEmail(event.target.value)}
                    placeholder="client@email.com"
                    className={inputClasses}
                  />
                </label>
                <label className="sm:col-span-2">
                  <span className="text-[8px] uppercase tracking-cinema text-white/55">Real gallery link</span>
                  <input
                    value={realGalleryUrl}
                    onChange={(event) => setRealGalleryUrl(event.target.value)}
                    placeholder="Paste Dropbox, Google Drive, Pixieset, or ShootProof link here"
                    className={inputClasses}
                  />
                </label>
                <label>
                  <span className="text-[8px] uppercase tracking-cinema text-white/55">Download price</span>
                  <input
                    value={digitalPrice}
                    onChange={(event) => setDigitalPrice(event.target.value)}
                    className={inputClasses}
                  />
                </label>
                <label>
                  <span className="text-[8px] uppercase tracking-cinema text-white/55">Full gallery price</span>
                  <input
                    value={galleryPrice}
                    onChange={(event) => setGalleryPrice(event.target.value)}
                    className={inputClasses}
                  />
                </label>
                <label className="sm:col-span-2">
                  <span className="text-[8px] uppercase tracking-cinema text-white/55">Private access code</span>
                  <input
                    value={privateCode}
                    onChange={(event) => setPrivateCode(event.target.value.toUpperCase())}
                    className={inputClasses}
                  />
                </label>
              </div>
              <label className="flex min-h-52 cursor-pointer flex-col items-center justify-center border border-dashed border-white/30 bg-black/20 px-6 py-10 text-center transition hover:border-gold">
                <span className="font-display text-3xl font-black uppercase">Choose photos</span>
                <span className="mt-3 text-xs leading-6 text-white/55">
                  JPG or PNG preview only. These photos are not uploaded to the internet.
                </span>
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
              <div className="mt-6 grid gap-3 text-[9px] uppercase tracking-cinema text-white/80 sm:grid-cols-3">
                <button
                  type="button"
                  onClick={handleSetPricing}
                  className="border border-white/15 px-4 py-3 text-left transition hover:border-gold hover:text-gold"
                >
                  1. Set prices
                </button>
                <button
                  type="button"
                  onClick={handleCopyClientMessage}
                  className="border border-white/15 px-4 py-3 text-left transition hover:border-gold hover:text-gold"
                >
                  2. Copy client message
                </button>
                <a
                  href={buildPrivateLinkEmail()}
                  onClick={handleEmailRealGallery}
                  className="border border-white/15 px-4 py-3 transition hover:border-gold hover:text-gold"
                >
                  3. Email real gallery link
                </a>
              </div>
              <div className="mt-5 border border-white/15 bg-black/20 p-4 text-xs leading-6 text-white/60">
                <p className="font-semibold text-white">What the client will receive:</p>
                {realGalleryUrl.trim() ? (
                  <p className="break-all text-gold">{realGalleryUrl}</p>
                ) : (
                  <p className="text-gold/90">Paste a real online gallery link before sending.</p>
                )}
                <p className="mt-3 text-white/45">Future in-site access page: {privateGalleryLink}</p>
                <p className="text-white/45">Access code placeholder: {privateCode || "BASQUIN"}</p>
                {statusMessage && <p className="mt-3 text-white/80">{statusMessage}</p>}
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
