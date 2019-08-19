import React, { Component } from "react";
import { Route } from "react-router-dom";
import Home from "./core/Home";
import CategoryListPage from "./category/CategoryListPage";
import CustomerListPage from "./customer/CustomerListPage";
import PrivateRoute from "./core/PrivateRoute";
import { SignInForm } from "./auth/SignIn";

export default class MainRouter extends Component {
  render() {
    return (
      <React.Fragment>
        <PrivateRoute exact path="/categories" component={CategoryListPage} />
        <PrivateRoute exact path="/customers" component={CustomerListPage} />
        <PrivateRoute exact path="/" component={Home} />
        <Route path="/signin" component={props => <SignInForm {...props} />} />
      </React.Fragment>
    );
  }
}
