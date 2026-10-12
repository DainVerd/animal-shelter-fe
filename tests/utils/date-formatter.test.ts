import { afterEach, describe, expect, it, vi } from "vitest";
import { calculateAge, formatDate } from "../../src/utils/date-formatter";

describe("date formatter", () => {
  describe("formatDate", () => {
    it("formats a Date using the date-only format", () => {
      expect(formatDate(new Date(2026, 9, 12, 14, 5))).toBe("12.10.2026");
    });

    it("formats an ISO string using the date-only format", () => {
      expect(formatDate("2026-01-05")).toBe("05.01.2026");
    });

    it("includes time when requested", () => {
      expect(formatDate(new Date(2026, 9, 12, 14, 5), true)).toBe(
        "12.10.2026 14:05",
      );
    });

    it.each([null, undefined, ""])(
      "returns an em dash for an empty value (%s)",
      (value) => {
        expect(formatDate(value)).toBe("—");
      },
    );

    it("returns a fallback for an invalid date", () => {
      expect(formatDate("not-a-date")).toBe("Invalid date");
      expect(formatDate(new Date(Number.NaN))).toBe("Invalid date");
    });
  });

  describe("calculateAge", () => {
    afterEach(() => {
      vi.useRealTimers();
    });

    it("returns the age when the birthday has occurred this year", () => {
      vi.useFakeTimers();
      vi.setSystemTime(new Date(2026, 9, 12, 12));

      expect(calculateAge(new Date(2021, 9, 12))).toBe("5 years");
      expect(calculateAge(new Date(2021, 8, 30))).toBe("5 years");
    });

    it("subtracts a year when the birthday is still upcoming", () => {
      vi.useFakeTimers();
      vi.setSystemTime(new Date(2026, 9, 12, 12));

      expect(calculateAge(new Date(2021, 9, 13))).toBe("4 years");
    });

    it("returns Under 1 year for an animal younger than one", () => {
      vi.useFakeTimers();
      vi.setSystemTime(new Date(2026, 9, 12, 12));

      expect(calculateAge(new Date(2026, 0, 15))).toBe("Under 1 year");
    });
  });
});
