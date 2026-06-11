<template>
  <v-container class="fill-height d-flex justify-center align-center bg-grey-lighten-4">
    <v-card
      width="100%"
      max-width="450"
      class="pa-6 pa-md-8"
      elevation="3"
      rounded="xl"
    >
      <div class="text-center mb-8">
        <v-icon
          icon="mdi-paw"
          color="primary"
          size="48"
          class="mb-2"
        ></v-icon>
        <h1 class="text-h4 font-weight-bold mb-2">Welcome Back</h1>
        <p class="text-body-1 text-grey-darken-1">
          Sign in to manage the shelter platform
        </p>
      </div>

      <v-form @submit.prevent="onSubmit">
        <v-text-field
          v-model="email"
          :error-messages="errors.email"
          label="Email Address"
          prepend-inner-icon="mdi-email-outline"
          variant="outlined"
          color="primary"
          class="mb-2"
        ></v-text-field>

        <v-text-field
          v-model="password"
          :error-messages="errors.password"
          :type="showPassword ? `text` : `password`"
          label="Password"
          prepend-inner-icon="mdi-lock-outline"
          :append-inner-icon="showPassword ? `mdi-eye-off` : `mdi-eye`"
          @click:append-inner="showPassword = !showPassword"
          variant="outlined"
          color="primary"
          class="mb-2"
        ></v-text-field>

        <div class="d-flex justify-end mb-6">
          <a
            href="#"
            class="text-caption text-primary text-decoration-none font-weight-medium"
          >
            Forgot password?
          </a>
        </div>
        <v-alert
          v-if="backendError"
          type="error"
          variant="tonal"
          density="compact"
          class="mb-4 text-body-2"
        >
          {{ backendError }}
        </v-alert>

        <v-btn
          type="submit"
          block
          color="primary"
          size="x-large"
          :loading="isSubmitting"
        >
          Sign In
        </v-btn>
      </v-form>

      <div class="text-center mt-6">
        <p class="text-body-2 text-grey-darken-1">
          Don"t have an account?
          <a
            href="#"
            class="text-primary text-decoration-none font-weight-medium"
          >
            Request access
          </a>
        </p>
      </div>
    </v-card>
  </v-container>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useForm, useField } from "vee-validate";
import * as yup from "yup";
import { useRouter } from "vue-router";
import { useAuthStore } from "../../stores/auth-store";

// UI Toggles & State
const showPassword = ref(false);
const backendError = ref<string | null>(null); // Хранилище для ошибок от бэкенда

const router = useRouter();
const authStore = useAuthStore();

// 1. Define Validation Schema with Yup
const schema = yup.object({
  email: yup
    .string()
    .required("Email is required")
    .email("Please enter a valid email address"),
  password: yup
    .string()
    .required("Password is required")
    .min(6, "Password must be at least 6 characters"),
});

// 2. Initialize Vee-Validate Form Configuration
const { handleSubmit, errors, isSubmitting } = useForm({
  validationSchema: schema,
});

// 3. Bind Fields for Form Controls
const { value: email } = useField<string>("email");
const { value: password } = useField<string>("password");

// 4. Submit Handler (Only runs if validation passes)
const onSubmit = handleSubmit(async (values) => {
  backendError.value = null; // Сбрасываем ошибку перед новым запросом

  try {
    console.log("values",values);
    // Вызываем реальный логин через Pinia Store
    const response = await authStore.login({
      email: values.email,
      password: values.password
    });

    if (response.isSuccess) {
      // Логин успешен! Перекидываем на главную страницу (панель управления)
      router.push("/dashboard"); 
    } else {
      // Ошибка от бэкенда (например, 400 Bad Request из-за неверного пароля)
      // Предполагаем, что твой BaseResponse возвращает массив errorMessages
      backendError.value = response.errorMessages?.[0] || "Invalid email or password.";
    }
  } catch (error) {
    console.error("Backend login error", error);
    backendError.value = "Unable to connect to the server. Please try again later.";
  }
});
</script>