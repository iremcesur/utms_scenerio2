import {
  Application,
  AuditLogEntry,
  DepartmentCurriculum,
  Document,
  EvaluationPackage,
  IntibakTable,
  NotificationRecord,
  User,
} from "../types";

export interface IUserRepository {
  findById(userId: string): User | undefined;
  findByTckn(tckn: string): User | undefined;
}

export interface IApplicationRepository {
  findById(applicationId: string): Application | undefined;
  findAll(): Application[];
  findByStatus(...statuses: string[]): Application[];
  findByDepartmentAndPeriod(departmentId: string, periodId: string): Application[];
  save(application: Application): Application;
}

export interface IDocumentRepository {
  findByApplicationId(applicationId: string): Document[];
  findById(documentId: string): Document | undefined;
  isStoreReachable(): boolean;
  setStoreReachable(reachable: boolean): void;
}

export interface IIntibakRepository {
  findById(intibakTableId: string): IntibakTable | undefined;
  findByApplicationId(applicationId: string): IntibakTable | undefined;
  save(table: IntibakTable): IntibakTable;
}

export interface ICurriculumRepository {
  findByDepartmentId(departmentId: string): DepartmentCurriculum | undefined;
}

export interface IPackageRepository {
  findById(packageId: string): EvaluationPackage | undefined;
  findByDepartmentAndPeriod(departmentId: string, periodId: string): EvaluationPackage | undefined;
  findAll(): EvaluationPackage[];
  save(pkg: EvaluationPackage): EvaluationPackage;
}

export interface IAuditRepository {
  append(entry: AuditLogEntry): AuditLogEntry;
  findAll(): AuditLogEntry[];
  findByEntity(entityType: string, entityId: string): AuditLogEntry[];
}

export interface INotificationRepository {
  append(record: NotificationRecord): NotificationRecord;
  findAll(): NotificationRecord[];
  findByRecipient(userId: string): NotificationRecord[];
}
