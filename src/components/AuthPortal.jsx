import { useEffect, useState } from "react";
import Navbar from "./Navbar";
import { ArrowIcon } from "./Icons";
import BackendNotice from "./BackendNotice";
import { applySeo } from "../utils/seo";
import { sendPasswordReset, signInWithEmail, signUpWithEmail, startSocialLogin } from "../lib/authClient";
import { isBackendConfigured } from "../lib/platformConfig";

const inputClasses =
  "mt-2 w-full border border-white/15 bg-white/[.04] px-4 py-3 text-white outline-none placeholder:text-white/30 focus:border-gold";

export default function AuthPortal({ mode = "login" }) {
  const isSignup = mode === "signup";
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    password: "",
  });

  useEffect(() => {
    applySeo({
      title: `${isSignup ? "Create Account" : "Login"} | Basquin Vision`,
      description: "Basquin Vision secure client portal login for projects, galleries, downloads, orders, invoices, and messages.",
      keywords: ["Basquin Vision login", "client portal", "South Florida photography client gallery"],
      path: isSignup ? "/signup" : "/login",
    });
  }, [isSignup]);

  function update(field, value) {
    setForm((current) => ({ ...current, [field]: value }));
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setLoading(true);
    setStatus("");

    try {
      if (isSignup) {
        await signUpWithEmail(form);
        setStatus("Account started. Check your email to verify your Basquin Vision login.");
      } else {
        await signInWithEmail(form);
        window.location.href = "/#/portal";
      }
    } catch (error) {
      setStatus(error.message);
    } finally {
      setLoading(false);
    }
  }

  async function handlePasswordReset() {
    if (!form.email) {
      setStatus("Enter your email first, then click reset password.");
      return;
    }

    try {
      await sendPasswordReset(form.email);
      setStatus("Password reset email sent.");
    } catch (error) {
      setStatus(error.message);
    }
  }

  function handleSocial(provider) {
    try {
      startSocialLogin(provider);
    } catch (error) {
      setStatus(error.message);
    }
  }

  return (
    <div className="min-h-screen overflow-x-hidden bg-ink font-body text-bone">
      <Navbar />
      <main className="px-5 pb-20 pt-32 sm:px-8 lg:px-12 lg:pt-40">
        <section className="mx-auto grid max-w-[1350px] gap-8 lg:grid-cols-[.95fr_1.05fr] lg:items-start">
          <div>
            <p className="text-[9px] uppercase tracking-cinema text-gold">Secure client portal</p>
            <h1 className="mt-6 font-display text-6xl font-black uppercase leading-[0.84] tracking-[-0.03em] sm:text-8xl">
              {isSignup ? "Create" : "Client"}
              <br />
              <span className="text-outline italic">{isSignup ? "Account" : "Login"}</span>
            </h1>
            <p className="mt-6 max-w-xl text-sm leading-7 text-white/55">
              Basquin Vision accounts are built to grow from simple client delivery into projects, galleries, downloads,
              orders, invoices, messages, and future talent profiles.
            </p>
            <div className="mt-8">
              <BackendNotice />
            </div>
          </div>

          <form onSubmit={handleSubmit} className="border border-white/15 bg-white/[.04] p-6">
            <div className="grid gap-4 sm:grid-cols-2">
              {isSignup && (
                <>
                  <label>
                    <span className="text-[8px] uppercase tracking-cinema text-white/55">First name</span>
                    <input value={form.firstName} onChange={(event) => update("firstName", event.target.value)} className={inputClasses} />
                  </label>
                  <label>
                    <span className="text-[8px] uppercase tracking-cinema text-white/55">Last name</span>
                    <input value={form.lastName} onChange={(event) => update("lastName", event.target.value)} className={inputClasses} />
                  </label>
                  <label className="sm:col-span-2">
                    <span className="text-[8px] uppercase tracking-cinema text-white/55">Phone</span>
                    <input value={form.phone} onChange={(event) => update("phone", event.target.value)} className={inputClasses} />
                  </label>
                </>
              )}
              <label className="sm:col-span-2">
                <span className="text-[8px] uppercase tracking-cinema text-white/55">Email</span>
                <input
                  required
                  type="email"
                  value={form.email}
                  onChange={(event) => update("email", event.target.value)}
                  placeholder="client@email.com"
                  className={inputClasses}
                />
              </label>
              <label className="sm:col-span-2">
                <span className="text-[8px] uppercase tracking-cinema text-white/55">Password</span>
                <input
                  required
                  type="password"
                  minLength="8"
                  value={form.password}
                  onChange={(event) => update("password", event.target.value)}
                  placeholder="Minimum 8 characters"
                  className={inputClasses}
                />
              </label>
            </div>

            <button
              disabled={loading || !isBackendConfigured()}
              className="mt-6 flex w-full items-center justify-center gap-4 bg-crimson px-6 py-4 text-[10px] font-bold uppercase tracking-[0.2em] text-white transition hover:bg-gold hover:text-ink disabled:cursor-not-allowed disabled:opacity-50"
            >
              {loading ? "Working..." : isSignup ? "Create account" : "Log in"} <ArrowIcon />
            </button>

            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              <button
                type="button"
                onClick={() => handleSocial("google")}
                disabled={!isBackendConfigured()}
                className="border border-white/15 px-4 py-3 text-[9px] font-bold uppercase tracking-[0.18em] transition hover:border-gold hover:text-gold disabled:opacity-50"
              >
                Google
              </button>
              <button
                type="button"
                onClick={() => handleSocial("facebook")}
                disabled={!isBackendConfigured()}
                className="border border-white/15 px-4 py-3 text-[9px] font-bold uppercase tracking-[0.18em] transition hover:border-gold hover:text-gold disabled:opacity-50"
              >
                Facebook
              </button>
            </div>

            {!isSignup && (
              <button type="button" onClick={handlePasswordReset} className="mt-4 text-xs uppercase tracking-[0.18em] text-gold hover:text-white">
                Reset password
              </button>
            )}

            <p className="mt-6 text-xs leading-6 text-white/45">
              {isSignup ? "Already have an account?" : "Need an account?"}{" "}
              <a href={isSignup ? "/#/login" : "/#/signup"} className="text-gold hover:text-white">
                {isSignup ? "Log in" : "Create one"}
              </a>
            </p>

            {status && <p className="mt-5 border border-white/15 bg-black/20 p-4 text-sm leading-6 text-white/75">{status}</p>}
          </form>
        </section>
      </main>
    </div>
  );
}
