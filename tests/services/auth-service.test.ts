import { beforeEach, describe, expect, it, vi } from "vitest";
import apiClient from "../../src/api/api-clients";
import { authService } from "../../src/services/auth-service";
import UserRole from "../../src/enums/user-role";
import type { SignInResponse } from "../../src/models/sign-in-response";

vi.mock("../../src/api/api-clients", () => ({
  default: {
    delete: vi.fn(),
    post: vi.fn(),
  },
}));

const mockedDelete = vi.mocked(apiClient.delete);
const mockedPost = vi.mocked(apiClient.post);

describe("authService", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe("signOut", () => {
    it("requests sign-out with the supplied abort signal", async () => {
      const controller = new AbortController();
      mockedDelete.mockResolvedValueOnce({ data: undefined });

      await authService.signOut(controller.signal);

      expect(mockedDelete).toHaveBeenCalledOnce();
      expect(mockedDelete).toHaveBeenCalledWith(
        "/v1/authenticate/sign-out",
        { signal: controller.signal },
      );
    });

    it("propagates API errors", async () => {
      const requestError = new Error("Could not sign out");
      mockedDelete.mockRejectedValueOnce(requestError);

      await expect(authService.signOut()).rejects.toBe(requestError);
    });
  });

  describe("refreshToken", () => {
    it("posts the active role and returns refreshed sign-in data", async () => {
      const controller = new AbortController();
      const payload = { activeRole: UserRole.Admin };
      const responseData: SignInResponse = {
        accessToken: "refreshed-access-token",
        accessTokenExpiresAt: "2026-10-12T16:00:00Z",
      };
      mockedPost.mockResolvedValueOnce({ data: responseData });

      const result = await authService.refreshToken(
        payload,
        controller.signal,
      );

      expect(mockedPost).toHaveBeenCalledOnce();
      expect(mockedPost).toHaveBeenCalledWith(
        "/v1/authenticate/refresh-token",
        payload,
        { signal: controller.signal },
      );
      expect(result).toBe(responseData);
    });

    it("propagates API errors", async () => {
      const requestError = new Error("Could not refresh token");
      mockedPost.mockRejectedValueOnce(requestError);

      await expect(
        authService.refreshToken({ activeRole: null }),
      ).rejects.toBe(requestError);
    });
  });

  describe("signIn", () => {
    it("posts credentials and returns sign-in data", async () => {
      const credentials = {
        email: "user@example.com",
        password: "SecurePassword123!",
      };
      const responseData: SignInResponse = {
        accessToken: "access-token",
        accessTokenExpiresAt: "2026-10-12T16:00:00Z",
      };
      mockedPost.mockResolvedValueOnce({ data: responseData });

      const result = await authService.signIn(credentials);

      expect(mockedPost).toHaveBeenCalledOnce();
      expect(mockedPost).toHaveBeenCalledWith(
        "/v1/authenticate/sign-in",
        credentials,
      );
      expect(result).toBe(responseData);
    });

    it("propagates API errors", async () => {
      const requestError = new Error("Could not sign in");
      mockedPost.mockRejectedValueOnce(requestError);

      await expect(
        authService.signIn({
          email: "user@example.com",
          password: "incorrect",
        }),
      ).rejects.toBe(requestError);
    });
  });

  describe("changePassword", () => {
    it("posts the password change and returns the result", async () => {
      const controller = new AbortController();
      const request = {
        oldPassword: "OldPassword123!",
        newPassword: "NewPassword123!",
      };
      mockedPost.mockResolvedValueOnce({ data: true });

      const result = await authService.changePassword(
        request,
        controller.signal,
      );

      expect(mockedPost).toHaveBeenCalledOnce();
      expect(mockedPost).toHaveBeenCalledWith(
        "/v1/authenticate/change-password",
        request,
        { signal: controller.signal },
      );
      expect(result).toBe(true);
    });

    it("propagates API errors", async () => {
      const requestError = new Error("Could not change password");
      mockedPost.mockRejectedValueOnce(requestError);

      await expect(
        authService.changePassword({
          oldPassword: "incorrect",
          newPassword: "NewPassword123!",
        }),
      ).rejects.toBe(requestError);
    });
  });
});
