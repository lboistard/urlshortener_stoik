import type { Request, Response } from "express";
import type { User } from "../../../generated/prisma/client";

/**
 * Port for "commit session and redirect" after OAuth callback.
 * The HTTP adapter passes req/res so the use case stays free of Express.
 *
 * Thanks claude for this one, not used to this.
 */
export interface SessionCommitPort {
  commit(
    user: User,
    redirectUrl: string,
    req: Request,
    res: Response,
  ): Promise<void>;
}

export const SESSION_COMMIT = Symbol("SESSION_COMMIT");
