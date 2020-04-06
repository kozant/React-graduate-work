import React from "react";
import "./server-error-component.css";

const ServerError = ({ status, data }) => {
  let elements;
  if (status === 422) {
    for (let i in data) {
      for (let j in data[i]) {
        elements = data[i][j].map((element) => {
          return <li key={element}>{j + " " + element}</li>;
        });
      }
    }
  }
  return <ul className="error-messages">{elements}</ul>;
};

export default ServerError;
