import { Request, Response } from "express";
import { z } from "zod";
import { OidbService } from "./oidb.service";
import { DocumentType } from "../../shared/types";
import { UnauthorizedError } from "../../shared/errors";

const ReturnSchema = z.object({
  reasons: z
    .array(
      z.object({
        slot: z.nativeEnum(DocumentType),
        reason: z.string().min(1),
      }),
    )
    .min(1),
});

const RejectSchema = z.object({
  justification: z.string().min(1),
});

const ForwardSchema = z.object({
  ydyoExempt: z.boolean().default(false),
});

export class OidbController {
  constructor(private readonly service: OidbService) {}

  listPool = (_req: Request, res: Response): void => {
    const pool = this.service.listPool();
    res.json({ items: pool, count: pool.length });
  };

  getDetail = (req: Request, res: Response): void => {
    const { applicationId } = req.params;
    const detail = this.service.loadDetail(applicationId);
    res.json(detail);
  };

  verify = (req: Request, res: Response): void => {
    const userId = this.requireUser(req);
    const { applicationId } = req.params;
    const updated = this.service.verify(applicationId, userId);
    res.json({ application: updated, message: "Application status updated to INTAKE_VERIFIED" });
  };

  returnForCorrection = (req: Request, res: Response): void => {
    const userId = this.requireUser(req);
    const { applicationId } = req.params;
    const body = ReturnSchema.parse(req.body);
    const updated = this.service.returnForCorrection(applicationId, userId, body);
    res.json({
      application: updated,
      message: "The action is successfully submitted.",
    });
  };

  reject = (req: Request, res: Response): void => {
    const userId = this.requireUser(req);
    const { applicationId } = req.params;
    const body = RejectSchema.parse(req.body);
    const updated = this.service.reject(applicationId, userId, body);
    res.json({ application: updated, message: "Application permanently closed (rejected)." });
  };

  forward = (req: Request, res: Response): void => {
    const userId = this.requireUser(req);
    const { applicationId } = req.params;
    const body = ForwardSchema.parse(req.body ?? {});
    const updated = this.service.forward(applicationId, userId, body);
    res.json({
      application: updated,
      message: "Application forwarded; status: PENDING_YGK_FORWARDING",
    });
  };

  private requireUser(req: Request): string {
    if (!req.authUser) throw new UnauthorizedError();
    return req.authUser.userId;
  }
}
