import { createHash, randomBytes } from "node:crypto";

const SLUG_LENGTH = 8;

export const Link = {
  create: (url: string) => {
    const slug = createHash("sha256")
      .update(url.trim().toLowerCase())
      .digest("base64url")
      .slice(0, SLUG_LENGTH);

    return { slug, targetUrl: url.trim() };
  },

  // Generates a new slug -> this is to avoid collision
  createRandomSlug: (): string => {
    return randomBytes(6).toString("base64url").slice(0, SLUG_LENGTH);
  },
};
