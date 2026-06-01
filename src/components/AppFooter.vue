<template>
  <v-footer class="bg-dark-grey">
    <v-container>
      <v-row justify="space-between">
        
        <v-col cols="12" sm="4" md="3" >
          <v-toolbar-title class="font-weight-bold text-primary mb-4">
            🐾 Animal Shelter
          </v-toolbar-title>
          
          <div class="d-flex flex-column align-start">
            <v-btn variant="text" to="/about-us">About Us</v-btn>
            <v-btn variant="text" to="/help-us" >Help us</v-btn>
            <v-btn variant="text" to="/find-a-pet" >Find a Pet</v-btn>
            <v-btn variant="text" to="/favorites" >Favorites</v-btn>
          </div>
        </v-col>

        <v-col cols="12" sm="6">
          <h3 class="text-h6 font-weight-bold mb-2">Subscribe</h3>
          <v-form @submit.prevent="submit">
            <v-text-field 
              v-model="email" 
              :error-messages="emailError" 
              label="E-mail"
              variant="outlined"
              density="comfortable"
              rounded="lg"
              required
              class="mb-2"
            ></v-text-field>

            <v-btn color="primary" variant="elevated" rounded="lg" type="submit" class="px-6 mb-4">
              Join
            </v-btn>
            
            <v-checkbox 
              density="compact"
              hide-details
              class="text-caption text-medium-emphasis"
              v-model="checkbox1"
            >
              <template #label>
                <span class="text-caption">
                  By clicking Join and send I agree to the processing of my personal data.
                </span>
              </template>
            </v-checkbox>
          </v-form>
        </v-col>

        <v-col
          cols="12"
          sm="2"
          class="text-left"
        >
          <a
            v-for="item in items"
            :key="item.title"
            :href="item.href"
            :title="item.title"
            class="d-inline-block mx-2 social-link"
            rel="noopener noreferrer"
            target="_blank"
          >
            <v-icon
              :icon="item.icon"
              :size="item.icon === '$vuetify' ? 32 : 24"
            />
          </a>
        </v-col>
      </v-row>

      <!-- botton row with desired functional about privacy e.t.c -->
      <v-row class="justify-center">
        <v-col
          cols="3">
          <p>&copy; {{ new Date().getFullYear() }}</p>
        </v-col>
        <v-col cols="3">
          <a href="/" variant="text" size="small" class="text-none">Privacy Policy</a>
        </v-col>
        <v-col cols="3">
          <a href="/" variant="text" size="small" class="text-none">Terms of Use</a>
        </v-col>
      </v-row>
    </v-container>
  </v-footer>
</template>

<script setup lang="ts">
import { useField, useForm } from 'vee-validate'
import { ref, watch } from 'vue';
const checkbox1  = ref(false);

watch(checkbox1 , (newValue) => {
  console.log(newValue)
})
const items = [
    {
      title: 'Vuetify Documentation',
      icon: `$vuetify`,
      href: 'https://vuetifyjs.com/',
    },
    {
      title: 'Vuetify Support',
      icon: 'mdi-shield-star-outline',
      href: 'https://support.vuetifyjs.com/',
    },
    {
      title: 'Vuetify X',
      icon: `svg:M2.04875 3.00002L9.77052 13.3248L1.99998 21.7192H3.74882L10.5519 14.3697L16.0486 21.7192H22L13.8437 10.8137L21.0765 3.00002H19.3277L13.0624 9.76874L8.0001 3.00002H2.04875ZM4.62054 4.28821H7.35461L19.4278 20.4308H16.6937L4.62054 4.28821Z`,
      href: 'https://x.com/vuetifyjs',
    },
    {
      title: 'Vuetify GitHub',
      icon: `mdi-github`,
      href: 'https://github.com/vuetifyjs/vuetify',
    },
    {
      title: 'Vuetify Discord',
      icon: `mdi-discord`,
      href: 'https://community.vuetifyjs.com/',
    },
    {
      title: 'Vuetify Reddit',
      icon: `mdi-reddit`,
      href: 'https://reddit.com/r/vuetifyjs',
    },
  ];

const { handleSubmit } = useForm({
  validationSchema: {
    email(value: string) {
      if (/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/i.test(value)) return true
      return 'Must be a valid e-mail.'
    }
  },
})




const { value: email, errorMessage: emailError } = useField<string>('email')

const submit = handleSubmit(values => {
  alert(JSON.stringify(values, null, 2))
})
</script>

<style scoped lang="sass">

</style>