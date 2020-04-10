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
import withUser from "../../../hocs";
import { Redirect } from "react-router";

class ContainerPage extends Component {
  state = {
    articles: [],
    articlesCount: null,
    indexPagination: 1,

    limit: 10,

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

  loadArticles = (offset = 0) => {
    const payLoad = {
      limit: this.state.limit,
      offset,
      token: this.props.authInfo.token,
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
      .catch((e) => {
        this.setState({ error: true });
      });
  };

  clickHandler = (type, item) => {
    this.setState({
      tag: item,
      typeFeed: type,
      loading: true,
      error: false,
      indexPagination: 1,
      offset: 0,
    });
  };

  PaginationClick = (page) => {
    page = page + 1;
    const { limit } = this.state;
    const offset = page * limit - limit;
    this.setState({
      indexPagination: page,
      loading: true,
    });
    this.loadArticles(offset);
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

    const { token } = this.props.authInfo;

    if (typeFeed === "yourFeed" && !token) {
      return <Redirect to="/login" />;
    }

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

export default withUser(ContainerPage);
