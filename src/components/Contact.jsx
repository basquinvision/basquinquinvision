import { useState } from "react";
import { ArrowIcon } from "./Icons";
import { budgetRanges, projectTypes } from "../data/filmData";
import { saveInquiry } from "../utils/inquiryStore";

const inputClasses =
  "mt-2 w-full border-0 border-b border-white/45 bg-transparent px-0 py-3 text-white outline-none placeholder:text-white/30 focus:border-white";

export default function Contact({ email, socials, responseNote }) {
  const [sent, setSent] = useState(false);

  // Opens the visitor's mail app with the inquiry pre-filled, so the form
  // works with no backend. Swap for Formspree/Netlify/your API later.
  function handleSubmit(event) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    saveInquiry("main_booking", {
      name: data.get("name"),
      email: data.get("email"),
      phone: data.get("phone"),
      projectType: data.get("projectType"),
      budget: data.get("budget"),
      deadline: data.get("deadline"),
      message: data.get("message"),
      sourcePage: "main",
    });
    const subject = `Booking inquiry — ${data.get("projectType") || "Media project"} (${data.get("name")})`;
    const body = [
      `Name: ${data.get("name")}`,
      `Email: ${data.get("email")}`,
      `Phone: ${data.get("phone") || "—"}`,
      `Project type: ${data.get("projectType")}`,
      `Budget: ${data.get("budget") || "—"}`,
      `Deadline: ${data.get("deadline") || "—"}`,
      "",
      "Message:",
      data.get("message"),
    ].join("\n");
    window.location.href = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    setSent(true);
  }

  return (
    <section id="contact" className="bg-blood px-5 py-20 sm:px-8 lg:px-12 lg:py-32">
      <div className="mx-auto max-w-[1350px]">
        <p className="text-center text-[9px] uppercase tracking-cinema text-white/60">
          Book photos / video / events
        </p>
        <h2 className="mt-8 text-center font-display text-6xl font-black uppercase leading-[0.8] tracking-[-0.02em] sm:text-9xl lg:text-[10rem]">
          Ready to book?<br /><span className="text-outline italic">send the details</span>
        </h2>
        <div className="mt-16 grid gap-14 border-t border-white/30 pt-12 lg:mt-20 lg:grid-cols-[.8fr_1.4fr] lg:gap-16">
          <div>
            <p className="max-w-md font-display text-3xl font-bold uppercase leading-tight">
              Tell us what you need, the date, the location, and which package you want.
            </p>
            <p className="mt-5 max-w-md text-sm leading-7 text-white/55">
              Based in South Florida and available for Miami, Fort Lauderdale, Palm Beach, the Florida Keys, and travel projects.
            </p>
            <a href={`mailto:${email}`} className="mt-8 inline-block border-b border-white pb-2 text-sm transition hover:border-gold hover:text-gold">
              {email}
            </a>
            {responseNote && (
              <p className="mt-6 flex w-fit items-center gap-2.5 text-[9px] uppercase tracking-cinema text-white/60">
                <span className="h-2 w-2 shrink-0 rounded-full bg-gold" />
                {responseNote}
              </p>
            )}
            <div className="mt-12 flex flex-wrap gap-6 text-[9px] uppercase tracking-cinema">
              {socials.map((social) => (
                <a key={social.label} href={social.href} className="transition hover:text-gold">
                  {social.label}
                </a>
              ))}
            </div>
          </div>
          <form onSubmit={handleSubmit} className="grid gap-7 sm:grid-cols-2">
            <label>
              <span className="text-[8px] uppercase tracking-cinema text-white/60">Name *</span>
              <input required name="name" type="text" autoComplete="name" className={inputClasses} />
            </label>
            <label>
              <span className="text-[8px] uppercase tracking-cinema text-white/60">Email *</span>
              <input required name="email" type="email" autoComplete="email" className={inputClasses} />
            </label>
            <label>
              <span className="text-[8px] uppercase tracking-cinema text-white/60">Phone</span>
              <input name="phone" type="tel" autoComplete="tel" className={inputClasses} />
            </label>
            <label>
              <span className="text-[8px] uppercase tracking-cinema text-white/60">Project type *</span>
              <select required name="projectType" defaultValue="" className={`${inputClasses} cursor-pointer`}>
                <option value="" disabled>
                  Select a project type
                </option>
                {projectTypes.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
            </label>
            <label>
              <span className="text-[8px] uppercase tracking-cinema text-white/60">Budget range</span>
              <select name="budget" defaultValue="" className={`${inputClasses} cursor-pointer`}>
                <option value="" disabled>
                  Select a range
                </option>
                {budgetRanges.map((range) => (
                  <option key={range} value={range}>
                    {range}
                  </option>
                ))}
              </select>
            </label>
            <label>
              <span className="text-[8px] uppercase tracking-cinema text-white/60">Deadline</span>
              <input name="deadline" type="text" placeholder="Date / rush / flexible" className={inputClasses} />
            </label>
            <label className="sm:col-span-2">
              <span className="text-[8px] uppercase tracking-cinema text-white/60">Message *</span>
              <textarea
                required
                name="message"
                rows="4"
                placeholder="Tell me what you want to shoot, where, and what you need delivered."
                className={`${inputClasses} resize-none`}
              />
            </label>
            <div className="flex flex-col items-start gap-4 sm:col-span-2 sm:flex-row sm:items-center">
              <button className="flex items-center gap-5 bg-bone px-8 py-4 text-[10px] font-bold uppercase tracking-[0.2em] text-ink transition hover:-translate-y-1 hover:bg-gold">
                Send inquiry <ArrowIcon />
              </button>
              {sent && (
                <p className="text-xs text-white/70">
                  Your email app should open with everything filled in — hit send and we’ll take it from there.
                </p>
              )}
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
