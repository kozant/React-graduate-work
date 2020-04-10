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
  if (error) {
    return <ErrorComponent />;
  }
  if (loading) {
    return <Spinner />;
  }
  return (
    <div>
      {data.length === 0 ? (
        <div>Empty...</div>
      ) : (
        <>
          {data.map((item) => {
            return <ArticleItem key={item.slug} data={item} token={token} />;
          })}
          <Pagination
            articlesCount={articlesCount}
            limit={limit}
            indexPagination={indexPagination}
            onPaginationClick={onPaginationClick}
          />
        </>
      )}
    </div>
  );
};
export default ArticleList;
