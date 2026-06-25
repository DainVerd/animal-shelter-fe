<template>
  <v-form @submit.prevent="handleSubmit">
    <h3 class="text-subtitle-1 font-weight-bold mb-4">General Information</h3>
    <v-row>
      <v-col cols="12" md="4">
        <v-text-field v-model="form.name" label="Name" variant="outlined" density="compact" />
        <v-text-field v-model="form.breed" label="Breed" variant="outlined" density="compact" />
      </v-col>
      <v-col
        cols="12"
        md="4"
      >
        <v-select
          v-model="form.gender"
          :items="lookups.genders"
          label="Gender"
          variant="outlined"
          density="compact"
          item-title="text"
          item-value="value"
        />
        <BaseDatePicker v-model="form.dob" label="Date of Birth" :max="new Date().toISOString().substring(0, 10)" />
      </v-col>
      <v-col
        cols="12"
        md="4"
      >
        <v-select
          v-model="form.size"
          :items="lookups.sizes"
          label="Size"
          variant="outlined"
          density="compact"
          item-title="text"
          item-value="value"
        />
        <v-select
          v-model="form.temperament"
          :items="lookups.temperaments"
          label="Temperament"
          variant="outlined"
          density="compact"
          item-title="text"
          item-value="value"
        />
      </v-col>
    </v-row>

    <v-divider class="my-6" />

    <h3 class="text-subtitle-1 font-weight-bold mb-4">Health & Status</h3>
    <v-row>
      <v-col
        cols="12"
        md="4"
      >
        <v-checkbox
          v-model="form.isVaccinated"
          label="Is Vaccinated"
          color="primary"
          density="compact"
        />
        <v-checkbox
          v-model="form.isSterilized"
          label="Is Sterilized"
          color="primary"
          density="compact"
        />
      </v-col>
      <v-col
        cols="12"
        md="8"
      >
        <v-textarea
          label="Health Notes"
          variant="outlined"
          density="compact"
          rows="2" />
      </v-col>
    </v-row>

    <v-divider class="my-6" />
    <h3 class="text-subtitle-1 font-weight-bold mb-4">Animal Description</h3>
    <v-row>
      <v-col cols="12">
        <v-textarea
          v-model="form.description"
          label="Description of the Animal"
          variant="outlined"
          density="compact"
          rows="5"
          required
        />
      </v-col>
    </v-row>
    <!-- pictures -->
    <v-divider class="my-6" />
    <h3 class="text-subtitle-1 font-weight-bold mb-4">Add Images of the Pet</h3>
    <AnimalPhotoUploader v-model="form.photos" />
    <v-row>
      
    </v-row>
    <!-- actions of the form -->
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
  breed: "",
  name: "",
  gender: null,
  size: null,
  temperament: null,
  dob: null as Date | null,
  isVaccinated: false,
  isSterilized: false,
  description: "",
  photos: [] as File[]
});

const lookups = ref<{
  genders: SelectListItem[];
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
