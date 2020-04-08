import React from "react";
import "./profile-feed.css";

const ProfileFeed = ({ typeFeed, onClickHandler }) => {
  let classNameMyPosts = "nav-link",
    classNameFavouritedPosts = "nav-link";

  if (typeFeed === "myPosts") {
    classNameMyPosts = "nav-link active";
  }

  if (typeFeed === "favouritedPosts") {
    classNameFavouritedPosts = "nav-link active";
  }
  return (
    <div className="profile-feed">
      <ul className="nav nav-pills outline-active">
        <li className="nav-item">
          <button
            className={classNameMyPosts}
            onClick={() => onClickHandler("myPosts")}
          >
            My Posts
          </button>
        </li>
        <li className="nav-item">
          <button
            className={classNameFavouritedPosts}
            onClick={() => onClickHandler("favouritedPosts")}
          >
            Favorited Posts
          </button>
        </li>
      </ul>
    </div>
  );
};
export default ProfileFeed;
