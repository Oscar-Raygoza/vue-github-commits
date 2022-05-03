<template>
  <a v-bind:href="html_url"> {{ shortText(sha) }}</a> -
  <span class="message"> {{ commit.message }}</span>
  by
  <span class="author">
    <a v-bind:href="author.html_url"> {{ commit.author.name }}</a>
  </span>
  at
  <span class="date">
    {{ formateDate(commit.author.date) }}
  </span>
  <span> {{ test }}</span>
</template>

<script>
export default {
  name: "CommitComponent",
  props: ["html_url", "sha", "author", "commit", "test"],
  methods: {
    formateDate(date) {
      return new Date(date);
    },
    shortText(string) {
      return string.substring(0, 7);
    },
  },
};
</script>
