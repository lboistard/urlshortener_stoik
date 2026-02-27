import { Injectable, Inject } from "@nestjs/common";
import { PassportSerializer } from "@nestjs/passport";
import { USER_REPOSITORY } from "../ports/user-repository.port";
import type { UserRepositoryPort } from "../ports/user-repository.port";
import type { User } from "../../../generated/prisma/client";

@Injectable()
export class SessionSerializer extends PassportSerializer {
  constructor(
    @Inject(USER_REPOSITORY) private readonly userRepo: UserRepositoryPort,
  ) {
    super();
  }

  serializeUser(
    user: User,
    done: (err: Error | null, id?: string) => void,
  ): void {
    done(null, user.id);
  }

  async deserializeUser(
    userId: string,
    done: (err: Error | null, user?: User | null) => void,
  ): Promise<void> {
    try {
      const user = await this.userRepo.findById(userId);
      done(null, user ?? undefined);
    } catch (err) {
      done(err as Error);
    }
  }
}
