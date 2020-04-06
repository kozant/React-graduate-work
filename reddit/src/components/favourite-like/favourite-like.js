import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";

import { Redirect } from "react-router";

import DataService from "../../services/data-service";

export default class FavouriteLike extends Component {
  DataService = new DataService();

  state = {
    loggedIn: null,
    activeBtn: "",
    likeCount: null,
  };

  componentDidMount() {
    const { favoritesCount, favorited } = this.props;

    this.setState({ likeCount: favoritesCount });

    if (favorited) {
      this.setState({ activeBtn: "active" });
    } else {
      this.setState({ activeBtn: "" });
    }
  }

  postLike = (slug, token) => {
    this.DataService.Like(slug, token, "POST").then((item) => {
      if (item === 200) {
        this.setState((prevState) => {
          const nextState = prevState.likeCount + 1;
          return {
            activeBtn: "active",
            likeCount: nextState,
          };
        });
      }
    });
  };

  deleteLike = (slug, token) => {
    this.DataService.Like(slug, token, "DELETE").then((item) => {
      if (item === 200) {
        this.setState((prevState) => {
          const nextState = prevState.likeCount - 1;
          return {
            activeBtn: "",
            likeCount: nextState,
          };
        });
      }
    });
  };

  like = (slug, token, activeBtn) => {
    if (activeBtn === "active") {
      this.deleteLike(slug, token);
    }

    if (activeBtn === "") {
      this.postLike(slug, token);
    }

    if (!token) {
      this.setState({ loggedIn: <Redirect to="/login" /> });
    }
  };

  render() {
    let text = null,
      left = null,
      right = null;
    const { slug, token, page } = this.props;
    const { activeBtn, likeCount, loggedIn } = this.state;
    if (page) {
      text = "Favourite Article ";
      left = "(";
      right = ")";
    }
    return (
      <button
        className={`btn btn-sm btn-outline-primary ${activeBtn}`}
        onClick={() => this.like(slug, token, activeBtn)}
      >
        {loggedIn}
        <FontAwesomeIcon icon={faHeart} /> {text}
        {left}
        {likeCount}
        {right}
      </button>
    );
  }
}
