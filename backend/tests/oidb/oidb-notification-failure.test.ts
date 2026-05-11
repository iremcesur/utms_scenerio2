import { buildTestKit, TEST_USERS } from "../test-helpers";
import { ApplicationStatus } from "../../src/shared/types";

describe("Test Case 4-Notification Service Failure", () => {
  it("verify still updates status and writes audit even when notification service is offline", async () => {
    const kit = buildTestKit();
    const officer = kit.asUser(TEST_USERS.oidb);
    const targetId = "app-1001";

    kit.container.notifications.setAvailable(false);

    const res = await officer.post(`/api/oidb/applications/${targetId}/verify`).send({});
    expect(res.status).toBe(200);
    expect(res.body.application.currentStatus).toBe(ApplicationStatus.IntakeVerified);

    const allNotifs = kit.container.notifications.findAll();
    const failed = allNotifs.find((n) => n.eventType === "OIDB_VERIFIED");
    expect(failed).toBeDefined();
    expect(failed!.isDelivered).toBe(false);
    expect(failed!.failureReason).toContain("offline");

    const audit = kit.container.audit.findByEntity("Application", targetId);
    expect(audit.find((e) => e.actionType === "OIDB_VERIFY")).toBeDefined();
  });
});
