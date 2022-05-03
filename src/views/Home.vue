<script>
/**
 * Components
 * */
import Commit from "@/components/Commit.vue";

const BASE_API_URL =
  "https://api.github.com/repos/Oscar-Raygoza/vue-github-commits";

const COMMITS_URL = `${BASE_API_URL}/commits?per_page=3&sha=`;
const BRANCHES_URL = `${BASE_API_URL}/branches`;

export default {
  name: "HomeView",
  components: {
    Commit,
  },
  data: () => ({
    branches: null,
    currentBranch: "master", // DEFAULT "master" BRANCH.
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
    /*
      useEffect(() => { algo similiar a useEffect() de ReactJS
        this.fetchData();
      }, [this.currentBranch]);
    */
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
  <h1 class="title">Latest Commits in this repository</h1>
  <div class="container-branch" v-for="branch in branches" :key="branch.sha">
    <input
      type="radio"
      :id="branch"
      :value="branch"
      name="branch"
      class="branch"
      v-model="currentBranch"
    />
    <label :for="branch">{{ branch }}</label>
  </div>
  <p>Current Branch:</p>
  @{{ currentBranch }}
  <ul>
    <li v-for="{ html_url, sha, author, commit } in commits" :key="sha">
      <Commit
        :html_url="html_url"
        :sha="sha"
        :author="author"
        :commit="commit"
      />
    </li>
  </ul>
</template>

<style scoped>
.branch {
  display: inline-block;
  margin: 0 10px;
}
.title {
  text-align: center;
}

input {
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;

  border-radius: 50%;
  width: 16px;
  height: 16px;

  border: 2px solid rgb(0, 0, 0);
  transition: 0.1s all linear;
  margin-right: 5px;

  position: relative;
  top: 4px;
}
label {
  cursor: pointer;
  font-size: 12px;
  font-weight: bold;
}
input:checked {
  border: 5px solid #42b883;
}
input:checked:hover {
  border: 5px solid #ffffff;
}

.container-branch {
  margin: 15px;
  display: inline-block;
  background-color: #f2f2f2;
  padding: 10px 25px;
  border-radius: 15px;
}
.container-branch:hover {
  background-color: #42b883;
  color: #fff;
}
</style>
