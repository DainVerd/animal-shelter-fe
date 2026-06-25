<template>
  <v-menu
    v-model="menu"
    :close-on-content-click="false"
    transition="scale-transition"
    offset-y
    max-width="290px"
  >
    <template #activator="{ props }">
      <v-text-field
        v-model="formattedDate"
        v-bind="props"
        :label="label"
        prepend-inner-icon="mdi-calendar"
        readonly
        variant="outlined"
        hide-details="auto"
        density="compact"
      />
    </template>
    
    <v-date-picker
      v-model="date"
      :max="max"
      @update:model-value="menu = false"
      color="primary"
    />
  </v-menu>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";

const props = defineProps<{
  modelValue: string | Date | null;
  label: string;
  max?: string; // Format "YYYY-MM-DD"
}>();

const emit = defineEmits(["update:modelValue"]);

const menu = ref(false);

const date = computed({
  get: () => props.modelValue ? new Date(props.modelValue) : null,
  set: (val) => emit("update:modelValue", val)
});

const formattedDate = computed(() => {
  if (!props.modelValue) return "";
  return new Date(props.modelValue).toLocaleDateString("ru-RU");
});
</script>