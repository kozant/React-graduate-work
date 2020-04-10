import React from "react";

const {
  Provider: AuthInfoProvider,
  Consumer: AuthInfoConsumer,
} = React.createContext();

export { AuthInfoProvider, AuthInfoConsumer };
