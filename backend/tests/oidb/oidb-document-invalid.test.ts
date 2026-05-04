import { buildTestKit, TEST_USERS } from "../test-helpers";
import { ApplicationStatus, DocumentVerificationBadge } from "../../src/shared/types";

describe("Test Case 4-Document Invalid (fake document, e-Devlet returns Invalid)", () => {
  it("Invalid badge appears, reject without justification fails, reject with justification permanently closes the application", async () => {
    const kit = buildTestKit();
    const officer = kit.asUser(TEST_USERS.oidb);
    const targetId = "app-1004";

    kit.container.edevlet.setOutcomeForDocument(
      `doc-${targetId}-transcript`,
      DocumentVerificationBadge.Invalid,
    );

    const detailRes = await officer.get(`/api/oidb/applications/${targetId}`);
    expect(detailRes.status).toBe(200);
    const transcript = detailRes.body.verifications.find(
      (v: { documentType: string }) => v.documentType === "TRANSCRIPT",
    );
    expect(transcript.badge).toBe(DocumentVerificationBadge.Invalid);

    const emptyReject = await officer
      .post(`/api/oidb/applications/${targetId}/reject`)
      .send({ justification: "" });
    expect(emptyReject.status).toBe(400);
    expect(emptyReject.body.error).toBe("VALIDATION_ERROR");

    const rejectRes = await officer
      .post(`/api/oidb/applications/${targetId}/reject`)
      .send({ justification: "Invalid document detected via e-Devlet API." });
    expect(rejectRes.status).toBe(200);
    expect(rejectRes.body.application.currentStatus).toBe(ApplicationStatus.RejectedAtIntake);
    expect(rejectRes.body.application.rejectionReason).toContain("Invalid document detected");

    const studentNotifs = kit.container.notifications.findByRecipient("student-zeynep-demir");
    const rejectionEmail = studentNotifs.find((n) => n.eventType === "OIDB_REJECTED");
    expect(rejectionEmail).toBeDefined();
    expect(rejectionEmail!.subject.toLowerCase()).toContain("rejected");
  });
});
