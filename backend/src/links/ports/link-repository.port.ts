import type { Link } from "../../../generated/prisma/client";

export interface LinkRepositoryPort {
  create(input: {
    userId?: string;
    slug: string;
    targetUrl: string;
  }): Promise<Link>;
}

export const LINK_REPOSITORY = Symbol("LINK_REPOSITORY");
