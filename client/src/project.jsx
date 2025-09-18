import React from 'react';

/**
 * Project component - showcases portfolio projects with images and descriptions
 * Displays at least 3 projects with details about role and outcomes
 */
export default function Project() {
  // Project data array for easy management
  const projects = [
    {
      id: 1,
      title: "E-Commerce React Application",
      image: "/api/placeholder/400/300",
      description: "A full-stack e-commerce platform built with React, Node.js, and MongoDB. Features include user authentication, product catalog, shopping cart, and payment integration.",
      role: "Full Stack Developer",
      outcome: "Developed a complete shopping platform with 99% uptime and secure payment processing. Implemented responsive design supporting desktop and mobile users.",
      technologies: ["React", "Node.js", "MongoDB", "Express", "JWT", "Stripe API"],
      githubLink: "https://github.com/eddie/ecommerce-app",
      liveLink: "https://ecommerce-demo.netlify.app",
      status: "Completed"
    },
    {
      id: 2,
      title: "Hospital Management System",
      image: "/api/placeholder/400/300",
      description: "A comprehensive hospital management system with patient records, appointment scheduling, and staff management. Built with modern database design principles.",
      role: "Database Developer & Backend Engineer",
      outcome: "Created an efficient system handling 1000+ patient records with optimized queries reducing data retrieval time by 60%. Implemented secure login system for different user roles.",
      technologies: ["Oracle Database", "SQL", "PHP", "HTML5", "CSS3", "JavaScript"],
      githubLink: "https://github.com/eddie/hospital-management",
      liveLink: null,
      status: "Completed"
    },
    {
      id: 3,
      title: "Real-Time Chat Application",
      image: "/api/placeholder/400/300",
      description: "A real-time messaging application with features like group chats, file sharing, and online status indicators. Built using WebSocket technology for instant communication.",
      role: "Full Stack Developer",
      outcome: "Successfully deployed application supporting 100+ concurrent users with real-time message delivery. Implemented end-to-end encryption for secure communication.",
      technologies: ["React", "Socket.io", "Node.js", "Express", "MongoDB", "JWT"],
      githubLink: "https://github.com/eddie/chat-app",
      liveLink: "https://realtime-chat-demo.herokuapp.com",
      status: "Completed"
    },
    {
      id: 4,
      title: "Personal Finance Tracker",
      image: "/api/placeholder/400/300",
      description: "A mobile-responsive web application for tracking personal expenses, budgeting, and financial goal setting with interactive charts and analytics.",
      role: "Frontend Developer & UI/UX Designer",
      outcome: "Designed and developed an intuitive interface with data visualization helping users track spending patterns. Achieved 95% user satisfaction in beta testing.",
      technologies: ["React", "Chart.js", "Local Storage", "CSS3", "Responsive Design"],
      githubLink: "https://github.com/eddie/finance-tracker",
      liveLink: "https://personal-finance-tracker.vercel.app",
      status: "In Progress"
    },
    {
      id: 5,
      title: "Weather Forecast API Integration",
      image: "/api/placeholder/400/300",
      description: "A weather application that fetches real-time weather data from multiple APIs and provides detailed forecasts with location-based services.",
      role: "API Integration Specialist",
      outcome: "Integrated multiple weather APIs with 99.9% uptime and implemented caching system reducing API calls by 40%. Added geolocation features for automatic location detection.",
      technologies: ["JavaScript", "REST APIs", "Geolocation API", "Local Storage", "CSS3"],
      githubLink: "https://github.com/eddie/weather-app",
      liveLink: "https://weather-forecast-app.netlify.app",
      status: "Completed"
    }
  ];

  return (
    <div className="projects-container">
      <div className="projects-content">
        <h1>My Projects</h1>
        <p className="projects-intro">
          Here are some of the projects I've worked on that showcase my skills in
          full-stack development, database design, and user experience.
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
