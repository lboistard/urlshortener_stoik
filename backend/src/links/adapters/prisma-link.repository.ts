import { Injectable } from "@nestjs/common";
import { PrismaService } from "../../prisma/prisma.service";
import { LinkRepositoryPort } from "../ports/link-repository.port";
import type { Link } from "../../../generated/prisma/client";

@Injectable()
export class PrismaLinkRepository implements LinkRepositoryPort {
  constructor(private readonly prisma: PrismaService) {}

  async create(input: {
    userId?: string;
    slug: string;
    targetUrl: string;
  }): Promise<Link> {
    const row = await this.prisma.link.create({
      data: {
        slug: input.slug,
        targetUrl: input.targetUrl,
        userId: input.userId ?? null,
      },
    });

    return {
      id: row.id,
      slug: row.slug,
      targetUrl: row.targetUrl,
      createdAt: row.createdAt,
      userId: row.userId ?? null,
      clickCount: 0,
    };
  }
}
