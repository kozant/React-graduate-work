import React, { Component } from "react";

import AppHeader from "../app-header";
import SignIn from "../sign-in";
import SignUp from "../sign-up";
import Banner from "../banner";
import ContainerPage from "../container-page";
import ArticlePage from "../pages/article-page";
import ProfilePage from "../pages/profile-page";
import ProfileSettings from "../profile-settings";
import NewArticle from "../new-article";

import DataService from "../../services/data-service";
import { DataServiceProvider } from "../../context";

import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import "./app.css";

class App extends Component {
  DataService = new DataService();
  state = {
    token: localStorage.getItem("token") || null
  };

  setToken = (token = null) => {
    this.setState({ token });
  };

  render() {
    return (
      <DataServiceProvider value={this.DataService}>
        <div className="todo-app">
          <Router>
            <AppHeader token={this.state.token} />
            {/* <Banner /> */}
            <Switch>
              <Route path="/" component={ContainerPage} exact />
              <Route
                path="/login"
                render={() => <SignIn onSetToken={this.setToken} />}
                exact
              />
              <Route path="/register" component={SignUp} exact />
              <Route path="/editor" component={NewArticle} exact />
              <Route
                path="/settings"
                render={() => <ProfileSettings onSetToken={this.setToken} />}
                exact
              />
              <Route path="/article/:slug" component={ArticlePage} exact />
              <Route path="/profile/:author" component={ProfilePage} exact />
              <Route render={() => <h1>Page not found!</h1>} />
            </Switch>
          </Router>
        </div>
      </DataServiceProvider>
    );
  }
}

export default App;
