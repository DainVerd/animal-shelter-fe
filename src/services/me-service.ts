import apiClient from "../api/api-clients";
import { BaseResponse } from "../models/base-response";
import TokenResponse from "../models/token-response";
import Role from "../models/role";


export const meService = {
  /**
   * Get current user roles
   */
  async getAvailableRoles(): Promise<BaseResponse<Role[]>> {
    const response = await apiClient.get<BaseResponse<Role[]>>("/v1/me/available-roles");

    return response.data;
  },

  /**
   * chose role and get back Access Token
   */
  async selectRole(roleCode: string): Promise<BaseResponse<TokenResponse>> {
    const response = await apiClient.post<BaseResponse<TokenResponse>>("/v1/me/select-role", { roleCode });

    return response.data;
  }
};