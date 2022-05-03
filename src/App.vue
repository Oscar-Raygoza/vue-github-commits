<template>
  <!-- <h1>HelloWorld</h1> -->
  <h1>Ultimos Commit del repo</h1>
  <div v-for="(branch, index) in branches" :key="index">
    <input
      type="radio"
      name="branch"
      id="branch"
      value="branch"
    />
    <label :for="branch">{{branch.name}}</label>
  </div>
</template>

<script>
// console.log("test");
const BASE_API_URL =
  "https://api.github.com/repos/Oscar-Raygoza/vue-github-commits";

const COMMITS_URL = `${BASE_API_URL}/commits?per_page=3&sha=`;

const BRANCHES_URL = `${BASE_API_URL}/branches`;

export default {
  data: () => ({
    branches: null,
    currentBranch: "master",
    commit: null,
  }),
  created() {
    this.getCommits();
    this.getBranches();
  },
  methods: {
    async getCommits() {
      try {
        const url = `${COMMITS_URL}${this.currentBranch}`;
        this.commit = await (await fetch(url)).json();
      } catch (error) {
        console.log(error);
      }

      // fetch(COMMITS_URL)
      //   .then((result) => {
      //     return result.json();
      //   })
      //   .then((result) => {
      //     this.commit = result;
      //   })
      //   .catch((error)=>{

      //   });
    },
    async getBranches() {
      try {
        const response = await fetch(BRANCHES_URL);
        const branches = await response.json();
        this.branches = branches;
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>
<style scoped>
/* # {
  font-family: -apple-sis;
} */

h1 {
  color: red;
}
</style>
