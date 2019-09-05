import React, { Component } from "react";
import { Form } from "react-bootstrap";
import { connect } from "react-redux";
import RegisterModal from "../components/RegisterModal";
import { reduxForm, Field } from "redux-form";
import renderInput from "../components/AdvanceTextField";
import renderTextArea from "../components/AdvanceTextArea";

const validate = values => {
  const errors = {};
  const requiredFields = ["firstName", "lastName", "address", "contact"];
  requiredFields.forEach(field => {
    if (!values[field]) {
      if (field === "firstName") {
        errors[field] = `Bạn phải nhập Họ khách hàng !`;
      }

      if (field === "lastName") {
        errors[field] = "Bạn phải nhập Tên khách hàng !";
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
            name="lastName"
            component={renderInput}
            label="Họ khách hàng"
            autofocus
          />
          <Field
            name="firstName"
            component={renderInput}
            label="Tên khách hàng"
          />
          <Field name="address" component={renderTextArea} label="Địa chỉ" />
          <Field name="contact" component={renderInput} label="Điện thoại" />
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
