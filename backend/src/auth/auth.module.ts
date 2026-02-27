import { Module } from "@nestjs/common";
import { PassportModule } from "@nestjs/passport";
import { USER_REPOSITORY } from "./ports/user-repository.port";
import { SESSION_COMMIT } from "./ports/session-commit.port";
import { PrismaUserRepository } from "./adapters/prisma-user.repository";
import { SessionAdapter } from "./adapters/session.adapter";
import { FindOrCreateUserUseCase } from "./use-cases/find-or-create-user";
import { CompleteGithubLoginUseCase } from "./use-cases/complete-github-login";
import { GithubStrategy } from "./adapters/github.strategy";
import { SessionSerializer } from "./adapters/session.serializer";
import { AuthController } from "./presentation/auth.controller";
import { AuthLogGuard } from "./presentation/auth-log.guard";
import { SessionGuard } from "./presentation/session.guard";

@Module({
  imports: [PassportModule.register({ session: true })],
  controllers: [AuthController],
  providers: [
    AuthLogGuard,
    SessionGuard,
    FindOrCreateUserUseCase,
    CompleteGithubLoginUseCase,
    GithubStrategy,
    SessionSerializer,
    {
      provide: USER_REPOSITORY,
      useClass: PrismaUserRepository,
    },
    {
      provide: SESSION_COMMIT,
      useClass: SessionAdapter,
    },
  ],
})
export class AuthModule {}
