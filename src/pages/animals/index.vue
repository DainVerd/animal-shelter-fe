<route lang="json">
{
  "meta": {
    "requiresAuth": true,
    "allowedRoles": ["SuperAdmin", "Admin", "ShelterWorker"]
  }
}
</route>

<template>
  <PageWrapper
    title="Animals"
    :breadcrumbs="pageBreadcrumbs"
    withCard
  >

  <template #actions>
      <v-btn
        color="primary"
        prepend-icon="mdi-plus"
        to="/animals/upsert" 
      >
        Add Animal
      </v-btn>
    </template>

  </PageWrapper>
</template>

<script setup lang="ts">
  import { BreadcrumbItem } from "../../models/bread-crumb-item";

  const pageBreadcrumbs: BreadcrumbItem[] = [
  { title: "Animals", to: "/animals" }
];
</script>