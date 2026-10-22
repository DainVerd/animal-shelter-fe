import UserRole from "@/enums/user-role";

export interface UserProfile {
  id: number;
  email: string;
  userName: string;
  fullName?: string;
  activeRole: UserRole;
  availableRoles: UserRole[]; 
  requiresPasswordChange: boolean;
}
