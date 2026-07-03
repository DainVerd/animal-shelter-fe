import apiClient from "../api/api-clients";
import { BaseResponse } from "../models/base-response";
import type { GenericAbortSignal } from "axios";
import { SignInResponse } from "../models/sign-in-response";
import SignInViewModel from "../models/requests/sign-in-request";
import ChangePasswordRequest from "../models/requests/change-password-request";
import UserRole from "../enums/user-role";

export const authService = {
  /**
   * Make reqeust to BE to clear cookie
   * @param signal optional cancellation token
   */
  async signOut(signal?: GenericAbortSignal): Promise<void> {
    await apiClient.delete<BaseResponse<void>>("/v1/authenticate/sign-out", {
      signal: signal,
    });
  },

  async refreshToken(
    payload: { activeRole: UserRole | null },
    signal?: GenericAbortSignal,
  ): Promise<BaseResponse<SignInResponse>> {
    const response = await apiClient.post<BaseResponse<SignInResponse>>(
      "/v1/authenticate/refresh-token",
      payload,
      { signal: signal },
    );

    return response.data;
  },

  async signIn(model: SignInViewModel): Promise<BaseResponse<SignInResponse>> {
    const response = await apiClient.post<BaseResponse<SignInResponse>>(
      "/v1/authenticate/sign-in",
      { ...model },
    );

    return response.data;
  },

  async changePassword(
    model: ChangePasswordRequest,
    signal?: GenericAbortSignal,
  ): Promise<BaseResponse<boolean>> {
    const result = await apiClient.post<BaseResponse<boolean>>(
      "/v1/authenticate/change-password",
      { ...model },
      { signal },
    );

    return result.data;
  },
};
