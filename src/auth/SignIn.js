import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { signin } from "./api-auth";
import auth from "./auth-helper";
import { Field, reduxForm } from "redux-form";
import { renderTextField } from "../components/TextField";
import Alert from "react-s-alert";

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
    const user = {
      username: values.username,
      password: values.password
    };
    signin(user)
      .then(data => {
        if (data.error) {
          Alert.error(data.error);
        } else {
          auth.authenticate(data, () => {
            this.setState({ redirectToReferrer: true });
          });
        }
      })
      .catch(e => {
        Alert.error("Không thể kết nối server !");
      });
  };

  componentDidMount() {
    console.log("SignIn component will mount");
    //document.body.style.backgroundColor = "#222d32";
    document.body.style.backgroundColor = "#d2d6de";
    document.getElementById("root").classList.add("wrapperLogin");
  }

  componentWillUnmount() {
    document.body.style.backgroundColor = "#222d32";
    document.getElementById("root").classList.remove("wrapperLogin");
  }

  render() {
    const { from } = this.props.location.state || { from: { pathname: "/" } };
    const { handleSubmit, pristine, reset, submitting } = this.props;
    const { redirectToReferrer } = this.state;
    if (redirectToReferrer) {
      return <Redirect to={from} />;
    }

    return (
      <React.Fragment>
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

const ConnectedSignInForm = connect(
  null,
  null
)(SignInForm);

export { ConnectedSignInForm as SignInForm };
