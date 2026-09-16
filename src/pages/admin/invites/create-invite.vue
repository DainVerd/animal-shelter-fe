<route lang="json">
{
  "meta": {
    "requiresAuth": true,
    "allowedRoles": ["SuperAdmin", "Admin"]
  }
}
</route>

<template>
  <PageWrapper
    title="Invitations"
    :breadcrumbs="breadcrumbs"
    withCard
  >
    <v-form @submit.prevent="onSubmit">
      <v-text-field
        v-model="email"
        label="Email"
        placeholder="person@example.com"
        type="email"
        variant="outlined"
        :error-messages="emailError ? [emailError] : []"
        :disabled="isSubmitting"
      />

      <v-select
        v-model="selectedRoles"
        label="Roles"
        variant="outlined"
        :items="availableRoles"
        item-title="text"
        item-value="value"
        multiple
        chips
        closable-chips
        :loading="isLoadingRoles"
        :disabled="isSubmitting || isLoadingRoles"
        :error-messages="rolesError ? [rolesError] : []"
      />
      <div class="text-caption text-medium-emphasis mt-1">
        Select one or more roles for the invited user.
      </div>

      <div class="d-flex justify-end mt-6">
        <v-btn
          color="primary"
          type="submit"
          :loading="isSubmitting"
          :disabled="isSubmitting || isLoadingRoles"
        >
          Send Invitation
        </v-btn>
      </div>
    </v-form>
  </PageWrapper>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import { useForm, useField } from "vee-validate";
import * as yup from "yup";

import PageWrapper from "../../../components/PageWrapper.vue";
import { lookupService } from "../../../services/lookup-service";
import type { SelectListItem } from "../../../models/select-list-item";
import { useNotificationStore } from "../../../stores/notification-store";
import type { BreadcrumbItem } from "../../../models/bread-crumb-item";

const notificationStore = useNotificationStore();

const breadcrumbs: BreadcrumbItem[] = [
  { title: "Administration", to: "#" },
  { title: "Invitations", to: "/admin/invitations" },
];

const schema = yup.object({
  email: yup
    .string()
    .required("Email is required")
    .email("Please enter a valid email address"),

  roles: yup
    .array()
    .of(yup.string().required())
    .min(1, "Select at least one role")
    .required("At least one role is required"),
});

const { handleSubmit, resetForm } = useForm({
  validationSchema: schema,
  initialValues: {
    email: "",
    roles: [],
  },
});

const { value: email, errorMessage: emailError } =
  useField<string>("email");

const { value: selectedRoles, errorMessage: rolesError } =
  useField<string[]>("roles");

const availableRoles = ref<SelectListItem[]>([]);
const isLoadingRoles = ref(false);
const isSubmitting = ref(false);

const loadAvailableRoles = async () => {
  isLoadingRoles.value = true;

  try {
    availableRoles.value =
      await lookupService.getAvailableUserRoles();
      console.log(availableRoles);
  } catch {
    notificationStore.notify(
      "Failed to load available roles.",
      "error"
    );
  } finally {
    isLoadingRoles.value = false;
  }
};

const onSubmit = handleSubmit(async (values) => {
  isSubmitting.value = true;

  try {
    console.log(values);

    // await invitationService.createInvite(values);

    notificationStore.notify(
      "Invitation sent successfully.",
      "success"
    );

    resetForm();
  } catch {
    notificationStore.notify(
      "Failed to send invitation.",
      "error"
    );
  } finally {
    isSubmitting.value = false;
  }
});

onMounted(loadAvailableRoles);
</script>