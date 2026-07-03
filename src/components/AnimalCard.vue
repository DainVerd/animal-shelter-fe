<template>
  <v-card
    class="animal-card"
    rounded="lg"
    elevation="2"
  >
    <v-img 
      :src="animal.url" 
      height="250" 
      cover 
      class="bg-grey-lighten-2"
    >
      <template v-slot:placeholder>
        <v-row
            class="fill-height ma-0"
            align="center"
            justify="center"
        >
          <v-progress-circular
            indeterminate
            color="grey-lighten-5"
          />
        </v-row>
      </template>
    </v-img>

    <v-card-text class="pa-4">
      <div class="d-flex justify-space-between align-center">
        <h3 class="text-h6 font-weight-bold">{{ animal.name }}</h3>
        <v-btn 
          icon 
          variant="text" 
          @click.stop="favoritesStore.toggleFavorite(animal.id)"
        >
          <v-icon 
            :color="favoritesStore.isFavorite(animal.id) ? 'red' : 'grey'"
          >
            {{ favoritesStore.isFavorite(animal.id) ? 'mdi-heart' : 'mdi-heart-outline' }}
          </v-icon>
        </v-btn>
      </div>
      
      <div class="text-subtitle-1 text-medium-emphasis">
        {{ formatGenderName(animal.gender) }} | {{ calculateAge(animal.dateOfBirth) }}
      </div>
    </v-card-text>
  </v-card>
</template>

<script setup lang="ts">
import PublicAnimal from "../models/public-animal";
import { formatGenderName } from "../utils/gender-formatter";
import { calculateAge } from "../utils/date-formatter";
import { useFavoritesStore } from "../stores/favorites-store";

defineProps<{ animal: PublicAnimal }>();
const favoritesStore = useFavoritesStore();

</script>

<style scoped>
.animal-card {
  transition: transform 0.2s;
}
.animal-card:hover {
  transform: translateY(-4px);
}
</style>