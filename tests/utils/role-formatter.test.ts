import { describe, expect, it } from "vitest";
import UserRole from "../../src/enums/user-role";
import {
  formatRoleName,
  getRoleColor,
  sortRoles,
} from "../../src/utils/role-formatter";

describe("role formatter", () => {
  describe("formatRoleName", () => {
    it.each([
      [UserRole.SuperAdmin, "Super Admin"],
      [UserRole.Admin, "Administrator"],
      [UserRole.ShelterWorker, "Shelter Worker"],
      [UserRole.User, "Regular User"],
    ])("formats %s as %s", (role, expected) => {
      expect(formatRoleName(role)).toBe(expected);
    });

    it.each([null, undefined, ""])("returns a fallback for %s", (role) => {
      expect(formatRoleName(role)).toBe("No Role");
    });

    it("returns an unknown role unchanged", () => {
      expect(formatRoleName("Guest")).toBe("Guest");
    });
  });

  describe("getRoleColor", () => {
    it.each([
      [UserRole.SuperAdmin, "deep-purple"],
      [UserRole.Admin, "primary"],
      [UserRole.ShelterWorker, "teal"],
      [UserRole.User, "grey"],
    ])("maps role %s to color %s", (role, expected) => {
      expect(getRoleColor(role)).toBe(expected);
    });

    it.each([null, undefined, "", "Guest"])(
      "returns grey for %s",
      (role) => {
        expect(getRoleColor(role)).toBe("grey");
      },
    );
  });

  describe("sortRoles", () => {
    it("sorts known roles by privilege order", () => {
      expect(
        sortRoles([
          UserRole.User,
          UserRole.Admin,
          UserRole.ShelterWorker,
          UserRole.SuperAdmin,
        ]),
      ).toEqual([
        UserRole.SuperAdmin,
        UserRole.Admin,
        UserRole.ShelterWorker,
        UserRole.User,
      ]);
    });

    it("places unknown roles after known roles", () => {
      expect(sortRoles(["Guest", UserRole.User, UserRole.Admin])).toEqual([
        UserRole.Admin,
        UserRole.User,
        "Guest",
      ]);
    });

    it("does not mutate the original array", () => {
      const roles = [UserRole.User, UserRole.Admin];

      sortRoles(roles);

      expect(roles).toEqual([UserRole.User, UserRole.Admin]);
    });
  });
});
