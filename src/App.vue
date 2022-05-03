<script>
import HomeView from "@/views/Home.vue";
import DefaultLayout from "@/layouts/DefaultLayout.vue";

export default {
  name: "App",
  components: {
    DefaultLayout,
    HomeView,
  },
};
</script>

<template>
  <DefaultLayout>
    <template v-slot:content>
      <HomeView />
    </template>
  </DefaultLayout>
</template>
