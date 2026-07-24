import { useEffect, useState } from "react";
import { CloseIcon } from "./Icons";

const links = [
  ["Vision", "#vision"],
  ["Media", "#media"],
  ["Services", "#services"],
  ["Work", "#work"],
  ["Galleries", "/#/galleries"],
  ["Portal", "/#/portal"],
  ["Login", "/#/login"],
  ["Weddings", "/#/weddings"],
  ["Packages", "#packages"],
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
    <header
      className={`fixed inset-x-0 top-0 z-40 border-b transition-colors duration-300 ${
        scrolled ? "border-white/10 bg-ink/90 backdrop-blur-xl" : "border-white/15 bg-transparent"
      }`}
    >
      <div className={`mx-auto flex max-w-[1500px] items-center justify-between px-5 transition-all duration-300 sm:px-8 lg:px-12 ${scrolled ? "h-16" : "h-20"}`}>
        <a href="#top" className="font-display text-2xl font-black uppercase tracking-[-0.02em]">
          Basquin <span className="text-crimson">Vision</span>
        </a>
        <nav className="hidden items-center gap-7 text-[10px] font-semibold uppercase tracking-[0.2em] md:flex">
          {links.map(([label, href]) => (
            <a key={href} href={href} className="transition hover:text-gold">
              {label}
            </a>
          ))}
        </nav>
        <a
          href="#contact"
          className="hidden bg-crimson px-6 py-3 text-[9px] font-bold uppercase tracking-[0.2em] text-white transition hover:bg-gold hover:text-ink md:block"
        >
          Book a shoot
        </a>
        <button
          className="flex h-10 w-10 flex-col items-center justify-center gap-1.5 border border-white/30 md:hidden"
          onClick={() => setOpen(true)}
          aria-label="Open menu"
          aria-expanded={open}
        >
          <span className="w-5 border-t border-white" />
          <span className="w-5 border-t border-white" />
        </button>
      </div>
    </header>

    {/* Overlay lives outside <header> — backdrop-blur there would trap this fixed element. */}
    {open && (
        <div className="fixed inset-0 z-50 flex flex-col overflow-y-auto bg-ink px-6 py-6">
          <div className="flex items-center justify-between">
            <span className="font-display text-xl font-black uppercase">
              Basquin <span className="text-crimson">Vision</span>
            </span>
            <button
              className="flex h-10 w-10 items-center justify-center border border-white/30"
              onClick={() => setOpen(false)}
              aria-label="Close menu"
            >
              <CloseIcon className="h-6 w-6" />
            </button>
          </div>
          <nav className="my-auto flex flex-col gap-4 py-10 font-display text-4xl font-black uppercase">
            {links.map(([label, href], index) => (
              <a key={href} href={href} onClick={() => setOpen(false)} className="flex items-baseline gap-4 transition hover:text-gold">
                <span className="text-[10px] tracking-cinema text-white/30">0{index + 1}</span>
                {label}
              </a>
            ))}
          </nav>
          <a
            href="#contact"
            onClick={() => setOpen(false)}
            className="flex items-center justify-center bg-crimson px-7 py-5 text-[11px] font-bold uppercase tracking-[0.2em] text-white"
          >
            Book a shoot
          </a>
      </div>
    )}
    </>
  );
}
