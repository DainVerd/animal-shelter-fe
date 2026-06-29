<template>
  <v-form @submit.prevent="onSubmit">
    <h3 class="text-subtitle-1 font-weight-bold mb-4">General Information</h3>
    <v-row>
      <v-col
        cols="12"
        md="4"
      >
        <v-text-field
          v-model="name"
          label="Name"
          variant="outlined"
          density="compact"
          :error-messages="errors.name"
        />
        <v-text-field
          v-model="breed"
          label="Breed"
          variant="outlined"
          density="compact"
          :error-messages="errors.breed"
        />
      </v-col>
      <v-col
        cols="12"
        md="4"
      >
        <v-select
          v-model="gender"
          :items="lookups.genders"
          label="Gender"
          variant="outlined"
          density="compact"
          item-title="text"
          item-value="value"
          :error-messages="errors.gender"
          required
        />
        <BaseDatePicker
          v-model="dob"
          label="Date of Birth"
          :max="new Date().toISOString().substring(0, 10)"
          :error-messages="errors.dob"
          required
        />
      </v-col>
      <v-col
        cols="12"
        md="4"
      >
        <v-select
          v-model="size"
          :items="lookups.sizes"
          label="Size"
          variant="outlined"
          density="compact"
          item-title="text"
          item-value="value"
          :error-messages="errors.size"
          required
        />
        <v-select
          v-model="temperament"
          :items="lookups.temperaments"
          label="Temperament"
          variant="outlined"
          density="compact"
          item-title="text"
          item-value="value"
          :error-messages="errors.temperament"
          required
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
          v-model="isVaccinated"
          label="Is Vaccinated"
          color="primary"
          density="compact"
          :error-messages="errors.isVaccinated"
        />
        <v-checkbox
          v-model="isSterilized"
          label="Is Sterilized"
          color="primary"
          density="compact"
          :error-messages="errors.isSterilized"
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
          rows="2"
          :error-messages="errors.healthNote"
          v-model="healthNote"
        />
      </v-col>
    </v-row>

    <v-divider class="my-6" />
    <h3 class="text-subtitle-1 font-weight-bold mb-4">Animal Description</h3>
    <v-row>
      <v-col cols="12">
        <v-textarea
          v-model="description"
          label="Description of the Animal"
          variant="outlined"
          density="compact"
          rows="5"
          required
          :error-messages="errors.description"
        />
      </v-col>
    </v-row>
    <!-- pictures -->
    <v-divider class="my-6" />
    <h3 class="text-subtitle-1 font-weight-bold mb-4">Add Images of the Pet</h3>
    <AnimalPhotoUploader
      v-model="photos"
      :error-messages="errors.photos"
      required
      />
    <v-row>
      
    </v-row>
    <!-- actions of the form -->
    <v-card-actions class="mt-4">
      <v-spacer />
      <v-btn
        to="/animals"
        :loading="isSubmitting"
      >Cancel</v-btn>
      <v-btn
        type="submit"
        color="primary"
        variant="elevated"
        :loading="isSubmitting"
      >Save</v-btn>
    </v-card-actions>
  </v-form>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { lookupService } from "../services/lookup-service";
import { SelectListItem } from "../models/select-list-item";
import { useForm, useField } from "vee-validate";
import { animalSchema } from "../schemas/animal-upsert-schema";
import { animalService } from "../services/animal-service";
import { formatDateForApi } from "../utils/time-util";

const props = defineProps<{
  animalId?: number;
  isEditMode: boolean;
}>();

let isSubmitting = ref<boolean>(false);

const { handleSubmit, errors, resetForm } = useForm({
  validationSchema: animalSchema,
  initialValues: {
    name: "",
    breed: "",
    gender: null,
    size: null,
    temperament: null,
    dob: null,
    isVaccinated: false,
    isSterilized: false,
    description: "",
    photos: [],
    healthNote: ""
  }
});

const createField = (name: string) => {
  const { value } = useField(name);
  return value; 
};

const name = createField("name");
const breed = createField("breed");
const gender = createField("gender");
const size = createField("size");
const temperament = createField("temperament");
const dob = createField("dob");
const isVaccinated = createField("isVaccinated");
const isSterilized = createField("isSterilized");
const description = createField("description");
const photos = createField("photos");
const healthNote = createField("healthNote");



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
  if (props.isEditMode && props.animalId !== 0) {
    // TODO: load data for animal to edit
  }
});


const onSubmit = handleSubmit(async (values) => {
  console.log("Valid form data:", values);
  isSubmitting.value = true;

  if (props.isEditMode && props.animalId !== 0) {
    
    return;
  }
  const formData = new FormData();

  formData.append("Model.Name", values.name);
  formData.append("Model.Breed", values.breed || "");
  formData.append("Model.Description", values.description);
  formData.append("Model.Gender", values.gender || "");
  formData.append("Model.Size", values.size || "");
  formData.append("Model.Temperament", values.temperament || "");
  formData.append("Model.IsSterilized", String(values.isSterilized));
  formData.append("Model.IsVaccinated", String(values.isVaccinated));
  
  if (values.dob) 
    formData.append("Model.DateOfBirth", formatDateForApi(values.dob as Date));


  if (values.photos && values.photos.length > 0) {
    values.photos.forEach((file: File) => {
      formData.append("Model.Photos", file);
    });
  }

  try {
    const result = await animalService.createAnimal(formData);
    console.log("submit form result", result);
    resetForm();
    photos.value = [];
  } catch (err) {
    console.error(err);
  } finally {
    isSubmitting.value = false;
  }
});

</script>
