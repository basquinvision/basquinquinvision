import { useEffect, useState } from "react";
import Navbar from "./Navbar";
import { ArrowIcon } from "./Icons";
import { applySeo } from "../utils/seo";
import { isBackendConfigured } from "../lib/platformConfig";

const setupSteps = [
  {
    title: "Create Supabase project",
    detail: "Make a new Supabase project for Basquin Vision. This becomes the real database, login system, and media storage home.",
    action: "Open Supabase",
    href: "https://supabase.com/dashboard/projects",
  },
  {
    title: "Run database schema",
    detail: "Open SQL Editor in Supabase, paste the Basquin Vision schema, and run it. This creates users/profiles, roles, clients, projects, galleries, products, orders, invoices, and future talent tables.",
    action: "Open schema file",
    href: "https://github.com/basquinvision/basquinquinvision/blob/main/supabase/schema.sql",
  },
  {
    title: "Run storage setup",
    detail: "Run the storage SQL after the main schema. This creates protected buckets for originals, previews, and thumbnails.",
    action: "Open storage file",
    href: "https://github.com/basquinvision/basquinquinvision/blob/main/supabase/storage.sql",
  },
  {
    title: "Copy Supabase API keys",
    detail: "In Supabase Project Settings → API, copy the Project URL and anon public key. Do not copy the service-role key into frontend code.",
    action: "Project settings",
    href: "https://supabase.com/dashboard/projects",
  },
  {
    title: "Add Vercel environment variables",
    detail: "In Vercel, add VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY to the Basquin Vision project, then redeploy.",
    action: "Open Vercel",
    href: "https://vercel.com/basquinvisonfilms-5487s-projects",
  },
  {
    title: "Turn on login providers",
    detail: "In Supabase Auth settings, enable email/password. Then enable Google and Facebook when you have their app credentials.",
    action: "Auth settings",
    href: "https://supabase.com/dashboard/projects",
  },
];

const envExample = `VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-public-anon-key`;

const testLinks = [
  ["Signup", "/#/signup"],
  ["Login", "/#/login"],
  ["Client Portal", "/#/portal"],
  ["Admin Dashboard", "/#/admin"],
  ["Client Galleries", "/#/galleries"],
];

export default function BackendSetupGuide() {
  const [copied, setCopied] = useState("");

  useEffect(() => {
    applySeo({
      title: "Backend Setup | Basquin Vision",
      description: "Basquin Vision backend setup checklist for Supabase database, authentication, storage, and Vercel environment variables.",
      keywords: ["Basquin Vision backend setup", "Supabase setup", "client portal setup", "Vercel environment variables"],
      path: "/setup",
    });
  }, []);

  async function copyEnv() {
    try {
      await navigator.clipboard.writeText(envExample);
      setCopied("Environment variable names copied.");
    } catch {
      setCopied("Copy the environment variable names manually.");
    }
  }

  return (
    <div className="min-h-screen overflow-x-hidden bg-ink font-body text-bone">
      <Navbar />
      <main className="px-5 pb-20 pt-32 sm:px-8 lg:px-12 lg:pt-40">
        <section className="mx-auto max-w-[1500px]">
          <div className="grid gap-8 lg:grid-cols-[.9fr_1.1fr] lg:items-start">
            <div>
              <p className="text-[9px] uppercase tracking-cinema text-gold">Backend activation</p>
              <h1 className="mt-6 font-display text-6xl font-black uppercase leading-[0.82] tracking-[-0.03em] sm:text-8xl">
                Turn on
                <br />
                <span className="text-outline italic">the engine.</span>
              </h1>
              <p className="mt-6 max-w-xl text-sm leading-7 text-white/55">
                The portal, admin dashboard, schema, storage plan, and login screens are already built. This page is the
                clean checklist for connecting Supabase and making accounts/data real.
              </p>
              <div className="mt-8 border border-gold/30 bg-gold/10 p-5 text-sm leading-7 text-white/70">
                <p className="font-bold uppercase tracking-[0.18em] text-gold">
                  Status: {isBackendConfigured() ? "Backend keys detected" : "Waiting on Supabase keys"}
                </p>
                <p className="mt-2">
                  No private keys belong in GitHub. Only the public anon key goes in Vercel as a frontend environment
                  variable. Service-role keys and Stripe secrets stay server-side only.
                </p>
              </div>
            </div>

            <div className="border border-white/15 bg-white/[.04] p-6">
              <p className="text-[9px] uppercase tracking-cinema text-gold">Vercel environment variables</p>
              <pre className="mt-4 overflow-x-auto border border-white/15 bg-black/35 p-4 text-xs leading-6 text-white/70">
                {envExample}
              </pre>
              <button
                type="button"
                onClick={copyEnv}
                className="mt-4 inline-flex items-center gap-4 bg-crimson px-6 py-3 text-[10px] font-bold uppercase tracking-[0.2em] text-white transition hover:bg-gold hover:text-ink"
              >
                Copy env names <ArrowIcon />
              </button>
              {copied && <p className="mt-3 text-xs leading-6 text-gold">{copied}</p>}
              <div className="mt-6 grid gap-3 sm:grid-cols-2">
                {testLinks.map(([label, href]) => (
                  <a key={href} href={href} className="border border-white/15 px-4 py-3 text-[9px] font-bold uppercase tracking-[0.18em] text-white/65 transition hover:border-gold hover:text-gold">
                    Test {label}
                  </a>
                ))}
              </div>
            </div>
          </div>

          <section className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {setupSteps.map((step, index) => (
              <article key={step.title} className="flex min-h-[260px] flex-col justify-between border border-white/15 bg-white/[.03] p-6">
                <div>
                  <p className="text-[9px] uppercase tracking-cinema text-gold">Step {index + 1}</p>
                  <h2 className="mt-4 font-display text-4xl font-black uppercase leading-none">{step.title}</h2>
                  <p className="mt-4 text-sm leading-7 text-white/55">{step.detail}</p>
                </div>
                <a
                  href={step.href}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-6 inline-flex items-center gap-4 border border-white/25 px-5 py-3 text-[9px] font-bold uppercase tracking-[0.18em] transition hover:border-gold hover:text-gold"
                >
                  {step.action} <ArrowIcon />
                </a>
              </article>
            ))}
          </section>

          <section className="mt-10 border border-white/15 bg-white/[.03] p-6">
            <p className="text-[9px] uppercase tracking-cinema text-gold">After setup</p>
            <h2 className="mt-3 font-display text-4xl font-black uppercase">What turns on next</h2>
            <div className="mt-6 grid gap-3 md:grid-cols-4">
              {["Real signup/login", "Client project records", "Admin live metrics", "Protected media storage"].map((item) => (
                <div key={item} className="border border-white/10 bg-black/20 p-4 text-[9px] uppercase tracking-[0.16em] text-white/60">
                  {item}
                </div>
              ))}
            </div>
          </section>
        </section>
      </main>
    </div>
  );
}
