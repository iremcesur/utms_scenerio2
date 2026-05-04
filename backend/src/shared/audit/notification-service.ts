import { randomUUID } from "node:crypto";
import { InMemoryNotificationRepository } from "../repositories/in-memory";
import { NotificationRecord } from "../types";

export interface NotificationParams {
  recipientUserId: string;
  eventType: string;
  channel: "EMAIL" | "DASHBOARD_ALERT";
  subject: string;
  body: string;
}

export class NotificationService {
  constructor(private readonly repo: InMemoryNotificationRepository) {}

  send(params: NotificationParams): NotificationRecord {
    const record: NotificationRecord = {
      notificationId: randomUUID(),
      recipientUserId: params.recipientUserId,
      eventType: params.eventType,
      channel: params.channel,
      subject: params.subject,
      body: params.body,
      isDelivered: false,
      createdAt: new Date().toISOString(),
    };
    return this.repo.append(record);
  }

  setAvailable(value: boolean): void {
    this.repo.setAvailable(value);
  }
}
