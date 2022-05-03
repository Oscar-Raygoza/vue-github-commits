<template>
  <!-- <h1>HelloWorld</h1> -->
  <h1 id="texto">Ultimos Commit del repo</h1>
  <div id="lista">
    <div
      class="container-branch"
      v-for="({ name, sha }, index) in branches"
      :key="sha"
    >
      <input
        type="radio"
        name="branch"
        v-bind:id="name"
        :value="name"
        v-model="currentBranch"
      />
      <label :for="name">{{ name }}</label>
    </div>
  </div>
  <!-- <span>
    <br />
    @{{ currentBranch }}
  </span> -->
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

<script>
import Commit from "@/components/Commit.vue";
// console.log("test");
import { Encode, COMMITS_URL, BRANCHES_URL } from "@/common/config.js";

const headers = new Headers();
headers.set("Authorization", `Basic ${Encode}`);

export default {
  name: "HomeView",
  components: {
    Commit,
  },
  data: () => ({
    Commitanches: null,
    currentBranch: "master",
    commits: null,
  }),
  watch: {
    currentBranch: "getCommits",
  },
  // computed:{
  //   // FormData
  // },
  created() {
    this.getCommits();
    this.getBranches();
  },
  methods: {
    async getCommits() {
      try {
        const url = `${COMMITS_URL}${this.currentBranch}`;
        this.commits = await (await fetch(url, { headers })).json();
      } catch (error) {
        console.log(error);
      }
    },
    async getBranches() {
      try {
        const response = await fetch(BRANCHES_URL, { headers });
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
/* * {
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
 */

#texto {
  text-align: -webkit-center;
  height: 50px;
}
#lista {
  display: flex;
  justify-content: space-around;
  height: 40px;
}
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
  /* margin: 15px; */
  display: inline-block;
  background-color: #8d8d8d;
  padding: 10px 25px;
  border-radius: 15px;
}
.container-branch:hover {
  background-color: #42b883;
  color: #fff;
}
</style>
