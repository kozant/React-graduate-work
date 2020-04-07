import React, { Component } from "react";

import AppHeader from "../app-header";
import AppFooter from "../app-footer";
import SignIn from "../sign-in";
import SignUp from "../sign-up";
import ContainerPage from "../container-page";
import ArticlePage from "../pages/article-page";
import ProfilePage from "../pages/profile-page";
import ProfileSettings from "../profile-settings";
import RecordArticle from "../new-article";

import DataService from "../../services/data-service";
import { DataServiceProvider } from "../../context";

import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import "./app.css";

class App extends Component {
  DataService = new DataService();
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
      <DataServiceProvider value={this.DataService}>
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
      </DataServiceProvider>
    );
  }
}

export default App;

// тэги input/button
// спиннер выровнять
// проблема с вылезанием тэгов
// сдвинуть марджин артикл итем
// разделить компоненеты
// разделить сервисы
// пофиксить сервисы() избаваиться от класса
// контекст с токенами
// фоллоу профайл поменять и лайки
// warnings исправить
// исправить тернарные операции на if
