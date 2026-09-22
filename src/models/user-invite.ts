import  InviteStatus from "../enums/invite-status";

export interface InviteUser {
  id: number;
  email: string;
  displayName: string | null;
}

export interface UserInvite {
  id: number;
  email: string;
  roles: string[];
  expiresAt: string;
  acceptedAt: string | null;
  status: InviteStatus;
  invitedBy: InviteUser;
  createdAt: string;
  acceptedUser: InviteUser | null;
}