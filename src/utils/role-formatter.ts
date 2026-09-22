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