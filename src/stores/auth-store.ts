import { defineStore } from "pinia";
import { ref, computed } from "vue";
import type { UserProfile } from "../models/user-profile";
import { authService } from "../services/auth-service";
import { meService } from "../services/me-service";

import router from "../router";

export const useAuthStore = defineStore(
  "auth",
  () => {
    // --- State  ---
    const accessToken = ref<string | null>(null);
    const user = ref<UserProfile | null>(null);
   
    // --- Getters (now is computed) ---
    const isAuthenticated = computed(() => !!accessToken.value);
    const currentRole = computed(() => user.value?.activeRole || null);

    // --- Actions ---
    function setAuthData(token: string, userData: UserProfile) {
      accessToken.value = token;
      user.value = userData;
    }

    async function fetchUserProfile(signal?: AbortSignal) {
      try {
        const response = await meService.getCurrentUser(signal);
        if (response.isSuccess && response.data) {
          user.value = response.data as UserProfile;
        }
      } catch (e) {
        console.error(e);
      }
    }

    async function login(model: any) {
      const response = await authService.signIn(model);
      
      if (response.isSuccess && response.data) {
        // 1. save token
        accessToken.value = response.data.accessToken;
        
        // 2. load user profile from BE
        await fetchUserProfile();
      }
      
      return response;
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

   async function switchContext(targetRole: string) {
      if (!user.value || !user.value.availableRoles.includes(targetRole)) {
        return;
      }

      if (user.value.activeRole === targetRole) {
        return;
      }

      try {
        const response = await meService.selectRole(targetRole);

        if (response.isSuccess && response.data) {
          accessToken.value = response.data.token;
          
          // update current role of user
          user.value.activeRole = targetRole;
          
        }
      } catch (e) {
        console.error("Error in role change", e);
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
      refreshAccessToken
    };
  },
  {
    persist: true,
  } as any
);
