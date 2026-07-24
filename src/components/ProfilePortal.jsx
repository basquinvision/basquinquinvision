import { useEffect, useState } from "react";
import Navbar from "./Navbar";
import { ArrowIcon } from "./Icons";
import { brand, serviceAreas, socialLinks } from "../data/filmData";
import { applySeo } from "../utils/seo";
import { getActiveProfile, loginProfile, logoutProfile, saveProfile } from "../utils/profileStore";

const inputClasses =
  "mt-2 w-full border border-white/15 bg-white/[.04] px-4 py-3 text-white outline-none placeholder:text-white/30 focus:border-gold";

const interests = [
  "Event photos",
  "Portraits",
  "Wedding photo + video",
  "Music videos",
  "Promo videos",
  "Prints / canvases",
  "Client galleries",
];

function buildProfileEmail(profile) {
  const subject = `New Basquin Vision profile — ${profile.name}`;
  const body = [
    "New client profile / email list signup:",
    "",
    `Name: ${profile.name}`,
    `Email: ${profile.email}`,
    `Phone: ${profile.phone || "—"}`,
    `City: ${profile.city || "—"}`,
    `Interested in: ${profile.interests.join(", ") || "—"}`,
    `Email list: ${profile.emailList ? "Yes" : "No"}`,
    "",
    "Notes:",
    profile.notes || "—",
  ].join("\n");

  return `mailto:${brand.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

export default function ProfilePortal() {
  const [profile, setProfile] = useState(null);
  const [loginEmail, setLoginEmail] = useState("");
  const [savedMessage, setSavedMessage] = useState("");
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    city: "South Florida",
    interests: ["Client galleries"],
    emailList: true,
    notes: "",
  });

  useEffect(() => {
    applySeo({
      title: "Client Profile | Basquin Vision",
      description:
        "Create a Basquin Vision client profile, join the email list, and save interest details for galleries, events, weddings, and media services.",
      keywords: ["Basquin Vision profile", "Basquin Vision email list", "client gallery login", "South Florida photographer profile"],
      path: "/profile",
      image: "/images/flip-it-hero.png",
    });
    const active = getActiveProfile();
    if (active) {
      setProfile(active);
      setForm({
        name: active.name || "",
        email: active.email || "",
        phone: active.phone || "",
        city: active.city || "South Florida",
        interests: active.interests || ["Client galleries"],
        emailList: active.emailList ?? true,
        notes: active.notes || "",
      });
    }
  }, []);

  function updateField(field, value) {
    setForm((current) => ({ ...current, [field]: value }));
  }

  function toggleInterest(interest) {
    setForm((current) => {
      const exists = current.interests.includes(interest);
      return {
        ...current,
        interests: exists
          ? current.interests.filter((item) => item !== interest)
          : [...current.interests, interest],
      };
    });
  }

  function handleSave(event) {
    event.preventDefault();
    const saved = saveProfile(form);
    setProfile(saved);
    setSavedMessage("Profile saved on this device. Use the email button to send Junior your info.");
  }

  function handleLogin(event) {
    event.preventDefault();
    const existing = loginProfile(loginEmail);
    if (existing) {
      setProfile(existing);
      setForm({
        name: existing.name || "",
        email: existing.email || "",
        phone: existing.phone || "",
        city: existing.city || "South Florida",
        interests: existing.interests || ["Client galleries"],
        emailList: existing.emailList ?? true,
        notes: existing.notes || "",
      });
      setSavedMessage("Logged in on this device.");
    } else {
      setSavedMessage("No saved profile found on this device. Create one below.");
    }
  }

  function handleLogout() {
    logoutProfile();
    setProfile(null);
    setSavedMessage("Logged out on this device.");
  }

  return (
    <div className="min-h-screen overflow-x-hidden bg-ink font-body text-bone">
      <Navbar />
      <main>
        <section className="relative overflow-hidden px-5 pb-20 pt-32 sm:px-8 lg:px-12 lg:pb-28 lg:pt-40">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_25%_20%,rgba(188,48,40,.25),transparent_30%),radial-gradient(circle_at_80%_10%,rgba(184,154,97,.14),transparent_28%)]" />
          <div className="relative mx-auto grid max-w-[1500px] gap-10 lg:grid-cols-[1fr_.95fr] lg:items-end">
            <div>
              <p className="text-[9px] uppercase tracking-cinema text-gold">Client login / email list / profile</p>
              <h1 className="mt-6 font-display text-6xl font-black uppercase leading-[0.82] tracking-[-0.03em] sm:text-8xl lg:text-[10rem]">
                Client
                <br />
                <span className="text-outline italic">Profile</span>
              </h1>
            </div>
            <div className="border border-white/15 bg-white/[.04] p-6">
              <p className="font-display text-3xl font-bold uppercase leading-tight">
                Sign up for gallery updates, event drops, offers, and client delivery info.
              </p>
              <p className="mt-5 text-sm leading-7 text-white/55">
                This first version saves the profile on the person’s device and can email the details to you. Real secure
                accounts need a database/auth backend next.
              </p>
              <form onSubmit={handleLogin} className="mt-7 grid gap-3 sm:grid-cols-[1fr_auto]">
                <label>
                  <span className="text-[8px] uppercase tracking-cinema text-white/55">Log in with email</span>
                  <input
                    value={loginEmail}
                    onChange={(event) => setLoginEmail(event.target.value)}
                    type="email"
                    placeholder="client@email.com"
                    className={inputClasses}
                  />
                </label>
                <button className="self-end bg-crimson px-7 py-4 text-[10px] font-bold uppercase tracking-[0.2em] text-white transition hover:bg-gold hover:text-ink">
                  Log in
                </button>
              </form>
              {profile && (
                <button onClick={handleLogout} className="mt-4 text-xs uppercase tracking-[0.2em] text-gold hover:text-white">
                  Log out {profile.email}
                </button>
              )}
            </div>
          </div>
        </section>

        <section className="bg-bone px-5 py-20 text-ink sm:px-8 lg:px-12 lg:py-28">
          <form onSubmit={handleSave} className="mx-auto grid max-w-[1350px] gap-8 lg:grid-cols-[.85fr_1.15fr]">
            <div>
              <p className="text-[9px] uppercase tracking-cinema text-blood/70">Create / update profile</p>
              <h2 className="mt-5 font-display text-6xl font-black uppercase leading-[0.85] tracking-[-0.02em]">
                Join the
                <br />
                <span className="italic text-transparent [-webkit-text-stroke:1px_#8d1f1b]">email list</span>
              </h2>
              <p className="mt-6 max-w-lg text-sm leading-7 text-ink/65">
                Clients can save their info, choose what they care about, and send the profile to Basquin Vision for
                updates, galleries, bookings, and promos.
              </p>
              {savedMessage && <p className="mt-6 border border-ink/15 bg-white p-4 text-sm text-ink/70">{savedMessage}</p>}
            </div>

            <div className="border border-ink/15 bg-white p-6">
              <div className="grid gap-5 sm:grid-cols-2">
                <label>
                  <span className="text-[8px] uppercase tracking-cinema text-ink/55">Name *</span>
                  <input required value={form.name} onChange={(event) => updateField("name", event.target.value)} className="mt-2 w-full border border-ink/15 px-4 py-3 text-ink outline-none focus:border-blood" />
                </label>
                <label>
                  <span className="text-[8px] uppercase tracking-cinema text-ink/55">Email *</span>
                  <input required type="email" value={form.email} onChange={(event) => updateField("email", event.target.value)} className="mt-2 w-full border border-ink/15 px-4 py-3 text-ink outline-none focus:border-blood" />
                </label>
                <label>
                  <span className="text-[8px] uppercase tracking-cinema text-ink/55">Phone</span>
                  <input value={form.phone} onChange={(event) => updateField("phone", event.target.value)} className="mt-2 w-full border border-ink/15 px-4 py-3 text-ink outline-none focus:border-blood" />
                </label>
                <label>
                  <span className="text-[8px] uppercase tracking-cinema text-ink/55">City</span>
                  <input value={form.city} onChange={(event) => updateField("city", event.target.value)} className="mt-2 w-full border border-ink/15 px-4 py-3 text-ink outline-none focus:border-blood" />
                </label>
              </div>

              <div className="mt-6">
                <p className="text-[8px] uppercase tracking-cinema text-ink/55">Interested in</p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {interests.map((interest) => (
                    <button
                      key={interest}
                      type="button"
                      onClick={() => toggleInterest(interest)}
                      className={`border px-4 py-2 text-[9px] font-bold uppercase tracking-[0.16em] transition ${
                        form.interests.includes(interest)
                          ? "border-blood bg-blood text-white"
                          : "border-ink/15 text-ink/60 hover:border-blood"
                      }`}
                    >
                      {interest}
                    </button>
                  ))}
                </div>
              </div>

              <label className="mt-6 flex items-start gap-3 text-sm leading-6 text-ink/65">
                <input
                  type="checkbox"
                  checked={form.emailList}
                  onChange={(event) => updateField("emailList", event.target.checked)}
                  className="mt-1"
                />
                Add me to the Basquin Vision email list for galleries, booking dates, promos, and client updates.
              </label>

              <label className="mt-6 block">
                <span className="text-[8px] uppercase tracking-cinema text-ink/55">Notes</span>
                <textarea
                  value={form.notes}
                  onChange={(event) => updateField("notes", event.target.value)}
                  rows="4"
                  placeholder="Tell Junior what you want to book or what updates you want."
                  className="mt-2 w-full resize-none border border-ink/15 px-4 py-3 text-ink outline-none focus:border-blood"
                />
              </label>

              <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                <button className="inline-flex items-center justify-center gap-4 bg-ink px-7 py-4 text-[10px] font-bold uppercase tracking-[0.2em] text-white transition hover:bg-crimson">
                  Save profile <ArrowIcon />
                </button>
                <a
                  href={buildProfileEmail(form)}
                  className="inline-flex items-center justify-center gap-4 border border-ink/20 px-7 py-4 text-[10px] font-bold uppercase tracking-[0.2em] text-ink transition hover:border-blood hover:text-blood"
                >
                  Email profile to Junior
                </a>
              </div>
            </div>
          </form>
        </section>
      </main>
      <footer className="border-t border-white/10 bg-ink px-5 py-10 sm:px-8 lg:px-12">
        <div className="mx-auto flex max-w-[1500px] flex-col gap-4 text-[9px] uppercase tracking-cinema text-white/35 sm:flex-row sm:items-center sm:justify-between">
          <p>Basquin Vision profiles · Serving {serviceAreas.join(" · ")}</p>
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
