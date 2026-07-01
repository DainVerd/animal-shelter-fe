import { defineStore } from "pinia";
import { ref, computed } from "vue";
import type { UserProfile } from "../models/user-profile";
import { authService } from "../services/auth-service";
import { meService } from "../services/me-service";
import { SignInRequest } from "../models/requests/sign-in-request";
import UserRole from "../enums/user-role";
import { ActionResult } from "../models/action-result";

export const useAuthStore = defineStore(
  "auth",
  () => {
    // --- State  ---
    const accessToken = ref<string | null>(null);
    const user = ref<UserProfile | null>(null);
    let initPromise: Promise<void> | null = null;
   
    // --- Getters (now is computed) ---
    const isAuthenticated = computed(() => !!accessToken.value);
    const currentRole = computed(() => user.value?.activeRole || null);
    const needsRoleSelection = computed(
      () => !!user.value && user.value.activeRole === UserRole.NoRoleSelected
    );
    const isFullyAuthenticated = computed(
      () => isAuthenticated.value && !needsRoleSelection.value
    );

    // --- Actions ---
    function setAuthData(token: string, userData: UserProfile) {
      accessToken.value = token;
      user.value = userData;
    }

    async function fetchUserProfile(signal?: AbortSignal): Promise<ActionResult> {
      try {
        const response = await meService.getCurrentUser(signal);
        if (response.isSuccess && response.data) {
          user.value = response.data;
          return { success: true };
        }
        return { success: false, errorMessages: response.errorMessages };
      } catch (e) {
        console.error("Error fetching user profile:", e);
        return { success: false, errorMessages: ["Failed to load profile"] };
      }
    }

    async function login(model: SignInRequest): Promise<ActionResult> {
      try {
        const response = await authService.signIn(model);

        if (response.isSuccess && response.data) {
          accessToken.value = response.data.accessToken;
          await fetchUserProfile();
          return { success: true };
        }
        return { success: false, errorMessages: response.errorMessages };
      } catch (e) {
        console.error("Error during login:", e);
        return { success: false, errorMessages: ["Ошибка сети при входе"] };
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

    async function switchContext(targetRole: UserRole): Promise<ActionResult> {
      if (!user.value || !user.value.availableRoles.includes(targetRole)) {
        return { success: false, errorMessages: ["Role is not available"] };
      }

      if (user.value.activeRole === targetRole) {
        return { success: true };
      }

      try {
        const response = await meService.selectRole(targetRole);

        if (response.isSuccess && response.data) {
          accessToken.value = response.data.token;
          user.value.activeRole = targetRole;
          return { success: true };
        }
        return { success: false, errorMessages: response.errorMessages };
      } catch (e) {
        console.error("Error in role change:", e);
        return { success: false, errorMessages: ["Failed to change role"] };
      }
    }

    async function refreshAccessToken() {
      try {
        const response = await authService.refreshToken();

        // check if we got the data
        if (response.isSuccess && response.data) {
          // setting new access token
          accessToken.value = response.data.accessToken;

          return true;
        }
      } catch (e) {
        console.error("Error during token refresh:", e);
      }

      // if cookie is expired or back end returned 401/500
      // drop auth
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
      needsRoleSelection ,
      initialize
    };
  },
  {
    persist: {
      pick: ["user"],
    },
  }
);
