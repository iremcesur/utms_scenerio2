import { Router } from "express";
import { AppContainer } from "../../shared/container";
import { AuditLogger } from "../../shared/audit";
import { requireRoles } from "../../shared/middleware/rbac";
import { UserRole } from "../../shared/types";
import { IntibakService } from "./intibak.service";
import { IntibakController } from "./intibak.controller";

export function buildIntibakRouter(container: AppContainer): Router {
  const audit = new AuditLogger(container.audit);
  const service = new IntibakService({
    applications: container.applications,
    documents: container.documents,
    intibakTables: container.intibakTables,
    curriculum: container.curriculum,
    packages: container.packages,
    ocr: container.ocr,
    audit,
  });
  const controller = new IntibakController(service);

  const r = Router();
  r.use(requireRoles(UserRole.YgkMember, UserRole.YgkChair, UserRole.SystemAdmin));

  r.get("/department-overview", controller.overview);
  r.post("/intibak/:applicationId/prepare", controller.prepare);
  r.post("/intibak/:applicationId/courses", controller.addManualCourse);
  r.post("/intibak/:applicationId/regenerate-suggestions", controller.generateSuggestions);
  r.patch("/intibak/:applicationId/mappings", controller.updateMappings);
  r.post("/intibak/:applicationId/not-exempt", controller.markNotExempt);
  r.post("/intibak/:applicationId/save", controller.save);
  r.post("/package/send", requireRoles(UserRole.YgkChair, UserRole.SystemAdmin), controller.sendPackage);

  return r;
}
