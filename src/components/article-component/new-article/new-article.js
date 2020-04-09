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
    errorPutArticle: false,
    status: null,
    data: {},
  };

  componentDidMount() {
    if (this.props.match.params.slug && this.props.data.token) {
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
      .catch((e) => this.setState({ errorGetArticle: true }));
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
    const token = this.props.data.token;

    serviceName({ article }, token, slug)
      .then((item) => {
        this.setState({
          status: item.status,
          data: item.data,
        });
      })
      .catch((e) => {
        this.setState({ errorPutArticle: true });
      });
  };

  render() {
    const {
      data,
      status,
      title,
      desc,
      body,
      tags,
      errorGetArticle,
      errorPutArticle,
    } = this.state;
    if (errorGetArticle) {
      return (
        <div className=" row justify-content-center">Article not Found</div>
      );
    }
    if (errorPutArticle) {
      return (
        <div className=" row justify-content-center">
          You can't change another article
        </div>
      );
    }
    if (!this.props.data.token) {
      return <Redirect to="/login" />;
    }
    if (status === 200) {
      return <Redirect to={`/article/${data.article.slug}`} />;
    }
    return (
      <div className="new-article">
        <div className="container page">
          <div className="row">
            <div className="col-md-10 offset-md-1 col-xs-12">
              <div>
                <ServerError data={data} status={status} />
              </div>
              <form
                className="ng-untouched ng-pristine ng-valid"
                onSubmit={(e) => {
                  e.preventDefault();
                }}
              >
                <fieldset>
                  <fieldset className="form-group">
                    <input
                      className="form-control form-control-lg ng-untouched ng-pristine ng-valid"
                      formcontrolname="title"
                      placeholder="Article Title"
                      type="text"
                      onChange={(e) => this.setState({ title: e.target.value })}
                      value={title}
                    />
                  </fieldset>
                  <fieldset className="form-group">
                    <input
                      className="form-control ng-untouched ng-pristine ng-valid"
                      formcontrolname="description"
                      placeholder="What's this article about?"
                      type="text"
                      onChange={(e) => this.setState({ desc: e.target.value })}
                      value={desc}
                    />
                  </fieldset>
                  <fieldset className="form-group">
                    <textarea
                      className="form-control ng-untouched ng-pristine ng-valid"
                      formcontrolname="body"
                      placeholder="Write your article (in markdown)"
                      rows="8"
                      onChange={(e) => this.setState({ body: e.target.value })}
                      value={body}
                    ></textarea>
                  </fieldset>
                  <fieldset className="form-group">
                    <input
                      className="form-control ng-untouched ng-pristine ng-valid"
                      placeholder="Enter tags"
                      type="text"
                      onChange={(e) =>
                        this.setState({ tags: e.target.value.split(" ") })
                      }
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
