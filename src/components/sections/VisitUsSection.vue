<template>
  <section class="py-8">
    <v-container
      max-width="1100"
      class="px-4"
    >
    <v-row>
      <v-col
        cols="12"
        class="text-center mb-8"
      >
        <h2 class="text-h3 font-weight-bold">Visit us</h2>
      </v-col>
      <v-col
        cols="12"
        md="6"
        class="d-flex flex-column pr-md-10"
      >
        <p class="text-body-1 grey--text text--darken-2">
            <span class="text-caption text-grey d-block mb-2">Adress:</span>
            <span class="text-h5 font-weight-medium lh-base">
              64a, Thulehemsvägen, 224 67 Lund,<br>Sweden
            </span>
          </p>
        <p
          class="text-body-1 mt-auto pt-8 pt-md-0 text-grey-darken-1 d-none d-md-block"
          style="line-height: 1.6;"
        >
            There are still many friends waiting for their chance to bring
            love and joy into the lives of caring individuals and families.
          </p>
      </v-col>
      <v-col
        cols="12"
        md="6"
      >
        <LeafletMap
          :lat="55.7047"
          :lng="13.1910"
          marker-label="PetsPets Shelter"
          id="map-section"
        />
      </v-col>
      <v-col
        cols="12"
        class="d-block d-md-none pt-4"
      >
        <p class="text-body-1 text-grey-darken-1">
          There are still many friends waiting for their chance to bring
          love and joy into the lives of caring individuals and families.
        </p>
      </v-col>
    </v-row>
    </v-container>
  </section>
</template>
<script setup lang="ts">
  import LeafletMap from "../LeafletMap.vue";
</script>