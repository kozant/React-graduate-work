import React from "react";
import "./article-list.css";

import ArticleItem from "../article-item";
import Spinner from "../spinner";
import Pagination from "../pagination";
import ErrorComponent from "../../shared/error-component";

const ArticleList = ({
  articles,
  loading,
  articlesCount,
  error,
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
      {articles.length === 0 ? (
        <div>Empty...</div>
      ) : (
        <>
          {articles.map((article) => {
            return <ArticleItem key={article.slug} articles={article} />;
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
