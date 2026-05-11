import { buildTestKit, TEST_USERS } from "../test-helpers";
import { ApplicationStatus } from "../../src/shared/types";

describe("Test Case 6F: Target Curriculum Not Defined — Process Blocked", () => {
  it("Can Aydin (Electrical Engineering): blocked with CURRICULUM_NOT_DEFINED, status unchanged", async () => {
    const kit = buildTestKit();
    const ygk = kit.asUser(TEST_USERS.ygkMember);
    const appId = "app-asil-can-aydin";

    const res = await ygk.post(`/api/ygk/intibak/${appId}/prepare`).send();
    expect(res.status).toBe(409);
    expect(res.body.error).toBe("CURRICULUM_NOT_DEFINED");

    const stored = kit.container.applications.findById(appId);
    expect(stored?.currentStatus).toBe(ApplicationStatus.RankedAsil);
    expect(stored?.intibakTableId).toBeUndefined();
  });
});
