import React, { Component } from "react";
import { Form } from "react-bootstrap";
import { reduxForm, Field } from "redux-form";
import { connect } from "react-redux";
import RegisterModal from "../components/RegisterModal";
import renderInput from "../components/AdvanceTextField";
import renderTextArea from "../components/AdvanceTextArea";

const validate = values => {
    const errors = {};
    const requiredFields = ["name", "address", "contact"];
    requiredFields.forEach(field => {
        if (!values[field]) {
            if (field === "name") {
                errors[field] = `Bạn phải nhập Họ và tên !`;
            }

            if (field === "address") {
                errors[field] = "Bạn phải nhập Địa chỉ !";
            }

            if (field === "contact") {
                errors[field] = "Bạn phải nhập Điện thoại !";
            }
        }
    });
    return errors;
};

class SupplierAdd extends Component {
    render() {
        const {
            handleSubmit,
            isShowModal,
            handleClose,
            container,
            title,
            addSupplier,
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
                clickOK={handleSubmit(addSupplier)}
                okText="Lưu"
                pristine={pristine}
                submitting={submitting}>
                <Form>
                    <Field
                        name="name"
                        component={renderInput}
                        label="Họ tên"
                        autofocus
                    />
                    <Field name="address" component={renderTextArea} label="Địa chỉ" />
                    <Field name="contact" component={renderInput} label="Điện thoại" />
                </Form>
            </RegisterModal>
        )
    }
}

const mapStateToProps = state => {
    const { addNewSupplier } = state.supplier;
    return {
        initialValues: addNewSupplier
    };
};

const rxForm = reduxForm({
    form: "SupplierAddPage",
    enableReinitialize: true,
    validate
})(SupplierAdd);

export default connect(mapStateToProps)(rxForm);