import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Redirect } from "react-router";
import ServerError from "../../shared/server-error-component";
import { signUp } from "../../../services/auth-service";
import withUser from "../../../hocs";

import "./sign-up.css";

class SignUp extends Component {
  state = {
    email: "",
    password: "",
    username: "",
    authStatus: null,
    authData: {},
  };

  onChangeField = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  sendData = () => {
    const user = {
      email: this.state.email,
      password: this.state.password,
      username: this.state.username,
    };
    signUp({ user })
      .then((item) => {
        this.props.authInfo.onSetAuthInfo(item.data.user);
        this.setState({
          authData: item.data,
          authStatus: item.status,
        });
      })
      .catch((e) => {
        this.setState({ authData: e.data, authStatus: e.status });
      });
  };

  render() {
    const { token } = this.props.authInfo;
    const { authData, authStatus } = this.state;
    if (token) {
      return <Redirect to="/" />;
    }
    return (
      <div className="auth-page">
        <div className="container page">
          <div className="row">
            <div className="col-md-6 offset-md-3 col-xs-12">
              <h1 className="text-xs-center">Sign up</h1>
              <p className="text-xs-center">
                <Link to="/login">Have an account?</Link>
              </p>
              <div>
                <ServerError data={authData} status={authStatus} />
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
                      name="username"
                      placeholder="Username"
                      type="text"
                      onChange={this.onChangeField}
                    />
                  </fieldset>
                  <fieldset className="form-group">
                    <input
                      className="form-control form-control-lg"
                      name="email"
                      placeholder="Email"
                      type="text"
                      onChange={this.onChangeField}
                    />
                  </fieldset>
                  <fieldset className="form-group">
                    <input
                      className="form-control form-control-lg"
                      name="password"
                      placeholder="Password"
                      type="password"
                      onChange={this.onChangeField}
                    />
                  </fieldset>
                  <button
                    className="btn btn-lg btn-primary pull-xs-right"
                    type="submit"
                    onClick={this.sendData}
                  >
                    Sign up
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

export default withUser(SignUp);
