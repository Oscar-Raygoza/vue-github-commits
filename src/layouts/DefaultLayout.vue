<template>
  <header>
    <h1>GitHub App</h1>
  </header>
  <slot name="content"></slot>
  <footer>@2022 - OscarRaygoza</footer>
</template>

<script>
//import { version as projectVersion } from "../../package.json";
export default {
  name: "DefaultLayout",
};
</script>

<style scoped>
header {
  width: 100%;
  height: 80px;
  background-color: #000;
  color: #fff;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
    Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
}
</style>
