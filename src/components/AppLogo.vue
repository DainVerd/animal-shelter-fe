<template>
  <div
    class="text-h5 font-weight-bold brand-logo d-inline-flex align-center select-none"
    @click="navigateHome"
  >
    <span :class="isDarkTheme ? `text-white` : `text-blue-darken-1`">Pets</span><span class="text-pink-accent-3">Pets</span>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from "vue-router";
import { useAuthStore } from "../stores/auth-store";

defineProps<{
  isDarkTheme?: boolean;
}>();

const router = useRouter();
const authStore = useAuthStore();

const navigateHome = () => {
  if (authStore.isAuthenticated && authStore.currentRole) {
    router.push("/dashboard");
  } else {
    router.push("/");
  }
};
</script>

<style scoped>
    .brand-logo {
    cursor: pointer;
    user-select: none;
    transition: opacity 0.2s ease;
    }
    .brand-logo:hover {
    opacity: 0.9;
    }
    .select-none {
    user-select: none;
    }
</style>