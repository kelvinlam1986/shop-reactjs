import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { reset } from "redux-form";
import Alert from "react-s-alert";
import config from "../config";
import {
  getCustomersAction,
  resetCurrentCustomer,
  loadCurrentCustomer
} from "./customer-action-creator";
import { redirectToLoginAction } from "../core/core-action-creator";
import Loading from "../components/Loading";
import Pagination from "../components/Pagination";
import CustomerEdit from "./CustomerEdit";
import auth from "../auth/auth-helper";
import { putCustomer } from "./customer-api";
import _ from "lodash";

class CustomerListPage extends Component {
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
    this.getCustomers();
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
        this.getCustomers();
      }
    );
  };

  getCustomers = () => {
    this.props.getCustomers(this.state.params);
  };

  handleClose = e => {
    const { resetEditPage, resetCurrentCustomer } = this.props;
    resetEditPage();
    resetCurrentCustomer();
    this.setState({ isShowModal: false });
  };

  handlePageClick = e => {
    this.setState(
      {
        params: {
          ...this.state.params,
          page: e.selected
        }
      },
      () => this.getCustomers()
    );
  };

  updateCustomer = values => {
    const {
      resetEditPage,
      resetCurrentCustomer,
      redirectLoginPage
    } = this.props;

    this.setState({ isShowModal: false });
    const jwt = auth.isAuthenticated();
    putCustomer(
      jwt,
      {
        firstName: values.firstName,
        lastName: values.lastName,
        address: values.address,
        contact: values.contact
      },
      values.id
    )
      .then(
        result => {
          resetEditPage();
          resetCurrentCustomer();
          Alert.success("Lưu khách hàng thành công");
          this.getCustomers();
        },
        error => {
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

  showDetail = index => {
    this.handleShow(index);
  };

  handleShow = index => {
    const currentCustomer = this.props.customers[index];
    this.setState(
      {
        isShowModal: true,
        title: `Thông tin chi tiết: ${currentCustomer.firstName} ${currentCustomer.lastName}`
      },
      () => {
        this.props.load(this.props.customers[index]);
      }
    );
  };

  render() {
    const { isShowModal, title } = this.state;
    const {
      pristine,
      submitting,
      customers,
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
            <li className="active">Khách hàng</li>
          </ol>
        </section>
        <section className="content">
          {loading && <Loading />}
          <div className="row">
            <div className="col-xs-12">
              <div className="box box-primary">
                <div className="box-header">
                  <h3 className="box-title">Danh sách khách hàng</h3>
                </div>
                <div className="box-body">
                  <table
                    id="example1"
                    className="table table-bordered table-striped"
                  >
                    <thead>
                      <tr>
                        <th>STT #</th>
                        <th>Hình</th>
                        <th>Họ và</th>
                        <th>Tên</th>
                        <th>Địa chỉ</th>
                        <th>Liên hệ #</th>
                        <th>Hoạt động</th>
                      </tr>
                    </thead>
                    <tbody>
                      {customers &&
                        customers.length > 0 &&
                        customers.map((customer, index) => {
                          return (
                            <tr key={index}>
                              <td>{index + 1}</td>
                              <td>
                                <img
                                  style={{ width: "60px", height: "80px" }}
                                  src={"/uploads/" + customer.picture}
                                  alt="image1"
                                />
                              </td>
                              <td>{customer.lastName}</td>
                              <td>{customer.firstName}</td>
                              <td>{customer.address}</td>
                              <td>{customer.contact}</td>
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
        <CustomerEdit
          isShowModal={isShowModal}
          handleClose={this.handleClose}
          container={this}
          title={title}
          saveCustomer={this.updateCustomer}
          pristine={pristine}
          submitting={submitting}
        />
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => {
  const { loading, customers, totalPages, page } = state.customer;
  const { redirectToLogin } = state.core;
  return {
    loading,
    customers,
    redirectToLogin,
    totalPages,
    page
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getCustomers: params => dispatch(getCustomersAction(params)),
    load: data => dispatch(loadCurrentCustomer(data)),
    resetEditPage: () => dispatch(reset("CustomerEditPage")),
    resetCurrentCustomer: () => dispatch(resetCurrentCustomer()),
    redirectLoginPage: () => dispatch(redirectToLoginAction())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CustomerListPage);
