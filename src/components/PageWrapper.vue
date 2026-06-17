<template>
  <v-container fluid class="pa-4 pa-sm-6 max-width-container">
    <v-fade-transition>
      <div v-if="breadcrumbs && breadcrumbs.length > 0" class="mb-2">
        <v-breadcrumbs
          :items="enrichedBreadcrumbs"
          density="compact"
          class="pa-0 text-caption"
          active-color="primary"
        >
          <template v-slot:divider>
            <v-icon size="14" color="grey-lighten-1">mdi-chevron-right</v-icon>
          </template>
        </v-breadcrumbs>
      </div>
    </v-fade-transition>

    <div v-if="title" class="d-flex flex-column flex-sm-row align-start align-sm-center justify-space-between gap-3 mb-6">
      <div>
        <h1 class="text-h4 font-weight-bold text-grey-darken-4">{{ title }}</h1>
        <p v-if="subtitle" class="text-body-2 text-medium-emphasis mt-1">
          {{ subtitle }}
        </p>
      </div>

      <div v-if="$slots.actions" class="d-flex align-center gap-2 w-100 w-sm-auto justify-end">
        <slot name="actions" />
      </div>
    </div>

    <v-card v-if="withCard" variant="flat" rounded="xl" class="pa-4 pa-sm-6 border">
      <slot />
    </v-card>
    
    <template v-else>
      <slot />
    </template>
  </v-container>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { BreadcrumbItem } from "../models/bread-crumb-item";

const props = withDefaults(
  defineProps<{
    title?: string;
    subtitle?: string;
    breadcrumbs?: BreadcrumbItem[];
    withCard?: boolean;
  }>(),
  {
    withCard: true,
    breadcrumbs: () => [],
  }
);


const enrichedBreadcrumbs = computed(() => {
  if (!props.breadcrumbs.length) return [];
  
  return props.breadcrumbs.map((item, index) => ({
    ...item,
    disabled: item.disabled ?? (index === props.breadcrumbs.length - 1),
  }));
});
</script>

<style scoped>
.max-width-container {
  max-width: 1400px;
  margin: 0 auto;
}
.gap-3 {
  gap: 12px;
}
</style>