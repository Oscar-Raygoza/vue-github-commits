<template>
    <a v-bind:href="html_url" target="_blank" class="commit">
        {{ shortSha(sha) }}
    </a>
    - <span class="message"> {{ commit.message }} </span>
    por
    <a v-bind:href="author.html_url" target="_blank" class="commit">
        <span class="author">{{ commit.author.name }}</span>
    </a>
    - <span class="date">{{ dateFormat(commit.author.date) }}</span>
</template>

<script>
export default {
    props: ["html_url", "sha", "commit", "author"],
    name: "CommitComponent",
    methods: {
        shortSha(sha) {
            return sha.substr(0, 7);
        },
        dateFormat(date) {
            return new Date(date).toLocaleString();
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
}
</style>