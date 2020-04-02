import React, { Component } from "react";
import "./profile-feed.css";

export default class ProfileFeed extends Component {
  render() {
    const { typeFeed, onClickHandler } = this.props;

    let classNameMyPosts = "nav-link",
      classNameFavouritedPosts = "nav-link";

    if (typeFeed === "myPosts") {
      classNameMyPosts = "nav-link active";
    }

    if (typeFeed === "favouritedPosts") {
      classNameFavouritedPosts = "nav-link active";
    }
    return (
      <div className="container profile-feed">
        <ul className="nav nav-pills outline-active">
          <li className="nav-item">
            <input
              type="button"
              className={classNameMyPosts}
              onClick={() => onClickHandler("myPosts")}
              value="My Posts"
            />
          </li>
          <li className="nav-item">
            <input
              type="button"
              className={classNameFavouritedPosts}
              onClick={() => onClickHandler("favouritedPosts")}
              value="Favorited Posts"
            />
          </li>
        </ul>
      </div>
    );
  }
}
