import apiClient from "../api/api-clients";
import TokenResponse from "../models/token-response";
import type { GenericAbortSignal } from "axios";
import { UserProfile } from "../models/user-profile";
import Role from "../models/role";

export const meService = {
  /**
   * Get current user roles
   * @param signal optional cancellation token
   */
  async getAvailableRoles(signal?: GenericAbortSignal): Promise<Role[]> {
    const response = await apiClient.get<Role[]>("/v1/me/available-roles", {
      signal: signal,
    });

    return response.data;
  },

  /**
   * chose role and get back Access Token
   */
  async selectRole(
    roleCode: string,
    signal?: GenericAbortSignal,
  ): Promise<TokenResponse> {
    const response = await apiClient.post<TokenResponse>(
      "/v1/me/select-role",
      { roleCode: roleCode },
      { signal: signal },
    );

    return response.data;
  },
  /**
   * get current user profile from token
   */
  async getCurrentUser(signal?: GenericAbortSignal): Promise<UserProfile> {
    const response = await apiClient.get<UserProfile>("/v1/me/profile", {
      signal: signal,
    });

    return response.data;
  },
};
