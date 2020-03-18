import React, { Component } from "react";

import Row from "../row";
import FeedHeader from "../feed-header";
import TagList from "../tag-list";
import DataService from "../../services/data-service";
import ArticleList from "../article-list";

export default class ContainerPage extends Component {
  DataService = new DataService();

  state = {
    popularTags: [],
    articles: [],
    articlesCount: null,
    indexPagination: 1,

    limit: 10,
    offset: 0,

    tag: null,
    loading: true,
    error: false,

    yourFeed: false,
    globalFeed: true,
    tagFeed: false
  };

  constructor() {
    super();
    this.loadTags();
    this.loadArticles(this.state.limit, this.state.offset);
  }

  loadArticles = (limit, offset) => {
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

  loadTags = () => {
    this.DataService.getAllPopularTags().then(data => {
      this.setState({
        popularTags: data
      });
    });
  };

  tagClick = item => {
    this.setState({
      tag: item,
      yourFeed: false,
      globalFeed: false,
      tagFeed: true,
      loading: true
    });
  };

  yourFeedClick = () => {
    this.setState({
      yourFeed: true,
      globalFeed: false,
      tagFeed: false,
      loading: true
    });
  };

  globalFeedClick = () => {
    this.setState({
      yourFeed: false,
      globalFeed: true,
      tagFeed: false,
      loading: true
    });
  };

  PaginationClick = page => {
    page = page + 1;
    this.setState({
      indexPagination: page,
      offset: page * 10 - 10,
      loading: true
    });
  };

  componentDidUpdate(prevProps, prevState) {
    if (
      this.state.articles !== prevState.articles //&&
      //this.state.loading !== prevState.loading
    ) {
      if (this.state.globalFeed) {
        this.loadArticles(this.state.limit, this.state.offset);
      }
      if (this.state.tagFeed) {
        this.loadArticlesWithTag(
          this.state.limit,
          this.state.offset,
          this.state.tag
        );
      }
    }
  }

  render() {
    const {
      popularTags,
      articles,
      articlesCount,
      limit,
      tag,
      indexPagination,

      yourFeed,
      globalFeed,
      tagFeed,

      loading,
      error
    } = this.state;

    const main = (
      <div>
        <FeedHeader
          tag={tag}
          yourFeed={yourFeed}
          globalFeed={globalFeed}
          tagFeed={tagFeed}
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
        <Row
          left={main}
          right={<TagList onTagClick={this.tagClick} tagList={popularTags} />}
        />
      </React.Fragment>
    );
  }
}
