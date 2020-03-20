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
    articlesCount: 500,
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
    this.loadAllArticles(this.state.limit, this.state.offset);
  }

  loadAllArticles = (limit, offset) => {
    this.DataService.getAllArticles(limit, offset)
      .then(data => {
        this.setState({
          articles: data.articles,
          articlesCount: data.articlesCount,
          loading: false
        });
      })
      .catch(e => this.setState({ error: true }));
  };

  loadYourArticles = (limit, offset) => {
    this.DataService.getYourArticles(limit, offset)
      .then(data => {
        this.setState({
          articles: data.articles,
          articlesCount: data.articlesCount,
          loading: false
        });
      })
      .catch(e => this.setState({ error: true }));
  };

  loadArticlesWithTag = (limit, offset, tag) => {
    this.DataService.getArticlesWithTag(limit, offset, tag)
      .then(data => {
        this.setState({
          articles: data.articles,
          articlesCount: data.articlesCount,
          loading: false
        });
      })
      .catch(e => this.setState({ error: true }));
  };

  tagClick = item => {
    this.setState({
      tag: item,
      typeFeed: "tagFeed",
      loading: true,
      error: false,
      indexPagination: 1
    });
    this.loadArticlesWithTag(this.state.limit, this.state.offset, item);
  };

  yourFeedClick = () => {
    this.setState({
      typeFeed: "yourFeed",
      loading: true,
      error: false,
      indexPagination: 1
    });
    this.loadYourArticles(this.state.limit, this.state.offset);
  };

  globalFeedClick = () => {
    this.setState({
      typeFeed: "globalFeed",
      loading: true,
      error: false,
      indexPagination: 1
    });
    this.loadAllArticles(this.state.limit, this.state.offset);
  };

  PaginationClick = page => {
    page = page + 1;

    this.setState({
      indexPagination: page,
      offset: page * 10 - 10,
      loading: true
    });

    if (this.state.typeFeed === "globalFeed") {
      this.loadAllArticles(this.state.limit, this.state.offset);
    }
    if (this.state.typeFeed === "yourFeed") {
      this.loadYourArticles(this.state.limit, this.state.offset);
    }
    if (this.state.typeFeed === "tagFeed") {
      this.loadArticlesWithTag(
        this.state.limit,
        this.state.offset,
        this.state.tag
      );
    }
  };

  render() {
    const {
      articles,
      articlesCount,
      limit,
      tag,
      indexPagination,

      typeFeed,

      loading,
      error
    } = this.state;
    console.log(error);

    const main = (
      <div>
        <FeedHeader
          tag={tag}
          typeFeed={typeFeed}
          onYourFeedClick={this.yourFeedClick}
          onGlobalFeedClick={this.globalFeedClick}
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
        <Row left={main} right={<TagList onTagClick={this.tagClick} />} />
      </React.Fragment>
    );
  }
}
