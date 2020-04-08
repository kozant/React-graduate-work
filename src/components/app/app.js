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
    return (
      <div className="todo-app">
        <Router>
          <AppHeader token={token} username={username} />

          <Switch>
            <Route
              path="/"
              render={() => <ContainerPage token={token} />}
              exact
            />
            <Route
              path="/login"
              render={() => <SignIn onSetToken={this.setToken} token={token} />}
              exact
            />
            <Route
              path="/register"
              render={() => <SignUp onSetToken={this.setToken} token={token} />}
              exact
            />
            <Route
              path="/editor"
              render={() => <RecordArticle token={token} />}
              exact
            />
            <Route
              path="/editor/:slug"
              render={() => <RecordArticle token={token} />}
              exact
            />
            <Route
              path="/settings"
              render={() => (
                <ProfileSettings
                  onSetToken={this.setToken}
                  token={token}
                  email={email}
                  username={username}
                />
              )}
              exact
            />
            <Route
              path="/article/:slug"
              render={() => <ArticlePage token={token} username={username} />}
              exact
            />
            <Route
              path="/profile/:author"
              render={() => <ProfilePage token={token} username={username} />}
              exact
            />
            <Route render={() => <h1>Page not found!</h1>} />
          </Switch>
          <AppFooter />
        </Router>
      </div>
    );
  }
}

export default App;

// контекст с токенами
