import { beforeEach, describe, expect, it } from "vitest";
import { createPinia, setActivePinia } from "pinia";
import { useAppStore } from "../../src/stores/app";

describe("app store", () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });

  it("starts with an empty state", () => {
    const store = useAppStore();

    expect(store.$state).toEqual({});
  });
});
