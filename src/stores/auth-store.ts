import { defineStore } from "pinia";
import { ref, computed } from "vue";
import type { UserProfile } from "../models/user-profile";
import type { UserRoleContext } from "../models/user-role-context";
import { authService } from "../services/auth-service";
import { meService } from "../services/me-service";

export const useAuthStore = defineStore(
  "auth",
  () => {
    // --- State  ---
    const accessToken = ref<string | null>(null);
    const user = ref<UserProfile | null>(null);
    const activeContext = ref<UserRoleContext | null>(null);

    // --- Getters (теперь это computed) ---
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
        accessToken.value = response.data.accessToken;
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
    };
  },
  {
    persist: true,
  } as any
);
