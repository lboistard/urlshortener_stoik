import { Injectable } from "@nestjs/common";
import type { Request, Response } from "express";
import type { User } from "../../../generated/prisma/client";
import type { SessionCommitPort } from "../ports/session-commit.port";

@Injectable()
export class SessionAdapter implements SessionCommitPort {
  async commit(
    user: User,
    redirectUrl: string,
    req: Request,
    res: Response,
  ): Promise<void> {
    return new Promise((resolve, reject) => {
      req.logIn(user, (err) => {
        if (err) {
          reject(new Error((err as Error).message));

          return;
        }
        req.session.save((saveErr) => {
          if (saveErr) {
            reject(new Error((saveErr as Error).message));

            return;
          }
          res.redirect(redirectUrl);
          resolve();
        });
      });
    });
  }
}
