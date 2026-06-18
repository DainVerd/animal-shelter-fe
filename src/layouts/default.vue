<template>
  <v-app>
    <v-app-bar
      flat
      class="border-b"
      :color="authStore.isAuthenticated ? 'primary' : 'white'"
      :theme="authStore.isAuthenticated ? 'dark' : 'light'"
      height="64"
    >
      <v-container class="d-flex align-center h-100 py-0">
        <AppLogo :is-dark-theme="authStore.isAuthenticated"/>

        <v-spacer></v-spacer>

        <div class="d-none d-md-flex align-center h-100 gap-4">
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
          </template>

          <template v-else>
            <v-menu 
              v-if="showRoleSwitchMenu()" 
              transition="slide-y-transition"
            >
              <template v-slot:activator="{ props }">
                <v-chip
                  v-bind="props"
                  color="white"
                  variant="elevated"
                  size="small"
                  class="font-weight-bold text-primary"
                  style="cursor: pointer;"
                  append-icon="mdi-chevron-down"
                >
                  {{ authStore.currentRole ? formatRoleName(authStore.currentRole) : "Select Role" }}
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
                  v-for="role in authStore.user?.availableRoles"
                  :key="role"
                  @click="handleRoleSwitch(role)"
                  :active="role === authStore.currentRole"
                  color="primary"
                  rounded="md"
                  class="mb-1"
                >
                  <v-list-item-title class="text-body-2 font-weight-bold">
                    {{ formatRoleName(role) }}
                  </v-list-item-title>
                </v-list-item>
              </v-list>
            </v-menu>

            <UserMenu/>
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
      v-if="showSideMenu()"
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
  import { ref } from "vue";
  import { useRouter } from "vue-router";
  import { useAuthStore } from "../stores/auth-store";
  import { formatRoleName } from "../utils/role-formatter";
import UserRole from "../enums/user-role";

  const router = useRouter();
  const authStore = useAuthStore();

  const isMenuOpen = ref(false);
  
  const isSidebarOpen = ref(true); 
  const isRail = ref(false);      

  const showSideMenu = (): boolean => {
    if (!authStore.isAuthenticated)
      return false;

    const currentPath = router.currentRoute.value.path;
    if (currentPath.includes(`/auth/`))
      return false;

    return Boolean(authStore.currentRole && authStore.currentRole.length > 0);
  };

  const closeMenuAndNavigate = (path: string) => {
    isMenuOpen.value = false;
    router.push(path);
  };

  const showRoleSwitchMenu =():boolean => {
    const hasAvailableRoles: boolean = authStore.user != null && authStore.user?.availableRoles !== null && authStore.user.availableRoles.length > 1;
    const hasValidRole : boolean = authStore.user?.activeRole !== UserRole.NoRoleSelected;
    
    return hasAvailableRoles && hasValidRole;
  };

  // to switch role
  const handleRoleSwitch = async (targetRole: string) => {
    if (targetRole === authStore.currentRole) {
      return;
    }
    
    await authStore.switchContext(targetRole);
  };
</script>

<style scoped>
.gap-4 {
  gap: 16px;
}
.gap-3 {
  gap: 12px;
}
</style>