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

      <div class="d-flex align-center h-100 gap-4">
        <template v-if="!authStore.isAuthenticated">
          <v-btn
            variant="text"
            to="/about-us"
            class="text-none"
            >About Us</v-btn>
          <v-btn
            variant="text"
            to="/help-us"
            class="text-none">Help Us</v-btn>
          <v-btn
            variant="text"
            to="/find-a-pet"
            class="text-none">Find a Pet</v-btn>
          <v-btn
            variant="text"
            to="/favorites"
            class="text-none">Favorites</v-btn>

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

          <UserMenu />
        </template>
      </div>
    </v-container>
  </v-app-bar>

  <v-navigation-drawer
    v-if="showSideMenu"
    v-model="isSidebarOpen"
    :rail="isRail"
    permanent
    elevation="1"
  >
    <div
      class="d-flex align-center pa-2 border-b"
      :class="isRail ? 'justify-center' : 'justify-end'"
    >
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
  <template
    v-for="section in menuSections"
    :key="section.title"
  >
    <template v-if="section.display !== false">
      <!-- Normal section -->
      <template v-if="!section.expandable">
        <v-list-subheader>
          {{ section.title }}
        </v-list-subheader>

        <v-list-item
          v-for="item in section.items"
          :key="item.to"
          :prepend-icon="item.prependIcon"
          :title="item.title"
          :to="item.to"
          color="primary"
        />
      </template>

      <!-- Expandable section -->
      <v-list-group
        v-else
        :value="section.title"
      >
        <template #activator="{ props }">
          <v-list-item
            v-bind="props"
            :prepend-icon="section.prependIcon"
            :title="section.title"
          />
        </template>

        <v-list-item
          v-for="item in section.items"
          :key="item.to"
          :prepend-icon="item.prependIcon"
          :title="item.title"
          :to="item.to"
          color="primary"
        />
      </v-list-group>
    </template>
  </template>
</v-list>
  </v-navigation-drawer>
</template>

<script lang="ts" setup>
  import { ref, computed } from "vue";
  import { useRouter } from "vue-router";
  import { useAuthStore } from "../../stores/auth-store";
  import { formatRoleName } from "../../utils/role-formatter";
  import UserRole from "../../enums/user-role";
  import { useNotificationStore } from "../../stores/notification-store";
  import AppLogo from "../AppLogo.vue";
  import UserMenu from "../UserMenu.vue";

  const router = useRouter();
  const authStore = useAuthStore();
  const notificationStore = useNotificationStore();

  const isSidebarOpen = ref(true);
  const isRail = ref(false);

  const menuSections = computed(() => [
    {
      title: "General",
      expandable: false,
      items: [
        {
          prependIcon: "mdi-view-dashboard",
          title: "Dashboard",
          to: "/dashboard",
        },
        {
          prependIcon: "mdi-paw",
          title: "Animals",
          to: "/animals",
        },
      ],
    },
    {
      title: "Administration",
      prependIcon: "mdi-shield-account",
      expandable: true,
      items: [
        {
          prependIcon: "mdi-account-group",
          title: "Users",
          to: "/admin/users",
        },
        {
          prependIcon: "mdi-account-plus",
          title: "Invitations",
          to: "/admin/invites",
        },
      ],
      display:
        authStore.user?.activeRole === UserRole.Admin ||
        authStore.user?.activeRole === UserRole.SuperAdmin,
    },
  ]);


  const showSideMenu = computed(() => {
    if (!authStore.isAuthenticated)
      return false;

    const currentPath = router.currentRoute.value.path;
    if (currentPath.startsWith("/auth"))
      return false;

    return Boolean(authStore.currentRole);
  });

  const showRoleSwitchMenu = (): boolean => {
    const hasAvailableRoles: boolean =
      authStore.user != null &&
      authStore.user?.availableRoles !== null &&
      authStore.user.availableRoles.length > 1;
    const hasValidRole: boolean = authStore.user?.activeRole !== UserRole.NoRoleSelected;

    return hasAvailableRoles && hasValidRole;
  };

  const handleRoleSwitch = async (targetRole: UserRole) => {
    if (targetRole === authStore.currentRole)
      return;

    const result = await authStore.switchContext(targetRole);
    if (result.success) {
      notificationStore.notify("Role switched successfully", "success");
    } else {
      notificationStore.notify(
        result.errorMessages?.join(", ") ?? "Failed to switch role",
        "error"
      );
    }
  };
</script>

<style scoped>
  .gap-4 {
    gap: 16px;
  }
</style>