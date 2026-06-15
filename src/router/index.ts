/**
 * router/index.ts
 *
 * Automatic routes for `./src/pages/*.vue`
 */

// Composables
import { createRouter, createWebHistory } from "vue-router/auto";
import { setupLayouts } from "virtual:generated-layouts";
import { useAuthStore } from "../stores/auth-store"; 

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  extendRoutes: setupLayouts,
});

router.beforeEach((to, from, next) => {
  const authStore = useAuthStore();
  
  const isAuthenticated = authStore.isAuthenticated;
  const requiresAuth = to.meta.requiresAuth;
  const requiresGuest = to.meta.requiresGuest;

  if (requiresAuth && !isAuthenticated) {
    // if page need auth but token does not exist , navigate to sign in page
    next("/auth/sign-in") ;
  } else if (requiresGuest && isAuthenticated) {
    // if log in, but wants to navigate to log in page navigate user to dashboard
    next("/") ;
  } else {
    next();
  }
});

export default router;