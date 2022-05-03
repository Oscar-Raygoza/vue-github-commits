<template>
  <DefaultLayout>
    <template v-slot:content>
      <Home />
    </template>
  </DefaultLayout>
</template>

<script>
import DefaultLayout from "@/layouts/DefaultLayout.vue";
import Home from "@/views/Home.vue";

import "@/assets/css/global.css";

export default {
  name: "App",
  components: {
    DefaultLayout,
    Home,
  },
};
</script>
