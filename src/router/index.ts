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

router.beforeEach(async (to, from , next) => {
  const authStore = useAuthStore();

  if (to.meta.requiresAuth && !authStore.isAuthenticated) {
    return next("/auth/sign-in");
  }

  if (
    authStore.isAuthenticated && 
    !authStore.currentRole && 
    to.path !== "/auth/select-role"
  ) {
    return next("/auth/select-role");
  }

  if (
    authStore.isAuthenticated && 
    authStore.currentRole && 
    to.path === "/auth/select-role"
  ) {
    return next("/dashboard"); 
  }

  next();
});

export default router;