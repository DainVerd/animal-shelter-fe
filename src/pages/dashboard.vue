<route lang="json">
{
  "meta": {
    "requiresAuth": true
  }
}
</route>

<template>
  <v-layout class="bg-grey-lighten-4 rounded rounded-md">
    <v-main>
      <v-container
        fluid
        class="pa-6"
      >
        <v-row>
          <v-col cols="12">
            <v-card
              elevation="2"
              rounded="xl"
              class="pa-4"
            >
              <v-card-item>
                <template v-slot:prepend>
                  <v-avatar
                    color="primary"
                    size="large"
                    class="mr-3"
                  >
                    <v-icon
                      icon="mdi-shield-crown"
                      color="white"
                    ></v-icon>
                  </v-avatar>
                </template>
                <v-card-title class="text-h5 font-weight-bold">
                  Welcome back, {{ authStore.user?.userName || "Admin" }}!
                </v-card-title>
                <v-card-subtitle class="mt-1">
                  Active Role: 
                  <v-chip
                    color="success"
                    size="small"
                    class="ml-1 font-weight-bold"
                  >
                    {{ authStore.user?.activeRole || "SuperAdmin" }}
                  </v-chip>
                </v-card-subtitle>
              </v-card-item>

              <v-card-text class="text-body-1 text-grey-darken-1 mt-4">
                This is your protected dashboard stub. Only authenticated users with valid tokens can view this page. If you log out or clear your local storage, you will be redirected back to the login screen.
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>

        <v-row>
          <v-col
            cols="12"
            md="4"
          >
            <v-card
              elevation="1"
              rounded="lg"
              class="pa-4 text-center"
            >
              <v-icon
                icon="mdi-paw"
                size="48"
                color="info"
                class="mb-2"
              ></v-icon>
              <div class="text-h4 font-weight-bold">42</div>
              <div class="text-subtitle-1 text-grey">Animals in Shelter</div>
            </v-card>
          </v-col>
          <v-col
            cols="12"
            md="4"
          >
            <v-card
              elevation="1"
              rounded="lg"
              class="pa-4 text-center"
            >
              <v-icon
                icon="mdi-account-check"
                size="48"
                color="success"
                class="mb-2"
              ></v-icon>
              <div class="text-h4 font-weight-bold">12</div>
              <div class="text-subtitle-1 text-grey">Active Volunteers</div>
            </v-card>
          </v-col>
          <v-col
            cols="12"
            md="4"
          >
            <v-card
              elevation="1"
              rounded="lg"
              class="pa-4 text-center"
            >
              <v-icon
                icon="mdi-alert-circle-outline"
                size="48"
                color="warning"
                class="mb-2"
              ></v-icon>
              <div class="text-h4 font-weight-bold">3</div>
              <div class="text-subtitle-1 text-grey">Pending Requests</div>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-layout>
</template>

<script setup lang="ts">
  import { useAuthStore } from "../stores/auth-store";

  const authStore = useAuthStore();
</script>