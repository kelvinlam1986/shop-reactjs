import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import config from "../config";
import { getCustomersAction } from "./customer-action-creator";
import Loading from "../components/Loading";
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
                                <a
                                  href="/ghty"
                                  style={{ color: "#fff" }}
                                  className="small-box-footer"
                                >
                                  <i className="glyphicon glyphicon-edit text-blue" />
                                </a>
                              </td>
                            </tr>
                          );
                        })}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </section>
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
    getCustomers: params => dispatch(getCustomersAction(params))
    // load: data => dispatch(loadCurrentCategory(data)),
    // resetEditPage: () => dispatch(reset("CategoryEditPage")),
    // resetCurrentCategory: () => dispatch(resetCurrentCategory()),
    // redirectLoginPage: () => dispatch(redirectToLoginAction())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CustomerListPage);
