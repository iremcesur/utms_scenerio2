import { buildTestKit, TEST_USERS } from "../test-helpers";
import { ApplicationStatus, MappingStatus } from "../../src/shared/types";

describe("Test Case 6A: Successful Intibak Preparation (Main Flow)", () => {
  it("Ahmet Kaya: prepare → smart suggestions → approve all → save", async () => {
    const kit = buildTestKit();
    const ygk = kit.asUser(TEST_USERS.ygkMember);
    const appId = "app-asil-ahmet-kaya";

    const prep = await ygk.post(`/api/ygk/intibak/${appId}/prepare`).send();
    expect(prep.status).toBe(200);
    expect(prep.body.previousCourses.length).toBeGreaterThan(0);
    expect(prep.body.targetCurriculum.length).toBeGreaterThan(0);
    expect(prep.body.manualEntryRequired).toBe(false);
    const suggested = prep.body.mappings.filter(
      (m: { status: string }) => m.status === MappingStatus.SuggestedMatch,
    );
    expect(suggested.length).toBeGreaterThan(0);

    const approveAll = suggested.map((m: { entryId: string; sourceCourseCodes: string[]; targetCourseCode: string }) => ({
      entryId: m.entryId,
      sourceCourseCodes: m.sourceCourseCodes,
      targetCourseCode: m.targetCourseCode,
      status: MappingStatus.Approved,
    }));
    const pending = prep.body.mappings.filter(
      (m: { status: string }) => m.status === MappingStatus.PendingReview,
    );
    const notExemptForPending = pending.map(
      (m: { entryId: string; sourceCourseCodes: string[] }) => ({
        entryId: m.entryId,
        sourceCourseCodes: m.sourceCourseCodes,
        targetCourseCode: null,
        status: MappingStatus.NotExempt,
      }),
    );

    const targetsCovered = new Set(approveAll.map((m: { targetCourseCode: string }) => m.targetCourseCode));
    const noEquivalentMutations = prep.body.targetCurriculum
      .filter((t: { code: string }) => !targetsCovered.has(t.code))
      .map((t: { code: string }) => ({
        sourceCourseCodes: [],
        targetCourseCode: t.code,
        status: MappingStatus.NoPreviousEquivalent,
      }));

    const update = await ygk
      .patch(`/api/ygk/intibak/${appId}/mappings`)
      .send({ mutations: [...approveAll, ...notExemptForPending, ...noEquivalentMutations] });
    expect(update.status).toBe(200);

    const save = await ygk.post(`/api/ygk/intibak/${appId}/save`).send();
    expect(save.status).toBe(200);
    expect(save.body.message).toBe("Intibak table saved.");
    expect(save.body.table.isLocked).toBe(true);

    const stored = kit.container.applications.findById(appId);
    expect(stored?.currentStatus).toBe(ApplicationStatus.IntibakCompleted);
  });
});
