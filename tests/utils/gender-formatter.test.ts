import { describe, expect, it } from "vitest";
import Gender from "../../src/enums/gender";
import { formatGenderName } from "../../src/utils/gender-formatter";

describe("formatGenderName", () => {
  it.each([
    [Gender.Male, "Male"],
    [Gender.Female, "Female"],
  ])("formats gender %s as %s", (gender, expected) => {
    expect(formatGenderName(gender)).toBe(expected);
  });

  it.each([null, undefined])("returns a fallback for %s", (gender) => {
    expect(formatGenderName(gender)).toBe("No Gender");
  });

  it("returns an unknown numeric value as text", () => {
    expect(formatGenderName(99)).toBe("99");
  });
});
