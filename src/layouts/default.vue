<template>
  <v-app>
    <AppNavbar />

    <v-navigation-drawer
      v-if="showSideMenu"
      v-model="isSidebarOpen"
      :rail="isRail"
      permanent
      elevation="1"
    >
      <div
        class="d-flex align-center pa-2 border-b"
        :class="isRail ? 'justify-center' : 'justify-end'">
        <v-btn
          :icon="isRail ? 'mdi-chevron-right' : 'mdi-chevron-left'"
          variant="text"
          color="grey-darken-2"
          @click="isRail = !isRail"
        ></v-btn>
      </div>

      <v-list
        density="compact"
        nav
        class="mt-2"
      >
        <v-list-item
          prepend-icon="mdi-view-dashboard"
          title="Dashboard"
          to="/dashboard"
          color="primary"
        ></v-list-item>
        <v-list-item
          prepend-icon="mdi-paw"
          title="Animals"
          to="/animals"
          color="primary"
        ></v-list-item>
        <v-list-item
          prepend-icon="mdi-account-group"
          title="Users"
          to="/users"
          color="primary"
        ></v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-main
      class="bg-grey-lighten-4 d-flex flex-column"
      style="min-height: 100vh;"
    >
      <div class="flex-grow-1">
        <router-view />
      </div>
      <AppFooter />
    </v-main>
  </v-app>
</template>

<script lang="ts" setup>
  import { ref, computed } from "vue";
  import { useRouter } from "vue-router";
  import { useAuthStore } from "../stores/auth-store";
  import AppNavbar from "../components/navigation/AppNavbar.vue";

  const router = useRouter();
  const authStore = useAuthStore();

  const isSidebarOpen = ref(true);
  const isRail = ref(false);

  const showSideMenu = computed(() => {
    if (!authStore.isAuthenticated)
      return false;

    const currentPath = router.currentRoute.value.path;
    if (currentPath.startsWith("/auth"))
      return false;

    return Boolean(authStore.currentRole);
  });
</script>