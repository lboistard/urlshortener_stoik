import {
  Controller,
  Get,
  Post,
  Inject,
  Logger,
  Req,
  Res,
  UseGuards,
  HttpCode,
  HttpStatus,
} from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { ConfigService } from "@nestjs/config";
import { Request, Response } from "express";
import type { User } from "../../../generated/prisma/client";
import { AuthLogGuard } from "./auth-log.guard";
import { SessionGuard } from "./session.guard";
import { CompleteGithubLoginUseCase } from "../use-cases/complete-github-login";
import { SESSION_COMMIT } from "../ports/session-commit.port";
import type { SessionCommitPort } from "../ports/session-commit.port";

@Controller("auth")
export class AuthController {
  private readonly logger = new Logger(AuthController.name);

  constructor(
    private readonly config: ConfigService,
    private readonly completeGithubLogin: CompleteGithubLoginUseCase,
    @Inject(SESSION_COMMIT) private readonly sessionCommit: SessionCommitPort,
  ) {}

  @Get("github")
  @UseGuards(AuthLogGuard, AuthGuard("github"))
  github() {
    this.logger.log("Redirecting to GitHub");
  }

  @Get("github/callback")
  @UseGuards(AuthLogGuard, AuthGuard("github"))
  async githubCallback(@Req() req: Request, @Res() res: Response) {
    const user = req.user as User;
    const frontendBaseUrl = this.config.getOrThrow<string>("FRONTEND_URL");

    const redirectUrl =
      this.completeGithubLogin.getRedirectUrl(frontendBaseUrl);

    try {
      await this.sessionCommit.commit(user, redirectUrl, req, res);
      this.logger.log("Session saved, redirecting to " + redirectUrl);
    } catch (err) {
      this.logger.error("Login/session error", err);
      res.status(500).send("Login failed");
    }
  }

  @Get("me")
  @UseGuards(SessionGuard)
  me(@Req() req: Request) {
    return req.user as User;
  }

  @Post("logout")
  @HttpCode(HttpStatus.NO_CONTENT)
  @UseGuards(SessionGuard)
  logout(@Req() req: Request, @Res() res: Response) {
    return new Promise<void>((resolve, reject) => {
      req.logout((err: unknown) => {
        if (err) {
          reject(err instanceof Error ? err : new Error(JSON.stringify(err)));

          return;
        }

        req.session.destroy((destroyErr: unknown) => {
          if (destroyErr) {
            reject(
              destroyErr instanceof Error
                ? destroyErr
                : new Error(JSON.stringify(destroyErr)),
            );

            return;
          }

          res.status(HttpStatus.NO_CONTENT).send();
          resolve();
        });
      });
    });
  }
}
