import { createHash } from "node:crypto";

const SLUG_LENGTH = 8;

export interface LinkData {
  slug: string;
  targetUrl: string;
}

export const Link = {
  create(url: string): LinkData {
    const slug = createHash("sha256")
      .update(url.trim().toLowerCase())
      .digest("base64url")
      .slice(0, SLUG_LENGTH);

    return { slug, targetUrl: url.trim() };
  },
};
