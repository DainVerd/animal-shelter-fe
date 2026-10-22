import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { createPinia, setActivePinia } from "pinia";
import { useAuthStore } from "../../src/stores/auth-store";
import { authService } from "../../src/services/auth-service";
import { invitationService } from "../../src/services/invitation-service";
import { meService } from "../../src/services/me-service";
import { ApiError } from "../../src/models/api-error";
import UserRole from "../../src/enums/user-role";
import type { UserProfile } from "../../src/models/user-profile";

vi.mock("../../src/services/auth-service", () => ({
  authService: {
    refreshToken: vi.fn(),
    signIn: vi.fn(),
    signOut: vi.fn(),
  },
}));

vi.mock("../../src/services/invitation-service", () => ({
  invitationService: {
    acceptInvite: vi.fn(),
  },
}));

vi.mock("../../src/services/me-service", () => ({
  meService: {
    getCurrentUser: vi.fn(),
    selectRole: vi.fn(),
  },
}));

const mockedAuthService = vi.mocked(authService);
const mockedInvitationService = vi.mocked(invitationService);
const mockedMeService = vi.mocked(meService);

const createProfile = (
  overrides: Partial<UserProfile> = {},
): UserProfile => ({
  id: 12,
  email: "user@example.com",
  userName: "Shelter User",
  activeRole: UserRole.User,
  availableRoles: [UserRole.User, UserRole.ShelterWorker],
  requiresPasswordChange: false,
  ...overrides,
});

const createApiError = (errors?: string[]) =>
  new ApiError({
    status: 400,
    title: "Request failed",
    detail: "The request was rejected",
    errors,
  });

describe("auth store", () => {
  beforeEach(() => {
    setActivePinia(createPinia());
    vi.clearAllMocks();
    vi.spyOn(console, "error").mockImplementation(() => undefined);
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("starts unauthenticated", () => {
    const store = useAuthStore();

    expect(store.accessToken).toBeNull();
    expect(store.user).toBeNull();
    expect(store.isAuthenticated).toBe(false);
    expect(store.isFullyAuthenticated).toBe(false);
    expect(store.needsRoleSelection).toBe(false);
    expect(store.currentRole).toBeNull();
  });

  it("sets authentication data and computed state", () => {
    const store = useAuthStore();
    const profile = createProfile();

    store.setAuthData("access-token", profile);

    expect(store.accessToken).toBe("access-token");
    expect(store.user).toEqual(profile);
    expect(store.isAuthenticated).toBe(true);
    expect(store.isFullyAuthenticated).toBe(true);
    expect(store.needsRoleSelection).toBe(false);
    expect(store.currentRole).toBe(UserRole.User);
  });

  it("requires role selection for a user without an active role", () => {
    const store = useAuthStore();

    store.setAuthData(
      "access-token",
      createProfile({ activeRole: UserRole.NoRoleSelected }),
    );

    expect(store.needsRoleSelection).toBe(true);
    expect(store.isFullyAuthenticated).toBe(false);
  });

  describe("fetchUserProfile", () => {
    it("loads and stores the current profile", async () => {
      const store = useAuthStore();
      const controller = new AbortController();
      const profile = createProfile();
      mockedMeService.getCurrentUser.mockResolvedValueOnce(profile);

      const result = await store.fetchUserProfile(controller.signal);

      expect(mockedMeService.getCurrentUser).toHaveBeenCalledWith(
        controller.signal,
      );
      expect(store.user).toEqual(profile);
      expect(result).toEqual({ success: true });
    });

    it("returns API validation errors", async () => {
      const store = useAuthStore();
      mockedMeService.getCurrentUser.mockRejectedValueOnce(
        createApiError(["Profile is unavailable"]),
      );

      await expect(store.fetchUserProfile()).resolves.toEqual({
        success: false,
        errorMessages: ["Profile is unavailable"],
      });
    });

    it("returns a generic error for an unexpected failure", async () => {
      const store = useAuthStore();
      mockedMeService.getCurrentUser.mockRejectedValueOnce(
        new Error("Network failure"),
      );

      await expect(store.fetchUserProfile()).resolves.toEqual({
        success: false,
        errorMessages: ["Failed to load profile"],
      });
    });
  });

  describe("login", () => {
    it("signs in, stores the token, and loads the profile", async () => {
      const store = useAuthStore();
      const credentials = {
        email: "user@example.com",
        password: "SecurePassword123!",
      };
      const profile = createProfile();
      mockedAuthService.signIn.mockResolvedValueOnce({
        accessToken: "access-token",
        accessTokenExpiresAt: "2026-10-12T16:00:00Z",
      });
      mockedMeService.getCurrentUser.mockResolvedValueOnce(profile);

      const result = await store.login(credentials);

      expect(mockedAuthService.signIn).toHaveBeenCalledWith(credentials);
      expect(mockedMeService.getCurrentUser).toHaveBeenCalledWith(undefined);
      expect(store.accessToken).toBe("access-token");
      expect(store.user).toEqual(profile);
      expect(result).toEqual({ success: true });
    });

    it("returns API errors when sign-in fails", async () => {
      const store = useAuthStore();
      mockedAuthService.signIn.mockRejectedValueOnce(
        createApiError(["Invalid credentials"]),
      );

      await expect(
        store.login({ email: "user@example.com", password: "incorrect" }),
      ).resolves.toEqual({
        success: false,
        errorMessages: ["Invalid credentials"],
      });
    });
  });

  describe("logout", () => {
    it("signs out and clears authentication state", async () => {
      const store = useAuthStore();
      store.setAuthData("access-token", createProfile());
      mockedAuthService.signOut.mockResolvedValueOnce(undefined);

      await store.logout();

      expect(mockedAuthService.signOut).toHaveBeenCalledOnce();
      expect(store.accessToken).toBeNull();
      expect(store.user).toBeNull();
    });

    it("still clears authentication state when sign-out fails", async () => {
      const store = useAuthStore();
      store.setAuthData("access-token", createProfile());
      mockedAuthService.signOut.mockRejectedValueOnce(
        new Error("Network failure"),
      );

      await store.logout();

      expect(store.accessToken).toBeNull();
      expect(store.user).toBeNull();
    });
  });

  describe("acceptInvite", () => {
    it("accepts an invitation and loads the new profile", async () => {
      const store = useAuthStore();
      const profile = createProfile();
      mockedInvitationService.acceptInvite.mockResolvedValueOnce({
        accessToken: "invited-user-token",
        accessTokenExpiresAt: "2026-10-12T16:00:00Z",
      });
      mockedMeService.getCurrentUser.mockResolvedValueOnce(profile);

      const result = await store.acceptInvite(
        "invite-token",
        "SecurePassword123!",
      );

      expect(mockedInvitationService.acceptInvite).toHaveBeenCalledWith({
        token: "invite-token",
        password: "SecurePassword123!",
      });
      expect(store.accessToken).toBe("invited-user-token");
      expect(store.user).toEqual(profile);
      expect(result).toEqual({ success: true });
    });

    it("clears state when loading the invited user's profile fails", async () => {
      const store = useAuthStore();
      mockedInvitationService.acceptInvite.mockResolvedValueOnce({
        accessToken: "invited-user-token",
        accessTokenExpiresAt: "2026-10-12T16:00:00Z",
      });
      mockedMeService.getCurrentUser.mockRejectedValueOnce(
        new Error("Network failure"),
      );

      const result = await store.acceptInvite("invite-token", "password");

      expect(result).toEqual({
        success: false,
        errorMessages: ["Failed to load profile"],
      });
      expect(store.accessToken).toBeNull();
      expect(store.user).toBeNull();
    });

    it("returns API errors and clears state when acceptance fails", async () => {
      const store = useAuthStore();
      store.setAuthData("old-token", createProfile());
      mockedInvitationService.acceptInvite.mockRejectedValueOnce(
        createApiError(["Invitation has expired"]),
      );

      const result = await store.acceptInvite("expired-token", "password");

      expect(result).toEqual({
        success: false,
        errorMessages: ["Invitation has expired"],
      });
      expect(store.accessToken).toBeNull();
      expect(store.user).toBeNull();
    });
  });

  describe("switchContext", () => {
    it("rejects a role that is not available", async () => {
      const store = useAuthStore();
      store.setAuthData("access-token", createProfile());

      const result = await store.switchContext(UserRole.Admin);

      expect(result).toEqual({
        success: false,
        errorMessages: ["Role is not available"],
      });
      expect(mockedMeService.selectRole).not.toHaveBeenCalled();
    });

    it("does not request a token when the role is already active", async () => {
      const store = useAuthStore();
      store.setAuthData("access-token", createProfile());

      await expect(store.switchContext(UserRole.User)).resolves.toEqual({
        success: true,
      });
      expect(mockedMeService.selectRole).not.toHaveBeenCalled();
    });

    it("switches role and replaces the access token", async () => {
      const store = useAuthStore();
      store.setAuthData("old-token", createProfile());
      mockedMeService.selectRole.mockResolvedValueOnce({
        token: "new-token",
        expiresAt: new Date("2026-10-12T16:00:00Z"),
      });

      const result = await store.switchContext(UserRole.ShelterWorker);

      expect(mockedMeService.selectRole).toHaveBeenCalledWith(
        UserRole.ShelterWorker,
      );
      expect(store.accessToken).toBe("new-token");
      expect(store.user?.activeRole).toBe(UserRole.ShelterWorker);
      expect(result).toEqual({ success: true });
    });

    it("keeps the existing state when switching roles fails", async () => {
      const store = useAuthStore();
      const profile = createProfile();
      store.setAuthData("old-token", profile);
      mockedMeService.selectRole.mockRejectedValueOnce(
        createApiError(["Role change rejected"]),
      );

      const result = await store.switchContext(UserRole.ShelterWorker);

      expect(result).toEqual({
        success: false,
        errorMessages: ["Role change rejected"],
      });
      expect(store.accessToken).toBe("old-token");
      expect(store.user?.activeRole).toBe(UserRole.User);
    });
  });

  describe("refreshAccessToken", () => {
    it("refreshes using the active role", async () => {
      const store = useAuthStore();
      store.setAuthData("old-token", createProfile());
      mockedAuthService.refreshToken.mockResolvedValueOnce({
        accessToken: "new-token",
        accessTokenExpiresAt: "2026-10-12T16:00:00Z",
      });

      await expect(store.refreshAccessToken()).resolves.toBe(true);

      expect(mockedAuthService.refreshToken).toHaveBeenCalledWith({
        activeRole: UserRole.User,
      });
      expect(store.accessToken).toBe("new-token");
    });

    it("sends no role while role selection is required", async () => {
      const store = useAuthStore();
      store.setAuthData(
        "old-token",
        createProfile({ activeRole: UserRole.NoRoleSelected }),
      );
      mockedAuthService.refreshToken.mockResolvedValueOnce({
        accessToken: "new-token",
        accessTokenExpiresAt: "2026-10-12T16:00:00Z",
      });

      await store.refreshAccessToken();

      expect(mockedAuthService.refreshToken).toHaveBeenCalledWith({
        activeRole: null,
      });
    });

    it("clears state when refresh fails", async () => {
      const store = useAuthStore();
      store.setAuthData("old-token", createProfile());
      mockedAuthService.refreshToken.mockRejectedValueOnce(
        new Error("Refresh failed"),
      );

      await expect(store.refreshAccessToken()).resolves.toBe(false);
      expect(store.accessToken).toBeNull();
      expect(store.user).toBeNull();
    });
  });

  describe("initialize", () => {
    it("does nothing when there is no persisted user", async () => {
      const store = useAuthStore();

      await store.initialize();

      expect(mockedAuthService.refreshToken).not.toHaveBeenCalled();
    });

    it("refreshes once for a persisted user", async () => {
      const store = useAuthStore();
      store.user = createProfile();
      mockedAuthService.refreshToken.mockResolvedValueOnce({
        accessToken: "new-token",
        accessTokenExpiresAt: "2026-10-12T16:00:00Z",
      });

      const firstInitialization = store.initialize();
      const secondInitialization = store.initialize();

      await Promise.all([firstInitialization, secondInitialization]);
      expect(mockedAuthService.refreshToken).toHaveBeenCalledOnce();
      expect(store.accessToken).toBe("new-token");
    });
  });

  it("reloads the profile after a password change", async () => {
    const store = useAuthStore();
    const profile = createProfile({ requiresPasswordChange: false });
    mockedMeService.getCurrentUser.mockResolvedValueOnce(profile);

    await store.completePasswordChange();

    expect(mockedMeService.getCurrentUser).toHaveBeenCalledWith(undefined);
    expect(store.user).toEqual(profile);
  });
});
