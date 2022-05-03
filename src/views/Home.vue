<template>
    <h1>Ultimos commits de este repositorio</h1>
  <div v-for="branch in branches" :key="branch.name" class="container-branch">
    <input
      type="radio"
      :id="branch"
      :value="branch"
      name="branch"
      v-model="currentBranch"
    />
    {{ branch }}
  </div>
  <div class="container">
    @repo/ currentBranch: {{ currentBranch }}
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
  </div>
</template>

<script>
import "@/assets/css/global.css"
import Commit from "@/components/Commit.vue";

const BASE_API_URL =
  "https://api.github.com/repos/Oscar-Raygoza/vue-github-commits";
const COMMITS_URL = `${BASE_API_URL}/commits?per_page=3&sha=`;
const BRANCHES_URL = `${BASE_API_URL}/branches`;
const userConfig = {
  token: "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",
  userName: "ulisesnunezmoreno",
};
const encoded = btoa(`${userConfig.userName}:${userConfig.token}`);
const headers = new Headers();

headers.set("Authorization", `Basic ${encoded}`);

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
    this.getCommits();
    this.getBranches();
  },
  methods: {
    getCommits() {
      const url = `${COMMITS_URL}${this.currentBranch}`;
      //await (await fetch(url)).json();
      /*const fetchJson = fetch(url)
        .then((res) => res.json())
        .catch((err) => console.error(err));
        
      const result = fetchJson
        .then((res) => res)
        .catch((err) => console.error(err));
      */

      fetch(url, { headers })
        .then((res) => res.json())
        .then((res) => (this.commits = res))
        .catch((err) => console.error(err));
    },
    async getBranches() {
      fetch(BRANCHES_URL, { headers })
        .then((res) => res.json())
        .then((res) => (this.branches = res.map((branch) => branch.name)))
        .catch((err) => console.error(err));
    },
  },
};
</script>

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