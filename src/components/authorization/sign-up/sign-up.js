import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Redirect } from "react-router";
import ServerError from "../../shared/server-error-component";
import ErrorComponent from "../../shared/error-component";
import { signUp } from "../../../services/auth-service";
import withUser from "../../../hocs";

import "./sign-up.css";

class SignUp extends Component {
  state = {
    email: "",
    password: "",
    username: "",
    error: false,
    status: null,
    data: {},
  };

  sendData = () => {
    const user = {
      email: this.state.email,
      password: this.state.password,
      username: this.state.username,
    };
    signUp({ user })
      .then((item) => {
        this.setState({
          data: item,
        });
        this.props.data.onSetToken(
          item.data.user.token,
          item.data.user.email,
          item.data.user.username
        );
      })
      .catch((e) => this.setState({ error: true }));
  };

  render() {
    const { token } = this.props.data;
    const { data, status, error } = this.state;
    if (error) {
      return <ErrorComponent />;
    }
    if (token) {
      return <Redirect to="/" />;
    }
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
                      className="form-control form-control-lg ng-untouched ng-pristine ng-valid"
                      formcontrolname="username"
                      placeholder="Username"
                      type="text"
                      onChange={(e) =>
                        this.setState({ username: e.target.value })
                      }
                    />
                  </fieldset>
                  <fieldset className="form-group">
                    <input
                      className="form-control form-control-lg ng-untouched ng-pristine ng-invalid"
                      formcontrolname="email"
                      placeholder="Email"
                      type="text"
                      onChange={(e) => this.setState({ email: e.target.value })}
                    />
                  </fieldset>
                  <fieldset className="form-group">
                    <input
                      className="form-control form-control-lg ng-untouched ng-pristine ng-invalid"
                      formcontrolname="password"
                      placeholder="Password"
                      type="password"
                      onChange={(e) =>
                        this.setState({ password: e.target.value })
                      }
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
