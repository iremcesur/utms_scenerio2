import {
  InMemoryApplicationRepository,
  InMemoryAuditRepository,
  InMemoryCurriculumRepository,
  InMemoryDocumentRepository,
  InMemoryIntibakRepository,
  InMemoryNotificationRepository,
  InMemoryPackageRepository,
  InMemoryUserRepository,
} from "./repositories";
import { seedAll } from "../mocks/seed-data";
import { EDevletMockClient } from "./external/edevlet-client";
import { OcrParserMockClient } from "./external/ocr-parser-client";

export interface AppContainer {
  users: InMemoryUserRepository;
  applications: InMemoryApplicationRepository;
  documents: InMemoryDocumentRepository;
  intibakTables: InMemoryIntibakRepository;
  curriculum: InMemoryCurriculumRepository;
  packages: InMemoryPackageRepository;
  audit: InMemoryAuditRepository;
  notifications: InMemoryNotificationRepository;
  edevlet: EDevletMockClient;
  ocr: OcrParserMockClient;
}

export function createContainer(): AppContainer {
  const container: AppContainer = {
    users: new InMemoryUserRepository(),
    applications: new InMemoryApplicationRepository(),
    documents: new InMemoryDocumentRepository(),
    intibakTables: new InMemoryIntibakRepository(),
    curriculum: new InMemoryCurriculumRepository(),
    packages: new InMemoryPackageRepository(),
    audit: new InMemoryAuditRepository(),
    notifications: new InMemoryNotificationRepository(),
    edevlet: new EDevletMockClient(),
    ocr: new OcrParserMockClient(),
  };
  seedAll(container);
  return container;
}
