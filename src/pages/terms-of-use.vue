<template>
  <PageWrapper
    title="Terms of Use"
    subtitle="Last updated: June 18, 2026"
    :breadcrumbs="pageBreadcrumbs"
  >
    <v-container >
      <v-row>
        <v-col
          cols="12"
          md="12"
        >
          <div>
            <v-card 
              variant="outlined"
              rounded="xl"
              class="pa-4 bg-white border-grey-lighten-2"
            >
              <div class="text-subtitle-1 font-weight-bold mb-3 text-grey-darken-4 px-2">
                Table of Contents
              </div>
              <v-list
                density="compact"
                nav
                class="bg-transparent pa-0"
              >
                <v-list-item
                  v-for="section in sections"
                  :key="section.id"
                  :href="`#${section.id}`"
                  color="primary"
                  rounded="lg"
                  class="mb-1 py-2 text-decoration-none">
                  <v-list-item-title class="text-body-2 font-weight-medium">
                    {{ section.title }}
                  </v-list-item-title>
                </v-list-item>
              </v-list>
            </v-card>
          </div>
        </v-col>
      </v-row>
      <v-row>
          <div class="pe-md-4">
            <div
              v-for="section in sections"
              :key="section.id"
              :id="section.id"
              class="toc-section mb-10"
            >
              <h2 class="text-h5 font-weight-bold mb-4 text-primary">
                {{ section.title }}
              </h2>
              <div class="text-body-1 text-grey-darken-3 text-justify line-height-relaxed">
                <p 
                  v-for="(paragraph, pIndex) in section.paragraphs"
                  :key="pIndex"
                  class="mb-4"
                >
                  {{ paragraph }}
                </p>
              </div>
            </div>
          </div>
      </v-row>
    </v-container>
  </PageWrapper>
</template>

<script setup lang="ts">
import { BreadcrumbItem } from "../models/bread-crumb-item";

const pageBreadcrumbs: BreadcrumbItem[] = [
  { title: "Home", to: "/" },
  { title: "Terms Of Use", to: "/terms-of-use" },
];
interface TermSection {
  id: string;
  title: string;
  paragraphs: string[];
}

const sections: TermSection[] = [
  {
    id: "acceptance",
    title: "1. Acceptance of Terms",
    paragraphs: [
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
      "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
    ]
  },
  {
    id: "user-accounts",
    title: "2. User Accounts & Registration",
    paragraphs: [
      "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.",
      "Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit."
    ]
  },
  {
    id: "intellectual-property",
    title: "3. Intellectual Property Rights",
    paragraphs: [
      "At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi.",
      "Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus, omnis voluptas assumenda est, omnis dolor repellendus."
    ]
  },
  {
    id: "prohibited-activities",
    title: "4. Prohibited Activities",
    paragraphs: [
      "Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?",
      "Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet ut et voluptates repudiandae sint et molestiae non recusandae. Itaque earum rerum hic tenet a sapiente delectus, ut aut reiciendis voluptatibus maiores alias consequatur aut perferendis doloribus asperiores repellat."
    ]
  },
  {
    id: "limitation-liability",
    title: "5. Limitation of Liability",
    paragraphs: [
      "Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur.",
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. UX/UI layouts configurations options are governed under strict policy elements described contextually."
    ]
  },
  {
    id: "termination",
    title: "6. Termination of Services",
    paragraphs: [
      "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. All account actions and history parameters can be restricted upon non-compliance with the stated architectural regulations.",
      "Inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit."
    ]
  }
];
</script>

<style scoped>

</style>