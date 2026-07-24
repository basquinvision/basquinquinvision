const PROFILE_KEY = "basquin_vision_client_profiles";
const ACTIVE_KEY = "basquin_vision_active_profile";

export function getProfiles() {
  try {
    return JSON.parse(window.localStorage.getItem(PROFILE_KEY) || "[]");
  } catch {
    return [];
  }
}

export function getActiveProfile() {
  try {
    return JSON.parse(window.localStorage.getItem(ACTIVE_KEY) || "null");
  } catch {
    return null;
  }
}

export function saveProfile(profile) {
  const profiles = getProfiles();
  const existingIndex = profiles.findIndex((item) => item.email.toLowerCase() === profile.email.toLowerCase());
  const savedProfile = {
    ...profile,
    id: profile.id || `client_${Date.now()}`,
    updatedAt: new Date().toISOString(),
  };

  if (existingIndex >= 0) {
    profiles[existingIndex] = { ...profiles[existingIndex], ...savedProfile };
  } else {
    profiles.unshift({ ...savedProfile, createdAt: new Date().toISOString() });
  }

  window.localStorage.setItem(PROFILE_KEY, JSON.stringify(profiles));
  window.localStorage.setItem(ACTIVE_KEY, JSON.stringify(savedProfile));
  return savedProfile;
}

export function loginProfile(email) {
  const profile = getProfiles().find((item) => item.email.toLowerCase() === email.toLowerCase());
  if (profile) {
    window.localStorage.setItem(ACTIVE_KEY, JSON.stringify(profile));
  }
  return profile || null;
}

export function logoutProfile() {
  window.localStorage.removeItem(ACTIVE_KEY);
}
