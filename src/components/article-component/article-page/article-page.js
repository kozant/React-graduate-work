import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { Link } from "react-router-dom";
import { Redirect } from "react-router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";

import { getArticle, deleteArticle } from "../../../services/article-service";
import { getProfile } from "../../../services/profile-service";
import ErrorComponent from "../../shared/error-component";
import FollowProfile from "../../profile-component/follow-profile";
import FavouriteLike from "../favourite-like";

import Spinner from "../../shared/spinner";

import "./article-page.css";

const ArticlePage = ({ match, token, username }) => {
  return (
    <ItemDetails slug={match.params.slug} token={token} username={username} />
  );
};

class ItemDetails extends Component {
  state = {
    article: [],
    articleDeleted: false,
    errorPage: false,
    loadingPage: true,
    profile: [],
  };

  componentDidMount() {
    this.loadArticle();
  }

  componentDidUpdate(prevProps) {
    if (this.props.slug !== prevProps.slug) {
      this.loadArticle();
    }
  }

  loadArticle = () => {
    const { slug, token } = this.props;
    if (!slug) {
      return;
    }
    getArticle(slug)
      .then((article) => {
        getProfile(article.author, token).then((profile) => {
          this.setState({
            profile: profile,
            article: article,
            loadingPage: false,
          });
        });
      })
      .catch((e) => this.setState({ errorPage: true }));
  };

  deleteArticle = (slug, token, author) => {
    deleteArticle(slug, token).then(this.setState({ articleDeleted: true }));
  };

  render() {
    const {
      article,
      loadingPage,
      errorPage,
      profile,
      articleDeleted,
    } = this.state;
    const { slug, token, username } = this.props;

    if (articleDeleted) {
      return <Redirect to={`/profile/${username}`} />;
    }

    const elements =
      article.tagList &&
      article.tagList.map((item, index) => {
        return (
          <li key={index} className="tag-default tag-pill tag-outline">
            {item}
          </li>
        );
      });

    const yourArticle = (
      <span>
        <Link to={`/editor/${slug}`}>
          <button className="btn btn-sm btn-outline-secondary">
            <FontAwesomeIcon icon={faEdit} /> Edit Article
          </button>
        </Link>
        <button
          className="btn btn-sm btn-outline-danger"
          onClick={() => this.deleteArticle(slug, token)}
        >
          <FontAwesomeIcon icon={faTrashAlt} />
          Delete Article
        </button>
      </span>
    );

    const anotherArticle = (
      <span className="article-buttons">
        <FollowProfile
          author={profile.username}
          following={profile.following}
          token={this.props.token}
        />
        <FavouriteLike
          className="btn btn-sm btn-outline-primary"
          favoritesCount={article.favoritesCount}
          favorited={article.favorited}
          slug={article.slug}
          page={true}
          token={token}
        ></FavouriteLike>
      </span>
    );
    const articleButtons =
      article.author === username ? yourArticle : anotherArticle;

    const Content = (
      <div className="article-page">
        <div className="banner">
          <div className="container">
            <h1>{article.title}</h1>
            <div>
              <div className="article-meta">
                <Link to={`/profile/${article.author}`}>
                  <img src={article.image} alt="" />
                </Link>
                <div className="info">
                  <Link to={`/profile/${article.author}`} className="author">
                    {article.author}
                  </Link>
                  <span className="date">{article.updatedAt}</span>
                </div>
                {articleButtons}
              </div>
            </div>
          </div>
        </div>
        <div className="container article-content">
          <div className="row">
            <div className="col-md-12">
              <div>
                <p>{article.body}</p>
              </div>
              <ul className="tag-list">{elements}</ul>
            </div>
          </div>
        </div>
        <hr></hr>
      </div>
    );

    const spinner = loadingPage && !errorPage ? <Spinner /> : null;

    const content = !loadingPage && !errorPage ? Content : null;

    const error = errorPage ? <ErrorComponent /> : null;
    return (
      <React.Fragment>
        {spinner}
        {content}
        {error}
      </React.Fragment>
    );
  }
}

const ArticleDetails = withRouter(ArticlePage);

export { ArticleDetails };
