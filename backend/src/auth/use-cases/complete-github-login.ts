import { Injectable } from "@nestjs/common";

@Injectable()
export class CompleteGithubLoginUseCase {
  getRedirectUrl(frontendBaseUrl: string): string {
    const base = frontendBaseUrl.replace(/\/$/, "");

    return `${base}/`;
  }
}
