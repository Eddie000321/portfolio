import React from 'react';

/**
 * Project component - showcases featured portfolio projects with images and descriptions
 * Highlights role, outcome, technologies, and key accomplishments for each project
 */
export default function Project() {
  // Project data array for easy management
  const projects = [
    {
      id: "ttc-delay-insights",
      title: "TTC Delay Insights",
      image: "/images/projects/ttc-delay-insights.svg",
      description:
        "End-to-end ETL and analytics project that cleans a decade of Toronto transit delay data and loads it into PostgreSQL for SQL-first exploration and API reporting.",
      role: "Data Engineer & API Developer",
      outcome:
        "Automated ingestion for 10+ years of subway, streetcar, and bus delay events with reusable SQL views powering parameterized reports and a React dashboard.",
      technologies: ["Python", "Pandas", "PostgreSQL", "Docker", "FastAPI", "React"],
      highlights: [
        "Standardized mixed Excel/CSV sources into a unified fact table",
        "Containerized Postgres with seeded schema, indexes, and validation",
        "Exposed analytics endpoints through FastAPI for the Vite frontend"
      ],
      githubLink: "https://github.com/Eddie000321/ttc-delay-insights",
      liveLink: null,
      status: "In Progress"
    },
    {
      id: "db-lab",
      title: "DB Lab (Postgres Only)",
      image: "/images/projects/db-lab.svg",
      description:
        "Self-contained PostgreSQL playground packaged with make targets for spinning up schemas, fixtures, and indexing experiments without impacting other environments.",
      role: "Database Engineer",
      outcome:
        "Delivered a reproducible lab that provisions schema, seeds realistic relational datasets, and automates EXPLAIN-before/after benchmarks for index tuning.",
      technologies: ["PostgreSQL", "Docker", "Make"],
      highlights: [
        "Scripted schema + seed workflows that mirror Prisma-generated models",
        "Provided parameterized data generation to stress-test query plans",
        "Documented backup/restore and EXPLAIN exercises via make targets"
      ],
      githubLink: "https://github.com/Eddie000321/db-lab",
      liveLink: null,
      status: "Completed"
    },
    {
      id: "docker-prisma-todo",
      title: "Dockerized Express + Prisma Todo App",
      image: "/images/projects/docker-prisma-todo.svg",
      description:
        "Full-stack to-do platform showcasing three Node.js backends, culminating in a Dockerized Express + PostgreSQL + Prisma deployment with session auth.",
      role: "Full Stack Developer",
      outcome:
        "Delivered cookie-backed authentication, CRUD APIs, and container orchestration for local development while mapping a security hardening roadmap.",
      technologies: ["Node.js", "Express", "PostgreSQL", "Prisma", "Docker"],
      highlights: [
        "Built progressive projects from simple REST server to full Docker stack",
        "Implemented session-based auth with HttpOnly cookies across services",
        "Outlined future hardening tasks including CSRF tokens and rate limiting"
      ],
      githubLink: "https://github.com/Eddie000321/backend-nodejs-expressjs-postgresql",
      liveLink: null,
      status: "In Progress"
    },
    {
      id: "vetchart-emr",
      title: "VetChart EMR System",
      image: "/images/projects/vetchart-emr.svg",
      description:
        "Full-stack electronic medical records platform tailored for veterinary clinics with scheduling, patient management, and operational observability dashboards.",
      role: "Full Stack Developer",
      outcome:
        "Delivered a TypeScript-first monorepo with Dockerized environments, JWT-secured APIs, and ready-to-activate PostgreSQL persistence via Prisma.",
      technologies: ["React", "TypeScript", "Express", "PostgreSQL", "Docker", "Tailwind CSS"],
      highlights: [
        "Implemented appointment, billing, and medical record flows with reusable components",
        "Added Prometheus metrics, DB health checks, and backup scripts for operations",
        "Prepared Prisma schema and migrations for scaling beyond the in-memory demo"
      ],
      githubLink: "https://github.com/Eddie000321/vet-chart",
      liveLink: null,
      status: "In Progress"
    }
  ];

  return (
    <div className="projects-container">
      <div className="projects-content">
        <h1>My Projects</h1>
        <p className="projects-intro">
          Here are a few representative projects that demonstrate my experience with data
          engineering, database tooling, and full-stack application delivery.
        </p>

        <div className="projects-grid">
          {projects.map((project) => (
            <div key={project.id} className="project-card">
              {/* Project Image */}
              <div className="project-image">
                <img
                  src={project.image}
                  alt={`${project.title} screenshot`}
                  className="project-img"
                />
                <div className="project-status">
                  <span className={`status-badge ${project.status.toLowerCase().replace(' ', '-')}`}>
                    {project.status}
                  </span>
                </div>
              </div>

              {/* Project Details */}
              <div className="project-details">
                <h3 className="project-title">{project.title}</h3>
                <p className="project-description">{project.description}</p>

                {/* Role and Outcome */}
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

                {/* Technologies Used */}
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

                {project.highlights && project.highlights.length > 0 && (
                  <div className="highlights">
                    <h4>Highlights:</h4>
                    <ul className="highlight-list">
                      {project.highlights.map((item, index) => (
                        <li key={index}>{item}</li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Project Links */}
                <div className="project-links">
                  <a
                    href={project.githubLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="project-link github-link"
                  >
                    <span>📁</span> View Code
                  </a>
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
              </div>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="projects-cta">
          <h2>Interested in Working Together?</h2>
          <p>
            I'm always excited to work on new projects and challenges.
            Let's discuss how we can bring your ideas to life!
          </p>
          <button
            className="cta-button"
            onClick={() => window.location.href = '/contact'}
          >
            Get In Touch
          </button>
        </div>
      </div>
    </div>
  );
}
