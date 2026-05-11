import { buildTestKit, TEST_USERS } from "../test-helpers";
import {
  ApplicationStatus,
  MappingStatus,
  PackageStatus,
} from "../../src/shared/types";
import { SEED_IDS } from "../../src/mocks/seed-data";

describe("Test Case 6I: Successful Package Export to Dean's Office", () => {
  it("Chair signs and forwards CMPE Spring 2026 package", async () => {
    const kit = buildTestKit();
    const ygk = kit.asUser(TEST_USERS.ygkMember);
    const chair = kit.asUser(TEST_USERS.ygkChair);

    const cmpeAsilApps = kit.container.applications
      .findAll()
      .filter(
        (a) =>
          a.targetDepartmentId === SEED_IDS.DEPT_CMPE &&
          a.currentStatus === ApplicationStatus.RankedAsil,
      )
      .map((a) => a.applicationId);
    expect(cmpeAsilApps.length).toBeGreaterThan(0);

    for (const appId of cmpeAsilApps) {
      const prep = await ygk.post(`/api/ygk/intibak/${appId}/prepare`).send();
      expect(prep.status).toBe(200);
      const approveAll = prep.body.mappings
        .filter((m: { status: string }) => m.status === MappingStatus.SuggestedMatch)
        .map((m: { entryId: string; sourceCourseCodes: string[]; targetCourseCode: string }) => ({
          entryId: m.entryId,
          sourceCourseCodes: m.sourceCourseCodes,
          targetCourseCode: m.targetCourseCode,
          status: MappingStatus.Approved,
        }));
      const targetsCovered = new Set(approveAll.map((m: { targetCourseCode: string }) => m.targetCourseCode));
      const fillNoEq = prep.body.targetCurriculum
        .filter((t: { code: string }) => !targetsCovered.has(t.code))
        .map((t: { code: string }) => ({
          sourceCourseCodes: [],
          targetCourseCode: t.code,
          status: MappingStatus.NoPreviousEquivalent,
        }));
      const pendingRows = prep.body.mappings
        .filter((m: { status: string }) => m.status === MappingStatus.PendingReview)
        .map(
          (m: { entryId: string; sourceCourseCodes: string[] }) => ({
            entryId: m.entryId,
            sourceCourseCodes: m.sourceCourseCodes,
            targetCourseCode: null,
            status: MappingStatus.NotExempt,
          }),
        );
      await ygk
        .patch(`/api/ygk/intibak/${appId}/mappings`)
        .send({ mutations: [...approveAll, ...fillNoEq, ...pendingRows] });
      const save = await ygk.post(`/api/ygk/intibak/${appId}/save`).send();
      expect(save.status).toBe(200);
    }

    const overview = await chair
      .get(`/api/ygk/department-overview?departmentId=${SEED_IDS.DEPT_CMPE}&periodId=${SEED_IDS.PERIOD_ID}`);
    expect(overview.status).toBe(200);
    expect(overview.body.ready).toBe(true);
    expect(overview.body.pendingIntibak).toEqual([]);

    const send = await chair.post("/api/ygk/package/send").send({
      signaturePassword: "ygk-chair-signature",
      departmentId: SEED_IDS.DEPT_CMPE,
      periodId: SEED_IDS.PERIOD_ID,
    });
    expect(send.status).toBe(200);
    expect(send.body.message).toBe("Package forwarded to Dean's Office.");
    expect(send.body.package.status).toBe(PackageStatus.Sent);
    expect(send.body.package.digitalSignatureBy).toBe(TEST_USERS.ygkChair);

    for (const appId of cmpeAsilApps) {
      const stored = kit.container.applications.findById(appId);
      expect(stored?.currentStatus).toBe(ApplicationStatus.PendingDeansOfficeReview);
    }
  });
});
