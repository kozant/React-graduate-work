import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { Redirect } from "react-router";

import { follow, unfollow } from "../../../services/profile-service";

export default class FollowProfile extends Component {
  state = {
    unLoggedIn: false,
    text: "",
    following: null,
  };

  componentDidMount() {
    const { following } = this.props;

    if (following) {
      this.setState({ following: true, text: "Unfollow" });
    } else {
      this.setState({ following: false, text: "follow" });
    }
  }

  postFollow = (author, token) => {
    follow(author, token)
      .then(
        this.setState({ text: "Unfollow", following: true, unLoggedIn: false })
      )
      .catch((e) => this.setState({ unLoggedIn: true }));
  };

  deleteFollow = (author, token) => {
    unfollow(author, token)
      .then(
        this.setState({ text: "follow", following: false, unLoggedIn: false })
      )
      .catch((e) => this.setState({ unLoggedIn: true }));
  };

  follow = (author, token) => {
    const { following } = this.state;
    if (following) {
      this.deleteFollow(author, token);
    }

    if (!following) {
      this.postFollow(author, token);
    }
  };

  render() {
    const { author, token } = this.props;
    const { text, unLoggedIn } = this.state;
    if (unLoggedIn) {
      return <Redirect to="/login" />;
    }
    return (
      <button
        className="btn btn-sm action-btn btn-outline-secondary"
        onClick={() => this.follow(author, token)}
      >
        <FontAwesomeIcon icon={faPlus} /> {text} {author}
      </button>
    );
  }
}
