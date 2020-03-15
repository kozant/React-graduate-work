import React, { Component } from "react";
import "./article-list.css";

import ArticleItem from "../article-item";
import DataService from "../../services/data-service";
import ErrorComponent from "../error-component";
import Spinner from "../spinner";
import Pagination from "../pagination";

export default class ArticleList extends Component {
  DataService = new DataService();

  state = {
    articles: [],
    loading: true,
    error: false,
    limit: 10,
    offset: 0,
    indexPagination: 1,
    articlesCount: null
  };

  constructor() {
    super();
    this.updateArticles(this.state.limit, this.state.offset);
    this.countArticles();
  }

  onArticlesLoaded = articles => {
    this.setState({
      articles,
      loading: false
    });
  };

  updateArticles = (limit, offset) => {
    this.DataService.getAllArticles(limit, offset)
      .then(this.onArticlesLoaded)
      .catch(e => this.setState({ error: true }));
  };

  countArticles = () => {
    this.DataService.getArticlesCount().then(data => {
      this.setState({
        articlesCount: data
      });
    });
  };

  PaginationClick = page => {
    this.setState({
      indexPagination: page,
      offset: page * 10 - 10,
      loading: true
    });
  };

  componentDidUpdate = () => {
    this.updateArticles(this.state.limit, this.state.offset);
  };

  render() {
    const data = this.state.articles;
    const loading = this.state.loading;
    const error = this.state.error;

    const spinner = loading && !error ? <Spinner /> : null;
    const elements =
      !loading && !error
        ? data.map(item => {
            return <ArticleItem key={data.title} data={item} />;
          })
        : null;
    const pagination =
      !loading && !error ? (
        <Pagination
          onPaginationClick={this.PaginationClick}
          articlesCount={this.state.articlesCount}
          limit={this.state.limit}
          indexPagination={this.state.indexPagination}
        />
      ) : null;
    const err = error ? <ErrorComponent /> : null;

    return (
      <div>
        {spinner}
        {elements}
        {pagination}
        {err}
      </div>
    );
  }
}
