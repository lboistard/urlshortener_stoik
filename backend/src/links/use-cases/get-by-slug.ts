import { Inject, Injectable, NotFoundException } from "@nestjs/common";
import {
  LinkRepositoryPort,
  LINK_REPOSITORY,
} from "../ports/link-repository.port";

@Injectable()
export class GetBySlugUseCase {
  constructor(
    @Inject(LINK_REPOSITORY) private readonly repo: LinkRepositoryPort,
  ) {}

  async execute(slug: string) {
    const link = await this.repo.findBySlug(slug);
    if (!link) {
      throw new NotFoundException(`No link found for slug: ${slug}`);
    }

    await this.repo.incrementClickCountBySlug(slug);

    return { ...link, clickCount: link.clickCount + 1 };
  }
}
