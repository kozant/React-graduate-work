import React, { Component } from "react";
import { Redirect } from "react-router";
import DataService from "../../services/data-service";

import "./new-article.css";

export default class NewArticle extends Component {
  DataService = new DataService();
  state = {
    title: null,
    desc: null,
    body: null,
    tags: [],

    status: null,
    data: {}
  };

  onRecordTitle = e => {
    const value = e.target.value;
    this.setState({ title: value });
  };

  onRecordDesc = e => {
    const value = e.target.value;
    this.setState({ desc: value });
  };

  onRecordBody = e => {
    const value = e.target.value;
    this.setState({ body: value });
  };

  onRecordTags = e => {
    const value = e.target.value;
    this.setState({ tags: value });
  };

  sendData = () => {
    const article = {
      title: this.state.title,
      description: this.state.desc,
      body: this.state.body,
      tags: this.state.tags
    };
    const token = localStorage.getItem("token");
    this.DataService.postArticle({ article }, token).then(item => {
      this.setState({
        status: item.status,
        data: item.data
      });
    });
  };
  loadTitleError = () => {
    const { status, data } = this.state;
    if (status === 422) {
      if (data.errors.title === undefined) {
        return;
      } else {
        const title = (
          <li>
            title {data.errors.title[0] + " "}
            {data.errors.title[1]}
          </li>
        );
        return title;
      }
    }
  };
  loadBodyError = () => {
    const { status, data } = this.state;
    if (status === 422) {
      if (data.errors.body === undefined) {
        return;
      } else {
        const body = <li>body {data.errors.body[0]}</li>;
        return body;
      }
    }
  };
  loadDescError = () => {
    const { status, data } = this.state;
    if (status === 422) {
      if (data.errors.description === undefined) {
        return;
      } else {
        const desc = (
          <li>
            description {data.errors.description[0] + " "}
            {data.errors.description[1]}
          </li>
        );
        return desc;
      }
    }
  };
  render() {
    const { data, status } = this.state;
    if (status === 200) {
      console.log(data.article.slug);
      return <Redirect to={`/article/${data.article.slug}`} />;
    }
    return (
      <div className="editor-page">
        <div className="container page">
          <div className="row">
            <div className="col-md-10 offset-md-1 col-xs-12">
              <div>
                <ul className="error-messages">
                  {this.loadTitleError()}
                  {this.loadBodyError()}
                  {this.loadDescError()}
                </ul>
              </div>
              <form
                className="ng-untouched ng-pristine ng-valid"
                onSubmit={e => {
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
                    />
                  </fieldset>
                  <fieldset className="form-group">
                    <input
                      className="form-control ng-untouched ng-pristine ng-valid"
                      formcontrolname="description"
                      placeholder="What's this article about?"
                      type="text"
                      onChange={this.onRecordDesc}
                    />
                  </fieldset>
                  <fieldset className="form-group">
                    <textarea
                      className="form-control ng-untouched ng-pristine ng-valid"
                      formcontrolname="body"
                      placeholder="Write your article (in markdown)"
                      rows="8"
                      onChange={this.onRecordBody}
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
