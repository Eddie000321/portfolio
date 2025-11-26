import React from 'react';
import { Link } from 'react-router-dom';

/**
 * Home component - landing page with welcome message and mission statement
 * Provides navigation to other sections of the portfolio
 */
export default function Home() {
  return (
    <div className="home-container">
      <main className="home-content">
        {/* Hero Section */}
        <section className="hero-section">
          <div className="hero-text">
            <h1 className="hero-title">Welcome to My Portfolio</h1>
            <h2 className="hero-subtitle">Jaehyeok (Eddie) Lee - Computer Science Student</h2>

            {/* Welcome Message */}
            <p className="welcome-message">
              Hello! I'm Eddie, a passionate student with a deep interest in Computer Science
              and Software Engineering. I'm actively learning about IT and digital technologies,
              exploring how they can transform our world and create meaningful solutions.
              Welcome to my portfolio where you can follow my learning journey and projects.
            </p>

            <p className="highlight-note">
              New: I’m adding fresh cloud and full-stack projects every week—check back often
              to see what’s new.
            </p>

            {/* Mission Statement */}
            <div className="mission-statement">
              <h3>My Mission</h3>
              <p>
                I believe I can contribute to any field by giving my best effort and continuously
                learning from every experience. Currently, I'm eager to gain real-world experience
                and actively seeking co-op and internship opportunities where I can apply my
                knowledge, learn from industry professionals, and contribute to meaningful projects
                that make a difference.
              </p>
            </div>

            {/* Call to Action Buttons */}
            <div className="cta-buttons">
              <Link to="/about" className="cta-button primary">
                Learn About Me
              </Link>
              <Link to="/project" className="cta-button secondary">
                View My Projects
              </Link>
              <Link to="/contact" className="cta-button tertiary">
                Get In Touch
              </Link>
            </div>
          </div>

          {/* Hero Image/Visual */}
          <div className="hero-visual">
            <div className="hero-graphic">
              <div className="code-symbol">&lt;/&gt;</div>
              <p className="hero-tagline">Building the Future, One Line at a Time</p>
            </div>
          </div>
        </section>

        {/* Quick Overview Section */}
        <section className="overview-section">
          <h3>What I Can Help With</h3>
          <div className="overview-grid">
            <div className="overview-item">
              <h4>🗄️ Database Design & SQL</h4>
              <p>Database design, SQL optimization, and data management solutions</p>
            </div>
            <div className="overview-item">
              <h4>📊 Data Analysis & Engineering</h4>
              <p>Data analysis, visualization, and insights using Python and SQL</p>
            </div>
            <div className="overview-item">
              <h4>🌐 Web Development</h4>
              <p>Modern, responsive web applications using React, JavaScript, and more</p>
            </div>
            <div className="overview-item">
              <h4>☁️ Cloud Computing & DevOps</h4>
              <p>Azure cloud services, deployment, and DevOps practices</p>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
