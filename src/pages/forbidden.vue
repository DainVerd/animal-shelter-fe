<route lang="json">
{
  "meta": {
    "requiresAuth": true
  }
}
</route>

<template>
  <PageWrapper
    title="Forbidden"
    :breadcrumbs="pageBreadcrumbs"
    withCard
  >
  </PageWrapper>
</template>

<script setup lang="ts">
  import { BreadcrumbItem } from "../models/bread-crumb-item";

  const pageBreadcrumbs: BreadcrumbItem[] = [
  { title: "Animals", to: "/animals" }
];
</script>