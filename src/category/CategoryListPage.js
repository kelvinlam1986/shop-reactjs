import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import { Form } from "react-bootstrap";
import { Field, reduxForm } from "redux-form";
import { connect } from "react-redux";
import {
  getCategoriesAction,
  loadCurrentCategory
} from "../category/category-action-creator";
import config from "../config";
import RegisterModal from "../components/RegisterModal";
import renderInput from "../components/AdvanceTextField";
import Loading from "../components/Loading";
import Pagination from "../components/Pagination";
import _ from "lodash";

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

class CategoryListPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isShowModal: false,
      title: "Thông tin chi tiết",
      params: {
        page: 0,
        pageSize: config.pageSize,
        keyword: ""
      },
      currentCategory: {}
    };

    this.delayedCallback = _.debounce(this.search, 1000);
  }

  componentDidMount = () => {
    this.getCategories();
  };

  search = e => {
    this.setState(
      {
        params: {
          ...this.state.params,
          page: 0,
          pageSize: 20,
          keyword: e.target.value
        }
      },
      () => {
        this.getCategories();
      }
    );
  };

  getCategories = () => {
    this.props.getCategories(this.state.params);
  };

  handleClose = e => {
    const { dispatch, destroy } = this.props;
    dispatch(() => destroy());
    this.setState({ isShowModal: false });
  };

  showDetail = index => {
    this.handleShow(index);
  };

  handleShow = index => {
    const currentCategory = this.props.categories[index];
    this.setState(
      {
        isShowModal: true,
        title: `Thông tin chi tiết: ${currentCategory.name}`
      },
      () => {
        this.props.load(this.props.categories[index]);
      }
    );
  };

  handleChange = e => {
    this.setState({ value: e.target.value });
  };

  handlePageClick = e => {
    console.log("selected", e.selected);
    this.setState(
      {
        params: {
          ...this.state.params,
          page: e.selected
        }
      },
      () => this.getCategories()
    );
  };

  saveCategory = () => {};

  render() {
    const { isShowModal, title } = this.state;
    const {
      pristine,
      submitting,
      categories,
      loading,
      redirectToLogin,
      totalPages,
      page
    } = this.props;
    const from = { pathname: "/signin" };
    if (redirectToLogin) {
      return <Redirect to={from} />;
    }

    return (
      <React.Fragment>
        <section className="content-header">
          <h1>
            <Link to="/" className="btn btn-md btn-info">
              Quay về
            </Link>
          </h1>
          <ol className="breadcrumb">
            <li>
              <Link to="/">
                <i className="fa fa-dashboard" /> Trang chủ
              </Link>
            </li>
            <li className="active">Danh mục</li>
          </ol>
        </section>
        <section className="content">
          {loading && <Loading />}
          <div className="row">
            <div className="col-md-4">
              <div className="box box-primary">
                <div className="box-header">
                  <h3 className="box-title">Thêm danh mục mới</h3>
                </div>
                <div className="box-body">
                  <form>
                    <div className="form-group">
                      <label htmlFor="date">Danh mục</label>
                      <div className="input-group col-md-12">
                        <input
                          type="text"
                          className="form-control pull-right"
                          id="date"
                          name="category"
                          placeholder="Danh mục"
                          required
                        />
                      </div>
                    </div>
                    <div className="form-group">
                      <div className="input-group">
                        <button
                          className="btn btn-primary"
                          id="daterange-btn"
                          style={{ marginRight: "5px" }}
                        >
                          Lưu lại
                        </button>
                        <button className="btn btn-danger" id="daterange-btn">
                          Xóa
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
            <div className="col-xs-8">
              <div className="box box-primary">
                <div className="box-header">
                  <h3 className="box-title">Danh sách danh mục</h3>
                </div>
                <div className="box-body">
                  <table
                    id="example1"
                    className="table table-bordered table-striped"
                  >
                    <thead>
                      <tr>
                        <th>Tên danh mục</th>
                        <th>Hoạt động</th>
                      </tr>
                    </thead>
                    <tbody>
                      {categories &&
                        categories.length > 0 &&
                        categories.map((category, index) => {
                          return (
                            <tr key={index}>
                              <td>{category.name}</td>
                              <td>
                                <span
                                  style={{ color: "#fff", cursor: "pointer" }}
                                  className="small-box-footer"
                                  onClick={() => this.showDetail(index)}
                                >
                                  <i className="glyphicon glyphicon-edit text-blue" />
                                </span>
                              </td>
                            </tr>
                          );
                        })}
                    </tbody>
                  </table>
                  <Pagination
                    totalPages={totalPages}
                    page={page}
                    pageRangeDisplayed={2}
                    onPageChange={this.handlePageClick}
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
        <RegisterModal
          isShowModal={isShowModal}
          handleClose={this.handleClose}
          container={this}
          title={title}
          hiddenFooter={false}
          showCancel={true}
          clickOK={this.saveCategory}
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
      </React.Fragment>
    );
  }
}

const rxForm = reduxForm({
  form: "CategoryListPage",
  enableReinitialize: true,
  validate
})(CategoryListPage);

const mapStateToProps = state => {
  const {
    loading,
    categories,
    totalPages,
    page,
    currentCategory
  } = state.category;
  const { redirectToLogin } = state.core;
  return {
    loading,
    categories,
    redirectToLogin,
    totalPages,
    page,
    initialValues: currentCategory
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getCategories: params => dispatch(getCategoriesAction(params)),
    load: data => dispatch(loadCurrentCategory(data))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(rxForm);
