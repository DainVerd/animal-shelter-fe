import { beforeEach, describe, expect, it, vi } from "vitest";
import apiClient from "../../src/api/api-clients";
import {
  invitationService,
  type SignInResponseDto,
} from "../../src/services/invitation-service";
import InviteStatus from "../../src/enums/invite-status";
import type { PaginatedList } from "../../src/models/paginated-list";
import type { UserInvite } from "../../src/models/user-invite";

vi.mock("../../src/api/api-clients", () => ({
  default: {
    get: vi.fn(),
    post: vi.fn(),
  },
}));

const mockedGet = vi.mocked(apiClient.get);
const mockedPost = vi.mocked(apiClient.post);

describe("invitationService", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe("sendInvite", () => {
    it("posts the invitation and returns its identifier", async () => {
      const request = {
        email: "volunteer@example.com",
        roles: ["User", "ShelterWorker"],
      };
      mockedPost.mockResolvedValueOnce({ data: 42 });

      const result = await invitationService.sendInvite(request);

      expect(mockedPost).toHaveBeenCalledOnce();
      expect(mockedPost).toHaveBeenCalledWith("/v1/invites", request);
      expect(result).toBe(42);
    });

    it("propagates API errors", async () => {
      const requestError = new Error("Could not send invitation");
      mockedPost.mockRejectedValueOnce(requestError);

      await expect(
        invitationService.sendInvite({
          email: "volunteer@example.com",
          roles: ["User"],
        }),
      ).rejects.toBe(requestError);
    });
  });

  describe("acceptInvite", () => {
    it("posts the invite credentials and returns sign-in data", async () => {
      const request = {
        token: "invite-token",
        password: "SecurePassword123!",
      };
      const responseData: SignInResponseDto = {
        accessToken: "access-token",
        accessTokenExpiresAt: "2026-10-12T15:00:00Z",
      };
      mockedPost.mockResolvedValueOnce({ data: responseData });

      const result = await invitationService.acceptInvite(request);

      expect(mockedPost).toHaveBeenCalledOnce();
      expect(mockedPost).toHaveBeenCalledWith(
        "/v1/invites/accept",
        request,
      );
      expect(result).toBe(responseData);
    });

    it("propagates API errors", async () => {
      const requestError = new Error("Could not accept invitation");
      mockedPost.mockRejectedValueOnce(requestError);

      await expect(
        invitationService.acceptInvite({
          token: "invalid-token",
          password: "SecurePassword123!",
        }),
      ).rejects.toBe(requestError);
    });
  });

  describe("getInvites", () => {
    it("requests and returns a filtered page of invitations", async () => {
      const params = {
        pageNumber: 2,
        pageSize: 10,
        sortBy: "createdAt",
        isDescending: true,
        emailSearchText: "volunteer",
        roleInclude: "User",
        status: InviteStatus.Pending,
      };
      const responseData: PaginatedList<UserInvite> = {
        items: [
          {
            id: 42,
            email: "volunteer@example.com",
            roles: ["User"],
            expiresAt: "2026-10-19T12:00:00Z",
            acceptedAt: null,
            status: InviteStatus.Pending,
            invitedBy: {
              id: 1,
              email: "admin@example.com",
              displayName: "Admin",
            },
            createdAt: "2026-10-12T12:00:00Z",
            acceptedUser: null,
          },
        ],
        pageNumber: 2,
        totalPages: 4,
        totalCount: 31,
        hasNextPage: true,
        hasPreviousPage: true,
      };
      mockedGet.mockResolvedValueOnce({ data: responseData });

      const result = await invitationService.getInvites(params);

      expect(mockedGet).toHaveBeenCalledOnce();
      expect(mockedGet).toHaveBeenCalledWith("/v1/invites", { params });
      expect(result).toBe(responseData);
    });

    it("propagates API errors", async () => {
      const requestError = new Error("Could not load invitations");
      mockedGet.mockRejectedValueOnce(requestError);

      await expect(
        invitationService.getInvites({ pageNumber: 1, pageSize: 10 }),
      ).rejects.toBe(requestError);
    });
  });
});
