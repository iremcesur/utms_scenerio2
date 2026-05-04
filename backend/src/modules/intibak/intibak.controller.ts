import { Request, Response } from "express";
import { z } from "zod";
import { IntibakService } from "./intibak.service";
import { MappingStatus } from "../../shared/types";
import { UnauthorizedError } from "../../shared/errors";

const ManualCourseSchema = z.object({
  code: z.string().min(1),
  name: z.string().min(1),
  letterGrade: z.string().min(1),
  ects: z.number().int().min(0).max(30),
});

const MappingMutationSchema = z.object({
  entryId: z.string().uuid().optional(),
  sourceCourseCodes: z.array(z.string()).default([]),
  targetCourseCode: z.string().nullable(),
  status: z.nativeEnum(MappingStatus),
});

const UpdateMappingsSchema = z.object({
  mutations: z.array(MappingMutationSchema).min(1),
});

const NotExemptSchema = z.object({
  sourceCourseCodes: z.array(z.string()).min(1),
});

const SendPackageSchema = z.object({
  signaturePassword: z.string().min(1),
  departmentId: z.string().min(1),
  periodId: z.string().min(1),
});

const OverviewQuerySchema = z.object({
  departmentId: z.string().min(1),
  periodId: z.string().min(1),
});

export class IntibakController {
  constructor(private readonly service: IntibakService) {}

  prepare = (req: Request, res: Response): void => {
    const userId = this.requireUser(req);
    const { applicationId } = req.params;
    const dto = this.service.prepare(applicationId, userId);
    res.json(dto);
  };

  addManualCourse = (req: Request, res: Response): void => {
    this.requireUser(req);
    const { applicationId } = req.params;
    const body = ManualCourseSchema.parse(req.body);
    const dto = this.service.addManualCourse(applicationId, body);
    res.json(dto);
  };

  generateSuggestions = (req: Request, res: Response): void => {
    this.requireUser(req);
    const { applicationId } = req.params;
    const dto = this.service.generateSuggestionsForManual(applicationId);
    res.json(dto);
  };

  updateMappings = (req: Request, res: Response): void => {
    const userId = this.requireUser(req);
    const { applicationId } = req.params;
    const body = UpdateMappingsSchema.parse(req.body);
    const dto = this.service.updateMappings(applicationId, userId, body.mutations);
    res.json(dto);
  };

  markNotExempt = (req: Request, res: Response): void => {
    const userId = this.requireUser(req);
    const { applicationId } = req.params;
    const body = NotExemptSchema.parse(req.body);
    const dto = this.service.markNotExempt(applicationId, body.sourceCourseCodes, userId);
    res.json(dto);
  };

  save = (req: Request, res: Response): void => {
    const userId = this.requireUser(req);
    const { applicationId } = req.params;
    const result = this.service.save(applicationId, userId);
    res.json(result);
  };

  overview = (req: Request, res: Response): void => {
    this.requireUser(req);
    const query = OverviewQuerySchema.parse(req.query);
    const dto = this.service.departmentOverview(query.departmentId, query.periodId);
    res.json(dto);
  };

  sendPackage = (req: Request, res: Response): void => {
    const userId = this.requireUser(req);
    const body = SendPackageSchema.parse(req.body);
    const pkg = this.service.sendPackage(userId, body);
    res.json({
      package: pkg,
      message: "Package forwarded to Dean's Office.",
    });
  };

  private requireUser(req: Request): string {
    if (!req.authUser) throw new UnauthorizedError();
    return req.authUser.userId;
  }
}
