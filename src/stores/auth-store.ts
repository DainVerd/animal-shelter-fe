import { defineStore } from "pinia";
import type { UserProfile } from "../models/user-profile";
import type { UserRoleContext } from "../models/user-role-context";
import { GenericAbortSignal } from "axios";
import { meService } from "../services/me-service";
import { authService } from "../services/auth-service";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    accessToken: null as string | null,
    user: null as UserProfile | null,
    activeContext: null as UserRoleContext | null,
  }),

  getters: {
    isContextSelected: (state) => !!state.activeContext,
    isAuthenticated: (state) => !!state.accessToken,
    currentRoleCode: (state) => state.activeContext?.role || null,
  },

  actions: {
    setAuthData(token: string, user: UserProfile) {
      this.accessToken = token;
      this.user = user;
    },

    setActiveContext(context: UserRoleContext) {
      this.activeContext = context;
    },

    async fetchUserProfile(signal?: GenericAbortSignal) {
      try {
        const response = await meService.getCurrentUser(signal);

        if (response.isSuccess && response.data) {
          this.user = response.data as unknown as UserProfile;

          const activeRoleFromBackend = response.data.activeRole;

          if (activeRoleFromBackend) {
            const matchingContext = this.user?.availableContexts?.find(
              (c) => c.role === activeRoleFromBackend,
            );

            if (matchingContext) {
              this.activeContext = matchingContext;
            } else {
              this.activeContext = {
                role: activeRoleFromBackend,
                organizationId: "",
                organizationName: "",
              };
            }
          }
        }
      } catch (error: any) {
        if (error.name !== "CanceledError") {
          console.error("Error fetching user profile:", error);
        }
      }
    },

    /**
     * this action is triggered by apiclient interceptor when hits 401
     */
    async refreshToken() {
      try {
        const response = await authService.refreshToken();

        if (response.isSuccess && response.data) {
          this.accessToken = response.data.accessToken;
          return response.data.accessToken;
        } else {
          this.accessToken = null;
          this.user = null;
          this.activeContext = null;
          throw new Error("Refresh token invalid");
        }
      } catch (error) {
        this.accessToken = null;
        this.user = null;
        this.activeContext = null;
        throw error;
      }
    },

    async logout() {
      try {
        await authService.signOut();
      } catch (error) {
        console.error("Failed to notify backend about sign-out:", error);
      } finally {
        // Чистим стейт напрямую
        this.accessToken = null;
        this.user = null;
        this.activeContext = null;
      }
    },
  },

  persist: true, // to save data in local storage
});
