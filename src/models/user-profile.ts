import UserRoleContext from './user-role-context';


export interface UserProfile {
  id: string;
  email: string;
  userName: string;
  availableContexts: UserRoleContext[]; 
}

export default UserProfile;