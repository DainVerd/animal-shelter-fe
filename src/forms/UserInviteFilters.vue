```vue
<template>
  <form @submit.prevent="onSubmit">
    <div class="d-flex flex-wrap align-center ga-3">
      <v-text-field
        v-model="emailSearchText"
        label="Search email"
        prepend-inner-icon="mdi-magnify"
        variant="outlined"
        density="compact"
        hide-details="auto"
        clearable
        max-width="300"
        :error-messages="emailSearchTextError
          ? [emailSearchTextError]
          : []"
      />

      <v-select
        v-model="selectedRole"
        label="Role"
        :items="availableRoles"
        item-title="text"
        item-value="value"
        variant="outlined"
        density="compact"
        hide-details
        clearable
        max-width="220"
      />

      <v-select
        v-model="selectedStatus"
        label="Status"
        :items="statusOptions"
        item-title="text"
        item-value="value"
        variant="outlined"
        density="compact"
        hide-details
        clearable
        max-width="200"
      />

      <v-btn
        color="primary"
        variant="outlined"
        type="submit"
        class="text-none"
      >
        Apply Filters
      </v-btn>

      <v-btn
        variant="text"
        color="primary"
        type="button"
        class="text-none"
        @click="clearFilters"
      >
        Clear
      </v-btn>
    </div>
  </form>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import { useField, useForm } from "vee-validate";

import type { SelectListItem } from "../models/select-list-item";
import InviteStatus from "../enums/invite-status";
import { lookupService } from "../services/lookup-service";

interface UserInviteFilterValues {
  emailSearchText?: string;
  roleInclude?: string;
  status?: InviteStatus;
}

const emit = defineEmits<{
  apply: [filters: UserInviteFilterValues];
  clear: [];
}>();

const { handleSubmit, resetForm } = useForm<UserInviteFilterValues>({
  initialValues: {
    emailSearchText: "",
    roleInclude: undefined,
    status: undefined,
  },
});

const {
  value: emailSearchText,
  errorMessage: emailSearchTextError,
} = useField<string>("emailSearchText");

const {
  value: selectedRole,
} = useField<string | undefined>("roleInclude");

const {
  value: selectedStatus,
} = useField<InviteStatus | undefined>("status");

const availableRoles = ref<SelectListItem[]>([]);
const statusOptions = ref<SelectListItem[]>([]);

// const statusOptions = [
//   {
//     title: "Pending",
//     value: InviteStatus.Pending,
//   },
//   {
//     title: "Accepted",
//     value: InviteStatus.Accepted,
//   },
//   {
//     title: "Expired",
//     value: InviteStatus.Expired,
//   },
//   {
//     title: "Revoked",
//     value: InviteStatus.Revoked,
//   },
// ];

const loadDropDownValues = async () => {
  try {
    availableRoles.value =
      await lookupService.getAvailableUserRoles();

      statusOptions.value =
      await lookupService.getOptions("inviteStatus");

  } catch (error) {
    console.error("Failed to load available roles:", error);
  }
};

const onSubmit = handleSubmit((values) => {
  emit("apply", {
    emailSearchText:
      values.emailSearchText?.trim() || undefined,

    roleInclude:
      values.roleInclude || undefined,

    status:
      values.status ?? undefined,
  });
});

const clearFilters = () => {
  resetForm();

  emit("clear");
};

onMounted(() => {
  loadDropDownValues();
});
</script>
```
