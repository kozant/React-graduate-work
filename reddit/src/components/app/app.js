import React, { Component } from "react";

import AppHeader from "../app-header";
import Banner from "../banner";
import ContainerPage from "../container-page";

import "./app.css";

class App extends Component {
  render() {
    return (
      <div className="todo-app">
        <AppHeader />
        <Banner />
        <ContainerPage />
      </div>
    );
  }
}

export default App;
