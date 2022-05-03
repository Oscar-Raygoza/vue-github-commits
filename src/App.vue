<template>
  <h1>Ultimos commits dentro de nuestro repositorio</h1>
  <div v-for="(branch, index ) in branches" :key="index">
    <input type="radio" name="branch" :id="branch" :value="branch" />
    <label :for="branch"> {{ branch }}</label>
  </div>
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
    this.getBranches();
    this.getCommits();
  },
  methods: {
    async getCommitsArturo() {
      try {
        const response = await fetch(`${COMMITS_URL}${this.currenBranch}`);
        const commits = await response.json();
        this.commits = commits;
      } catch (error) {
        console.error(error);
      }
    },
    async getCommits() {
      try {
        const url = `${COMMITS_URL}${this.currentBranch}`;
        this.commmits = await (await fetch(url)).json();
      } catch (err) {
        console.error(err);
      }

      /* fetch(COMMITS_URL)
         .then((result) => {
           return result.json();
         })
         .then((result) => {
           this.commits = result;
         })
         .catch((err) => {
           console.error(err);
         });*/
    },
    async getBranches() {
      try {
        const response = await fetch(BRANCHES_URL);
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
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
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
