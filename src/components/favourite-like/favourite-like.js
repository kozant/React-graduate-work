import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";

import { Redirect } from "react-router";

import { like, unlike } from "../../services/button-service";

export default class FavouriteLike extends Component {
  state = {
    activeBtn: "",
    likeCount: null,
    favorited: null,
  };

  componentDidMount() {
    const { favoritesCount, favorited } = this.props;

    this.setState({ likeCount: favoritesCount });

    if (favorited) {
      this.setState({ favorited: true, activeBtn: "active" });
    } else {
      this.setState({ favorited: false, activeBtn: "" });
    }
  }

  postLike = (slug, token) => {
    like(slug, token).then(
      this.setState((prevState) => {
        const nextState = prevState.likeCount + 1;
        return {
          activeBtn: "active",
          likeCount: nextState,
        };
      })
    );
  };

  deleteLike = (slug, token) => {
    unlike(slug, token).then(
      this.setState((prevState) => {
        const nextState = prevState.likeCount - 1;
        return {
          activeBtn: "",
          likeCount: nextState,
        };
      })
    );
  };

  like = (slug, token) => {
    const { favorited } = this.state;
    if (favorited) {
      this.deleteLike(slug, token);
    }

    if (!favorited) {
      this.postLike(slug, token);
    }
  };

  render() {
    const { slug, token, page } = this.props;
    const { activeBtn, likeCount } = this.state;

    // if (!token) {
    //   return <Redirect to="/login" />;
    // }

    let text = null,
      left = null,
      right = null;

    if (page) {
      text = "Favourite Article ";
      left = "(";
      right = ")";
    }
    return (
      <button
        className={`btn btn-sm btn-outline-primary ${activeBtn}`}
        onClick={() => this.like(slug, token)}
      >
        <FontAwesomeIcon icon={faHeart} /> {text}
        {left}
        {likeCount}
        {right}
      </button>
    );
  }
}
