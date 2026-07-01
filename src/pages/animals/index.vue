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
              @click="editAnimal(item)"
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

  </PageWrapper>
</template>

<script setup lang="ts">
import { BreadcrumbItem } from "../../models/bread-crumb-item";
import { ref } from "vue";
import { animalService } from "../../services/animal-service";
import Animal from "../../models/animal";
import { formatDate } from "../../utils/date-formatter";
import { useRouter } from "vue-router";
import Gender from "../../enums/gender";
import { formatGenderName } from "../../utils/gender-formatter";


const router = useRouter();
const pageBreadcrumbs: BreadcrumbItem[] = [
  { title: "Animals", to: "/animals" }
];

const animals = ref<Animal[]>([]);
const totalCount = ref(0);
const loading = ref(false);
const itemsPerPage = ref(10);

const headers = [
  { title: "Name", key: "name" },
  { title: "Breed", key: "breed" },
  { title: "Gender", key: "gender" },
  { title: "Birth Date", key: "dateOfBirth" },
  { title: "Actions", key: "actions", sortable: false, align: "end" },
];


const loadData = async ({ page, itemsPerPage: size }: any) => {
  loading.value = true;
  try {

    const response = await animalService.getAnimals({ 
        pageNumber: page -1, 
        pageSize: size 
    });

    if (response.isSuccess && response.data) {
      animals.value = response.data.items || [];
      totalCount.value = response.data.totalCount;
    }
  } catch (error) {
    console.error("Ошибка загрузки:", error);
  } finally {
    loading.value = false;
  }
};

const editAnimal = (item: any) => {
  router.push(`/animals/upsert/${item.id}`);
};

</script>