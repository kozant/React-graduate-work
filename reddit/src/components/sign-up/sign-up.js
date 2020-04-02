import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Redirect } from "react-router";
import DataService from "../../services/data-service";
import "./sign-up.css";

export default class SignUp extends Component {
  DataService = new DataService();

  state = {
    email: null,
    password: null,
    username: null,

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

  onChangeName = e => {
    const value = e.target.value;
    this.setState({ username: value });
  };

  sendData = () => {
    const user = {
      email: this.state.email,
      password: this.state.password,
      username: this.state.username
    };
    this.DataService.signUp({ user }).then(item => {
      this.setState({
        status: item.status,
        data: item.data
      });
    });
  };

  loadUsernameError = () => {
    const { status, data } = this.state;
    if (status === 422) {
      if (data.errors.username === undefined) {
        return;
      } else {
        const username = (
          <li>
            username {data.errors.username[0] + " "}
            {data.errors.username[1] + " "}
            {data.errors.username[2]}
          </li>
        );
        return username;
      }
    }
  };
  loadEmailError = () => {
    const { status, data } = this.state;
    if (status === 422) {
      if (data.errors.email === undefined) {
        return;
      } else {
        const email = <li>email {data.errors.email[0]}</li>;
        return email;
      }
    }
  };
  loadPasswordError = () => {
    const { status, data } = this.state;
    if (status === 422) {
      if (data.errors.password === undefined) {
        return;
      } else {
        const password = <li>email {data.errors.password[0]}</li>;
        return password;
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
              <h1 className="text-xs-center">Sign up</h1>
              <p className="text-xs-center">
                <Link to="/login">Have an account?</Link>
              </p>
              <div>
                <ul className="error-messages">
                  {this.loadUsernameError()}
                  {this.loadEmailError()}
                  {this.loadPasswordError()}
                </ul>
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
                      className="form-control form-control-lg ng-untouched ng-pristine ng-valid"
                      formcontrolname="username"
                      placeholder="Username"
                      type="text"
                      onChange={this.onChangeName}
                    />
                  </fieldset>
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
