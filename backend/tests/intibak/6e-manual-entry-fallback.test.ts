import { buildTestKit, TEST_USERS } from "../test-helpers";
import { MappingStatus } from "../../src/shared/types";

describe("Test Case 6E: Transcript Could Not Be Read — Manual Entry Fallback", () => {
  it("Elif Yildiz: OCR fails → manualEntryRequired=true → add courses → generate suggestions", async () => {
    const kit = buildTestKit();
    const ygk = kit.asUser(TEST_USERS.ygkMember);
    const appId = "app-asil-elif-yildiz";

    const prep = await ygk.post(`/api/ygk/intibak/${appId}/prepare`).send();
    expect(prep.status).toBe(200);
    expect(prep.body.manualEntryRequired).toBe(true);
    expect(prep.body.previousCourses).toHaveLength(0);

    const courses = [
      { code: "CMPE101", name: "Introduction to Programming", letterGrade: "AA", ects: 6 },
      { code: "MATH151", name: "Calculus I", letterGrade: "BA", ects: 7 },
      { code: "PHYS101", name: "Physics I", letterGrade: "CB", ects: 6 },
      { code: "ENG101", name: "English I", letterGrade: "AA", ects: 3 },
    ];
    for (const c of courses) {
      const r = await ygk.post(`/api/ygk/intibak/${appId}/courses`).send(c);
      expect(r.status).toBe(200);
    }

    const sugg = await ygk.post(`/api/ygk/intibak/${appId}/regenerate-suggestions`).send();
    expect(sugg.status).toBe(200);
    expect(sugg.body.previousCourses.length).toBe(courses.length);
    const matches = sugg.body.mappings.filter(
      (m: { status: string }) => m.status === MappingStatus.SuggestedMatch,
    );
    expect(matches.length).toBeGreaterThan(0);
  });
});
