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

    const paginationCount = Math.ceil(articlesCount / limit);
    const paginationArray = new Array(paginationCount).fill("");

    const elements = paginationArray.map((item, index) => {
      let className = "page-item";
      if (index + 1 === indexPagination) {
        className += " active";
      }
      return (
        <li key={index + 1} className={className}>
          <input
            type="button"
            className="page-link"
            onClick={() => onPaginationClick(index)}
            value={index + 1}
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
