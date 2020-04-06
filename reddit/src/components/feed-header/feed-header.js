import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./feed-header.css";

export default class FeedHeader extends Component {
  Redirect = () => {
    if (this.props.token === null) {
      return "/login";
    } else {
      return "/";
    }
  };

  render() {
    const { tag, typeFeed, onClickHandler } = this.props;

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
              <Link to={this.Redirect()}>
                <input
                  type="button"
                  className={classNameYourFeed}
                  onClick={() => onClickHandler("yourFeed")}
                  value={"Your Feed"}
                />
              </Link>
            </li>
            <li className="nav-item">
              <input
                type="button"
                className={classNameGlobalFeed}
                onClick={() => onClickHandler("globalFeed")}
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
