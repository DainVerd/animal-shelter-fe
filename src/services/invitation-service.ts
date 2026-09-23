import apiClient from "../api/api-clients";
import type { PaginatedList } from "../models/paginated-list";
import type { UserInvite } from "../models/user-invite";
import type PaginationParamsRequest from "../models/requests/pagination-params-request";
import InviteStatus from "../enums/invite-status";

export interface SendInviteRequest {
  email: string;
  roles: string[];
}

export interface AcceptInviteRequest {
  token: string;
  password: string;
}

export interface SignInResponseDto {
  accessToken: string;
  accessTokenExpiresAt: string;
}

export interface GetInvitesRequest extends PaginationParamsRequest {
  emailSearchText?: string;
  roleInclude?: string;
  status?: InviteStatus;
}

export const invitationService = {
  async sendInvite(
    request: SendInviteRequest,
  ): Promise<number> {
    const response = await apiClient.post<number>(
      "/v1/invites",
      request,
    );

    return response.data;
  },

  async acceptInvite(
    request: AcceptInviteRequest,
  ): Promise<SignInResponseDto> {
    const response = await apiClient.post<SignInResponseDto>(
      "/v1/invites/accept",
      request,
    );

    return response.data;
  },

  async getInvites(
    params: GetInvitesRequest,
  ): Promise<PaginatedList<UserInvite>> {
    const response = await apiClient.get<PaginatedList<UserInvite>>(
      "/v1/invites",
      {
        params,
      },
    );

    return response.data;
  },
};