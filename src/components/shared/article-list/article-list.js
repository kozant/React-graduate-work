import React from "react";
import "./article-list.css";

import ArticleItem from "../article-item";
import Spinner from "../spinner";
import Pagination from "../pagination";
import ErrorComponent from "../../shared/error-component";

const NoData = () => {
  return (
    <React.Fragment>
      <div>Empty...</div>
    </React.Fragment>
  );
};

const ArticleList = ({
  data,
  loading,
  articlesCount,
  error,
  token,
  limit,
  onPaginationClick,
  indexPagination,
}) => {
  const spinner = loading && !error ? <Spinner /> : null;

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

  const err = error ? <ErrorComponent /> : null;

  return (
    <div>
      {spinner}
      {elements}
      {nodata}
      {pagination}
      {err}
    </div>
  );
};
export default ArticleList;
