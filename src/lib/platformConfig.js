export const platformConfig = {
  supabaseUrl: import.meta.env.VITE_SUPABASE_URL || "",
  supabaseAnonKey: import.meta.env.VITE_SUPABASE_ANON_KEY || "",
};

export function isBackendConfigured() {
  return Boolean(platformConfig.supabaseUrl && platformConfig.supabaseAnonKey);
}

export function getSiteRedirect(path = "/#/portal") {
  return `${window.location.origin}${path}`;
}
