import React, { Component } from "react";

import Row from "../row";
import FeedHeader from "../feed-header";
import TagList from "../tag-list";
import DataService from "../../services/data-service";
import ArticleList from "../article-list";

export default class ContainerPage extends Component {
  DataService = new DataService();

  state = {
    articles: [],
    articlesCount: null,
    indexPagination: 1,
    token: null,

    limit: 10,
    offset: 0,

    tag: null,
    loading: true,
    error: false,

    typeFeed: "globalFeed"
  };

  componentDidMount() {
    this.setState({
      token: localStorage.getItem("token")
    });
    this.loadArticles();
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.typeFeed !== prevState.typeFeed) {
      this.loadArticles();
    }
  }

  loadArticles = () => {
    const payLoad = {
      limit: this.state.limit,
      offset: this.state.offset,
      token: this.state.token
    };

    let serviceName;
    if (this.state.typeFeed === "globalFeed") {
      serviceName = "getAllArticles";
    } else if (this.state.typeFeed === "yourFeed") {
      serviceName = "getYourArticles";
    } else if (this.state.typeFeed === "tagFeed") {
      serviceName = "getArticlesWithTag";
      payLoad.tag = this.state.tag;
    }

    this.DataService[serviceName](payLoad)
      .then(data => {
        this.setState({
          articles: data.articles,
          articlesCount: data.articlesCount,
          loading: false
        });
      })
      .catch(e => this.setState({ error: true }));
  };

  clickHandler = (type, item) => {
    this.setState(() => {
      return {
        tag: item,
        typeFeed: type,
        loading: true,
        error: false,
        indexPagination: 1
      };
    });
  };

  PaginationClick = page => {
    page = page + 1;

    this.setState({
      indexPagination: page,
      offset: page * 10 - 10,
      loading: true
    });

    this.loadArticles();
  };

  render() {
    const {
      articles,
      articlesCount,
      limit,
      tag,
      indexPagination,
      token,

      typeFeed,

      loading,
      error
    } = this.state;

    const main = (
      <div>
        <FeedHeader
          tag={tag}
          typeFeed={typeFeed}
          onClickHandler={this.clickHandler}
          token={token}
        />
        <ArticleList
          data={articles}
          loading={loading}
          error={error}
          limit={limit}
          articlesCount={articlesCount}
          onPaginationClick={this.PaginationClick}
          indexPagination={indexPagination}
        />
      </div>
    );

    return (
      <React.Fragment>
        <Row
          left={main}
          right={<TagList onClickHandler={this.clickHandler} />}
        />
      </React.Fragment>
    );
  }
}
