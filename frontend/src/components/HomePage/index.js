import React from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import "./homepage.css";

function HomePage({ isLoaded }) {
  const user = useSelector((state) => state.session.user);
  console.log("🚀 ~ file: index.js:9 ~ HomePage ~ user:", user);

  return (
    <div className="main-page">
      <h1>HOMEEEE</h1>
    </div>
  );
}

export default HomePage;
