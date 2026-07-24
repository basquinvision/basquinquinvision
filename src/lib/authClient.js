import { getSiteRedirect, isBackendConfigured, platformConfig } from "./platformConfig";

const SESSION_KEY = "basquin_vision_auth_session";

function authHeaders() {
  return {
    apikey: platformConfig.supabaseAnonKey,
    "Content-Type": "application/json",
  };
}

async function authRequest(path, body) {
  if (!isBackendConfigured()) {
    throw new Error("Backend is not connected yet. Add Supabase URL and anon key in Vercel.");
  }

  const response = await fetch(`${platformConfig.supabaseUrl}/auth/v1${path}`, {
    method: "POST",
    headers: authHeaders(),
    body: JSON.stringify(body),
  });
  const payload = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new Error(payload.error_description || payload.msg || payload.message || "Authentication failed.");
  }

  return payload;
}

export function getStoredSession() {
  try {
    return JSON.parse(window.localStorage.getItem(SESSION_KEY) || "null");
  } catch {
    return null;
  }
}

export function storeSession(session) {
  window.localStorage.setItem(SESSION_KEY, JSON.stringify(session));
}

export function clearSession() {
  window.localStorage.removeItem(SESSION_KEY);
}

export async function signUpWithEmail({ email, password, firstName, lastName, phone }) {
  const payload = await authRequest("/signup", {
    email,
    password,
    data: {
      first_name: firstName,
      last_name: lastName,
      phone,
      account_type: "client",
      source: "basquin_vision_site",
    },
    options: {
      emailRedirectTo: getSiteRedirect("/#/portal"),
    },
  });

  if (payload.access_token) {
    storeSession(payload);
  }

  return payload;
}

export async function signInWithEmail({ email, password }) {
  const payload = await authRequest("/token?grant_type=password", { email, password });
  storeSession(payload);
  return payload;
}

export async function sendPasswordReset(email) {
  return authRequest("/recover", {
    email,
    redirect_to: getSiteRedirect("/#/login"),
  });
}

export function startSocialLogin(provider) {
  if (!isBackendConfigured()) {
    throw new Error("Backend is not connected yet. Add Supabase URL and anon key in Vercel.");
  }

  const redirectTo = encodeURIComponent(getSiteRedirect("/#/portal"));
  window.location.href = `${platformConfig.supabaseUrl}/auth/v1/authorize?provider=${provider}&redirect_to=${redirectTo}`;
}

export function getSessionUser(session = getStoredSession()) {
  return session?.user || null;
}
