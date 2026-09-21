import apiClient from "../api/api-clients";
import SignInResponse from "../models/sign-in-response";

export interface SendInviteRequest {
  email: string;
  roles: string[];
}

export interface AcceptInviteRequest {
  token: string;
  password: string;
}

export const invitationService = {
  async sendInvite(request: SendInviteRequest): Promise<number> {
    const response = await apiClient.post<number>("/v1/invites", request);

    return response.data;
  },
  async acceptInvite(request: AcceptInviteRequest): Promise<SignInResponse> {
    const response = await apiClient.post<SignInResponse>(
      "/v1/invites/accept",
      request,
    );
    return response.data;
  },
};
