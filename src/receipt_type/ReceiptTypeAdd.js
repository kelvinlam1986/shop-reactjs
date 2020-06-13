import React, { Component } from "react";
import { Form } from "react-bootstrap";
import { reduxForm, Field } from "redux-form";
import { connect } from "react-redux";
import RegisterModal from "../components/RegisterModal";
import renderInput from "../components/AdvanceTextField";
import renderCheckbox from "../components/CheckboxField"
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

            if (field === "receiptTypeInVietnamese") {
                errors[field] = "Bạn phải nhập Tên loại phiếu thu(VN) !";
            }
        }
    });

    lengthFields.forEach(field => {
        if (field === "code") {
            if (_.isEmpty(values) === false && values[field].length > 3) {
                errors[field] = `Chiều dài Mã phải nhỏ hơn 3 !`;
            }
        }

    });
    return errors;
};

class ReceiptTypeAdd extends Component {
    render() {
        const {
            handleSubmit,
            isShowModal,
            handleClose,
            container,
            title,
            addReceiptType,
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
                clickOK={handleSubmit(addReceiptType)}
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
                    <Field name="receiptTypeInVietnamese" component={renderInput} 
                        label="Tên (VN)" />
                    <Field name="receiptTypeInSecondLanguage" component={renderInput} 
                        label="Tên (Khác)" />
                    <Field name="showReceiptTypeInVietNamese"
                        component={renderCheckbox}
                        label="Hiển thị"></Field>
                </Form>
            </RegisterModal>
        )
    }
}

const mapStateToProps = state => {
    const { addNewReceiptType } = state.receiptType;
    return {
        initialValues: addNewReceiptType
    };
};

const rxForm = reduxForm({
    form: "ReceiptTypeAddPage",
    enableReinitialize: true,
    validate
})(ReceiptTypeAdd);

export default connect(mapStateToProps)(rxForm);