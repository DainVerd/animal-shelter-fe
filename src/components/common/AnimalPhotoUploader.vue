<template>
  <div class="photo-uploader">
    <v-file-input
      :key="inputKey" 
      label="Photos"
      variant="outlined"
      prepend-icon="mdi-camera"
      multiple
      accept="image/*"
      :error-messages="props.errorMessages || internalErrors"
      @update:model-value="handleFileChange"
    />

    <v-row
      class="mt-2"
      v-if="previewUrls.length > 0"
    >
      <v-col
        v-for="(url, index) in previewUrls"
        :key="url"
        cols="3"
        md="2"
      >
        <v-card class="position-relative">
          <v-img
            :src="url"
            height="120"
            cover
          />
          <v-btn
            icon="mdi-close"
            size="x-small"
            color="error"
            class="position-absolute"
            style="top: 4px; right: 4px"
            @click="removeFile(index)"
          />
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

const props = defineProps<{ 
  modelValue: File[];
  maxFiles?: number; 
  errorMessages?: string | string[];
}>();

const emit = defineEmits(["update:modelValue"]);

const previewUrls = ref<string[]>([]);
const internalErrors = ref<string[]>([]);
const inputKey = ref(0); 

const handleFileChange = (newFiles: File[] | null) => {
  if (!newFiles || newFiles.length === 0) return;

  let updatedFiles = [...props.modelValue, ...newFiles];

  if (props.maxFiles && updatedFiles.length > props.maxFiles) {
    internalErrors.value = [`Максимум ${props.maxFiles} фото.`];
    updatedFiles = updatedFiles.slice(0, props.maxFiles);
  } else {
    internalErrors.value = [];
  }

  previewUrls.value.forEach(url => URL.revokeObjectURL(url));
  previewUrls.value = updatedFiles.map(file => URL.createObjectURL(file));
  
  emit("update:modelValue", updatedFiles);
  
  inputKey.value++;
};

const removeFile = (index: number) => {
  const newFiles = [...props.modelValue];
  newFiles.splice(index, 1);
  
  URL.revokeObjectURL(previewUrls.value[index]);
  previewUrls.value.splice(index, 1);
  
  emit("update:modelValue", newFiles);
};

const reset = () => {
  previewUrls.value.forEach(url => URL.revokeObjectURL(url));
  previewUrls.value = [];
  internalErrors.value = [];
  inputKey.value++;
  emit("update:modelValue", []);
};

defineExpose({ reset });
</script>