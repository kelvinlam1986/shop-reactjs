import React, { Component } from "react";
import { Form } from "react-bootstrap";
import { connect } from "react-redux";
import RegisterModal from "../components/RegisterModal";
import { reduxForm, Field } from "redux-form";
import renderInput from "../components/AdvanceTextField";

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

class CategoryEditPage extends Component {
  render() {
    const {
      handleSubmit,
      isShowModal,
      handleClose,
      container,
      title,
      saveCategory,
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
        clickOK={handleSubmit(saveCategory)}
        okText="Lưu"
        pristine={pristine}
        submitting={submitting}
      >
        <Form>
          <Field
            name="name"
            component={renderInput}
            label="Loại sản phẩm"
            autofocus
          />
        </Form>
      </RegisterModal>
    );
  }
}

const mapStateToProps = state => {
  const { currentCategory } = state.category;
  return {
    initialValues: currentCategory
  };
};

const rxForm = reduxForm({
  form: "CategoryEditPage",
  enableReinitialize: true,
  validate
})(CategoryEditPage);

export default connect(mapStateToProps)(rxForm);
