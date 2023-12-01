import React from "react";
import { NavLink, Link } from "react-router-dom";
import { useSelector } from "react-redux";
import logo from "../../assets/logo.png";
// import * as logo from "../../assets/Anisphere.svg";
import "./landingpage.css";
import { useHistory } from "react-router-dom/";

function LandingPage() {
  const history = useHistory();
  //   const goHome = history.push("./home");
  return (
    <div id="landing-page">
      <div className="landing-container">
        <img src={logo} alt="logo" style={{ width: "30%", height: "auto" }} />
        <Link to="/homepage">
          <button id="landing-btn">Cool Kids Enter Here</button>
        </Link>
      </div>
    </div>
  );
}
export default LandingPage;
