import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { withService } from "../../../hocs/withService";
import { Link } from "react-router-dom";
import { Redirect } from "react-router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";

import FollowProfile from "../../follow-profile";
import FavouriteLike from "../../favourite-like";

import Spinner from "../../spinner";

import "./article-page.css";

const ArticlePage = ({ match, dataService, token, username }) => {
  const { getArticle, getProfile, deleteArticle } = dataService;
  return (
    <ItemDetails
      slug={match.params.slug}
      getArticle={getArticle}
      getProfile={getProfile}
      deleteArticle={deleteArticle}
      token={token}
      username={username}
    />
  );
};

class ItemDetails extends Component {
  state = {
    article: [],
    existArticle: null,
    loading: true,
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
    this.props.getArticle(slug).then((article) => {
      this.props.getProfile(article.author, token).then((profile) => {
        this.setState({ profile: profile, article: article, loading: false });
      });
    });
  };

  deleteArticle = (slug, token, author) => {
    this.props.deleteArticle(slug, token).then((status) => {
      if (status === 200) {
        this.setState({ existArticle: <Redirect to={`/profile/${author}`} /> });
      }
    });
  };

  render() {
    const { article, loading, profile, existArticle } = this.state;
    const { slug, token, username } = this.props;

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
          onClick={() => this.deleteArticle(slug, token, username)}
        >
          <FontAwesomeIcon icon={faTrashAlt} />
          {existArticle} Delete Article
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
                  <img src={article.image} />
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

    const spinner = loading ? <Spinner /> : null;
    const content = !loading ? Content : null;

    return (
      <React.Fragment>
        {spinner}
        {content}
      </React.Fragment>
    );
  }
}

const ArticleDetails = withService(withRouter(ArticlePage));

export { ArticleDetails };
