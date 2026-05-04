import { buildTestKit, TEST_USERS } from "../test-helpers";
import { ApplicationStatus, MappingStatus } from "../../src/shared/types";

describe("Test Case 6H: Save Blocked — No Mapping Decision for a Target Course", () => {
  it("Mert Koc: leaving CMPE112 undecided blocks save; deciding NoPreviousEquivalent unblocks it", async () => {
    const kit = buildTestKit();
    const ygk = kit.asUser(TEST_USERS.ygkMember);
    const appId = "app-asil-mert-koc";

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
    const allTargets = new Set(prep.body.targetCurriculum.map((t: { code: string }) => t.code));
    const approvedCodes = new Set<string>(
      approveAll.map((m: { targetCourseCode: string }) => m.targetCourseCode),
    );
    const remainingExceptCMPE112 = Array.from(allTargets)
      .filter((code) => code !== "CMPE112" && !approvedCodes.has(code as string))
      .map((code) => ({
        sourceCourseCodes: [],
        targetCourseCode: code,
        status: MappingStatus.NoPreviousEquivalent,
      }));

    await ygk
      .patch(`/api/ygk/intibak/${appId}/mappings`)
      .send({ mutations: [...approveAll, ...remainingExceptCMPE112] });

    const blocked = await ygk.post(`/api/ygk/intibak/${appId}/save`).send();
    expect(blocked.status).toBe(400);
    expect(blocked.body.error).toBe("VALIDATION_ERROR");
    expect(blocked.body.details.incompleteTargets).toContain("CMPE112");

    const stored = kit.container.applications.findById(appId);
    expect(stored?.currentStatus).toBe(ApplicationStatus.RankedAsil);

    const fix = await ygk.patch(`/api/ygk/intibak/${appId}/mappings`).send({
      mutations: [
        {
          sourceCourseCodes: [],
          targetCourseCode: "CMPE112",
          status: MappingStatus.NoPreviousEquivalent,
        },
      ],
    });
    expect(fix.status).toBe(200);

    const save = await ygk.post(`/api/ygk/intibak/${appId}/save`).send();
    expect(save.status).toBe(200);
    expect(save.body.message).toBe("Intibak table saved.");
  });
});
