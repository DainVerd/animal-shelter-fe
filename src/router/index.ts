/**
 * router/index.ts
 *
 * Automatic routes for `./src/pages/*.vue`
 */

// Composables
import { createRouter, createWebHistory } from "vue-router";
import { routes } from "vue-router/auto-routes";
import { setupLayouts } from "virtual:generated-layouts";
import { useAuthStore } from "../stores/auth-store";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: setupLayouts(routes),
});

router.beforeEach((to) => {
  const authStore = useAuthStore();
  
  const isAuthenticated = authStore.isAuthenticated;
  const isContextSelected = authStore.isContextSelected;
  const requiresAuth = to.meta.requiresAuth;
  const requiresGuest = to.meta.requiresGuest;

  // 1. if page want auth and user is not auth quit
  if (requiresAuth && !isAuthenticated) {
    return "/auth/sign-in";
  } 
  
  // 2. If user is auth and goes to system but not selected still role 
  if (requiresAuth && isAuthenticated && !isContextSelected && to.path !== "/auth/select-role") {
    return "/auth/select-role";
  }

  // 3. if auth with role, but goes to sign in page
  if (requiresGuest && isAuthenticated) {
    return "/";
  }
});

export default router;