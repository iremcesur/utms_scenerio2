import { buildTestKit, TEST_USERS } from "../test-helpers";
import { ApplicationStatus, MappingStatus } from "../../src/shared/types";

describe("Test Case 6G: No Smart Suggestions Found — Fully Manual Mapping", () => {
  it("Sude Arslan: Fine Arts → CMPE; map FA240 to ENG111, mark others Not Exempt", async () => {
    const kit = buildTestKit();
    const ygk = kit.asUser(TEST_USERS.ygkMember);
    const appId = "app-asil-sude-arslan";

    const prep = await ygk.post(`/api/ygk/intibak/${appId}/prepare`).send();
    expect(prep.status).toBe(200);
    expect(prep.body.manualEntryRequired).toBe(false);
    expect(prep.body.noSuggestionsFound).toBe(true);
    const allPending = prep.body.mappings.every(
      (m: { status: string }) => m.status === MappingStatus.PendingReview,
    );
    expect(allPending).toBe(true);

    const fa240Row = prep.body.mappings.find(
      (m: { sourceCourseCodes: string[] }) => m.sourceCourseCodes.includes("FA240"),
    );
    const overrideRes = await ygk.patch(`/api/ygk/intibak/${appId}/mappings`).send({
      mutations: [
        {
          entryId: fa240Row.entryId,
          sourceCourseCodes: ["FA240"],
          targetCourseCode: "ENG111",
          status: MappingStatus.ManualOverride,
        },
      ],
    });
    expect(overrideRes.status).toBe(200);

    for (const code of ["FA210", "FA230", "FA250"]) {
      const r = await ygk
        .post(`/api/ygk/intibak/${appId}/not-exempt`)
        .send({ sourceCourseCodes: [code] });
      expect(r.status).toBe(200);
    }

    const detail = await ygk.post(`/api/ygk/intibak/${appId}/prepare`).send();
    const remainingTargets = detail.body.targetCurriculum
      .filter((t: { code: string }) => t.code !== "ENG111")
      .map((t: { code: string }) => ({
        sourceCourseCodes: [],
        targetCourseCode: t.code,
        status: MappingStatus.NoPreviousEquivalent,
      }));
    const fillRes = await ygk
      .patch(`/api/ygk/intibak/${appId}/mappings`)
      .send({ mutations: remainingTargets });
    expect(fillRes.status).toBe(200);

    const save = await ygk.post(`/api/ygk/intibak/${appId}/save`).send();
    expect(save.status).toBe(200);
    const stored = kit.container.applications.findById(appId);
    expect(stored?.currentStatus).toBe(ApplicationStatus.IntibakCompleted);
  });
});
