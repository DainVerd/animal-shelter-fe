import { describe, expect, it } from "vitest";
import { formatDateForApi } from "../../src/utils/time-util";

describe("formatDateForApi", () => {
  it("formats a date as YYYY-MM-DD", () => {
    const date = new Date(2026, 9, 12);

    expect(formatDateForApi(date)).toBe("2026-10-12");
  });

  it("adds leading zeroes to single-digit months and days", () => {
    const date = new Date(2026, 0, 5);

    expect(formatDateForApi(date)).toBe("2026-01-05");
  });

  it("formats calendar boundary dates correctly", () => {
    expect(formatDateForApi(new Date(2024, 1, 29))).toBe("2024-02-29");
    expect(formatDateForApi(new Date(2026, 11, 31))).toBe("2026-12-31");
  });
});
