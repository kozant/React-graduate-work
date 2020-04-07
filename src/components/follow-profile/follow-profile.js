import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { Redirect } from "react-router";

import { follow, unfollow } from "../../services/button-service";

export default class FollowProfile extends Component {
  state = {
    loggedIn: null,
    author: null,
    text: "",
  };

  componentDidMount() {
    const { author, following } = this.props;

    this.setState({ author: author });
    if (following) {
      this.setState({ text: "Un" });
    }
  }

  postFollow = (author, token) => {
    follow(author, token).then((item) => {
      this.setState({ text: "Un" });
    });
  };

  deleteFollow = (author, token) => {
    unfollow(author, token).then((item) => {
      this.setState({ text: "" });
    });
  };

  follow = (author, token, text) => {
    if (text === "Un") {
      this.deleteFollow(author, token);
    }

    if (text === "") {
      this.postFollow(author, token);
    }

    if (!token) {
      this.setState({ loggedIn: <Redirect to="/login" /> });
    }
  };

  render() {
    const { token } = this.props;
    const { text, author, loggedIn } = this.state;
    return (
      <button
        className="btn btn-sm action-btn btn-outline-secondary"
        onClick={() => this.follow(author, token, text)}
      >
        {loggedIn}
        <FontAwesomeIcon icon={faPlus} /> {text}follow {author}
      </button>
    );
  }
}
