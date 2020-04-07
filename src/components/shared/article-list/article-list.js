import React, { Component } from "react";
import "./article-list.css";

import ArticleItem from "../article-item";
import Spinner from "../spinner";
import Pagination from "../pagination";

const NoData = () => {
  return (
    <React.Fragment>
      <div>Empty...</div>
    </React.Fragment>
  );
};

const Error = () => {
  return (
    <React.Fragment>
      <div>Error</div>
    </React.Fragment>
  );
};

export default class ArticleList extends Component {
  render() {
    const {
      data,
      loading,
      articlesCount,
      error,
      token,
      limit,
      onPaginationClick,
      indexPagination,
    } = this.props;

    const spinner =
      loading && !error ? (
        <div className="row justify-content-center">
          <Spinner />
        </div>
      ) : null;
    const elements =
      !loading && !error && data.length !== 0
        ? data.map((item) => {
            return <ArticleItem key={item.slug} data={item} token={token} />;
          })
        : null;
    const nodata = !loading && !error && data.length === 0 ? <NoData /> : null;
    const pagination =
      !loading && !error ? (
        <Pagination
          articlesCount={articlesCount}
          limit={limit}
          indexPagination={indexPagination}
          onPaginationClick={onPaginationClick}
        />
      ) : null;
    const err = error ? <Error /> : null;

    return (
      <div>
        {spinner}
        {elements}
        {nodata}
        {pagination}
        {err}
      </div>
    );
  }
}
