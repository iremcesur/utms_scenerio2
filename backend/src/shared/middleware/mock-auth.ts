import { NextFunction, Request, Response } from "express";
import { UnauthorizedError } from "../errors";
import { User, UserRole } from "../types";
import { AppContainer } from "../container";

export interface AuthenticatedUser {
  userId: string;
  fullName: string;
  roles: UserRole[];
  departmentId?: string;
  facultyId?: string;
}

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace Express {
    interface Request {
      authUser?: AuthenticatedUser;
      requestId?: string;
    }
  }
}

const HEADER = "x-mock-user";

export function mockAuthMiddleware(container: AppContainer) {
  return (req: Request, _res: Response, next: NextFunction): void => {
    const userId = req.header(HEADER);
    if (!userId) {
      return next(new UnauthorizedError("Missing x-mock-user header"));
    }
    const user = container.users.findById(userId);
    if (!user) {
      return next(new UnauthorizedError(`Unknown user: ${userId}`));
    }
    req.authUser = toAuthUser(user);
    next();
  };
}

export function toAuthUser(user: User): AuthenticatedUser {
  return {
    userId: user.userId,
    fullName: user.fullName,
    roles: user.roles,
    departmentId: user.departmentId,
    facultyId: user.facultyId,
  };
}
