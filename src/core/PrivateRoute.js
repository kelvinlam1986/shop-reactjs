import React, { Component } from "react";
import { Route, Redirect } from "react-router-dom";
import auth from "../auth/auth-helper";
import Menu from "../core/Menu";

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      auth.isAuthenticated() ? (
        <React.Fragment>
          <Menu />
          <div className="content-wrapper">
            <div className="container">
              <Component {...props} />
            </div>
          </div>
        </React.Fragment>
      ) : (
        <Redirect
          to={{
            pathname: "/signin",
            state: { from: props.location }
          }}
        />
      )
    }
  />
);

export default PrivateRoute;
