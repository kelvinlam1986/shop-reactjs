import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import { reset } from "redux-form";
import { connect } from "react-redux";
import {
  getCategoriesAction,
  loadCurrentCategory,
  resetCurrentCategory
} from "../category/category-action-creator";
import { redirectToLoginAction } from "../core/core-action-creator";
import auth from "../auth/auth-helper";
import { putCategory } from "../category/category-api";
import config from "../config";
import Loading from "../components/Loading";
import Pagination from "../components/Pagination";
import Alert from "react-s-alert";
import _ from "lodash";
import CategoryEdit from "./CategoryEdit";
import CategoryAddNew from "./CategoryAddNew";

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
      }
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
    const { resetEditPage, resetCurrentCategory } = this.props;
    resetEditPage();
    resetCurrentCategory();
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

  updateCategory = values => {
    const {
      resetEditPage,
      resetCurrentCategory,
      redirectLoginPage
    } = this.props;

    this.setState({ isShowModal: false });
    const jwt = auth.isAuthenticated();
    putCategory(jwt, { name: values.name }, values.id)
      .then(
        result => {
          resetEditPage();
          resetCurrentCategory();
          Alert.success("Lưu loại sản phẩm thành công");
          this.getCategories();
        },
        error => {
          console.log("error", error);
          if (error.errorCode) {
            Alert.error(error.errorMessage);
            if (error.errorCode === "401") {
              redirectLoginPage();
            }
          } else {
            redirectLoginPage();
            Alert.error("Không thể kết nối đến server.");
          }
        }
      )
      .catch(err => {
        redirectLoginPage();
        Alert.error("Không thể kết nối đến server.");
      });
  };

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
                  <CategoryAddNew getCategories={this.getCategories} />
                </div>
              </div>
            </div>
            <div className="col-xs-8">
              <div className="box box-primary">
                <div className="box-header">
                  <h3 className="box-title">Danh sách danh mục</h3>
                  <div className="box-tools">
                    <div
                      className="input-group input-group-sm hidden-xs"
                      style={{ width: "200px" }}
                    >
                      <input
                        type="text"
                        name="table_search"
                        className="form-control pull-right"
                        placeholder="Tìm kiếm"
                      />

                      <div className="input-group-btn">
                        <button type="submit" className="btn btn-default">
                          <i className="fa fa-search"></i>
                        </button>
                      </div>
                    </div>
                  </div>
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
        <CategoryEdit
          isShowModal={isShowModal}
          handleClose={this.handleClose}
          container={this}
          title={title}
          saveCategory={this.updateCategory}
          pristine={pristine}
          submitting={submitting}
        />
      </React.Fragment>
    );
  }
}
const mapStateToProps = state => {
  const { loading, categories, totalPages, page } = state.category;
  const { redirectToLogin } = state.core;
  return {
    loading,
    categories,
    redirectToLogin,
    totalPages,
    page
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getCategories: params => dispatch(getCategoriesAction(params)),
    load: data => dispatch(loadCurrentCategory(data)),
    resetEditPage: () => dispatch(reset("CategoryEditPage")),
    resetCurrentCategory: () => dispatch(resetCurrentCategory()),
    redirectLoginPage: () => dispatch(redirectToLoginAction())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CategoryListPage);
