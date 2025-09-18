import React, { useState } from 'react';

/**
 * Contact component - displays contact information and interactive form
 * Includes contact panel and form that captures user input and redirects to home
 */
export default function Contact() {
  // State management for form data
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });

  // State for form submission status
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    // Log form data (since form doesn't need to be fully functional initially)
    console.log('Form submitted with data:', formData);

    // Set submission status
    setIsSubmitted(true);

    // Show success message briefly, then redirect to home
    setTimeout(() => {
      window.location.href = '/';
    }, 2000);
  };

  // Reset form
  const resetForm = () => {
    setFormData({
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      subject: '',
      message: ''
    });
    setIsSubmitted(false);
  };

  return (
    <div className="contact-container">
      <div className="contact-content">
        <h1>Contact Me</h1>
        <p className="contact-intro">
          I'd love to hear from you! Whether you have a project in mind, want to collaborate,
          or just want to say hello, feel free to reach out.
        </p>

        <div className="contact-layout">
          {/* Contact Information Panel */}
          <div className="contact-info-panel">
            <h2>Get In Touch</h2>

            <div className="contact-item">
              <div className="contact-icon">📧</div>
              <div className="contact-details">
                <h3>Email</h3>
                <p>eddie000321@outlook.com</p>
                <a href="mailto:eddie000321@outlook.com" className="contact-link">
                  Send Email
                </a>
              </div>
            </div>

            <div className="contact-item">
              <div className="contact-icon">📱</div>
              <div className="contact-details">
                <h3>Phone</h3>
                <p>+1 (000) 000-0000</p>
                <a href="tel:+10000000000" className="contact-link">
                  Call Now
                </a>
              </div>
            </div>

            <div className="contact-item">
              <div className="contact-icon">📍</div>
              <div className="contact-details">
                <h3>Location</h3>
                <p>Toronto, Ontario, Canada</p>
                <p>Available for remote work</p>
              </div>
            </div>

            <div className="contact-item">
              <div className="contact-icon">💼</div>
              <div className="contact-details">
                <h3>LinkedIn</h3>
                <p>Connect with me professionally</p>
                <a
                  href="https://www.linkedin.com/in/jleedev/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="contact-link"
                >
                  View Profile
                </a>
              </div>
            </div>

            <div className="contact-item">
              <div className="contact-icon">🐙</div>
              <div className="contact-details">
                <h3>GitHub</h3>
                <p>Check out my code repositories</p>
                <a
                  href="https://github.com/Eddie000321"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="contact-link"
                >
                  View Projects
                </a>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="contact-form-section">
            <h2>Send Me a Message</h2>
            <p className="form-description">
              Fill out the form below and I'll get back to you soon.
              <em>Note: This form captures your information and will redirect you to the home page.</em>
            </p>

            {isSubmitted ? (
              <div className="success-message">
                <div className="success-icon">✅</div>
                <h3>Thank you for your message!</h3>
                <p>I've received your message and will get back to you soon.</p>
                <p>Redirecting to home page...</p>
                <button onClick={resetForm} className="reset-button">
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="contact-form">
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="firstName">First Name *</label>
                    <input
                      type="text"
                      id="firstName"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      required
                      placeholder="Enter your first name"
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="lastName">Last Name *</label>
                    <input
                      type="text"
                      id="lastName"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      required
                      placeholder="Enter your last name"
                    />
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="email">Email Address *</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      placeholder="Enter your email address"
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="phone">Phone Number</label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder="Enter your phone number"
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="subject">Subject *</label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    required
                    placeholder="What's this about?"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="message">Message *</label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    rows="6"
                    placeholder="Tell me about your project or inquiry..."
                  ></textarea>
                </div>

                <button type="submit" className="submit-button">
                  Send Message
                </button>

                <p className="form-note">
                  * Required fields. I'll respond within 24-48 hours.
                </p>
              </form>
            )}
          </div>
        </div>

        {/* Additional Contact Information */}
        <div className="additional-info">
          <h3>Let's Work Together</h3>
          <p>
            I'm currently available for freelance projects and full-time opportunities.
            Whether you need help with web development, database design, or technical consulting,
            I'm here to help bring your vision to life.
          </p>

          <div className="availability-status">
            <span className="status-indicator available"></span>
            <span>Currently available for new projects</span>
          </div>
        </div>
      </div>
    </div>
  );
}
