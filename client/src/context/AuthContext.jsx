import React, { createContext, useCallback, useEffect, useReducer } from "react";

import { apiClient } from "../services/apiClient.js";

const AuthContext = createContext(undefined);

const STORAGE_KEY = "portfolio_auth_state";

const initialState = {
  user: null,
  token: null,
  loading: false,
  error: null,
  initializing: true,
};

const authReducer = (state, action) => {
  switch (action.type) {
    case "RESTORE_SESSION":
      return {
        ...state,
        user: action.payload?.user || null,
        token: action.payload?.token || null,
        loading: false,
        initializing: false,
        error: null,
      };
    case "AUTH_START":
      return { ...state, loading: true, error: null };
    case "AUTH_SUCCESS":
      return {
        ...state,
        user: action.payload.user,
        token: action.payload.token,
        loading: false,
        error: null,
      };
    case "AUTH_FAILURE":
      return { ...state, loading: false, error: action.payload };
    case "AUTH_RESET_ERROR":
      return { ...state, error: null };
    case "SIGN_OUT":
      return { ...initialState, initializing: false };
    case "READY":
      return { ...state, initializing: false };
    default:
      return state;
  }
};

const persistSession = (payload) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
};

const clearSession = () => {
  localStorage.removeItem(STORAGE_KEY);
};

export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        dispatch({ type: "RESTORE_SESSION", payload: parsed });
        return;
      } catch {
        clearSession();
      }
    }
    dispatch({ type: "READY" });
  }, []);

  const handleAuthSuccess = (payload) => {
    persistSession(payload);
    dispatch({ type: "AUTH_SUCCESS", payload });
  };

  const signin = async (credentials) => {
    dispatch({ type: "AUTH_START" });
    try {
      const data = await apiClient.post("/auth/signin", credentials);
      handleAuthSuccess(data);
      return data;
    } catch (err) {
      dispatch({ type: "AUTH_FAILURE", payload: err.message });
      throw err;
    }
  };

  const signup = async (payload) => {
    dispatch({ type: "AUTH_START" });
    try {
      await apiClient.post("/users", payload);
      // Automatically sign in the new user
      const loginPayload = await apiClient.post("/auth/signin", {
        email: payload.email,
        password: payload.password,
      });
      handleAuthSuccess(loginPayload);
      return loginPayload;
    } catch (err) {
      dispatch({ type: "AUTH_FAILURE", payload: err.message });
      throw err;
    }
  };

  const signout = async () => {
    try {
      await apiClient.get("/auth/signout", { token: state.token });
    } catch {
      // Even if the request fails, clear the local session
    } finally {
      clearSession();
      dispatch({ type: "SIGN_OUT" });
    }
  };

  const resetError = useCallback(
    () => dispatch({ type: "AUTH_RESET_ERROR" }),
    []
  );

  const value = {
    user: state.user,
    token: state.token,
    loading: state.loading,
    authError: state.error,
    isAuthenticated: Boolean(state.token),
    isAdmin: state.user?.role === "admin",
    signin,
    signup,
    signout,
    resetAuthError: resetError,
  };

  if (state.initializing) {
    return (
      <div className="page-loading">
        <p>Loading session...</p>
      </div>
    );
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthContext;
