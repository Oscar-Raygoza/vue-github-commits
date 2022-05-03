<template>
  <h1>Ultimos commits dentro de nuestro repositorio</h1>
  <div class="container-branch" v-for="{ name, sha } in branches" :key="sha">
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
  <span style="padding: 50px">@{{ currentBranch }}</span>
  <div class="container">
    <ul>
      <li v-for="{ html_url, sha, author, commit } in commits" :key="sha">
        <Commit
          v-bind:html_url="html_url"
          v-bind:sha="sha"
          v-bind:author="author"
          v-bind:commit="commit"
        />
      </li>
    </ul>
  </div>
</template>

<script>
import Commit from "@/components/Commit.vue";
import { Encode, COMMITS_URL, BRANCHES_URL } from "@/common/config.js";

console.log(Encode);
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
h1 {
  text-align: center;
  padding: 50px;
}

span {
  display: block;
}
.container {
  display: flex;
  justify-self: center;
  padding: 50px;
}
</style>
