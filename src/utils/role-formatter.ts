import UserRole from "../enums/user-role";

const roleDisplayMap = new Map<string, string>([
  [UserRole.Admin, "Administrator"],
  [UserRole.SuperAdmin, "Super Admin"],
  [UserRole.ShelterWorker, "Shelter Worker"],
  [UserRole.User, "Regular User"],
]);

const roleColorMap = new Map<string, string>([
  [UserRole.Admin, "primary"],
  [UserRole.SuperAdmin, "deep-purple"],
  [UserRole.ShelterWorker, "teal"],
  [UserRole.User, "grey"],
]);

const roleOrderMap = new Map<string, number>([
  [UserRole.SuperAdmin, 1],
  [UserRole.Admin, 2],
  [UserRole.ShelterWorker, 3],
  [UserRole.User, 4],
]);

export const formatRoleName = (roleCode: string | null | undefined): string => {
  if (!roleCode) return "No Role";

  return roleDisplayMap.get(roleCode) || roleCode;
};

export const getRoleColor = (
  roleCode: string | null | undefined
): string => {
  if (!roleCode) return "grey";

  return roleColorMap.get(roleCode) || "grey";
};

export const sortRoles = (roles: string[]): string[] => {
  return [...roles].sort(
    (a, b) =>
      (roleOrderMap.get(a) ?? Number.MAX_SAFE_INTEGER) -
      (roleOrderMap.get(b) ?? Number.MAX_SAFE_INTEGER)
  );
};