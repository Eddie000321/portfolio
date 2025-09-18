import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import About from "./about";

const MainRouter = () => {
  return (
    <div>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/about" element={<About />} />
      </Routes>
    </div>
  );
};
export default MainRouter;
