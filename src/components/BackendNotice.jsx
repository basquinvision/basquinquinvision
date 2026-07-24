import { isBackendConfigured } from "../lib/platformConfig";

export default function BackendNotice() {
  if (isBackendConfigured()) return null;

  return (
    <div className="border border-gold/35 bg-gold/10 p-4 text-xs leading-6 text-white/75">
      <p className="font-bold uppercase tracking-[0.18em] text-gold">Backend setup needed</p>
      <p className="mt-2">
        The portal screens are built. Add your Supabase URL and public anon key in Vercel to turn on real accounts,
        profiles, projects, and admin data.
      </p>
    </div>
  );
}
