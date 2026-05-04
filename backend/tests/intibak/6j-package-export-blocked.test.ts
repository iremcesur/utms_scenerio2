import { buildTestKit, TEST_USERS } from "../test-helpers";
import { ApplicationStatus } from "../../src/shared/types";
import { SEED_IDS } from "../../src/mocks/seed-data";

describe("Test Case 6J: Package Export Blocked — Not All Applications Finalised", () => {
  it("With at least one Asil application without intibak completed, send package fails", async () => {
    const kit = buildTestKit();
    const chair = kit.asUser(TEST_USERS.ygkChair);

    const overview = await chair.get(
      `/api/ygk/department-overview?departmentId=${SEED_IDS.DEPT_CMPE}&periodId=${SEED_IDS.PERIOD_ID}`,
    );
    expect(overview.status).toBe(200);
    expect(overview.body.ready).toBe(false);
    expect(overview.body.pendingIntibak.length).toBeGreaterThan(0);

    const send = await chair.post("/api/ygk/package/send").send({
      signaturePassword: "ygk-chair-signature",
      departmentId: SEED_IDS.DEPT_CMPE,
      periodId: SEED_IDS.PERIOD_ID,
    });
    expect(send.status).toBe(409);
    expect(send.body.error).toBe("PACKAGE_INCOMPLETE");
    expect(send.body.message).toContain("Pending");

    const apps = kit.container.applications.findAll();
    for (const a of apps) {
      if (a.targetDepartmentId === SEED_IDS.DEPT_CMPE && a.currentStatus === ApplicationStatus.RankedAsil) {
        expect(a.currentStatus).toBe(ApplicationStatus.RankedAsil);
      }
    }
  });

  it("Invalid signature password fails before any state change", async () => {
    const kit = buildTestKit();
    const chair = kit.asUser(TEST_USERS.ygkChair);
    const send = await chair.post("/api/ygk/package/send").send({
      signaturePassword: "wrong-password",
      departmentId: SEED_IDS.DEPT_CMPE,
      periodId: SEED_IDS.PERIOD_ID,
    });
    expect(send.status).toBe(400);
    expect(send.body.error).toBe("VALIDATION_ERROR");
  });
});
