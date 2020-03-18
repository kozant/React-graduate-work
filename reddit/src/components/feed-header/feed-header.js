import React, { Component } from "react";
import "./feed-header.css";

import ArticleList from "../article-list";

export default class FeedHeader extends Component {
  render() {
    const {
      tag,
      articles,
      yourFeed,
      globalFeed,
      tagFeed,
      onYourFeedClick,
      onGlobalFeedClick
    } = this.props;

    let classNameTag = "nav-link",
      classNameGlobalFeed = "nav-link",
      classNameYourFeed = "nav-link",
      classNameHidden = "nav-item hidden";

    if (yourFeed) {
      classNameYourFeed = "nav-link active";
      classNameGlobalFeed = "nav-link";
      classNameTag = "nav-link";
      classNameHidden = "nav-item hidden";
    }

    if (globalFeed) {
      classNameYourFeed = "nav-link";
      classNameGlobalFeed = "nav-link active";
      classNameTag = "nav-link";
      classNameHidden = "nav-item hidden";
    }

    if (tagFeed) {
      classNameYourFeed = "nav-link";
      classNameGlobalFeed = "nav-link";
      classNameTag = "nav-link active";
      classNameHidden = "nav-item";
    }

    return (
      <React.Fragment>
        <div className="feed-toggle">
          <ul className="nav nav-pills outline-active">
            <li className="nav-item">
              <input
                type="button"
                className={classNameYourFeed}
                onClick={() => onYourFeedClick()}
                value={"Your Feed"}
              />
            </li>
            <li className="nav-item">
              <input
                type="button"
                className={classNameGlobalFeed}
                onClick={() => onGlobalFeedClick()}
                value={"Global Feed"}
              />
            </li>
            <li className={classNameHidden}>
              <input type="button" className={classNameTag} value={"#" + tag} />
            </li>
          </ul>
        </div>
      </React.Fragment>
    );
  }
}
