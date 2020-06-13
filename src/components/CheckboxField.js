import React from "react";
import {
  FormGroup,
  Checkbox
} from "react-bootstrap";


const renderInput = ({ input, label, meta, autofocus }) => {
    return (
      <React.Fragment>
        <FormGroup
          controlId={input.name}
        >
          <Checkbox inline {...input}>{label}</Checkbox>
        </FormGroup>
      </React.Fragment>
    );
  };
  
  export default renderInput;