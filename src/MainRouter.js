import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import Home from "./core/Home";
import Menu from "./core/Menu";
import PrivateRoute from "./core/PrivateRoute";
import { SignInForm } from "./auth/SignIn";

export default class MainRouter extends Component {
  render() {
    return (
      <div>
        <PrivateRoute exact path="/" component={Home} />
        <Route path="/signin" component={props => <SignInForm {...props} />} />
      </div>
    );
  }
}
