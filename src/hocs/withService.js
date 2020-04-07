import React from "react";
import { DataServiceConsumer } from "../context";

const withService = Wrapped => {
  return props => {
    return (
      <DataServiceConsumer>
        {dataService => {
          return <Wrapped {...props} dataService={dataService} />;
        }}
      </DataServiceConsumer>
    );
  };
};

export { withService };
