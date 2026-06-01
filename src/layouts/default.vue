<template>
  <v-app>
    <v-app-bar flat class="border-b" color="white">
      <v-container class="d-flex align-center justify-space-between fill-height">
        <v-toolbar-title class="font-weight-bold text-primary">🐾 Animal Shelter</v-toolbar-title>
        <v-spacer></v-spacer>
        <div class="hidden-sm-and-down mr-4">
          <v-btn variant="text" to="/">About Us</v-btn>
          <v-btn variant="text" to="/shelter/animals">Help us</v-btn>
          <v-btn variant="text" to="/shelter/animals">Find a Pet</v-btn>
        </div>
        <v-btn color="primary" variant="elevated" rounded="lg" to="/auth/sign-in">
          Sign In
        </v-btn>
        <v-btn color="secondary" variant="elevated" rounded="lg" to="/auth/sign-up">
          Sign Up
        </v-btn>
      </v-container>
    </v-app-bar>

    <v-main class="bg-grey-lighten-4">
      <router-view />
    </v-main>

    <AppFooter />
  </v-app>
</template>