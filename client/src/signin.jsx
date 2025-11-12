import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

import useAuth from "./hooks/useAuth.js";

const SignIn = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { signin, authError, resetAuthError } = useAuth();

  const [formData, setFormData] = useState({ email: "", password: "" });
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
    setSubmitting(true);
    setErrorMessage(null);
    try {
      await signin(formData);
      const redirectPath = location.state?.from?.pathname || "/";
      navigate(redirectPath, { replace: true });
    } catch (err) {
      setErrorMessage(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h1>Sign In</h1>
        <p>Access your personalized dashboard and admin tools.</p>

        {(errorMessage || authError) && (
          <div className="form-error">{errorMessage || authError}</div>
        )}

        <form onSubmit={handleSubmit} className="auth-form">
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
              autoComplete="current-password"
              value={formData.password}
              onChange={handleChange}
              required
              placeholder="Enter your password"
            />
          </div>

          <button
            type="submit"
            className="submit-button"
            disabled={submitting}
          >
            {submitting ? "Signing in..." : "Sign In"}
          </button>
        </form>

        <p className="auth-switch">
          New here? <Link to="/signup">Create an account</Link>
        </p>
      </div>
    </div>
  );
};

export default SignIn;
