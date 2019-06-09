import React, { Component } from "react";
import { isEmpty } from "lodash";
import renderValidationMessage from "./ValidationMessage";

const renderTextField = ({
  label,
  input,
  meta: { touched, error },
  name,
  type,
  spanIconClass,
  ...custom
}) => (
  <React.Fragment>
    <input
      placeholder={label}
      className="form-control"
      type={type}
      htmlFor={name}
      id={name}
      {...input}
      {...custom}
    />
    {isEmpty(spanIconClass) === false ? (
      <span className={spanIconClass} />
    ) : null}
    {renderValidationMessage({ touched, error })}
  </React.Fragment>
);

export { renderTextField };
