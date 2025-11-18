import React from "react";
import { BrowserRouter as Router } from "react-router-dom";

import MainRouter from "../MainRouter";
import { AuthProvider } from "./context/AuthContext.jsx";
import BackendLoadingOverlay from "./components/BackendLoadingOverlay.jsx";

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <BackendLoadingOverlay />
        <MainRouter />
      </Router>
    </AuthProvider>
  );
};

export default App;
