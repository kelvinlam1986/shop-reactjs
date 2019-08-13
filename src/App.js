import React, { Component } from "react";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import MainRouter from "./MainRouter";
import Alert from "react-s-alert";
import { store } from "./data/dataStore";
import "react-s-alert/dist/s-alert-default.css";
import "react-s-alert/dist/s-alert-css-effects/slide.css";
import { Spinner } from "@simply007org/react-spinners";
import spinner from "./spinner.svg";
import "./spinner.css";

export default class App extends Component {
  render() {
    return (
      <React.Fragment>
        <Provider store={store}>
          <BrowserRouter>
            <MainRouter />
          </BrowserRouter>
          <Alert stack={{ limit: 3 }} position="top-right" timeout={1000} />
        </Provider>
        <div style={{ position: "fixed", top: "30%", left: "50%", zIndex: 1 }}>
          <Spinner name="shop-spinner" loadingImage={spinner} />
        </div>
      </React.Fragment>
    );
  }
}
