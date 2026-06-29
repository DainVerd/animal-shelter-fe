import { defineStore } from "pinia";
import { ref } from "vue";

export const useNotificationStore = defineStore("notification", () => {
  const show = ref(false);
  const text = ref("");
  const color = ref("success");

  function notify(message: string, type: "success" | "error" = "success") {
    text.value = message;
    color.value = type;
    show.value = true;
  }

  return { show, text, color, notify };
});
