import React, { Component } from "react";
import { Link } from "react-router-dom";
import { withRouter } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import ProfileFeed from "../profile-feed";
import ArticleList from "../../shared/article-list";
import FollowProfile from "../../follow-profile";
import {
  getAuthorArticles,
  getFavouritedArticles,
} from "../../../services/article-service";
import { getProfile } from "../../../services/profile-service";

import Spinner from "../../shared/spinner";

import "./profile-page.css";

const ProfilePage = ({ match, token, username }) => {
  return (
    <ItemDetails
      author={match.params.author}
      token={token}
      username={username}
    />
  );
};

class ItemDetails extends Component {
  state = {
    articles: [],
    articlesCount: null,
    indexPagination: 1,

    limit: 10,
    offset: 0,

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
    if (this.props.author !== prevProps.author) {
      this.loadPage();
    }
    if (this.state.typeFeed !== prevState.typeFeed) {
      this.loadArticles();
    }
  }

  loadPage() {
    const { author, token } = this.props;
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
      .catch((e) => this.setState({ errorPage: true }));
  }

  loadArticles = () => {
    const payLoad = {
      author: this.props.author,
      limit: this.state.limit,
      offset: this.state.offset,
      token: this.props.token,
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
      .catch((e) => this.setState({ errorArticles: true }));
  };

  clickHandler = (type) => {
    this.setState(() => {
      return {
        typeFeed: type,
        loadingArticles: true,
        errorArticles: false,
        indexPagination: 1,
      };
    });
  };

  PaginationClick = (page) => {
    page = page + 1;

    this.setState({
      indexPagination: page,
      offset: page * 10 - 10,
      loadingArticles: true,
    });

    this.loadArticles();
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

    const { author, token, username } = this.props;
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
        token={this.props.token}
      />
    );

    const profileButton = author === username ? yourProfile : anotherProfile;

    const Content = (
      <React.Fragment>
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
      </React.Fragment>
    );

    const spinner =
      loadingPage && !errorPage ? (
        <div className="row justify-content-center">
          <Spinner />
        </div>
      ) : null;
    const content = !loadingPage && !errorPage ? Content : null;
    const error = errorPage ? (
      <div className="row justify-content-center">Error</div>
    ) : null;

    return (
      <React.Fragment>
        {spinner}
        {content}
        {error}
      </React.Fragment>
    );
  }
}

const ProfileDetails = withRouter(ProfilePage);

export { ProfileDetails };
