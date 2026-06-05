<template>
  <v-container class="">
    <v-row
      justify="center"
    >
      <v-col
        cols="3"
        md="6"
        class="d-flex justify-center mt-md-0"
      >
        <v-btn
          color="primary"
          append-icon="mdi-map-marker"
        >
          Lund
        </v-btn>
      </v-col>

      <v-col
        cols="9"
        md="6"
        class="d-flex justify-end mt-md-0"
      >
        <v-img
          src="https://placehold.co/200x250"
          alt="Happy Pets"
          :max-width="imgMaxWidth"
          rounded="xl"
          cover
        />
      </v-col>
      <v-col cols="12">
        <v-row>
          <v-col><h2 class="text-h2">Animal Shelter</h2></v-col>
          <v-col><p>to find the pets loving and reliable home</p></v-col>
        </v-row>
      </v-col>
    </v-row>
    <!-- btns block -->
    <v-row>
      <v-col cols="6">
        <v-btn>
          Find a Cat
        </v-btn>
      </v-col>
      <v-col cols="6">
        <v-btn>
          Find a Dog
        </v-btn>
      </v-col>
    </v-row>

    <!-- how many pets already at home block -->
     <v-row>
      <v-col cols="12">
        <h3 class="text-h3">123</h3>
        <p class="text-label">pets are already at home</p>
      </v-col>
      <v-col cols="12">
        <p class="text-label">
          If you're considering adding a pet to your family, remember that adoption not only transforms the life of a shelter animal but can also be a deeply fulfilling and life-enriching experience for you.
        </p>
      </v-col>
     </v-row>

     <!-- pets selectable row -->
      <v-row>
        <v-col>
          <h2>56 Pets available for adoption</h2>
        </v-col>
        <v-col cols="12">
          <p>cards component</p>
        </v-col>
        <v-col cols="12">
          <v-btn
            color="primary"
            size="x-large"
            variant="outlined"
            block
            out
          >
            All Pets
          </v-btn>
        </v-col>
      </v-row>

      <!-- Join Us block -->
       <v-row>
        <v-col cols="12">Logo</v-col>
        <v-col cols="12">
          <p>
            Our Facebook group PetsPets  brings together adopted pet owners, volonteers, sponsors and animal walfare organization.
          </p>
        </v-col>
       </v-row>

       <!-- adaptation stories block -->
        <v-row>
          <v-col>
            <h3 class="text-h3">
              Happy adoption stories
            </h3>
          </v-col>
          <v-col>
            image roundbin here
          </v-col>
          <v-col cols="12">
            <v-btn
              color="primary"
              size="x-large"
              variant="outlined"
              block
              out
            >
            All Stories
            </v-btn>
          </v-col>
        </v-row>

        <!--How do block-->
        <v-row>
          <v-col cols="12">
            <h4 class="text-h4">How to I take a pet home from the shelter?</h4>
          </v-col>
          <v-col cols="12">
            Search menu
          </v-col>
        </v-row>

        <!--Visit us block-->
        <v-row>
          <v-col cols="12">
            <h4 class="text-h4">Visit us</h4>
          </v-col>
          <v-col cols="12">
            <p class="text-body-1">
              Adress: 64a, Thulehemsvägen, 224 67 Lund, Sweden
            </p>
          </v-col>
          <v-col cols="12">
            LEAF MAP with coords
          </v-col>
          <v-col cols="12">
            <p>
              There are still many friends waiting for their chance to bring love and joy into the lives of caring individuals and families. 

            </p>
          </v-col>
        </v-row>

  </v-container>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import { useDisplay } from "vuetify";

const { mdAndUp } = useDisplay();
const imgMaxWidth = computed(() => mdAndUp.value ? 420 : 271);

const searchType = ref("");
const searchAge = ref("");

const handleSearch = (): void => {
  console.log("Searching for:", searchType.value, searchAge.value);
};
</script>

<style scoped>
/* Утилитарный класс для отступов между кнопками */
.gap-3 {
  gap: 12px;
}

/* Ограничение ширины кнопок на мобильных, чтобы они не растягивались на весь экран смартфона */
.max-width-mobile {
  max-width: 320px;
}

/* Кастомная обводка для карточки фильтра в стиле UI-кита */
.border-grey-card {
  border: 1px solid #CACACA !important;
}

/* На десктопе убираем ограничение ширины кнопок, так как они встают в колонку внутри сетки md="6" */
@media (min-width: 960px) {
  .max-width-mobile {
    max-width: 240px;
  }
}
</style>