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
    return (
      <div className="todo-app">
        <Router>
          <AppHeader token={this.state.token} />

          <Switch>
            <Route
              path="/"
              render={() => <ContainerPage token={this.state.token} />}
              exact
            />
            <Route
              path="/login"
              render={() => (
                <SignIn onSetToken={this.setToken} token={this.state.token} />
              )}
              exact
            />
            <Route
              path="/register"
              render={() => (
                <SignUp onSetToken={this.setToken} token={this.state.token} />
              )}
              exact
            />
            <Route
              path="/editor"
              render={() => <RecordArticle token={this.state.token} />}
              exact
            />
            <Route
              path="/editor/:slug"
              render={() => <RecordArticle token={this.state.token} />}
              exact
            />
            <Route
              path="/settings"
              render={() => (
                <ProfileSettings
                  onSetToken={this.setToken}
                  token={this.state.token}
                  email={this.state.email}
                  username={this.state.username}
                />
              )}
              exact
            />
            <Route
              path="/article/:slug"
              render={() => (
                <ArticlePage
                  token={this.state.token}
                  username={this.state.username}
                />
              )}
              exact
            />
            <Route
              path="/profile/:author"
              render={() => (
                <ProfilePage
                  token={this.state.token}
                  username={this.state.username}
                />
              )}
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
// фоллоу профайл поменять и лайки
// поменять тернарные операции на if

//переход на другие страницы(ошибки)
//willUnmount
//redirect follow, like
