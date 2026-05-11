import { buildTestKit, TEST_USERS } from "../test-helpers";
import { ApplicationStatus, DocumentType } from "../../src/shared/types";

describe("Test Case 4-Return Without Reason", () => {
  it("rejects empty reason list (server-side validation)", async () => {
    const kit = buildTestKit();
    const officer = kit.asUser(TEST_USERS.oidb);
    const targetId = "app-1001";

    const empty = await officer
      .post(`/api/oidb/applications/${targetId}/return`)
      .send({ reasons: [] });
    expect(empty.status).toBe(400);

    const blankReason = await officer
      .post(`/api/oidb/applications/${targetId}/return`)
      .send({ reasons: [{ slot: DocumentType.Transcript, reason: "" }] });
    expect(blankReason.status).toBe(400);

    const stored = kit.container.applications.findById(targetId);
    expect(stored?.currentStatus).toBe(ApplicationStatus.PendingOidbVerification);
  });

  it("returns successfully with slot+reason; only that slot is recorded for student-side unlock", async () => {
    const kit = buildTestKit();
    const officer = kit.asUser(TEST_USERS.oidb);
    const targetId = "app-1001";

    const ok = await officer
      .post(`/api/oidb/applications/${targetId}/return`)
      .send({
        reasons: [{ slot: DocumentType.Transcript, reason: "Unreadable PDF" }],
      });
    expect(ok.status).toBe(200);
    expect(ok.body.application.currentStatus).toBe(ApplicationStatus.ReturnedForCorrection);
    expect(ok.body.application.correctionReasons).toHaveLength(1);
    expect(ok.body.application.correctionReasons[0].slot).toBe(DocumentType.Transcript);

    const studentNotifs = kit.container.notifications.findByRecipient("student-ahmet-yilmaz");
    expect(
      studentNotifs.find((n) => n.eventType === "OIDB_RETURN_FOR_CORRECTION"),
    ).toBeDefined();
  });
});
