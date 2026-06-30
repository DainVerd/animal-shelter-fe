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
    :title="isEditMode ? `Edit Animal` : `Create New Animal`"
    :breadcrumbs="breadcrumbs"
    withCard
  >
    <AnimalUpsertForm 
      :animal-id="parseInt(animalId || ``)" 
      :is-edit-mode="isEditMode" 
    /> 
  </PageWrapper>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useRoute } from "vue-router";
import AnimalUpsertForm from "../../../forms/AnimalUpsertForm.vue";
import type { BreadcrumbItem } from "../../../models/bread-crumb-item";

const route = useRoute();
const animalId = computed(() => route.params.id as string | undefined);
const isEditMode = computed(() => !!animalId.value);

const breadcrumbs: BreadcrumbItem[] = [
  { title: "Animals", to: "/animals" },
  { title: isEditMode.value ? "Edit" : "Create", to: "#" }
];
</script>