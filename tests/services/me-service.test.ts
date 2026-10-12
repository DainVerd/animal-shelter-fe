import { beforeEach, describe, expect, it, vi } from "vitest";
import apiClient from "../../src/api/api-clients";
import { meService } from "../../src/services/me-service";
import UserRole from "../../src/enums/user-role";
import type Role from "../../src/models/role";
import type TokenResponse from "../../src/models/token-response";
import type { UserProfile } from "../../src/models/user-profile";

vi.mock("../../src/api/api-clients", () => ({
  default: {
    get: vi.fn(),
    post: vi.fn(),
  },
}));

const mockedGet = vi.mocked(apiClient.get);
const mockedPost = vi.mocked(apiClient.post);

describe("meService", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe("getAvailableRoles", () => {
    it("requests and returns the current user's available roles", async () => {
      const controller = new AbortController();
      const roles: Role[] = [
        {
          title: "User",
          description: "Animal shelter user",
          icon: "mdi-account",
          color: "primary",
          roleCode: UserRole.User,
        },
      ];
      mockedGet.mockResolvedValueOnce({ data: roles });

      const result = await meService.getAvailableRoles(controller.signal);

      expect(mockedGet).toHaveBeenCalledOnce();
      expect(mockedGet).toHaveBeenCalledWith("/v1/me/available-roles", {
        signal: controller.signal,
      });
      expect(result).toBe(roles);
    });

    it("propagates API errors", async () => {
      const requestError = new Error("Could not load roles");
      mockedGet.mockRejectedValueOnce(requestError);

      await expect(meService.getAvailableRoles()).rejects.toBe(requestError);
    });
  });

  describe("selectRole", () => {
    it("posts the selected role and returns the token", async () => {
      const controller = new AbortController();
      const tokenResponse: TokenResponse = {
        token: "access-token",
        expiresAt: new Date("2026-10-12T15:00:00Z"),
      };
      mockedPost.mockResolvedValueOnce({ data: tokenResponse });

      const result = await meService.selectRole(
        UserRole.ShelterWorker,
        controller.signal,
      );

      expect(mockedPost).toHaveBeenCalledOnce();
      expect(mockedPost).toHaveBeenCalledWith(
        "/v1/me/select-role",
        { roleCode: UserRole.ShelterWorker },
        { signal: controller.signal },
      );
      expect(result).toBe(tokenResponse);
    });

    it("propagates API errors", async () => {
      const requestError = new Error("Could not select role");
      mockedPost.mockRejectedValueOnce(requestError);

      await expect(meService.selectRole(UserRole.User)).rejects.toBe(
        requestError,
      );
    });
  });

  describe("getCurrentUser", () => {
    it("requests and returns the current user's profile", async () => {
      const profile: UserProfile = {
        id: 12,
        email: "user@example.com",
        userName: "Shelter User",
        activeRole: UserRole.User,
        availableRoles: [UserRole.User],
        requiresPasswordChange: false,
      };
      mockedGet.mockResolvedValueOnce({ data: profile });

      const result = await meService.getCurrentUser();

      expect(mockedGet).toHaveBeenCalledOnce();
      expect(mockedGet).toHaveBeenCalledWith("/v1/me/profile", {
        signal: undefined,
      });
      expect(result).toBe(profile);
    });

    it("propagates API errors", async () => {
      const requestError = new Error("Could not load profile");
      mockedGet.mockRejectedValueOnce(requestError);

      await expect(meService.getCurrentUser()).rejects.toBe(requestError);
    });
  });
});
