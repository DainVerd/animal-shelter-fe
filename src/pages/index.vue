<template>
  <v-container>
    <HeroSection />
    <StatsSection />
    <PetsSection />
    <JoinUsSection />
    <StoriesSection />
    <HowToSection />
    <VisitUsSection />
  </v-container>
</template>

<script setup lang="ts">

  import HeroSection    from "../components/sections/HeroSection.vue";
  import StatsSection   from "../components/sections/StatsSection.vue";
  import PetsSection    from "../components/sections/PetsSection.vue";
  import JoinUsSection  from "../components/sections/JoinUsSection.vue";
  import StoriesSection from "../components/sections/StoriesSection.vue";
  import HowToSection   from "../components/sections/HowToSection.vue";
  import VisitUsSection from "../components/sections/VisitUsSection.vue";
</script>
