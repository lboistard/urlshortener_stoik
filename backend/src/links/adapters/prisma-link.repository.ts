import { Injectable } from "@nestjs/common";
import { PrismaService } from "../../prisma/prisma.service";
import { LinkRepositoryPort } from "../ports/link-repository.port";
import type { User } from "../../../generated/prisma/client";

@Injectable()
export class PrismaLinkRepository implements LinkRepositoryPort {
  constructor(private readonly prisma: PrismaService) {}

  async create(input: { userId?: string; slug: string; targetUrl: string }) {
    const newLink = await this.prisma.link.create({
      data: {
        slug: input.slug,
        targetUrl: input.targetUrl,
        userId: input.userId ?? null,
      },
    });

    return {
      id: newLink.id,
      slug: newLink.slug,
      targetUrl: newLink.targetUrl,
      createdAt: newLink.createdAt,
      userId: newLink.userId ?? null,
      clickCount: 0, // how can i infer this from schema ?
    };
  }

  async findBySlug(slug: string) {
    const existingLink = await this.prisma.link.findUnique({
      where: { slug },
    });

    if (!existingLink) return null;

    return existingLink
      ? {
          id: existingLink.id,
          slug: existingLink.slug,
          targetUrl: existingLink.targetUrl,
          createdAt: existingLink.createdAt,
          clickCount: existingLink.clickCount,
          userId: existingLink.userId ?? null,
        }
      : null;
  }

  async incrementClickCountBySlug(slug: string) {
    await this.prisma.link.update({
      where: { slug },
      data: { clickCount: { increment: 1 } },
    });
  }

  async getSlugs(user: User) {
    const links = await this.prisma.link.findMany({
      where: { userId: user.id },
    });

    return links.map((link) => ({
      id: link.id,
      slug: link.slug,
      targetUrl: link.targetUrl,
      createdAt: link.createdAt,
      clickCount: link.clickCount,
      userId: link.userId ?? null,
    }));
  }
}
