import React, { Component } from "react";
import DataService from "../../services/data-service";

import "./tag-list.css";

export default class TagList extends Component {
  DataService = new DataService();

  state = {
    popularTags: []
  };

  componentDidMount() {
    this.loadTags();
  }

  loadTags = () => {
    this.DataService.getAllPopularTags().then(data => {
      this.setState({
        popularTags: data
      });
    });
  };

  render() {
    const { popularTags } = this.state;
    const { onTagClick } = this.props;

    const elements = popularTags.map(item => {
      return (
        <input
          key={item}
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
