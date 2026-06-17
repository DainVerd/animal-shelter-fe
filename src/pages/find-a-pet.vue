
 <template>
  <PageWrapper
    title="Find a Pet"
    :breadcrumbs="pageBreadcrumbs"
    :withCard="false"
  >
  </PageWrapper>
</template>

<script setup lang="ts">
import PageWrapper from "../components/PageWrapper.vue";
import { BreadcrumbItem } from "../models/bread-crumb-item.ts";

const pageBreadcrumbs: BreadcrumbItem[] = [
  { title: "Home", to: "/" },
  { title: "Find a Pet", to: "/find-a-pet" },
];
</script>