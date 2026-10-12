import { beforeEach, describe, expect, it } from "vitest";
import { createPinia, setActivePinia } from "pinia";
import { useNotificationStore } from "../../src/stores/notification-store";

describe("notification store", () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });

  it("starts hidden with the default values", () => {
    const store = useNotificationStore();

    expect(store.show).toBe(false);
    expect(store.text).toBe("");
    expect(store.color).toBe("success");
  });

  it("shows a success notification by default", () => {
    const store = useNotificationStore();

    store.notify("Animal saved");

    expect(store.show).toBe(true);
    expect(store.text).toBe("Animal saved");
    expect(store.color).toBe("success");
  });

  it("shows an error notification", () => {
    const store = useNotificationStore();

    store.notify("Unable to save animal", "error");

    expect(store.show).toBe(true);
    expect(store.text).toBe("Unable to save animal");
    expect(store.color).toBe("error");
  });
});
