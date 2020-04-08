import React, { Component } from "react";
import { Redirect } from "react-router";
import { Link } from "react-router-dom";
import { editProfile } from "../../../services/profile-service";
import ErrorComponent from "../../shared/error-component";
import ServerError from "../../shared/server-error-component";

import "./profile-settings.css";

export default class ProfileSettings extends Component {
  state = {
    email: "",
    password: null,
    username: "",
    bio: null,
    image: null,
    error: false,
    status: null,
    data: {},
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
    editProfile({ user }, token)
      .then((profile) => {
        this.setState({
          status: profile.status,
          data: profile.data,
        });
      })
      .catch((e) => this.setState({ error: true }));
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
    const { data, status, email, username, error } = this.state;
    const Error = error ? <ErrorComponent /> : null;
    if (!this.props.token) {
      return <Redirect to="/login" />;
    }
    if (status === 200) {
      localStorage.setItem("token", data.user.token);
      localStorage.setItem("email", data.user.email);
      localStorage.setItem("username", data.user.username);
      return <Redirect to={`/profile/${username}`} />;
    }
    return (
      <div className="settings-page">
        <div className="container page">
          <div className="row">
            <div className="col-md-6 offset-md-3 col-xs-12">
              <h1 className="text-xs-center">Your Settings</h1>
              <div>
                <ServerError data={data} status={status} />
                {Error}
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
                      onChange={(e) => this.setState({ image: e.target.value })}
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
                      onChange={(e) => this.setState({ bio: e.target.value })}
                    ></textarea>
                  </fieldset>
                  <fieldset className="form-group">
                    <input
                      className="form-control form-control-lg ng-untouched ng-pristine ng-valid"
                      formcontrolname="email"
                      placeholder="Email"
                      type="email"
                      onChange={(e) => this.setState({ email: e.target.value })}
                      value={email}
                    />
                  </fieldset>
                  <fieldset className="form-group">
                    <input
                      className="form-control form-control-lg ng-untouched ng-pristine ng-valid"
                      formcontrolname="password"
                      placeholder="New Password"
                      type="password"
                      onChange={(e) =>
                        this.setState({ password: e.target.value })
                      }
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
