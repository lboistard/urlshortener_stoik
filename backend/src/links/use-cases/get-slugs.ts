import { Inject, Injectable } from "@nestjs/common";
import {
  LinkRepositoryPort,
  LINK_REPOSITORY,
} from "../ports/link-repository.port";
import type { User } from "generated/prisma/client";

@Injectable()
export class GetSlugsUseCase {
  constructor(
    @Inject(LINK_REPOSITORY) private readonly repo: LinkRepositoryPort,
  ) {}

  async execute(user: User) {
    const links = await this.repo.getSlugs(user);

    return links || [];
  }
}
