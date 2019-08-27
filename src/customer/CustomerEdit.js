import React, { Component } from "react";
import { Form } from "react-bootstrap";
import { connect } from "react-redux";
import RegisterModal from "../components/RegisterModal";
import { reduxForm, Field } from "redux-form";
import renderInput from "../components/AdvanceTextField";
import renderTextArea from "../components/AdvanceTextArea";

const validate = values => {
  const errors = {};
  const requiredFields = ["name"];
  requiredFields.forEach(field => {
    if (!values[field]) {
      if (field === "name") {
        errors[field] = `Bạn phải nhập Loại sản phẩm !`;
      }
    }
  });
  return errors;
};

class CustomerEdit extends Component {
  render() {
    const {
      handleSubmit,
      isShowModal,
      handleClose,
      container,
      title,
      saveCustomer,
      pristine,
      submitting
    } = this.props;

    console.log("handleSubmit", handleSubmit, "saveCustomer", saveCustomer);

    return (
      <RegisterModal
        isShowModal={isShowModal}
        handleClose={handleClose}
        container={container}
        title={title}
        hiddenFooter={false}
        showCancel={true}
        clickOK={handleSubmit(saveCustomer)}
        okText="Lưu"
        pristine={pristine}
        submitting={submitting}
      >
        <Form>
          <Field
            name="firstName"
            component={renderInput}
            label="Họ khách hàng"
            autofocus
          />
          <Field
            name="lastName"
            component={renderInput}
            label="Tên khách hàng"
            autofocus
          />
          <Field
            name="address"
            component={renderTextArea}
            label="Địa chỉ"
            autofocus
          />
          <Field
            name="contact"
            component={renderInput}
            label="Điện thoại"
            autofocus
          />
        </Form>
      </RegisterModal>
    );
  }
}

const mapStateToProps = state => {
  const { currentCustomer } = state.customer;
  return {
    initialValues: currentCustomer
  };
};

const rxForm = reduxForm({
  form: "CustomerEditPage",
  enableReinitialize: true,
  validate
})(CustomerEdit);

export default connect(mapStateToProps)(rxForm);
