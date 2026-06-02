<template>
  <v-footer class="bg-dark grey text-white py-10">
    <v-container>
      <v-row justify="space-between">
        <v-col
          cols="7"
          sm="4"
          md="3"
          class="order-1"
        >
          <v-toolbar-title class="font-weight-bold text-primary mb-4 px-0">
           <div class="text-h5 font-weight-bold brand-logo">
            <span class="text-blue-darken-1">Pets</span><span class="text-pink-accent-3">Pets</span>
          </div>
          </v-toolbar-title>
          
          <div class="d-flex flex-column align-start custom-links">
            <v-btn
              variant="text"
              to="/about-us"
              class="text-none px-0 text-grey-lighten-1"
            >About Us</v-btn>
            <v-btn
              variant="text"
              to="/help-us"
              class="text-none px-0 text-grey-lighten-1"
            >Help us</v-btn>
            <v-btn
              variant="text"
              to="/find-a-pet"
              class="text-none px-0 text-grey-lighten-1"
            >Find a Pet</v-btn>
            <v-btn
              variant="text"
              to="/favorites"
              class="text-none px-0 text-grey-lighten-1"
            >Favorites</v-btn>
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
          <h3 class="text-h6 font-weight-bold mb-2">Subscribe</h3>
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
            ></v-text-field>

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
              density="compact"
              hide-details
              v-model="isReadyToJoin"
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
          <a>&copy; {{ new Date().getFullYear() }}</a>
        </v-col>
        <v-col
          cols="4"
          sm="4"
          class="text-sm-center text-center"
        >
          <a
            href="/privacy-policy"
            class="text-none text-grey-lighten-1"
          >Privacy Policy</a>
        </v-col>
        <v-col
          cols="4"
          sm="4"
          class="text-sm-left text-left"
        >
          <a
            href="/terms-of-use"
            class="text-none text-grey-lighten-1"
          >Terms of Use</a>
        </v-col>
      </v-row>
    </v-container>
  </v-footer>
</template>

<script setup lang="ts">
import { useField, useForm } from "vee-validate";
import { ref } from "vue";

const items = [
    {
      title: "Vuetify Documentation",
      icon: "mdi-facebook",
      href: "https://facebook.com",
    },
    {
      title: "Vuetify Support",
      icon: "mdi-instagram",
      href: "https://instagram.com",
    }
  ];

const isReadyToJoin = ref(false);

const { handleSubmit } = useForm({
  validationSchema: {
    email(value: string) {
      if (/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/i.test(value)) return true;
      return "Must be a valid e-mail.";
    }
  },
});

const { value: email, errorMessage: emailError } = useField<string>("email");

const submit = handleSubmit(values => {
  alert(JSON.stringify(values, null, 2));
});
</script>

<style scoped>
.gap-2 {
  gap: 8px;
}
.decoration-none {
  text-decoration: none;
}
.decoration-none:hover {
  text-decoration: underline;
}

.custom-links .v-btn {
  height: auto !important;
  min-height: 2rem;
  padding: 0;
}
</style>