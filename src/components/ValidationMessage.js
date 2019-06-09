import React from "react";

const renderValidationMessage = ({ touched, error }) => {
  if (!(touched && error)) {
    return;
  } else {
    return <span className="text-danger">{touched && error}</span>;
  }
};

export default renderValidationMessage;
