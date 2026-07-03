<template>
  <v-slide-group
    class="pa-4"
    selected-class="bg-transparent"
    show-arrows
  >
    <v-slide-group-item
      v-for="animal in animals"
      :key="animal.id"
    >
      <div
        style="width: 300px"
        class="pa-2"
    >
        <AnimalCard
            :animal="animal"
            @like="onLike"
        />
      </div>
    </v-slide-group-item>

    <v-slide-group-item v-if="hasMore">
      <div
        class="d-flex align-center justify-center pa-4"
        style="height: 100%;"
      >
        <v-btn
          icon="mdi-chevron-right"
          size="x-large"
          variant="outlined"
          color="primary"
          :loading="loading"
          @click="$emit('load-more')"
        />
      </div>
    </v-slide-group-item>
  </v-slide-group>
</template>

<script setup lang="ts">
import AnimalCard from "./AnimalCard.vue";

defineProps<{
  animals: any[];
  loading: boolean;
  hasMore: boolean;
}>();

const emit = defineEmits(["load-more", "like"]);

const onLike = (id: number) => {
  emit("like", id);
};
</script>