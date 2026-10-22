import apiClient from "../api/api-clients";
import type { PaginatedList } from "../models/paginated-list";
import type { UserInvite } from "../models/user-invite";
import type { SignInResponse } from "../models/sign-in-response";
import type SendInviteRequest from "../models/requests/send-invite-request";
import type AcceptInviteRequest from "../models/requests/accept-invite-request";
import type GetInvitesRequest from "../models/requests/get-invites-request";

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
  ): Promise<SignInResponse> {
    const response = await apiClient.post<SignInResponse>(
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
