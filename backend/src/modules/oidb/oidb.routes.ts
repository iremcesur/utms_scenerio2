import { Router } from "express";
import { OidbController } from "./oidb.controller";
import { OidbService } from "./oidb.service";
import { AppContainer } from "../../shared/container";
import { AuditLogger, NotificationService } from "../../shared/audit";
import { requireRoles } from "../../shared/middleware/rbac";
import { UserRole } from "../../shared/types";

export function buildOidbRouter(container: AppContainer): Router {
  const audit = new AuditLogger(container.audit);
  const notifications = new NotificationService(container.notifications);
  const service = new OidbService({
    applications: container.applications,
    documents: container.documents,
    users: container.users,
    edevlet: container.edevlet,
    audit,
    notifications,
  });
  const controller = new OidbController(service);

  const r = Router();
  r.use(requireRoles(UserRole.OidbOfficer, UserRole.SystemAdmin));

  r.get("/applications", controller.listPool);
  r.get("/applications/:applicationId", controller.getDetail);
  r.post("/applications/:applicationId/verify", controller.verify);
  r.post("/applications/:applicationId/return", controller.returnForCorrection);
  r.post("/applications/:applicationId/reject", controller.reject);
  r.post("/applications/:applicationId/forward", controller.forward);

  return r;
}
