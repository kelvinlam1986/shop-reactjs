import React from "react";
import { FormControl, ControlLabel, FormGroup, HelpBlock } from "react-bootstrap";

const getValidationError = (touched, error) => {
    if (touched && error) {
        return "error";
    } else {
        return null;
    }
};

const renderDropDownList = ({ input, meta, label, placeholder, options, autofocus }) => {
    return (
        <React.Fragment>
            <FormGroup
                controlId={input.name}
                validationState={getValidationError(meta.touched, meta.error)}
            >
                <ControlLabel>{label}</ControlLabel>
                <FormControl
                    componentClass="select"
                    placeholder={placeholder}
                    autoFocus={autofocus}
                    {...input}>
                    {placeholder && <option value="">{placeholder}</option>}
                    {options.map((o, i) => {
                        return (
                            <option key={i} value={o.value ? o.value : o.name}>
                                {o.name ? o.name : o.value}
                            </option>
                        )
                    })}
                </FormControl>
                {meta.touched && meta.error && <HelpBlock>{meta.error}</HelpBlock>}
            </FormGroup>
        </React.Fragment>
    )
}

export default renderDropDownList;