export const BASE_API_URL =
  "https://api.github.com/repos/Oscar-Raygoza/vue-github-commits";

export const COMMITS_URL = `${BASE_API_URL}/commits?per_page=3&sha=`;
export const BRANCHES_URL = `${BASE_API_URL}/branches`;

const userGithubConfig = {
  token: "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",
  username: "Oscar-Raygoza",
};
export const Encode = btoa(
  `${userGithubConfig.token}:${userGithubConfig.username}`
);
