import React from 'react';

/**
 * Services component - displays the services offered
 * Showcases professional skills and offerings to potential clients/employers
 */
const Services = () => {
  return (
    <div className="services-container">
      <div className="services-content">
        <h1>Technical Skills & Services</h1>
        <p className="services-intro">
          As a Computer Science student, I can contribute to various projects and help with
          different technical challenges. Here are the areas where I can provide assistance.
        </p>

        <div className="services-grid">
          {/* Database & SQL Service */}
          <div className="service-card">
            <div className="service-icon">🗄️</div>
            <h3>Database Design & SQL</h3>
            <p>
              Database design, SQL query optimization, and data management using
              Oracle Database, MongoDB, and other database systems.
            </p>
            <ul className="service-features">
              <li>SQL Query Writing & Optimization</li>
              <li>Database Design & Modeling</li>
              <li>Oracle Database Management</li>
              <li>Data Analysis & Reporting</li>
            </ul>
          </div>

          {/* Data Analysis Service */}
          <div className="service-card">
            <div className="service-icon">📊</div>
            <h3>Data Analysis & Engineering</h3>
            <p>
              Data analysis, visualization, and engineering solutions using Python,
              SQL, and data processing tools for meaningful insights.
            </p>
            <ul className="service-features">
              <li>Data Analysis with Python</li>
              <li>Data Visualization</li>
              <li>Statistical Analysis</li>
              <li>Data Processing & ETL</li>
            </ul>
          </div>

          {/* Web Development Service */}
          <div className="service-card">
            <div className="service-icon">🌐</div>
            <h3>Web Development</h3>
            <p>
              Frontend and backend web development using modern technologies like React,
              HTML5, CSS3, and JavaScript. Creating responsive and user-friendly web applications.
            </p>
            <ul className="service-features">
              <li>Frontend Development (React, HTML/CSS)</li>
              <li>Responsive Design</li>
              <li>JavaScript Programming</li>
              <li>Web Application Development</li>
            </ul>
          </div>

          {/* Cloud & DevOps Service */}
          <div className="service-card">
            <div className="service-icon">☁️</div>
            <h3>Cloud Computing & DevOps</h3>
            <p>
              Cloud deployment and DevOps practices using Azure, containerization,
              and automated deployment pipelines for scalable applications.
            </p>
            <ul className="service-features">
              <li>Microsoft Azure Services</li>
              <li>Cloud Application Deployment</li>
              <li>CI/CD Pipeline Setup</li>
              <li>Infrastructure as Code</li>
            </ul>
          </div>

          {/* Backend Development Service */}
          <div className="service-card">
            <div className="service-icon">⚙️</div>
            <h3>Backend Development</h3>
            <p>
              Server-side development and API creation using Node.js, Express,
              and various backend technologies for robust application architecture.
            </p>
            <ul className="service-features">
              <li>Server-Side Programming</li>
              <li>RESTful API Development</li>
              <li>Node.js & Express</li>
              <li>Backend Architecture</li>
            </ul>
          </div>

          {/* General Programming Service */}
          <div className="service-card">
            <div className="service-icon">💻</div>
            <h3>General Programming</h3>
            <p>
              Custom programming solutions using multiple languages including
              JavaScript, Python, C#, and Java for various project requirements.
            </p>
            <ul className="service-features">
              <li>Multi-language Programming</li>
              <li>Algorithm Implementation</li>
              <li>Code Optimization</li>
              <li>Problem-Solving Solutions</li>
            </ul>
          </div>

          {/* Technical Support Service */}
          <div className="service-card">
            <div className="service-icon">🛠️</div>
            <h3>Technical Support & Learning</h3>
            <p>
              Technical assistance, code review, and collaborative learning
              opportunities for students and small projects.
            </p>
            <ul className="service-features">
              <li>Code Review & Debugging</li>
              <li>Technical Documentation</li>
              <li>Peer Programming Support</li>
              <li>Learning & Knowledge Sharing</li>
            </ul>
          </div>
        </div>

        {/* Call to Action */}
        <div className="services-cta">
          <h2>Looking for Learning Opportunities?</h2>
          <p>
            I'm eager to apply my skills in real-world projects and learn from experienced
            professionals. Let's discuss how I can contribute to your team or project.
          </p>
          <button className="cta-button" onClick={() => window.location.href = '/contact'}>
            Get In Touch
          </button>
        </div>
      </div>
    </div>
  );
};

export default Services;