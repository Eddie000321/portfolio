import React from 'react';

/**
 * Education component - displays educational background, certifications, and study topics
 * Showcases academic achievements and continuous learning journey
 */
export default function Education() {
  // Academic institutions data
  const education = [
    {
      id: 1,
      institution: "Centennial College",
      degree: "Computer Engineering Technology - Advanced Diploma (3 Year Program)",
      status: "Currently Enrolled",
      period: "2024 - Present",
      location: "Toronto, ON, Canada",
      type: "college",
      description: "Comprehensive 3-year advanced diploma program covering practical computer engineering skills, programming languages, and hands-on technology projects. Currently developing solid foundation in software development and engineering principles.",
      highlights: [
        "Programming in Multiple Languages",
        "Hardware & Software Integration",
        "Network Administration",
        "Project Management"
      ]
    },
    {
      id: 2,
      institution: "Korea National Open University",
      degree: "Bachelor's Degree in Computer Science",
      status: "Transfer Student - Currently Enrolled",
      period: "2025 - Present",
      location: "Seoul, South Korea",
      type: "university",
      description: "Transferred as a 3rd year student to pursue comprehensive computer science education with focus on advanced software development, algorithms, and system design.",
      highlights: [
        "Software Engineering Principles",
        "Data Structures & Algorithms",
        "Database Management Systems",
        "Web Development Technologies"
      ]
    }
  ];

  // Courses data (easily updatable)
  const courses = [
    {
      category: "Web Development",
      courses: [
        "Advanced React Development",
        "Node.js & Express.js",
        "Full-Stack Web Applications",
        "RESTful API Design"
      ]
    },
    {
      category: "Database Management",
      courses: [
        "Oracle Database Administration",
        "SQL Query Optimization",
        "Database Design Principles",
        "NoSQL Database Systems"
      ]
    },
    {
      category: "Programming Languages",
      courses: [
        "JavaScript ES6+ Advanced Features",
        "Python for Data Analysis",
        "C# .NET Development",
        "Java Object-Oriented Programming"
      ]
    }
  ];

  // Certifications and current studies
  const certifications = [
    {
      title: "Introduction to Python",
      provider: "Online Learning Platform",
      date: "June 2024",
      status: "completed",
      type: "certificate"
    },
    {
      title: "Intermediate Python",
      provider: "Online Learning Platform",
      date: "July 2024",
      status: "completed",
      type: "certificate"
    },
    {
      title: "Microsoft Azure Fundamentals (AZ-900)",
      provider: "Microsoft Learn",
      date: "July 2024",
      status: "completed",
      type: "certificate"
    },
    {
      title: "ASP.NET Core MVC Development",
      provider: "LinkedIn Learning",
      date: "July 2024",
      status: "completed",
      type: "certificate"
    }
  ];

  // Current study topics
  const currentStudies = [
    {
      topic: "Cloud Computing with Azure",
      description: "Advanced cloud architecture and deployment strategies",
      progress: "In Progress"
    },
    {
      topic: "React Advanced Patterns",
      description: "Complex state management and performance optimization",
      progress: "In Progress"
    },
    {
      topic: "Database Performance Tuning",
      description: "Advanced SQL optimization and indexing strategies",
      progress: "Planning"
    },
    {
      topic: "DevOps & CI/CD Pipelines",
      description: "Automated deployment and infrastructure management",
      progress: "Planning"
    }
  ];

  return (
    <div className="education-container">
      <div className="education-content">
        <h1>Education & Learning</h1>
        <p className="education-intro">
          My educational journey combines formal academic studies with continuous
          professional development, ensuring I stay current with evolving technologies.
        </p>

        {/* Formal Education Section */}
        <section className="formal-education">
          <h2>Formal Education</h2>
          <div className="education-timeline">
            {education.map((edu) => (
              <div key={edu.id} className={`education-item ${edu.type}`}>
                <div className="education-header">
                  <div className="institution-info">
                    <h3 className="institution-name">{edu.institution}</h3>
                    <h4 className="degree-title">{edu.degree}</h4>
                    <p className="education-status">{edu.status}</p>
                  </div>
                  <div className="education-meta">
                    <span className="period">{edu.period}</span>
                    <span className="location">{edu.location}</span>
                  </div>
                </div>

                <div className="education-details">
                  <p className="description">{edu.description}</p>

                  <div className="highlights">
                    <h5>Key Areas of Study:</h5>
                    <ul>
                      {edu.highlights.map((highlight, index) => (
                        <li key={index}>{highlight}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Courses Section */}
        <section className="courses-section">
          <h2>Relevant Coursework</h2>
          <p className="section-subtitle">Core courses that shaped my technical foundation</p>

          <div className="courses-grid">
            {courses.map((category, index) => (
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

          {/* Update Notice */}
          <div className="update-notice">
            <p>🔄 This section is regularly updated as I complete new courses and programs.</p>
          </div>
        </section>

        {/* Certifications Section */}
        <section className="certifications-section">
          <h2>Certifications & Achievements</h2>
          <p className="section-subtitle">Professional certifications and completed learning programs</p>

          <div className="certifications-grid">
            {certifications.map((cert, index) => (
              <div key={index} className="certification-card">
                <div className="cert-icon">🏆</div>
                <div className="cert-details">
                  <h4 className="cert-title">{cert.title}</h4>
                  <p className="cert-provider">{cert.provider}</p>
                  <div className="cert-meta">
                    <span className="cert-date">{cert.date}</span>
                    <span className={`cert-status ${cert.status}`}>
                      {cert.status === 'completed' ? '✅ Completed' : '🔄 In Progress'}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Current Studies Section */}
        <section className="current-studies">
          <h2>Current Learning Focus</h2>
          <p className="section-subtitle">Topics I'm actively studying and planning to explore</p>

          <div className="studies-grid">
            {currentStudies.map((study, index) => (
              <div key={index} className="study-card">
                <div className="study-header">
                  <h4 className="study-topic">{study.topic}</h4>
                  <span className={`study-progress ${study.progress.toLowerCase().replace(' ', '-')}`}>
                    {study.progress}
                  </span>
                </div>
                <p className="study-description">{study.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Learning Philosophy */}
        <section className="learning-philosophy">
          <h2>My Learning Philosophy</h2>
          <div className="philosophy-content">
            <div className="philosophy-item">
              <div className="philosophy-icon">📚</div>
              <div className="philosophy-text">
                <h4>Continuous Learning</h4>
                <p>Technology evolves rapidly. I believe in staying current through regular study and hands-on practice with new tools and frameworks.</p>
              </div>
            </div>

            <div className="philosophy-item">
              <div className="philosophy-icon">🛠️</div>
              <div className="philosophy-text">
                <h4>Practical Application</h4>
                <p>Learning is most effective when combined with real-world projects. I apply new knowledge immediately in personal and professional projects.</p>
              </div>
            </div>

            <div className="philosophy-item">
              <div className="philosophy-icon">🤝</div>
              <div className="philosophy-text">
                <h4>Knowledge Sharing</h4>
                <p>I believe in sharing knowledge with the community and learning from others through collaboration and open-source contributions.</p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
