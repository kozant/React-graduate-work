import React, { Component } from "react";
import { Redirect } from "react-router";
import { Link } from "react-router-dom";
import { editProfile } from "../../../services/profile-service";
import ServerError from "../../shared/server-error-component";
import withUser from "../../../hocs";

import "./profile-settings.css";

class ProfileSettings extends Component {
  _isMounted = false;
  state = {
    email: "",
    password: null,
    username: "",
    bio: null,
    image: null,
    profileStatus: null,
    profileData: {},
  };

  componentDidMount() {
    this._isMounted = true;
    const { email, username } = this.props.authInfo;
    this.setState({
      email: email,
      username: username,
    });
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  onChangeField = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  changeData = () => {
    const user = {
      email: this.state.email,
      password: this.state.password,
      username: this.state.username,
      bio: this.state.bio,
      image: this.state.image,
    };
    const token = this.props.authInfo.token;
    editProfile({ user }, token)
      .then((profile) => {
        this.props.authInfo.onSetAuthInfo(profile.data.user);
        if (this._isMounted) {
          this.setState({
            profileStatus: profile.status,
            profileData: profile.data,
          });
        }
      })
      .catch((e) => {
        if (this._isMounted) {
          this.setState({
            profileStatus: e.status,
            profileData: e.data,
          });
        }
      });
  };

  logout = () => {
    this.props.authInfo.onSetAuthInfo({});
  };

  render() {
    const { profileData, profileStatus, email, username } = this.state;
    if (!this.props.authInfo.token) {
      return <Redirect to="/login" />;
    }
    if (profileStatus === 200) {
      return <Redirect to={`/profile/${username}`} />;
    }
    return (
      <div className="settings-page">
        <div className="container page">
          <div className="row">
            <div className="col-md-6 offset-md-3 col-xs-12">
              <h1 className="text-xs-center">Your Settings</h1>
              <div>
                <ServerError data={profileData} status={profileStatus} />
              </div>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                }}
              >
                <fieldset>
                  <fieldset className="form-group">
                    <input
                      className="form-control"
                      name="image"
                      placeholder="URL of profile picture"
                      type="text"
                      onChange={this.onChangeField}
                    />
                  </fieldset>
                  <fieldset className="form-group">
                    <input
                      className="form-control form-control-lg"
                      name="username"
                      placeholder="Username"
                      type="text"
                      onChange={this.onChangeField}
                      value={username}
                    />
                  </fieldset>
                  <fieldset className="form-group">
                    <textarea
                      className="form-control form-control-lg"
                      name="bio"
                      placeholder="Short bio about you"
                      rows="8"
                      onChange={this.onChangeField}
                    ></textarea>
                  </fieldset>
                  <fieldset className="form-group">
                    <input
                      className="form-control form-control-lg"
                      name="email"
                      placeholder="Email"
                      type="email"
                      onChange={this.onChangeField}
                      value={email}
                    />
                  </fieldset>
                  <fieldset className="form-group">
                    <input
                      className="form-control form-control-lg"
                      name="password"
                      placeholder="New Password"
                      type="password"
                      onChange={this.onChangeField}
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

export default withUser(ProfileSettings);
