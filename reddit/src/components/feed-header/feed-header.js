import React from "react";
import "./feed-header.css";

const FeedHeader = () => {
  return (
    <div className="feed-toggle">
      <ul className="nav nav-pills outline-active">
        <li className="nav-item">
          <a className="nav-link">Your Feed</a>
        </li>
        <li className="nav-item">
          <a className="nav-link active">Global Feed</a>
        </li>
        <li className="nav-item hidden">
          <a className="nav-link active">
            <i className="ion-pound"></i>
          </a>
        </li>
      </ul>
    </div>
  );
};

export default FeedHeader;
