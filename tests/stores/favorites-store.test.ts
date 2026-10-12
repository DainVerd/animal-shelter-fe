import { beforeEach, describe, expect, it } from "vitest";
import { createPinia, setActivePinia } from "pinia";
import { useFavoritesStore } from "../../src/stores/favorites-store";

describe("favorites store", () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });

  it("starts with no favorites", () => {
    const store = useFavoritesStore();

    expect(store.favoriteIds).toEqual([]);
    expect(store.isFavorite(7)).toBe(false);
  });

  it("adds an animal to favorites", () => {
    const store = useFavoritesStore();

    store.toggleFavorite(7);

    expect(store.favoriteIds).toEqual([7]);
    expect(store.isFavorite(7)).toBe(true);
  });

  it("removes an animal that is already a favorite", () => {
    const store = useFavoritesStore();
    store.favoriteIds = [3, 7, 12];

    store.toggleFavorite(7);

    expect(store.favoriteIds).toEqual([3, 12]);
    expect(store.isFavorite(7)).toBe(false);
  });
});
