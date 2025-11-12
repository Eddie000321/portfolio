const API_BASE = "https://api.github.com";

const defaultUsername = process.env.GITHUB_USERNAME || "Eddie000321";
const token = process.env.GITHUB_TOKEN;

const buildHeaders = () => {
  const headers = {
    Accept: "application/vnd.github+json",
    "User-Agent": "portfolio-app",
  };
  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }
  return headers;
};

export const fetchUserRepos = async ({ username = defaultUsername } = {}) => {
  const url = `${API_BASE}/users/${username}/repos?per_page=100&sort=updated`;
  const response = await fetch(url, {
    headers: buildHeaders(),
  });

  if (!response.ok) {
    const body = await response.json().catch(() => ({}));
    throw new Error(body.message || "Failed to fetch GitHub repositories");
  }

  const repos = await response.json();
  return repos.map((repo) => ({
    id: repo.id,
    repoName: repo.name,
    fullName: repo.full_name,
    htmlUrl: repo.html_url,
    description: repo.description,
    homepage: repo.homepage,
    language: repo.language,
    topics: repo.topics,
    forks: repo.forks_count,
    stars: repo.stargazers_count,
    lastPushedAt: repo.pushed_at,
    defaultBranch: repo.default_branch,
    visibility: repo.visibility,
  }));
};
