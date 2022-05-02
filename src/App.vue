<script>
/*
* Composition API

import { ref, watchEffect } from 'vue'

const API_URL = `https://api.github.com/repos/Oscar-Raygoza/vue-github-commits/commits?per_page=3&sha=`
const branches = ['main', 'v2-compat']

const currentBranch = ref(branches[0])
const commits = ref(null)

watchEffect(async () => {
  // this effect will run immediately and then
  // re-run whenever currentBranch.value changes
  const url = `${API_URL}${currentBranch.value}`
  commits.value = await (await fetch(url)).json()
})

function truncate(v) {
  const newline = v.indexOf('\n')
  return newline > 0 ? v.slice(0, newline) : v
}

function formatDate(v) {
  return v.replace(/T|Z/g, ' ')
}
*/

/*
 * Options API
 */

const BASE_API_URL =
  "https://api.github.com/repos/Oscar-Raygoza/vue-github-commits";

const COMMITS_URL = `${BASE_API_URL}/commits?per_page=3&sha=`;
const BRANCHES_URL = `${BASE_API_URL}/branches`;

export default {
  data: () => ({
    branches: null, // DEFAULT MAIN BRANCH
    currentBranch: "master",
    commits: null,
  }),
  created() {
    // fetch on init
    this.fetchData();
    this.fetchBranches();
  },
  watch: {
    // re-fetch whenever currentBranch changes
    currentBranch: "fetchData",
  },

  methods: {
    async fetchData() {
      const url = `${COMMITS_URL}${this.currentBranch}`;
      this.commits = await (await fetch(url)).json();
    },
    async fetchBranches() {
      const branches = await (await fetch(BRANCHES_URL)).json();
      this.branches = branches.map((b) => b.name);
    },
  },
};
</script>

<template>
  <h1>Latest Commits in this repository</h1>
  <template v-for="branch in branches" :key="branch.sha">
    <input
      type="radio"
      :id="branch"
      :value="branch"
      name="branch"
      v-model="currentBranch"
    />
    <label :for="branch">{{ branch }}</label>
  </template>
  <p>vuejs/vue@{{ currentBranch }}</p>
  <ul>
    <li v-for="{ html_url, sha, author, commit } in commits" :key="sha">
      <a :href="html_url" target="_blank" class="commit">{{ sha }}</a>
      - <span class="message">{{ commit.message }}</span
      ><br />
      by
      <span class="author">
        <a :href="author.html_url" target="_blank">{{ commit.author.name }}</a>
      </span>
      at <span class="date">{{ commit.author.date }}</span>
    </li>
  </ul>
</template>

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
  line-height: 1.5em;
  margin-bottom: 20px;
}

.author,
.date {
  font-weight: bold;
}
</style>
