const STORAGE_KEY = "basquin_vision_inquiries";

export function saveInquiry(type, fields) {
  const inquiry = {
    id: `inq_${Date.now()}`,
    type,
    status: "new",
    createdAt: new Date().toISOString(),
    ...fields,
  };

  try {
    const existing = JSON.parse(window.localStorage.getItem(STORAGE_KEY) || "[]");
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify([inquiry, ...existing]));
  } catch {
    // Local storage is only a launch/testing data bank. Production should use the backend schema.
  }

  return inquiry;
}

export function getSavedInquiries() {
  try {
    return JSON.parse(window.localStorage.getItem(STORAGE_KEY) || "[]");
  } catch {
    return [];
  }
}
