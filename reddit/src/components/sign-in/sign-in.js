import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Redirect } from "react-router";
import DataService from "../../services/data-service";
import "./sign-in.css";

export default class SignIn extends Component {
  DataService = new DataService();

  state = {
    email: null,
    password: null,

    status: null,
    data: {}
  };

  onChangeEmail = e => {
    const value = e.target.value;
    this.setState({ email: value });
  };

  onChangePassword = e => {
    const value = e.target.value;
    this.setState({ password: value });
  };

  sendData = () => {
    const user = {
      email: this.state.email,
      password: this.state.password,
      username: this.state.username
    };
    this.DataService.signIn({ user }).then(item => {
      this.setState({
        status: item.status,
        data: item.data
      });
      this.props.onSetToken(item.data.user.token);
    });
  };

  loadError = () => {
    const { status, data } = this.state;
    if (status === 422) {
      if (data.errors["email or password"][0] === undefined) {
        return;
      } else {
        const error = (
          <li>email or password {data.errors["email or password"][0]}</li>
        );
        return error;
      }
    }
  };

  render() {
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
                <ul className="error-messages">{this.loadError()}</ul>
              </div>
              <form
                className="ng-untouched ng-pristine ng-invalid"
                onSubmit={e => {
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
