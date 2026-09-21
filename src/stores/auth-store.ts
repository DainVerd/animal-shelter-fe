import { defineStore } from "pinia";
import { ref, computed } from "vue";
import type { UserProfile } from "../models/user-profile";
import { authService } from "../services/auth-service";
import { meService } from "../services/me-service";
import { SignInRequest } from "../models/requests/sign-in-request";
import UserRole from "../enums/user-role";
import { ActionResult } from "../models/action-result";
import { ApiError } from "../models/api-error";
import { invitationService } from "../services/invitation-service";

export const useAuthStore = defineStore(
  "auth",
  () => {
    const accessToken = ref<string | null>(null);
    const user = ref<UserProfile | null>(null);
    let initPromise: Promise<void> | null = null;

    const isAuthenticated = computed(() => !!accessToken.value);
    const currentRole = computed(() => user.value?.activeRole || null);
    const needsRoleSelection = computed(
      () => !!user.value && user.value.activeRole === UserRole.NoRoleSelected,
    );
    const isFullyAuthenticated = computed(
      () => isAuthenticated.value && !needsRoleSelection.value,
    );

    function setAuthData(token: string, userData: UserProfile) {
      accessToken.value = token;
      user.value = userData;
    }

    async function fetchUserProfile(
      signal?: AbortSignal,
    ): Promise<ActionResult> {
      try {
        const profile = await meService.getCurrentUser(signal);
        user.value = profile;
        return { success: true };
      } catch (e) {
        console.error("Error fetching user profile:", e);
        const message =
          e instanceof ApiError
            ? (e.errors ?? [e.message])
            : ["Failed to load profile"];
        return { success: false, errorMessages: message };
      }
    }

    async function login(model: SignInRequest): Promise<ActionResult> {
      try {
        const response = await authService.signIn(model);
        accessToken.value = response.accessToken;
        await fetchUserProfile();
        return { success: true };
      } catch (e) {
        console.error("Error during login:", e);
        const message =
          e instanceof ApiError
            ? (e.errors ?? [e.message])
            : ["Error to sign in"];
        return { success: false, errorMessages: message };
      }
    }

    function logoutStateOnly() {
      accessToken.value = null;
      user.value = null;
    }

    async function logout() {
      try {
        await authService.signOut();
      } catch (e) {
        console.error(e);
      } finally {
        logoutStateOnly();
      }
    }

    async function acceptInvite(
      token: string,
      password: string,
    ): Promise<ActionResult> {
    try {
      const response = await invitationService.acceptInvite({
        token,
        password,
      });

      accessToken.value = response.accessToken;

      const profileResult = await fetchUserProfile();

      if (!profileResult.success) {
        logoutStateOnly();

        return {
          success: false,
          errorMessages: profileResult.errorMessages,
        };
      }

      return { success: true };
    } catch (e) {
      console.error("Error during invitation acceptance:", e);

      const message =
        e instanceof ApiError
          ? (e.errors ?? [e.message])
          : ["Failed to create account"];

      logoutStateOnly();

      return {
        success: false,
        errorMessages: message,
      };
    }
  }

    async function switchContext(targetRole: UserRole): Promise<ActionResult> {
      if (!user.value || !user.value.availableRoles.includes(targetRole)) {
        return { success: false, errorMessages: ["Role is not available"] };
      }

      if (user.value.activeRole === targetRole) {
        return { success: true };
      }

      try {
        const response = await meService.selectRole(targetRole);
        accessToken.value = response.token;
        user.value.activeRole = targetRole;
        return { success: true };
      } catch (e) {
        console.error("Error in role change:", e);
        const message =
          e instanceof ApiError
            ? (e.errors ?? [e.message])
            : ["Failed to change role"];
        return { success: false, errorMessages: message };
      }
    }

    async function refreshAccessToken() {
      try {
        const roleToSend =
          user.value?.activeRole === UserRole.NoRoleSelected
            ? null
            : user.value?.activeRole || null;

        const response = await authService.refreshToken({
          activeRole: roleToSend,
        });
        accessToken.value = response.accessToken;
        return true;
      } catch (e) {
        console.error("Error during token refresh:", e);
      }

      logoutStateOnly();
      return false;
    }

    function initialize(): Promise<void> {
      if (!initPromise) {
        initPromise = (async () => {
          if (user.value) {
            await refreshAccessToken();
          }
        })();
      }
      return initPromise;
    }

    async function completePasswordChange(): Promise<void> {
      await fetchUserProfile();
    }

    return {
      accessToken,
      user,
      isAuthenticated,
      currentRole,
      setAuthData,
      fetchUserProfile,
      login,
      logout,
      switchContext,
      refreshAccessToken,
      isFullyAuthenticated,
      needsRoleSelection,
      initialize,
      completePasswordChange,
      acceptInvite
    };
  },
  { persist: { pick: ["user"] } },
);
