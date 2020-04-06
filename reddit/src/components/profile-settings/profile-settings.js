import React, { Component } from "react";
import { Redirect } from "react-router";
import { Link } from "react-router-dom";
import ServerError from "../server-error-component";
import DataService from "../../services/data-service";
import "./profile-settings.css";

export default class ProfileSettings extends Component {
  DataService = new DataService();
  state = {
    email: "",
    password: null,
    username: "",
    bio: null,
    image: null,

    status: null,
    data: {},
  };

  onRecordBio = (e) => {
    const value = e.target.value;
    this.setState({ bio: value });
  };

  onRecordEmail = (e) => {
    const value = e.target.value;
    this.setState({ email: value });
  };

  onRecordPassword = (e) => {
    const value = e.target.value;
    this.setState({ password: value });
  };

  onRecordUsername = (e) => {
    const value = e.target.value;
    this.setState({ username: value });
  };

  onRecordImage = (e) => {
    const value = e.target.value;
    this.setState({ image: value });
  };

  changeData = () => {
    const user = {
      email: this.state.email,
      password: this.state.password,
      username: this.state.username,
      bio: this.state.bio,
      image: this.state.image,
    };
    const token = this.props.token;
    this.DataService.changeUserInfo({ user }, token).then((item) => {
      this.setState({
        status: item.status,
        data: item.data,
      });
    });
  };

  logout = () => {
    localStorage.clear();
    this.props.onSetToken();
  };

  componentDidMount() {
    const { email, username } = this.props;
    this.setState({
      email: email,
      username: username,
    });
  }
  render() {
    const { data, status, email, username } = this.state;
    if (status === 200) {
      localStorage.setItem("token", data.user.token);
      localStorage.setItem("email", data.user.email);
      localStorage.setItem("username", data.user.username);
      return <Redirect to="/" />;
    }
    return (
      <div className="settings-page">
        <div className="container page">
          <div className="row">
            <div className="col-md-6 offset-md-3 col-xs-12">
              <h1 className="text-xs-center">Your Settings</h1>
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
                      className="form-control ng-untouched ng-pristine ng-valid"
                      formcontrolname="image"
                      placeholder="URL of profile picture"
                      type="text"
                      onChange={this.onRecordImage}
                    />
                  </fieldset>
                  <fieldset className="form-group">
                    <input
                      className="form-control form-control-lg ng-untouched ng-pristine ng-valid"
                      formcontrolname="username"
                      placeholder="Username"
                      type="text"
                      onChange={(e) =>
                        this.setState({ username: e.target.value })
                      }
                      value={username}
                    />
                  </fieldset>
                  <fieldset className="form-group">
                    <textarea
                      className="form-control form-control-lg ng-untouched ng-pristine ng-valid"
                      formcontrolname="bio"
                      placeholder="Short bio about you"
                      rows="8"
                      onChange={this.onRecordBio}
                    ></textarea>
                  </fieldset>
                  <fieldset className="form-group">
                    <input
                      className="form-control form-control-lg ng-untouched ng-pristine ng-valid"
                      formcontrolname="email"
                      placeholder="Email"
                      type="email"
                      onChange={this.onRecordEmail}
                      value={email}
                    />
                  </fieldset>
                  <fieldset className="form-group">
                    <input
                      className="form-control form-control-lg ng-untouched ng-pristine ng-valid"
                      formcontrolname="password"
                      placeholder="New Password"
                      type="password"
                      onChange={this.onRecordPassword}
                    />
                  </fieldset>
                  <button
                    className="btn btn-lg btn-primary pull-xs-right"
                    type="submit"
                    onClick={this.changeData}
                  >
                    Update Settings
                  </button>
                </fieldset>
              </form>
              <hr />
              <Link
                to="/"
                className="btn btn-outline-danger"
                onClick={this.logout}
              >
                Or click here to logout.
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
