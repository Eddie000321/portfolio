import React, { useEffect, useState } from "react";

import useAuth from "./hooks/useAuth.js";
import { apiClient } from "./services/apiClient.js";

/**
 * Contact component - displays contact information and interactive form
 * Includes contact panel and form that captures user input and sends it to the backend
 */
export default function Contact() {
  const initialFormState = {
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  };

  const [formData, setFormData] = useState(initialFormState);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submissionStatus, setSubmissionStatus] = useState({
    submitting: false,
    message: "",
    error: null,
  });
  const [submissions, setSubmissions] = useState([]);
  const [submissionsLoading, setSubmissionsLoading] = useState(false);
  const [submissionsError, setSubmissionsError] = useState(null);
  const [deletingId, setDeletingId] = useState(null);
  const [clearingAll, setClearingAll] = useState(false);

  const { token, isAdmin } = useAuth();

  // Fetch contact submissions for admin view
  useEffect(() => {
    if (!isAdmin) {
      return;
    }

    const fetchSubmissions = async () => {
      setSubmissionsLoading(true);
      try {
        const data = await apiClient.get("/contacts");
        const sorted = [...data].sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        );
        setSubmissions(sorted);
        setSubmissionsError(null);
      } catch (err) {
        setSubmissionsError(err.message);
      } finally {
        setSubmissionsLoading(false);
      }
    };

    fetchSubmissions();
  }, [isAdmin]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmissionStatus({
      submitting: true,
      message: "",
      error: null,
    });

    try {
      const savedContact = await apiClient.post("/contacts", formData);
      setIsSubmitted(true);
      setSubmissionStatus({
        submitting: false,
        message: "Thank you! Your message has been delivered successfully.",
        error: null,
      });
      setFormData(initialFormState);
      if (isAdmin) {
        setSubmissions((prev) => [savedContact, ...prev]);
      }
    } catch (err) {
      setSubmissionStatus({
        submitting: false,
        message: "",
        error: err.message,
      });
    }
  };

  const resetForm = () => {
    setFormData(initialFormState);
    setIsSubmitted(false);
    setSubmissionStatus({
      submitting: false,
      message: "",
      error: null,
    });
  };

  const handleDeleteSubmission = async (id) => {
    if (!token) return;
    setDeletingId(id);
    try {
      await apiClient.delete(`/contacts/${id}`, { token });
      setSubmissions((prev) => prev.filter((submission) => submission._id !== id));
    } catch (err) {
      setSubmissionsError(err.message);
    } finally {
      setDeletingId(null);
    }
  };

  const handleDeleteAll = async () => {
    if (!token) return;
    setClearingAll(true);
    try {
      await apiClient.delete("/contacts", { token });
      setSubmissions([]);
    } catch (err) {
      setSubmissionsError(err.message);
    } finally {
      setClearingAll(false);
    }
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
              <em>Every message is saved in MongoDB and routed to the admin console.</em>
            </p>

            {submissionStatus.error && (
              <div className="form-error">{submissionStatus.error}</div>
            )}

            {isSubmitted ? (
              <div className="success-message">
                <div className="success-icon">✅</div>
                <h3>Thank you for your message!</h3>
                <p>{submissionStatus.message}</p>
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

                <button
                  type="submit"
                  className="submit-button"
                  disabled={submissionStatus.submitting}
                >
                  {submissionStatus.submitting ? "Sending..." : "Send Message"}
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

        {isAdmin && (
          <section className="admin-panel">
            <div className="admin-panel-header">
              <h2>Latest Contact Messages</h2>
              <button
                className="signout-button danger"
                onClick={handleDeleteAll}
                disabled={clearingAll || submissions.length === 0}
              >
                {clearingAll ? "Clearing..." : "Clear All"}
              </button>
            </div>

            {submissionsError && (
              <div className="form-error">{submissionsError}</div>
            )}

            {submissionsLoading ? (
              <p>Loading submissions...</p>
            ) : submissions.length === 0 ? (
              <p className="text-muted">No messages have been submitted yet.</p>
            ) : (
              <div className="admin-table-wrapper">
                <table className="admin-table">
                  <thead>
                    <tr>
                      <th>From</th>
                      <th>Subject</th>
                      <th>Received</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    {submissions.map((submission) => (
                      <tr key={submission._id}>
                        <td>
                          <div className="table-contact">
                            <strong>
                              {submission.firstName} {submission.lastName}
                            </strong>
                            <span>{submission.email}</span>
                            {submission.phone && (
                              <span className="contact-chip">{submission.phone}</span>
                            )}
                          </div>
                        </td>
                        <td>
                          <div className="table-subject">
                            <p>{submission.subject}</p>
                            <small>
                              {submission.message.length > 80
                                ? `${submission.message.slice(0, 80)}...`
                                : submission.message}
                            </small>
                          </div>
                        </td>
                        <td>
                          {new Date(submission.createdAt).toLocaleString("en-CA", {
                            dateStyle: "medium",
                            timeStyle: "short",
                          })}
                        </td>
                        <td>
                          <button
                            className="table-action danger"
                            onClick={() => handleDeleteSubmission(submission._id)}
                            disabled={deletingId === submission._id}
                          >
                            {deletingId === submission._id ? "Removing..." : "Delete"}
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </section>
        )}
      </div>
    </div>
  );
}
