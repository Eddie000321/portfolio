import { fetchUserRepos } from "../helpers/github.service.js";

export const listRepos = async (req, res) => {
  try {
    const repos = await fetchUserRepos({
      username: req.query.username,
    });
    res.json(repos);
  } catch (err) {
    res.status(502).json({ error: err.message || "Failed to fetch GitHub data" });
  }
};

export default { listRepos };
