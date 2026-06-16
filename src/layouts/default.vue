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
            <v-btn
              variant="text"
              to="/about-us"
              class="text-none"
            >About Us</v-btn>
            <v-btn
              variant="text"
              to="/help-us"
              class="text-none"
            >Help Us</v-btn>
            <v-btn
              variant="text"
              to="/find-a-pet"
              class="text-none"
            >Find a Pet</v-btn>
            <v-btn
              variant="text"
              to="/favorites"
              class="text-none"
            >Favorites</v-btn>
            
            <v-btn
              color="primary"
              variant="elevated"
              rounded="lg"
              to="/auth/sign-in"
              class="text-none ml-4"
            >Sign In</v-btn>
            <v-btn
              color="secondary"
              variant="elevated"
              rounded="lg"
              to="/auth/sign-up"
              class="text-none ml-4"
            >Sign Up</v-btn>
          </template>

          <template v-else>
            <v-menu 
              v-if="authStore.user?.availableRoles && authStore.user.availableRoles.length > 1" 
              transition="slide-y-transition"
            >
              <template v-slot:activator="{ props }">
                <v-chip
                  v-bind="props"
                  color="white"
                  variant="elevated"
                  size="small"
                  class="mr-4 font-weight-bold text-primary"
                  style="cursor: pointer;"
                  append-icon="mdi-chevron-down"
                >
                  {{ authStore.currentRole || "Select Role" }}
                </v-chip>
              </template>

              <v-list
                density="compact"
                class="mt-1 pa-2"
                rounded="lg"
                elevation="3"
                theme="light"
              >
                <v-list-item
                  v-for="role in authStore.user.availableRoles"
                  :key="role"
                  @click="handleRoleSwitch(role)"
                  :active="role === authStore.currentRole"
                  color="primary"
                  rounded="md"
                  class="mb-1"
                >
                  <v-list-item-title class="text-body-2 font-weight-bold">
                    {{ role }}
                  </v-list-item-title>
                </v-list-item>
              </v-list>
            </v-menu>

            <v-chip
              v-else
              color="white"
              variant="elevated"
              size="small"
              class="mr-4 font-weight-bold text-primary"
            >
              {{ authStore.currentRole || "No Role" }}
            </v-chip>

            <v-btn
              color="white"
              variant="outlined"
              rounded="lg"
              @click="handleLogout"
              class="text-none"
            >Sign Out</v-btn>
          </template>
        </div>

        <v-btn
          v-if="!authStore.isAuthenticated"
          icon
          variant="text"
          class="d-md-none text-grey-darken-3"
          @click="isMenuOpen = !isMenuOpen"
        >
          <v-icon size="32">{{ isMenuOpen ? 'mdi-close' : 'mdi-menu' }}</v-icon>
        </v-btn>
      </v-container>
    </v-app-bar>

    <v-expand-transition>
      <div
        v-if="isMenuOpen && !authStore.isAuthenticated"
        class="mobile-menu-overlay d-md-none bg-white"
      >
        <v-container class="d-flex flex-column h-100 pa-6">
          <div class="d-flex flex-column gap-3 w-100 mt-4">
            <v-btn
              variant="outlined"
              rounded="lg"
              block
              class="custom-menu-btn text-none justify-start text-grey-darken-4"
              @click="closeMenuAndNavigate('/about-us')"
            >About Us</v-btn>
            <v-btn
              variant="outlined"
              rounded="lg"
              block
              class="custom-menu-btn text-none justify-start text-grey-darken-4"
              @click="closeMenuAndNavigate('/help-us')"
            >Help Us</v-btn>
            <v-btn
              variant="outlined"
              rounded="lg"
              block
              class="custom-menu-btn text-none justify-start text-grey-darken-4"
              @click="closeMenuAndNavigate('/find-a-pet')"
            >Find a Pet</v-btn>
            <v-btn
              variant="outlined"
              rounded="lg"
              block
              class="custom-menu-btn text-none justify-start text-grey-darken-4"
              @click="closeMenuAndNavigate('/favorites')"
            >Favorites</v-btn>
            <v-btn
              variant="outlined"
              rounded="lg"
              block
              class="custom-menu-btn text-none justify-start text-grey-darken-4"
              @click="closeMenuAndNavigate('/auth/sign-in')"
            >Log In</v-btn>
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
          to="/"
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
  import { ref } from "vue";
  import { useRouter } from "vue-router";
  import { useAuthStore } from "../stores/auth-store";

  const router = useRouter();
  const authStore = useAuthStore();

  const isMenuOpen = ref(false);
  
  const isSidebarOpen = ref(true); 
  const isRail = ref(false);      

  const closeMenuAndNavigate = (path: string) => {
    isMenuOpen.value = false;
    router.push(path);
  };

  const handleLogout = async () => {
    isMenuOpen.value = false;
    await authStore.logout();
    router.push("/auth/sign-in");
  };

  // Метод переключения роли
  const handleRoleSwitch = async (targetRole: string) => {
    if (targetRole === authStore.currentRole) {
      return;
    }
    // Вызывает экшен стора, выполняющий запрос к .NET и роутинг на "/"
    await authStore.switchContext(targetRole);
  };
</script>