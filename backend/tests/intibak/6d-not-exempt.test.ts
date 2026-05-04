import { buildTestKit, TEST_USERS } from "../test-helpers";
import { ApplicationStatus, MappingStatus } from "../../src/shared/types";

describe("Test Case 6D: Course Marked as Not Exempt", () => {
  it("Duru Celik: HIST200 marked Not Exempt; rest approved; save succeeds", async () => {
    const kit = buildTestKit();
    const ygk = kit.asUser(TEST_USERS.ygkMember);
    const appId = "app-asil-duru-celik";

    const prep = await ygk.post(`/api/ygk/intibak/${appId}/prepare`).send();
    expect(prep.status).toBe(200);

    const notExemptRes = await ygk
      .post(`/api/ygk/intibak/${appId}/not-exempt`)
      .send({ sourceCourseCodes: ["HIST200"] });
    expect(notExemptRes.status).toBe(200);
    const histRow = notExemptRes.body.mappings.find(
      (m: { sourceCourseCodes: string[] }) => m.sourceCourseCodes.includes("HIST200"),
    );
    expect(histRow.status).toBe(MappingStatus.NotExempt);

    const approveAll = notExemptRes.body.mappings
      .filter((m: { status: string }) => m.status === MappingStatus.SuggestedMatch)
      .map((m: { entryId: string; sourceCourseCodes: string[]; targetCourseCode: string }) => ({
        entryId: m.entryId,
        sourceCourseCodes: m.sourceCourseCodes,
        targetCourseCode: m.targetCourseCode,
        status: MappingStatus.Approved,
      }));
    const remainingTargets = notExemptRes.body.targetCurriculum
      .filter(
        (t: { code: string }) =>
          !approveAll.find((m: { targetCourseCode: string }) => m.targetCourseCode === t.code),
      )
      .map((t: { code: string }) => ({
        sourceCourseCodes: [],
        targetCourseCode: t.code,
        status: MappingStatus.NoPreviousEquivalent,
      }));

    const update = await ygk
      .patch(`/api/ygk/intibak/${appId}/mappings`)
      .send({ mutations: [...approveAll, ...remainingTargets] });
    expect(update.status).toBe(200);

    const save = await ygk.post(`/api/ygk/intibak/${appId}/save`).send();
    expect(save.status).toBe(200);
    expect(save.body.table.isLocked).toBe(true);
    const stored = kit.container.applications.findById(appId);
    expect(stored?.currentStatus).toBe(ApplicationStatus.IntibakCompleted);
  });
});
