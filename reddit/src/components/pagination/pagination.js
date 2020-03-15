import React, { Component } from "react";
import "./pagination.css";

export default class Pagination extends Component {
  state = {
    indexPagination: null
  };

  render() {
    const {
      onPaginationClick,
      articlesCount,
      limit,
      indexPagination
    } = this.props;

    const paginationCount = articlesCount / limit;
    const paginationArray = [];
    for (let i = 1; i < paginationCount + 1; i++) {
      paginationArray.push(i);
    }

    const elements = paginationArray.map(item => {
      if (item === indexPagination) {
        return (
          <li className="page-item active">
            <input
              type="button"
              className="page-link"
              onClick={() => onPaginationClick(item)}
              value={item}
            />
          </li>
        );
      }
      return (
        <li className="page-item">
          <input
            type="button"
            className="page-link"
            onClick={() => onPaginationClick(item)}
            value={item}
          />
        </li>
      );
    });

    return (
      <nav className="container">
        <ul className="pagination">{elements}</ul>
      </nav>
    );
  }
}

{
  /* <li className="page-item">
            <input
              type="button"
              className="page-link"
              onClick={() => onPaginationClick(this.state.label)}
              value="1"
            />
          </li> */
}
