<route lang="json">
{
  "meta": {
    "requiresAuth": false,
    "requiresInviteToken": true
  }
}
</route>

<template>
  <PageWrapper
    title="Create Your Account"
    withCard
  >
    <p class="text-body-1 text-medium-emphasis mb-6">
      You have been invited to join the system.
      Create a password to complete your registration.
    </p>

    <form @submit.prevent="onSubmit">
      <v-text-field
        v-model="password"
        label="Password"
        type="password"
        variant="outlined"
        autocomplete="new-password"
        :error-messages="passwordError ? [passwordError] : []"
      />

      <v-text-field
        v-model="confirmPassword"
        label="Confirm Password"
        type="password"
        variant="outlined"
        autocomplete="new-password"
        class="mt-4"
        :error-messages="
          confirmPasswordError
            ? [confirmPasswordError]
            : []
        "
      />

      <v-btn
        color="primary"
        type="submit"
        rounded="lg"
        :loading="isSubmitting"
        :disabled="isSubmitting"
      >
        Create Account
      </v-btn>
    </form>
  </PageWrapper>
</template>

<script setup lang="ts">
  import { computed, ref } from "vue";
  import { useRoute } from "vue-router";
  import { useField, useForm } from "vee-validate";
  import { useRouter } from "vue-router";
  import { useAuthStore } from "../stores/auth-store";
  import { useNotificationStore } from "../stores/notification-store";
  import * as yup from "yup";

  import PageWrapper from "../components/PageWrapper.vue";

  const route = useRoute();
  const router = useRouter();
  const authStore = useAuthStore();
  const notificationStore = useNotificationStore();

  const isSubmitting = ref(false);

  const inviteToken = computed(() => {
    const token = route.query.token;

    return typeof token === "string"
      ? token
      : "";
  });

  const schema = yup.object({
    password: yup
      .string()
      .required("Password is required"),

    confirmPassword: yup
      .string()
      .required("Please confirm your password")
      .oneOf(
        [yup.ref("password")],
        "Passwords must match",
      ),
  });

  const { handleSubmit } = useForm({
    validationSchema: schema,
    initialValues: {
      password: "",
      confirmPassword: "",
    },
  });

  const {
    value: password,
    errorMessage: passwordError,
  } = useField<string>("password");

  const {
    value: confirmPassword,
    errorMessage: confirmPasswordError,
  } = useField<string>("confirmPassword");

  const onSubmit = handleSubmit(async (values) => {
  if (!inviteToken.value)
    return;

  isSubmitting.value = true;

  try {
    const result = await authStore.acceptInvite(
      inviteToken.value,
      values.password,
    );

    if (!result.success) {
      notificationStore.notify(
        result.errorMessages?.join(", ")
          ?? "Failed to create account.",
        "error",
      );

      return;
    }

    notificationStore.notify(
      "Your account has been created successfully.",
      "success",
    );

    await router.push("/dashboard");
  } finally {
    isSubmitting.value = false;
  }
});
</script>