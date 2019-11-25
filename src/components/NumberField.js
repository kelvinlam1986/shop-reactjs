import React from "react";
import {
    FormGroup,
    ControlLabel,
    FormControl,
    HelpBlock
} from "react-bootstrap";

const getValidationError = (touched, error) => {
    if (touched && error) {
        return "error";
    } else {
        return null;
    }
};

const handleBlur = (event, onBlur) => {
    const { relatedTarget } = event;
    if (relatedTarget && "button" === relatedTarget.getAttribute("type")) {
        event.preventDefault();
    } else {
        onBlur();
    }
};

const renderNumberField = ({ input, label, meta, autofocus }) => {
    return (
        <React.Fragment>
            <FormGroup
                controlId={input.name}
                validationState={getValidationError(meta.touched, meta.error)}
            >
                <ControlLabel>{label}</ControlLabel>
                <FormControl
                    placeholder={label}
                    autoFocus={autofocus}
                    type="number"
                    {...input}
                    onBlur={e => handleBlur(e, input.onBlur)}
                />
                {meta.touched && meta.error && <HelpBlock>{meta.error}</HelpBlock>}
            </FormGroup>
        </React.Fragment>
    );
};

export default renderNumberField;
