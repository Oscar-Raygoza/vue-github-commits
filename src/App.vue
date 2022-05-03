<template>
  <DefaultLayout>
    <template v-slot:content>
      <Home />
    </template>
  </DefaultLayout>
</template>

<script>
import "@/assets/css/global.css";
import DefaultLayout from "@/layouts/DefaultLayout.vue";
import Home from "@/views/Home.vue";

export default {
  name: "App",
  components: {
    DefaultLayout,
    Home,
  }
}
</script>

<style scoped>
</style>
