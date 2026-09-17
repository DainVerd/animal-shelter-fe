<route lang="json">{
  "meta": {
    "requiresAuth": true,
    "allowedRoles": [
      "SuperAdmin",
      "Admin"
    ]
  }
}</route>

<template>
  <PageWrapper
    title="Invitations"
    :breadcrumbs="pageBreadcrumbs"
    withCard
  >

    <template #actions>
      <v-btn
        color="primary"
        prepend-icon="mdi-plus"
        to="/admin/invites/create-invite"
      >
        Invite User
      </v-btn>
    </template>


  <v-container>
    <v-card
      elevation="1"
      rounded="lg">
    </v-card>
  </v-container>
  </PageWrapper>
</template>

<script setup lang="ts">
  import { BreadcrumbItem } from "../../../models/bread-crumb-item";

  const pageBreadcrumbs: BreadcrumbItem[] = [
    { title: "Invitations", to: "/invites" }
  ];
</script>