import { describe, expect, it } from "vitest";
import InviteStatus from "../../src/enums/invite-status";
import {
  formatInviteStatusName,
  getStatusColor,
  getStatusIcon,
} from "../../src/utils/invite-status-formatter";

describe("invite status formatter", () => {
  describe("formatInviteStatusName", () => {
    it.each([
      [InviteStatus.Pending, "Pending"],
      [InviteStatus.Accepted, "Accepted"],
      [InviteStatus.Expired, "Expired"],
      [InviteStatus.Revoked, "Revoked"],
    ])("formats status %s as %s", (status, expected) => {
      expect(formatInviteStatusName(status)).toBe(expected);
    });

    it.each([null, undefined])("returns a fallback for %s", (status) => {
      expect(formatInviteStatusName(status)).toBe("No Status");
    });

    it("returns an unknown numeric value as text", () => {
      expect(formatInviteStatusName(99)).toBe("99");
    });
  });

  describe("getStatusColor", () => {
    it.each([
      [InviteStatus.Pending, "warning"],
      [InviteStatus.Accepted, "success"],
      [InviteStatus.Expired, "error"],
      [InviteStatus.Revoked, "grey"],
    ])("maps status %s to color %s", (status, expected) => {
      expect(getStatusColor(status)).toBe(expected);
    });

    it("returns grey for an unknown status", () => {
      expect(getStatusColor(99 as InviteStatus)).toBe("grey");
    });
  });

  describe("getStatusIcon", () => {
    it.each([
      [InviteStatus.Pending, "mdi-clock-outline"],
      [InviteStatus.Accepted, "mdi-check-circle-outline"],
      [InviteStatus.Expired, "mdi-clock-alert-outline"],
      [InviteStatus.Revoked, "mdi-close-circle-outline"],
    ])("maps status %s to icon %s", (status, expected) => {
      expect(getStatusIcon(status)).toBe(expected);
    });

    it("returns a help icon for an unknown status", () => {
      expect(getStatusIcon(99 as InviteStatus)).toBe(
        "mdi-help-circle-outline",
      );
    });
  });
});
