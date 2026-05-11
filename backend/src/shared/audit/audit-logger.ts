import { randomUUID } from "node:crypto";
import { IAuditRepository } from "../repositories";
import { AuditLogEntry, UserRole } from "../types";

export interface AuditWriteParams {
  actorUserId: string;
  actorRole: UserRole;
  actionType: string;
  affectedEntityId: string;
  affectedEntityType: string;
  previousValue?: unknown;
  newValue?: unknown;
  ipAddress?: string;
}

export class AuditLogger {
  constructor(private readonly repo: IAuditRepository) {}

  write(params: AuditWriteParams): AuditLogEntry {
    const entry: AuditLogEntry = {
      logId: randomUUID(),
      actorUserId: params.actorUserId,
      actorRole: params.actorRole,
      actionType: params.actionType,
      affectedEntityId: params.affectedEntityId,
      affectedEntityType: params.affectedEntityType,
      previousValue: serialize(params.previousValue),
      newValue: serialize(params.newValue),
      occurredAt: new Date().toISOString(),
      ipAddress: params.ipAddress,
    };
    return this.repo.append(entry);
  }
}

function serialize(value: unknown): string | null {
  if (value === undefined || value === null) return null;
  if (typeof value === "string") return value;
  return JSON.stringify(value);
}
