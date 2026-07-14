<template>
  <section class="py-8">
    <v-row>
      <v-col
        cols="12"
        align="center"
      >
        <h3 class="text-h3">{{petsTotalAmount}} Pets available for adoption</h3>
      </v-col>
      <v-col cols="12">
        <AnimalCarousel 
          :animals="animals"
          :loading="loading"
          :has-more="animals.length < petsTotalAmount"
          @load-more="loadNextPage"
          @like="handleLike"
        />
      </v-col>
      <v-col cols="12">
        <v-row justify="center">
          <v-col
            cols="12"
            sm="4"
          >
            <v-btn
              color="primary"
              size="x-large"
              variant="outlined"
              block
            >
              All Pets
            </v-btn>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue";
import { publicService } from "../../services/public-service";
import PublicAnimal from "../../models/public-animal";
import { useNotificationStore } from "../../stores/notification-store";

const controller = new AbortController();

const animals = ref<PublicAnimal[]>([]);
const petsTotalAmount = ref<number>(0);
const currentPage = ref(0); 
const loading = ref(false);

const notification = useNotificationStore();

const loadAnimals = async (page: number) => {
  loading.value = true;
  try {
    const result = await publicService.getPublicAnimalsList(
      { pageNumber: page, pageSize: 5 }, 
      controller.signal
    );

    if (result) {
      animals.value.push(...result.items);
      petsTotalAmount.value = result.totalCount;
    }
  } catch (error) {
    notification.notify("Failed to load pets", "error");
  } finally {
    loading.value = false;
  }
};

const loadNextPage = () => {
  currentPage.value++;
  loadAnimals(currentPage.value);
};


const handleLike = (animalId: number) => {
  console.log("Animal liked:", animalId);
  notification.notify(`You liked pet #${animalId}!`);
};

onMounted(() => loadAnimals(0));
onUnmounted(() => {
  controller.abort();
});
</script>

