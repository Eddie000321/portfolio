import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import useAuth from "./hooks/useAuth.js";

const SignUp = () => {
  const navigate = useNavigate();
  const { signup, authError, resetAuthError } = useAuth();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {
    resetAuthError();
    return () => resetAuthError();
  }, [resetAuthError]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      setErrorMessage("Passwords do not match");
      return;
    }
    setSubmitting(true);
    setErrorMessage(null);
    try {
      await signup({
        name: formData.name,
        email: formData.email,
        password: formData.password,
      });
      navigate("/", { replace: true });
    } catch (err) {
      setErrorMessage(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h1>Create an Account</h1>
        <p>Sign up to personalize your experience and save your preferences.</p>

        {(errorMessage || authError) && (
          <div className="form-error">{errorMessage || authError}</div>
        )}

        <form onSubmit={handleSubmit} className="auth-form">
          <div className="form-group">
            <label htmlFor="name">Full Name</label>
            <input
              id="name"
              name="name"
              type="text"
              value={formData.name}
              onChange={handleChange}
              required
              placeholder="Enter your full name"
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">Email Address</label>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              value={formData.email}
              onChange={handleChange}
              required
              placeholder="you@example.com"
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="new-password"
              value={formData.password}
              onChange={handleChange}
              required
              placeholder="Create a secure password"
            />
          </div>

          <div className="form-group">
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
              placeholder="Repeat your password"
            />
          </div>

          <button
            type="submit"
            className="submit-button"
            disabled={submitting}
          >
            {submitting ? "Creating account..." : "Create Account"}
          </button>
        </form>

        <p className="auth-switch">
          Already have an account? <Link to="/signin">Sign in</Link>
        </p>
      </div>
    </div>
  );
};

export default SignUp;
