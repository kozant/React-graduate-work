import React from "react";
import "./app-header.css";

const AppHeader = () => {
  return (
    <div className="container app-header">
      <nav className="navbar navbar-expand-lg navbar-light">
        <a className="navbar-brand" href="#">
          reddit
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav ml-auto">
            <li className="nav-item">
              <a className="nav-link" href="#">
                Home
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link active" href="#">
                Sign in
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">
                Sign up
              </a>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  );
};

export default AppHeader;
