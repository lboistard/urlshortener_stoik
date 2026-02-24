import { Inject, Injectable } from "@nestjs/common";
import {
  LinkRepositoryPort,
  LINK_REPOSITORY,
} from "../ports/link-repository.port";
import type { Link } from "../../../generated/prisma/client";

@Injectable()
export class CreateLinkUseCase {
  constructor(
    @Inject(LINK_REPOSITORY) private readonly repo: LinkRepositoryPort,
  ) {}

  async execute(input: { userId?: string; targetUrl: string }): Promise<Link> {
    const slug = this.generateSlug();

    return this.repo.create({
      userId: input.userId,
      slug,
      targetUrl: input.targetUrl,
    });
  }

  private generateSlug(): string {
    const chars =
      "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let out = "";
    for (let i = 0; i < 7; i++)
      out += chars[Math.floor(Math.random() * chars.length)];

    return out;
  }
}
