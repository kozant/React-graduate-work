import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { withService } from "../../../hocs/withService";
import { Link } from "react-router-dom";

import Spinner from "../../spinner";

import "./article-page.css";

const ArticlePage = ({ match, dataService }) => {
  const { getArticle } = dataService;
  console.log(match);
  return <ItemDetails itemId={match.params.slug} getArticle={getArticle} />;
};

class ItemDetails extends Component {
  state = {
    data: [],
    loading: true
  };

  componentDidMount() {
    this.updateItem();
  }

  componentDidUpdate(prevProps) {
    if (this.props.itemId !== prevProps.itemId) {
      this.updateItem();
    }
  }

  updateItem() {
    const { itemId } = this.props;
    if (!itemId) {
      return;
    }
    this.props.getArticle(itemId).then(item => {
      this.setState({ data: item, loading: false });
    });
  }

  render() {
    const { data, loading } = this.state;
    const author = localStorage.getItem("username");
    const elements =
      data.tagList &&
      data.tagList.map((item, index) => {
        return (
          <li key={index} className="tag-default tag-pill tag-outline">
            {item}
          </li>
        );
      });

    const yourArticle = (
      <span>
        <a className="btn btn-sm btn-outline-secondary">
          <i className="ion-edit"></i> Edit Article
        </a>
        <button className="btn btn-sm btn-outline-danger">
          <i className="ion-trash-a"></i> Delete Article
        </button>
      </span>
    );

    const anotherArticle = (
      <span>
        <button className="btn btn-sm action-btn btn-outline-secondary">
          <i className="ion-plus-round"></i>Follow {data.author}
        </button>
        <button className="btn btn-sm btn-outline-primary">
          <i className="ion-heart"></i> Favorite Article
          <span className="counter">{data.favoritesCount}</span>
        </button>
      </span>
    );

    const articleButtons =
      data.author === author ? yourArticle : anotherArticle;

    const Content = (
      <React.Fragment>
        <div className="banner">
          <div className="container">
            <h1>{data.title}</h1>
            <div>
              <div className="article-meta">
                <Link to={`/profile/${data.author}`}>
                  <img src={data.image} />
                </Link>
                <div className="info">
                  <Link to={`/profile/${data.author}`} className="author">
                    {data.author}
                  </Link>
                  <span className="date">{data.updatedAt}</span>
                </div>
                {articleButtons}
              </div>
            </div>
          </div>
        </div>
        <div className="container row article-content">
          <div className="col-md-12">
            <div>
              <p>{data.body}</p>
            </div>
            <ul className="tag-list">{elements}</ul>
          </div>
        </div>
        <hr></hr>
      </React.Fragment>
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
