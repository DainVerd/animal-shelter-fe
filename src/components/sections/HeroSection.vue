<template>
  <section class="py-8">
    <v-row>
      <v-col
        cols="3"
        sm="6"
        class="d-flex flex-column align-start"
        style="gap: 16px"
      >
        <v-btn
          color="primary"
          append-icon="mdi-map-marker"
          elevation="0"
          variant="text"
          class="ps-0 justify-start"
          @click="scrollToMap"
        >
          Lund
        </v-btn>
        <h1 :class="md ? 'text-h1 d-none d-sm-block' : 'text-h2 d-none d-sm-block'">
          Animal Shelter
        </h1>
        <p :class="md ? 'text-body-l d-none d-sm-block' : 'text-body-1 d-none d-sm-block'">
          to find the pets loving and reliable home
        </p>
      </v-col>

      <v-col
        cols="9"
        sm="6"
        class="d-flex justify-end"
      >
        <v-img
          src="../../../src/assets/cat-and-dog-image.webp"
          alt="Rude dog with small cat watching at the viewer"
          :max-width="imgMaxWidth"
          :aspect-ratio="4 / 3"
          width="100%"
          rounded="xl"
          cover
        />
      </v-col>

      <!-- xs only -->
      <v-col
        cols="6"
        class="d-block d-sm-none"
      >
        <h2 class="text-h2">Animal Shelter</h2>
      </v-col>
      <v-col
        cols="6"
        class="d-block d-sm-none"
      >
        <p class="text-body-1">to find the pets loving and reliable home</p>
      </v-col>
    </v-row>

    <!-- btns -->
    <v-row class="mt-4">
      <v-col
        cols="6"
        md="3"
      >
        <v-btn
          block
          color="primary"
          size="x-large"
        >
          Find a Cat
        </v-btn>
      </v-col>
      <v-col
        cols="6"
        md="3"
      >
        <v-btn
          block
          color="primary"
          size="x-large"
        >
          Find a Dog
        </v-btn>
      </v-col>
    </v-row>
  </section>
</template>

<script setup lang="ts">

  import { computed } from "vue";
  import { useDisplay } from "vuetify";

  const { mdAndUp, md } = useDisplay();
  const imgMaxWidth = computed(() => mdAndUp.value ? 420 : 271);

  const scrollToMap = () => {
  const mapElement = document.getElementById("map-section");
  if (mapElement) {
    mapElement.scrollIntoView({ behavior: "smooth", block: "start" });
  }
};

</script>