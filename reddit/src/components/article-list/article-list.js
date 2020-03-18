import React, { Component } from "react";
import "./article-list.css";

import ArticleItem from "../article-item";
import ErrorComponent from "../error-component";
import Spinner from "../spinner";
import Pagination from "../pagination";

export default class ArticleList extends Component {
  render() {
    const {
      data,
      loading,
      articlesCount,
      error,
      limit,
      onPaginationClick,
      indexPagination
    } = this.props;

    const spinner = loading && !error ? <Spinner /> : null;
    const elements =
      !loading && !error
        ? data.map(item => {
            return <ArticleItem key={data.slug} data={item} />;
          })
        : null;
    const pagination =
      !loading && !error ? (
        <Pagination
          articlesCount={articlesCount}
          limit={limit}
          indexPagination={indexPagination}
          onPaginationClick={onPaginationClick}
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
