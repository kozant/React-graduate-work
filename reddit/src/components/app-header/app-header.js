import React, { Component } from "react";
import "./app-header.css";

import { Link } from "react-router-dom";

export default class AppHeader extends Component {
  render() {
    const { token } = this.props;
    const guestHeader = (
      <React.Fragment>
        <li className="nav-item">
          <Link to="/login" className="nav-link">
            Sign in
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/register" className="nav-link">
            Sign up
          </Link>
        </li>
      </React.Fragment>
    );
    const userHeader = (
      <React.Fragment>
        <li className="nav-item">
          <Link to="/editor" className="nav-link">
            New Article
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/settings" className="nav-link">
            Settings
          </Link>
        </li>
        <li className="nav-item">
          <Link
            to={`/profile/${localStorage.getItem("username")}`}
            className="nav-link"
          >
            {localStorage.getItem("username")}
          </Link>
        </li>
      </React.Fragment>
    );

    const elements = token ? userHeader : guestHeader;
    return (
      <div className="container app-header">
        <nav className="navbar navbar-expand-lg navbar-light">
          <Link to="/" className="navbar-brand">
            reddit
          </Link>
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
                <Link to="/" className="nav-link">
                  Home
                </Link>
              </li>
              {elements}
            </ul>
          </div>
        </nav>
      </div>
    );
  }
}
