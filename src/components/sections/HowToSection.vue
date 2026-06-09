<template>
  <section class="py-8">
    <v-row>
      <v-col
        cols="12"
        align="center"
        >
        <h3 class="text-h3">How do I take a pet home from the shelter?</h3>
      </v-col>
      <v-col cols="12">
          <v-expansion-panels
            gap="2"
            variant="accordion"
          >
            <v-expansion-panel
              v-for="(item, index) in howToItems"
              :key="index"
              :title="item.title"
              :text="item.text"
            >
          </v-expansion-panel>
        </v-expansion-panels>

      </v-col>
    </v-row>
  </section>
</template>

<script setup lang="ts">

  const howToItems = [
    {
      title: "Choose a Pet",
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque pharetra odio ullamcorper est eleifend, a tempor justo sagittis. Pellentesque vitae pellentesque orci. Sed eget faucibus lacus, in suscipit lorem.",
    },
    {
      title: "Fill Adoption Form",
      text: "Nam aliquam nec nunc eget dignissim. Nunc sodales, lacus vel posuere aliquet, massa mi pulvinar ligula, sit amet facilisis risus neque et sem.",
    },
    {
      title: "Contact us",
      text: "nteger a velit dui. Nulla lacinia tincidunt consequat. Sed sagittis dapibus ipsum eget condimentum. In porta, enim quis finibus imperdiet, dolor purus ultricies mi, vehicula finibus leo velit non tellus. Mauris quis metus ac sapien mattis rutrum.",
    },
    {
      title: "Come to Shelter",
      text: "Morbi et felis mollis magna molestie cursus. Fusce eget finibus lorem. Aenean sit amet convallis turpis, ut sagittis nibh. Vivamus posuere leo aliquam nibh venenatis, et pellentesque enim egestas. ",
    },
    {
      title: "Take your Pet",
      text: "Ut aliquam tristique dui ac ultrices. Donec rhoncus molestie velit, vel luctus turpis condimentum sed. Aenean et tempor mi, eu tristique dolor. Morbi nec felis ac elit malesuada fermentum ac nec nunc. Mauris a nulla libero. Aliquam lobortis, nunc eget rhoncus eleifend, quam sem condimentum sem, vitae luctus ante ligula ac erat. Sed pulvinar enim ac tortor ullamcorper scelerisque. ",
    }
  ];

</script>