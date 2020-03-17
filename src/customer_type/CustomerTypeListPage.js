import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import config from "../config";
import Loading from "../components/Loading";
import Pagination from "../components/Pagination";
import _ from "lodash";
import {
    getCustomerTypesAction,
    setLoadingCustomerType,
    // resetNewBank,
    // loadCurrentBank,
    // resetCurrentBank
} from "./customerType-action-creator"

import { redirectToLoginAction } from "../core/core-action-creator";

class CustomerTypeListPage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            params: {
                page: 0,
                pageSize: config.pageSize,
                keyword: ""
            },
            isShowModal: false,
            isShowModalAdd: false,
            titleAdd: "Thêm mới loại khách hàng",
            title: "Thông tin chi tiết",
            customerTypeId: null,
            isShowModalConfirm: false
        }

        this.delayedCallback = _.debounce(this.search, 250);
    }

    componentDidMount = () => {
        this.getCustomerTypes();
    }

    getCustomerTypes = () => {
        this.props.getCustomerTypes(this.state.params);
    };

    search = e => {
        this.setState(
            {
                params: {
                    ...this.state.params,
                    page: 0,
                    pageSize: config.pageSize,
                    keyword: e.target.value
                }
            },
            () => {
                this.getCustomerTypes();
            }
        );
    };

    
    onChangeSearch = e => {
        e.persist();
        this.props.setLoading(true);
        this.delayedCallback(e);
    };

    onClickSearch = e => {
        this.getCustomerTypes();
    };


    render() {
        const {
            customerTypes,
            loading,
            redirectToLogin,
            totalPages,
            page,
            // pristine,
            // submitting,
        } = this.props;

        
        const from = { pathname: "/signin" };
        if (redirectToLogin) {
            return <Redirect to={from} />;
        }


        return (
            <React.Fragment>
                {loading && <Loading delay={0} />}
                <section className="content-header">
                    <h1>
                        <Link to="/" className="btn btn-md btn-info">
                            Quay về
                        </Link>
                        {" "}
                        <button type="button"
                            className="btn btn-md btn-primary"
                            onClick={this.handleShowAdd}>Thêm mới</button>
                    </h1>
                    <ol className="breadcrumb">
                        <li>
                            <Link to="/">
                            <i className="fa fa-dashboard" /> Trang chủ
                            </Link>
                        </li>
                        <li className="active">Loại khách hàng</li>
                    </ol>
                </section>
                <section className="content">
                    <div className="row">
                        <div className="col-xs-12">
                            <div className="box box-primary">
                                <div className="box-header">
                                    <h3 className="box-title">Danh sách loại khách hàng</h3>
                                    <div className="box-tools">
                                        <div
                                            className="input-group input-group-sm hidden-xs"
                                            style={{ width: "200px" }}>
                                            <input
                                                type="text"
                                                name="table_search"
                                                className="form-control pull-right"
                                                placeholder="Tìm kiếm"
                                                onChange={this.onChangeSearch}
                                            />
                                            <div className="input-group-btn">
                                                <button
                                                type="submit"
                                                className="btn btn-default"
                                                onClick={this.onClickSearch}
                                                >
                                                <i className="fa fa-search"></i>
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="box-body">
                                    <table
                                        id="example1"
                                        className="table table-bordered table-striped">
                                         <thead>
                                            <tr>
                                                <th>Mã</th>
                                                <th>Loại khách hàng</th>
                                                <th>Hoạt động</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                 customerTypes &&
                                                 customerTypes.length > 0 &&
                                                 customerTypes.map((customerType, index) => {  
                                                     return (
                                                        <tr key={index}>
                                                            <td>{customerType.code}</td>
                                                            <td>{customerType.name}</td>
                                                            <td>
                                                                <span
                                                                style={{ color: "#fff", cursor: "pointer" }}
                                                                className="small-box-footer"
                                                                onClick={() => this.showDetail(1)}
                                                                >
                                                                <i className="glyphicon glyphicon-edit text-blue" />
                                                                </span>
                                                                {" "}
                                                                <span
                                                                    style={{ color: "#fff", cursor: "pointer" }}
                                                                    className="small-box-footer"
                                                                    onClick={() => this.showConfirmDelete(1)}
                                                                >
                                                                    <i className="glyphicon glyphicon-trash text-red" />
                                                                </span>
                                                            </td>
                                                        </tr>
                                                     )
                                                 })
                                            }
                                           
                                        </tbody>
                                    </table>
                                    <Pagination
                                        totalPages={totalPages}
                                        page={page}
                                        pageRangeDisplayed={2}
                                        onPageChange={this.handlePageClick}/>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </React.Fragment>
        )
    }
}

const mapStateToProps = state => {
    const { loading, customerTypes, totalPages, page } = state.customerType;
    const { redirectToLogin } = state.core;

    return {
      loading,
      customerTypes,
      redirectToLogin,
      totalPages,
      page
    };
  };

const mapDispatchToProps = dispatch => {
    return {
      getCustomerTypes: params => dispatch(getCustomerTypesAction(params)),
    //   load: data => dispatch(loadCurrentCustomer(data)),
    //   resetEditPage: () => dispatch(reset("CustomerEditPage")),
    //   resetCurrentCustomer: () => dispatch(resetCurrentCustomer()),
      redirectLoginPage: () => dispatch(redirectToLoginAction()),
      setLoading: isLoading => dispatch(setLoadingCustomerType(isLoading))
    };
  };
  
  export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(CustomerTypeListPage);