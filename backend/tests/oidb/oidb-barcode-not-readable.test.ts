import { buildTestKit, TEST_USERS } from "../test-helpers";
import { ApplicationStatus, DocumentVerificationBadge } from "../../src/shared/types";

describe("Test Case 4-Barcode Not Readable", () => {
  it("language proof has no barcode → MANUAL_CHECK_REQUIRED, but officer can still verify", async () => {
    const kit = buildTestKit();
    const officer = kit.asUser(TEST_USERS.oidb);
    const targetId = "app-1003";

    const detailRes = await officer.get(`/api/oidb/applications/${targetId}`);
    expect(detailRes.status).toBe(200);
    const langProof = detailRes.body.verifications.find(
      (v: { documentType: string }) => v.documentType === "LANGUAGE_PROOF",
    );
    expect(langProof.badge).toBe(DocumentVerificationBadge.ManualCheckRequired);

    const verifyRes = await officer.post(`/api/oidb/applications/${targetId}/verify`).send({});
    expect(verifyRes.status).toBe(200);
    expect(verifyRes.body.application.currentStatus).toBe(ApplicationStatus.IntakeVerified);
  });
});
