import React, { Component } from "react";
import { Form } from "react-bootstrap";
import { reduxForm, Field } from "redux-form";
import { connect } from "react-redux";
import RegisterModal from "../components/RegisterModal";
import renderInput from "../components/AdvanceTextField";
import renderTextArea from "../components/AdvanceTextArea";
import _ from "lodash";

const validate = values => {
    const errors = {};
    const requiredFields = ["name", "address", "code"];
    const lengthFields = ["code"]
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

    lengthFields.forEach(field => {
        if (field === "code") {
            if (_.isEmpty(values) === false && values[field].length > 3) {
                errors[field] = `Chiều dài Mã ngân hàng phải nhỏ hơn 3 !`;
            }
        }

    });
    return errors;
};

class BankAdd extends Component {
    render() {
        const {
            handleSubmit,
            isShowModal,
            handleClose,
            container,
            title,
            addBank,
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
                clickOK={handleSubmit(addBank)}
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
    const { addNewBank } = state.bank;
    return {
        initialValues: addNewBank
    };
};

const rxForm = reduxForm({
    form: "BankAddPage",
    enableReinitialize: true,
    validate
})(BankAdd);

export default connect(mapStateToProps)(rxForm);