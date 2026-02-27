import { Injectable, Logger } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-github2";
import { FindOrCreateUserUseCase } from "../use-cases/find-or-create-user";
import type { User } from "../../../generated/prisma/client";

@Injectable()
export class GithubStrategy extends PassportStrategy(Strategy, "github") {
  private readonly logger = new Logger(GithubStrategy.name);

  constructor(
    private readonly config: ConfigService,
    private readonly findOrCreateUser: FindOrCreateUserUseCase,
  ) {
    const callbackURL = config.getOrThrow<string>("GITHUB_CALLBACK_URL");
    super({
      clientID: config.getOrThrow<string>("GITHUB_CLIENT_ID"),
      clientSecret: config.getOrThrow<string>("GITHUB_CLIENT_SECRET"),
      callbackURL: callbackURL,
      scope: ["user:email"],
    });
  }

  async validate(
    _accessToken: string,
    _refreshToken: string,
    profile: {
      id: string;
      username?: string;
      photos?: Array<{ value?: string }>;
      _json?: { avatar_url?: string };
    },
  ): Promise<User> {
    this.logger.log(
      `validate profile id=${profile.id} username=${profile.username ?? "n/a"}`,
    );
    const user = await this.findOrCreateUser.execute(profile);
    this.logger.log(`validate done userId=${user.id}`);

    return user;
  }
}
