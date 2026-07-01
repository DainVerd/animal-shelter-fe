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
import UserRole from "../enums/user-role";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: setupLayouts(routes)
});

router.beforeEach(async (to, from , next) => {
  const authStore = useAuthStore();
  await authStore.initialize();

  const hasValidRole = authStore.currentRole && authStore.currentRole !== UserRole.NoRoleSelected;

  // 1. protect routes without auth
  if (to.meta.requiresAuth && !authStore.isAuthenticated) {
    return next("/auth/sign-in");
  }

  // 2. if auth , but no valid role, force to select role
  if (
    authStore.isAuthenticated && 
    !hasValidRole && 
    to.path !== "/auth/select-role"
  ) {
    return next("/auth/select-role");
  }

  // 3. redirect to dashbaord
  if (authStore.isAuthenticated && to.path === "/") {
    return next("/dashboard");
  }

  // 4. if valid role and auth user redirect to dashboard
  if (
    authStore.isAuthenticated && 
    hasValidRole && 
    to.path === "/auth/select-role"
  ) {
    return next("/dashboard"); 
  }

  // if not correct role navigate user to forbidden
  if (to.meta.allowedRoles && Array.isArray(to.meta.allowedRoles)) {
    const isAllowed = to.meta.allowedRoles.includes(authStore.currentRole);
    
    if (!isAllowed)
      return next("/forbidden");
  }

  next();
});

export default router;