import { buildTestKit, TEST_USERS } from "../test-helpers";
import { MappingStatus } from "../../src/shared/types";

describe("Test Case 6C: Many-to-One Mapping", () => {
  it("Berk Yilmaz: CALC1 + CALC2 → MATH100 (integrated)", async () => {
    const kit = buildTestKit();
    const ygk = kit.asUser(TEST_USERS.ygkMember);
    const appId = "app-asil-berk-yilmaz";

    const prep = await ygk.post(`/api/ygk/intibak/${appId}/prepare`).send();
    expect(prep.status).toBe(200);

    const update = await ygk.patch(`/api/ygk/intibak/${appId}/mappings`).send({
      mutations: [
        {
          sourceCourseCodes: ["CALC1"],
          targetCourseCode: "MATH100",
          status: MappingStatus.ManualOverride,
        },
        {
          sourceCourseCodes: ["CALC2"],
          targetCourseCode: "MATH100",
          status: MappingStatus.ManualOverride,
        },
      ],
    });
    expect(update.status).toBe(200);
    const linkedToMath100 = update.body.mappings.filter(
      (m: { targetCourseCode: string }) => m.targetCourseCode === "MATH100",
    );
    expect(linkedToMath100.length).toBe(2);
    expect(linkedToMath100.every((m: { status: string }) => m.status === MappingStatus.ManualOverride)).toBe(true);
  });
});
