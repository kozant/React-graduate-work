import React, { Component } from "react";

import AppHeader from "../app-header";
import Banner from "../banner";
import ContainerPage from "../container-page";
import ArticlePage from "../pages/article-page";
import ProfilePage from "../pages/profile-page";

import DataService from "../../services/data-service";
import { DataServiceProvider } from "../../context";

import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import "./app.css";

class App extends Component {
  DataService = new DataService();

  render() {
    return (
      <DataServiceProvider value={this.DataService}>
        <div className="todo-app">
          <Router>
            <AppHeader />
            {/* <Banner /> */}
            <Switch>
              <Route path="/" component={ContainerPage} exact />
              <Route path="/article/:slug" component={ArticlePage} exact />
              <Route path="/profile/:slug" component={ProfilePage} exact />
            </Switch>
          </Router>
        </div>
      </DataServiceProvider>
    );
  }
}

export default App;
