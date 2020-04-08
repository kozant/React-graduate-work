import React from "react";
import "./feed-header.css";

const FeedHeader = ({ tag, typeFeed, onClickHandler }) => {
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
            <button
              className={classNameYourFeed}
              onClick={() => onClickHandler("yourFeed")}
            >
              Your Feed
            </button>
          </li>
          <li className="nav-item">
            <button
              className={classNameGlobalFeed}
              onClick={() => onClickHandler("globalFeed")}
            >
              Global Feed
            </button>
          </li>
          <li className={classNameHidden}>
            <button className={classNameTag}>{"#" + tag}</button>
          </li>
        </ul>
      </div>
    </React.Fragment>
  );
};
export default FeedHeader;
