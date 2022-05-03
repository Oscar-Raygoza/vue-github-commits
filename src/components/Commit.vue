<template>
  <a :href="html_url">{{ shortText(sha) }}</a> -
  <span class="message">{{ commit.message }}</span>
  by
  <span class="author">
    <a :href="author.html_url"> {{ commit.author.name }}</a>
  </span>
  at
  <span class="date">
    {{ FormateData(commit.author.date) }}
  </span>
</template>

<script>
export default {
  name: "CommitComponent",
  props: ["html_url", "sha", "author", "commit"],
  methods: {
    FormateData(date) {
      return new Date(date);
    },
    shortText(string) {
      return string.substring(0, 7);
    },
  },
};
</script>
<style scoped>
.author,
.date {
  font-weight: bold;
}
.container {
  display: block;
  text-align: -webkit-center;
}
</style>
