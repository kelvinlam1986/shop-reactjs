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
                errors[field] = "Bạn phải nhập Tên ngân hàng !";
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

class CustomerTypeAdd extends Component {
    render() {
        const {
            handleSubmit,
            isShowModal,
            handleClose,
            container,
            title,
            addCustomerType,
            pristine,
            submitting
        } = this.props;
        console.log("handleSubmit", handleSubmit)
        return (
            <RegisterModal
                isShowModal={isShowModal}
                handleClose={handleClose}
                container={container}
                title={title}
                hiddenFooter={false}
                showCancel={true}
                clickOK={handleSubmit(addCustomerType)}
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
                    <Field name="name" component={renderInput} label="Tên loại khách hàng" />
                </Form>
            </RegisterModal>
        )
    }
}

const mapStateToProps = state => {
    const { addNewCustomerType } = state.customerType;
    return {
        initialValues: addNewCustomerType
    };
};

const rxForm = reduxForm({
    form: "CustomerTypeAddPage",
    enableReinitialize: true,
    validate
})(CustomerTypeAdd);

export default connect(mapStateToProps)(rxForm);