import React, { Component } from "react";
import { Redirect } from "react-router";
import { withRouter } from "react-router-dom";
import ServerError from "../../shared/server-error-component";
import {
  getArticle,
  postArticle,
  editArticle,
} from "../../../services/article-service";

import withUser from "../../../hocs";

import "./new-article.css";

class NewArticle extends Component {
  state = {
    title: "",
    desc: "",
    body: "",
    tags: [],
    errorGetArticle: false,
    articleStatus: null,
    articleData: {},
  };

  componentDidMount() {
    if (this.props.match.params.slug && this.props.authInfo.token) {
      this.getArticleData(this.props.match.params.slug);
    }
  }

  getArticleData = (slug) => {
    getArticle(slug)
      .then((article) => {
        this.setState({
          title: article.title,
          desc: article.description,
          body: article.body,
          tags: article.tagList,
        });
      })
      .catch((e) => {
        this.setState({ errorGetArticle: true });
      });
  };

  onChangeField = (e) => {
    if (e.target.name === "tags") {
      this.setState({
        [e.target.name]: e.target.value.split(" "),
      });
    } else {
      this.setState({
        [e.target.name]: e.target.value,
      });
    }
  };

  sendData = () => {
    const article = {
      title: this.state.title,
      description: this.state.desc,
      body: this.state.body,
      tagList: this.state.tags,
    };

    let serviceName = postArticle;
    if (this.props.match.params.slug) {
      serviceName = editArticle;
    }
    const slug = this.props.match.params.slug;
    const token = this.props.authInfo.token;
    serviceName({ article }, token, slug)
      .then((article) => {
        this.setState({
          articleStatus: article.status,
          articleData: article.data,
        });
      })
      .catch((e) => {
        this.setState({ articleStatus: e.status, articleData: e.data });
      });
  };

  render() {
    const {
      articleData,
      articleStatus,
      title,
      desc,
      body,
      tags,
      errorGetArticle,
    } = this.state;
    if (errorGetArticle) {
      return (
        <div className=" row justify-content-center">Article not Found</div>
      );
    }
    if (!this.props.authInfo.token) {
      return <Redirect to="/login" />;
    }
    if (articleStatus === 200) {
      return <Redirect to={`/article/${articleData.article.slug}`} />;
    }
    return (
      <div className="new-article">
        <div className="container page">
          <div className="row">
            <div className="col-md-10 offset-md-1 col-xs-12">
              <div>
                <ServerError data={articleData} status={articleStatus} />
              </div>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                }}
              >
                <fieldset>
                  <fieldset className="form-group">
                    <input
                      className="form-control form-control-lg"
                      name="title"
                      placeholder="Article Title"
                      type="text"
                      onChange={this.onChangeField}
                      value={title}
                    />
                  </fieldset>
                  <fieldset className="form-group">
                    <input
                      className="form-control"
                      name="desc"
                      placeholder="What's this article about?"
                      type="text"
                      onChange={this.onChangeField}
                      value={desc}
                    />
                  </fieldset>
                  <fieldset className="form-group">
                    <textarea
                      className="form-control"
                      name="body"
                      placeholder="Write your article (in markdown)"
                      rows="8"
                      onChange={this.onChangeField}
                      value={body}
                    ></textarea>
                  </fieldset>
                  <fieldset className="form-group">
                    <input
                      className="form-control"
                      name="tags"
                      placeholder="Enter tags"
                      type="text"
                      onChange={this.onChangeField}
                      value={tags}
                    />
                    <div className="tag-list"></div>
                  </fieldset>
                  <button
                    className="btn btn-lg pull-xs-right btn-primary"
                    type="button"
                    onClick={this.sendData}
                  >
                    Publish Article
                  </button>
                </fieldset>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const RecordArticle = withUser(withRouter(NewArticle));

export { RecordArticle };
