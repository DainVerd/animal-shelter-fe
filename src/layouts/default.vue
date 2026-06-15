<template>
  <v-app>
    <v-app-bar
      flat
      class="border-b"
      :color="authStore.isAuthenticated ? 'primary' : 'white'"
      :theme="authStore.isAuthenticated ? 'dark' : 'light'"
      height="64"
    >
      <v-container class="d-flex align-center fill-height">
        <div
          class="text-h5 font-weight-bold brand-logo"
          @click="closeMenuAndNavigate('/')"
        >
          <span :class="authStore.isAuthenticated ? 'text-white' : 'text-primary'">Pets</span><span class="text-pink-accent-3">Pets</span>
        </div>

        <v-spacer></v-spacer>

        <div class="d-none d-md-flex align-center gap-1">
          <template v-if="!authStore.isAuthenticated">
            <v-btn variant="text" to="/about-us" class="text-none">About Us</v-btn>
            <v-btn variant="text" to="/help-us" class="text-none">Help Us</v-btn>
            <v-btn variant="text" to="/find-a-pet" class="text-none">Find a Pet</v-btn>
            <v-btn variant="text" to="/favorites" class="text-none">Favorites</v-btn>
            
            <v-btn color="primary" variant="elevated" rounded="lg" to="/auth/sign-in" class="text-none ml-4">Sign In</v-btn>
            <v-btn color="secondary" variant="elevated" rounded="lg" to="/auth/sign-up" class="text-none ml-4">Sign Up</v-btn>
          </template>

          <template v-else>
            <v-chip color="white" variant="elevated" size="small" class="mr-4 font-weight-bold text-primary">
              {{ authStore.user?.activeRole || 'Admin' }}
            </v-chip>
            <v-btn color="white" variant="outlined" rounded="lg" @click="handleLogout" class="text-none">Sign Out</v-btn>
          </template>
        </div>

        <v-btn v-if="!authStore.isAuthenticated" icon variant="text" class="d-md-none text-grey-darken-3" @click="isMenuOpen = !isMenuOpen">
          <v-icon size="32">{{ isMenuOpen ? 'mdi-close' : 'mdi-menu' }}</v-icon>
        </v-btn>
      </v-container>
    </v-app-bar>

    <v-expand-transition>
      <div v-if="isMenuOpen && !authStore.isAuthenticated" class="mobile-menu-overlay d-md-none bg-white">
        <v-container class="d-flex flex-column h-100 pa-6">
          <div class="d-flex flex-column gap-3 w-100 mt-4">
            <v-btn variant="outlined" rounded="lg" block class="custom-menu-btn text-none justify-start text-grey-darken-4" @click="closeMenuAndNavigate('/about-us')">About Us</v-btn>
            <v-btn variant="outlined" rounded="lg" block class="custom-menu-btn text-none justify-start text-grey-darken-4" @click="closeMenuAndNavigate('/help-us')">Help Us</v-btn>
            <v-btn variant="outlined" rounded="lg" block class="custom-menu-btn text-none justify-start text-grey-darken-4" @click="closeMenuAndNavigate('/find-a-pet')">Find a Pet</v-btn>
            <v-btn variant="outlined" rounded="lg" block class="custom-menu-btn text-none justify-start text-grey-darken-4" @click="closeMenuAndNavigate('/favorites')">Favorites</v-btn>
            <v-btn variant="outlined" rounded="lg" block class="custom-menu-btn text-none justify-start text-grey-darken-4" @click="closeMenuAndNavigate('/auth/sign-in')">Log In</v-btn>
          </div>
        </v-container>
      </div>
    </v-expand-transition>

    <v-navigation-drawer
      v-if="authStore.isAuthenticated"
      v-model="isSidebarOpen"
      :rail="isRail"
      permanent
      elevation="1"
    >
      <div class="d-flex align-center pa-2 border-b" :class="isRail ? 'justify-center' : 'justify-end'">
        <v-btn
          :icon="isRail ? 'mdi-chevron-right' : 'mdi-chevron-left'"
          variant="text"
          color="grey-darken-2"
          @click="isRail = !isRail"
        ></v-btn>
      </div>

      <v-list density="compact" nav class="mt-2">
        <v-list-item prepend-icon="mdi-view-dashboard" title="Dashboard" to="/" color="primary"></v-list-item>
        <v-list-item prepend-icon="mdi-paw" title="Animals" to="/animals" color="primary"></v-list-item>
        <v-list-item prepend-icon="mdi-account-group" title="Users" to="/users" color="primary"></v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-main class="bg-grey-lighten-4 d-flex flex-column" style="min-height: 100vh;">
      <div class="flex-grow-1">
        <router-view />
      </div>
      <AppFooter />
    </v-main>
  </v-app>
</template>

<script lang="ts" setup>
  import { ref } from "vue";
  import { useRouter } from "vue-router";
  import { useAuthStore } from "../stores/auth-store";

  const router = useRouter();
  const authStore = useAuthStore();

  const isMenuOpen = ref(false);
  
  // Состояния для Твич-сайдбара
  const isSidebarOpen = ref(true); // Всегда true, чтобы сайдбар не исчезал в ноль
  const isRail = ref(false);       // Переключатель узкого/широкого режима (по умолчанию широкий)

  const closeMenuAndNavigate = (path: string) => {
    isMenuOpen.value = false;
    router.push(path);
  };

  const handleLogout = async () => {
    isMenuOpen.value = false;
    await authStore.logout();
    router.push('/auth/sign-in');
  };
</script>