import apiClient from "../api/api-clients";
import { BaseResponse } from "../models/base-response";
import type { GenericAbortSignal } from "axios";
import { SignInResponse } from "../models/sign-in-response";
import SignInViewModel from "../models/requests/sign-in-request";

export const authService = {
  /**
   * Make reqeust to BE to clear cookie
   * @param signal optional cancellation token
   */
  async signOut(
    signal?: GenericAbortSignal,
  ): Promise<void> {
    await apiClient.delete<BaseResponse<void>>(
      "/v1/authenticate/sign-out",
      { signal: signal },
    );
  },

  async refreshToken(
    signal?: GenericAbortSignal,
  ): Promise<BaseResponse<SignInResponse>> {
    const response = await apiClient.post<BaseResponse<SignInResponse>>(
      "/v1/authenticate/refresh-token",
      { signal: signal },
    );

    return response.data;
  },

  async signIn(
    model: SignInViewModel,
  ): Promise<BaseResponse<SignInResponse>> {
    const response = await apiClient.post<BaseResponse<SignInResponse>>(
      "/v1/authenticate/sign-in",
      { ...model}
    );

    return response.data;
  },
};