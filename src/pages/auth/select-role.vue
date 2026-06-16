<route lang="json">
{
  "meta": {
    "requiresAuth": true,
    "layout": "auth" 
  }
}
</route>
<template>
  <v-container class="fill-height d-flex align-center justify-center">
    <v-card
      width="400"
      class="pa-6 text-center"
      rounded="xl"
      elevation="4"
    >
      <v-card-item>
        <v-icon
          icon="mdi-shield-account"
          size="48"
          color="primary"
          class="mb-2"
        />
        <v-card-title class="text-h5 font-weight-bold">Chose role</v-card-title>
        <v-card-subtitle class="text-wrap mt-1">
          To continue you must select role
        </v-card-subtitle>
      </v-card-item>

      <v-card-text class="mt-4">
        <v-btn
          v-for="role in authStore.user?.availableRoles"
          :key="role"
          block
          size="large"
          color="primary"
          variant="tonal"
          class="mb-3 text-none font-weight-bold"
          rounded="lg"
          prepend-icon="mdi-account-circle-outline"
          @click="selectRole(role)"
        >
          {{ role }}
        </v-btn>
      </v-card-text>

      <v-card-actions>
        <v-btn
          block
          variant="text"
          color="error"
          class="text-none"
          @click="authStore.logout()"
        >
          Back (Quit)
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-container>
</template>

<script setup lang="ts">
    import { useAuthStore } from "../../stores/auth-store";

    const authStore = useAuthStore();

    const selectRole = async (role: string) => {
      console.log("role", role);
        await authStore.switchContext(role);
    };
</script>