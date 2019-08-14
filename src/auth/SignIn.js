import React, { Component } from "react";
import { connect } from "react-redux";
import { Field, reduxForm } from "redux-form";
import { renderTextField } from "../components/TextField";
import { loginRequest } from "../core/core-action-creator";
import LoadingIndicator from "../components/Loading";

import "./SignIn.css";

const validate = values => {
  const errors = {};
  const requiredFields = ["username", "password"];
  requiredFields.forEach(field => {
    if (!values[field]) {
      errors[field] = `Bạn phải nhập ${field} !`;
    }
  });
  return errors;
};

class SignIn extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      error: "",
      redirectToReferrer: false
    };
  }

  submit = values => {
    const { login, history } = this.props;
    const user = {
      username: values.username,
      password: values.password
    };
    login(user, history);
  };

  componentDidMount() {
    document.body.style.backgroundColor = "#d2d6de";
    document.getElementById("root").classList.add("wrapperLogin");
  }

  componentWillUnmount() {
    document.body.style.backgroundColor = "#222d32";
    document.getElementById("root").classList.remove("wrapperLogin");
  }

  render() {
    const { handleSubmit, pristine, reset, submitting, loading } = this.props;
    return (
      <React.Fragment>
        {loading && <LoadingIndicator />}
        <div className="login-logo">
          <b>Quản lý Bán Hàng</b>
        </div>
        <div className="login-box-body">
          <p className="login-box-msg">Đăng nhập để bắt đầu phiên làm việc</p>
          <form onSubmit={handleSubmit(e => this.submit(e))}>
            <div className="form-group has-feedback">
              <Field
                id="username"
                name="username"
                label="Tên đăng nhập"
                type="text"
                spanIconClass="glyphicon glyphicon-envelope form-control-feedback"
                component={renderTextField}
              />
            </div>
            <div className="form-group has-feedback">
              <Field
                id="password"
                name="password"
                label="Mật khẩu"
                type="password"
                spanIconClass="glyphicon glyphicon-lock form-control-feedback"
                component={renderTextField}
              />
              <span className="text-danger" />
            </div>
            <div className="row">
              <div className="col-xs-6 pull-right">
                <button
                  type="button"
                  className="btn btn-block btn-flat"
                  disabled={pristine || submitting}
                  onClick={reset}
                >
                  Reset
                </button>
              </div>
              <div className="col-xs-6 pull-right">
                <button
                  type="submit"
                  className="btn btn-primary btn-block btn-flat"
                  name="login"
                  default
                >
                  Đăng nhập
                </button>
              </div>
            </div>
          </form>
        </div>
      </React.Fragment>
    );
  }
}

const SignInForm = reduxForm({
  form: "signin",
  validate
})(SignIn);

const mapDispatchToProps = dispatch => {
  return {
    login: (user, history) => dispatch(loginRequest(user, history))
  };
};

const mapStateToProps = state => {
  const { username, loading } = state.core;
  return { username, loading };
};

const ConnectedSignInForm = connect(
  mapStateToProps,
  mapDispatchToProps
)(SignInForm);

export { ConnectedSignInForm as SignInForm };
