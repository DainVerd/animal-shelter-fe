import { defineStore } from "pinia";
import { ref, computed } from "vue";

export const useFavoritesStore = defineStore("favorites", () => {
  const favoriteIds = ref<number[]>([]);

  const isFavorite = (id: number) => favoriteIds.value.includes(id);

  const toggleFavorite = (id: number) => {
    const index = favoriteIds.value.indexOf(id);
    if (index === -1) {
      favoriteIds.value.push(id);
    } else {
      favoriteIds.value.splice(index, 1);
    }
  };

  return { favoriteIds, isFavorite, toggleFavorite };
}, { persist: true });