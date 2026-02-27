import type { Link, User } from "../../../generated/prisma/client";

export interface LinkRepositoryPort {
  create(input: {
    userId?: string;
    slug: string;
    targetUrl: string;
  }): Promise<Link>;
  findBySlug(slug: string): Promise<Link | null>;
  incrementClickCountBySlug(slug: string): Promise<void>;
  getSlugs(user: User): Promise<Link[] | null>;
}

export const LINK_REPOSITORY = Symbol("LINK_REPOSITORY");
