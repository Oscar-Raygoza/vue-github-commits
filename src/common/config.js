export const BASE_API_URL =
  "https://api.github.com/repos/Oscar-Raygoza/vue-github-commits";

export const githubUser = "vtolentino";
export const token = "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";
export const encoded = btoa(githubUser + ":" + token);

export const COMMITS_URL = `${BASE_API_URL}/commits?per_page=3&sha=`;

export const BRANCHES_URL = `${BASE_API_URL}/branches`;

const userGithubConfig = {
  token: token,
  username: githubUser,
};
export const Encode = btoa(
  `${userGithubConfig.username}${userGithubConfig.token}`
);
