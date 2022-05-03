<template>
  <div class="container">
    <a :href="html_url" target="_blank" class="commit">{{ sha }}</a>
    - <span class="message">{{ commit.message }}</span
    ><br />
    by
    <span class="author">
      <a :href="author.html_url" target="_blank">{{ commit.author.name }}</a>
    </span>
    at <span class="date">{{ commit.author.date }}</span>
  </div>
</template>

<script>
export default {
  props: ["html_url", "sha", "commit", "author"],
};
</script>

<style scoped>
.author,
.date {
  font-weight: bold;
}
.container {
  display: block;
}
</style>
