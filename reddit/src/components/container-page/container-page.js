import React from "react";
import "./container-page.css";

const ContainerPage = ({ top, bottom }) => {
  return (
    <React.Fragment>
      {top}
      {bottom}
    </React.Fragment>
  );
};

export default ContainerPage;
