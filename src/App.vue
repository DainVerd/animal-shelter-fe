

<template>
  <v-app>
      <router-view />
      <v-snackbar 
        v-model="notification.show" 
        :color="notification.color" 
        timeout="3000"
        location="top right"
      >
        {{ notification.text }}
      <template v-slot:actions>
        <v-btn variant="text"
          @click="notification.show = false">
          Close
        </v-btn>
      </template>
    </v-snackbar>
  </v-app>
</template>

<script lang="ts" setup>
  import { useNotificationStore } from "./stores/notification-store";
  const notification = useNotificationStore();
</script>
