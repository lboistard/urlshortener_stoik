import { Inject, Injectable } from "@nestjs/common";
import {
  UserRepositoryPort,
  USER_REPOSITORY,
} from "../ports/user-repository.port";
import type { User } from "../../../generated/prisma/client";

export interface GitHubProfile {
  id: string;
  username?: string;
  photos?: Array<{ value?: string }>;
  _json?: { avatar_url?: string };
}

@Injectable()
export class FindOrCreateUserUseCase {
  constructor(
    @Inject(USER_REPOSITORY) private readonly repo: UserRepositoryPort,
  ) {}

  async execute(profile: GitHubProfile): Promise<User> {
    const existing = await this.repo.findByGithubId(profile.id);
    if (existing) return existing;

    const username = profile.username ?? null;
    const avatarUrl =
      profile.photos?.[0]?.value ??
      (profile._json as { avatar_url?: string } | undefined)?.avatar_url ??
      null;

    return this.repo.create({
      githubId: profile.id,
      username,
      avatarUrl,
    });
  }
}
