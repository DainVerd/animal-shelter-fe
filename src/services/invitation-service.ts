import apiClient from "../api/api-clients";

export interface SendInviteRequest {
  email: string;
  roles: string[];
}

export const invitationService = {
  async sendInvite(
    request: SendInviteRequest
  ): Promise<number> {
    const response = await apiClient.post<number>(
      "/v1/invites",
      request
    );

    return response.data;
  },
};