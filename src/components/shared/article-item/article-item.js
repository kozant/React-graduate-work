import React from "react";

import { Link } from "react-router-dom";
import FavouriteLike from "../../article-component/favourite-like";

import "./article-item.css";

const ArticleItem = ({ articles }) => {
  const elements = articles.tagList.map((tag, index) => {
    return (
      <li key={index} className="tag-default tag-pill tag-outline">
        {tag}
      </li>
    );
  });

  return (
    <div className="article-preview">
      <div>
        <div className="article-meta">
          <Link to={`/profile/${articles.author}`}>
            <img src={articles.image} alt="" />
          </Link>
          <div className="info">
            <Link to={`/profile/${articles.author}`} className="author">
              {articles.author}
            </Link>
            <span className="date">{articles.updatedAt}</span>
          </div>
          <div className="pull-xs-right">
            <FavouriteLike
              className="btn btn-sm btn-outline-primary"
              favoritesCount={articles.favoritesCount}
              favorited={articles.favorited}
              slug={articles.slug}
            ></FavouriteLike>
          </div>
        </div>
      </div>
      <Link to={`/article/${articles.slug}`} className="preview-link">
        <h1>{articles.title}</h1>
        <p>{articles.body}</p>
        <div>Read more...</div>
        <ul className="tag-list">{elements}</ul>
      </Link>
    </div>
  );
};
export default ArticleItem;
