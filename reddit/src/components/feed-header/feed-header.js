import React, { Component } from "react";
import "./feed-header.css";

export default class FeedHeader extends Component {
  render() {
    const { tag, typeFeed, onYourFeedClick, onGlobalFeedClick } = this.props;

    let classNameTag = "nav-link",
      classNameGlobalFeed = "nav-link",
      classNameYourFeed = "nav-link",
      classNameHidden = "nav-item";

    if (typeFeed === "yourFeed") {
      classNameYourFeed = "nav-link active";
      classNameHidden = "nav-item hidden";
    }

    if (typeFeed === "globalFeed") {
      classNameGlobalFeed = "nav-link active";
      classNameHidden = "nav-item hidden";
    }

    if (typeFeed === "tagFeed") {
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
