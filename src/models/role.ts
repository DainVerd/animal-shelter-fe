import UserRole from "../enums/user-role";

export interface Role {
  title: string;
  description: string; 
  icon: string; 
  color: string; 
  roleCode: UserRole; 
}

export default Role;