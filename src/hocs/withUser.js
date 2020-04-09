import React from "react";
import { DataConsumer } from "../context";

const withUser = (Wrapped) => {
  return (props) => {
    return (
      <DataConsumer>
        {(user) => {
          return <Wrapped {...props} data={user} />;
        }}
      </DataConsumer>
    );
  };
};

export { withUser };
