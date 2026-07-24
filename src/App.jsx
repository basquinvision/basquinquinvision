import { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import BrandIntro from "./components/BrandIntro";
import StatsBar from "./components/StatsBar";
import TrustStrip from "./components/TrustStrip";
import ServiceAreas from "./components/ServiceAreas";
import Services from "./components/Services";
import FeaturedWork from "./components/FeaturedWork";
import WeddingsBanner from "./components/WeddingsBanner";
import BookingPackages from "./components/BookingPackages";
import BookingSteps from "./components/BookingSteps";
import Contact from "./components/Contact";
import WeddingSite from "./components/WeddingSite";
import ClientGalleryPortal from "./components/ClientGalleryPortal";
import { applySeo, mainSeo } from "./utils/seo";
import {
  brand,
  addOns,
  bookingSteps,
  bookingPackages,
  featuredProjects,
  serviceAreas,
  services,
  socialLinks,
  stats,
  trustPoints,
  weddingPromo,
} from "./data/filmData";

const footerLinks = [
  ["Services", "#services"],
  ["Work", "#work"],
  ["Packages", "#packages"],
  ["Client Galleries", "/#/galleries"],
  ["Weddings", "/#/weddings"],
  ["Contact", "#contact"],
];

export default function App() {
  const [routeKey, setRouteKey] = useState(`${window.location.pathname}${window.location.hash}`);
  const isWeddingSite =
    window.location.pathname.startsWith("/weddings") || window.location.hash.startsWith("#/weddings");
  const isGalleryPortal =
    window.location.pathname.startsWith("/galleries") || window.location.hash.startsWith("#/galleries");

  useEffect(() => {
    const updateRoute = () => setRouteKey(`${window.location.pathname}${window.location.hash}`);
    window.addEventListener("hashchange", updateRoute);
    window.addEventListener("popstate", updateRoute);
    return () => {
      window.removeEventListener("hashchange", updateRoute);
      window.removeEventListener("popstate", updateRoute);
    };
  }, []);

  useEffect(() => {
    if (!isWeddingSite) {
      applySeo(mainSeo);
    }
  }, [isWeddingSite, routeKey]);

  if (isWeddingSite) {
    return <WeddingSite />;
  }

  if (isGalleryPortal) {
    return <ClientGalleryPortal />;
  }

  return (
    <div className="min-h-screen overflow-x-hidden bg-ink font-body text-bone">
      <Navbar />
      <main>
        <Hero brand={brand} />
        <StatsBar stats={stats} />
        <TrustStrip points={trustPoints} />
        <BrandIntro brand={brand} />
        <ServiceAreas areas={serviceAreas} />
        <Services services={services} />
        <FeaturedWork projects={featuredProjects} />
        <WeddingsBanner promo={weddingPromo} />
        <BookingPackages packages={bookingPackages} addOns={addOns} />
        <BookingSteps steps={bookingSteps} />
        <Contact email={brand.email} socials={socialLinks} responseNote={brand.responseNote} />
      </main>
      <footer className="border-t border-white/10 bg-ink px-5 py-12 sm:px-8 lg:px-12">
        <div className="mx-auto grid max-w-[1500px] gap-10 md:grid-cols-[1.2fr_.8fr_1fr]">
          <div>
            <p className="font-display text-2xl font-black uppercase tracking-[-0.02em]">
              Basquin <span className="text-crimson">Vision</span>
            </p>
            <p className="mt-4 max-w-sm text-xs leading-6 text-white/45">
              {brand.city} media house — film, photography, music videos, weddings, events, and private media
              delivery by {brand.founder}.
            </p>
            <a href={`mailto:${brand.email}`} className="mt-5 inline-block text-xs text-gold transition hover:text-white">
              {brand.email}
            </a>
          </div>
          <nav className="grid grid-cols-2 content-start gap-x-8 gap-y-3 text-[10px] font-semibold uppercase tracking-[0.2em] text-white/55">
            {footerLinks.map(([label, href]) => (
              <a key={label} href={href} className="transition hover:text-gold">
                {label}
              </a>
            ))}
          </nav>
          <div className="text-[9px] uppercase tracking-cinema text-white/35 md:text-right">
            <p className="leading-6">Serving {serviceAreas.join(" · ")}</p>
            <div className="mt-5 flex flex-wrap gap-5 md:justify-end">
              {socialLinks.map((social) => (
                <a key={social.label} href={social.href} className="transition hover:text-gold">
                  {social.label}
                </a>
              ))}
            </div>
          </div>
        </div>
        <div className="mx-auto mt-10 flex max-w-[1500px] flex-col gap-3 border-t border-white/10 pt-6 text-[9px] uppercase tracking-cinema text-white/35 sm:flex-row sm:items-center sm:justify-between">
          <p>{brand.name} — South Florida media house</p>
          <p>© 2026 All rights reserved</p>
        </div>
      </footer>
    </div>
  );
}
