import React, { Component } from "react";
import { Redirect } from "react-router";
import { withRouter } from "react-router-dom";
import ServerError from "../server-error-component";
import DataService from "../../services/data-service";

import "./new-article.css";

class NewArticle extends Component {
  DataService = new DataService();
  state = {
    title: "",
    desc: "",
    body: "",
    tags: [],

    status: null,
    data: {},
  };

  componentDidMount() {
    if (this.props.match.params.slug) {
      this.getArticle(this.props.match.params.slug);
    }
  }

  onRecordTitle = (e) => {
    const value = e.target.value;
    this.setState({ title: value });
  };

  onRecordDesc = (e) => {
    const value = e.target.value;
    this.setState({ desc: value });
  };

  onRecordBody = (e) => {
    const value = e.target.value;
    this.setState({ body: value });
  };

  onRecordTags = (e) => {
    const value = e.target.value;
    this.setState({ tags: value });
  };

  getArticle = (slug) => {
    this.DataService.getArticle(slug).then((article) => {
      this.setState({
        title: article.title,
        desc: article.description,
        body: article.body,
      });
    });
  };

  sendData = () => {
    const article = {
      title: this.state.title,
      description: this.state.desc,
      body: this.state.body,
      tags: this.state.tags,
    };

    let serviceName = "postArticle";
    if (this.props.match.params.slug) {
      serviceName = "editArticle";
    }
    const slug = this.props.match.params.slug;
    const token = this.props.token;

    this.DataService[serviceName]({ article }, token, slug).then((item) => {
      this.setState({
        status: item.status,
        data: item.data,
      });
    });
  };

  render() {
    const { data, status, title, desc, body } = this.state;
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
                      onChange={this.onRecordTitle}
                      value={title}
                    />
                  </fieldset>
                  <fieldset className="form-group">
                    <input
                      className="form-control ng-untouched ng-pristine ng-valid"
                      formcontrolname="description"
                      placeholder="What's this article about?"
                      type="text"
                      onChange={this.onRecordDesc}
                      value={desc}
                    />
                  </fieldset>
                  <fieldset className="form-group">
                    <textarea
                      className="form-control ng-untouched ng-pristine ng-valid"
                      formcontrolname="body"
                      placeholder="Write your article (in markdown)"
                      rows="8"
                      onChange={this.onRecordBody}
                      value={body}
                    ></textarea>
                  </fieldset>
                  <fieldset className="form-group">
                    <input
                      className="form-control ng-untouched ng-pristine ng-valid"
                      placeholder="Enter tags"
                      type="text"
                      onChange={this.onRecordTags}
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

const RecordArticle = withRouter(NewArticle);

export { RecordArticle };
