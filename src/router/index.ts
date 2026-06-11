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
    // Если страница требует авторизации, а токена нет — на логин
    next("/login") ;
  } else if (requiresGuest && isAuthenticated) {
    // Если залогинен и лезет на страницу логина — на главную (или в админку)
    next("/") ;
  } else {
    next();
  }
});

export default router;