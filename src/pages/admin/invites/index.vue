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
    <div class="d-flex justify-end mb-4">
      <v-btn
        color="primary"
        rounded="lg"
        prepend-icon="mdi-account-plus"
        to="/admin/invitations/create"
      >
        Invite User
      </v-btn>
    </div>

    <v-data-table-server
      v-model:page="page"
      v-model:items-per-page="itemsPerPage"
      v-model:sort-by="sortBy"
      :headers="headers"
      :items="invites"
      :items-length="totalCount"
      :loading="isLoading"
      item-value="id"
      density="comfortable"
      hover
    >
      <template #item.roles="{ item }">
        <div class="d-flex flex-wrap ga-1">
          <v-chip
            v-for="role in sortRoles(item.roles)"
            :key="role"
            size="small"
            variant="tonal"
            :color="getRoleColor(role)"
          >
            {{ formatRoleName(role) }}
          </v-chip>
        </div>
      </template>

      <template #item.status="{ item }">
        <v-chip
          size="small"
          variant="tonal"
          :color="getStatusColor(item.status)"
          :prepend-icon="getStatusIcon(item.status)"
        >
          {{ formatInviteStatusName(item.status) }}
        </v-chip>
      </template>

      <template #item.invitedBy="{ item }">
        <div>
          <div class="font-weight-medium">
            {{ item.invitedBy.displayName || item.invitedBy.email }}
          </div>

          <div class="text-caption text-medium-emphasis">
            {{ item.invitedBy.email }}
          </div>
        </div>
      </template>

      <template #item.createdAt="{ item }">
        {{ formatDate(item.createdAt) }}
      </template>

      <template #item.expiresAt="{ item }">
        {{ formatDate(item.expiresAt) }}
      </template>
    </v-data-table-server>
  </PageWrapper>
</template>

<script setup lang="ts">
  import { ref, watch } from "vue";

  import PageWrapper from "../../../components/PageWrapper.vue";
  import type { BreadcrumbItem } from "../../../models/bread-crumb-item";
  import type { UserInvite } from "../../../models/user-invite";
  import { invitationService } from "../../../services/invitation-service";
  import { formatDate } from "../../../utils/date-formatter";
  import { formatInviteStatusName, getStatusColor, getStatusIcon } from "../../../utils/invite-status-formatter.ts";
  import { formatRoleName, getRoleColor, sortRoles } from "../../../utils/role-formatter.ts";
  import DataTableSortItem from "../../../models/data-table-sort-item.ts";

  const breadcrumbs: BreadcrumbItem[] = [
    {
      title: "Administration",
      to: "#",
    },
    {
      title: "Invitations",
      to: "/admin/invitations",
    },
  ];

  const headers = [
    {
      title: "Email",
      key: "email",
      sortable: true,
    },
    {
      title: "Roles",
      key: "roles",
      sortable: false,
    },
    {
      title: "Status",
      key: "status",
      sortable: true,
    },
    {
      title: "Invited By",
      key: "invitedBy",
      sortable: true,
    },
    {
      title: "Created",
      key: "createdAt",
      sortable: true,
    },
    {
      title: "Expires",
      key: "expiresAt",
      sortable: true,
    },
  ];

  const sortBy = ref<DataTableSortItem[]>([]);

  const invites = ref<UserInvite[]>([]);
  const totalCount = ref(0);

  const page = ref(1);
  const itemsPerPage = ref(10);

  const isLoading = ref(false);

  const loadInvites = async () => {
    isLoading.value = true;
    const sort = sortBy.value[0];
    try {
      const response = await invitationService.getInvites({
        pageNumber: page.value -1,
        pageSize: itemsPerPage.value,
        sortBy: sort?.key,
        isDescending: sort?.order === "desc",
      });

      invites.value = response.items;
      totalCount.value = response.totalCount;
    } finally {
      isLoading.value = false;
    }
  };

  watch(
  [page, itemsPerPage, sortBy],
  () => {
    loadInvites();
  },
  {
    immediate: true,
  },
);

</script>