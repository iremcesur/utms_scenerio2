import { buildTestKit, TEST_USERS } from "../test-helpers";
import { MappingStatus } from "../../src/shared/types";

describe("Test Case 6B: Manual Override of a Smart Suggestion", () => {
  it("Zeynep Demir overrides MATH151 → MATH102 instead of suggested target", async () => {
    const kit = buildTestKit();
    const ygk = kit.asUser(TEST_USERS.ygkMember);
    const appId = "app-asil-zeynep-demir";

    const prep = await ygk.post(`/api/ygk/intibak/${appId}/prepare`).send();
    expect(prep.status).toBe(200);
    const mathRow = prep.body.mappings.find(
      (m: { sourceCourseCodes: string[] }) => m.sourceCourseCodes.includes("MATH151"),
    );
    expect(mathRow).toBeDefined();
    expect(mathRow.status).toBe(MappingStatus.SuggestedMatch);

    const update = await ygk.patch(`/api/ygk/intibak/${appId}/mappings`).send({
      mutations: [
        {
          entryId: mathRow.entryId,
          sourceCourseCodes: ["MATH151"],
          targetCourseCode: "MATH102",
          status: MappingStatus.ManualOverride,
        },
      ],
    });
    expect(update.status).toBe(200);
    const updated = update.body.mappings.find(
      (m: { sourceCourseCodes: string[] }) => m.sourceCourseCodes.includes("MATH151"),
    );
    expect(updated.status).toBe(MappingStatus.ManualOverride);
    expect(updated.targetCourseCode).toBe("MATH102");

    const reload = await ygk.post(`/api/ygk/intibak/${appId}/prepare`).send();
    const persisted = reload.body.mappings.find(
      (m: { sourceCourseCodes: string[] }) => m.sourceCourseCodes.includes("MATH151"),
    );
    expect(persisted.status).toBe(MappingStatus.ManualOverride);
  });
});
