import { defineStore } from "pinia";
import { ref, computed } from "vue";
import type { UserProfile } from "../models/user-profile";
import type { UserRoleContext } from "../models/user-role-context";
import { authService } from "../services/auth-service";
import { meService } from "../services/me-service";

import router from "../router";

export const useAuthStore = defineStore(
  "auth",
  () => {
    // --- State  ---
    const accessToken = ref<string | null>(null);
    const user = ref<UserProfile | null>(null);
    const activeContext = ref<UserRoleContext | null>(null);

    // --- Getters (now is computed) ---
    const isAuthenticated = computed(() => !!accessToken.value);
    const isContextSelected = computed(() => !!activeContext.value);
    const currentRole = computed(() => activeContext.value?.role || null);

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

          // logic to find person
          const activeRole = (response.data as any).activeRole;
          if (activeRole) {
            const found = user.value.availableContexts?.find(
              (c) => c.role === activeRole,
            );
            activeContext.value = found || {
              role: activeRole,
              organizationId: "",
              organizationName: "",
            };
          }
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
      activeContext.value = null;
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
      if (!user.value || !user.value.availableContexts) {
        return;
      }

      const foundContext = user.value.availableContexts.find(
        (context) => context.role === targetRole
      );

      // If we want to switch to the same role or role was not found - do nothing
      if (!foundContext || activeContext.value?.role === targetRole) {
        return;
      }

      try {
        // 1. Sending data to BE to get new token from selected role
        const response = await meService.selectRole(targetRole);

        if (response.isSuccess && response.data) {
          // 2. setting new token after success
          accessToken.value = response.data.token;
          
          // 3. update UI context
          activeContext.value = foundContext;
          
          // 4. update user profile 
          await fetchUserProfile();

          // 5. redirect user to dashboard
          router.push("/");
        } else {
          console.error("Failed to change role. BE returned error");
        }
      } catch (e) {
        console.error("Exception during role change request:", e);
      }
    }

    return {
      accessToken,
      user,
      activeContext,
      isAuthenticated,
      isContextSelected,
      currentRole,
      setAuthData,
      fetchUserProfile,
      login,
      logout,
      switchContext
    };
  },
  {
    persist: true,
  } as any
);
