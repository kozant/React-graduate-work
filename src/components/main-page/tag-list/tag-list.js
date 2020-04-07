import React, { Component } from "react";

import { getAllPopularTags } from "../../../services/article-service";

import "./tag-list.css";

const Loading = () => {
  return (
    <React.Fragment>
      <div>Loading tags...</div>
    </React.Fragment>
  );
};

const Error = () => {
  return (
    <React.Fragment>
      <div>Error</div>
    </React.Fragment>
  );
};

export default class TagList extends Component {
  state = {
    popularTags: [],
    loading: true,
    error: false,
  };

  componentDidMount() {
    this.loadTags();
  }

  loadTags = () => {
    getAllPopularTags()
      .then((data) => {
        this.setState({
          popularTags: data,
          loading: false,
        });
      })
      .catch((e) => this.setState({ error: true }));
  };

  render() {
    const { popularTags, loading, error } = this.state;
    const { onClickHandler } = this.props;

    const spinner = loading && !error ? <Loading /> : null;
    const err = error ? <Error /> : null;
    const elements = popularTags.map((item) => {
      return (
        <button
          key={item}
          className="tag-default tag-pill"
          onClick={() => onClickHandler("tagFeed", item)}
        >
          {item}
        </button>
      );
    });

    return (
      <div className="sidebar">
        <p>Popular tags</p>
        <div className="tag-list">
          {elements}
          {spinner}
          {err}
        </div>
      </div>
    );
  }
}
