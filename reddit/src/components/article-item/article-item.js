import React, { Component } from "react";

import { Link } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";

import "./article-item.css";

export default class ArticleItem extends Component {
  render() {
    const { data } = this.props;
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
            <Link to={`/profile/${data.slug}`}>
              <img src={data.image} />
            </Link>
            <div className="info">
              <Link to={`/profile/${data.slug}`} className="author">
                {data.author}
              </Link>
              <span className="date">{data.updatedAt}</span>
            </div>
            <div className="pull-xs-right">
              <button className="btn btn-sm btn-outline-primary">
                <FontAwesomeIcon icon={faHeart} /> {data.favoritesCount}
              </button>
            </div>
          </div>
        </div>
        <Link to={`/article/${data.slug}`} className="preview-link">
          <h1>{data.title}</h1>
          <p>{data.body}</p>
          <span>Read more...</span>
          <ul className="tag-list">{elements}</ul>
        </Link>
      </div>
    );
  }
}
