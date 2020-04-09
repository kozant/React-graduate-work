import React from "react";
import "./article-list.css";

import ArticleItem from "../article-item";
import Spinner from "../spinner";
import Pagination from "../pagination";
import ErrorComponent from "../../shared/error-component";

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
  if (loading && !error) {
    return <Spinner />;
  }
  if (error) {
    return <ErrorComponent />;
  }

  const elements =
    !loading && !error && data.length !== 0
      ? data.map((item) => {
          return <ArticleItem key={item.slug} data={item} token={token} />;
        })
      : null;

  const nodata =
    !loading && !error && data.length === 0 ? <div>Empty...</div> : null;

  const pagination =
    !loading && !error ? (
      <Pagination
        articlesCount={articlesCount}
        limit={limit}
        indexPagination={indexPagination}
        onPaginationClick={onPaginationClick}
      />
    ) : null;

  return (
    <div>
      {elements}
      {nodata}
      {pagination}
    </div>
  );
};
export default ArticleList;
