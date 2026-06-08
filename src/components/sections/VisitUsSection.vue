<template>
  <section class="py-8">
    <v-row>
      <v-col
        cols="12"
        align="center"
      >
        <h4 class="text-h4">Visit us</h4>
      </v-col>
      <v-col
        cols="12"
        md="6"
        class="d-flex flex-column"
      >
        <p class="text-body-1">
          <b>Address:</b> 64a, Thulehemsvägen, 224 67 Lund, Sweden
        </p>
        <p class="text-body-2 mt-auto d-none d-md-block">
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
        />
      </v-col>
      <v-col
        cols="12"
        class="d-block d-md-none"
      >
        <p class="text-body-2">
          There are still many friends waiting for their chance to bring
          love and joy into the lives of caring individuals and families.
        </p>
      </v-col>
    </v-row>
  </section>
</template>
<script setup lang="ts">
  import LeafletMap from "@/components/LeafletMap.vue";
</script>