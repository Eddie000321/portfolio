import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import About from "./src/about";
import Contact from "./src/contact";
import Education from "./src/education";
import Project from "./src/project";
import Services from "./src/services";
import SignIn from "./src/signin";
import SignUp from "./src/signup";
import Layout from "./components/Layout";

/**
 * MainRouter component - handles routing for the portfolio application
 * Defines all available routes and their corresponding components
 */
const MainRouter = () => {
  return (
    <div>
      <Layout />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/education" element={<Education />} />
        <Route path="/project" element={<Project />} />
        <Route path="/services" element={<Services />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
      </Routes>
    </div>
  );
};
export default MainRouter;
