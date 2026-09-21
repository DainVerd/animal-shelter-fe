<template>
  <template v-if="!authStore.isAuthenticated">
    <v-footer class="bg-main-grey text-white py-10">
      <v-container>
        <v-row justify="space-between">
          <v-col
            cols="7"
            sm="4"
            md="3"
            class="order-1"
          >
            <v-toolbar-title class="font-weight-bold text-primary mb-4 px-0">
              <AppLogo is-dark-theme />
            </v-toolbar-title>

            <div class="d-flex flex-column align-start custom-links">
              <v-btn
                variant="text"
                to="/about-us"
                class="text-none px-0 text-grey-lighten-1"
              >
                About Us
              </v-btn>

              <v-btn
                variant="text"
                to="/help-us"
                class="text-none px-0 text-grey-lighten-1"
              >
                Help Us
              </v-btn>

              <v-btn
                variant="text"
                to="/find-a-pet"
                class="text-none px-0 text-grey-lighten-1"
              >
                Find a Pet
              </v-btn>

              <v-btn
                variant="text"
                to="/favorites"
                class="text-none px-0 text-grey-lighten-1"
              >
                Favorites
              </v-btn>
            </div>
          </v-col>

          <v-col
            cols="5"
            sm="2"
            class="order-2 order-sm-3 d-flex flex-column align-end align-sm-center justify-start pt-4 pt-sm-0"
          >
            <div class="d-flex flex-column align-end align-sm-center gap-2">
              <a
                v-for="item in items"
                :key="item.title"
                :href="item.href"
                :title="item.title"
                class="d-inline-block my-1 social-link text-white"
                rel="noopener noreferrer"
                target="_blank"
              >
                <v-icon
                  :icon="item.icon"
                  :size="item.icon === `$vuetify` ? 32 : 24"
                />
              </a>
            </div>
          </v-col>

          <v-col
            cols="12"
            sm="6"
            class="order-3 order-sm-2 mt-6 mt-sm-0"
          >
            <h3 class="text-h6 font-weight-bold mb-2">
              Subscribe
            </h3>

            <v-form @submit.prevent="submit">
              <v-text-field
                v-model="email"
                :error-messages="emailError"
                label="E-mail"
                variant="underlined"
                density="comfortable"
                required
                class="mb-2 theme-dark-input"
                :disabled="!isReadyToJoin"
              />

              <v-btn
                color="white"
                variant="outlined"
                rounded="lg"
                type="submit"
                block
                class="px-6 mb-4 text-none"
                :disabled="!isReadyToJoin"
              >
                Join
              </v-btn>

              <v-checkbox
                v-model="isReadyToJoin"
                density="compact"
                hide-details
                class="text-caption text-grey-lighten-1"
              >
                <template #label>
                  <span class="text-caption text-grey-lighten-1">
                    By clicking Join and send I agree to the processing of my personal data.
                  </span>
                </template>
              </v-checkbox>
            </v-form>
          </v-col>
        </v-row>

        <v-row
          class="text-caption text-grey-lighten-1 text-center text-sm-left"
          align="center"
          justify="center"
        >
          <v-col
            cols="4"
            sm="4"
            class="text-sm-right"
          >
            &copy; {{ currentYear }}
          </v-col>

          <v-col
            cols="4"
            sm="4"
            class="text-sm-center text-center"
          >
            <a
              href="/privacy-policy"
              class="text-none text-grey-lighten-1"
            >
              Privacy Policy
            </a>
          </v-col>

          <v-col
            cols="4"
            sm="4"
            class="text-sm-left text-left"
          >
            <a
              href="/terms-of-use"
              class="text-none text-grey-lighten-1"
            >
              Terms of Use
            </a>
          </v-col>
        </v-row>
      </v-container>
    </v-footer>
  </template>

  <template v-else>
    <v-footer
      class="bg-main-grey text-grey-lighten-1 py-4"
    >
      <v-container>
        <div
          class="d-flex flex-column flex-sm-row align-center justify-space-between text-caption"
        >
          <span>
            &copy; {{ currentYear }} Pet Shelter System
          </span>

          <div class="d-flex ga-4 mt-2 mt-sm-0">
            <a
              href="/privacy-policy"
              class="text-grey-lighten-1 text-decoration-none"
            >
              Privacy Policy
            </a>

            <a
              href="/terms-of-use"
              class="text-grey-lighten-1 text-decoration-none"
            >
              Terms of Use
            </a>
          </div>
        </div>
      </v-container>
    </v-footer>
  </template>
</template>

<script setup lang="ts">
  import { computed, ref } from "vue";
  import { useField, useForm } from "vee-validate";
  import { useAuthStore } from "../stores/auth-store";
  import AppLogo from "./AppLogo.vue";

  const authStore = useAuthStore();

  const currentYear = computed(() => new Date().getFullYear());

  const items = [
    {
      title: "Facebook",
      icon: "mdi-facebook",
      href: "https://facebook.com",
    },
    {
      title: "Instagram",
      icon: "mdi-instagram",
      href: "https://instagram.com",
    },
  ];

  const isReadyToJoin = ref(false);

  const { handleSubmit } = useForm({
    validationSchema: {
      email(value: string) {
        if (
          /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/i.test(value)
        ) {
          return true;
        }

        return "Must be a valid e-mail.";
      },
    },
  });

  const {
    value: email,
    errorMessage: emailError,
  } = useField<string>("email");

  const submit = handleSubmit((values) => {
    alert(JSON.stringify(values, null, 2));
  });
</script>

<style scoped>
  .gap-2 {
    gap: 8px;
  }

  .custom-links .v-btn {
    height: auto !important;
    min-height: 2rem;
    padding: 0;
  }
</style>
