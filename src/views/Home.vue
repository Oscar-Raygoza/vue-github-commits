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
import Commit from "@/components/Commit.vue";
import { Encode, COMMITS_URL, BRANCHES_URL } from "@/common/config.js";

const headers = new Headers();
headers.set("Authorization", `$Basic ${Encode}`);

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
