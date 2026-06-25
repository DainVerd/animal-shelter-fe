<template>
  <v-form @submit.prevent="handleSubmit">
    <v-row>
      <v-col
        cols="12"
        md="6"
    >
        <v-text-field
            v-model="form.name"
            label="Name"
            variant="outlined"
            density="compact"
            clearable
        />
      </v-col>

      <v-col
        cols="12"
        md="6"
      >
        <v-select 
          v-model="form.gender" 
          :items="lookups.genders" 
          label="Gender" 
          item-title="text" 
          item-value="value" 
          variant="outlined"
          density="compact"
        />
      </v-col>

      <v-col
        cols="12"
        md="6"
      >
        <v-select 
          v-model="form.size" 
          :items="lookups.sizes" 
          label="Size" 
          item-title="text" 
          item-value="value" 
          variant="outlined"
          density="compact"
        />
      </v-col>

      <v-col
        cols="12"
        md="6"
      >
        <v-select 
          v-model="form.temperament" 
          :items="lookups.temperaments" 
          label="Temperament" 
          item-title="text" 
          item-value="value" 
          variant="outlined"
          density="compact"
        />
      </v-col>
    </v-row>

    <v-card-actions class="mt-4">
      <v-spacer />
      <v-btn to="/animals">Cancel</v-btn>
      <v-btn
        type="submit"
        color="primary"
        variant="elevated"
      >Save</v-btn>
    </v-card-actions>
  </v-form>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { lookupService } from "../services/lookup-service";
import { SelectListItem } from "../models/select-list-item";

const props = defineProps<{
  animalId?: number;
  isEditMode: boolean;
}>();

const form = ref({
  name: "",
  gender: null,
  size: null,
  temperament: null
});

const lookups = ref<{genders: SelectListItem[];
  sizes: SelectListItem[];
  temperaments: SelectListItem[];
}>({
  genders: [],
  sizes: [],
  temperaments: []
});

onMounted(async () => {
  lookups.value = await lookupService.getAnimalLookups();
  if (props.isEditMode && props.animalId) {
    // TODO: Загрузка данных животного для редактирования
  }
});

const handleSubmit = async () => {
  console.log(`Form data:`, form.value);
  // Здесь будет вызов animalService.create или update
};
</script>