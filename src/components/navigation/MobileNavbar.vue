<template>
  <v-app-bar
    flat
    class="border-b"
    :color="authStore.isAuthenticated ? 'primary' : 'white'"
    :theme="authStore.isAuthenticated ? 'dark' : 'light'"
    height="64"
  >
    <v-container class="d-flex align-center h-100 py-0">
      <AppLogo :is-dark-theme="authStore.isAuthenticated" />
      <v-spacer></v-spacer>

      <v-btn
        v-if="!authStore.isAuthenticated"
        icon
        variant="text"
        class="text-grey-darken-3"
        @click="isMenuOpen = true"
      >
        <v-icon size="32">mdi-menu</v-icon>
      </v-btn>

      <UserMenu v-else />
    </v-container>
  </v-app-bar>

  <v-dialog
    v-model="isMenuOpen"
    fullscreen
    transition="dialog-bottom-transition"
  >
    <v-sheet
      class="d-flex flex-column"
      style="height: 100vh;"
    >
      <div class="d-flex align-center justify-space-between pa-4 border-b">
        <AppLogo :is-dark-theme="false" />
        <v-btn
          icon
          variant="text"
          class="text-grey-darken-3"
          @click="isMenuOpen = false"
        >
          <v-icon size="28">mdi-close</v-icon>
        </v-btn>
      </div>

      <div class="flex-grow-1 overflow-y-auto pa-6">
        <div class="d-flex flex-column gap-3">
          <v-btn
            v-for="item in menuItems"
            :key="item.to"
            variant="outlined"
            rounded="lg"
            block
            class="text-none justify-start text-grey-darken-4"
            @click="closeMenuAndNavigate(item.to)"
          >{{ item.label }}</v-btn>
        </div>
      </div>

      <div class="d-flex align-center justify-space-between pa-6">
        <div class="d-flex gap-3">
          <v-icon
            icon="mdi-facebook"
            size="24"
            color="grey-darken-3"
          ></v-icon>
          <v-icon
            icon="mdi-instagram"
            size="24"
            color="grey-darken-3"
          ></v-icon>
        </div>
        <span class="text-body-2 text-grey-darken-2">en / sv</span>
      </div>
    </v-sheet>
  </v-dialog>
</template>

<script lang="ts" setup>
  import { ref } from "vue";
  import { useRouter } from "vue-router";
  import { useAuthStore } from "../../stores/auth-store";

  const router = useRouter();
  const authStore = useAuthStore();
  const isMenuOpen = ref(false);

  const menuItems = [
    { label: "About Us", to: "/about-us" },
    { label: "Help Us", to: "/help-us" },
    { label: "Find a Pet", to: "/find-a-pet" },
    { label: "Favorites", to: "/favorites" },
    { label: "Log In", to: "/auth/sign-in" },
  ];

  const closeMenuAndNavigate = (path: string) => {
    isMenuOpen.value = false;
    router.push(path);
  };
</script>

<style scoped>
  .gap-3 {
    gap: 12px;
  }
</style>