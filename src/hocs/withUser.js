import React from "react";
import { AuthInfoConsumer } from "../context";

const withUser = (WrappedComponent) => (props) => (
  <AuthInfoConsumer>
    {(authInfo) => {
      return <WrappedComponent {...props} authInfo={authInfo} />;
    }}
  </AuthInfoConsumer>
);

export { withUser };
