import { Injectable } from "@nestjs/common";
import { PrismaService } from "../../prisma/prisma.service";
import { UserRepositoryPort } from "../ports/user-repository.port";
import type { User } from "../../../generated/prisma/client";

@Injectable()
export class PrismaUserRepository implements UserRepositoryPort {
  constructor(private readonly prisma: PrismaService) {}

  async findById(id: string): Promise<User | null> {
    return this.prisma.user.findUnique({
      where: { id },
    });
  }

  async findByGithubId(githubId: string): Promise<User | null> {
    return this.prisma.user.findUnique({
      where: { githubId },
    });
  }

  async create(input: {
    githubId: string;
    username?: string | null;
    avatarUrl?: string | null;
  }): Promise<User> {
    return this.prisma.user.create({
      data: {
        githubId: input.githubId,
        username: input.username ?? null,
        avatarUrl: input.avatarUrl ?? null,
      },
    });
  }
}
