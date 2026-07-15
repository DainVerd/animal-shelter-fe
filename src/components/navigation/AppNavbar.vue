<template>
  <DesktopNavbar v-if="mdAndUp" />
  <MobileNavbar v-else />
</template>

<script lang="ts" setup>
  import { useDisplay } from "vuetify";
  import DesktopNavbar from "./DesktopNavbar.vue";
  import MobileNavbar from "./MobileNavbar.vue";

  const { mdAndUp } = useDisplay();
</script>