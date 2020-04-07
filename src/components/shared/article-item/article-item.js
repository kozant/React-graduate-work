import React, { Component } from "react";

import { Link } from "react-router-dom";

import "./article-item.css";
import FavouriteLike from "../../favourite-like";

export default class ArticleItem extends Component {
  render() {
    const { data, token } = this.props;
    const elements = data.tagList.map((item, index) => {
      return (
        <li key={index} className="tag-default tag-pill tag-outline">
          {item}
        </li>
      );
    });

    return (
      <div className="article-preview">
        <div>
          <div className="article-meta">
            <Link to={`/profile/${data.author}`}>
              <img src={data.image} alt="" />
            </Link>
            <div className="info">
              <Link to={`/profile/${data.author}`} className="author">
                {data.author}
              </Link>
              <span className="date">{data.updatedAt}</span>
            </div>
            <div className="pull-xs-right">
              <FavouriteLike
                className="btn btn-sm btn-outline-primary"
                favoritesCount={data.favoritesCount}
                favorited={data.favorited}
                slug={data.slug}
                token={token}
              ></FavouriteLike>
            </div>
          </div>
        </div>
        <Link to={`/article/${data.slug}`} className="preview-link">
          <h1>{data.title}</h1>
          <p>{data.body}</p>
          <div>Read more...</div>
          <ul className="tag-list">{elements}</ul>
        </Link>
      </div>
    );
  }
}
