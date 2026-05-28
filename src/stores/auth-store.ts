import { defineStore } from 'pinia'; 
import type { UserProfile } from '../models/user-profile';
import type { UserRoleContext } from '../models/user-role-context';

export const useAuthStore = defineStore('auth', {
  state: () => ({
    accessToken: null as string | null,
    user: null as UserProfile | null,
    activeContext: null as UserRoleContext | null,
  }),

  actions: {
    setAuthData(token: string, user: UserProfile) {
      this.accessToken = token;
      this.user = user;
    },

    setActiveContext(context: UserRoleContext) {
      this.activeContext = context;
    },
    
    logout() {
      this.accessToken = null;
      this.user = null;
      this.activeContext = null;
    }
  },

  getters: {
    isContextSelected: (state) => !!state.activeContext,
  },
  
  persist: true,// to save data in local storage
});