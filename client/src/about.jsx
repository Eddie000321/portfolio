import React from 'react';

/**
 * About component - displays personal information, photo, and resume link
 * Professional page for potential employers to learn about the developer
 */
export default function About() {
  return (
    <div className="about-container">
      <div className="about-content">
        <h1>About Me</h1>

        {/* Personal Info Section */}
        <section className="personal-info">
          <div className="profile-section">
            {/* Profile Image */}
            <div className="profile-image">
              <img
                src="/api/placeholder/300/400"
                alt="Eddie Lee - Professional headshot"
                className="profile-photo"
              />
            </div>

            {/* Basic Information */}
            <div className="profile-details">
              <h2 className="full-name">Jaehyeok (Eddie) Lee</h2>
              <h3 className="title">Computer Science Student</h3>

              {/* Personal Description */}
              <div className="bio">
                <p>
                  I am Jaehyeok (Eddie) Lee, a passionate Computer Science student with a deep
                  interest in Software Engineering and IT technologies. Currently pursuing my
                  education at Korea National Open University as a transfer student, I am
                  actively learning about digital technologies and exploring how they can
                  transform our world.
                </p>

                <p>
                  My journey in technology began with curiosity about how digital solutions
                  can solve real-world problems. Through my studies at Centennial College
                  and ongoing coursework, I have been developing skills in programming,
                  database management, and web development. I believe in continuous learning
                  and applying theoretical knowledge to practical projects.
                </p>

                <p>
                  I am eager to gain real-world experience and am actively seeking co-op and
                  internship opportunities where I can contribute my skills, learn from
                  industry professionals, and grow as a future software engineer. I am
                  committed to giving my best effort in any field I contribute to.
                </p>
              </div>

              {/* Resume Download Section */}
              <div className="resume-section">
                <h3>Professional Resume</h3>
                <p>
                  Download my complete resume to learn more about my experience,
                  education, and technical skills.
                </p>
                <a
                  href="/resume/Jaehyeok_Eddie_Lee_Resume.pdf"
                  className="resume-download-btn"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  📄 Download Resume (PDF)
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Skills Overview */}
        <section className="skills-overview">
          <h3>Technical Skills</h3>
          <div className="skills-grid">
            <div className="skill-category">
              <h4>Frontend</h4>
              <ul>
                <li>React.js</li>
                <li>JavaScript (ES6+)</li>
                <li>HTML5 & CSS3</li>
                <li>Responsive Design</li>
              </ul>
            </div>
            <div className="skill-category">
              <h4>Backend</h4>
              <ul>
                <li>Node.js</li>
                <li>Express.js</li>
                <li>RESTful APIs</li>
                <li>Database Design</li>
              </ul>
            </div>
            <div className="skill-category">
              <h4>Database</h4>
              <ul>
                <li>SQL</li>
                <li>Oracle Database</li>
                <li>MongoDB</li>
                <li>Data Modeling</li>
              </ul>
            </div>
            <div className="skill-category">
              <h4>Tools & Others</h4>
              <ul>
                <li>Git & GitHub</li>
                <li>Vite</li>
                <li>VS Code</li>
                <li>Agile Methodology</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Personal Values */}
        <section className="values-section">
          <h3>My Values</h3>
          <div className="values-grid">
            <div className="value-item">
              <h4>🎯 Quality First</h4>
              <p>I believe in delivering high-quality solutions that are well-tested, maintainable, and scalable.</p>
            </div>
            <div className="value-item">
              <h4>📚 Continuous Learning</h4>
              <p>Technology evolves rapidly, and I'm committed to staying current with the latest trends and best practices.</p>
            </div>
            <div className="value-item">
              <h4>🤝 Collaboration</h4>
              <p>Great software is built by great teams. I value open communication and collaborative problem-solving.</p>
            </div>
            <div className="value-item">
              <h4>💡 Innovation</h4>
              <p>I enjoy exploring creative solutions and implementing new technologies to solve complex challenges.</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
