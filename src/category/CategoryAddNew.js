import React, { Component } from "react";
import { Form, FormGroup, InputGroup, Button } from "react-bootstrap";
import { reduxForm, Field, reset } from "redux-form";
import { connect } from "react-redux";
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

class CategoryAddNew extends Component {
  resetForm = () => {
    this.props.resetAddForm();
  };
  render() {
    return (
      <Form>
        <Field name="name" component={renderInput} label="Loại sản phẩm" />
        <FormGroup>
          <InputGroup>
            <Button bsStyle="primary" style={{ marginRight: "5px" }}>
              Lưu lại
            </Button>
            <Button type="reset" bsStyle="danger" onClick={this.resetForm}>
              Reset
            </Button>
          </InputGroup>
        </FormGroup>
      </Form>
    );
  }
}

const mapStateToProps = state => {
  const { currentCategory } = state.category;
  return {
    initialValues: currentCategory
  };
};

const mapDispatchToProps = dispatch => {
  return {
    resetAddForm: () => {
      dispatch(reset("CategoryAddNewForm"));
    }
  };
};

const rxForm = reduxForm({
  form: "CategoryAddNewForm",
  enableReinitialize: true,
  validate
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(rxForm(CategoryAddNew));
