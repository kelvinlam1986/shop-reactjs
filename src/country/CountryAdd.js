import React, { Component } from "react";
import { Form } from "react-bootstrap";
import { reduxForm, Field } from "redux-form";
import { connect } from "react-redux";
import RegisterModal from "../components/RegisterModal";
import renderInput from "../components/AdvanceTextField";

const validate = values => {
    const errors = {};
    const requiredFields = ["name", "code"];
    requiredFields.forEach(field => {
        if (!values[field]) {
            if (field === "code") {
                errors[field] = `Bạn phải nhập Mã !`;
            }

            if (field === "name") {
                errors[field] = "Bạn phải nhập Tên quốc gia !";
            }
        }
    });
    return errors;
};

class CountryAdd extends Component {
    render() {
        const {
            handleSubmit,
            isShowModal,
            handleClose,
            container,
            title,
            addCountry,
            pristine,
            submitting
        } = this.props;

        return (
            <RegisterModal
                isShowModal={isShowModal}
                handleClose={handleClose}
                container={container}
                title={title}
                hiddenFooter={false}
                showCancel={true}
                clickOK={handleSubmit(addCountry)}
                okText="Lưu"
                pristine={pristine}
                submitting={submitting}>
                <Form>
                    <Field
                        name="code"
                        component={renderInput}
                        label="Mã"
                        autofocus
                    />
                    <Field name="name" component={renderInput} label="Tên quốc gia" />
                </Form>
            </RegisterModal>
        )
    }
}

const mapStateToProps = state => {
    const { addNewCountry } = state.country;
    return {
        initialValues: addNewCountry
    };
};

const rxForm = reduxForm({
    form: "CountryAddPage",
    enableReinitialize: true,
    validate
})(CountryAdd);

export default connect(mapStateToProps)(rxForm);