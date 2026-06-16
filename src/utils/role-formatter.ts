import UserRole from "../enums/user-role";

const roleDisplayMap = new Map<string, string>([
  [UserRole.Admin, "Administrator"],
  [UserRole.SuperAdmin, "Super Admin"],
  [UserRole.ShelterWorker, "Shelter Worker"],
  [UserRole.User, "Regular User"],
]);

export const formatRoleName = (roleCode: string | null | undefined): string => {
  if (!roleCode) return "No Role";

  return roleDisplayMap.get(roleCode) || roleCode;
};
