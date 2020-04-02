import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";

import { Redirect } from "react-router";

import DataService from "../../services/data-service";

export default class FavouriteLike extends Component {
  DataService = new DataService();

  postLike = slug => {
    const token = localStorage.getItem("token");
    this.DataService.Like(slug, token, "POST").then(item => {
      if (item === 401) {
        return <Redirect to="/login" />;
      }
    });
  };

  deleteLike = slug => {
    const token = localStorage.getItem("token");
    this.DataService.Like(slug, token, "DELETE").then(item => {
      if (item === 401) {
        return <Redirect to="/login" />;
      }
    });
  };
  render() {
    const { likeCount, slug } = this.props;
    return (
      <button
        className="btn btn-sm btn-outline-primary"
        //onClick={this.deleteLike(slug)}
      >
        <FontAwesomeIcon icon={faHeart} /> {likeCount}
      </button>
    );
  }
}
