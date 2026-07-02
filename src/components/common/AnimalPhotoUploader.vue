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
        v-for="(photo, index) in previewUrls"
        :key="index"
        cols="3"
        md="2"
      >
        <v-card class="position-relative">
          <v-img
            :key="photo.url"
            :src="photo.url"
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
            :disabled="disabled"
          />
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script setup lang="ts">
  import { ref, watch, nextTick } from "vue";
  import { AnimalPhoto } from "../../models/animal-photo";

  const props = defineProps<{ 
    modelValue: AnimalPhoto[];
    maxFiles?: number; 
    errorMessages?: string | string[];
    disabled?: boolean;
  }>();

  const emit = defineEmits(["update:modelValue"]);

  const previewUrls = ref<AnimalPhoto[]>([]);
  const internalErrors = ref<string[]>([]);
  const inputKey = ref(0); 

  const handleFileChange = async (newFiles: File[] | null) => {
    if (!newFiles || newFiles.length === 0)
      return;

    const newPhotos: AnimalPhoto[] = newFiles.map(file => ({
      url: URL.createObjectURL(file),
      file: file,
      isNew: true
    }));

    const updatedFiles = [...props.modelValue, ...newPhotos];
    
    emit("update:modelValue", updatedFiles);

    await nextTick();
    previewUrls.value = updatedFiles;
    
    inputKey.value++;
  };

  const removeFile = (index: number) => {
    const photoToRemove = previewUrls.value[index];
  

    if (photoToRemove.url.startsWith("blob:"))
      URL.revokeObjectURL(photoToRemove.url);

    const newFiles = [...props.modelValue];
    newFiles.splice(index, 1);
    emit("update:modelValue", newFiles);
  };

  const reset = () => {
    previewUrls.value.forEach(url => URL.revokeObjectURL(url));
    previewUrls.value = [];
    internalErrors.value = [];
    inputKey.value++;
    emit("update:modelValue", []);
  };
  watch(() => props.modelValue, (newVal) => {
    previewUrls.value = newVal || [];
  }, { immediate: true, deep: true });

  defineExpose({ reset });
</script>