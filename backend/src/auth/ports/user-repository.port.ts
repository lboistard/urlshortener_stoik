import type { User } from "../../../generated/prisma/client";

export interface UserRepositoryPort {
  findById(id: string): Promise<User | null>;
  findByGithubId(githubId: string): Promise<User | null>;
  create(input: {
    githubId: string;
    username?: string | null;
    avatarUrl?: string | null;
  }): Promise<User>;
}

export const USER_REPOSITORY = Symbol("USER_REPOSITORY");
