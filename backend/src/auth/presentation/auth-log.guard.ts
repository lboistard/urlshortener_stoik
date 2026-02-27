import {
  type CanActivate,
  type ExecutionContext,
  Injectable,
  Logger,
} from "@nestjs/common";

@Injectable()
export class AuthLogGuard implements CanActivate {
  private readonly logger = new Logger("Auth");

  canActivate(context: ExecutionContext): boolean {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const req = context.switchToHttp().getRequest();
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    this.logger.log(`${req.method} ${req.url}`);

    return true;
  }
}
