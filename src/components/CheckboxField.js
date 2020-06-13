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
          <Checkbox inline {...input} checked={input.value ? true : false}>{label}</Checkbox>
        </FormGroup>
      </React.Fragment>
    );
  };
  
  export default renderInput;