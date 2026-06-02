<template>
  <v-app>
    <v-app-bar
      flat
      class="border-b"
      color="white"
      height="64"
    >
      <v-container class="d-flex align-center fill-height">

        <div
          class="text-h5 font-weight-bold brand-logo"
          @click="closeMenuAndNavigate('/')"
        >
          <span class="text-blue-darken-1">Pets</span><span class="text-pink-accent-3">Pets</span>
        </div>

        <v-spacer></v-spacer>

        <div class="d-none d-md-flex align-center gap-1">
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
          >
            Sign In
          </v-btn>
          <v-btn
            color="secondary"
            variant="elevated"
            rounded="lg"
            to="/auth/sign-in"
            class="text-none ml-4"
          >
            Sign Up
          </v-btn>
        </div>

        <v-btn icon
          variant="text"
          class="d-md-none text-grey-darken-3"
          @click="isMenuOpen = !isMenuOpen"
        >
          <v-icon size="32">
            {{ isMenuOpen ? 'mdi-close' : 'mdi-menu' }}
          </v-icon>
        </v-btn>
      </v-container>
    </v-app-bar>

    <v-expand-transition>
      <div
        v-if="isMenuOpen"
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
            >
              About Us
            </v-btn>

            <v-btn
              variant="outlined"
              rounded="lg"
              block
              class="custom-menu-btn text-none justify-start text-grey-darken-4"
              @click="closeMenuAndNavigate('/help-us')"
            >
              Help Us
            </v-btn>

            <v-btn
              variant="outlined"
              rounded="lg"
              block
              class="custom-menu-btn text-none justify-start text-grey-darken-4"
              @click="closeMenuAndNavigate('/find-a-pet')"
            >
              Find a Pet
            </v-btn>

            <v-btn
              variant="outlined"
              rounded="lg"
              block
              class="custom-menu-btn text-none justify-start text-grey-darken-4"
              @click="closeMenuAndNavigate('/favorites')"
            >
              Favorites
            </v-btn>

            <v-btn
              variant="outlined"
              rounded="lg"
              block
              class="custom-menu-btn text-none justify-start text-grey-darken-4"
              @click="closeMenuAndNavigate('/auth/sign-in')"
            >
              Log In
            </v-btn>

            <v-btn
              variant="outlined"
              rounded="lg"
              block
              class="custom-menu-btn text-none justify-start text-grey-darken-4"
              @click="closeMenuAndNavigate('/location')"
            >
              Location
            </v-btn>
          </div>

          <div class="mt-auto pt-8 d-flex align-center justify-space-between w-100 px-2">
            <div class="d-flex gap-4">
              <a
                href="https://facebook.com"
                target="_blank"
                class="text-blue-darken-2 social-icon"
              >
                <v-icon size="28">mdi-facebook</v-icon>
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                class="text-pink-accent-3 social-icon"
              >
                <v-icon size="28">mdi-instagram</v-icon>
              </a>
            </div>
          </div>

        </v-container>
      </div>
    </v-expand-transition>

    <v-main class="bg-grey-lighten-4">
      <router-view />
    </v-main>

    <AppFooter />
  </v-app>
</template>

<script lang="ts" setup>
  import { ref } from "vue";
  import { useRouter } from "vue-router";

  const router = useRouter();
  const isMenuOpen = ref(false);

  const closeMenuAndNavigate = (path: string) => {
    isMenuOpen.value = false;
    router.push(path);
  };
</script>

<style scoped>
  .brand-logo {
    cursor: pointer;
    user-select: none;
  }

  .gap-2 {
    gap: 8px;
  }

  .gap-3 {
    gap: 12px;
  }

  .gap-4 {
    gap: 16px;
  }

  .w-100 {
    width: 100%;
  }

  .h-100 {
    height: 100%;
  }

  .mobile-menu-overlay {
    position: fixed;
    top: 64px;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 999;
    overflow-y: auto;
  }

  .custom-menu-btn {
    height: 54px !important;
    border-color: #adadad !important;
    /* Серый контур как в Figma */
  }

  .custom-menu-btn :deep(.v-btn__content) {
    justify-content: flex-start !important;
    width: 100%;
    font-size: 1rem;
    font-weight: 500;
    padding-left: 8px;
  }

  .social-icon {
    text-decoration: none;
    transition: opacity 0.2s;
  }

  .social-icon:hover {
    opacity: 0.8;
  }
</style>