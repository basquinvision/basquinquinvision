import { useEffect, useState } from "react";
import {
  weddingBrand,
  weddingAddOns,
  weddingAddOnPicks,
  weddingFaqs,
  weddingGallery,
  weddingGuestCounts,
  weddingInquirySteps,
  weddingPackages,
  weddingPackagesNote,
  weddingProcess,
  weddingStats,
  weddingTestimonials,
} from "../data/weddingData";
import { ArrowIcon, CloseIcon, PlayIcon } from "./Icons";
import { applySeo, buildFaqSchema, weddingSeo } from "../utils/seo";
import { saveInquiry } from "../utils/inquiryStore";

const navLinks = [
  ["Work", "#wedding-work"],
  ["Packages", "#wedding-packages"],
  ["Menu", "#wedding-menu"],
  ["Process", "#wedding-process"],
  ["FAQ", "#wedding-faq"],
];

function WeddingNav() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
    <header className="fixed inset-x-0 top-0 z-40 border-b border-white/10 bg-night/70 backdrop-blur-xl">
      <div className="mx-auto flex h-20 max-w-[1500px] items-center justify-between px-5 sm:px-8 lg:px-12">
        <a href="/#/weddings" className="font-display text-xl font-black uppercase tracking-[-0.02em] text-white">
          Basquin <span className="font-serif text-lg font-semibold normal-case italic tracking-normal text-sand">Weddings</span>
        </a>
        <nav className="hidden items-center gap-7 text-[10px] font-semibold uppercase tracking-[0.22em] text-white/70 lg:flex">
          {navLinks.map(([label, href]) => (
            <a key={href} href={href} className="transition hover:text-sand">
              {label}
            </a>
          ))}
          <a href="/" className="text-white/40 transition hover:text-white">
            Main site
          </a>
        </nav>
        <div className="flex items-center gap-3">
          <a
            href="#wedding-contact"
            className="hidden bg-sand px-6 py-3 text-[9px] font-bold uppercase tracking-[0.2em] text-night transition hover:bg-white sm:block"
          >
            Check your date
          </a>
          <button
            className="flex h-10 w-10 flex-col items-center justify-center gap-1.5 border border-white/30 text-white lg:hidden"
            onClick={() => setOpen(true)}
            aria-label="Open menu"
            aria-expanded={open}
          >
            <span className="w-5 border-t border-white" />
            <span className="w-5 border-t border-white" />
          </button>
        </div>
      </div>
    </header>

    {/* Overlay lives outside <header> — backdrop-blur there would trap this fixed element. */}
    {open && (
        <div className="fixed inset-0 z-50 flex flex-col overflow-y-auto bg-night px-6 py-6 text-white">
          <div className="flex items-center justify-between">
            <span className="font-display text-xl font-black uppercase">
              Basquin <span className="font-serif text-lg font-semibold normal-case italic tracking-normal text-sand">Weddings</span>
            </span>
            <button
              className="flex h-10 w-10 items-center justify-center border border-white/30"
              onClick={() => setOpen(false)}
              aria-label="Close menu"
            >
              <CloseIcon className="h-6 w-6" />
            </button>
          </div>
          <nav className="my-auto flex flex-col gap-5 py-10">
            {navLinks.map(([label, href]) => (
              <a key={href} href={href} onClick={() => setOpen(false)} className="font-serif text-4xl font-medium italic transition hover:text-sand">
                {label}
              </a>
            ))}
            <a href="/" onClick={() => setOpen(false)} className="mt-2 text-[10px] font-bold uppercase tracking-cinema text-white/45">
              ← Back to main site
            </a>
          </nav>
          <a
            href="#wedding-contact"
            onClick={() => setOpen(false)}
            className="flex items-center justify-center bg-sand px-7 py-5 text-[11px] font-bold uppercase tracking-[0.2em] text-night"
          >
            Check your date
          </a>
      </div>
    )}
    </>
  );
}

function WeddingHero() {
  return (
    <section className="relative min-h-screen overflow-hidden bg-night">
      <img
        src={weddingBrand.heroImage}
        alt="South Florida couple during golden hour wedding portraits"
        className="absolute inset-0 h-full w-full animate-slow-zoom object-cover object-[65%_center]"
      />
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(16,13,11,.96)_0%,rgba(16,13,11,.73)_42%,rgba(16,13,11,.12)_82%),linear-gradient(0deg,rgba(16,13,11,.88),transparent_55%)]" />
      <div className="relative z-10 mx-auto flex min-h-screen max-w-[1500px] flex-col justify-end px-5 pb-16 pt-28 sm:px-8 lg:px-12 lg:pb-24">
        <p className="flex items-center gap-4 text-[9px] uppercase tracking-cinema text-sand">
          <span className="h-px w-10 bg-sand" />
          {weddingBrand.city} wedding photo + video
        </p>
        <h1 className="mt-6 max-w-5xl font-serif text-6xl font-medium leading-[1.02] tracking-tight text-white sm:text-8xl lg:text-[7.5rem]">
          Love stories
          <br />
          <span className="italic text-sand">shot like cinema</span>
        </h1>
        <div className="mt-9 grid gap-8 border-t border-white/20 pt-8 lg:grid-cols-[1fr_auto] lg:items-end">
          <div>
            <p className="max-w-2xl text-lg leading-8 text-white/80 sm:text-xl">{weddingBrand.tagline}</p>
            <p className="mt-4 max-w-xl text-sm leading-7 text-white/50">
              Premium wedding photography, highlight films, ceremony coverage, detail shots, reception energy, and
              private client galleries.
            </p>
          </div>
          <div className="flex flex-col gap-4 lg:items-end">
            <p className="inline-flex items-center gap-2.5 text-[9px] uppercase tracking-cinema text-white/65">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-sand opacity-60" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-sand" />
              </span>
              {weddingBrand.availability}
            </p>
            <div className="flex w-full flex-col gap-3 sm:flex-row">
              <a
                href="#wedding-contact"
                className="flex items-center justify-center gap-4 bg-sand px-8 py-4 text-[10px] font-bold uppercase tracking-[0.2em] text-night transition hover:-translate-y-1 hover:bg-white"
              >
                Check your date <ArrowIcon />
              </a>
              <a
                href="#wedding-work"
                className="flex items-center justify-center gap-3 border border-white/40 px-8 py-4 text-[10px] font-bold uppercase tracking-[0.2em] text-white transition hover:-translate-y-1 hover:border-sand hover:text-sand"
              >
                <PlayIcon /> View work
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function WeddingStats() {
  return (
    <section className="border-b border-night/10 bg-champagne px-5 py-6 text-night sm:px-8 lg:px-12">
      <div className="mx-auto grid max-w-[1500px] grid-cols-2 gap-3 lg:grid-cols-4">
        {weddingStats.map((stat) => (
          <div key={stat.label} className="flex min-h-[110px] flex-col justify-center border border-night/10 bg-white/70 px-5 py-5">
            <p className="font-serif text-2xl font-semibold leading-tight sm:text-3xl">{stat.value}</p>
            <p className="mt-2 text-[9px] uppercase tracking-cinema text-night/45">{stat.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

function WeddingWork() {
  return (
    <section id="wedding-work" className="bg-ivory px-5 py-20 text-night sm:px-8 lg:px-12 lg:py-32">
      <div className="mx-auto max-w-[1350px]">
        <div className="mb-14 grid gap-8 lg:grid-cols-[.75fr_1.25fr] lg:items-end">
          <p className="text-[9px] uppercase tracking-cinema text-night/45">01 / Wedding portfolio</p>
          <h2 className="font-serif text-5xl font-medium leading-[1.02] tracking-tight sm:text-7xl lg:text-right">
            Elegant,
            <span className="italic text-bronze"> emotional frames</span>
          </h2>
        </div>
        <div className="grid gap-5 lg:grid-cols-3">
          {weddingGallery.map((item, index) => (
            <article key={item.title} className={`group overflow-hidden bg-white shadow-2xl shadow-black/5 ${index === 0 ? "lg:col-span-2" : ""}`}>
              <div className={`overflow-hidden ${index === 0 ? "aspect-[16/9]" : "aspect-[4/5]"}`}>
                <img
                  src={item.src}
                  alt={item.title}
                  loading="lazy"
                  className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                />
              </div>
              <div className="flex items-end justify-between gap-4 p-6">
                <div>
                  <p className="text-[9px] uppercase tracking-cinema text-bronze">{item.type}</p>
                  <h3 className="mt-3 font-serif text-3xl font-semibold leading-tight">{item.title}</h3>
                </div>
              </div>
            </article>
          ))}
        </div>
        <div className="mt-10 flex justify-center">
          <a
            href="#wedding-contact"
            className="inline-flex items-center gap-4 border border-night/25 px-8 py-4 text-[10px] font-bold uppercase tracking-[0.2em] text-night transition hover:border-night hover:bg-night hover:text-white"
          >
            Love this style? Check your date <ArrowIcon />
          </a>
        </div>
      </div>
    </section>
  );
}

function WeddingPackages() {
  return (
    <section id="wedding-packages" className="bg-night px-5 py-20 text-white sm:px-8 lg:px-12 lg:py-32">
      <div className="mx-auto max-w-[1350px]">
        <p className="text-[9px] uppercase tracking-cinema text-sand">02 / Wedding packages</p>
        <h2 className="mt-6 max-w-4xl font-serif text-5xl font-medium leading-[1.05] tracking-tight sm:text-7xl">
          Coverage for <span className="italic text-sand">the whole story.</span>
        </h2>
        <div className="mt-14 grid gap-5 lg:grid-cols-3">
          {weddingPackages.map((pack, index) => {
            const featured = index === 1;
            return (
              <article
                key={pack.title}
                className={`relative flex min-h-[470px] flex-col justify-between border p-7 ${
                  featured ? "border-sand bg-sand text-night shadow-2xl shadow-sand/20" : "border-white/15 bg-white/[.04]"
                }`}
              >
                {pack.badge && (
                  <span className="absolute -top-3 left-7 bg-night px-3 py-1.5 text-[9px] font-bold uppercase tracking-cinema text-sand">
                    {pack.badge}
                  </span>
                )}
                <div>
                  <p className={`text-[9px] uppercase tracking-cinema ${featured ? "text-night/60" : "text-sand"}`}>{pack.bestFor}</p>
                  <h3 className="mt-6 font-serif text-4xl font-semibold leading-tight">{pack.title}</h3>
                  <p className="mt-3 font-display text-4xl font-black uppercase">{pack.price}</p>
                  <ul className={`mt-8 grid gap-3 text-sm leading-6 ${featured ? "text-night/75" : "text-white/60"}`}>
                    {pack.includes.map((item) => (
                      <li key={item} className="flex gap-3">
                        <span className={featured ? "text-night/50" : "text-sand"}>✦</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
                <a
                  href="#wedding-contact"
                  className={`mt-10 flex items-center justify-center gap-4 px-6 py-4 text-[10px] font-bold uppercase tracking-[0.2em] transition ${
                    featured
                      ? "bg-night text-white hover:bg-white hover:text-night"
                      : "border border-white/30 text-white hover:border-sand hover:bg-sand hover:text-night"
                  }`}
                >
                  Check my date <ArrowIcon />
                </a>
              </article>
            );
          })}
        </div>
        <p className="mt-8 text-center text-xs leading-6 text-white/45">{weddingPackagesNote}</p>
      </div>
    </section>
  );
}

function WeddingServicesMenu() {
  return (
    <section id="wedding-menu" className="bg-ivory px-5 py-20 text-night sm:px-8 lg:px-12 lg:py-32">
      <div className="mx-auto max-w-[1350px]">
        <div className="grid gap-10 lg:grid-cols-[.85fr_1.15fr] lg:items-end">
          <div>
            <p className="text-[9px] uppercase tracking-cinema text-bronze">03 / Product & service menu</p>
            <h2 className="mt-6 font-serif text-5xl font-medium leading-[1.02] tracking-tight sm:text-7xl">
              Build your
              <br />
              <span className="italic text-bronze">wedding collection</span>
            </h2>
          </div>
          <p className="max-w-xl text-sm leading-7 text-night/60 lg:ml-auto">
            Add physical products, extra coverage, faster delivery, social clips, albums, prints, canvases, and
            private galleries to any wedding package.
          </p>
        </div>

        <div className="mt-14 grid gap-5 lg:grid-cols-2">
          {weddingAddOns.map((group, groupIndex) => {
            const featured = groupIndex === 0;
            return (
              <article
                key={group.category}
                className={`border p-6 sm:p-7 ${featured ? "border-bronze bg-night text-white lg:row-span-2" : "border-night/10 bg-white"}`}
              >
                <div className={`flex items-start justify-between gap-5 border-b pb-5 ${featured ? "border-white/15" : "border-night/10"}`}>
                  <div>
                    <p className={`text-[9px] uppercase tracking-cinema ${featured ? "text-sand" : "text-bronze"}`}>Menu 0{groupIndex + 1}</p>
                    <h3 className="mt-3 font-serif text-3xl font-semibold leading-tight">{group.category}</h3>
                  </div>
                  <span className={`rounded-full border px-3 py-2 text-[9px] uppercase tracking-cinema ${featured ? "border-white/20 text-white/45" : "border-night/15 text-night/40"}`}>
                    Add-on
                  </span>
                </div>
                <div className="mt-6 grid gap-5">
                  {group.items.map((item) => (
                    <div key={item.name} className={`grid gap-2 border-b pb-5 last:border-b-0 last:pb-0 sm:grid-cols-[1fr_auto] sm:items-start ${featured ? "border-white/10" : "border-night/10"}`}>
                      <div>
                        <h4 className="font-serif text-xl font-semibold leading-tight">{item.name}</h4>
                        <p className={`mt-2 text-sm leading-6 ${featured ? "text-white/55" : "text-night/55"}`}>{item.note}</p>
                      </div>
                      <p className={`font-display text-xl font-black uppercase ${featured ? "text-sand" : "text-bronze"}`}>{item.price}</p>
                    </div>
                  ))}
                </div>
              </article>
            );
          })}
        </div>

        <div className="mt-10 flex flex-col gap-5 border border-night/10 bg-white p-6 sm:p-7 lg:flex-row lg:items-center lg:justify-between">
          <p className="max-w-2xl font-serif text-2xl font-semibold leading-snug">
            Want something custom? Ask for a bundle with canvases, albums, social clips, and full video delivery.
          </p>
          <a
            href="#wedding-contact"
            className="inline-flex items-center justify-center gap-4 bg-night px-8 py-4 text-[10px] font-bold uppercase tracking-[0.2em] text-white transition hover:bg-bronze"
          >
            Build my bundle <ArrowIcon />
          </a>
        </div>
      </div>
    </section>
  );
}

function WeddingTestimonials() {
  return (
    <section className="bg-champagne px-5 py-20 text-night sm:px-8 lg:px-12 lg:py-28">
      <div className="mx-auto max-w-[1350px]">
        <p className="text-center text-[9px] uppercase tracking-cinema text-bronze">04 / Love notes</p>
        <div className="mt-12 grid gap-10 lg:grid-cols-2 lg:gap-14">
          {weddingTestimonials.map((item) => (
            <blockquote key={item.quote} className="border-l-2 border-bronze/60 pl-6 sm:pl-8">
              <p className="font-serif text-2xl font-medium italic leading-snug sm:text-3xl">“{item.quote}”</p>
              <footer className="mt-5 text-[9px] uppercase tracking-cinema text-night/45">— {item.name}</footer>
            </blockquote>
          ))}
        </div>
      </div>
    </section>
  );
}

function WeddingProcess() {
  return (
    <section id="wedding-process" className="bg-ivory px-5 py-20 text-night sm:px-8 lg:px-12 lg:py-28">
      <div className="mx-auto max-w-[1350px]">
        <p className="text-[9px] uppercase tracking-cinema text-night/45">05 / How it works</p>
        <h2 className="mt-6 font-serif text-5xl font-medium leading-[1.02] tracking-tight sm:text-6xl">
          Simple from <span className="italic text-bronze">hello to heirloom</span>
        </h2>
        <div className="mt-12 border-t border-night/15">
          {weddingProcess.map((step, index) => (
            <div key={step.title} className="grid gap-3 border-b border-night/15 py-7 sm:grid-cols-[70px_1fr_1.2fr] sm:items-baseline sm:gap-6">
              <span className="font-display text-2xl font-black text-bronze/60">0{index + 1}</span>
              <h3 className="font-serif text-3xl font-semibold leading-tight">{step.title}</h3>
              <p className="text-sm leading-7 text-night/55">{step.note}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function WeddingFaq() {
  return (
    <section id="wedding-faq" className="bg-champagne px-5 py-20 text-night sm:px-8 lg:px-12 lg:py-28">
      <div className="mx-auto max-w-[900px]">
        <p className="text-center text-[9px] uppercase tracking-cinema text-bronze">06 / Questions couples ask</p>
        <h2 className="mt-6 text-center font-serif text-5xl font-medium leading-[1.02] tracking-tight sm:text-6xl">
          Before you <span className="italic text-bronze">book</span>
        </h2>
        <div className="mt-12 grid gap-3">
          {weddingFaqs.map((faq) => (
            <details key={faq.question} className="group border border-night/10 bg-white/80 px-6 py-5 open:bg-white">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-6 font-serif text-xl font-semibold leading-snug [&::-webkit-details-marker]:hidden">
                {faq.question}
                <span className="text-2xl font-light text-bronze transition duration-300 group-open:rotate-45">+</span>
              </summary>
              <p className="mt-4 max-w-2xl text-sm leading-7 text-night/60">{faq.answer}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

function WeddingContact() {
  const [sent, setSent] = useState(false);

  const inputClasses =
    "mt-2 w-full border-0 border-b border-white/35 bg-transparent px-0 py-3 text-white outline-none placeholder:text-white/25 focus:border-sand";

  // Opens the couple's mail app with the inquiry pre-filled, so the form
  // works with no backend. Swap for Formspree/Netlify/your API later.
  function handleSubmit(event) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const addOns = data.getAll("addons");
    saveInquiry("wedding", {
      name: data.get("name"),
      email: data.get("email"),
      phone: data.get("phone"),
      eventDate: data.get("date"),
      venueOrCity: data.get("venue"),
      guestCount: data.get("guests"),
      packageInterest: data.get("package"),
      addons: addOns,
      message: data.get("message"),
      sourcePage: "weddings",
    });
    const subject = `Wedding inquiry — ${data.get("date") || "date TBD"} (${data.get("name")})`;
    const body = [
      `Name: ${data.get("name")}`,
      `Email: ${data.get("email")}`,
      `Phone: ${data.get("phone") || "—"}`,
      `Wedding date: ${data.get("date") || "—"}`,
      `Venue / city: ${data.get("venue") || "—"}`,
      `Guest count: ${data.get("guests") || "—"}`,
      `Package interest: ${data.get("package") || "—"}`,
      `Add-ons: ${addOns.length ? addOns.join(", ") : "—"}`,
      "",
      "The vibe:",
      data.get("message"),
    ].join("\n");
    window.location.href = `mailto:${weddingBrand.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    setSent(true);
  }

  return (
    <section id="wedding-contact" className="bg-night px-5 py-20 text-white sm:px-8 lg:px-12 lg:py-32">
      <div className="mx-auto max-w-[1350px]">
        <p className="text-center text-[9px] uppercase tracking-cinema text-sand">Wedding inquiry</p>
        <h2 className="mt-7 text-center font-serif text-6xl font-medium leading-[1.0] tracking-tight sm:text-8xl">
          Save <span className="italic text-sand">your date</span>
        </h2>
        <p className="mx-auto mt-6 max-w-xl text-center text-sm leading-7 text-white/55">
          Tell us about your day — we’ll confirm availability and put together coverage that fits.
        </p>
        <div className="mt-14 grid gap-12 border-t border-white/15 pt-12 lg:grid-cols-[.75fr_1.25fr] lg:gap-16">
          <div>
            <p className="font-serif text-3xl font-medium leading-snug">
              Send the date, location, guest count, and the kind of coverage you want.
            </p>
            <div className="mt-8 grid gap-3 text-sm">
              <a href={`mailto:${weddingBrand.email}`} className="inline-block w-fit border-b border-sand pb-1 text-sand transition hover:text-white">
                {weddingBrand.email}
              </a>
              <a href={`tel:${weddingBrand.phone.replace(/[^+\d]/g, "")}`} className="w-fit text-white/55 transition hover:text-sand">
                {weddingBrand.phone}
              </a>
            </div>
            <div className="mt-10 grid gap-4">
              {weddingInquirySteps.map((step, index) => (
                <p key={step} className="flex items-start gap-4 text-sm leading-6 text-white/60">
                  <span className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full border border-sand/40 text-[10px] font-bold text-sand">
                    {index + 1}
                  </span>
                  {step}
                </p>
              ))}
            </div>
            <p className="mt-10 border-l border-sand/50 pl-5 text-xs italic leading-6 text-white/40">
              “{weddingTestimonials[0].quote}”
            </p>
          </div>
          <form onSubmit={handleSubmit} className="grid gap-7 sm:grid-cols-2">
            <label>
              <span className="text-[8px] uppercase tracking-cinema text-white/55">Name *</span>
              <input required name="name" type="text" autoComplete="name" className={inputClasses} />
            </label>
            <label>
              <span className="text-[8px] uppercase tracking-cinema text-white/55">Email *</span>
              <input required name="email" type="email" autoComplete="email" className={inputClasses} />
            </label>
            <label>
              <span className="text-[8px] uppercase tracking-cinema text-white/55">Phone</span>
              <input name="phone" type="tel" autoComplete="tel" className={inputClasses} />
            </label>
            <label>
              <span className="text-[8px] uppercase tracking-cinema text-white/55">Wedding date *</span>
              <input required name="date" type="date" className={`${inputClasses} [color-scheme:dark]`} />
            </label>
            <label>
              <span className="text-[8px] uppercase tracking-cinema text-white/55">Venue / city</span>
              <input name="venue" type="text" placeholder="Venue name, Miami, the Keys..." className={inputClasses} />
            </label>
            <label>
              <span className="text-[8px] uppercase tracking-cinema text-white/55">Guest count</span>
              <select name="guests" defaultValue="" className={`${inputClasses} cursor-pointer`}>
                <option value="" disabled>
                  Select a range
                </option>
                {weddingGuestCounts.map((count) => (
                  <option key={count} value={count}>
                    {count}
                  </option>
                ))}
              </select>
            </label>
            <label className="sm:col-span-2">
              <span className="text-[8px] uppercase tracking-cinema text-white/55">Package interest</span>
              <select name="package" defaultValue="" className={`${inputClasses} cursor-pointer`}>
                <option value="" disabled>
                  Select a package
                </option>
                {weddingPackages.map((pack) => (
                  <option key={pack.title} value={`${pack.title} (${pack.price})`}>
                    {pack.title} — {pack.price}
                  </option>
                ))}
                <option value="Not sure yet">Not sure yet — help me choose</option>
              </select>
            </label>
            <fieldset className="sm:col-span-2">
              <legend className="text-[8px] uppercase tracking-cinema text-white/55">Add-ons you want</legend>
              <div className="mt-3 flex flex-wrap gap-2.5">
                {weddingAddOnPicks.map((pick) => (
                  <label key={pick} className="cursor-pointer">
                    <input type="checkbox" name="addons" value={pick} className="peer sr-only" />
                    <span className="inline-block border border-white/25 px-4 py-2.5 text-[10px] uppercase tracking-[0.14em] text-white/60 transition peer-checked:border-sand peer-checked:bg-sand peer-checked:font-bold peer-checked:text-night peer-focus-visible:outline peer-focus-visible:outline-2 peer-focus-visible:outline-sand">
                      {pick}
                    </span>
                  </label>
                ))}
              </div>
            </fieldset>
            <label className="sm:col-span-2">
              <span className="text-[8px] uppercase tracking-cinema text-white/55">Tell us the vibe *</span>
              <textarea
                required
                name="message"
                rows="4"
                placeholder="Elegant, beach, church, reception party, destination, intimate..."
                className={`${inputClasses} resize-none`}
              />
            </label>
            <div className="flex flex-col items-start gap-4 sm:col-span-2 sm:flex-row sm:items-center">
              <button className="flex items-center gap-5 bg-sand px-8 py-4 text-[10px] font-bold uppercase tracking-[0.2em] text-night transition hover:-translate-y-1 hover:bg-white">
                Send wedding inquiry <ArrowIcon />
              </button>
              {sent && (
                <p className="text-xs text-white/70">
                  Your email app should open with everything filled in — hit send and we’ll reply with availability.
                </p>
              )}
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}

// Slim mobile-only booking bar that appears after scrolling past the hero.
function StickyDateCta() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > window.innerHeight * 0.8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (!visible) return null;

  return (
    <div className="fixed inset-x-0 bottom-0 z-30 border-t border-sand/30 bg-night/95 p-3 backdrop-blur-lg sm:hidden">
      <a
        href="#wedding-contact"
        className="flex items-center justify-center gap-4 bg-sand px-6 py-4 text-[10px] font-bold uppercase tracking-[0.2em] text-night"
      >
        Check your date <ArrowIcon />
      </a>
    </div>
  );
}

export default function WeddingSite() {
  useEffect(() => {
    applySeo({ ...weddingSeo, faqSchema: buildFaqSchema(weddingFaqs) });
    if (window.location.hash.includes("#wedding-contact")) {
      window.setTimeout(() => document.getElementById("wedding-contact")?.scrollIntoView(), 50);
    }
  }, []);

  return (
    <div className="min-h-screen overflow-x-hidden bg-night font-body">
      <WeddingNav />
      <WeddingHero />
      <WeddingStats />
      <WeddingWork />
      <WeddingPackages />
      <WeddingServicesMenu />
      <WeddingTestimonials />
      <WeddingProcess />
      <WeddingFaq />
      <WeddingContact />
      <StickyDateCta />
      <footer className="border-t border-white/10 bg-night px-5 py-8 pb-24 text-[9px] uppercase tracking-cinema text-white/35 sm:px-8 sm:pb-8 lg:px-12">
        <div className="mx-auto flex max-w-[1500px] flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <p>
            {weddingBrand.name} — {weddingBrand.city}
          </p>
          <div className="flex flex-wrap gap-5">
            <a href="#wedding-packages" className="transition hover:text-sand">
              Packages
            </a>
            <a href="#wedding-contact" className="transition hover:text-sand">
              Check your date
            </a>
            <a href="/" className="transition hover:text-sand">
              Back to Basquin Vision
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
