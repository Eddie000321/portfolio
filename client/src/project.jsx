import React, { useCallback, useEffect, useState } from "react";

import useAuth from "./hooks/useAuth.js";
import { apiClient } from "./services/apiClient.js";

const projectFormDefaults = {
  title: "",
  summary: "",
  description: "",
  role: "",
  outcome: "",
  status: "In Progress",
  technologies: "",
  highlights: "",
  githubLink: "",
  liveLink: "",
  image: "",
};

const statusOptions = ["Planned", "In Progress", "Completed"];

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [formData, setFormData] = useState(projectFormDefaults);
  const [formMode, setFormMode] = useState("create");
  const [editingId, setEditingId] = useState(null);
  const [formFeedback, setFormFeedback] = useState(null);
  const [formSubmitting, setFormSubmitting] = useState(false);
  const [deletingId, setDeletingId] = useState(null);
  const [githubRepos, setGithubRepos] = useState([]);
  const [githubLoading, setGithubLoading] = useState(false);
  const [githubError, setGithubError] = useState(null);

  const { isAdmin, token } = useAuth();

  const sortProjects = (items) =>
    [...items].sort((a, b) => {
      if (typeof a.order === "number" && typeof b.order === "number") {
        return a.order - b.order;
      }
      return new Date(b.createdAt) - new Date(a.createdAt);
    });

  const loadProjects = useCallback(async () => {
    setLoading(true);
    try {
      const data = await apiClient.get("/projects");
      setProjects(sortProjects(data));
      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadProjects();
  }, [loadProjects]);

  const parseList = (value) =>
    value
      .split(/[\n,]/)
      .map((item) => item.trim())
      .filter(Boolean);

  const handleFieldChange = (event) => {
    const { name, value } = event.target;
    setFormFeedback(null);
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const resetForm = () => {
    setFormData(projectFormDefaults);
    setFormMode("create");
    setEditingId(null);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!token) {
      setFormFeedback({ type: "error", message: "Admin access required." });
      return;
    }

    setFormSubmitting(true);
    setFormFeedback(null);

    const payload = {
      title: formData.title,
      summary: formData.summary,
      description: formData.description,
      role: formData.role,
      outcome: formData.outcome,
      status: formData.status,
      technologies: parseList(formData.technologies),
      highlights: parseList(formData.highlights),
      githubLink: formData.githubLink,
      liveLink: formData.liveLink,
      image: formData.image,
    };

    try {
      if (formMode === "edit" && editingId) {
        const updated = await apiClient.put(`/projects/${editingId}`, payload, {
          token,
        });
        setProjects((prev) =>
          prev.map((project) => (project._id === editingId ? updated : project))
        );
        setFormFeedback({ type: "success", message: "Project updated successfully." });
      } else {
        const created = await apiClient.post("/projects", payload, { token });
        setProjects((prev) => sortProjects([...prev, created]));
        setFormFeedback({ type: "success", message: "Project added successfully." });
      }
      resetForm();
    } catch (err) {
      setFormFeedback({ type: "error", message: err.message });
    } finally {
      setFormSubmitting(false);
    }
  };

  const handleEdit = (project) => {
    setFormFeedback(null);
    setFormMode("edit");
    setEditingId(project._id);
    setFormData({
      title: project.title || "",
      summary: project.summary || "",
      description: project.description || "",
      role: project.role || "",
      outcome: project.outcome || "",
      status: project.status || "In Progress",
      technologies: project.technologies?.join(", ") || "",
      highlights: project.highlights?.join("\n") || "",
      githubLink: project.githubLink || "",
      liveLink: project.liveLink || "",
      image: project.image || "",
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDelete = async (id) => {
    if (!token) {
      return;
    }
    setDeletingId(id);
    setFormFeedback(null);
    try {
      await apiClient.delete(`/projects/${id}`, { token });
      setProjects((prev) => prev.filter((project) => project._id !== id));
    } catch (err) {
      setFormFeedback({ type: "error", message: err.message });
    } finally {
      setDeletingId(null);
    }
  };

  const persistOrder = useCallback(
    async (orderedProjects) => {
      if (!token) {
        return;
      }
      const payload = orderedProjects.map((project, index) => ({
        id: project._id,
        order: index,
      }));
      try {
        const updated = await apiClient.patch(
          "/projects/reorder",
          { order: payload },
          { token }
        );
        setProjects(sortProjects(updated));
      } catch (err) {
        setFormFeedback({ type: "error", message: err.message });
      }
    },
    [token]
  );

  const moveProject = (projectId, direction) => {
    setProjects((prev) => {
      const index = prev.findIndex((project) => project._id === projectId);
      if (index === -1) {
        return prev;
      }
      const newIndex = direction === "up" ? index - 1 : index + 1;
      if (newIndex < 0 || newIndex >= prev.length) {
        return prev;
      }
      const updated = [...prev];
      const [removed] = updated.splice(index, 1);
      updated.splice(newIndex, 0, removed);
      persistOrder(updated);
      return updated;
    });
  };

  const fetchGithubRepos = async () => {
    if (!token) {
      return;
    }
    setGithubLoading(true);
    setGithubError(null);
    try {
      const repos = await apiClient.get("/github/repos", { token });
      setGithubRepos(repos);
    } catch (err) {
      setGithubError(err.message);
    } finally {
      setGithubLoading(false);
    }
  };

  const importRepo = async (repo) => {
    if (!token) {
      return;
    }
    setFormFeedback(null);
    const payload = {
      title: repo.repoName,
      summary: repo.description || repo.repoName,
      description:
        repo.description ||
        "Detailed case study coming soon. Explore the GitHub repository for implementation details.",
      role: "Full Stack Developer",
      outcome: "Delivered key functionality documented in the GitHub repository.",
      status: "Completed",
      technologies: repo.topics || [],
      highlights: [],
      githubLink: repo.htmlUrl,
      liveLink: repo.homepage || "",
      image: "",
      githubRepoId: repo.id,
      githubRepoName: repo.repoName,
      githubRepoOwner: repo.fullName?.split("/")[0],
      githubRepoUrl: repo.htmlUrl,
    };
    try {
      const created = await apiClient.post("/projects", payload, { token });
      setProjects((prev) => sortProjects([...prev, created]));
      setFormFeedback({
        type: "success",
        message: `Imported ${repo.repoName} from GitHub.`,
      });
    } catch (err) {
      setFormFeedback({ type: "error", message: err.message });
    }
  };

  return (
    <div className="projects-container">
      <div className="projects-content">
        <h1>My Projects</h1>
        <p className="projects-intro">
          These projects highlight my experience across data engineering, backend APIs, and
          full-stack application development.
        </p>

        {isAdmin && (
          <section className="admin-panel">
            <h2>{formMode === "edit" ? "Update Project" : "Add New Project"}</h2>
            <p className="section-subtitle">
              Connect the frontend form directly to the protected Node/Express API.
            </p>
            {formFeedback && (
              <div
                className={
                  formFeedback.type === "error" ? "form-error" : "success-banner"
                }
              >
                {formFeedback.message}
              </div>
            )}
            <form className="resource-form" onSubmit={handleSubmit}>
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="title">Project Title *</label>
                  <input
                    id="title"
                    name="title"
                    type="text"
                    value={formData.title}
                    onChange={handleFieldChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="role">Role *</label>
                  <input
                    id="role"
                    name="role"
                    type="text"
                    value={formData.role}
                    onChange={handleFieldChange}
                    required
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="status">Status *</label>
                  <select
                    id="status"
                    name="status"
                    value={formData.status}
                    onChange={handleFieldChange}
                  >
                    {statusOptions.map((status) => (
                      <option key={status} value={status}>
                        {status}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="form-group">
                  <label htmlFor="summary">Summary</label>
                  <input
                    id="summary"
                    name="summary"
                    type="text"
                    value={formData.summary}
                    onChange={handleFieldChange}
                  />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="description">Description *</label>
                <textarea
                  id="description"
                  name="description"
                  rows="3"
                  value={formData.description}
                  onChange={handleFieldChange}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="outcome">Outcome *</label>
                <textarea
                  id="outcome"
                  name="outcome"
                  rows="3"
                  value={formData.outcome}
                  onChange={handleFieldChange}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="technologies">Technologies (comma or line separated) *</label>
                <textarea
                  id="technologies"
                  name="technologies"
                  rows="2"
                  value={formData.technologies}
                  onChange={handleFieldChange}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="highlights">Highlights (comma or line separated)</label>
                <textarea
                  id="highlights"
                  name="highlights"
                  rows="3"
                  value={formData.highlights}
                  onChange={handleFieldChange}
                />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="githubLink">GitHub URL</label>
                  <input
                    id="githubLink"
                    name="githubLink"
                    type="url"
                    value={formData.githubLink}
                    onChange={handleFieldChange}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="liveLink">Live Demo URL</label>
                  <input
                    id="liveLink"
                    name="liveLink"
                    type="url"
                    value={formData.liveLink}
                    onChange={handleFieldChange}
                  />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="image">Image URL</label>
                <input
                  id="image"
                  name="image"
                  type="url"
                  value={formData.image}
                  onChange={handleFieldChange}
                  placeholder="Optional hero image"
                />
              </div>

              <div className="resource-actions">
                <button
                  type="submit"
                  className="submit-button"
                  disabled={formSubmitting}
                >
                  {formSubmitting
                    ? "Saving..."
                    : formMode === "edit"
                    ? "Update Project"
                    : "Add Project"}
                </button>
                {formMode === "edit" && (
                  <button
                    type="button"
                    className="reset-button"
                    onClick={() => {
                      setFormFeedback(null);
                      resetForm();
                    }}
                    disabled={formSubmitting}
                  >
                    Cancel Edit
                  </button>
                )}
              </div>
            </form>
            <div className="github-panel">
              <div className="github-panel-header">
                <div>
                  <h3>GitHub repositories</h3>
                  <p className="panel-subtitle">
                    Fetch your latest repos and import them into the curated portfolio list.
                  </p>
                </div>
                <button
                  type="button"
                  className="cta-button"
                  onClick={fetchGithubRepos}
                  disabled={githubLoading}
                >
                  {githubLoading ? "Fetching..." : "Fetch from GitHub"}
                </button>
              </div>
              {githubError && <div className="form-error">{githubError}</div>}
              {githubRepos.length > 0 && (
                <div className="github-repos-grid">
                  {githubRepos.map((repo) => {
                    const isImported = projects.some(
                      (project) => project.githubRepoId === repo.id
                    );
                    return (
                      <div key={repo.id} className="github-repo-card">
                        <div className="repo-card-header">
                          <h4>{repo.repoName}</h4>
                          <span className="repo-visibility">{repo.visibility}</span>
                        </div>
                        <p className="repo-description">
                          {repo.description || "No description provided."}
                        </p>
                        <div className="repo-meta">
                          <span>⭐ {repo.stars}</span>
                          <span>🍴 {repo.forks}</span>
                          {repo.language && <span>💻 {repo.language}</span>}
                        </div>
                        <div className="repo-actions">
                          <a
                            href={repo.htmlUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="project-link github-link"
                          >
                            View Repo
                          </a>
                          <button
                            type="button"
                            className="resource-action"
                            disabled={isImported}
                            onClick={() => importRepo(repo)}
                          >
                            {isImported ? "Imported" : "Import"}
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </section>
        )}

        {loading ? (
          <p>Loading projects...</p>
        ) : error ? (
          <div className="form-error">{error}</div>
        ) : projects.length === 0 ? (
          <p className="text-muted">
            No projects have been published yet. Admins can add them using the form above.
          </p>
        ) : (
          <div className="projects-grid">
            {projects.map((project, index) => (
              <div key={project._id} className="project-card">
                <div className="project-image">
                  {project.image ? (
                    <img
                      src={project.image}
                      alt={`${project.title} visual`}
                      className="project-img"
                    />
                  ) : (
                    <div className="project-placeholder">📁</div>
                  )}
                  <div className="project-status">
                    <span
                      className={`status-badge ${project.status
                        ?.toLowerCase()
                        .replace(/\s+/g, "-")}`}
                    >
                      {project.status}
                    </span>
                  </div>
                </div>

                <div className="project-details">
                  <h3 className="project-title">{project.title}</h3>
                  {project.summary && <p className="project-summary">{project.summary}</p>}
                  <p className="project-description">{project.description}</p>

                  <div className="project-info">
                    <div className="info-section">
                      <h4>My Role:</h4>
                      <p>{project.role}</p>
                    </div>
                    <div className="info-section">
                      <h4>Outcome:</h4>
                      <p>{project.outcome}</p>
                    </div>
                  </div>

                  {project.technologies?.length > 0 && (
                    <div className="technologies">
                      <h4>Technologies:</h4>
                      <div className="tech-tags">
                        {project.technologies.map((tech, index) => (
                          <span key={index} className="tech-tag">
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {project.highlights?.length > 0 && (
                    <div className="highlights">
                      <h4>Highlights:</h4>
                      <ul className="highlight-list">
                        {project.highlights.map((highlight, index) => (
                          <li key={index}>{highlight}</li>
                        ))}
                      </ul>
                    </div>
                  )}

                  <div className="project-links">
                    {project.githubLink && (
                      <a
                        href={project.githubLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="project-link github-link"
                      >
                        <span>📁</span> View Code
                      </a>
                    )}
                    {project.liveLink && (
                      <a
                        href={project.liveLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="project-link live-link"
                      >
                        <span>🚀</span> Live Demo
                      </a>
                    )}
                  </div>

                  {isAdmin && (
                    <div className="admin-actions">
                      <span className="order-pill">
                        #{(project.order ?? index) + 1}
                      </span>
                      <button
                        className="resource-action"
                        onClick={() => moveProject(project._id, "up")}
                        disabled={index === 0}
                      >
                        ↑
                      </button>
                      <button
                        className="resource-action"
                        onClick={() => moveProject(project._id, "down")}
                        disabled={index === projects.length - 1}
                      >
                        ↓
                      </button>
                      <button
                        className="resource-action"
                        onClick={() => handleEdit(project)}
                      >
                        Edit
                      </button>
                      <button
                        className="resource-action danger"
                        onClick={() => handleDelete(project._id)}
                        disabled={deletingId === project._id}
                      >
                        {deletingId === project._id ? "Removing..." : "Delete"}
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="projects-cta">
          <h2>Interested in Working Together?</h2>
          <p>
            I'm always excited to work on new projects and challenges. Let's discuss how we can
            bring your ideas to life!
          </p>
          <button
            className="cta-button"
            onClick={() => (window.location.href = "/contact")}
          >
            Get In Touch
          </button>
        </div>
      </div>
    </div>
  );
};

export default Projects;
