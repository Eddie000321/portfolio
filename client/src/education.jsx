import React, { useEffect, useState } from "react";

import useAuth from "./hooks/useAuth.js";
import { apiClient } from "./services/apiClient.js";

const qualificationFormDefaults = {
  institution: "",
  program: "",
  status: "",
  period: "",
  location: "",
  type: "college",
  description: "",
  highlights: "",
};

const programTypes = [
  { label: "College / Diploma", value: "college" },
  { label: "University", value: "university" },
  { label: "Certificate", value: "certificate" },
  { label: "Course", value: "course" },
  { label: "Bootcamp", value: "bootcamp" },
];

const courseCatalog = [
  {
    category: "Web Development",
    courses: [
      "Advanced React Development",
      "Node.js & Express.js",
      "Full-Stack Web Applications",
      "RESTful API Design",
    ],
  },
  {
    category: "Database Management",
    courses: [
      "Oracle Database Administration",
      "SQL Query Optimization",
      "Database Design Principles",
      "NoSQL Database Systems",
    ],
  },
  {
    category: "Programming Languages",
    courses: [
      "JavaScript ES6+ Advanced Features",
      "Python for Data Analysis",
      "C# .NET Development",
      "Java Object-Oriented Programming",
    ],
  },
];

const certifications = [
  {
    title: "Introduction to Python",
    provider: "Online Learning Platform",
    date: "June 2024",
    status: "completed",
  },
  {
    title: "Intermediate Python",
    provider: "Online Learning Platform",
    date: "July 2024",
    status: "completed",
  },
  {
    title: "Microsoft Azure Fundamentals (AZ-900)",
    provider: "Microsoft Learn",
    date: "July 2024",
    status: "completed",
  },
  {
    title: "ASP.NET Core MVC Development",
    provider: "LinkedIn Learning",
    date: "July 2024",
    status: "completed",
  },
];

const currentStudies = [
  {
    topic: "Cloud Computing with Azure",
    description: "Advanced cloud architecture and deployment strategies",
    progress: "In Progress",
  },
  {
    topic: "React Advanced Patterns",
    description: "Complex state management and performance optimization",
    progress: "In Progress",
  },
  {
    topic: "Database Performance Tuning",
    description: "Advanced SQL optimization and indexing strategies",
    progress: "Planning",
  },
  {
    topic: "DevOps & CI/CD Pipelines",
    description: "Automated deployment and infrastructure management",
    progress: "Planning",
  },
];

const Education = () => {
  const [qualifications, setQualifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [formData, setFormData] = useState(qualificationFormDefaults);
  const [formMode, setFormMode] = useState("create");
  const [editingId, setEditingId] = useState(null);
  const [formFeedback, setFormFeedback] = useState(null);
  const [formSubmitting, setFormSubmitting] = useState(false);
  const [deletingId, setDeletingId] = useState(null);

  const { isAdmin, token } = useAuth();

  const sortQualifications = (items) =>
    [...items].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

  useEffect(() => {
    const fetchQualifications = async () => {
      setLoading(true);
      try {
        const data = await apiClient.get("/qualifications");
        setQualifications(sortQualifications(data));
        setError(null);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchQualifications();
  }, []);

  const normalizeHighlights = (value) =>
    value
      .split(/[\n,]/)
      .map((item) => item.trim())
      .filter(Boolean);

  const handleFormChange = (event) => {
    const { name, value } = event.target;
    setFormFeedback(null);
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

const resetForm = () => {
  setFormData(qualificationFormDefaults);
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
      institution: formData.institution,
      program: formData.program,
      status: formData.status,
      period: formData.period,
      location: formData.location,
      type: formData.type,
      description: formData.description,
      highlights: normalizeHighlights(formData.highlights),
    };

    try {
      if (formMode === "edit" && editingId) {
        const updated = await apiClient.put(
          `/qualifications/${editingId}`,
          payload,
          { token }
        );
        setQualifications((prev) =>
          prev.map((item) => (item._id === editingId ? updated : item))
        );
        setFormFeedback({ type: "success", message: "Entry updated successfully." });
      } else {
        const created = await apiClient.post("/qualifications", payload, { token });
        setQualifications((prev) => [created, ...prev]);
        setFormFeedback({ type: "success", message: "Entry added successfully." });
      }
      resetForm();
    } catch (err) {
      setFormFeedback({ type: "error", message: err.message });
    } finally {
      setFormSubmitting(false);
    }
  };

  const handleEdit = (qualification) => {
    setFormFeedback(null);
    setFormMode("edit");
    setEditingId(qualification._id);
    setFormData({
      institution: qualification.institution || "",
      program: qualification.program || "",
      status: qualification.status || "",
      period: qualification.period || "",
      location: qualification.location || "",
      type: qualification.type || "college",
      description: qualification.description || "",
      highlights: qualification.highlights?.join(", ") || "",
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
      await apiClient.delete(`/qualifications/${id}`, { token });
      setQualifications((prev) => prev.filter((item) => item._id !== id));
    } catch (err) {
      setFormFeedback({ type: "error", message: err.message });
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div className="education-container">
      <div className="education-content">
        <h1>Education &amp; Learning</h1>
        <p className="education-intro">
          My educational journey combines formal academic studies with continuous professional
          development, ensuring I stay current with evolving technologies.
        </p>

        <section className="formal-education">
          <h2>Formal Education</h2>
          {loading ? (
            <p>Loading education history...</p>
          ) : error ? (
            <div className="form-error">{error}</div>
          ) : qualifications.length === 0 ? (
            <p className="text-muted">
              No education entries have been added yet. Admins can add them below.
            </p>
          ) : (
            <div className="education-timeline">
              {qualifications.map((qualification) => (
                <div
                  key={qualification._id}
                  className={`education-item ${qualification.type || ""}`}
                >
                  <div className="education-header">
                    <div className="institution-info">
                      <h3 className="institution-name">{qualification.institution}</h3>
                      <h4 className="degree-title">{qualification.program}</h4>
                      <p className="education-status">{qualification.status}</p>
                    </div>
                    <div className="education-meta">
                      <span className="period">{qualification.period}</span>
                      <span className="location">{qualification.location}</span>
                    </div>
                  </div>

                  <div className="education-details">
                    <p className="description">{qualification.description}</p>

                    {qualification.highlights?.length > 0 && (
                      <div className="highlights">
                        <h5>Key Areas of Study:</h5>
                        <ul>
                          {qualification.highlights.map((highlight, index) => (
                            <li key={index}>{highlight}</li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {isAdmin && (
                      <div className="admin-actions">
                        <button
                          className="resource-action"
                          onClick={() => handleEdit(qualification)}
                        >
                          Edit
                        </button>
                        <button
                          className="resource-action danger"
                          onClick={() => handleDelete(qualification._id)}
                          disabled={deletingId === qualification._id}
                        >
                          {deletingId === qualification._id ? "Removing..." : "Delete"}
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

        {isAdmin && (
          <section className="admin-panel">
            <h2>{formMode === "edit" ? "Update Education Entry" : "Add Education Entry"}</h2>
            <p className="section-subtitle">
              Use the form to manage the education timeline stored in MongoDB.
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
                  <label htmlFor="institution">Institution *</label>
                  <input
                    id="institution"
                    name="institution"
                    type="text"
                    value={formData.institution}
                    onChange={handleFormChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="program">Program / Degree *</label>
                  <input
                    id="program"
                    name="program"
                    type="text"
                    value={formData.program}
                    onChange={handleFormChange}
                    required
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="status">Status *</label>
                  <input
                    id="status"
                    name="status"
                    type="text"
                    value={formData.status}
                    onChange={handleFormChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="period">Period *</label>
                  <input
                    id="period"
                    name="period"
                    type="text"
                    value={formData.period}
                    onChange={handleFormChange}
                    required
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="location">Location *</label>
                  <input
                    id="location"
                    name="location"
                    type="text"
                    value={formData.location}
                    onChange={handleFormChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="type">Program Type *</label>
                  <select
                    id="type"
                    name="type"
                    value={formData.type}
                    onChange={handleFormChange}
                  >
                    {programTypes.map((programType) => (
                      <option key={programType.value} value={programType.value}>
                        {programType.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="description">Program Summary *</label>
                <textarea
                  id="description"
                  name="description"
                  rows="4"
                  value={formData.description}
                  onChange={handleFormChange}
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
                  onChange={handleFormChange}
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
                    ? "Update Entry"
                    : "Add Entry"}
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
          </section>
        )}

        <section className="courses-section">
          <h2>Relevant Coursework</h2>
          <p className="section-subtitle">Core courses that shaped my technical foundation</p>

          <div className="courses-grid">
            {courseCatalog.map((category, index) => (
              <div key={index} className="course-category">
                <h3 className="category-title">{category.category}</h3>
                <ul className="course-list">
                  {category.courses.map((course, courseIndex) => (
                    <li key={courseIndex} className="course-item">
                      {course}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="update-notice">
            <p>🔄 This section is regularly updated as I complete new courses and programs.</p>
          </div>
        </section>

        <section className="certifications-section">
          <h2>Certifications &amp; Achievements</h2>
          <p className="section-subtitle">
            Professional certifications and completed learning programs
          </p>

          <div className="certifications-grid">
            {certifications.map((certification, index) => (
              <div key={index} className="certification-card">
                <div className="cert-icon">🏆</div>
                <div className="cert-details">
                  <h4 className="cert-title">{certification.title}</h4>
                  <p className="cert-provider">{certification.provider}</p>
                  <div className="cert-meta">
                    <span className="cert-date">{certification.date}</span>
                    <span className="cert-status completed">✅ Completed</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="current-studies">
          <h2>Current Learning Focus</h2>
          <p className="section-subtitle">
            Topics I'm actively studying and planning to explore
          </p>

          <div className="studies-grid">
            {currentStudies.map((study, index) => (
              <div key={index} className="study-card">
                <div className="study-header">
                  <h4 className="study-topic">{study.topic}</h4>
                  <span
                    className={`study-progress ${study.progress
                      .toLowerCase()
                      .replace(/\s+/g, "-")}`}
                  >
                    {study.progress}
                  </span>
                </div>
                <p className="study-description">{study.description}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="learning-philosophy">
          <h2>My Learning Philosophy</h2>
          <div className="philosophy-content">
            <div className="philosophy-item">
              <div className="philosophy-icon">📚</div>
              <div className="philosophy-text">
                <h4>Continuous Learning</h4>
                <p>
                  Technology evolves rapidly. I believe in staying current through regular study
                  and hands-on practice with new tools and frameworks.
                </p>
              </div>
            </div>

            <div className="philosophy-item">
              <div className="philosophy-icon">🛠️</div>
              <div className="philosophy-text">
                <h4>Practical Application</h4>
                <p>
                  Learning is most effective when combined with real-world projects. I apply new
                  knowledge immediately in personal and professional projects.
                </p>
              </div>
            </div>

            <div className="philosophy-item">
              <div className="philosophy-icon">🤝</div>
              <div className="philosophy-text">
                <h4>Knowledge Sharing</h4>
                <p>
                  I believe in sharing knowledge with the community and learning from others
                  through collaboration and open-source contributions.
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Education;
