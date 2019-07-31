import React, { Component } from "react";
import { Route } from "react-router-dom";
import Home from "./core/Home";
import PrivateRoute from "./core/PrivateRoute";
import { SignInForm } from "./auth/SignIn";

export default class MainRouter extends Component {
  render() {
    return (
      <React.Fragment>
        <PrivateRoute exact path="/" component={Home} />
        <Route path="/signin" component={props => <SignInForm {...props} />} />
      </React.Fragment>
    );
  }
}
