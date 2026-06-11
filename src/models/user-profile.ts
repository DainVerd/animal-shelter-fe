import UserRoleContext from "./user-role-context";


export interface UserProfile {
  id: number;
  email: string;
  userName: string;
  activeRole: string;
  availableContexts?: UserRoleContext[]; 
}

export default UserProfile;