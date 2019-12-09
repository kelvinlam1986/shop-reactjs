import React, { Component } from "react";
import { Form } from "react-bootstrap";
import { reduxForm, Field } from "redux-form";
import { connect } from "react-redux";
import RegisterModal from "../components/RegisterModal";
import renderInput from "../components/AdvanceTextField";
import renderTextArea from "../components/AdvanceTextArea";

const validate = values => {
    const errors = {};
    const requiredFields = ["name", "address", "code"];
    requiredFields.forEach(field => {
        if (!values[field]) {
            if (field === "code") {
                errors[field] = `Bạn phải nhập Mã !`;
            }

            if (field === "name") {
                errors[field] = "Bạn phải nhập Tên ngân hàng !";
            }

            if (field === "address") {
                errors[field] = "Bạn phải nhập Địa chỉ !";
            }
        }
    });
    return errors;
};

class BankEdit extends Component {
    render() {
        const {
            handleSubmit,
            isShowModal,
            handleClose,
            container,
            title,
            updateBank,
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
                clickOK={handleSubmit(updateBank)}
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
                    <Field name="name" component={renderInput} label="Tên ngân hàng" />
                    <Field name="address" component={renderTextArea} label="Địa chỉ" />
                </Form>
            </RegisterModal>
        )
    }
}

const mapStateToProps = state => {
    const { currentBank } = state.bank;
    return {
        initialValues: currentBank
    };
};

const rxForm = reduxForm({
    form: "BankEditPage",
    enableReinitialize: true,
    validate
})(BankEdit);

export default connect(mapStateToProps)(rxForm);