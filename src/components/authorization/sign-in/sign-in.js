import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Redirect } from "react-router";
import ServerError from "../../shared/server-error-component";
import { signIn } from "../../../services/auth-service";
import "./sign-in.css";

export default class SignIn extends Component {
  state = {
    email: null,
    password: null,

    status: null,
    data: {},
  };

  onChangeEmail = (e) => {
    const value = e.target.value;
    this.setState({ email: value });
  };

  onChangePassword = (e) => {
    const value = e.target.value;
    this.setState({ password: value });
  };

  sendData = () => {
    const user = {
      email: this.state.email,
      password: this.state.password,
      username: this.state.username,
    };
    signIn({ user }).then((item) => {
      this.setState({
        status: item.status,
        data: item.data,
      });
      if (item.status === 200) {
        this.props.onSetToken(
          item.data.user.token,
          item.data.user.email,
          item.data.user.username
        );
      }
    });
  };

  render() {
    const { token } = this.props;

    if (token) {
      return <Redirect to="/" />;
    }
    const { data, status } = this.state;
    if (status === 200) {
      localStorage.setItem("token", data.user.token);
      localStorage.setItem("email", data.user.email);
      localStorage.setItem("username", data.user.username);

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
                <ServerError data={data} status={status} />
              </div>
              <form
                className="ng-untouched ng-pristine ng-invalid"
                onSubmit={(e) => {
                  e.preventDefault();
                }}
              >
                <fieldset>
                  <fieldset className="form-group">
                    <input
                      className="form-control form-control-lg ng-untouched ng-pristine ng-invalid"
                      formcontrolname="email"
                      placeholder="Email"
                      type="text"
                      onChange={this.onChangeEmail}
                    />
                  </fieldset>
                  <fieldset className="form-group">
                    <input
                      className="form-control form-control-lg ng-untouched ng-pristine ng-invalid"
                      formcontrolname="password"
                      placeholder="Password"
                      type="password"
                      onChange={this.onChangePassword}
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
