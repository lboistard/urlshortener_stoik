const API_BASE = import.meta.env.VITE_BACKEND_URL || "localhost:3000";

const buildShortUrl = (slug: string) => {
  return `${API_BASE}/${slug}`;
}

const isValidUrl = (value: string)=> {
  const v = value.trim();
  if (!v) return false;
  try {
    const u = new URL(v.startsWith("http") ? v : `https://${v}`);
    if (!["http:", "https:"].includes(u.protocol)) return false;
    const host = u.hostname;
    return host === "localhost" || host.includes(".");
  } catch {
    return false;
  }
}

const normalizeUrl = (value: string) => {
  const trimmed = value.trim();
  return trimmed;
}

export {
  buildShortUrl,
  isValidUrl,
  normalizeUrl
}
