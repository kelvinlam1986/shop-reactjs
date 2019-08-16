import React, { Component } from "react";
import { Form, FormGroup, InputGroup, Button } from "react-bootstrap";
import { reduxForm, Field, reset } from "redux-form";
import { connect } from "react-redux";
import renderInput from "../components/AdvanceTextField";
import auth from "../auth/auth-helper";
import { postCategory } from "./category-api";
import Alert from "react-s-alert";
import {
  resetAddNewCategory,
  loadAddNewCategory
} from "./category-action-creator";

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
  componentDidMount() {
    this.props.loadAddNewCategory({ id: 0, name: "" });
  }

  resetForm = () => {
    this.props.resetAddForm();
  };

  insertCategory = values => {
    const { resetAddForm, getCategories, resetAddNewCategory } = this.props;
    const jwt = auth.isAuthenticated();
    postCategory(jwt, { name: values.name }).then(
      result => {
        if (result.errorMessage) {
          Alert.error(result.errorMessage);
        } else {
          resetAddForm();
          resetAddNewCategory();
          Alert.success("Lưu loại sản phẩm thành công");
          getCategories();
        }
      },
      error => {
        Alert.error(error.errorMessge);
      }
    );
  };

  render() {
    const { handleSubmit } = this.props;
    return (
      <Form>
        <Field name="name" component={renderInput} label="Loại sản phẩm" />
        <FormGroup>
          <InputGroup>
            <Button
              bsStyle="primary"
              style={{ marginRight: "5px" }}
              onClick={handleSubmit(this.insertCategory)}
            >
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
  const { addNewCategory } = state.category;
  return {
    initialValues: addNewCategory
  };
};

const mapDispatchToProps = dispatch => {
  return {
    resetAddForm: () => {
      dispatch(reset("CategoryAddNewForm"));
    },
    resetAddNewCategory: () => {
      dispatch(resetAddNewCategory());
    },
    loadAddNewCategory: newCategory => {
      dispatch(loadAddNewCategory(newCategory));
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
