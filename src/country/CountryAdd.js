import React, { Component } from "react";
import { Form } from "react-bootstrap";
import { reduxForm, Field } from "redux-form";
import { connect } from "react-redux";
import RegisterModal from "../components/RegisterModal";
import renderInput from "../components/AdvanceTextField";
import _ from "lodash";

const validate = values => {
    const errors = {};
    const requiredFields = ["name", "code"];
    const lengthFields = ["code"]
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

    lengthFields.forEach(field => {
        if (field === "code") {
            if (_.isEmpty(values) === false && values[field].length > 3) {
                errors[field] = `Chiều dài Mã quốc gia phải nhỏ hơn 3 !`;
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