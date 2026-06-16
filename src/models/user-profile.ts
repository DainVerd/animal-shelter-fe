
export interface UserProfile {
  id: number;
  email: string;
  userName: string;
  activeRole: string;
  availableRoles: string[]; 
}

export default UserProfile;