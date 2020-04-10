import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";

import { Redirect } from "react-router";

import { like, unlike } from "../../../services/article-service";

export default class FavouriteLike extends Component {
  state = {
    likeCount: null,
    favorited: null,
    unLoggedIn: false,
  };

  componentDidMount() {
    const { favoritesCount, favorited } = this.props;

    this.setState({ likeCount: favoritesCount, favorited: favorited });
  }

  postLike = (slug, token) => {
    like(slug, token)
      .then(() => {
        this.setState((prevState) => {
          const nextState = prevState.likeCount + 1;
          return {
            likeCount: nextState,
            favorited: true,
          };
        });
      })
      .catch((e) => {
        this.setState({ unLoggedIn: true });
      });
  };

  deleteLike = (slug, token) => {
    unlike(slug, token)
      .then(() => {
        this.setState((prevState) => {
          const nextState = prevState.likeCount - 1;
          return {
            likeCount: nextState,
            favorited: false,
          };
        });
      })
      .catch((e) => {
        this.setState({ unLoggedIn: true });
      });
  };

  likeElement = (slug, token) => {
    const { favorited } = this.state;
    if (favorited) {
      this.deleteLike(slug, token);
    } else {
      this.postLike(slug, token);
    }
  };

  render() {
    const { slug, token, page } = this.props;
    const { favorited, likeCount, unLoggedIn } = this.state;

    if (unLoggedIn) {
      return <Redirect to="/login" />;
    }

    const text = page ? `Favourite article (${likeCount})` : likeCount;
    const className = favorited ? "active" : "";
    return (
      <button
        className={`btn btn-sm btn-outline-primary ${className}`}
        onClick={() => this.likeElement(slug, token)}
      >
        <FontAwesomeIcon icon={faHeart} /> {text}
      </button>
    );
  }
}
