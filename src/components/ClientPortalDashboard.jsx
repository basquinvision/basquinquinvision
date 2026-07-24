import { useEffect } from "react";
import Navbar from "./Navbar";
import BackendNotice from "./BackendNotice";
import { ArrowIcon } from "./Icons";
import { clearSession, getSessionUser } from "../lib/authClient";
import { portalNav, demoProjects } from "../data/platformDemoData";
import { applySeo } from "../utils/seo";

export default function ClientPortalDashboard() {
  const user = getSessionUser();

  useEffect(() => {
    applySeo({
      title: "Client Portal | Basquin Vision",
      description: "Basquin Vision client dashboard for projects, galleries, favorites, downloads, orders, invoices, and messages.",
      keywords: ["Basquin Vision client portal", "private gallery dashboard", "South Florida photographer client login"],
      path: "/portal",
    });
  }, []);

  function handleLogout() {
    clearSession();
    window.location.href = "/#/login";
  }

  return (
    <div className="min-h-screen overflow-x-hidden bg-ink font-body text-bone">
      <Navbar />
      <main className="px-5 pb-20 pt-32 sm:px-8 lg:px-12 lg:pt-36">
        <section className="mx-auto max-w-[1500px]">
          <div className="grid gap-8 lg:grid-cols-[320px_1fr]">
            <aside className="h-fit border border-white/15 bg-white/[.04] p-5 lg:sticky lg:top-24">
              <p className="text-[9px] uppercase tracking-cinema text-gold">Basquin Vision</p>
              <h1 className="mt-3 font-display text-4xl font-black uppercase leading-none">Client Portal</h1>
              <p className="mt-4 text-xs leading-6 text-white/50">
                {user?.email ? `Signed in as ${user.email}` : "Preview mode until backend keys are connected."}
              </p>
              <nav className="mt-7 grid gap-2">
                {portalNav.map((item) => (
                  <a key={item} href={`#${item.toLowerCase().replaceAll(" ", "-")}`} className="border border-white/10 px-4 py-3 text-[9px] font-bold uppercase tracking-[0.18em] text-white/65 transition hover:border-gold hover:text-gold">
                    {item}
                  </a>
                ))}
                <button onClick={handleLogout} className="border border-crimson/40 px-4 py-3 text-left text-[9px] font-bold uppercase tracking-[0.18em] text-crimson transition hover:bg-crimson hover:text-white">
                  Logout
                </button>
              </nav>
            </aside>

            <div>
              <div className="grid gap-6 border border-white/15 bg-white/[.04] p-6 md:grid-cols-[1fr_auto] md:items-end">
                <div>
                  <p className="text-[9px] uppercase tracking-cinema text-gold">Home</p>
                  <h2 className="mt-3 font-display text-6xl font-black uppercase leading-none">
                    Your media,
                    <br />
                    <span className="text-outline italic">simple.</span>
                  </h2>
                  <p className="mt-5 max-w-2xl text-sm leading-7 text-white/55">
                    Projects, galleries, videos, favorites, downloads, orders, invoices, and messages will live here.
                    The customer side stays clean; the heavy controls stay in admin.
                  </p>
                </div>
                <a href="/#/galleries" className="inline-flex items-center justify-center gap-4 bg-crimson px-6 py-4 text-[10px] font-bold uppercase tracking-[0.2em] text-white transition hover:bg-gold hover:text-ink">
                  View galleries <ArrowIcon />
                </a>
              </div>

              <div className="mt-6">
                <BackendNotice />
              </div>

              <section id="my-projects" className="mt-8">
                <div className="mb-4 flex items-end justify-between gap-4">
                  <div>
                    <p className="text-[9px] uppercase tracking-cinema text-white/40">My Projects</p>
                    <h3 className="font-display text-4xl font-black uppercase">Active work</h3>
                  </div>
                  <p className="text-[9px] uppercase tracking-cinema text-white/35">Demo data</p>
                </div>
                <div className="grid gap-4 md:grid-cols-3">
                  {demoProjects.map((project) => (
                    <article key={project.name} className="overflow-hidden border border-white/15 bg-white/[.03]">
                      <img src={project.image} alt={project.name} className="aspect-[4/3] w-full object-cover" />
                      <div className="p-5">
                        <p className="text-[9px] uppercase tracking-cinema text-gold">{project.type}</p>
                        <h4 className="mt-3 font-display text-3xl font-black uppercase leading-none">{project.name}</h4>
                        <p className="mt-3 text-xs leading-6 text-white/55">{project.clientStatus}</p>
                        <div className="mt-5 flex items-center justify-between border-t border-white/10 pt-4 text-[9px] uppercase tracking-[0.18em] text-white/40">
                          <span>{project.status}</span>
                          <span>{project.due}</span>
                        </div>
                      </div>
                    </article>
                  ))}
                </div>
              </section>

              <section className="mt-8 grid gap-4 md:grid-cols-4">
                {["Favorites", "Downloads", "Orders", "Invoices"].map((item) => (
                  <div key={item} className="border border-white/15 bg-white/[.03] p-5">
                    <p className="text-[9px] uppercase tracking-cinema text-gold">{item}</p>
                    <p className="mt-4 text-sm leading-6 text-white/55">Ready for database-backed records in Phase 1.</p>
                  </div>
                ))}
              </section>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
