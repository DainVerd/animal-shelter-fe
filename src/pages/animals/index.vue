<route lang="json">{
  "meta": {
    "requiresAuth": true,
    "allowedRoles": [
      "SuperAdmin",
      "Admin",
      "ShelterWorker"
    ]
  }
}</route>

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


<v-container>
    <v-card
      elevation="1"
      rounded="lg">
      <v-data-table-server
        v-model:items-per-page="itemsPerPage"
        :headers="headers"
        :items="animals"
        :items-length="totalCount"
        :loading="loading"
        @update:options="loadData"
      >
      <template v-slot:item.gender="{ item }">
        <v-chip
          :color="item.gender === Gender.Male ? `blue-lighten-1` : `pink-lighten-1`"
          size="small"
          variant="tonal"
          :append-icon="item.gender === Gender.Male ? `mdi-gender-male` : `mdi-gender-female`"
        >
          {{ formatGenderName(item.gender)}}
        </v-chip>
      </template>

      <template v-slot:item.dateOfBirth="{ item }">
        {{ formatDate(item.dateOfBirth) }}
      </template>

      <template v-slot:item.actions="{ item }">
        <v-menu location="bottom end">
          <template v-slot:activator="{ props }">
            <v-btn
              icon="mdi-dots-vertical"
              variant="text"
              density="comfortable"
              v-bind="props"
              class="action-btn"
            />
          </template>

          <v-list
            elevation="2"
            rounded="lg"
          >
            <v-list-item 
              prepend-icon="mdi-eye" 
              title="View" 
              @click="viewAnimal(item)"
              class="cursor-pointer"
            />
            <v-list-item 
              prepend-icon="mdi-pencil" 
              title="Edit" 
              @click="editAnimal(item)"
              class="cursor-pointer"
            />
            <v-list-item 
              prepend-icon="mdi-delete" 
              title="Delete" 
              color="error" 
              @click="confirmDelete(item)"
              class="cursor-pointer"
            />
          </v-list>
        </v-menu>
      </template>
      </v-data-table-server>
    </v-card>
  </v-container>
  <!-- dialog window for deleting specific animal -->
  <v-dialog
    max-width="500"
    v-model="openDialog"
  >
    <template v-slot:default="{ isActive }">
      <v-card title="Delete Animal?">
        <v-card-text>
          Are you really want to delete this animal?
        </v-card-text>

        <v-card-actions class="text-align-center">
          <v-spacer></v-spacer>
          <v-btn
            text="Yes"
            @click="deleteAnimal()"
          ></v-btn>
          <v-btn
            text="Close Dialog"
            @click="isActive.value = false"
          ></v-btn>
        </v-card-actions>
      </v-card>
    </template>
  </v-dialog>
  <!--dialog to view animals -->
  <v-dialog
    v-model="viewDialog"
    max-width="800"
  >
  <v-card title="Animal Details">
    <v-card-text>
      <AnimalUpsertForm 
        v-if="viewAnimalId" 
        :animal-id="viewAnimalId" 
        :is-read-only="true"
        :is-edit-mode="false"
      />
    </v-card-text>
    <v-card-actions>
      <v-spacer />
      <v-btn
        text="Edit"
        color="primary"
        @click="navigateToEditPage()"
      />
      <v-btn
        text="Close"
        @click="viewDialog = false"
      />
    </v-card-actions>
  </v-card>
</v-dialog>
  </PageWrapper>
</template>

<script setup lang="ts">
import { BreadcrumbItem } from "../../models/bread-crumb-item";
import { ref, onUnmounted } from "vue";
import { animalService } from "../../services/animal-service";
import Animal from "../../models/animal";
import { formatDate } from "../../utils/date-formatter";
import { useRouter } from "vue-router";
import Gender from "../../enums/gender";
import { formatGenderName } from "../../utils/gender-formatter";
import { useNotificationStore } from "../../stores/notification-store";
import AnimalUpsertForm from "../../forms/AnimalUpsertForm.vue";

const router = useRouter();
const notification = useNotificationStore();
const controller = new AbortController();


const animals = ref<Animal[]>([]);
const totalCount = ref(0);
const loading = ref(false);
const itemsPerPage = ref(10);
const openDialog = ref(false);
const selectedAnimalId = ref<number | null>(null);
const viewDialog = ref(false);
const viewAnimalId = ref<number | null>(null);

const headers = [
  { title: "Name", key: "name", sortable: true },
  { title: "Breed", key: "breed", sortable: true },
  { title: "Gender", key: "gender", sortable: true },
  { title: "Birth Date", key: "dateOfBirth", sortable: true },
  { title: "Actions", key: "actions", sortable: false, align: "end" },
];
const pageBreadcrumbs: BreadcrumbItem[] = [
  { title: "Animals", to: "/animals" }
];

const loadData = async ({ page, itemsPerPage: size, sortBy }: any) => {
  loading.value = true;
  try {
    const sort = sortBy && sortBy.length > 0 ? sortBy[0] : null;
    const response = await animalService.getAnimals({ 
        pageNumber: page -1, 
        pageSize: size ,
        sortBy: sort?.key,
        isDescending: sort?.order === "desc"
    });

    if (response) {
      animals.value = response.items ;
      totalCount.value = response.totalCount;
    }
  } catch (error) {
    console.error("Error to load:", error);
  } finally {
    loading.value = false;
  }
};

const editAnimal = (item: Animal) => {
  router.push(`/animals/upsert/${item.id}`);
};

const confirmDelete = (item: Animal) => {
  openDialog.value = true;
  selectedAnimalId.value = item.id;
};

const deleteAnimal = async () => {
  if(!selectedAnimalId.value)
    return;

  try {
    await animalService.deleteAnimal(selectedAnimalId.value, controller.signal);
    notification.notify("Deleted animal!"); 
    animals.value = animals.value.filter((animal: Animal) => animal.id !== selectedAnimalId.value);
    totalCount.value = totalCount.value - 1;
  } catch(err){
    notification.notify("Error to delete animal try again.", "error");
  } finally {
    selectedAnimalId.value = null;
    openDialog.value = false;
  }
};

const viewAnimal = (item: Animal) => {
  viewAnimalId.value = item.id;
  viewDialog.value = true;
};

const navigateToEditPage = () => {
  router.push(`/animals/upsert/${viewAnimalId.value}`);
  viewDialog.value = false;
  viewAnimalId.value = null;
};

onUnmounted(() => {
  controller.abort();
});

</script>