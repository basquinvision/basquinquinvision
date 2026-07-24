import { useEffect } from "react";
import Navbar from "./Navbar";
import BackendNotice from "./BackendNotice";
import { adminMetrics, adminNav, canvasPricing } from "../data/platformDemoData";
import { applySeo } from "../utils/seo";

export default function AdminDashboard() {
  useEffect(() => {
    applySeo({
      title: "Admin Dashboard | Basquin Vision",
      description: "Basquin Vision administrative dashboard foundation for clients, projects, galleries, orders, products, talent, staff, and settings.",
      keywords: ["Basquin Vision admin", "client CRM", "photography backend", "media production platform"],
      path: "/admin",
    });
  }, []);

  return (
    <div className="min-h-screen overflow-x-hidden bg-ink font-body text-bone">
      <Navbar />
      <main className="px-5 pb-20 pt-32 sm:px-8 lg:px-12 lg:pt-36">
        <section className="mx-auto max-w-[1500px]">
          <div className="grid gap-8 lg:grid-cols-[320px_1fr]">
            <aside className="h-fit border border-white/15 bg-white/[.04] p-5 lg:sticky lg:top-24">
              <p className="text-[9px] uppercase tracking-cinema text-gold">Admin Control</p>
              <h1 className="mt-3 font-display text-4xl font-black uppercase leading-none">Command Desk</h1>
              <p className="mt-4 text-xs leading-6 text-white/50">
                This is the management side for Basquin Vision clients, projects, galleries, products, talent, and staff.
              </p>
              <nav className="mt-7 grid max-h-[60vh] gap-2 overflow-y-auto pr-1">
                {adminNav.map((item) => (
                  <a key={item} href={`#${item.toLowerCase()}`} className="border border-white/10 px-4 py-3 text-[9px] font-bold uppercase tracking-[0.18em] text-white/65 transition hover:border-gold hover:text-gold">
                    {item}
                  </a>
                ))}
              </nav>
            </aside>

            <div>
              <div className="border border-white/15 bg-white/[.04] p-6">
                <p className="text-[9px] uppercase tracking-cinema text-gold">Basquin Vision platform</p>
                <h2 className="mt-3 font-display text-6xl font-black uppercase leading-none">
                  Backend
                  <br />
                  <span className="text-outline italic">foundation.</span>
                </h2>
                <p className="mt-5 max-w-3xl text-sm leading-7 text-white/55">
                  Admins get advanced controls. Clients get a simple experience. The database is designed to grow into
                  media delivery, CRM, storefront, invoices, talent profiles, and production collaboration.
                </p>
              </div>

              <div className="mt-6">
                <BackendNotice />
              </div>

              <section id="dashboard" className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                {adminMetrics.map((metric) => (
                  <article key={metric.label} className="border border-white/15 bg-white/[.03] p-5">
                    <p className="text-[9px] uppercase tracking-cinema text-white/45">{metric.label}</p>
                    <p className="mt-4 font-display text-5xl font-black uppercase leading-none text-gold">{metric.value}</p>
                    <p className="mt-3 text-xs leading-6 text-white/45">{metric.note}</p>
                  </article>
                ))}
              </section>

              <section id="products" className="mt-8 grid gap-6 lg:grid-cols-[1fr_420px]">
                <div className="border border-white/15 bg-white/[.03] p-6">
                  <p className="text-[9px] uppercase tracking-cinema text-gold">Phase 1 controls</p>
                  <h3 className="mt-3 font-display text-4xl font-black uppercase">What admin will manage</h3>
                  <div className="mt-6 grid gap-3 sm:grid-cols-2">
                    {["Clients + CRM", "Projects + statuses", "Gallery permissions", "Media metadata", "Orders + invoices", "Talent + collaborators", "Email preferences", "Business settings"].map((item) => (
                      <div key={item} className="border border-white/10 bg-black/20 p-4 text-xs uppercase tracking-[0.16em] text-white/60">
                        {item}
                      </div>
                    ))}
                  </div>
                </div>
                <div className="border border-gold/25 bg-gold/10 p-6">
                  <p className="text-[9px] uppercase tracking-cinema text-gold">Canvas pricing table</p>
                  <h3 className="mt-3 font-display text-3xl font-black uppercase">Database stored</h3>
                  <div className="mt-5 grid gap-2">
                    {canvasPricing.map(([size, price]) => (
                      <div key={size} className="flex items-center justify-between border-b border-white/10 py-2 text-sm">
                        <span>{size}</span>
                        <span className="font-bold text-gold">{price}</span>
                      </div>
                    ))}
                  </div>
                  <p className="mt-5 text-xs leading-6 text-white/55">
                    Supplier cost, retail price, sale price, markup, and gross margin are calculated in the database view.
                  </p>
                </div>
              </section>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
