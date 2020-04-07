import React, { Component } from "react";

import Banner from "../banner";
import Row from "../../shared/row";
import FeedHeader from "../feed-header";
import TagList from "../tag-list";
import ArticleList from "../../shared/article-list";
import {
  getAllArticles,
  getYourArticles,
  getArticlesWithTag,
} from "../../../services/article-service";

export default class ContainerPage extends Component {
  state = {
    articles: [],
    articlesCount: null,
    indexPagination: 1,

    limit: 10,
    offset: 0,

    tag: null,
    loading: true,
    error: false,

    typeFeed: "globalFeed",
  };

  componentDidMount() {
    this.loadArticles();
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.typeFeed === "globalFeed" || "yourFeed") {
      if (this.state.typeFeed !== prevState.typeFeed) {
        this.loadArticles();
      }
    }
    if (this.state.typeFeed === "tagFeed") {
      if (this.state.tag !== prevState.tag) {
        this.loadArticles();
      }
    }
  }

  loadArticles = () => {
    const payLoad = {
      limit: this.state.limit,
      offset: this.state.offset,
      token: this.props.token,
    };

    let serviceName;
    if (this.state.typeFeed === "globalFeed") {
      serviceName = getAllArticles;
    } else if (this.state.typeFeed === "yourFeed") {
      serviceName = getYourArticles;
    } else if (this.state.typeFeed === "tagFeed") {
      serviceName = getArticlesWithTag;
      payLoad.tag = this.state.tag;
    }

    serviceName(payLoad)
      .then((data) => {
        this.setState({
          articles: data.articles,
          articlesCount: data.articlesCount,
          loading: false,
        });
      })
      .catch((e) => this.setState({ error: true }));
  };

  clickHandler = (type, item) => {
    this.setState(() => {
      return {
        tag: item,
        typeFeed: type,
        loading: true,
        error: false,
        indexPagination: 1,
      };
    });
  };

  PaginationClick = (page) => {
    page = page + 1;

    this.setState({
      indexPagination: page,
      offset: page * 10 - 10,
      loading: true,
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

      typeFeed,

      loading,
      error,
    } = this.state;

    const { token } = this.props;

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
          token={token}
          limit={limit}
          articlesCount={articlesCount}
          onPaginationClick={this.PaginationClick}
          indexPagination={indexPagination}
        />
      </div>
    );

    return (
      <React.Fragment>
        <Banner token={token} />
        <Row
          left={main}
          right={<TagList onClickHandler={this.clickHandler} />}
        />
      </React.Fragment>
    );
  }
}
