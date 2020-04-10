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

import { AuthInfoProvider } from "../../context";

import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import "./app.css";

class App extends Component {
  state = {
    token: localStorage.getItem("token"),
    email: localStorage.getItem("email"),
    username: localStorage.getItem("username"),
  };

  setAuthInfo = ({ token, email, username }) => {
    if (token === undefined) {
      localStorage.removeItem("token");
      localStorage.removeItem("email");
      localStorage.removeItem("username");
      this.setState({ token: "", email: "", username: "" });
    } else {
      localStorage.setItem("token", token);
      localStorage.setItem("email", email);
      localStorage.setItem("username", username);
      this.setState({ token, email, username });
    }
  };

  render() {
    const { token, username, email } = this.state;
    const authInfo = {
      token: token,
      username: username,
      email: email,
      onSetAuthInfo: this.setAuthInfo,
    };
    return (
      <AuthInfoProvider value={authInfo}>
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
      </AuthInfoProvider>
    );
  }
}

export default App;

// контекст с токенами
