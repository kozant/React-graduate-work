import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Redirect } from "react-router";
import { signIn } from "../../../services/auth-service";
import ServerError from "../../shared/server-error-component";
import withUser from "../../../hocs";

import "./sign-in.css";

class SignIn extends Component {
  state = {
    email: "",
    password: "",
    error: false,
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
    };
    signIn({ user })
      .then((item) => {
        this.props.authInfo.onSetAuthInfo(item.data.user);
        this.setState({
          authStatus: item.status,
          authData: item.data,
        });
      })
      .catch((e) => {
        this.setState({
          authStatus: e.status,
          authData: e.data,
        });
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
              <h1 className="text-xs-center">Sign in</h1>
              <p className="text-xs-center">
                <Link to="/register">Need an account?</Link>
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
                    Sign in
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

export default withUser(SignIn);
