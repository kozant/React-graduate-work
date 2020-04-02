import React, { Component } from "react";
import { Link } from "react-router-dom";
import { withRouter } from "react-router-dom";
import { withService } from "../../../hocs/withService";
import ProfileFeed from "../../profile-feed";
import ArticleList from "../../article-list";

import Spinner from "../../spinner";

import "./profile-page.css";

const ProfilePage = ({ match, dataService }) => {
  const { getProfile, getAuthorArticles, getFavouritedArticles } = dataService;
  console.log(match.params.author);
  return (
    <ItemDetails
      itemId={match.params.author}
      getProfile={getProfile}
      getAuthorArticles={getAuthorArticles}
      getFavouritedArticles={getFavouritedArticles}
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

    typeFeed: "myPosts"
  };

  componentDidMount() {
    this.loadPage();
    this.loadArticles();
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.itemId !== prevProps.itemId) {
      this.loadPage();
    }
    if (this.state.typeFeed !== prevState.typeFeed) {
      this.loadArticles();
    }
  }

  loadPage() {
    const { itemId } = this.props;
    if (!itemId) {
      return;
    }
    this.props
      .getProfile(itemId)
      .then(item => {
        this.setState({ authorData: item, loadingPage: false });
      })
      .catch(e => this.setState({ errorPage: true }));
  }

  loadArticles = () => {
    const payLoad = {
      author: this.props.itemId,
      limit: this.state.limit,
      offset: this.state.offset
    };

    let serviceName;
    if (this.state.typeFeed === "myPosts") {
      serviceName = "getAuthorArticles";
    } else if (this.state.typeFeed === "favouritedPosts") {
      serviceName = "getFavouritedArticles";
    }

    this.props[serviceName](payLoad)
      .then(data => {
        this.setState({
          articles: data.articles,
          articlesCount: data.articlesCount,
          loadingArticles: false
        });
      })
      .catch(e => this.setState({ errorArticles: true }));
  };

  clickHandler = type => {
    this.setState(() => {
      return {
        typeFeed: type,
        loadingArticles: true,
        errorArticles: false,
        indexPagination: 1
      };
    });
  };

  PaginationClick = page => {
    page = page + 1;

    this.setState({
      indexPagination: page,
      offset: page * 10 - 10,
      loadingArticles: true
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

      authorData
    } = this.state;

    const yourProfile = (
      <Link to="/settings" className="ion-gear-a">
        <button className="btn btn-sm btn-outline-secondary action-btn">
          Edit Profile Settings
        </button>
      </Link>
    );
    const anotherProfile = (
      <button className="btn btn-sm action-btn btn-outline-secondary">
        <i className="ion-plus-round"></i> &nbsp; Follow {authorData.username}
      </button>
    );

    const profileButton =
      this.props.itemId === localStorage.getItem("username")
        ? yourProfile
        : anotherProfile;

    const Content = (
      <React.Fragment>
        <div className="profile-page">
          <div className="user-info">
            <div className="container">
              <div className="row">
                <div className="col-xs-12 col-md-10 offset-md-1">
                  <img className="user-img" src={authorData.image} />
                  <h4>{authorData.username}</h4>
                  <p></p>
                  <div>{profileButton}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <ProfileFeed typeFeed={typeFeed} onClickHandler={this.clickHandler} />
        <ArticleList
          data={articles}
          loading={loadingArticles}
          error={errorArticles}
          limit={limit}
          articlesCount={articlesCount}
          onPaginationClick={this.PaginationClick}
          indexPagination={indexPagination}
        />
      </React.Fragment>
    );

    const spinner = loadingPage ? <Spinner /> : null;
    const content = !loadingPage ? Content : null;

    return (
      <React.Fragment>
        {spinner}
        {content}
      </React.Fragment>
    );
  }
}

const ProfileDetails = withService(withRouter(ProfilePage));

export { ProfileDetails };
