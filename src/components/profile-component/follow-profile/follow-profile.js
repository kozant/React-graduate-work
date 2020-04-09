import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { Redirect } from "react-router";

import { follow, unfollow } from "../../../services/profile-service";

export default class FollowProfile extends Component {
  state = {
    unLoggedIn: false,
    following: null,
  };

  componentDidMount() {
    if (this.props.following) {
      this.setState({ following: true });
    } else {
      this.setState({ following: false });
    }
  }

  postFollow = (author, token) => {
    follow(author, token)
      .then(() => {
        this.setState({ following: true });
      })
      .catch((e) => {
        this.setState({ unLoggedIn: true });
      });
  };

  deleteFollow = (author, token) => {
    unfollow(author, token)
      .then(() => {
        this.setState({ following: false });
      })
      .catch((e) => {
        this.setState({ unLoggedIn: true });
      });
  };

  follow = (author, token) => {
    const { following } = this.state;
    if (following) {
      this.deleteFollow(author, token);
    } else {
      this.postFollow(author, token);
    }
  };

  render() {
    const { author, token } = this.props;
    const { unLoggedIn, following } = this.state;
    if (unLoggedIn) {
      return <Redirect to="/login" />;
    }
    return (
      <button
        className="btn btn-sm action-btn btn-outline-secondary"
        onClick={() => this.follow(author, token)}
      >
        <FontAwesomeIcon icon={faPlus} /> {following ? "Unfollow" : "Follow"}{" "}
        {author}
      </button>
    );
  }
}
