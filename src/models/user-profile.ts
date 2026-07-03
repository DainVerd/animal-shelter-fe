import UserRole from "../enums/user-role";

export interface UserProfile {
  id: number;
  email: string;
  userName: string;
  activeRole: UserRole;
  availableRoles: UserRole[]; 
  requiresPasswordChange: boolean;
}