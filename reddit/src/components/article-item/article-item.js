import React, { Component } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";

import "./article-item.css";

export default class ArticleItem extends Component {
  render() {
    const { data } = this.props;
    return (
      <div className="article-preview">
        <div>
          <div className="article-meta">
            <a href="#">
              <img src={data.image} />
            </a>
            <div className="info">
              <a className="author" href="#">
                {data.author}
              </a>
              <span className="date">{data.updatedAt}</span>
            </div>
            <div className="pull-xs-right">
              <button className="btn btn-sm btn-outline-primary">
                <FontAwesomeIcon icon={faHeart} /> 0
              </button>
            </div>
          </div>
        </div>
        <a className="preview-link" href="#">
          <h1>{data.title}</h1>
          <p>{data.body}</p>
          <span>Read more...</span>
          <ul className="tag-list"></ul>
        </a>
      </div>
    );
  }
}
