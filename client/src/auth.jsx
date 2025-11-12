import React, { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import useAuth from "./hooks/useAuth.js";

const Auth = ({ initialView = "signin" }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { signin, signup, authError, resetAuthError } = useAuth();

  const [signInForm, setSignInForm] = useState({ email: "", password: "" });
  const [signUpForm, setSignUpForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [signInSubmitting, setSignInSubmitting] = useState(false);
  const [signUpSubmitting, setSignUpSubmitting] = useState(false);
  const [signInError, setSignInError] = useState(null);
  const [signUpError, setSignUpError] = useState(null);

  const signInEmailRef = useRef(null);
  const signUpNameRef = useRef(null);

  useEffect(() => {
    resetAuthError();
    return () => resetAuthError();
  }, [resetAuthError]);

  useEffect(() => {
    if (initialView === "signup") {
      signUpNameRef.current?.focus();
    } else {
      signInEmailRef.current?.focus();
    }
  }, [initialView]);

  const handleSignInChange = (event) => {
    const { name, value } = event.target;
    setSignInForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSignUpChange = (event) => {
    const { name, value } = event.target;
    setSignUpForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSignInSubmit = async (event) => {
    event.preventDefault();
    setSignInSubmitting(true);
    setSignInError(null);
    try {
      await signin(signInForm);
      const redirectPath = location.state?.from?.pathname || "/";
      navigate(redirectPath, { replace: true });
    } catch (err) {
      setSignInError(err.message);
    } finally {
      setSignInSubmitting(false);
    }
  };

  const handleSignUpSubmit = async (event) => {
    event.preventDefault();
    if (signUpForm.password !== signUpForm.confirmPassword) {
      setSignUpError("Passwords do not match");
      return;
    }
    setSignUpSubmitting(true);
    setSignUpError(null);
    try {
      await signup({
        name: signUpForm.name,
        email: signUpForm.email,
        password: signUpForm.password,
      });
      navigate("/", { replace: true });
    } catch (err) {
      setSignUpError(err.message);
    } finally {
      setSignUpSubmitting(false);
    }
  };

  return (
    <div className="auth-container combined">
      <div className="auth-row">
        <section className="auth-panel">
          <div className="panel-header">
            <p className="panel-eyebrow">Welcome back</p>
            <h1>Sign In</h1>
            <p className="panel-subtitle">
              Access your personalized dashboard and admin tools.
            </p>
          </div>

          {(signInError || authError) && (
            <div className="form-error">{signInError || authError}</div>
          )}

          <form className="auth-form" onSubmit={handleSignInSubmit}>
            <div className="form-group">
              <label htmlFor="signin-email">Email Address</label>
              <input
                id="signin-email"
                name="email"
                type="email"
                value={signInForm.email}
                onChange={handleSignInChange}
                ref={signInEmailRef}
                autoComplete="email"
                placeholder="you@example.com"
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="signin-password">Password</label>
              <input
                id="signin-password"
                name="password"
                type="password"
                value={signInForm.password}
                onChange={handleSignInChange}
                autoComplete="current-password"
                placeholder="Enter your password"
                required
              />
            </div>
            <button
              type="submit"
              className="submit-button"
              disabled={signInSubmitting}
            >
              {signInSubmitting ? "Signing in..." : "Sign In"}
            </button>
          </form>
        </section>

        <section className="auth-panel highlight">
          <div className="panel-header">
            <p className="panel-eyebrow">New here?</p>
            <h1>Create an Account</h1>
            <p className="panel-subtitle">
              Sign up to personalize your experience and save your preferences.
            </p>
          </div>

          {signUpError && <div className="form-error">{signUpError}</div>}

          <form className="auth-form" onSubmit={handleSignUpSubmit}>
            <div className="form-group">
              <label htmlFor="signup-name">Full Name</label>
              <input
                id="signup-name"
                name="name"
                type="text"
                value={signUpForm.name}
                onChange={handleSignUpChange}
                ref={signUpNameRef}
                placeholder="Enter your full name"
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="signup-email">Email Address</label>
              <input
                id="signup-email"
                name="email"
                type="email"
                value={signUpForm.email}
                onChange={handleSignUpChange}
                autoComplete="email"
                placeholder="you@example.com"
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="signup-password">Password</label>
              <input
                id="signup-password"
                name="password"
                type="password"
                value={signUpForm.password}
                onChange={handleSignUpChange}
                autoComplete="new-password"
                placeholder="Create a secure password"
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="signup-confirmPassword">Confirm Password</label>
              <input
                id="signup-confirmPassword"
                name="confirmPassword"
                type="password"
                value={signUpForm.confirmPassword}
                onChange={handleSignUpChange}
                placeholder="Repeat your password"
                required
              />
            </div>
            <button
              type="submit"
              className="submit-button secondary"
              disabled={signUpSubmitting}
            >
              {signUpSubmitting ? "Creating account..." : "Create Account"}
            </button>
          </form>
        </section>
      </div>
    </div>
  );
};

export default Auth;
