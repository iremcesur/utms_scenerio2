import { buildTestKit, TEST_USERS } from "../test-helpers";
import { ApplicationStatus } from "../../src/shared/types";

describe("Test Case 4-DocumentStoreUnreachable", () => {
  it("blocks detail and verify when DocumentStore is offline; status remains unchanged", async () => {
    const kit = buildTestKit();
    const officer = kit.asUser(TEST_USERS.oidb);
    const targetId = "app-1002";

    kit.container.documents.setStoreReachable(false);

    const detailRes = await officer.get(`/api/oidb/applications/${targetId}`);
    expect(detailRes.status).toBe(503);
    expect(detailRes.body.error).toBe("DOCUMENT_STORE_UNREACHABLE");

    const verifyRes = await officer.post(`/api/oidb/applications/${targetId}/verify`).send({});
    expect(verifyRes.status).toBe(503);
    expect(verifyRes.body.error).toBe("DOCUMENT_STORE_UNREACHABLE");

    const stored = kit.container.applications.findById(targetId);
    expect(stored?.currentStatus).toBe(ApplicationStatus.PendingOidbVerification);

    kit.container.documents.setStoreReachable(true);
    const poolRes = await officer.get("/api/oidb/applications");
    expect(poolRes.status).toBe(200);
    expect(poolRes.body.items.find((a: { applicationId: string }) => a.applicationId === targetId)).toBeDefined();
  });
});
