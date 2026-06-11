import apiClient from "../api/api-clients";
import { BaseResponse } from "../models/base-response";
import TokenResponse from "../models/token-response";
import Role from "../models/role";
import User from "../models/user";
import type { GenericAbortSignal } from "axios";

export const meService = {
  /**
   * Get current user roles
   * @param signal optional cancellation token
   */
  async getAvailableRoles(
    signal?: GenericAbortSignal,
  ): Promise<BaseResponse<Role[]>> {
    const response = await apiClient.get<BaseResponse<Role[]>>(
      "/v1/me/available-roles",
      { signal: signal },
    );

    return response.data;
  },

  /**
   * chose role and get back Access Token
   */
  async selectRole(
    roleCode: string,
    signal?: GenericAbortSignal,
  ): Promise<BaseResponse<TokenResponse>> {
    const response = await apiClient.post<BaseResponse<TokenResponse>>(
      "/v1/me/select-role",
      { roleCode },
      { signal: signal },
    );

    return response.data;
  },
  /**
   * get current user profile from token
   */
  async getCurrentUser(
    signal?: GenericAbortSignal,
  ): Promise<BaseResponse<User>> {
    const response = await apiClient.get<BaseResponse<User>>("/v1/me/profile", {
      signal: signal,
    });

    return response.data;
  },
};
