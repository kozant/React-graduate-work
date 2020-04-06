import React from "react";
import "./banner.css";

const Banner = ({ token }) => {
  if (!token) {
    return (
      <div className="baner">
        <div className="container">
          <h1 className="logo-font">reddit</h1>
          <p>
            A place to share your <i>React</i> knowledge.
          </p>
        </div>
      </div>
    );
  } else {
    return <React.Fragment></React.Fragment>;
  }
};

export default Banner;
