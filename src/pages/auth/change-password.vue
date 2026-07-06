<template>
  <v-container class="fill-height justify-center">
    <v-card
      width="400"
      class="pa-4"
    >
      <v-card-title class="text-center">Password Change</v-card-title>
      <v-card-subtitle class="text-center text-wrap mb-4">
        Admin requests what you change password to continue.
      </v-card-subtitle>
      
      <v-alert
        v-if="error"
        type="error"
        variant="tonal"
        class="mb-4
      ">
        {{ error }}
      </v-alert>

      <v-form @submit.prevent="submit">
        <v-text-field
          v-model="oldPassword"
          label="Old Password"
          type="password"
          required
        />
        <v-text-field
          v-model="newPassword"
          label="New Password"
          type="password"
          required
        />
        
        <v-btn
          type="submit"
          color="primary"
          block
          :loading="loading"
          class="mt-4"
        >
          Update Password
        </v-btn>
        <v-btn
          type="reset"
          color="secondary"
          block
          :loading="loading"
          class="mt-4"
          @onclick="signOut"
        >
          Sing Out
        </v-btn>
      </v-form>
    </v-card>
  </v-container>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "../../stores/auth-store";
import { authService } from "../../services/auth-service";

const authStore = useAuthStore();
const router = useRouter();

const oldPassword = ref("");
const newPassword = ref("");
const error = ref<string | null>(null);
const loading = ref(false);

const submit = async () => {
  error.value = null;
  loading.value = true;

  try {
    const response = await authService.changePassword({
      oldPassword: oldPassword.value,
      newPassword: newPassword.value
    });

    if (response.isSuccess) {
      await authStore.completePasswordChange();

      router.push("/dashboard");
    } else {
      error.value = response.errorMessages?.[0] || "Failed to change password!";
    }
  } catch (e) {
    console.error(e);
    error.value = "Bad Request";
  } finally {
    loading.value = false;
  }
};

const signOut = async () => {
  error.value = null;
  loading.value = true;

  try {
    await authStore.logout();

    router.push("/");
    
  } catch (e) {
    console.error(e);
    error.value = "Bad Request";
  } finally {
    loading.value = false;
  }
};
</script>