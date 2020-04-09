import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCog } from "@fortawesome/free-solid-svg-icons";
import { faExternalLinkAlt } from "@fortawesome/free-solid-svg-icons";
import "./app-header.css";
import withUser from "../../hocs";

import { Link } from "react-router-dom";

const AppHeader = ({ data }) => {
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
          <FontAwesomeIcon icon={faExternalLinkAlt} /> New Article
        </Link>
      </li>
      <li className="nav-item">
        <Link to="/settings" className="nav-link">
          <FontAwesomeIcon icon={faCog} /> Settings
        </Link>
      </li>
      <li className="nav-item">
        <Link to={`/profile/${data.username}`} className="nav-link">
          {data.username}
        </Link>
      </li>
    </React.Fragment>
  );

  const elements = data.token ? userHeader : guestHeader;
  return (
    <nav className="navbar navbar-light app-header">
      <div className="container">
        <Link to="/" className="navbar-brand">
          reddit
        </Link>

        <ul className="nav navbar-nav pull-xs-right">
          <li className="nav-item">
            <Link to="/" className="nav-link">
              Home
            </Link>
          </li>
          {elements}
        </ul>
      </div>
    </nav>
  );
};

export default withUser(AppHeader);
