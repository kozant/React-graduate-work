import React from "react";
import { Link } from "react-router-dom";
import "./app-footer.css";

const AppFooter = () => {
  return (
    <footer>
      <div className="container">
        <Link className="logo-font" to="/">
          reddit
        </Link>
        <span className="attribution">
          © 2020. An interactive learning project from
          <a href="https://thinkster.io"> Thinkster</a>. Code licensed under
          MIT.
        </span>
      </div>
    </footer>
  );
};

export default AppFooter;
