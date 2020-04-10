import React, { Component } from "react";
import { Link } from "react-router-dom";
import { withRouter } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import ProfileFeed from "../profile-feed";
import ArticleList from "../../shared/article-list";
import FollowProfile from "../follow-profile";
import {
  getAuthorArticles,
  getFavouritedArticles,
} from "../../../services/article-service";
import { getProfile } from "../../../services/profile-service";
import withUser from "../../../hocs";
import Spinner from "../../shared/spinner";
import ErrorComponent from "../../shared/error-component";

import "./profile-page.css";

class ProfilePage extends Component {
  state = {
    articles: [],
    articlesCount: null,
    indexPagination: 1,
    limit: 10,
    authorData: [],
    loadingPage: true,
    errorPage: false,
    loadingArticles: true,
    errorArticles: false,
    typeFeed: "myPosts",
  };

  componentDidMount() {
    this.loadPage();
    this.loadArticles();
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.match.params.author !== prevProps.match.params.author) {
      this.loadPage();
    }
    if (this.state.typeFeed !== prevState.typeFeed) {
      this.loadArticles();
    }
  }

  loadPage() {
    const { author } = this.props.match.params;
    const { token } = this.props.authInfo;
    if (!author) {
      return;
    }
    getProfile(author, token)
      .then((profile) => {
        this.setState({
          authorData: profile,
          loadingPage: false,
        });
      })
      .catch((e) => {
        this.setState({ errorPage: true });
      });
  }

  loadArticles = (offset = 0) => {
    const payLoad = {
      author: this.props.match.params.author,
      limit: this.state.limit,
      offset,
      token: this.props.authInfo.token,
    };

    let serviceName;
    if (this.state.typeFeed === "myPosts") {
      serviceName = getAuthorArticles;
    } else if (this.state.typeFeed === "favouritedPosts") {
      serviceName = getFavouritedArticles;
    }

    serviceName(payLoad)
      .then((data) => {
        this.setState({
          articles: data.articles,
          articlesCount: data.articlesCount,
          loadingArticles: false,
        });
      })
      .catch((e) => {
        this.setState({ errorArticles: true });
      });
  };

  clickHandler = (type) => {
    this.setState({
      typeFeed: type,
      loadingArticles: true,
      errorArticles: false,
      indexPagination: 1,
    });
  };

  PaginationClick = (page) => {
    page = page + 1;
    const { limit } = this.state;
    const offset = page * limit - limit;
    this.setState({
      indexPagination: page,
      loadingArticles: true,
    });
    this.loadArticles(offset);
  };

  render() {
    const {
      articles,
      articlesCount,
      limit,
      indexPagination,
      typeFeed,
      loadingArticles,
      errorArticles,
      loadingPage,
      errorPage,
      authorData,
    } = this.state;

    const { author } = this.props.match.params;
    const { token, username } = this.props.authInfo;

    const yourProfile = (
      <Link to="/settings" className="ion-gear-a">
        <button className="btn btn-sm btn-outline-secondary action-btn">
          <FontAwesomeIcon icon={faEdit} /> Edit Profile Settings
        </button>
      </Link>
    );

    const anotherProfile = (
      <FollowProfile
        author={authorData.username}
        following={authorData.following}
        token={token}
      />
    );

    const profileButton =
      author === username && !loadingPage && !errorPage
        ? yourProfile
        : anotherProfile;

    if (errorPage) {
      return <ErrorComponent />;
    }

    if (loadingPage) {
      return <Spinner />;
    }
    return (
      <>
        <div className="profile-page">
          <div className="user-info">
            <div className="container">
              <div className="row">
                <div className="col-xs-12 col-md-10 offset-md-1">
                  <img className="user-img" src={authorData.image} alt="" />
                  <h4>{authorData.username}</h4>
                  <p>{authorData.bio}</p>
                  <div>{profileButton}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="container">
          <ProfileFeed typeFeed={typeFeed} onClickHandler={this.clickHandler} />
          <ArticleList
            data={articles}
            loading={loadingArticles}
            error={errorArticles}
            limit={limit}
            articlesCount={articlesCount}
            onPaginationClick={this.PaginationClick}
            indexPagination={indexPagination}
            token={token}
          />
        </div>
      </>
    );
  }
}

const ProfileDetails = withUser(withRouter(ProfilePage));

export { ProfileDetails };
