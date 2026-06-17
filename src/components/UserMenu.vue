<template>
  <v-menu
    rounded="xl"
    transition="slide-y-transition"
    :close-on-content-click="true"
    offset="8"
  >
    <template v-slot:activator="{ props }">
      <v-btn
        v-bind="props"
        variant="text"
        class="px-2 rounded-pill h-auto py-1 text-none"
        color="white"
      >
        <div class="d-flex align-center gap-3">
          <div class="d-none d-sm-flex flex-column align-end text-right">
            <span class="text-body-2 font-weight-bold text-white" style="line-height: 1.2;">
              {{ authStore.user?.fullName || 'Shelter User' }}
            </span>
            <span class="text-caption text-white opacity-70">
              {{ authStore.user?.email || 'user@pets.lv' }}
            </span>
          </div>
          
          <AvatarIcon :name="authStore.user?.fullName" size="40" />
        </div>
      </v-btn>
    </template>

    <v-card 
      min-width="280" 
      class="pb-2" 
      elevation="8"
      style="border: 1px solid rgb(var(--v-theme-border-grey))"
      color="white"
      theme="light"
    >
      <v-card-text class="text-center pt-6 pb-4">
        <AvatarIcon :name="authStore.user?.fullName" size="64" class="mb-3 elevation-2" />
        
        <div class="text-h6 font-weight-bold text-main-black">
          {{ authStore.user?.fullName || 'Shelter User' }}
        </div>
        
        <div class="text-body-2 text-main-grey mb-3">
          {{ authStore.user?.email || 'user@pets.lv' }}
        </div>

        <v-chip size="small" color="primary" variant="tonal" class="font-weight-bold px-4">
          {{ formatRoleName(authStore.currentRole) }}
        </v-chip>
      </v-card-text>

      <v-divider class="mx-4 mb-2" color="border-grey"></v-divider>

      <v-list density="compact" nav class="px-2 bg-white">
        <v-list-item
          prepend-icon="mdi-account-cog-outline"
          title="Account Settings"
          to="/settings/profile"
          rounded="lg"
          class="mb-1 text-main-black"
          base-color="main-black"
        ></v-list-item>
        
        <v-list-item
          prepend-icon="mdi-logout"
          title="Sign Out"
          @click="handleLogout"
          color="error"
          base-color="error"
          rounded="lg"
          class="text-error font-weight-medium"
        ></v-list-item>
      </v-list>
    </v-card>
  </v-menu>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';
import { useAuthStore } from '../stores/auth-store';
import AvatarIcon from './AvatarIcon.vue';
import { formatRoleName } from '../utils/role-formatter';

const router = useRouter();
const authStore = useAuthStore();

const handleLogout = async () => {
  await authStore.logout();
  router.push('/auth/sign-in');
};
</script>

<style scoped>
.gap-3 {
  gap: 12px;
}
</style>