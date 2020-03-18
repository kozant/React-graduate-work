import React, { Component } from "react";

import "./tag-list.css";

export default class TagList extends Component {
  render() {
    const { tagList, onTagClick } = this.props;

    const elements = tagList.map(item => {
      return (
        <input
          type="button"
          className="tag-default tag-pill"
          onClick={() => onTagClick(item)}
          value={item}
        />
      );
    });

    return (
      <div className="sidebar">
        <p>Popular tags</p>
        <div className="tag-list">{elements}</div>
      </div>
    );
  }
}
