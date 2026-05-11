import { NextFunction, Request, Response } from "express";
import { ForbiddenError, UnauthorizedError } from "../errors";
import { UserRole } from "../types";

export function requireRoles(...allowed: UserRole[]) {
  return (req: Request, _res: Response, next: NextFunction): void => {
    const user = req.authUser;
    if (!user) return next(new UnauthorizedError());
    const has = user.roles.some((r) => allowed.includes(r));
    if (!has) {
      return next(
        new ForbiddenError(
          `Role(s) required: ${allowed.join(", ")} — got: ${user.roles.join(", ")}`,
        ),
      );
    }
    next();
  };
}
