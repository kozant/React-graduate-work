import React, { Component } from "react";

import AppHeader from "../app-header";
import AppFooter from "../app-footer";
import SignIn from "../authorization/sign-in";
import SignUp from "../authorization/sign-up";
import ContainerPage from "../main-page/container-page";
import ArticlePage from "../article-component/article-page";
import ProfilePage from "../profile-component/profile-page";
import ProfileSettings from "../profile-component/profile-settings";
import RecordArticle from "../article-component/new-article";

import { DataProvider } from "../../context";

import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import "./app.css";

class App extends Component {
  state = {
    token: localStorage.getItem("token") || null,
    email: localStorage.getItem("email") || null,
    username: localStorage.getItem("username") || null,
  };

  setToken = (token = null, email = null, username = null) => {
    this.setState({ token, email, username });
  };

  render() {
    const { token, username, email } = this.state;
    const user = {
      token: token,
      username: username,
      email: email,
      onSetToken: this.setToken,
    };
    return (
      <DataProvider value={user}>
        <div className="todo-app">
          <Router>
            <AppHeader />

            <Switch>
              <Route path="/" component={ContainerPage} exact />
              <Route path="/login" component={SignIn} exact />
              <Route path="/register" component={SignUp} exact />
              <Route path="/editor" component={RecordArticle} exact />
              <Route path="/editor/:slug" component={RecordArticle} exact />
              <Route path="/settings" component={ProfileSettings} exact />
              <Route path="/article/:slug" component={ArticlePage} exact />
              <Route path="/profile/:author" component={ProfilePage} exact />
              <Route render={() => <h1>Page not found!</h1>} />
            </Switch>
            <AppFooter />
          </Router>
        </div>
      </DataProvider>
    );
  }
}

export default App;

// контекст с токенами
