<template>
  <h1>Ultimos commits dentro de nuestro repositorio</h1>
  <div v-for="{ name, sha } in branches" :key="sha">
    <input
      type="radio"
      name="branch"
      v-bind:id="name"
      v-bind:value="name"
      v-model="currentBranch"
    />
    <label v-bind:for="name"> {{ name }}</label>
  </div>
  <br />
  <span>@{{ currentBranch }}</span>
  <ul>
    <li v-for="{ html_url, sha, author, commit } in commits" :key="sha">
      <Commit
        v-bind:html_url="html_url"
        v-bind:sha="sha"
        v-bind:author="author"
        v-bind:commit="commit"
        test="test"
      />
    </li>
  </ul>
</template>

<script>
const BASE_API_URL =
  "https://api.github.com/repos/Oscar-Raygoza/vue-github-commits";

const COMMITS_URL = `${BASE_API_URL}/commits?per_page=3&sha=`;
const BRANCHES_URL = `${BASE_API_URL}/branches`;

const githubUser = "Oscar-Raygoza";
const token = "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";
const encoded = btoa(githubUser + ":" + token);

const headers = new Headers();
headers.set("Authorization", "Basic " + encoded);

import Commit from "@/components/Commit.vue";

export default {
  name: "HomeView",
  components: {
    Commit,
  },
  data: () => ({
    branches: null,
    currentBranch: "master",
    commits: null,
  }),
  watch: {
    currentBranch: "getCommits",
  },
  created() {
    this.getBranches();
    this.getCommits();
  },
  methods: {
    async getCommits(state, oldState) {
      try {
        const response = await fetch(`${COMMITS_URL}${this.currentBranch}`, {
          headers,
        });
        const commits = await response.json();
        this.commits = commits;
      } catch (error) {
        console.error(error);
      }
    },
    async getBranches() {
      try {
        const response = await fetch(BRANCHES_URL, { headers });
        const branches = await response.json();
        this.branches = branches;
      } catch (error) {
        console.error(error);
      }
    },
  },
};
</script>

<style scoped>
* {
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
    Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
}

a {
  text-decoration: none;
  color: #42b883;
}

li {
  line-height: 1.5;
  margin-bottom: 20px;
}

.author,
.date {
  font-weight: bold;
}
</style>
