<template>
  <v-app>
    <AppNavbar />
    <v-main
      class="bg-grey-lighten-4 d-flex flex-column"
      style="min-height: 100vh;"
    >
      <div class="flex-grow-1">
        <router-view />
      </div>
      <AppFooter />
    </v-main>
  </v-app>
</template>

<script lang="ts" setup>
  import AppNavbar from "../components/navigation/AppNavbar.vue";
</script>