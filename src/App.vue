<template>
  <h1>HelloWorld</h1>
</template>

<script>
const BASE_API_URL =
  "https://api.github.com/repos/Oscar-Raygoza/vue-github-commits";

const COMMITS_URL = `${BASE_API_URL}/commits?per_page=3&sha=`;
const BRANCHES_URL = `${BASE_API_URL}/branches`;

export default {
  data: () => ({
    branches: null,
    currentBranch: "master",
    commits: null,
  }),
  created() {
    
  },
  methods: {
    async getCommits() {
      const url = `${COMMITS_URL}${this.currentBranch}`;
      //await (await fetch(url)).json();

      fetch(url)
        .then((res) => res.json())
        .then((res) => {
          this.commits = res;
        })
        .catch((err) => console.error(err));
    },
    async getBranches() {
      //await (await fetch(url)).json();
    fetch(BRANCHES_URL)
        .then((res) => res.json())
        .then((res) => {
          this.branches = res.map((branch) => branch.name);
        })
        .catch((err) => console.error(err));
    },
  },
};
</script>
<style scoped>
h1 {
  color: red;
}
</style>
