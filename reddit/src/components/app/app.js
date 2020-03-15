import React, { Component } from "react";

import AppHeader from "../app-header";
import Banner from "../banner";
import Row from "../row";
import FeedHeader from "../feed-header";
import ContainerPage from "../container-page";

import ArticleList from "../article-list";

import "./app.css";

class App extends Component {
  render() {
    return (
      <div className="todo-app">
        <AppHeader />
        <Banner />
        <Row
          left={<ContainerPage top={<FeedHeader />} bottom={<ArticleList />} />}
          right={2}
        />
      </div>
    );
  }
}

export default App;
